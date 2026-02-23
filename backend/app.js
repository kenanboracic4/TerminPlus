var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/db');
const models = require('./models/index');



require('dotenv').config();
const cors = require('cors');

// 1. PRVO kreiraj app objekt
var app = express(); 

// 2. TEK ONDA dodaj middleware
app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rute
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 4. Baza
// app.js
sequelize.sync({ alter: true, logging: false}) 
    .then(() => {
        console.log('Baza podataka uspješno povezana!');
        // Ispisujemo registrovane modele da budemo 100% sigurni
        console.log('Registrovani modeli:', Object.keys(sequelize.models));
    })
    .catch(err => console.error('DETALJNA GREŠKA PRI SINHRONIZACIJI:', err));
module.exports = app;