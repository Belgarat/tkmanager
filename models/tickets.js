var express = require('express');
var db = require('../db.js');

//get all tickets
exports.getAll = function(done) {
    db.get().query('select * from tickets where 1', function(err, rows) {
        if (err) {
            console.log(err);
            return done(err);
        }
        done(null,rows);
    });
};

//get one or more tickets by id/s separated by comma
exports.getByIds = function(ticketId, done) {
    db.get().query('select * from tickets where id in (?)', ticketId, function(err, rows) {
        if (err) {
            console.log(err);
            return done(err);
        }
        done(null,rows);
    });
};

//create new ticket and return last insert id
exports.create = function(creatorId, customerId, statusId, priorityId, description, done) {
    //current timestamp from UTC to standard datetime
    var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var values = [creatorId, customerId, statusId, priorityId, description, now, now];
    db.get().query('insert into tickets (creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values (?,?,?,?,?,?,?) ', values, function(err, result) {
        if (err) {
            console.log(err);
            return done(err);
        }
        done(null,result.insertID);
    });
};