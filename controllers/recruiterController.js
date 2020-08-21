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

    const fimBatch = await model.Fimbatch.findAll({
        limit: 1,
        order: [['id', 'DESC']]
    }).then(result => {
        return result[0]
    })


    const allSubmit = await model.Summary.findAll({
        where: {
            isFinal: 1,
            updatedAt: { $between: [fimBatch.date_start_registration, fimBatch.date_end_registration] }
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



    const listRecruiter = await model.ParticipantRecruiter.findAll({}).then(result => {
        return JSON.parse(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
    })

    const listRecruiterParticipant = [];
    const listIdentity = await model.Identity.findAndCountAll({
        where: {
            ktpNumber: { [Op.in]: listKTPSubmitted }
        },
        attributes: ['userId', 'name', 'ktpNumber'],
        include: [
            {
                model: model.Summary,
                where: { isFinal: 1 },
                include: [{
                    model: model.Tunnel,
                    attributes: ['name']
                }]
            },
            {
                model: model.User,
                include: [{
                    model: model.Regional,
                    attributes: ['name', 'city', 'province']
                }]
            },
        ]
    }).then(result => {
        return result.rows
    }).catch(err => {
        console.log(err)
    })

    await listIdentity.map(async (value) => {
        const rec = await listRecruiter.filter((recruit) => {
            return recruit.ktpNumber == value.ktpNumber
        })

        // console.log(rec)
        await listRecruiterParticipant.push({
            ...JSON.parse(JSON.stringify(value)),
            recruiters: rec
        })
    })

    return res.status(200).json({
        status: true,
        message: "Data Fetched",
        data: listRecruiterParticipant
    });
}


exports.listRecruiter = async (req, res, next) => {
    model.Identity.findAll({
        where: {
            role: 2,
        },
        attributes: ['name', 'ktpNumber', 'phone', 'email', 'batchFim']

    }).then(result => {
        return res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: result
        });
    }).catch(err => {
        console.log(err)
    })
}

exports.newAssignRecruiter = async (req, res, next) => {
    const theRecruiter = await model.User.findOne({
        where: {
            email: req.body.emailRecruiter,
        },
        include: [
            {
                model: model.Identity
            }
        ],
        attributes: ['id']
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
    })

    try {
        model.ParticipantRecruiter.findOrCreate({
            where: {
                ktpNumber: req.body.ktpParticipant,
                recruiterId: theRecruiter.id,
                emailRecruiter: req.body.emailRecruiter,
                nameRecruiter: theRecruiter.Identity.name
            }
        })

        res.status(200).json({
            status: true,
            message: "Recruiter Assigned",
        });
    } catch (error) {
        res.status(200).json({
            status: false,
            message: error,
        });
    }

}

exports.assignRecruiter = async (req, res, next) => {
    const ktpRecruiter = req.body.ktpRecruiter;
    const listPeserta = req.body.ktpPeserta; // array
    console.log(req.body)
    // const ArrayPeserta: [];
    // listPeserta.map((value,index)=>{
    //     value.
    // })

    // findRecruiter
    const theRecruiter = await model.Identity.findOne({
        where: {
            email: req.body.emailRecruiter,
        },
        attributes: ['id', 'name', 'userId']
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
    })

    if (theRecruiter !== null) {
        // update Summary
        const listSummary = await model.Summary.findOne({
            where: {
                ktpNumber: req.body.ktpNumberPeserta,
                TunnelId: req.body.TunnelId
            },
            // attributes: ['ktpNumber']
        }).then(result => {
            return result;
        }).catch(err => console.log(err))

        if (listSummary !== null) {
            // await listSummary.map((value, index) => {
            listSummary.update({
                recruiterId: theRecruiter.userId
            })
            // })

            return res.status(200).json({
                status: true,
                message: "Participant Assigned to " + theRecruiter.name
            });

        } else {
            return res.status(200).json({
                status: false,
                message: "Participant List Null"
            });
        }

    } else {
        return res.status(200).json({
            status: false,
            message: "Recruiter User Not Found"
        });
    }

}

exports.listByRecruiter = async (req, res, next) => {
    const emailRecruiter = req.body.emailRecruiter;

    const theIdUser = await model.User.findOne({
        where: {
            email: emailRecruiter
        }
    }).then(result => {
        return result.id
    }).catch(err => {
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            error: err
        });
    })

    const listsParticipants = [];
    const findListParticipant = await model.ParticipantRecruiter.findAll({
        where: { recruiterId: theIdUser }
    }).then(result => {
        listsParticipants.push(result.ktpNumber)
    }).catch(err => console.log(err))

    const allSubmit = await model.Summary.findAll({
        where: {
            isFinal: 1,
            ktpNumber: { $in: listsParticipants }
        },
        include: [
            {
                model: model.Identity
            },
            {
                model: model.Tunnel
            },
        ]
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
    });

    // const listKTPSubmitted = [];

    // if (allSubmit !== null) {
    //     await allSubmit.map((value, index) => {
    //         listKTPSubmitted.push(value.ktpNumber);
    //     })
    // } else {
    //     return res.status(200).json({
    //         status: false,
    //         userId:theIdUser,
    //         message: "No One Submitted",
    //         data: null
    //     });
    // }

    // const listIdentity = await model.Identity.findAll({
    //     where: {
    //         ktpNumber: { [Op.in]: listKTPSubmitted }
    //     },
    //     attributes: ['userId', 'name', 'ktpNumber'],
    //     include: [{
    //         model: model.Summary,
    //         where: { isFinal: 1 },
    //         include: [{
    //             model: model.Tunnel,
    //             attributes: ['name', 'id']
    //         }]
    //     }]
    // }).then(result => {
    //     return result
    // }).catch(err => {
    //     return res.status(400).json({
    //         status: false,
    //         message: "Whoops Something Error",
    //         error: err
    //     });
    // })

    return res.status(200).json({
        status: true,
        message: "Data Fetched",
        data: allSubmit
    });
}

