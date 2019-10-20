const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('../config.json');

const app = express();

mongoose.connect(config.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request, Content-Type, Accept, Authorization ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});

//Rotas
const index = require('./routes/index');
const userRoute = require('./routes/userRoute');

app.use('/', index);
app.use('/users', userRoute);

module.exports = app;