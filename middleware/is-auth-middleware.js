const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error
    }

    let token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'secretmasojodibukak');
    } catch (err) {
        err.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error('Not Authenticated');
        err.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};