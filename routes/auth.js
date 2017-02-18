var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({auth: 'auth controller'});
});
router.get('/login', function(req, res, next) {
  res.json({auth: 'login action'});
});


module.exports = router;
