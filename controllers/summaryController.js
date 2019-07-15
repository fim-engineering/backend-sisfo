const model = require('../models/index');
const redisClient = require('../util/redis');


exports.lists = async (req, res, next) => {
    model.Tunnel.findAll({
        include: [{
            model: model.Identity,
            include: [{ model: model.User }]
        }]
    }).then(listTunnels => {
        res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: status
        });
    }).catch(err => {
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            data: err
        });
    })
}


exports.updateFinal = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
   
    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);       
        const userId = userIdentity.userId;

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error Coy",
                data: err
            });
        }

        const data = {
            ktpNumber: req.body.ktpNumber,
            tunnelId: req.body.tunnelId
        }

        const status = await model.Summary.findOne({
            where: data
        }).then(result => {            
            if (result.isFinal == 1) {
                return true
            } else {
                return false
            }

        }).catch(err => {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error",
                data: err
            });
        })

        model.Summary.update({
            isFinal: !status
        }, {
                where: {
                    ktpNumber: req.body.ktpNumber,
                    tunnelId: req.body.tunneId
                }
            }
        ).then((status, result) => {
            res.status(200).json({
                status: true,
                message: "Data Updated",
                data: status
            });

        }).catch(err => {
            res.status(400).json({
                status: false,
                message: "Error",
                data: err
            });
        })
    });
}


exports.updateScore = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error",
                data: err
            });
        }

        const data = {
            ktpNumber: req.body.ktpNumber,
            tunnelId: req.body.tunneId,
            score: req.body.score
        }


        model.Summary.update({
            score: data.score
        }, {
                where: {
                    ktpNumber: req.body.ktpNumber,
                    tunnelId: req.body.tunneId
                }
            }
        ).then((status, result) => {
            res.status(200).json({
                status: true,
                message: "Data Updated",
                data: status
            });

        }).catch(err => {
            res.status(400).json({
                status: false,
                message: "Error",
                data: err
            });
        })
    });
}

exports.updateEvaluator = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error",
                data: err
            });
        }

        const data = {
            ktpNumber: req.body.ktpNumber,
            tunnelId: req.body.tunneId,
            recruiterId: req.body.recruiterId
        }


        model.Summary.update({
            recruiterId: data.recruiterId
        }, {
                where: {
                    ktpNumber: req.body.ktpNumber,
                    tunnelId: req.body.tunneId
                }
            }
        ).then((status, result) => {
            res.status(200).json({
                status: true,
                message: "Data Updated",
                data: status
            });

        }).catch(err => {
            res.status(400).json({
                status: false,
                message: "Error",
                data: err
            });
        })
    });
}





