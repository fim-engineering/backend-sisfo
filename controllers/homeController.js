const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.homeRoute = async (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                title: 'FIM RESTFul API',
                content: 'Koding untuk bangsaku',
                by: 'FIM Engineering',
            }
        ]
    });
}


