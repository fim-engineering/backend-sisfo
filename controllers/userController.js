const model = require('../models/index');
const jwt = require('jsonwebtoken');
const redisClient = require('../util/redis');
const formCompletenessController = require('../controllers/formCompletenessController');


exports.checkSession = (req, res, next) => {
    const token = req.body.token;

    redisClient.get('login_portal:' + token, function (err, response) {
        if (err) {
            res.status(500).json({
                message: "Somethin Went Wrong " + err,
                data: null,
                status: false
            })
        }

        if (response == null) {
            res.status(200).json({
                message: `Token Not Found`,
                data: null,
                status: false
            })
        } else {
            res.status(200).json({
                message: `Token Found`,
                data: JSON.parse(response),
                status: true
            })
        }
    })
}

exports.socialLogin = (req, res, next) => {
    model.User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            profilPicture: req.body.profilPicture,
            socialId: req.body.socialId,
            loginSource: req.body.loginSource
        }
    }).then(async ([user]) => {
        const userData = await user.get();
        let status = userData.status !== null ? userData.status : 0;
        const data_identity = {
            email: userData.email,
            userId: userData.id,
            step: status
        }

        const token = jwt.sign(data_identity, process.env.JWT_KEY, { expiresIn: 60000 }); 
        redisClient.setex('login_portal:' + token, 60000, JSON.stringify(data_identity))

        return res.status(200).json({
            "code": 200,
            "token": token,
            "status": status
        });

    }).catch(err => {
        return res.json({
            code: 401,
            message: err
        });
    })
}

exports.getProfile = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const user = JSON.parse(response);
        const userId = user.userId;
        
        try {
            model.User.findOne({ where: { id: userId } })
            .then(user => {
                model.Identity.findOne({ where: { userId: userId } })
                .then(identity => { 
                    model.Skill.findOne({ where: { userId: userId } })
                    .then(skill => { 
                        model.SocialMedia.findOne({ where: { userId: userId } })
                        .then(socialMedia => { 
                            model.AlumniReference.findOne({ where: { userId: userId } })
                            .then(alumniReference => { 
                                model.FimActivity.findOne({ where: { userId: userId } })
                                .then(fimActivity => { 
                                    model.OrganizationExperience.findAll({ where: { userId: userId } })
                                    .then(organizationExperiences => { 
                                        return res.status(200).json({
                                            status: true,
                                            message: "Data Fetched",
                                            data: parseUserResponse(user, identity, skill, socialMedia, alumniReference, fimActivity, organizationExperiences)
                                        })
                                    })
                                    .catch(err => { throw new Error(err) })
                                })
                                .catch(err => { throw new Error(err) })
                            })
                            .catch(err => { throw new Error(err) })
                        })
                        .catch(err => { throw new Error(err) })
                    })
                    .catch(err => { throw new Error(err) })
                })
                .catch(err => { throw new Error(err) })
            })
            .catch(err => { throw new Error(err) })
        } catch (error) {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + error,
                "data": null
            })    
        }
    })
}

function parseUserResponse(user, identity, skill, socialMedia, alumniReference, fimActivity, organizationExperiences) {
    return {
        "id": user.id,
        "email": user.email,
        "Identity": parseIdentityResponse(identity),
        "Skill": parseSkillResponse(skill),
        "SocialMedia": parseSocialMediaResponse(socialMedia),
        "AlumniReference": parseAlumniReferenceResponse(alumniReference),
        "FimActivity": parseFimActivityResponse(fimActivity),
        "OrganizationExperiences": parseOrganizationExperiencesResponse(organizationExperiences),
    }
}

