const model = require('../models/index');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.homeRoute = async (req, res, next) => {
    // BELAJAR REDIS
    // const data = {
    //     name: "Bagus Dwi Utama"
    // }
    // client.set('paijo:paijo', JSON.stringify(data))

    // const hale = await client.get('login_portal:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR3aXV0YW1hYmFndXNAZ21haWwuY29tIiwidXNlcklkIjoxLCJpYXQiOjE1NjE0MzAyMzMsImV4cCI6MTU2MTQ5MDIzM30.0bStIgquBGitctReu2KBP5H7pGKYRo3pgM9wW3ilXxE', function (err, response) {

    // });

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


