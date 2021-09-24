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
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            userId: userId,
            identityFileUrl: req.body.identityFileUrl,
            recommendationLetterUrl: req.body.recommendationLetterUrl,
            commitmentLetterUrl: req.body.commitmentLetterUrl
        }

        const findPersonalDocument = await model.PersonalDocument.findOne({ 
            where: { userId: userId }, 
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        })

        if (!findPersonalDocument) {
            await model.PersonalDocument.create(data)
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Inserted",
                    "data": dataresult
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
            .then(dataresult => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data Updated",
                    "data": dataresult
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