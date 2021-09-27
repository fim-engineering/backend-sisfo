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
        
        data = {
            answer: JSON.parse(req.body.answers),
            tunnelId: req.body.tunnelId,
            createdBy: userId
        }

        data.answer.forEach((item) => {
            model.Answer.findOne({ where: { QuestionId: item.QuestionId, createdBy: userId } })
            .then(async result => {
                payload = {
                    answer: JSON.stringify(item.answer),
                    QuestionId: item.QuestionId,
                    TunnelId: data.tunnelId,
                    createdBy: userId
                }

                if (result == null) answer = model.Answer.create(payload)
                else result.update(payload)

            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        })

        model.Answer.findAll({ where: { createdBy: userId, TunnelId: data.tunnelId } })
        .then(result => {
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

function setSecondFormCompletenessToTrue(userId) {
    model.FormCompleteness.findOne({ where: { userId: userId }})
    .then(formCompleteness => {

        data = {
            userId: userId,
            fimBatch: "23", /* TODO: Make it dynamic */
            isSecondStepCompleted: true
        }

        if (formCompleteness == null) {
            model.FormCompleteness.create(data)
            .catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            formCompleteness.update(data)
            .catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    }).catch(err => {
        return res.status(400).json({
            "status": false,
            "message": "Something Error " + err,
            "data": null
        })
    })
}

function setThirdFormCompletenessToTrue(userId) {
    model.FormCompleteness.findOne({ where: { userId: userId }})
    .then(formCompleteness => {

        data = {
            userId: userId,
            fimBatch: "23", /* TODO: Make it dynamic */
            isThirdStepCompleted: true
        }

        if (formCompleteness == null) {
            model.FormCompleteness.create(data)
            .catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            formCompleteness.update(data)
            .catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    }).catch(err => {
        return res.status(400).json({
            "status": false,
            "message": "Something Error " + err,
            "data": null
        })
    })
}