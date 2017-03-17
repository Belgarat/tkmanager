//modules
var express = require('express');
var morgan      = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//controllers
var tickets = require('./controllers/tickets');
var users = require('./controllers/users');
var me = require('./controllers/me');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(morgan('dev'));

//routes
app.use('/api/v1/tickets', tickets);
app.use('/api/v1/users', users);
app.use('/api/v1/me', me);

//DB and connection
var db = require('./db')
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('ERROR: unable to connect to DB.')
    process.exit(1)
  } else {
    /*app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })*/
  }
})

module.exports = app;

