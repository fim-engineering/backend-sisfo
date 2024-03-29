const model = require('../models/index');
const redisClient = require('../util/redis');
const Sequelize = require('sequelize');

const Op = Sequelize.Op

exports.lists = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        // search apakah dia fim 20 atau engga
        const findIdentity = await model.Identity.findOne({ where: { userId: userId } }).then(identity => {
            return identity;
        }).catch(err => console.log(err))


        // search di summary apakah ada jalur yang sudah final. 
        // karena ada kemungkinan 1 user ada banyak summary ketika dia tidak jadi memilih 1 jalur dan belum final
        // Hal ini mencegah peserta daftar di multi jalur
        const arrayDenied = [];
        const findSummary = await model.Summary.findAll({ where: { 
            ktpNumber: findIdentity.ktpNumber, 
            isFinal:1 ,
            batchFim: '22'
        } }).then(result => {
            result.map((value) => {
                arrayDenied.push(value.TunnelId);
            })
        }).catch(err => console.log(err));


        // bukan anak FIM 
        // kalau udah milih 1 di summary dan sudah menunjukan data final 
        // maka udah ga boleh milih yang lain lagi      
        let whereNotFim = null;
        if (arrayDenied.length > 0) {
            whereNotFim = {
                name: { [Op.not]: "Alumni FIM 20" },
                id: { [Op.in]: arrayDenied },
                batchFim: '22'
            };
        } else {
            whereNotFim = {
                name: { [Op.not]: "Alumni FIM 20" },
                batchFim: '22'
            };
        }

        // conditional anak FIM
        let whereFim = null;
        if (arrayDenied.length > 0 && arrayDenied.length < 2) {
            if (arrayDenied.indexOf(1) !== -1) // artinya ada next gen di sana
            {
                whereFim = {
                    id: { [Op.notIn]: arrayDenied },
                    batchFim: '22'
                };
            }
            // jika tidak ada next gen , maka pilihannya hanya next Gen
            else {
                whereFim = {
                    name: "Alumni FIM 20",
                    batchFim: '22'
                };
            }

        } else if (arrayDenied.length >= 2) {
            whereFim = {
                id: { [Op.in]: arrayDenied },
                batchFim: '22'
            };
        }
        else {
            whereFim = {
                name: "Alumni FIM 20",
                createdAt: { [Op.not]: null },
                batchFim: '22'
            };
        }

        // console.log(whereFim)

        // bukan anak fim
        if (findIdentity !== null && findIdentity.batchFim == null) {
            listTunnel = await model.Tunnel.findAll({
                where: whereNotFim
            }).then(result => {
                return result
            }).catch(err => { console.log(err) });
        }
        // anak FIM
        else {
            listTunnel = await model.Tunnel.findAll({
                where: whereFim
            }).then(result => {
                return result
            }).catch(err => { console.log(err) });
        }


        res.status(200).json({
            status: true,
            message: "data fetched",
            data: listTunnel
        });

    });
}


exports.create = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            name: req.body.name,
            description: req.body.description
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
            name: req.body.name,
            description: req.body.description
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



