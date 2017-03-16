var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.121.255.2',
  user     : 'tkmanager',
  password : 'tkmanager',
  database : 'tkmanager'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    //connection.connect();

    connection.query('select * from workers where 1', function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.json(JSON.stringify(rows));
    });

    //connection.end();
});

module.exports = router;