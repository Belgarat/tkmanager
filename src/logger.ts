import * as winston from "winston";
import * as winston_mysql from "winston-mysql";
import { db } from "./db";
var oDb = new db();

var options_default = {
  host     : oDb.PRODUCTION_HOST,
  user     : oDb.PRODUCTION_USER,
  password : oDb.PRODUCTION_PASSWORD,
  database : oDb.PRODUCTION_DB,
  table    : 'log_table'
};

export var logger = new (winston.Logger)({
    transports: [
        new winston_mysql(options_default)
    ]
});
/*var msg:string = 'test message';
logger.info('first log', {message: msg});*/