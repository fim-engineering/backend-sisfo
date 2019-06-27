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

            if (user === null) {
                model.Identity.create({
                    email: userData.email,
                    userId: userData.id,
                    name: name
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
                if (user.ktpNumber !== null && user.ktpUrl !== null) {
                    status = 2; //ada ktp/tidak ada ktp + ada url_ktp
                }

                
            }

            return status
        }).catch(err => {
            console.log(err)
        });

        const data_identity = {
            email: userData.email,
            userId: userData.id,
            step: status
        }

        model.User.findOne({ where: { email: userData.email } }).then(result => {
            result.update({
                status: status
            })
        })

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
                // jika ada user Id maka, respon bahwa itu sudah dipake
                if (userId_identity !== null) {

                    // update step di model User
                    model.User.findOne({ where: { email: result.email } }).then(result => {
                        result.update({
                            status: 0
                        })
                    })

                    return res.status(200).json({
                        "status": false,
                        "message": "Nomor KTP tersebut sudah digunakan oleh email " + result.email
                    })
                }

                // jika ada ktp namun idUser null maka update
                if (userId_identity == null && result !== null) {
                    // update step di model User
                    model.User.findOne({ where: { email: result.email } }).then(result => {
                        result.update({
                            status: 1
                        })
                    })

                    result.update({
                        userId: userId
                    })
                    return res.status(200).json({
                        "status": true,
                        "message": "KTP sudah terinput sebelumnya, User berhasil update"
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

    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phone;
    const universityId = req.body.universityId;


    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.Identity.findOne({ where: { userId: userId } }).then(result => {
            
            return result.update({
                name: name,
                addrees: address,
                phone: phoneNumber,
                universityId: universityId
            }).then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Sukses Update",
                    "data": result
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

