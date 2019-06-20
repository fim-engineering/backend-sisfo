const model = require('../models/index');



exports.indexDashboard = (req, res, next) => {
    //totalseluruhorder
    model.Order.findAndCountAll({


    }).then((order) => {

        //orderbyMenungguPembayaran
        return model.Order.findAndCountAll({
            where: {
                status: 1
            }
        }).then((menunggu) => {

            //orderbySedangDiProses
            return model.Order.findAndCountAll({
                where: {
                    status: 2
                }
            }).then((proses) => {

                //orderbySedangDikirim
                return model.Order.findAndCountAll({
                    where: {
                        status: 3
                    }
                }).then((dikirim) => {

                    //orderbySampaiTujuan
                    return model.Order.findAndCountAll({
                        where: {
                            status: 4
                        }
                    }).then((diterima) => {

                        //OrderbyStatusDibatalkan
                        return model.Order.findAndCountAll({
                            where: {
                                status: 5
                            }
                        }).then((batal) => {


                            //OrderbySubTotal
                            return model.Order.findAll({
                                //attributes: [sequelize.fn('sum', sequelize.col('subtotal')), 'total'],
                                attributes:
                                    [[model.Sequelize.fn('SUM', model.Sequelize.col('subtotal')), 'total']],
                                where: {
                                    status: { $in: [2, 3, 4] }
                                }
                            }).then(sales => {
                                //console.log(sales.sum)

                                //OrderByCustomer
                                return model.Customer.findAndCountAll({

                                }).then((customer) => {

                                    res.status(200).json({
                                        Order: order.count,
                                        Menunggu: menunggu.count,
                                        diproses: proses.count,
                                        dikirim: dikirim.count,
                                        diterima: diterima.count,
                                        batal: batal.count,
                                        sales: sales,
                                        Customer: customer.count

                                    });
                                });
                            })
                        })
                    })

                })
            })
        })
    })

}


//TotalPenjualan
exports.terjual = (req, res, next) => {
    model.OrderProduct.findAll({
        attributes:
     ['name', [model.Sequelize.fn('COUNT', model.Sequelize.col('productId')), 'Total_Penjualan']],
     include : [{
         model : model.Order,
         attributes: ['status'],
         where: { status: {$in: [2,3,4]}} 
     }],
     group: ['OrderProduct.productId']
        
    }).then(result => {
        res.status(200).json({
            data: result
        })     
    })
}