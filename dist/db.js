"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
var PRODUCTION_DB = 'tkmanager';
var PRODUCTION_HOST = 'localhost';
var PRODUCTION_USER = 'tkmanager';
var PRODUCTION_PASSWORD = 'tkmanager';
var MODE_PRODUCTION = 'mode_production';
var state = {
    pool: null,
    mode: null,
};
function connect() {
    state.pool = mysql.createPool({
        host: PRODUCTION_HOST,
        user: PRODUCTION_USER,
        password: PRODUCTION_PASSWORD,
        database: PRODUCTION_DB
    });
}
exports.connect = connect;
function get() {
    return state.pool;
}
exports.get = get;
