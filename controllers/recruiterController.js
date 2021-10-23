const model = require('../models/index');
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


    // Cari yang sudah submit final
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

    // dapatktpsubmit
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

    // query jika ada parameter fimBatch maka ambil peserta yang statusnya seperti nama fim dan kode x bagi yang tidak bisa ikut
    const listLolosKtp = [];
    if (req.query.fimBatch) {

        const listLolos = await model.Identity.findAll({
            where: { status_accept: 2 },
            attributes: ['batchFim', 'ktpNumber']
        }).then(result => {
            JSON.parse(JSON.stringify(result)).map((value, index) => {
                listLolosKtp.push(value.ktpNumber)
            })
        })
    }


    // fetch recruiter dari masing-masing peserta
    const listRecruiter = await model.ParticipantRecruiter.findAll({}).then(result => {
        return JSON.parse(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
    })

    const listRecruiterParticipant = [];
    const listIdentity = await model.Identity.findAndCountAll({
        where: {
            ktpNumber: { [Op.in]: req.query.fimBatch && listLolosKtp.length > 0 ? listLolosKtp : listKTPSubmitted }
        },
        attributes: [
            'userId',
            'name',
            'ktpNumber',
            'status_accept',
            'batchFim',
            'attendenceConfirmationDate',
            'mbti',
            'paymentDate',
            'bankTransfer',
            'urlTransferPhoto',
            'phone'
        ],
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


    // Menambahkan list recruiter yang ditugaskan
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
    getAllRecruiters()
    .then(result => {
        return res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: result[0]
        });
    }).catch(err => {
        return res.status(400).json({
            "status": false,
            "message": "Something Error " + err,
            "data": null
        })
    })
}

function getAllRecruiters() {
    const sql = `SELECT "Users"."id", "Users"."email", "Users"."role", "Identities"."fullName", "Identities"."batchFim", "Identities"."photoUrl"
    FROM "Users" 
    LEFT JOIN "Identities" ON "Users"."id" = "Identities"."userId" 
    WHERE "Users"."role" IN (2, 3)`

    return model.sequelize.query(sql)
}

exports.assignRecruiter = async (req, res, next) => {
    try {
        participantId = req.body.participantId
        batch = req.body.batch ?? ''
        if (batch.trim() == '') throw new Error('batch is required!');

        recruiter = await model.User.findOne({ where: { email: req.body.recruiterEmail } })
        if (recruiter) {
            participant = await model.User.findOne({ where: { id: participantId } })
            if (participant) {
                model.Summary.findOne({ where: { userId: participant.id, batchFim: batch } })
                .then(summary => {
                    if (summary == null) {
                        model.Summary.create({ recruiterId: recruiter.id, userId: participant.id, batchFim: batch })
                        .then(result => {
                            return res.status(200).json({
                                status: true,
                                message: "Recruiter assigned",
                                data: null
                            })
                        })
                    } else {
                        model.Summary.update({ recruiterId: recruiter.id }, { where: { userId: participant.id, batchFim: batch } })
                        .then(result => {
                            return res.status(200).json({
                                status: true,
                                message: "Recruiter updated",
                                data: null
                            })
                        })
                    }
                })
            } else throw new Error("Participant not found")
        } else throw new Error("Recruiter not found")
    } catch (error) {
        return res.status(400).json({
            "status": false,
            "message": "Something " + error,
            "data": null
        })    
    }
}

exports.listByRecruiter = async (req, res, next) => {
    const emailRecruiter = req.body.emailRecruiter;

    if (req.query.ktpNum !== undefined) {

        const allSubmit = await model.Summary.findAll({
            where: {
                isFinal: 1,
                ktpNumber: req.query.ktpNum
            },
            include: [
                {
                    model: model.Identity,
                    include: [
                        {
                            model: model.User,
                            include: [{
                                model: model.Regional,
                                attributes: ['name', 'city', 'province']
                            }]
                        },
                    ]
                },
                {
                    model: model.Tunnel,
                    where: { batchFim: { $in: ['22', '22x'] } }
                },
            ]
        }).then(result => {
            return result
        }).catch(err => {
            console.log(err)
        });


        return res.status(200).json({
            status: true,
            message: "Data Fetched",
            data: allSubmit
        });
    }

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
        const strResult = JSON.parse(JSON.stringify(result))
        strResult.map((value) => {
            listsParticipants.push(value.ktpNumber)
        })
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
                model: model.Tunnel,
                where: { batchFim: { $in: ['22', '22x'] } }
            },
        ]
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
    });

    return res.status(200).json({
        status: true,
        message: "Data Fetched",
        data: allSubmit
    });
}

exports.detailParticipant = async (req, res, next) => {
    const TunnelId = req.body.TunnelId;
    const ktpNumber = req.body.ktpNumber;

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
    const user = await model.User.findOne({ where: { email: email } })

    if (user == null) {
        model.User.create({ email: email, role: 2 })
        .then(result => {
            return res.status(200).json({
                status: true,
                message: "Recruiter " + email + " added",
                data: null
            });
        }).catch(err => {
            return res.status(400).json({
                status: false,
                message: "Something Error " + err,
                data: null
            });
        })
    } else {
        if (user.role == 2 || user.role == 3) {
            return res.status(200).json({
                status: true,
                message: "Recruiter " + email + " already exists",
                data: null
            });
        } else {
            model.User.update({ role: 2 }, { where: { email: email } })
            .then(result => {
                return res.status(200).json({
                    status: true,
                    message: "Recruiter " + email + " role updated",
                });
            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: "Something Error " + err,
                    data: null
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