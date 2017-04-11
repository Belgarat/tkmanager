import { db } from "../db";
import { logger } from "../logger";

/**
 * / model
 *
 * @class Trace
 */
export class Trace {
    
    oDb;

    constructor(){
        //create connection to DB
        this.oDb = new db();
    }

    /**
   * getCurrent
   *
   * @class Trace
   * get last (=current) trace for a single ticket
   */
    public getCurrent(req,res){
        let q="select a.created_at, a.creator_id, concat(b.name,' ',b.surname) as creator_label, a.user_id, concat(c.name,' ',c.surname) as user_label, a.group_id, d.group_name as group_label";
        q = q+" from trace as a left join user_profiles as b on (a.creator_id = b.user_id) left join user_profiles as c on (a.user_id = c.user_id) left join groups as d on (a.group_id=d.id)";
        q = q+" where a.ticket_id = ? order by a.id desc limit 1";
        //console.log(q);
        this.oDb.get().query(q, req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            //console.log(rows);
            return res.json(rows);
        });
    }

     /**
   * getAll
   *
   * @class Trace
   * get complete trace history for a single ticket, ordered from oldest to current
   */
    public getAll(req,res){
        let q="select a.created_at, a.creator_id, concat(b.name,' ',b.surname) as creator_label, a.user_id, concat(c.name,' ',c.surname) as user_label, a.group_id, d.group_name as group_label";
        q = q+" from trace as a left join user_profiles as b on (a.creator_id = b.user_id) left join user_profiles as c on (a.user_id = c.user_id) left join groups as d on (a.group_id=d.id)";
        q = q+" where a.ticket_id = ? order by a.id asc";
        //console.log(q);
        this.oDb.get().query(q, req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            //console.log(rows);
            return res.json(rows);
        });
    }

  /**
   * add
   *
   * @class Trace
   * add new trace for a single ticket
   */
    public add(ticket_id,creator_id,user_id,group_id){
        var created_at:string = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        //console.log(created_at);
        let id = null;
        let values = [id, created_at, ticket_id, creator_id, user_id, group_id]
        //console.log(values);
        //let q="insert into trace (created_at,ticket_id,creator_id,user_id,group_id) values (?)";
        let q="insert into trace values (?,?,?,?,?,?)";
        this.oDb.get().query(q, values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(result.insertID);
            return true;
        });
    }
}