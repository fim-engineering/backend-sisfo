const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var redis = require("redis");
var url = require('url');

const LoginDataRedis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    no_ready_check: 'true',
}

console.log("===========")
console.log("===========")
console.log("===========")
console.log("LoginDataRedis: ", LoginDataRedis)
console.log("process.env.REDIS_HOST: ", process.env.REDIS_HOST)

let client = redis.createClient(process.env.REDIS_URL);
// client.auth(redisURL.auth.split(":")[1]);

exports.checkSession = (req, res, next) => {
    const token = req.body.token;

    client.get('login_portal:' + token, function (err, response) {
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
                if (user.ktpNumber !== null && ktpUrl !== null) {
                    status = 2; //ada ktp/tidak ada ktp + ada url_ktp
                }
            }

            return status
        }).catch(err => {
            console.log(err)
        });

        const data_identity = {
            email: userData.email,
            userId: userData.id
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

        client.setex('login_portal:' + token, 60000, JSON.stringify(data_identity))

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


