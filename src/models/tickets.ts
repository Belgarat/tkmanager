//var express = require('express');
import * as db from "../db";

/**
 * / model
 *
 * @class Tickets
 */
export class Tickets {

    constructor(){
        //create connection to DB
        db.connect();
    }

    //get all tickets
    public getAll(req, res, next) {
        //get connection and execute query
        db.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where 1', function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    //get one or more tickets by ids separated by comma
    public getById(req, res, next) {
        //console.log(req);
        //get connection and execute query
        db.get().query('select a.*,b.priority,c.status from  tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.id in (?)', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    public getJobs(req, res, next) {
        //console.log(req);
        //get connection and execute query
        db.get().query('select a.*,b.name,surname,email from jobs as a left join workers as b on (a.worker_id = b.id) where a.ticket_id = ?', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    public getCustomer(req, res, next) {
        //console.log(req);
        //get connection and execute query
        db.get().query('select customers.* from customers left join tickets on (customers.id = tickets.customer_id) where tickets.id = ?', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    public searchFullText(req, res, next) {
        //console.log(req);
        //get connection and execute query
        db.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.description like "%?%" ', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    //create new ticket and return last insert id
    public insert(creatorId, customerId, statusId, priorityId, description) {
        //current timestamp from UTC to standard datetime
        var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var values = [creatorId, customerId, statusId, priorityId, description, now, now];
        //get connection and execute query
        db.get().query('insert into tickets (creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values (?,?,?,?,?,?,?) ', values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            return result.insertID;
        });
    }

    //create new ticket and return last insert id
    public update(statusId, priorityId, description) {
        //current timestamp from UTC to standard datetime
        var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    //create new ticket and return last insert id
    public delete(ticketId) {

    }
}