const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Route Require
const userRoute = require('./routes/userRoute');

console.log(process.env.NODE_ENV)
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


// const accessLogStream = fs.createWriteStregzsam(path.join(__dirname, 'access.log'),{ flags: 'a'})

app.use(helmet());
app.use(compression());
// app.use(morgan('combined', {stream:accessLogStream}));

app.listen( process.env.PORT||8080);

