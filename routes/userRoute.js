const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check')

const User = require('../models/user');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth-middleware');

router.post('/signup',
[
    body('email')
    .isEmail()
    .withMessage('Please enter valid email')
    .custom((value, { req }) => {        
        return User.findOne({where: {email:value}}).then(userDoc => {   
            if(userDoc){
                return Promise.reject('E-mail already Exist').then(result => {
                    res.json({
                        "status":'failed',
                        "message" : "E-mail exists, please use another email" 
                       });
                });
                 
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
] 
,userController.signUp);

router.post('/login', userController.logIn);
router.post('/update', isAuth, userController.updateProfil);
router.post('/checkemail', userController.checkEmail);
router.post('/listem',userController.listblst);
router.post('/list-branch',userController.listBranch);
router.post('/is-company-model-exsist', userController.CheckModelInCurrentDatabase);
router.post('/set-branch-setting', userController.setBranchSetting);


module.exports = router;