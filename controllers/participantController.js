const model = require('../models/index');
const redisClient = require('../util/redis');


exports.count = async (req, res, next) => {

    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        const query = {
            where: {
              fimBatch: typeof req.query.batch !== 'undefined' ? req.query.batch : ""
            }
        }

        model.FormCompleteness.count(query)
        .then(result => {
            return res.status(200).json({
                status: true,
                message: "Data Fetched",
                data: result
            });
        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        });
    })
}

exports.getAll = async (req, res, next) => {

    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        const query = {
            where: {
              fimBatch: typeof req.query.batch !== 'undefined' ? req.query.batch : ""
            },
            offset: typeof req.query.offset !== 'undefined' ? +req.query.offset : 0,
            limit: typeof req.query.limit !== 'undefined' ? +req.query.limit : 10,
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']}, 
            include: [
                { 
                    model: model.Identity,
                    attributes: {
                        exclude: [
                            'id', 'userId', 'email', 'headline', 'batchFim', 'otherReligion','reference_by', 'expertise', 'video_editing', 'mbti', 'role', 'ktpUrl',
                            'status_accept', 'attendenceConfirmationDate', 'paymentDate', 'bankTransfer', 'urlTransferPhoto', 'createdAt', 'updatedAt'
                        ]
                    }
                }
        ]};

        model.FormCompleteness.findAll(query)
        .then(result => {
            return res.status(200).json({
                status: true,
                message: "Data Fetched",
                data: result
            });
        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        });
    })
}

exports.getDetailByUserId = async (req, res, next) => {

    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        let userIdentity = JSON.parse(response)
        let userId = userIdentity.userId
        let participantId = req.params.userId
        let batch = typeof req.query.batch !== 'undefined' ? req.query.batch : ""

        try {
            model.Identity.findOne({ where: { userId: participantId } })
            .then(identity => { 
                model.Skill.findOne({ where: { userId: participantId } })
                .then(skill => { 
                    model.SocialMedia.findOne({ where: { userId: participantId } })
                    .then(socialMedia => { 
                        model.AlumniReference.findOne({ where: { userId: participantId } })
                        .then(alumniReference => { 
                            model.FimActivity.findOne({ where: { userId: participantId } })
                            .then(fimActivity => { 
                                model.OrganizationExperience.findAll({ where: { userId: participantId } })
                                .then(organizationExperiences => { 
                                    model.PersonalDocument.findOne({ where: { userId: participantId } })
                                    .then(personalDocument => { 
                                        model.Question.findAll({ where: { batchFim: batch } })
                                        .then(questions => { 
                                            model.Answer.findAll({ 
                                                where: { createdBy: participantId, QuestionId: getQuestionIds(questions) },
                                                order: ['QuestionId']
                                            })
                                            .then(answers => { 
                                                return res.status(200).json({
                                                    status: true,
                                                    message: "Data Fetched",
                                                    data: parseParticipantResponse(identity, skill, socialMedia, alumniReference, fimActivity, organizationExperiences, personalDocument, answers)
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

function parseParticipantResponse(identity, skill, socialMedia, alumniReference, fimActivity, organizationExperiences, personalDocument, answers) {
    return {
        "Identity": parseIdentityResponse(identity),
        "Skill": parseSkillResponse(skill),
        "SocialMedia": parseSocialMediaResponse(socialMedia),
        "AlumniReference": parseAlumniReferenceResponse(alumniReference),
        "FimActivity": parseFimActivityResponse(fimActivity),
        "OrganizationExperiences": parseOrganizationExperiencesResponse(organizationExperiences),
        "PersonalDocument": parsePersonalDocumentResponse(personalDocument),
        "Answers": parseAnswersResponse(answers)
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

function parsePersonalDocumentResponse(data) {

    if (data == null) return null

    return {
        identityFileUrl: data.identityFileUrl,
        recommendationLetterUrl: data.recommendationLetterUrl,
        commitmentLetterUrl: data.commitmentLetterUrl
    }
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

function getQuestionIds(data) {
    questionArr = [];

    data.forEach((item) => {
        questionArr.push(item.id);
    })
    
    return questionArr;
}

function parseAnswersResponse(data) {
    answerArr = [];
    answerObj = {};

    data.forEach((item) => {
        answerObj = {
            id: item.id,
            TunnelId: item.TunnelId,
            QuestionId: item.QuestionId,
            answer: item.answer
        }
    
        answerArr.push(answerObj);
    })

    return answerArr;
}