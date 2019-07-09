const model = require('../models/index');
const redisClient = require('../util/redis');


exports.lists = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        model.Tunnel.findAll().then(result => {
            res.status(200).json({
                status: true,
                message: "data fetched",
                data: result
            });
        }).catch(err => {
            console.log(err)
        });

    });
}


exports.create = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            name: req.body.name
        }

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Token Expired",
                data: err
            });
        }

        model.Tunnel.create({
            name: data.name,
            createdBy: userId
        }).then(result => {
            res.status(200).json({
                status: true,
                message: "Data Created",
                data: result
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

exports.read = async (req, res, next) => {
    const idTunnel = req.body.idTunnel;
    model.Tunnel.findByPk(idTunnel).then(result => {
        res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: result
        });
    })
}


exports.update = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Token Expired",
                data: err
            });
        }

        const data = {
            idTunnel: req.body.idTunnel,
            name: req.body.name
        }

        model.Tunnel.update({
            name: data.name,
            createdBy: userId
        }, { where: { id: data.idTunnel } }
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

exports.delete = async (req, res, next) => {
    model.Tunnel.destroy({ where: { id: req.body.idTunnel } }).then(result => {
        res.status(200).json({
            status: true,
            message: "Data Deleted",
            data: null
        });
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            status: false,
            message: "Error Occured",
            data: err
        });
    })
}



