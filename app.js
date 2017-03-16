var express = require('express');
var morgan      = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

//moduli e variabili aggiuntive di test per connessione DB
var me = require('./routes/me');
////////////////////////////////////////////

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morgan('dev'));

app.use('/api/v1/users', users);
////////////////////////////////
app.use('/api/v1/me', me);
///////////////////////////////

module.exports = app;

