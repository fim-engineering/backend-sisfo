const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Client } = require('pg');

// Route Require
const userRoute = require('./routes/userRoute');
const homeRoute = require('./routes/homeRoute');
const dataRoute = require('./routes/dataRoute');
const tunnelRoute = require('./routes/tunnelRoute');
const questionRoute = require('./routes/questionRoute');
const answerRoute = require('./routes/answerRoute');

// init express js
const app = express();

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
app.use('/answer',answerRoute);


// const accessLogStream = fs.createWriteStregzsam(path.join(__dirname, 'access.log'),{ flags: 'a'})

app.use(helmet());
app.use(compression());
// app.use(morgan('combined', {stream:accessLogStream}));

app.listen( process.env.PORT||8080);

