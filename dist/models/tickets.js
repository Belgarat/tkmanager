"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db");
class Tickets {
    constructor() {
        db.connect();
    }
    getAll(req, res, next) {
        db.get().query('select * from tickets where 1', function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getByIds(req, res, next) {
        db.get().query('select * from tickets where id in (?)', req, function (err, rows) {
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