exports.saveIdentity = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        try {
            validateIdentityRequestBody(req.body)

            let userIdentity = JSON.parse(response);
            let userId = userIdentity.userId;

            findIdentity = await model.Identity.findOne({ where: { userId: userId } })

            if (findIdentity == null) {
                await model.Identity.create(parseIdentityRequest(userId, req.body))
                .then(result => {

                    formCompletenessController.setSelectedFormCompletenessToTrue(userId, formCompletenessController.FIRST_STEP)

                    return res.status(200).json({
                        "status": true,
                        "message": "Data Inserted",
                        "data": parseIdentityResponse(result)
                    })
                }).catch(err => {
                    return res.status(400).json({
                        "status": false,
                        "message": "Something Error " + err,
                        "data": null
                    })
                })
            } else {
                findIdentity.update(parseIdentityRequest(userId, req.body))
                .then(result => {

                    formCompletenessController.setSelectedFormCompletenessToTrue(userId, formCompletenessController.FIRST_STEP)

                    return res.status(200).json({
                        "status": true,
                        "message": "Data Updated",
                        "data": parseIdentityResponse(result)
                    })
                }).catch(err => {
                    return res.status(400).json({
                        "status": false,
                        "message": "Something Error " + err,
                        "data": null
                    })
                })
            }
        } catch(err) {
            return res.status(400).json({
                "status": false,
                "message": err.message,
                "data": null
            })
        }
    })
}

function validateIdentityRequestBody(reqBody) {    
    if (!reqBody.firstName || reqBody.firstName.trim() == "") throw new Error('firstName is required!');
    if (!reqBody.phone || reqBody.phone.trim() == "") throw new Error('phone is required!');
    if (!reqBody.emergencyPhone || reqBody.emergencyPhone.trim() == "") throw new Error('emergencyPhone is required!');
    if (!reqBody.photoUrl || reqBody.photoUrl.trim() == "") throw new Error('photoUrl is required!');
    if (!reqBody.ktpNumber || reqBody.ktpNumber.trim() == "") throw new Error('ktpNumber is required!');
    if (!reqBody.religion || reqBody.religion.trim() == "") throw new Error('religion is required!');
    if (!reqBody.bornPlace || reqBody.bornPlace.trim() == "") throw new Error('bornPlace is required!');
    if (!reqBody.bornDate || reqBody.bornDate.trim() == "") throw new Error('bornDate is required!');
    if (!reqBody.address || reqBody.address.trim() == "") throw new Error('address is required!');
    if (!reqBody.cityAddress || reqBody.cityAddress.trim() == "") throw new Error('cityAddress is required!');
    if (!reqBody.provinceAddress || reqBody.provinceAddress.trim() == "") throw new Error('provinceAddress is required!');
    if (!reqBody.gender || reqBody.gender.trim() == "") throw new Error('gender is required!');
    if (!reqBody.bloodGroup || reqBody.bloodGroup.trim() == "") throw new Error('bloodGroup is required!');
    if (!reqBody.hobby || reqBody.hobby.trim() == "") throw new Error('hobby is required!');
    if (!reqBody.institution || reqBody.institution.trim() == "") throw new Error('institution is required!');
    if (!reqBody.occupation || reqBody.occupation.trim() == "") throw new Error('occupation is required!');
}

function parseIdentityRequest(userId, reqBody) {
    firstName = reqBody.firstName;
    lastName = reqBody.lastName;
    fullName = firstName.concat(" ", lastName);

    return {
        userId: userId,
        fullName: fullName.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: reqBody.phone.trim(),
        emergencyPhone: reqBody.emergencyPhone.trim(),
        ktpNumber: reqBody.ktpNumber.trim(),
        photoUrl: reqBody.photoUrl.trim(),
        religion: reqBody.religion.trim(),
        bornPlace: reqBody.bornPlace.trim(),
        bornDate: reqBody.bornDate.trim(),
        address: reqBody.address.trim(),
        cityAddress: reqBody.cityAddress.trim(),
        provinceAddress: reqBody.provinceAddress.trim(),
        gender: reqBody.gender.trim(),
        bloodGroup: reqBody.bloodGroup.trim(),
        hobby: reqBody.hobby.trim(),
        institution: reqBody.institution.trim(),
        occupation: reqBody.occupation.trim()
    }
}

