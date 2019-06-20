const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const HOSTNAME = 'https://system.ipbsciencetechnopark.com';

const configFetch = (url, method, body, isJSON = false, extraHeaders = {}) => ({
    method,
    url,
    data: isJSON ? body : querystring.stringify(body),
    headers: {
        'Content-Type': isJSON ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        ...extraHeaders
    }
});

makeIdentifierProduct = async () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


exports.checkEmail = (req, res, next) => {
    let email = req.body.email;

    axios.get(`${HOSTNAME}/store/login/user?us=` + email)
        // .then(res=> {
        //     console.log(res.data.user)
        // }) 
        // validasi email ada atau tidak
        // model.User.findOne({where:{email:email}})
        .then(user => {
            // Jika email tidak ditemukan       
            if (user.data.user === null) {
                const error = new Error('Username not found');
                console.log(error);
                error.statusCode = 401;
                return res.json({
                    code: 401,
                    message: "Username not found",
                    data: null
                });
            }

            // jika email ditemukan 
            return res.json({
                code: 200,
                message: "E-mail found",
                // data: user.email,
                data: user.data.user
            });
        }).catch(err => {
            console.log(err)
        });
}

exports.signUp = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed Bro');
        error.statusCode = 442;
        error.data = errors.array();
        return res.json(error);
    }

    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;


    // Enkripsi Password
    bcrypt.hash(password, 12)
        .then(hashPass => {
            model.User.create({
                email: email,
                password: hashPass,
                name: name
            });
        }).then(result => {
            res.status(201).json({
                message: "User Created",
                userId: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

// ini untuk mengintegrasikan database user blst
exports.logIn = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    // validasi email ada atau tidak 
    // model.User.findOne({where:{email:email}})
    axios.get(`${HOSTNAME}/store/login/pass?us=` + email + '&ps=' + password)
        .then(user => {
            if (user.data.user == null) {
                const error = new Error('Username not found');
                console.log(error);
                error.statusCode = 401;
                return res.json({
                    code: 401,
                    message: "Username not found"
                });
            }
            loadedUser = user;

            // membandingkan password
            return user.data
        })
        .then( async result => {

            if (result == null) {
                const error = new Error('Wrong Password');
                error.statusCode = 401;
                return res.json({
                    code: 401,
                    message: "Wrong Password"
                });
            }


            const token = jwt.sign({
                userId: result.user.id_user,
                nameUser: result.user.name_user,
                companyId: result.company.id_pak_danny,
                name_company: result.company.name_company
            }, 'secretmasojodibukak', { expiresIn: '10h' });

            return res.status(200).json({
                "token": token,
                "userId": result.user.id_user,
                "companyId": result.company.id_pak_danny,
                "name_user": result.user.name_user,
                "data": result.user,
            });
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                "error": err,               
            });
        });
}

// Standar untuk menggunakan user model bawaan
// exports.logIn = (req,res,next) => {
//     let email = req.body.email;
//     let password = req.body.password;     

//     // validasi email ada atau tidak
//     model.User.findOne({where:{email:email}})
//     .then(user => {
//         if(!user){
//             const error = new Error('E-mail not found');
//             console.log(error);
//             error.statusCode = 401;                              
//             return res.json({
//                 code: 401,
//                 message : "E-mail not found"
//             });
//         }
//         loadedUser = user;

//         // membandingkan password
//         return bcrypt.compare(password, user.password);
//     })
//     .then(isEqual => {

//         if(!isEqual) {
//             const error = new Error('Wrong Password');
//             error.statusCode = 401;
//             return res.json({
//                 code: 401,
//                 message : "Wrong Password"
//             });
//         }

//         const token = jwt.sign({
//             email: loadedUser.email,
//             userId : loadedUser.id, 
//         }, 'secretmasojodibukak',{ expiresIn: '10h'});

//         return res.status(200).json({
//             "token": token,
//             "userId" : loadedUser.id,           
//             "data": loadedUser,            
//         });

//     })
//     .catch(err => {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     });
// }

exports.updateProfil = (req, res, next) => {

}



exports.listblst = (req, res, next) => {
    const content = {}
    // const id = data_user.companyId;
    const id = req.body.companyId;
    const url = `${HOSTNAME}/list/${id}/index`;
    const extraHeaders = {
        //   Authorization: `Bearer ` + localStorage.getItem('token')
    }

    return axios(configFetch(url, 'get', content, true, extraHeaders))
        .then(ress => {
            return res.status(200).json({
                "data": ress.data
            });
        }
        )
        .catch(err => console.log(err));
}

exports.listBranch = (req, res, next) => {
    const content = {
        id_company: req.body.companyId
    }

    const extraHeaders = {

    }

    const url = `${process.env.FINANCE_API}/branch/lists`;
    return axios(configFetch(url, 'post', content, true, extraHeaders))
        .then(ress => {
            return res.status(200).json({
                "data": ress.data
            });
        }
        )
        .catch(err => console.log(err.toJSON()));
}

exports.CheckModelInCurrentDatabase = (req, res, next) => {
    const companyId = req.body.companyId;   
    model.Company.findOne({ where: { companyIdBLST: companyId } }).then(result => {       
        return res.status(200).json({
            "data": result
        });
    }).catch(err => {
        return res.status(400).json({
            "data": err
        });
    });
}

exports.setBranchSetting = async (req, res, next) => {
    const BODY = req.body;
    const companyId = BODY.companyId;
    let identifier = await makeIdentifierProduct();    
    model.Company.findOne({ where: { companyIdBLST: companyId } }).then(result => {       
        if (result == null) {
            model.Company.create({
                companyIdBLST   : BODY.companyId ,
                companyName : BODY.name_company,             
                address : BODY.addr,
                branchId    : BODY.id_branch,
                branchName  : BODY.name_branch ,
                customer_name : "Customer Online" ,
                initial_invoice: "ONLINE",
                identifier_customer: identifier
            }).then(result => {                
                return res.status(200).json({
                    "status": "Added",
                    "data": result,
                });
            })
        } else {
            return res.status(200).json({
                "status": "Exists",
                "data": result,
            });
        }
    }).catch(err => {       
        return res.status(400).json({
            "data": err
        });
    });
}


