// require('newrelic');
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const { Client } = require('pg');
var cors = require('cors')

// Route Require
const userRoute = require('./routes/userRoute');
const homeRoute = require('./routes/homeRoute');
const dataRoute = require('./routes/dataRoute');
const tunnelRoute = require('./routes/tunnelRoute');
const questionRoute = require('./routes/questionRoute');
const answerRoute = require('./routes/answerRoute');
const summaryRoute = require('./routes/summaryRoute');
const recruiterRoute = require('./routes/recruiterRoute');
const regionalRoute = require('./routes/regionalRoute');
const participantRoute = require('./routes/participantRoute');
const documentRoute = require('./routes/documentRoute');
const formCompletenessRoute = require('./routes/formCompletenessRoute');

// init express js
const app = express();
app.use(cors());
app.options('*', cors()) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*' );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE' );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Auth Route
app.use('/auth', userRoute);
app.use('/', homeRoute)
app.use('/data', dataRoute);
app.use('/tunnel', tunnelRoute);
app.use('/question', questionRoute);
app.use('', answerRoute);
app.use('/summary', summaryRoute);
app.use('/recruiter', recruiterRoute);
app.use('/regional', regionalRoute);
app.use('/participant', participantRoute);
app.use('/document', documentRoute);
app.use('/form-completeness', formCompletenessRoute);


app.use(helmet());
app.use(compression());

app.listen( process.env.PORT||8080);