function parseIdentityResponse(data) {

    if (data == null) return null

    return {
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        emergencyPhone: data.emergencyPhone,
        ktpNumber: data.ktpNumber,
        photoUrl: data.photoUrl,
        religion: data.religion,
        bornPlace: data.bornPlace,
        bornDate: data.bornDate,
        address: data.address,
        cityAddress: data.cityAddress,
        provinceAddress: data.provinceAddress,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        hobby: data.hobby,
        institution: data.institution,
        occupation: data.occupation
    }
}

exports.saveSkill = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        findSkill = await model.Skill.findOne({ where: { userId: userId } })
        if (findSkill == null) {
            await model.Skill.create(parseSkillRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": parseSkillResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findSkill.update(parseSkillRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": parseSkillResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    })
}

function parseSkillRequest(userId, reqBody) {
    if (reqBody.isAbleVideoEditing) isAbleVideoEditing = reqBody.isAbleVideoEditing
    else isAbleVideoEditing = false

    return {
        userId: userId,
        isAbleVideoEditing: isAbleVideoEditing,
        videoEditingPortofolioUrl: reqBody.videoEditingPortofolioUrl ? reqBody.videoEditingPortofolioUrl.trim() : null,
        firstCertificateUrl: reqBody.firstCertificateUrl ? reqBody.firstCertificateUrl.trim() : null,
        secondCertificateUrl: reqBody.secondCertificateUrl ? reqBody.secondCertificateUrl.trim() : null,
        thirdCertificateUrl: reqBody.thirdCertificateUrl ? reqBody.thirdCertificateUrl.trim() : null
    }
}

function parseSkillResponse(data) {

    if (data == null) return null

    return {
        isAbleVideoEditing: data.isAbleVideoEditing,
        videoEditingPortofolioUrl: data.videoEditingPortofolioUrl,
        firstCertificateUrl: data.firstCertificateUrl,
        secondCertificateUrl: data.secondCertificateUrl,
        thirdCertificateUrl: data.thirdCertificateUrl
    }
}

exports.saveSocialMedia = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        findSocialMedia = await model.SocialMedia.findOne({ where: { userId: userId } })
        if (findSocialMedia == null) {
            await model.SocialMedia.create(parseSocialMediaRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": parseSocialMediaResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findSocialMedia.update(parseSocialMediaRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": parseSocialMediaResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    })
}

function parseSocialMediaRequest(userId, reqBody) {
    return {
        userId: userId,
        instagramUrl: reqBody.instagramUrl ? reqBody.instagramUrl.trim() : null,
        twitterUrl: reqBody.twitterUrl ? reqBody.twitterUrl.trim() : null,
        facebookUrl: reqBody.facebookUrl ? reqBody.facebookUrl.trim() : null,
        websiteUrl: reqBody.websiteUrl ? reqBody.websiteUrl.trim() : null,
        otherSiteUrl: reqBody.otherSiteUrl ? reqBody.otherSiteUrl.trim() : null,
        reason: reqBody.reason ? reqBody.reason.trim() : null
    }
}

function parseSocialMediaResponse(data) {

    if (data == null) return null

    return {
        instagramUrl: data.instagramUrl,
        twitterUrl: data.twitterUrl,
        facebookUrl: data.facebookUrl,
        websiteUrl: data.websiteUrl,
        otherSiteUrl: data.otherSiteUrl,
        reason: data.reason
    }
}

exports.saveAlumniReference = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        findAlumniReference = await model.AlumniReference.findOne({ where: { userId: userId } })
        if (findAlumniReference == null) {
            await model.AlumniReference.create(parseAlumniReferenceRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": parseAlumniReferenceResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findAlumniReference.update(parseAlumniReferenceRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": parseAlumniReferenceResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    })
}

