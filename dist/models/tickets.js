"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db");
class Tickets {
    constructor() {
        db.connect();
    }
    getAll(req, res, next) {
        db.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where 1', function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getById(req, res, next) {
        db.get().query('select a.*,b.priority,c.status from  tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.id in (?)', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getJobs(req, res, next) {
        db.get().query('select a.*,b.name,surname,email from jobs as a left join workers as b on (a.worker_id = b.id) where a.ticket_id = ?', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getCustomer(req, res, next) {
        db.get().query('select customers.* from customers left join tickets on (customers.id = tickets.customer_id) where tickets.id = ?', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    searchFullText(req, res, next) {
        db.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.description like "%?%" ', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    insert(creatorId, customerId, statusId, priorityId, description) {
        var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var values = [creatorId, customerId, statusId, priorityId, description, now, now];
        db.get().query('insert into tickets (creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values (?,?,?,?,?,?,?) ', values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            return result.insertID;
        });
    }
    update(statusId, priorityId, description) {
        var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    delete(ticketId) {
    }
}
exports.Tickets = Tickets;
