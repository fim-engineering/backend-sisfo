const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
    let expireIn = req.body.expireIn;
    let expireAt = req.body.expireAt;

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

            console.log(user === null)

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


        const token = jwt.sign({
            email: userData.email,
        }, 'thetokenstokens', { expiresIn: expireIn });

        return res.status(200).json({
            "code": 200,
            "token": token,
            "expireAt": expireAt,
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


