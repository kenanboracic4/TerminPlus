var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/db');
const models = require('./models/index');




require('dotenv').config();
const cors = require('cors');


var app = express(); 


app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var matchesRouter = require('./routes/matches');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/matches', matchesRouter);


sequelize.sync({ alter: true, logging: false}) 
    .then(() => {
        console.log('Baza podataka uspješno povezana!');
       
        console.log('Registrovani modeli:', Object.keys(sequelize.models));
    })
    .catch(err => console.error('DETALJNA GREŠKA PRI SINHRONIZACIJI:', err));
module.exports = app;