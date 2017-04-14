"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const logger_1 = require("../logger");
const trace_1 = require("./trace");
class Tickets {
    constructor() {
        this.oDb = new db_1.db();
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
        let oTrace = new trace_1.Trace();
        return oTrace.getCurrent(req, res);
    }
    getCompleteTrace(req, res, next) {
        let oTrace = new trace_1.Trace();
        return oTrace.getAll(req, res);
    }
    addTrace(req, res, next) {
        let oTrace = new trace_1.Trace();
        let result = oTrace.add(req.ticket_id, req.body.creator_id, req.body.user_id, req.body.group_id);
        return result;
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
        let createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let updatedAt = createdAt;
        let values = [req.body.creatorId, req.body.customerId, req.body.statusId, req.body.priorityId, req.body.description, createdAt, updatedAt];
        let strQuery = 'insert into tickets(creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values(?,?,?,?,?,?,?)';
        this.oDb.get().query(strQuery, values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger_1.logger.info('ticket ' + result.insertId + ' created by ' + req.params.creatorId + ' - ' + strQuery + ' --> params ' + JSON.stringify(values));
            return result.insertId;
        });
    }
    save(req, res, next) {
        let updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let values = [req.body.statusId, req.body.priorityId, req.body.description, updatedAt];
        let strQuery = 'update tickets set status_id = ?, priority_id = ?, description = ?, updated_at = ? where id = ' + req.ticket_id;
        this.oDb.get().query(strQuery, values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger_1.logger.info('ticket ' + req.ticket_id + ' updated by - ' + strQuery + ' --> params ' + JSON.stringify(values));
            return true;
        });
    }
    delete(req, res, next) {
        let deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let values = [deletedAt];
        let strQuery = 'update tickets deleted_at = ? where id = ' + req.ticket_id;
        this.oDb.get().query(strQuery, values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger_1.logger.info('ticket ' + req.ticket_id + ' deleted by - ' + strQuery + ' --> params ' + JSON.stringify(values));
            return true;
        });
    }
    undelete(req, res, next) {
        let values = [null];
        let strQuery = 'update tickets deleted_at = ? where id = ' + req.ticket_id;
        this.oDb.get().query(strQuery, values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger_1.logger.info('ticket ' + req.ticket_id + ' undeleted by - ' + strQuery + ' --> params ' + JSON.stringify(values));
            return true;
        });
    }
}
exports.Tickets = Tickets;
