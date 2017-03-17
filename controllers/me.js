var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.query('select * from workers where 1', function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.json(JSON.stringify(rows));
    });
});

module.exports = router;