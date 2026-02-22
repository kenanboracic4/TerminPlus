var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/db');
require('dotenv').config();
const cors = require('cors');
app.use(cors()); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

sequelize.sync({ alter: true }) 
    .then(() => console.log('Baza podataka uspješno povezana i sinhronizovana!'))
    .catch(err => console.error('Greška pri povezivanju na bazu:', err));

module.exports = app;
