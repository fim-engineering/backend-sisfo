const jwt = require('jsonwebtoken');
const redisClient = require('../util/redis');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error
    }

    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        if (err) {
            res.status(500).json({
                message: "Somethin Went Wrong " + err,
                data: null,
                status: false
            })
        }

        if (response == null) {
            res.status(200).json({
                message: `Token Not Found`,
                data: null,
                status: false
            })
        }
    })



    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error('Not Authenticated');
        err.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};