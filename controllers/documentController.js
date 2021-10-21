const model = require('../models/index');
const redisClient = require('../util/redis');
const formCompletenessController = require('../controllers/formCompletenessController');


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
                "data": parsePersonalDocumentResponse(result)
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

        try {
            validateDocumentRequestBody(req.body)
            
            const data = {
                userId: userId,
                identityFileUrl: req.body.identityFileUrl.trim(),
                recommendationLetterUrl: req.body.recommendationLetterUrl.trim(),
                commitmentLetterUrl: req.body.commitmentLetterUrl.trim()
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
        } catch (error) {
            return res.status(400).json({
                "status": false,
                "message": "Something " + error,
                "data": null
            })
        }
    })
}

function validateDocumentRequestBody(reqBody) {    
    if (!reqBody.identityFileUrl || reqBody.identityFileUrl.trim() == "") throw new Error('identityFileUrl is required!');
    if (!reqBody.recommendationLetterUrl || reqBody.recommendationLetterUrl.trim() == "") throw new Error('recommendationLetterUrl is required!');
    if (!reqBody.commitmentLetterUrl || reqBody.commitmentLetterUrl.trim() == "") throw new Error('commitmentLetterUrl is required!');
}

function parsePersonalDocumentResponse(data) {

    if (data == null) return null

    return {
        identityFileUrl: data.identityFileUrl,
        recommendationLetterUrl: data.recommendationLetterUrl,
        commitmentLetterUrl: data.commitmentLetterUrl
    }
}