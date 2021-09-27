const model = require('../models/index');
const redisClient = require('../util/redis');


exports.getDocument = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.PersonalDocument.findOne({
            where: { userId: userId }
        }).then(result => {
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

exports.saveDocument = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        const data = {
            userId: userId,
            identityFileUrl: req.body.identityFileUrl ? req.body.identityFileUrl.trim() : null,
            recommendationLetterUrl: req.body.recommendationLetterUrl ? req.body.recommendationLetterUrl.trim() : null,
            commitmentLetterUrl: req.body.commitmentLetterUrl ? req.body.commitmentLetterUrl.trim() : null
        }

        const findPersonalDocument = await model.PersonalDocument.findOne({ 
            where: { userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (findPersonalDocument == null) {
            await model.PersonalDocument.create(data)
            .then(result => {
                
                setFourthFormCompletenessToTrue(userId)
            
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
        } else {
            findPersonalDocument.update(data)
            .then(result => {

                setFourthFormCompletenessToTrue(userId)

                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": result
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

function setFourthFormCompletenessToTrue(userId) {
    model.FormCompleteness.findOne({ where: { userId: userId }})
    .then(formCompleteness => {

        data = {
            userId: userId,
            fimBatch: "23", /* TODO: Make it dynamic */
            isFourthStepCompleted: true
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