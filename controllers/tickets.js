var express = require('express');
var router = express.Router();
var Tickets = require('../models/tickets');

//get one or more or all tickets
router.get('/', function(req,res) {
    Tickets.getAll(function(err,rows){
        res.json(JSON.stringify(rows));
    });
});

//get one or more ticket(s)
//param ids must be a string of comma separated integer(s)
router.get('/:ids', function(req, res) {
    Tickets.getByIds(req.params.ids,function(err,rows){
        res.json(JSON.stringify(rows));
    });
});

module.exports = router;