exports.detailParticipant = async (req, res, next) => {
    const TunnelId = req.body.TunnelId;
    const ktpNumber = req.body.ktpNumber;

    console.log(TunnelId);

    model.Identity.findOne({
        where: {
            ktpNumber: ktpNumber,
            userId: {
                [Op.ne]: null
            }
        },
        include: [
            {
                model: model.Summary,
                where: { isFinal: 1 },
                include: [
                    {
                        model: model.Tunnel,
                        attributes: ['name', 'id']
                    },
                ]
            },
            {
                model: model.Answer,
                where: { TunnelId: TunnelId },
                include: [
                    {
                        model: model.Tunnel
                    },
                    {
                        model: model.Question
                    }
                ]
            }
        ]

    }).then(result => {
        return res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: result
        });
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            error: err
        });
    })
}

exports.updateScore = async (req, res, next) => {
    const TunnelId = req.body.TunnelId;
    const ktpNumber = req.body.ktpNumber;

    model.Summary.findOne({
        where: {
            ktpNumber: ktpNumber,
            TunnelId: TunnelId
        },
    }).then(async result => {

        await result.update({
            scoreDataDiri: req.body.scoreDataDiri,
            scoreAktivitas: req.body.scoreAktivitas,
            scoreProject: req.body.scoreProject,
            scoreOther: req.body.scoreOther,
            scoreFinal: parseInt(req.body.scoreDataDiri, 10) * 0.15 + parseInt(req.body.scoreAktivitas, 10) * 0.5 + parseInt(req.body.scoreProject, 10) * 0.3 + parseInt(req.body.scoreOther, 10) * 0.05,
            notes: req.body.notes
        }).then(result => {
            return res.status(200).json({
                status: true,
                message: "Score Updated",
                data: result
            });
        }).catch(err => {
            console.log(err)
            return res.status(400).json({
                status: false,
                message: "Whoops Something Error",
                error: err
            });
        })


    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            error: err
        });
    })
}

exports.addRecruiter = async (req, res, next) => {
    const email = req.body.email;
    const findIdentity = await model.Identity.findOne({
        where: {
            email: email
        }
    }).then(resp => {
        return resp;
    }).catch(err => {
        console.log(err)
    })

    if (findIdentity == null) {
        model.Identity.create({
            email: email,
            role: 2
        }).then(resp => {
            return res.status(200).json({
                status: true,
                message: "Recruiter " + email + " Added",
            });
        })
    } else {
        if (findIdentity.role == 2) {
            return res.status(200).json({
                status: false,
                message: "Recruiter " + email + " Already Exists",
            });
        } else {
            findIdentity.update({
                role: 2
            }).then(result => {
                return res.status(200).json({
                    status: true,
                    message: "Recruiter " + email + " Updated",
                });
            }).catch(err => {
                return res.status(400).json({
                    status: false
                });
            })
        }
    }
}

exports.availableAssing = (req, res, next) => {
    const email = req.body.email;
    model.Summary.findAll({
        where: {
            recruiterId: null,
            isFinal: 1,
        },
        include: [
            {
                model: model.Identity
            },
            {
                model: model.Tunnel
            },
        ]
    }).then(result => {
        return res.status(200).json({
            status: true,
            message: "Lists Fetched",
            data: result
        });
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Something Error " + err,
        });
    })
}

exports.toAssign = async (req, res, next) => {
    const email = req.body.email;

    // find UserId
    const theRecuiter = await model.Identity.findOne({
        where: {
            email: email
        }
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
    })

    model.Summary.findAll({
        where: {
            recruiterId: theRecuiter.userId
        },
        include: [
            {
                model: model.Identity
            },
            {
                model: model.Tunnel
            },
        ]
    }).then(result => {
        return res.status(200).json({
            status: true,
            message: "Lists Fetched",
            data: result
        });
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Something Error " + err,
        });
    })
}

exports.undoAssign = async (req, res, next) => {


    // findRecruiter
    const theRecruiter = await model.Identity.findOne({
        where: {
            email: req.body.emailRecruiter,
        },
        attributes: ['id', 'name', 'userId']
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
    })

    if (theRecruiter !== null) {
        // update Summary
        const listSummary = await model.Summary.findOne({
            where: {
                ktpNumber: req.body.ktpNumberPeserta,
                TunnelId: req.body.TunnelId
            },
            // attributes: ['ktpNumber']
        }).then(result => {
            return result;
        }).catch(err => console.log(err))

        if (listSummary !== null) {
            // await listSummary.map((value, index) => {
            listSummary.update({
                recruiterId: null
            })
            // })

            return res.status(200).json({
                status: true,
                message: "Participant Assigned to " + theRecruiter.name
            });

        } else {
            return res.status(200).json({
                status: false,
                message: "Participant List Null"
            });
        }

    } else {
        return res.status(200).json({
            status: false,
            message: "Recruiter User Not Found"
        });
    }
}

exports.removeAssignRecruiter = async (req, res, next) => {
    const ktpNumber = req.body.ktpParticipant;
    const recruiterId = req.body.recruiterId;

    model.ParticipantRecruiter.destroy({
        where: {
            ktpNumber: ktpNumber,
            recruiterId: recruiterId
        }
    }).then(result => {
        res.status(200).json({
            status: true,
            message: "Data Deleted",
            data: result
        });
    }).catch(err => {
        res.status(400).json({
            status: false,
            message: "Error Occured",
            data: err
        });
    })
}