const model = require('../models/index');
const redisClient = require('../util/redis');
const userController = require('../controllers/userController');
const Op = require('sequelize').Op;

const PROCESSED_STATUS = 'processed'
const ARCHIVED_STATUS = 'archived'

exports.getSummaries = async (req, res, next) => {
    const formCompletenessQuery = {
        where: {
          fimBatch: typeof req.query.batch !== 'undefined' ? req.query.batch : "",
          submittedAt: {[Op.ne]: null}
        }
    }

    const summaryProcessedQuery = {
        where: {
          batchFim: typeof req.query.batch !== 'undefined' ? req.query.batch : "",
          isFinal: 1
        }
    }

    try {
        model.FormCompleteness.count(formCompletenessQuery)
        .then(formCompletenessCounter => {
            model.Summary.count(summaryProcessedQuery)
            .then(summaryProcessedCounter => {
                return res.status(200).json({
                    status: true,
                    message: "Data Fetched",
                    data: parseSummaryResponse(formCompletenessCounter, summaryProcessedCounter)
                })
            })
            .catch(err => { throw new Error(err) })
        })
        .catch(err => { throw new Error(err) })
    } catch(err) {
        return res.status(400).json({
            "status": false,
            "message": "Something Error " + err,
            "data": null
        })
    }
}

function parseSummaryResponse(formCompletenessCounter, summaryProcessedCounter) {
    return {
        "submitted_number": formCompletenessCounter,
        "processed_number": summaryProcessedCounter,
        "archived_number": 0
    }
}

