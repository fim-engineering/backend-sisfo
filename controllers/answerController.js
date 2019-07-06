const model = require('../models/index');
const redisClient = require('../util/redis');


exports.lists = async (req, res, next) => {

    const data = {
        idTunnel:req.body.tunnelId,
        ktpNumber:req.body.ktpNumber
    }

    model.Answer.findAll({where:data}).then(result => {
        res.status(200).json({
            status: true,
            message: "data fetched",
            data: result
        });
    }).catch(err => {
        console.log(err)
    });
}



exports.create = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const ktpNumber = req.body.ktpNumber;
        const theanswer = req.body.answers; // Array
        // jawaban datang dalam bentu Array
        const data = {
            Answer: req.body.Answer,
            tunnelId:req.body.tunnelId,
            batchFim:req.body.batchFim,
            createdBy: userId
        }

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Token Expired",
                data: err
            });
        }

        model.Answer.create(data).then(result => {
            res.status(200).json({
                status: true,
                message: "Data Created",
                data: result
            });

        }).catch(err => {
            res.status(400).json({
                status: false,
                message: "Error",
                data: err
            });
        })
    });
}

exports.read = async (req, res, next) => {
    const idAnswer = req.body.idAnswer;
    model.Answer.findByPk(idAnswer).then(result => {
        res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: result
        });
    })
}


exports.update = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    
    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Token Expired",
                data: err
            });
        }

        const data = {
            idAnswer:req.body.idAnswer,
            Answer: req.body.Answer,
            tunnelId:req.body.tunnelId,
            batchFim:req.body.batchFim,
            createdBy: userId
        }

        model.Answer.update(data, { where: { id: data.idAnswer } }
        ).then((status,result) => {
            res.status(200).json({
                status: true,
                message: "Data Updated",
                data: status
            });

        }).catch(err => {
            res.status(400).json({
                status: false,
                message: "Error",
                data: err
            });
        })
    });
}

exports.delete = async (req, res, next) => {
    model.Answer.destroy({ where: { id: req.body.idAnswer} }).then(result=>{
        res.status(200).json({
            status: true,
            message: "Data Deleted",
            data: null
        });
    }).catch(err=>{
        console.log(err)
        res.status(400).json({
            status: false,
            message: "Error Occured",
            data: err
        });
    })
}



