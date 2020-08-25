const model = require('../models/index');
const redisClient = require('../util/redis');
const { json } = require('sequelize');


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
                message: "Whoops Something Error",
                data: err
            });
        }

        const data = {
            ktpNumber: req.body.ktpNumber,
            TunnelId: req.body.TunnelId
        }

        const status = await model.Summary.findOne({
            where: data
        }).then(result => {
            return result
        }).catch(err => {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error",
                data: err
            });
        })

        // let decision = false;
        // if (status.isFinal == 1) {
        //     decision = true;
        // } else {
        //     decision = false
        // }

        // if (decision) {
        //     model.User.findOne({ where: { email: userIdentity.email } })
        //         .then(user => {
        //             user.update({ status: 5 })
        //             redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 5 }))
        //         })
        //         .catch(err => console.log(err))
        // } else {
        //     model.User.findOne({ where: { email: userIdentity.email } })
        //         .then(user => {
        //             user.update({ status: 4 })
        //             redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 4 }))
        //         })
        //         .catch(err => console.log(err))
        // }

        const fimBatch = await model.Fimbatch.findAll({
            limit: 1,
            order: [['id', 'DESC']]
        }).then(result => {
            return result[0]
        })

        model.Summary.update({
            // isFinal: !decision ? 1 : 0
            isFinal: 1
        }, {
            where: {
                ktpNumber: req.body.ktpNumber,
                TunnelId: req.body.TunnelId,
                batchFim: fimBatch.name
            }
        }
        ).then((status, result) => {

            model.User.findOne({ where: { email: userIdentity.email } })
                .then(user => {
                    user.update({ status: 5 })
                    redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 5 }))
                })
                .catch(err => console.log(err))

            res.status(200).json({
                status: true,
                message: "Data Updated",
                data: status
            });

        }).catch(err => {
            console.log(err)
            res.status(400).json({
                status: false,
                message: "Error Gaes",
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
            TunnelId: req.body.tunneId,
            score: req.body.score
        }


        model.Summary.update({
            score: data.score
        }, {
            where: {
                ktpNumber: req.body.ktpNumber,
                TunnelId: req.body.tunneId
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
            TunnelId: req.body.tunneId,
            recruiterId: req.body.recruiterId
        }


        model.Summary.update({
            recruiterId: data.recruiterId
        }, {
            where: {
                ktpNumber: req.body.ktpNumber,
                TunnelId: req.body.tunneId
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


exports.checkDaftar = async (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error",
                data: err
            });
        }

        const findIdentity = await model.Identity.findOne({ where: { userId: userId } }).then(identity => {
            return identity;
        }).catch(err => console.log(err))

        // search di summary apakah ada
        const arrayDenied = [];
        const findSummary = await model.Summary.findAll({ where: { ktpNumber: findIdentity.ktpNumber, isFinal: 1 } }).then(result => {
            result.map((value) => {
                arrayDenied.push(value.TunnelId);
            })
        }).catch(err => console.log(err));

        // bukan anak FIM // kalau udah milih 1 di summary maka udah ga boleh milih yang lain lagi      
        let statusNonFim = null;
        if (arrayDenied.length > 0) {
            statusNonFim = false;
        } else {
            statusNonFim = true
        }

        // conditional anak FIM
        let statusFim = null;
        if (arrayDenied.length > 0 && arrayDenied.length < 2) {
            if (arrayDenied.indexOf(1) !== -1) // artinya ada next gen di sana
            {
                statusFim = true;
            }
            // jika tidak ada next gen , maka pilihannya hanya next Gen
            else {
                statusFim = true;
            }

        } else if (arrayDenied.length >= 2) {
            statusFim = false;
        }
        else {
            statusFim = true;
        }

        if (findIdentity.batchFim == null) {
            statusnya = statusNonFim;
        } else {
            statusnya = statusFim;
        }

        res.status(200).json({
            status: statusnya,
            message: "data fetched",
        });

    });
}

exports.statisticBatch = async (req, res) => {
    const listTunnelCurrentFim = await model.Tunnel.findAll({
        where: {
            batchFim: '22'
        }
    }).then(result => {
        return JSON.parse(JSON.stringify(result))
    }).catch(err => console.log(err))


    const refractArray = [];


    const getData = () => {
        return Promise.all(
            listTunnelCurrentFim.map(async (value) => {
                const countFinal = await model.Summary.count({
                    where: {
                        TunnelId: value.id,
                        isFinal: 1
                    }
                }).then(result => {
                    return result
                }).catch(err => console.log(err))

                const countFinalAll = await model.Summary.count({
                    where: {
                        TunnelId: value.id,
                    }
                }).then(result => {
                    return result
                }).catch(err => console.log(err))

                await refractArray.push({
                    tunnelId: value.id,
                    nameTunnel: value.name,
                    urlPicture: value.urlPicture,
                    count: countFinalAll,
                    countFinal: countFinal
                })
            })
        )
    }

    getData().then(resu => {
        const sumAll = refractArray.reduce((a, { count }) => a + count, 0)

        res.status(200).json({
            status:true,
            data: refractArray,
            total: sumAll,
            message: "data fetched",
        });
    }).catch(err=> {
        res.status(400).json({
            status:false,
            data: null
        });
    })


}