exports.getAll = async (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    
    redisClient.get('login_portal:' + token, function (err, response) {
        let user = JSON.parse(response);
        let role = user.role;
        let userId = user.userId;

        fimBatch = req.query.batch ? req.query.batch : ''
        limit = req.query.limit ? req.query.limit : 10
        offset = req.query.offset ? req.query.offset : 0
        fullName = req.query.name ? req.query.name : ''
        occupation = req.query.occupation ? req.query.occupation : ''
        cityAddress = req.query.cityAddress ? req.query.cityAddress : ''
        participantStatus = req.query.status ? req.query.status : ''


        if (fullName != '') fullName = `AND LOWER("Identities"."fullName") LIKE LOWER('${fullName}%')`
        if (occupation != '') occupation = `AND LOWER("Identities"."occupation") LIKE LOWER('${occupation}%')`
        if (cityAddress != '') cityAddress = `AND "Identities"."cityAddress" = '${cityAddress}'`

        if (participantStatus == PROCESSED_STATUS) participantStatus = `AND "Summaries"."isFinal" = 1`
        else participantStatus = ``

        if (role == userController.RECRUITER_ROLE) {
            getAllAssignedByRecruiterId(userId, fimBatch, limit, offset, fullName, occupation, cityAddress, participantStatus)
            .then(result => {
                return res.status(200).json({
                    status: true,
                    message: "Data Fetched",
                    data: result[0]
                });
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else if (role == userController.ADMIN_ROLE) {
            getAllParticipants(fimBatch, limit, offset, fullName, occupation, cityAddress, participantStatus)
            .then(result => {
                return res.status(200).json({
                    status: true,
                    message: "Data Fetched",
                    data: result[0]
                });
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            });
        }
    })
}

function getAllAssignedByRecruiterId(recruiterId, fimBatch, limit, offset, fullName, occupation, cityAddress, participantStatus) {

    const sql = `SELECT "Summaries"."userId", "Identities"."fullName", "Identities"."occupation", "Identities"."cityAddress", "Identities"."photoUrl",
    "Summaries"."scoreFinal", (SELECT "Users"."email" AS "recruiterEmail" FROM "Users" WHERE "Users"."id" = "Summaries"."recruiterId")
    FROM "Summaries" 
    LEFT JOIN "FormCompleteness" ON "Summaries"."userId" = "FormCompleteness"."userId" 
    LEFT JOIN "Identities" ON "Summaries"."userId" = "Identities"."userId" 
    WHERE "Summaries"."batchFim" = ? AND "Summaries"."recruiterId" = ? AND "FormCompleteness"."submittedAt" IS NOT null ${participantStatus} ${fullName} ${occupation} ${cityAddress}
    ORDER BY "Summaries"."scoreFinal" DESC
    LIMIT ?
    OFFSET ?`

    return model.sequelize.query(sql, {
        replacements: [fimBatch, recruiterId, limit, offset]
    })
}

function getAllParticipants(fimBatch, limit, offset, fullName, occupation, cityAddress, participantStatus) {

    const sql = `SELECT "FormCompleteness"."userId", "Identities"."fullName", "Identities"."occupation", "Identities"."cityAddress", "Identities"."photoUrl",
    "Summaries"."scoreFinal", (SELECT "Users"."email" AS "recruiterEmail" FROM "Users" WHERE "Users"."id" = "Summaries"."recruiterId")
    FROM "FormCompleteness" 
    LEFT JOIN "Identities" ON "FormCompleteness"."userId" = "Identities"."userId"
    LEFT JOIN "Summaries" ON "FormCompleteness"."userId" = "Summaries"."userId" 
    WHERE "FormCompleteness"."fimBatch" = ? AND "FormCompleteness"."submittedAt" IS NOT null ${participantStatus} ${fullName} ${occupation} ${cityAddress}
    ORDER BY "Summaries"."scoreFinal" DESC
    LIMIT ?
    OFFSET ?`

    return model.sequelize.query(sql, {
        replacements: [fimBatch, limit, offset]
    })
}

exports.getDetailByUserId = async (req, res, next) => {

    let participantId = req.params.userId
    let batch = typeof req.query.batch !== 'undefined' ? req.query.batch : ""
    
    try {
        model.Identity.findOne({ where: { userId: participantId } })
        .then(identity => { 
            model.Skill.findOne({ where: { userId: participantId } })
            .then(skill => { 
                model.SocialMedia.findOne({ where: { userId: participantId } })
                .then(socialMedia => { 
                    model.AlumniReference.findOne({ where: { userId: participantId } })
                    .then(alumniReference => { 
                        model.FimActivity.findOne({ where: { userId: participantId } })
                        .then(fimActivity => { 
                            model.OrganizationExperience.findAll({ where: { userId: participantId } })
                            .then(organizationExperiences => { 
                                model.PersonalDocument.findOne({ where: { userId: participantId } })
                                .then(personalDocument => { 
                                    getSummaryByParticipant(participantId, batch)
                                    .then(summary => { 
                                        model.Question.findAll({ where: { batchFim: batch } })
                                        .then(questions => { 
                                            model.Answer.findAll({ 
                                                where: { createdBy: participantId, QuestionId: getQuestionIds(questions) },
                                                order: ['QuestionId']
                                            })
                                            .then(answers => { 
                                                return res.status(200).json({
                                                    status: true,
                                                    message: "Data Fetched",
                                                    data: parseParticipantResponse(identity, skill, socialMedia, alumniReference, fimActivity, organizationExperiences, personalDocument, summary[0], answers)
                                                })
                                            })
                                            .catch(err => { throw new Error(err) })
                                        })
                                        .catch(err => { throw new Error(err) })
                                    })
                                    .catch(err => { throw new Error(err) })
                                })
                                .catch(err => { throw new Error(err) })
                            })
                            .catch(err => { throw new Error(err) })
                        })
                        .catch(err => { throw new Error(err) })
                    })
                    .catch(err => { throw new Error(err) })
                })
                .catch(err => { throw new Error(err) })
            })
            .catch(err => { throw new Error(err) })
        })
        .catch(err => { throw new Error(err) })
    } catch (error) {
        return res.status(400).json({
            "status": false,
            "message": "Something Error " + error,
            "data": null
        })    
    }
}

function getSummaryByParticipant(participantId, batch) {
    const sql = `SELECT "Summaries"."scoreDataDiri", "Summaries"."scoreOther", "Summaries"."scoreFinal", "Summaries"."notes",
    (SELECT "Users"."email" AS "recruiterEmail" FROM "Users" WHERE "Users"."id" = "Summaries"."recruiterId")
    FROM "Summaries" 
    LEFT JOIN "Users" ON "Summaries"."userId" = "Users"."id" 
    WHERE "Summaries"."userId" = ? AND "Summaries"."batchFim" = ?
    LIMIT 1`

    return model.sequelize.query(sql, {
        replacements: [participantId, batch]
    })
}

function parseParticipantResponse(identity, skill, socialMedia, alumniReference, fimActivity, organizationExperiences, personalDocument, summary, answers) {
    return {
        "Identity": parseIdentityResponse(identity, summary),
        "Skill": parseSkillResponse(skill),
        "SocialMedia": parseSocialMediaResponse(socialMedia, summary),
        "AlumniReference": parseAlumniReferenceResponse(alumniReference),
        "FimActivity": parseFimActivityResponse(fimActivity),
        "OrganizationExperiences": parseOrganizationExperiencesResponse(organizationExperiences),
        "PersonalDocument": parsePersonalDocumentResponse(personalDocument),
        "Answers": parseAnswersResponse(answers),
        "Recruiter": parseRecruiterResponse(summary),
        "Summaries": parseAssessmentResponse(summary)
    }
}

function parseAssessmentResponse(data) {

    finalScore = null
    notes = null

    if (data.length > 0) {
        finalScore = data[0].scoreFinal
        notes = data[0].notes
    } else {
        return null
    }

    return {
        finalScore: finalScore,
        notes: notes
    }
}

function parseIdentityResponse(data, summary) {

    score = 0
    if (data == null) return null
    if (summary.length > 0) score = summary[0].scoreDataDiri

    return {
        fullName: data.fullName,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        emergencyPhone: data.emergencyPhone,
        ktpNumber: data.ktpNumber,
        photoUrl: data.photoUrl,
        religion: data.religion,
        bornPlace: data.bornPlace,
        bornDate: data.bornDate,
        address: data.address,
        cityAddress: data.cityAddress,
        provinceAddress: data.provinceAddress,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        hobby: data.hobby,
        institution: data.institution,
        occupation: data.occupation,
        score: score
    }
}

function parseSkillResponse(data) {
    
    if (data == null) return null

    return {
        isAbleVideoEditing: data.isAbleVideoEditing,
        videoEditingPortofolioUrl: data.videoEditingPortofolioUrl,
        firstCertificateUrl: data.firstCertificateUrl,
        secondCertificateUrl: data.secondCertificateUrl,
        thirdCertificateUrl: data.thirdCertificateUrl
    }
}

function parseSocialMediaResponse(data, summary) {

    score = 0
    if (data == null) return null
    if (summary.length > 0) score = summary[0].scoreOther

    return {
        instagramUrl: data.instagramUrl,
        twitterUrl: data.twitterUrl,
        facebookUrl: data.facebookUrl,
        websiteUrl: data.websiteUrl,
        otherSiteUrl: data.otherSiteUrl,
        reason: data.reason,
        score: score
    }
}

function parseAlumniReferenceResponse(data) {

    if (data == null) return null

    return {
        fullName: data.fullName,
        batch: data.batch,
        phoneNumber: data.phoneNumber,
        relationship: data.relationship,
        acquaintedSince: data.acquaintedSince
    }
}

function parseFimActivityResponse(data) {

    if (data == null) return null

    return {
        responsibility: data.responsibility,
        role: data.role,
        duration: data.duration,
        eventScale: data.eventScale,
        result: data.result
    }
}

function parsePersonalDocumentResponse(data) {

    if (data == null) return null

    return {
        identityFileUrl: data.identityFileUrl,
        recommendationLetterUrl: data.recommendationLetterUrl,
        commitmentLetterUrl: data.commitmentLetterUrl
    }
}

function parseRecruiterResponse(data) {
    
    if (data.length == 0) return null
    if (data[0].recruiterEmail == null) return null

    return {
        email: data[0].recruiterEmail
    }
}

function parseOrganizationExperiencesResponse(data) {
    organizationArr = [];
    organizationObj = {};

    data.forEach((item) => {
        organizationObj = {
            id: item.id,
            referencePerson: item.referencePerson,
            role: item.role,
            duration: item.duration,
            eventScale: item.eventScale,
            result: item.result,
        }
    
        organizationArr.push(organizationObj);
    })

    return organizationArr;
}

function getQuestionIds(data) {
    questionArr = [];

    data.forEach((item) => {
        questionArr.push(item.id);
    })
    
    return questionArr;
}

function parseAnswersResponse(data) {
    answerArr = [];
    answerObj = {};

    data.forEach((item) => {
        answerObj = {
            id: item.id,
            TunnelId: item.TunnelId,
            QuestionId: item.QuestionId,
            answer: item.answer,
            score: item.score
        }
    
        answerArr.push(answerObj);
    })

    return answerArr;
}

exports.saveAssessment = async (req, res, next) => { 

    try {
        if (!req.params.participantId) throw new Error('participantId is required!');
        if (!req.params.batch) throw new Error('batch is required!');
        if (!req.body.identityScore) throw new Error('identityScore is required!');
        if (!req.body.socialMediaScore) throw new Error('socialMediaScore is required!');
        notes = req.body.notes ?? ''

        summary = await model.Summary.findOne({ where: { userId: req.params.participantId, batchFim: req.params.batch } })
        if (summary) {
            model.Summary.update({ scoreDataDiri: req.body.identityScore, scoreOther: req.body.socialMediaScore, notes: notes},
                { where: { userId: req.params.participantId, batchFim: req.params.batch }
            })
            .then(result => {
                return res.status(200).json({
                    "status": true,
                    "message": "Data updated",
                    "data": null
                })
            }).catch(err => {
                return res.status(400).json({
                    "status": false,
                    "message": "Something Error " + err,
                    "data": null
                })
            })
        } else {
            throw new Error('Data not found');
        }
    } catch (error) {
        return res.status(400).json({
            "status": false,
            "message": "Something " + error,
            "data": null
        }) 
    }
}

exports.saveAnswerAssessment = async (req, res, next) => { 

    req.body.forEach((item) => {
        model.Answer.findOne({ where: { id: item.answerId } })
        .then(answer => {
            if (answer) {
                answer.update({ score: item.score })
            }
        })
    })
    
    model.Answer.findAll({ 
        where: { id: getAnswerIds(req.body) },
        order: ['QuestionId']
    })
    .then(result => {
        return res.status(200).json({
            "status": true,
            "message": "Data Inserted",
            "data": parseAnswersResponse(result)
        })
    }).catch(err => {
        return res.status(400).json({
            "status": false,
            "message": "Something Error " + err,
            "data": null
        })
    })
}

function getAnswerIds(data) {
    answerArr = [];

    data.forEach((item) => {
        answerArr.push(item.answerId);
    })
    
    return answerArr;
}

exports.submitAssessment = async (req, res, next) => {
    try {
        participantId = req.body.participantId
        batch = req.body.batch ?? ''
        if (batch.trim() == '') throw new Error('batch is required!');

        participant = await model.User.findOne({ where: { id: participantId } })
        if (participant) {
            summary = await model.Summary.findOne({ where: { userId: participantId, batchFim: batch } })
            if (summary) {
                questions = await model.Question.findAll({ where: { batchFim: batch } })
                if (questions.length !== 0) {
                    answers = await model.Answer.findAll({ where: { createdBy: participantId, QuestionId: getQuestionIds(questions) } })
                    if (answers.length !== 0) {
                        model.Summary.update({ isFinal: 1, scoreFinal: getScore(answers, summary) }, { where: { userId: participantId, batchFim: batch } })
                        .then(result => {
                            return res.status(200).json({
                                status: true,
                                message: "Assessment Submitted",
                                data: null
                            })
                        })
                        .catch(err => { 
                            return res.status(400).json({
                                "status": false,
                                "message": "Something " + err,
                                "data": null
                            }) 
                        })
                    } else throw new Error("Answers are not found")
                } else throw new Error("Questions are not found")
            } else throw new Error("Assessment of this participant is not found")
        } else throw new Error("Participant not found")
    } catch (err) {
        return res.status(400).json({
            "status": false,
            "message": "Something " + err,
            "data": null
        })    
    }
}

function getScore(answers, summary) {
    score = 0

    answers.forEach((item) => {
        score += item.score
    })

    score += summary.scoreDataDiri
    score += summary.scoreOther

    return score;
}