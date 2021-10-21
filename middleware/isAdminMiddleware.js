const redisClient = require('../util/redis');
const userController = require('../controllers/userController');

module.exports = (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];

    redisClient.get('login_portal:' + token, async function (err, response) {
        let user = JSON.parse(response);
        let role = user.role

        try {
            if (role < userController.ADMIN_ROLE) throw new Error("You are not allowed to access this endpoint")
            next();
        } catch (error) {
            return res.status(200).json({
                "status": false,
                "message": "Something " + error,
                "data": null
            })    
        }
    })
}