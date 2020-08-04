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

    // Enkripsi Password
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
        })
        .catch(err => {
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
        where: {
            email: email
        },
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
        console.log(err)
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
            if (findIdentity.userId == null) {
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
                    "message": "Nomor KTP sudah digunakan oleh " + findIdentity.name
                })
            }
        }





    })
}

exports.saveProfile = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    console.log(req.body.instagram)
    const data = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        headline: req.body.headline,
        photoUrl: req.body.photoUrl,
        religion: req.body.religion,
        bornPlace: req.body.bornPlace,
        bornDate: req.body.bornDate,
        cityAddress: req.body.cityAddress,
        provinceAddress: req.body.provinceAddress,
        emergencyPhone: req.body.emergencyPhone,
        gender: req.body.gender,
        bloodGroup: req.body.bloodGroup,
        hoby: req.body.hoby,
        expertise: req.body.expertise,
        institution: req.body.institution,
        otherReligion: req.body.otherReligion,

        occupation: req.body.occupation,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        website: req.body.website,
        reference_by: req.body.reference_by,
        video_editing: req.body.video_editing
    }

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        if (err) {
            res.status(500).json({
                message: "Somethin Went Wrong " + err,
                data: null,
                status: false
            })
        }

        const findIdentity = await model.Identity.findOne({ where: { userId: userId } })
            .then(result => { return result })
            .catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })

        findIdentity.update(data).then(async data => {

            const checkFilled = Object.entries(data.toJSON());
            const notFilled = [];
            // mengecek semua fill udah keisi
            await checkFilled.map((value, index) => {

                if (value[0] !== "userId" && value[0] !== "hoby" && value[0] !== "otherReligion" && value[0] !== "batchFim" && value[0] !== "regional" && value[0] !== "expertise" && value[0] !== "emergencyPhone" && value[0] !== "headline") {
                    if (value[1] == null) {
                        notFilled.push(value[0])
                    }

                }
            })

            if (notFilled.length > 0) {
                // Jika sudah terisi semua maka update step cuma sampai 2
                model.User.findOne({ where: { email: userIdentity.email } })
                    .then(user => {
                        if (user.status < 4) {
                            user.update({ status: 3 })
                            redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 3 }))
                        }
                    })
                    .catch(err => console.log(err))

                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "nullData": notFilled,
                    "data": data
                })
            } else {
                // Jika sudah terisi semua maka update step 
                model.User.findOne({ where: { email: userIdentity.email } })
                    .then(user => {
                        if (user.status < 4) {
                            user.update({ status: 4 })
                            redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 4 }))
                        }
                    })
                    .catch(err => console.log(err))

                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "nullData": notFilled,
                    "data": data
                })
            }


        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        })

    })
}

exports.getProfile = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.User.findOne({ where: { id: userId }, include: [{ model: model.Identity }] }).then(result => {
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

exports.saveTunnel = (req, res, nex) => {
    let token = req.get('Authorization').split(' ')[1];

    const data = {
        TunnelId: req.body.TunnelId,
        RegionalId: req.body.RegionalId
    }

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.User.findOne({ where: { id: userId } }).then(result => {
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
            console.log(err)
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        });
    });
}

