"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const logger_1 = require("../logger");
const trace_1 = require("./trace");
class Tickets {
    constructor() {
        this.oDb = new db_1.db();
        this.oTrace = new trace_1.Trace();
    }
    getAll(req, res, next) {
        this.oDb.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where 1', function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getById(req, res, next) {
        this.oDb.get().query('select a.*,b.priority,c.status from  tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.id in (?)', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getCurrentTrace(req, res, next) {
        return this.oTrace.getCurrent(req, res);
    }
    getCompleteTrace(req, res, next) {
        return this.oTrace.getAll(req, res);
    }
    getJobs(req, res, next) {
        this.oDb.get().query('select a.*,b.name,surname,email from jobs as a left join workers as b on (a.worker_id = b.id) where a.ticket_id = ?', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getCustomer(req, res, next) {
        this.oDb.get().query('select customers.* from customers left join tickets on (customers.id = tickets.customer_id) where tickets.id = ?', req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    searchFullText(req, res, next) {
        this.oDb.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.description like ? ', '%' + req + '%', function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    add(req, res, next) {
        let creatorId = 100;
        let customerId = 99;
        let statusId = 0;
        let priorityId = 0;
        let description = "test";
        let created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let updated_at = created_at;
        console.log(created_at);
        let values = [creatorId, customerId, statusId, priorityId, description, created_at, updated_at];
        let strQuery = 'insert into tickets(creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values(?,?,?,?,?,?,?)';
        this.oDb.get().query(strQuery, values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            this.oTrace.add(1, 1, 2, 0);
            logger_1.logger.info('ticket ' + result.insertID + ' created by ' + creatorId + ' - ' + strQuery + ' --> params ' + JSON.stringify(values));
            return result.insertID;
        });
        return true;
    }
    update(statusId, priorityId, description) {
        var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return true;
    }
    delete(ticketId) {
        return true;
    }
}
exports.Tickets = Tickets;
