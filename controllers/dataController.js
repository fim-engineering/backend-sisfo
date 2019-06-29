const model = require('../models/index');
const dataUniv = require('../data/university-list.json');


exports.getUniversity = async (req, res, next) => {
    res.status(200).json({
        status : true,
        message:"university data fetched",
        data: dataUniv
    });
}