function parseAlumniReferenceRequest(userId, reqBody) {
    return {
        userId: userId,
        fullName: reqBody.fullName ? reqBody.fullName.trim() : null,
        batch: reqBody.batch? reqBody.batch.trim() : null,
        phoneNumber: reqBody.phoneNumber ? reqBody.phoneNumber.trim() : null,
        relationship: reqBody.relationship ? reqBody.relationship.trim() : null,
        acquaintedSince: reqBody.acquaintedSince ? reqBody.acquaintedSince.trim() : null
    }
}

function parseAlumniReferenceResponse(data) {

    if (data == null) return null

    return {
        fullName: data.fullName,
        batch: data.batch,
        phoneNumber: data.phoneNumber,
        relationship: data.relationship,
        acquaintedSince: data.acquaintedSince
    }
}

exports.saveFimActivity = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        const findFimActivity = await model.FimActivity.findOne({ where: { userId: userId } })
        if (findFimActivity == null) {
            await model.FimActivity.create(parseFimActivityRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": parseFimActivityResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findFimActivity.update(parseFimActivityRequest(userId, req.body))
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": parseFimActivityResponse(result)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    })
}

function parseFimActivityRequest(userId, reqBody) {
    return {
        userId: userId,
        responsibility: reqBody.responsibility ? reqBody.responsibility.trim() : null,
        role: reqBody.role ? reqBody.role.trim() : null,
        duration: reqBody.duration ? reqBody.duration.trim() : null,
        eventScale: reqBody.eventScale ? reqBody.eventScale.trim() : null,
        result: reqBody.result ? reqBody.result.trim() : null
    }
}

function parseFimActivityResponse(data) {

    if (data == null) return null

    return {
        responsibility: data.responsibility,
        role: data.role,
        duration: data.duration,
        eventScale: data.eventScale,
        result: data.result
    }
}

exports.saveOrganizationExperience = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        try {
            let userIdentity = JSON.parse(response);
            let userId = userIdentity.userId;

            validateOrganizationExperienceRequestBody(req.body)

            model.OrganizationExperience.findAll({ where: { userId: userId } })
            .then(result => {
                deleteExistingOrganizationExperience(userId, result)
                    
                model.OrganizationExperience.bulkCreate(parseOrganizationExperiencesRequest(userId, req.body))
                .then(result => {
                    return res.status(200).json({
                        "status": true,
                        "message": "Data Inserted",
                        "data": parseOrganizationExperiencesResponse(result)
                    })
                }).catch(err => {
                    return res.status(400).json({
                        "status": false,
                        "message": "Something Error " + err,
                        "data": null
                    })
                })
            })
        } catch (err) {
            return res.status(400).json({
                "status": false,
                "message": err.message,
                "data": null
            })
        }
    })
}

function validateOrganizationExperienceRequestBody(reqBody) {    
    if (reqBody.length == 0 || reqBody.length > 3) throw new Error("Data can't be less than one or more than three!");
}

function deleteExistingOrganizationExperience(userId, data) {
    if (data.length > 0) {
        model.OrganizationExperience.destroy({ where: { userId: userId } })
        .catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        })
    }
}

function parseOrganizationExperiencesRequest(userId, reqBody) {
    organizationArr = [];
    organizationObj = {};

    reqBody.forEach((item) => {
        organizationObj = {
            userId: userId,
            referencePerson: item.referencePerson ? item.referencePerson.trim() : null,
            role: item.role ? item.role.trim() : null,
            duration: item.duration ? item.duration.trim() : null,
            eventScale: item.eventScale ? item.eventScale.trim() : null,
            result: item.result ? item.result.trim() : null,
        }
    
        organizationArr.push(organizationObj);
    })

    return organizationArr;
}

function parseOrganizationExperiencesResponse(data) {
    organizationArr = [];
    organizationObj = {};

    data.forEach((item) => {
        organizationObj = {
            id: item.id,
            referencePerson: item.referencePerson,
            role: item.role,
            duration: item.duration,
            eventScale: item.eventScale,
            result: item.result,
        }
    
        organizationArr.push(organizationObj);
    })

    return organizationArr;
}