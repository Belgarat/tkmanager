"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
class Trace {
    constructor() {
        this.oDb = new db_1.db();
    }
    getCurrent(req, res) {
        let q = "select a.created_at, a.creator_id, concat(b.name,' ',b.surname) as creator_label, a.user_id, concat(c.name,' ',c.surname) as user_label, a.group_id, d.group_name as group_label";
        q = q + " from trace as a left join user_profiles as b on (a.creator_id = b.user_id) left join user_profiles as c on (a.user_id = c.user_id) left join groups as d on (a.group_id=d.id)";
        q = q + " where a.ticket_id = ? order by a.id desc limit 1";
        this.oDb.get().query(q, req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    getAll(req, res) {
        let q = "select a.created_at, a.creator_id, concat(b.name,' ',b.surname) as creator_label, a.user_id, concat(c.name,' ',c.surname) as user_label, a.group_id, d.group_name as group_label";
        q = q + " from trace as a left join user_profiles as b on (a.creator_id = b.user_id) left join user_profiles as c on (a.user_id = c.user_id) left join groups as d on (a.group_id=d.id)";
        q = q + " where a.ticket_id = ? order by a.id asc";
        this.oDb.get().query(q, req, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }
    add(ticket_id, creator_id, user_id, group_id) {
        var created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(created_at);
        let values = { id: null, created_at, ticket_id, creator_id, user_id, group_id };
        let q = "insert into trace values (?)";
        this.oDb.get().query(q, values, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(result.insertID);
            return true;
        });
    }
}
exports.Trace = Trace;
