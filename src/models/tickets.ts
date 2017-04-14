import { db } from "../db";
import { logger } from "../logger";
import { Trace } from "./trace";

/**
 * / model
 *
 * @class Tickets
 */
export class Tickets {
    
    oDb;
    //oTrace;

    constructor(){
        //create connection to DB
        this.oDb = new db();
        //this.oTrace = new Trace();
    }

    /**
   * getAll
   *
   * @class Tickets
   * get all tickets
   */
    public getAll(req, res, next) {
        //get connection and execute query
        this.oDb.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where 1', function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            //console.log(this.oDb.get().query.sql);
            return res.json(rows);
        });
    }
    
   /**
   * getById
   *
   * @class Tickets
   * get ticket by id
   */
    public getById(req, res, next) {
        //get connection and execute query
        this.oDb.get().query('select a.*,b.priority,c.status from  tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.id in (?)', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    /**
   * getCurrentTrace
   *
   * @class Tickets
   * get current ticket trace from ticket id
   */
    public getCurrentTrace(req, res, next) {
        let oTrace = new Trace();
        return oTrace.getCurrent(req,res);
    }

     /**
   * getCurrentTrace
   *
   * @class Tickets
   * get current ticket trace from ticket id
   */
    public getCompleteTrace(req, res, next) {
        let oTrace = new Trace();
        return oTrace.getAll(req,res);
    }

      /**
   * addTrace
   *
   * @class Tickets
   * add new ticket trace from ticket id
   */
    public addTrace(req, res, next) {
        let oTrace = new Trace();
        let result = oTrace.add(req.ticket_id, req.body.creator_id, req.body.user_id, req.body.group_id);
        return result;
    }

    /**
   * getJobs
   *
   * @class Tickets
   * get jobs linked to a single ticket by ticket id
   */
    public getJobs(req, res, next) {
        //console.log(req);
        //get connection and execute query
        this.oDb.get().query('select a.*,b.name,surname,email from jobs as a left join workers as b on (a.worker_id = b.id) where a.ticket_id = ?', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    /**
   * getCustomer
   *
   * @class Tickets
   * get customer linked to a single ticket by ticket id
   */
    public getCustomer(req, res, next) {
        //console.log(req);
        //get connection and execute query
        this.oDb.get().query('select customers.* from customers left join tickets on (customers.id = tickets.customer_id) where tickets.id = ?', req, function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

    /**
   * searchFullText
   *
   * @class Tickets
   * get tickets by fulltext search
   */
    public searchFullText(req, res, next) {
        //console.log(req);
        //get connection and execute query
        this.oDb.get().query('select a.*,b.priority,c.status from tickets as a left join ticket_priority_meta as b on (a.priority_id = b.id) left join ticket_status_meta as c on (a.status_id = c.id) where a.description like ? ', '%'+req+'%', function(err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(rows);
        });
    }

     /**
     * add
     *
     * @class Tickets
     * insert new ticket and return last insert id
     */
    public add(req, res, next) {
        let createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let updatedAt = createdAt;
        let values = [req.body.creatorId, req.body.customerId, req.body.statusId, req.body.priorityId, req.body.description, createdAt, updatedAt];
        let strQuery='insert into tickets(creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values(?,?,?,?,?,?,?)';
        this.oDb.get().query(strQuery, values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger.info('ticket '+result.insertId+' created by '+req.params.creatorId+' - '+strQuery+' --> params '+JSON.stringify(values));
            return result.insertId;
        });
    }

    /**
     * update
     *
     * @class Tickets
     * update a ticket and return true/false
     */
    public save(req, res, next) {
        //current timestamp from UTC to standard datetime
        let updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let values = [req.body.statusId, req.body.priorityId, req.body.description, updatedAt];
        let strQuery='update tickets set status_id = ?, priority_id = ?, description = ?, updated_at = ? where id = '+req.ticket_id;
        this.oDb.get().query(strQuery, values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger.info('ticket '+req.ticket_id+' updated by - '+strQuery+' --> params '+JSON.stringify(values));
            return true;
        });
    }

    /**
     * delete
     *
     * @class Tickets
     * delete a ticket and return true/false
     */
    public delete(req, res, next) {
        //current timestamp from UTC to standard datetime
        let deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let values = [deletedAt];
        let strQuery='update tickets deleted_at = ? where id = '+req.ticket_id;
        this.oDb.get().query(strQuery, values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger.info('ticket '+req.ticket_id+' deleted by - '+strQuery+' --> params '+JSON.stringify(values));
            return true;
        });
    }

    /**
     * undelete
     *
     * @class Tickets
     * undelete a ticket and return true/false
     */
    public undelete(req, res, next) {
        //current timestamp from UTC to standard datetime
        //let updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let values = [null];
        let strQuery='update tickets deleted_at = ? where id = '+req.ticket_id;
        this.oDb.get().query(strQuery, values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger.info('ticket '+req.ticket_id+' undeleted by - '+strQuery+' --> params '+JSON.stringify(values));
            return true;
        });
    }
}