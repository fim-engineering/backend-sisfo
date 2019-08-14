const jwt = require('jsonwebtoken');
const redisClient = require('../util/redis');

module.exports = (req, res, next) => {
    if (req.get('Authorization')) {
        const authHeader = req.get('Authorization').split(' ')[1];
        if (!authHeader) {
            res.status(401).json({
                message: "NOT AUTH",
                data: null,
                status: false
            })
        }

        let token = req.get('Authorization').split(' ')[1];

        redisClient.get('login_portal:' + token, async function (err, response) {
            if (err) {
                res.status(500).json({
                    message: "Somethin Went Wrong " + err,
                    data: null,
                    status: false
                })
            }

            if (response === null) {
                res.status(200).json({
                    message: `Token Not Found`,
                    data: null,
                    status: false
                })
            }

            if (response) {
                let decodedToken;
                
                decodedToken = await jwt.verify(token, process.env.JWT_KEY, (err, result) => {                
                    if(err){
                        res.status(500).json({
                            message: `Token Error ` + err,
                            data: null,
                            status: false
                        })
                    }else{
                        return result;
                    }                
                });                


                // try {
                //     decodedToken = jwt.verify(token, process.env.JWT_KEY);
                // } catch (err) {
                //     // const error = new Error('Not Authenticated');
                //     // err.statusCode = 500;
                //     // throw error;

                //     res.status(500).json({
                //         message: `Token Error ` + err,
                //         data: null,
                //         status: false
                //     })
                // }

                // if (!decodedToken) {
                //     // const error = new Error('Not Authenticated');
                //     // err.statusCode = 401;
                //     // throw error;

                //     res.status(400).json({
                //         message: `Token Error ` + err,
                //         data: null,
                //         status: false
                //     })

                //     // res.json({
                //     //     message: `Token Error ` + err,
                //     //     code:401,
                //     //     // data: null,
                //     //     status: false
                //     // })
                // }

                req.userId = decodedToken.userId;
                next();
            }
        })
    }else{
        res.status(401).json({
            message: "NOT AUTH",
            data: null,
            status: false
        })
    }
};