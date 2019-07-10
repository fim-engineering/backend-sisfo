const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../util/redis')

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
        let status = 0;

        // check KTP di tabel identity jika null bikin, jika ada update
        await model.Identity.findOne({ where: { email: userData.email } }).then(user => {

            if (user == null) {
                model.Identity.create({
                    email: userData.email,
                    userId: userData.id,
                    name: name
                })

                model.User.findOne({ where: { email: userData.email } }).then(result => {
                    if (result.status <= 2) {
                        result.update({
                            status: 0
                        })
                    }
                })
            }
            // update
            else {
                user.update({
                    email: userData.email,
                    userId: userData.id,
                    name: name
                })

                status = 1; //ada ktp/tidak ada ktp + tidak ada url_ktp    
                model.User.findOne({ where: { email: userData.email } }).then(result => {
                    if (result.status <= 2) {
                        result.update({
                            status: 1
                        })
                    }
                })
            }

            if (user.ktpNumber !== null && user.ktpUrl !== null) {
                status = 2; //ada ktp/tidak ada ktp + ada url_ktp
                model.User.findOne({ where: { email: userData.email } }).then(result => {
                    if (result.status <= 2) {
                        result.update({
                            status: 2
                        })
                    }
                })
            }

            return status
        }).catch(err => {
            console.log(err)
        });

        const statusnya = await model.User.findOne({ where: { email: userData.email } }).then(result => {
            return result.status;
        })

        const data_identity = {
            email: userData.email,
            userId: userData.id,
            step: statusnya
        }




        const token = jwt.sign(data_identity, process.env.JWT_KEY, { expiresIn: 60000 }); // 

        // ms('2 days')  // 172800000
        // ms('1d')      // 86400000
        // ms('10h')     // 36000000
        // ms('2.5 hrs') // 9000000
        // ms('2h')      // 7200000
        // ms('1m')      // 60000
        // ms('5s')      // 5000
        // ms('1y')      // 31557600000
        // ms('100')     // 100
        // ms('-3 days') // -259200000
        // ms('-1h')     // -3600000
        // ms('-200')    // -200

        redisClient.setex('login_portal:' + token, 60000, JSON.stringify(data_identity))

        return res.status(200).json({
            "code": 200,
            "token": token,
            "status": statusnya
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


    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;
        const noKtp = req.body.noKtp;
        const urlKtp = req.body.urlKtp;

        // cari nomor ktp
        model.Identity.findOne({
            where: { ktpNumber: noKtp },
            include: [{ model: model.User }]
        }).then(result => {

            // jika ada update, namu check user Id apakah null atau sudah ada
            if (result) {
                const userId_identity = result.userId;
                // jika ada user Id dan tidak sama dengan email login maka, respon bahwa itu sudah dipake
                if (userId_identity !== null && userIdentity.email !== result.email) {

                    // update step di model User
                    model.User.findOne({ where: { email: result.email } }).then(result => {
                        result.update({
                            status: 0
                        })
                    }).catch(err => {
                        return res.status(400).json({
                            "status": false,
                            "message": err
                        })
                    })

                    // update step in Redis
                    redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 0 }))

                    return res.status(200).json({
                        "status": false,
                        "message": "Nomor KTP tersebut sudah digunakan oleh email " + result.email
                    })
                }


                // jika ada ktp namun idUser null maka update artinya belum terhubung ke table User. ini detektor FIM 21 
                else if (userId_identity == null) {
                    // update step di model User
                    model.User.findOne({ where: { email: result.email } }).then(result => {
                        result.update({
                            status: 1
                        })
                    })

                    // update di Identity
                    result.update({
                        userId: userId
                    })

                    // update step in Redis
                    redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 1 }))

                    return res.status(200).json({
                        "status": true,
                        "message": "KTP sudah terinput sebelumnya, User berhasil update"
                    })
                }

                else {
                    model.User.findOne({ where: { email: result.email } }).then(result => {
                        result.update({
                            status: 2
                        })
                    }).catch(err => {
                        return res.status(400).json({
                            "status": false,
                            "message": err
                        })
                    })

                    // update step in Redis
                    redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 2 }))

                    result.update({
                        ktpNumber: noKtp,
                        ktpUrl: urlKtp,
                        userId: userId
                    })


                    return res.status(200).json({
                        "status": true,
                        "message": "KTP " + result.email + " Berhasil diupdate"
                    })
                }
            }

            // jika result null artinya ga ada data sebelumnya sehingga update 2 kolom (nomor ktp dan url_ktp)
            if (result == null) {
                model.Identity.findOne({ where: { 'email': userIdentity.email } }).then(result => {
                    // update step di model User
                    model.User.findOne({ where: { email: result.email } }).then(result => {
                        result.update({
                            status: 2
                        })
                    })

                    // update step in Redis
                    redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 2 }))

                    result.update({
                        ktpNumber: noKtp,
                        ktpUrl: urlKtp,
                        userId: userId
                    })

                    return res.status(200).json({
                        "status": true,
                        "message": "KTP & Foto KTP berhasil terupload"
                    })
                }).catch(err => {
                    return res.status(400).json({
                        "status": false,
                        "message": err
                    })
                })
            }
        }).catch(err => {
            console.log(err)
        })
    })
}

exports.saveProfile = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    const data = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        universityId: req.body.universityId,
        photoUrl: req.body.urlPhoto,
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
        expertise: req.body.expertise
    }

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.Identity.findOne({ where: { userId: userId } }).then(result => {

            return result.update(data).then(result => {

                // UPDATE STEP JIKA SUDAH MENGISI DATA DIRI

                model.User.findOne({ where: { email: userIdentity.email } }).then(datauser => {

                    datauser.update({
                        status: 3
                    })

                    redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 3 }))

                    return res.status(200).json({
                        "status": true,
                        "message": "Sukses Update",
                        "data": result
                    })
                })

            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
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
        tunnelId: req.body.tunnelId
    }

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.User.findOne({ where: { id: userId } }).then(result => {
            result.update({
                tunnelId: data.tunnelId
            }).then(dataresult => {
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

