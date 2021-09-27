const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../util/redis');
const Sequelize = require('sequelize');
const Op = Sequelize.Op


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

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed Bro');
        error.statusCode = 442;
        error.data = errors.array();
        return res.json(error);
    }

    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    // Password encryption
    bcrypt.hash(password, 12)
    .then(hashPass => {
        model.User.create({
            email: email,
            password: hashPass,  
            name: name
        });
    }).then(result => {
        res.status(201).json({
            message: "User Created",
            userId: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    
        next(err);
    });
}


exports.SocialLogin = (req, res, next) => {
    let email = req.body.email;
    let socialId = req.body.socialId;
    let name = req.body.firstName + ' ' + req.body.lastName
    let loginSource = req.body.loginSource;
    let profilPicture = req.body.profilPicture;

    model.User.findOrCreate({
        where: { email: email },
        defaults: {
            profilPicture: profilPicture,
            socialId: socialId,
            loginSource: loginSource
        }
    }).then(async ([user, created]) => {
        const userData = await user.get();
        let status = userData.status !== null ? userData.status : 0;
        const data_identity = {
            email: userData.email,
            userId: userData.id,
            step: status
        }

        const token = jwt.sign(data_identity, process.env.JWT_KEY, { expiresIn: 60000 }); // 
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

exports.saveKtp = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;
        const emailId = userIdentity.email;
        const noKtp = req.body.noKtp;
        const urlKtp = req.body.urlKtp;

        // cari nomor ktp
        const findIdentity = await model.Identity
            .findOne({ where: { [Op.or]: [{ktpNumber: noKtp}
                // ,{email:emailId} // ini kemarin bikin kasus ktp anda digunakan oleh null
            ] } })
            .then(result => { return result })
            .catch(err => { console.log(err) })

        const findUser = await model.User
            .findOne({ where: { email: emailId } })
            .then(result => { return result })
            .catch(err => console.log(err))

        // check KTP di tabel identity jika null bikin, jika ada update
        if (findIdentity === null) {
            await model.Identity.create({
                email: emailId,
                userId: userId,
                ktpUrl: urlKtp,
                ktpNumber: noKtp
            }).then(async result => {
                // check status dan update redis
                const findStatus = await model.Identity
                    .findOne({ where: { ktpNumber: noKtp } })
                    .then(result => { return result })
                    .catch(err => { console.log(err) })

                let stepupdate = 0;
                if (findStatus !== null && findStatus.ktpUrl == null) {
                    stepupdate = 1
                    if (findUser.status <= 2) {
                        findUser.update({ status: 1 }).catch(err => console.log(err));
                        redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 1 }))
                    }
                } else {
                    stepupdate = 2
                    // menghindari setelah 2 
                    if (findUser.status <= 2) {
                        findUser.update({ status: 2 }).catch(err => console.log(err));
                        redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 2 }))
                    }
                }



                return res.status(200).json({
                    "status": true,
                    "message": "KTP dan foto KTP berhasil diperbarui"
                })
            }).catch(err => console.log(err));




        }
        // update
        else {
            // pastikan user id masih nul jika tidak null kasih tau kalau itu sudah dipakai
            if (findIdentity.userId == null || findIdentity.email == emailId) {
                await findIdentity.update({
                    email: emailId,
                    userId: userId,
                    ktpUrl: urlKtp,
                    ktpNumber: noKtp
                }).catch(err => console.log(err));

                // check status dan update redis
                const findStatus = await model.Identity
                    .findOne({ where: { ktpNumber: noKtp } })
                    .then(result => { return result })
                    .catch(err => { console.log(err) })

                let stepupdate = 0;
                if (findStatus !== null && findStatus.ktpUrl == null) {
                    stepupdate = 1
                    if (findUser.status <= 2) {
                        findUser.update({ status: 1 }).catch(err => console.log(err));
                        redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 1 }))
                    }
                } else {
                    stepupdate = 2
                    // menghindari setelah 2 
                    if (findUser.status <= 2) {
                        findUser.update({ status: 2 }).catch(err => console.log(err));
                        redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 2 }))
                    }
                }



                return res.status(200).json({
                    "status": true,
                    "message": "KTP dan foto KTP berhasil diperbarui"
                })
            } else {
                return res.status(200).json({
                    "status": false,
                    "message": "Nomor KTP sudah digunakan oleh " + findIdentity.name + " - " + findIdentity.email
                })
            }
        }





    })
}

