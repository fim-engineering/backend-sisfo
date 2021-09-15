const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RedisClient = require('../util/redis');

exports.update_status_accept = async (req, res, next) => {

    const value = req.body.value;
    const ktpNumber = req.body.ktpNumber;
    const statusNumber = [0, 1, 999999];

    await model.Identity.findOne({
        where: { 'ktpNumber': ktpNumber }
    }).then(async result => {

        if (value == 0 || value == 1 || value == 2 || value == 999999) {
            await result.update({
                status_accept: value
            })
        } else {
            await result.update({
                status_accept: 100, // diterima
                batchFim: value
            })
        }


        return res.status(200).json({
            status: true,
            message: "Status Updated",
            data: result
        });
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            error: err
        });
    })

}

exports.confirmation_update = async (req, res, next) => {
    const kehadiran = req.body.kehadiran;
    const token = req.get('Authorization').split(' ')[1];

    if (kehadiran == null) {
        return res.status(200).json({
            status: false,
            message: "User Not Authorized",
        });
    }

    RedisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);

        if (userIdentity.userId == req.body.idUser) {

            const fimBatch = await model.Fimbatch.findAll({
                limit: 1,
                order: [['id', 'DESC']]
            }).then(result => {
                return result[0]
            })

            await model.Identity.findOne({
                where: { 'userId': userIdentity.userId }
            }).then(async result => {
                const updated = await result.update({
                    batchFim: req.body.kehadiran == 1 ? fimBatch.name : fimBatch.name + 'x',
                    attendenceConfirmationDate: new Date()
                })

                return res.status(200).json({
                    status: true,
                    message: "Status Updated",
                    data: updated
                });
            }).catch(err => {
                console.log(err)
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "User Not Authorized",
            });
        }


    })

    // await.model.Identity.findOne
}

exports.mbti_update = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    if (req.body.mbti == null) {
        return res.status(200).json({
            status: false,
            message: "Please fill answer",
        });
    }

    RedisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);

        if (userIdentity.userId == req.body.idUser) {
            await model.Identity.findOne({
                where: { 'userId': userIdentity.userId }
            }).then(async result => {
                const updated = await result.update({
                    mbti: req.body.mbti
                })

                return res.status(200).json({
                    status: true,
                    message: "MBTI Updated",
                    data: updated
                });
            }).catch(err => {
                console.log(err)
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "User Not Authorized",
            });
        }
    })
}

exports.payment_confirmation = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    if (req.body.paymentDate == null || req.body.bankTransfer == null || req.body.urlTransferPhoto == null ) {
        return res.status(200).json({
            status: false,
            message: "Please fill answer",
        });
    }

    RedisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);

        if (userIdentity.userId == req.body.idUser) {
            await model.Identity.findOne({
                where: { 'userId': userIdentity.userId }
            }).then(async result => {
                const updated = await result.update({
                    paymentDate: req.body.paymentDate,
                    bankTransfer: req.body.bankTransfer,
                    urlTransferPhoto: req.body.urlTransferPhoto,
                })

                return res.status(200).json({
                    status: true,
                    message: "Payment Updated",
                    data: updated
                });
            }).catch(err => {
                console.log(err)
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "User Not Authorized",
            });
        }
    })
}


