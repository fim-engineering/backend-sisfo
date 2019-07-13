const model = require('../models/index');
const redisClient = require('../util/redis');


exports.lists = async (req, res, next) => {

    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        const data = {
            idTunnel: req.body.tunnelId,
            ktpNumber: req.body.ktpNumber
        }

        model.Answer.findAll({ where: data }).then(result => {
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



exports.saveAnswer = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    redisClient.get('login_portal:' + token, function (err, response) {
        const userIdentity = JSON.parse(response);
        const userId = userIdentity.userId;

        // jawaban datang dalam bentu Array
        const data = {
            Answer: req.body.answers, // Array
            // [
            //     {
            //         questionId:1,
            //         answer: JSON with serialize header
            //     }
            // ]

            ktpNumber: req.body.ktpNumber,
            tunnelId: req.body.tunnelId,
            createdBy: userId
        }

        if (err) {
            return res.status(400).json({
                status: false,
                message: "Error",
                data: err
            });
        }

        // generate looping answer with map function
        data.Answer.map((value, index) => {
            // cari dulu apakah yang sebelumnya sudah pernah dijawab atau belum
            // berdasarkan nomor ktp dan id pertanyaan
            model.Answer.findOne({
                where: {
                    questionId: value.questionId,
                    ktpNumber: data.ktpNumber
                }
            }).then(result => {
                // jika belum ada idPertanyaan dengan nomor ktp tersebut
                if (result == null) {
                    model.Answer.create({
                        answer: JSON.stringify(value.answer), // bentuk object
                        questionId: value.questionId,
                        ktpNumber: data.ktpNumber,
                        tunnelId: data.tunnelId
                    })

                    // create di summary model mendeteksi dia ikut jalur apa 
                    // berdasarkan pertanyaan yang dia jawab
                    model.Summary.findOrCreate({
                        where: {
                            tunnelId: data.tunnelId,
                            ktpNumber: data.ktpNumber
                        },
                        defaults: {
                            isFinal: 0
                        }
                    })


                } else {
                    result.update({
                        answer: JSON.stringify(value.answer),
                        questionId: value.questionId,
                        ktpNumber: data.ktpNumber,
                        tunnelId: data.tunnelId
                    })
                }

            }).catch(err => {
                return res.status(400).json({
                    status: false,
                    message: "Error",
                    data: err
                });
            })
        })

        // UPDATE STEP JIKA SUDAH MENGISI DATA DIRI
        model.User.findOne({ where: { email: userIdentity.email } }).then(result => {
            result.update({
                status: 4
            })
        })

        redisClient.set('login_portal:' + token, JSON.stringify({ ...userIdentity, step: 4 }))

        res.status(200).json({
            status: true,
            message: "Answer Saved",
            data: userIdentity
        });
    });
}

// exports.read = async (req, res, next) => {
//     const idAnswer = req.body.idAnswer;
//     model.Answer.findByPk(idAnswer).then(result => {
//         res.status(200).json({
//             status: true,
//             message: "Data Fetched",
//             data: result
//         });
//     })
// }


// exports.update = async (req, res, next) => {
//     let token = req.get('Authorization').split(' ')[1];

//     redisClient.get('login_portal:' + token, function (err, response) {
//         const userIdentity = JSON.parse(response);
//         const userId = userIdentity.userId;

//         if (err) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Error",
//                 data: err
//             });
//         }

//         const data = {
//             idAnswer: req.body.idAnswer,
//             Answer: req.body.Answer,
//             tunnelId: req.body.tunnelId,
//             batchFim: req.body.batchFim,
//             createdBy: userId
//         }

//         model.Answer.update(data, { where: { id: data.idAnswer } }
//         ).then((status, result) => {
//             res.status(200).json({
//                 status: true,
//                 message: "Data Updated",
//                 data: status
//             });

//         }).catch(err => {
//             res.status(400).json({
//                 status: false,
//                 message: "Error",
//                 data: err
//             });
//         })
//     });
// }

// exports.delete = async (req, res, next) => {
//     model.Answer.destroy({ where: { id: req.body.idAnswer } }).then(result => {
//         res.status(200).json({
//             status: true,
//             message: "Data Deleted",
//             data: null
//         });
//     }).catch(err => {
//         console.log(err)
//         res.status(400).json({
//             status: false,
//             message: "Error Occured",
//             data: err
//         });
//     })
// }



