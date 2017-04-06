import { db } from "../db";
import { logger } from "../logger";

/**
 * / model
 *
 * @class Tickets
 */
export class Tickets {
    
    oDb;

    constructor(){
        //create connection to DB
        this.oDb = new db();
        //winston.default.transports.console.level='debug';
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
        //console.log(req);
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
     * insert
     *
     * @class Tickets
     * insert new ticket and return last insert id
     */
    public insert(creatorId, customerId, statusId, priorityId, description) {
        //current timestamp from UTC to standard datetime
        let now1 = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let now2 = now1;
        let values = {creatorId, customerId, statusId, priorityId, description, now1, now2};
        //get connection and execute query
        let strQuery='insert into tickets (creator_id, customer_id, status_id, priority_id, description, created_at, updated_at) values (?,?,?,?,?,?,?) ';
        this.oDb.get().query(strQuery, values, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            logger.info('ticket '+result.insertID+' created by '+creatorId);
            return result.insertID;
        });
    }

    /**
     * update
     *
     * @class Tickets
     * update a ticket and return true/false
     */
    public update(statusId, priorityId, description) {
        //current timestamp from UTC to standard datetime
        var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        //logger.info('ticket '+result.insertID+' updated by '+creatorId);
        return true;
    }

    /**
     * delete
     *
     * @class Tickets
     * delete a ticket and return true/false
     */
    public delete(ticketId) {
        //logger.info('ticket '+result.insertID+' deleted by '+creatorId);
        return true;
    }
}