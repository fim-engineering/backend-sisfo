const model = require('../models/index');
const redisClient = require('../util/redis');


exports.getAttendance = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.Attendance.findOne({
            where: { userId: userId }
        }).then(result => {
            return res.status(200).json({
                "status": true,
                "message": "Data Fetched",
                "data": parseAttendanceResponse(result)
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

exports.saveAttendance = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let userIdentity = JSON.parse(response);
        let userId = userIdentity.userId;

        try {
            validateAttendanceRequestBody(req.body)
            
            const data = {
                userId: userId,
                batch: req.body.batch,
                isAttend: req.body.isAttend,
                reason: req.body.reason,
                reasonUrl: req.body.reasonUrl
            }
        
            const findAttendance = await model.Attendance.findOne({ 
                where: { userId: userId }, 
                attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
            })
        
            if (findAttendance == null) {
                await model.Attendance.create(data)
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
            } else {
                findAttendance.update(data)
                .then(result => {                
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

function validateAttendanceRequestBody(reqBody) {    
    if (!reqBody.batch || reqBody.batch.trim() == "") throw new Error('batch is required!');
}

function parseAttendanceResponse(data) {

    if (data == null) return null

    return {
        batch: data.batch,
        isAttend: data.isAttend,
        reason: data.reason,
        reasonUrl: data.reasonUrl
    }
}