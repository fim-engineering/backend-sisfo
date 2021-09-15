const model = require('../models/index');
const redisClient = require('../util/redis');
const Sequelize = require('sequelize');

const Op = Sequelize.Op

exports.lists = async (req, res, next) => {
    listProvince = await model.Regional.findAll({
        attributes: ['province'],
        group: ['province'],
        order: [['province', 'ASC']]
    }).then(result => {
        return result
    }).catch(err => { console.log(err) });

    console.log("HALO")

    listRegional = await model.Regional.findAll({
        order: [['province', 'ASC']]
    }).then(result => {
        return JSON.parse(JSON.stringify(result))
    }).catch(err => { console.log(err) });

    
    const object = [];
    listProvince.map( async (value,index)=> {
        const fil = listRegional.filter((regional)=> {                    
            return regional.province == value.province
         })
        
        //  console.log(fil)

        object.push({
            province:value.province,
            data: fil
        })
    })

    
    

    res.status(200).json({
        status: true,
        message: "data fetched",
        data: object
    });
}


exports.create = async (req, res, next) => {
    // let token = req.get('Authorization').split(' ')[1];
    // redisClient.get('login_portal:' + token, function (err, response) {
    //     const userIdentity = JSON.parse(response);
    //     const userId = userIdentity.userId;

    //     const data = {
    //         name: req.body.name,
    //         description: req.body.description
    //     }

    //     if (err) {
    //         return res.status(400).json({
    //             status: false,
    //             message: "Token Expired",
    //             data: err
    //         });
    //     }

    //     model.Tunnel.create({
    //         name: data.name,
    //         createdBy: userId
    //     }).then(result => {
    //         res.status(200).json({
    //             status: true,
    //             message: "Data Created",
    //             data: result
    //         });

    //     }).catch(err => {
    //         res.status(400).json({
    //             status: false,
    //             message: "Error",
    //             data: err
    //         });
    //     })
    // });
}

exports.read = async (req, res, next) => {
    // const idTunnel = req.body.idTunnel;
    // model.Tunnel.findByPk(idTunnel).then(result => {
    //     res.status(200).json({
    //         status: true,
    //         message: "Data Fetched",
    //         data: result
    //     });
    // })
}


exports.update = async (req, res, next) => {
    // let token = req.get('Authorization').split(' ')[1];

    // redisClient.get('login_portal:' + token, function (err, response) {
    //     const userIdentity = JSON.parse(response);
    //     const userId = userIdentity.userId;

    //     if (err) {
    //         return res.status(400).json({
    //             status: false,
    //             message: "Token Expired",
    //             data: err
    //         });
    //     }

    //     const data = {
    //         idTunnel: req.body.idTunnel,
    //         name: req.body.name,
    //         description: req.body.description
    //     }

    //     model.Tunnel.update({
    //         name: data.name,
    //         createdBy: userId
    //     }, { where: { id: data.idTunnel } }
    //     ).then((status, result) => {
    //         res.status(200).json({
    //             status: true,
    //             message: "Data Updated",
    //             data: status
    //         });

    //     }).catch(err => {
    //         res.status(400).json({
    //             status: false,
    //             message: "Error",
    //             data: err
    //         });
    //     })
    // });
}

exports.delete = async (req, res, next) => {
    // model.Tunnel.destroy({ where: { id: req.body.idTunnel } }).then(result => {
    //     res.status(200).json({
    //         status: true,
    //         message: "Data Deleted",
    //         data: null
    //     });
    // }).catch(err => {
    //     console.log(err)
    //     res.status(400).json({
    //         status: false,
    //         message: "Error Occured",
    //         data: err
    //     });
    // })
}



