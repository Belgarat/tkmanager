var express = require('express');
var morgan      = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morgan('dev'));

app.use('/api/v1/users', users);

//authentication controller
app.use('/api/v1/auth', auth);

module.exports = app;

