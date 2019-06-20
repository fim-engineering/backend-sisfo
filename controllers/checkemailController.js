const model=require('../models/index');

exports.checkEmail = (req,res,next) => {    
    let email = req.body.email;   
    console.log(email)
     model.Customer.findOne({where:{email:email}})
    .then(customer => {
    let status = null       
        if(customer === null){                             
            status = true
        }
        else
        {
            status = false
        }


        return res.json({
                code: 401,
                data: status
            });


    }).catch(err=>{
        //console.log(err)
    });
}