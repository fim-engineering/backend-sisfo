const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.update_status_accept = async (req, res, next) => {

    const value = req.body.value;
    const ktpNumber = req.body.ktpNumber;
    const statusNumber = [0, 1, 999999];

    await model.Identity.findOne({
        where: { 'ktpNumber': ktpNumber }
    }).then(async result => {

        if (value == 0 || value == 1 || value == 999999) {
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


