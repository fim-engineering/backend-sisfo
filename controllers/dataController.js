const model = require('../models/index');
const dataUniv = require('../data/university-list.json');
const Sequelize = require('sequelize');

const Op = Sequelize.Op
const Excel = require('exceljs');
// const ExcelJS = require('exceljs/dist/es5');
const path = require('path');


exports.getUniversity = async (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "university data fetched",
        data: dataUniv
    });
}

exports.downloadExcel = async (req, res, next) => {
    const list = req.body.listCheck; // array

    const test = ['Nama', 'email', 'no HP', 'KTP', 'Regional Saat Ini', 'Editing Video Status', 'Regional Pengembangan'];

    // Mencari Batch FIM Paling Terakhir
    const fimBatch = await model.Fimbatch.findAll({
        limit: 1,
        order: [['id', 'DESC']]
    }).then(result => {
        return result[0]
    })

    // All submit
    const allSubmit = await model.Summary.findAll({
        where: {
            isFinal: 1,
            updatedAt: { $between: [fimBatch.date_start_registration, fimBatch.date_end_registration] }
        }
    }).then(result => {
        return result
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: "Whoops Something Error",
            error: err
        });
    });

    const listKTPSubmitted = [];
    await allSubmit.map((value, index) => {
        listKTPSubmitted.push(value.ktpNumber);
    })

    const listIdentity = await model.Identity.findAndCountAll({
        where: {
            ktpNumber: { [Op.in]: listKTPSubmitted }
        },
        // attributes: ['userId', 'name', 'ktpNumber', 'video_editing'],
        include: [
            {
                model: model.Summary,
                where: { isFinal: 1 },
                include: [{
                    model: model.Tunnel,
                    attributes: ['name']
                }]
            },
            {
                model: model.User,
                include: [{
                    model: model.Regional,
                    attributes: ['name', 'city', 'province']
                }]
            },
        ]
    }).then(result => {
        return result.rows
    }).catch(err => {
        console.log(err)
    })


    // Pengembangan Regional
    const JawabanRegionalBaru = await model.Answer.findAll({
        where: {
            QuestionId: 47,
            ktpNumber: { $in: listKTPSubmitted }
        }
    }).then(answ => {
        const ans = JSON.parse(JSON.stringify(answ));
        return ans;
        // if (ans !== null) {
        //     const extract = JSON.parse(ans.answer);
        //     const jawab = extract.answer;
        //     const newRegional = extract['Membangun Regional Baru'];
        // }
    })

    // console.log(JawabanRegionalBaru)


    const restructurization = [];
    await Promise.all([
        listIdentity.map(async (value) => {
            
            const jawb = JawabanRegionalBaru.filter((regi) => {
                return value.ktpNumber == regi.ktpNumber
            })

            let extract = null;
            let jawab = null;
            let newRegional = null;

            if (jawb[0] !== undefined) {
                extract = JSON.parse(jawb[0].answer);
                jawab = extract.answer;
                newRegional = extract['Membangun Regional Baru'];
            }


            restructurization.push({
                name: value.name,
                email: value.User.email,
                phone: value.phone,
                ktpNumber: value.ktpNumber,
                jalur: value.Summaries !== null ? value.Summaries[0].Tunnel.name : null,
                regional: value.User.Regional !== null ? value.User.Regional.city : null,
                videoEdit: value.video_editing,
                nextActivity: jawab,
                newRegional: newRegional
            })
        })
    ]).then(result => {
        res.status(200).json({
            status: true,
            message: "data fetched",
            data: restructurization
        });
    })


    // console.log(JSON.parse(JSON.stringify(listIdentity)))

    // Create Workbook
    // const workbook = new Excel.Workbook();
    // const sheet = workbook.addWorksheet('Data Calon Anggota FIM');
    // const worksheet = workbook.getWorksheet('Data Calon Anggota FIM');
    // worksheet.columns = [
    //     { header: 'Id', key: 'id', width: 10 },
    //     { header: 'Name', key: 'name', width: 32 },
    //     { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    // ];

    // // Insert a row by sparse Array (assign to columns A, E & I)

    // worksheet.insertRow(1, { id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    // worksheet.insertRow(1, { id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    // const thefile = await workbook.xlsx.writeFile('exports.xls');
    // const file = await path.join(__dirname, '/exports.xls');

    // console.log(file);

    // if (list.includes('Nama')) {

    // }

    // res.download(file)

}


