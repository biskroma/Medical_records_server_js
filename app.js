'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Define routes
const medical_records_routes = require('./routes/medical_records');

app.use(bodyParser.urlencoded({extended: false}));
// Convert to JSON object all the data that come from HTTP requests
app.use(bodyParser.json());

// Set up cross access for http headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use(cors());

// Base routes with the word 'api' before the routes
app.use('/api', medical_records_routes);

app.get('/test', (req, res)=>{
    res.status(200).send({message: 'App is working'});
});

// Export module
module.exports = app;