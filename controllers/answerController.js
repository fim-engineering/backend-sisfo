const model = require('../models/index');
const redisClient = require('../util/redis');
const formCompletenessController = require('../controllers/formCompletenessController');


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
    
    redisClient.get('login_portal:' + token, function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;
        
        try {

            data = {
                answer: JSON.parse(req.body.answers),
                tunnelId: req.body.tunnelId,
                createdBy: userId
            }

            data.answer.forEach((item, index) => {
                model.Answer.findOne({ where: { QuestionId: item.QuestionId, createdBy: userId } })
                .then(result => {
                    payload = {
                        answer: JSON.stringify(item.answer),
                        QuestionId: item.QuestionId,
                        TunnelId: data.tunnelId,
                        createdBy: userId
                    }

                    if (result == null) answer = model.Answer.create(payload)
                    else result.update(payload)

                    if (index == 0 || index == data.answer.length - 1) {
                        setFormCompletenessByQuestionId(userId, item.QuestionId)
                    }

                }).catch(err => {
                    return res.status(400).json({
                        "status": false,
                        "message": "Something Error " + err,
                        "data": null
                    })
                })
            })

            model.Answer.findAll({ where: { createdBy: userId, TunnelId: data.tunnelId } })
            .then(answerData => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": answerData
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } catch (error) {
            return res.status(400).json({
                "status": false,
                "message": "Something " + error,
                "data": null
            })
        }
    })
}

function setFormCompletenessByQuestionId(userId, questionId) {

    model.Question.findOne({ where: { id: questionId } })
    .then(question => {
        if (question) {
            if (question.category == 'essay') formCompletenessController.setSelectedFormCompletenessToTrue(userId, formCompletenessController.SECOND_STEP)
            if (question.category == 'volunteering_plan') formCompletenessController.setSelectedFormCompletenessToTrue(userId, formCompletenessController.THIRD_STEP)
        }
    })
}