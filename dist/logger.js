"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const winston_mysql = require("winston-mysql");
const db_1 = require("./db");
var oDb = new db_1.db();
var options_default = {
    host: oDb.PRODUCTION_HOST,
    user: oDb.PRODUCTION_USER,
    password: oDb.PRODUCTION_PASSWORD,
    database: oDb.PRODUCTION_DB,
    table: 'log_table'
};
exports.logger = new (winston.Logger)({
    transports: [
        new winston_mysql(options_default)
    ]
});
