const model = require('../models/index');
const redisClient = require('../util/redis');

const Sequelize = require('sequelize');
const Op = Sequelize.Op


exports.addAdmin = async (req, res, next) => {
    const email = req.body.email;
    let therole = 1;

    const findUser = await model.User.findOne({
        where: {
            email: email
        }
    }).then(result => {
        return result
    }).catch(err => {
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error Line 16",
            data: err
        });
    })

    // update role 3 untuk admin yang nambah recruiter
    if (findUser !== null) {
        model.Identity.findOne({
            where: {
                userId: findUser.id
            }
        }).then(result => {

            if (req.params.type == "admin") {
                therole = 3;
            } else if (req.params.type == "recruit") {
                therole = 2;
            }
            // update role
            result.update({
                role: therole
            }).then(result => {
                res.status(200).json({
                    status: true,
                    message: "Admin Added",
                    data: { name: result.name, email: result.email, role: result.role }
                });
            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: "Whoops Something Error Lin2 40",
                    error: err
                });
            })
        }).catch(err => {
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error Line 47 KTP number not found",
                error: err
            });
        })
    } else {
        return res.status(200).json({
            status: false,
            message: "User Not Found"
        });
    }

}

exports.listSubmitted = async (req, res, next) => {

    const allSubmit = await model.Summary.findAll({
        where: {
            isFinal: 1
        }
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            error: err
        });
    });

    const listKTPSubmitted = [];

    if (allSubmit !== null) {
        await allSubmit.map((value, index) => {
            listKTPSubmitted.push(value.ktpNumber);
        })
    } else {
        return res.status(200).json({
            status: false,
            message: "No One Submitted",
            data: null
        });
    }

   const listIdentity = await model.Identity.findAll({
        where: {
            ktpNumber: { [Op.in]: listKTPSubmitted }
        },
        attributes: ['userId', 'name','ktpNumber'],
        include:[{
            model:model.Summary,
            where:{isFinal: 1},
            include:[{
                model:model.Tunnel,
                attributes:['name']
            }]
        }]
    }).then(result=>{
        return result
    }).catch(err=>{
        console.log(err)        
    })

    return res.status(200).json({
        status: true,
        message: "Data Fetched",
        data: listIdentity
    });
}