exports.getProfile = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const user = JSON.parse(response);
        const userId = user.userId;
        
        model.User.findOne({ where: { id: userId }, attributes: {exclude: ['password', 'status', 'createdAt', 'updatedAt']}, include: [
            { 
                model: model.Identity,
                attributes: {
                    exclude: [
                        'id', 'userId', 'email', 'headline', 'batchFim', 'otherReligion','reference_by', 'expertise', 'video_editing', 'mbti', 'role', 'ktpUrl',
                        'status_accept', 'attendenceConfirmationDate', 'paymentDate', 'bankTransfer', 'urlTransferPhoto', 'createdAt', 'updatedAt'
                    ]
                }
            },
            { model: model.Skill, attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']} },
            { model: model.SocialMedia, attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']} },
            { model: model.AlumniReference, attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']} },
            { model: model.FimActivity, attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']} },
            { model: model.OrganizationExperience, attributes: {exclude: ['userId', 'createdAt', 'updatedAt']} }
        ]}).then(result => {
            return res.status(200).json({
                "status": true,
                "message": "Data Fetched",
                "data": result
            })
        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        })
    })
}

exports.saveIdentity = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let fullName = firstName.concat(" ", lastName);

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;
        const data = {
            userId: userId,
            fullName: fullName,
            firstName: firstName,
            lastName: lastName,
            phone: req.body.phone,
            emergencyPhone: req.body.emergencyPhone,
            ktpNumber: req.body.ktpNumber,
            photoUrl: req.body.photoUrl,
            religion: req.body.religion,
            bornPlace: req.body.bornPlace,
            bornDate: req.body.bornDate,
            address: req.body.address,
            cityAddress: req.body.cityAddress,
            provinceAddress: req.body.provinceAddress,
            gender: req.body.gender,
            bloodGroup: req.body.bloodGroup,
            hobby: req.body.hobby,
            institution: req.body.institution,
            occupation: req.body.occupation
        }

        const findIdentity = await model.Identity.findOne({ 
            where: { userId: userId }, 
            attributes: {
                exclude: [
                    'userId', 'email', 'headline', 'batchFim', 'hobby', 'otherReligion', 'reference_by', 'expertise', 'video_editing', 'mbti', 'role', 'ktpUrl',
                    'status_accept', 'attendenceConfirmationDate', 'paymentDate', 'bankTransfer', 'urlTransferPhoto', 'createdAt', 'updatedAt'
                ]
            }
        })

        if (!findIdentity) {
            await model.Identity.create(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": dataresult
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findIdentity.update(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": dataresult
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

exports.saveSkill = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            userId: userId,
            isAbleVideoEditing: req.body.isAbleVideoEditing,
            videoEditingPortofolioUrl: req.body.videoEditingPortofolioUrl,
            firstCertificateUrl: req.body.firstCertificateUrl,
            secondCertificateUrl: req.body.secondCertificateUrl,
            thirdCertificateUrl: req.body.thirdCertificateUrl,
        }

        const findSkill = await model.Skill.findOne({ 
            where: { userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (!findSkill) {
            await model.Skill.create(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": dataresult
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findSkill.update(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": dataresult
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

exports.saveSocialMedia = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            userId: userId,
            instagramUrl: req.body.instagramUrl,
            twitterUrl: req.body.twitterUrl,
            facebookUrl: req.body.facebookUrl,
            websiteUrl: req.body.websiteUrl,
            otherSiteUrl: req.body.otherSiteUrl,
        }

        const findSocialMedia = await model.SocialMedia.findOne({ 
            where: { userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (!findSocialMedia) {
            await model.SocialMedia.create(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": dataresult
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findSocialMedia.update(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": dataresult
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

exports.saveAlumniReference = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            userId: userId,
            fullName: req.body.fullName,
            batch: req.body.batch,
            phoneNumber: req.body.phoneNumber,
            relationship: req.body.relationship,
            acquaintedSince: req.body.acquaintedSince,
        }

        const findAlumniReference = await model.AlumniReference.findOne({ 
            where: { userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (!findAlumniReference) {
            await model.AlumniReference.create(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": dataresult
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findAlumniReference.update(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": dataresult
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

exports.saveFimActivity = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            userId: userId,
            responsibility: req.body.responsibility,
            role: req.body.role,
            duration: req.body.duration,
            eventScale: req.body.eventScale,
            result: req.body.result,
        }

        const findFimActivity = await model.FimActivity.findOne({ 
            where: { userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (!findFimActivity) {
            await model.FimActivity.create(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": dataresult
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findFimActivity.update(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": dataresult
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

exports.createOrganizationExperience = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const organizationExperiences = await model.OrganizationExperience.findAndCountAll({ 
            where: { userId: userId }, 
        })
            
        if (organizationExperiences.count > 0) {
            model.OrganizationExperience.destroy({ where: { userId: userId } })
            .catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }

        if (req.body.length == 0 || req.body.length > 3) {
            return res.status(400).json({
                "status": false,
                "message": "Data can't be less than 1 or more than 3 items",
                "data": null
            })
        }

        let i = 0;
        reqBody = req.body;
        organizationArr= [];
        organizationObj = {};
        for (;reqBody[i];) {
            organizationObj = {
                userId: userId,
                referencePerson: reqBody[i].referencePerson,
                role: reqBody[i].role,
                duration: reqBody[i].duration,
                eventScale: reqBody[i].eventScale,
                result: reqBody[i].result,
            }

            organizationArr.push(organizationObj);
            i++;
        }
            
        model.OrganizationExperience.bulkCreate(organizationArr)
        .then(response => {
            return res.status(200).json({
                "status": true,
                "message": "Data Inserted",
                "data": response
            })
        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        })
    })
}

exports.updateOrganizationExperience = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {  
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;      
        const data = {
            referencePerson: req.body.referencePerson,
            role: req.body.role,
            duration: req.body.duration,
            eventScale: req.body.eventScale,
            result: req.body.result,
        }

        const findOrganizationExperience = await model.OrganizationExperience.findOne({ 
            where: { id: req.params.organizationExperienceId, userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (!findOrganizationExperience) {
            return res.status(400).json({
                "status": false,
                "message": "Data not found",
                "data": null
            })
        } else {
            findOrganizationExperience.update(data)
            .then(dataresult => {
                response = {
                    id: dataresult.dataValues.id,
                    referencePerson: dataresult.dataValues.referencePerson,
                    role: dataresult.dataValues.role,
                    duration: dataresult.dataValues.duration,
                    eventScale: dataresult.dataValues.eventScale,
                    result: dataresult.dataValues.result,
                }

                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": response
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

exports.saveTunnel = (req, res, nex) => {
    let token = req.get('Authorization').split(' ')[1];

    const data = {
        TunnelId: req.body.TunnelId,
        RegionalId: req.body.RegionalId
    }

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.User.findOne({ where: { id: userId } })
        .then(result => {
            result.update({
                TunnelId: data.TunnelId,
                RegionalId:data.RegionalId,
                status: 3
            }).then(dataresult => {
                redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 3 }))

                return res.status(200).json({
                    "status": true,
                    "message": "Tunnel Updated",
                    "data": dataresult
                })
            })
        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        });
    });
}