const express = require('express');
const app = express();

const index = require('./routes/index');
const userRoute = require('./routes/userRoute');

//Rotas
app.use('/', index);
app.use('/users', userRoute);

module.exports = app;