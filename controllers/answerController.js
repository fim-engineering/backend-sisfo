const model = require('../models/index');
const redisClient = require('../util/redis');


exports.getAnswer = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        data = {
            TunnelId: req.query.tunnelId,
            createdBy: userId
        }

        model.Answer.findAll({ where: data })
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
    });
}



exports.saveAnswer = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    
    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        const data = {
            answer: JSON.parse(req.body.answers),
            tunnelId: req.body.tunnelId,
            createdBy: userId
        }

        data.answer.forEach((item) => {
            model.Answer.findOne({
                where: {
                    QuestionId: item.QuestionId,
                    createdBy: userId
                }
            }).then(async result => {
                if (result == null) {
                    model.Answer.create({
                        answer: JSON.stringify(item.answer),
                        QuestionId: item.QuestionId,
                        TunnelId: data.tunnelId,
                        createdBy: userId
                    })
                } else {
                    result.update({
                        answer: JSON.stringify(item.answer),
                        QuestionId: item.QuestionId,
                        TunnelId: data.TunnelId,
                        createdBy: userId
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

        model.Answer.findAll({
            where: { 
                createdBy: userId,
                TunnelId: data.tunnelId
            }
        }).then(result => {
            return res.status(200).json({
                "status": true,
                "message": "Data Inserted",
                "data": result
            })
        }).catch(err => {
            return res.status(400).json({
                "status": false,
                "message": "Something Error " + err,
                "data": null
            })
        })
    });
}