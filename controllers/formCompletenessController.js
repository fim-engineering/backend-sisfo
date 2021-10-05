const model = require('../models/index');
const redisClient = require('../util/redis');

exports.FIRST_STEP = 1
exports.SECOND_STEP = 2
exports.THIRD_STEP = 3
exports.FOURTH_STEP = 4

exports.getFormCompleteness = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.FormCompleteness.findOne({ where: { userId: userId } })
        .then(result => {
            if (result == null) {
                payload = {
                    userId: userId,
                    fimBatch: "23" /* TODO: Make it dynamic */
                }

                model.FormCompleteness.create(payload)
                .then(result => {
                    return res.status(200).json({
                        "status": true,
                        "message": "Data Fetched",
                        "data": parseResponse(result.dataValues)
                    })
                }).catch(err => {
                    return res.status(400).json({
                        "status": false,
                        "message": "Something Error " + err,
                        "data": null
                    })
                })
            } else {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Fetched",
                    "data": parseResponse(result.dataValues)
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
}

exports.submitFormCompleteness = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const findFormCompleteness = await model.FormCompleteness.findOne({ 
            where: { userId: userId }
        })

        submittedAt = null;
        if (findFormCompleteness) {
            submittedAt = findFormCompleteness.submittedAt;
            if (submittedAt == null) submittedAt = new Date();
        } else {
            submittedAt = new Date();
        }

        const data = {
            userId: userId,
            fimBatch: "23", /* TODO: Make it dynamic */
            submittedAt: submittedAt
        }

        if (findFormCompleteness == null) {
            await model.FormCompleteness.create(data)
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": parseResponse(result.dataValues)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            findFormCompleteness.update(data)
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": parseResponse(result.dataValues)
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        }
    })
}

function countProgress(formCompleteness) {
    progress = 0;
    isFirstStepCompleted = formCompleteness.isFirstStepCompleted;
    isSecondStepCompleted = formCompleteness.isSecondStepCompleted;
    isThirdStepCompleted = formCompleteness.isThirdStepCompleted;
    isFourthStepCompleted = formCompleteness.isFourthStepCompleted;
    if (isFirstStepCompleted == true) progress += 25;
    if (isSecondStepCompleted == true) progress += 25;
    if (isThirdStepCompleted == true) progress += 25;
    if (isFourthStepCompleted == true) progress += 25;

    return progress;
}

function parseResponse(formCompleteness) {
    return {
        id: formCompleteness.id,
        isFirstStepCompleted: formCompleteness.isFirstStepCompleted,
        isSecondStepCompleted: formCompleteness.isSecondStepCompleted,
        isThirdStepCompleted: formCompleteness.isThirdStepCompleted,
        isFourthStepCompleted: formCompleteness.isFourthStepCompleted,
        progress: countProgress(formCompleteness),
        submittedAt: formCompleteness.submittedAt,
    }
}

exports.setSelectedFormCompletenessToTrue = function(userId, step) {

    model.FormCompleteness.findOne({ where: { userId: userId }})
    .then(formCompleteness => {

        data = {
            userId: userId,
            fimBatch: "23", /* TODO: Make it dynamic */
        }

        if (step == this.FIRST_STEP) data['isFirstStepCompleted'] = true
        if (step == this.SECOND_STEP) data['isSecondStepCompleted'] = true
        if (step == this.THIRD_STEP) data['isThirdStepCompleted'] = true
        if (step == this.FOURTH_STEP) data['isFourthStepCompleted'] = true

        if (formCompleteness == null) {
            model.FormCompleteness.create(data)
            .catch(err => {
                throw new Error("Something Error " + err)
            })
        } else {
            formCompleteness.update(data)
            .catch(err => {
                throw new Error("Something Error " + err)
            })
        }
    }).catch(err => {
        throw new Error("Something Error " + err)
    })
}