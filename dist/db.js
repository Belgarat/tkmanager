"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class db {
    constructor() {
        this.PRODUCTION_DB = 'tkmanager';
        this.PRODUCTION_HOST = 'localhost';
        this.PRODUCTION_USER = 'tkmanager';
        this.PRODUCTION_PASSWORD = 'tkmanager';
        this.MODE_PRODUCTION = 'mode_production';
        this.state = {
            pool: null,
            mode: null,
        };
        this.connect();
    }
    connect() {
        this.state.pool = mysql.createPool({
            host: this.PRODUCTION_HOST,
            user: this.PRODUCTION_USER,
            password: this.PRODUCTION_PASSWORD,
            database: this.PRODUCTION_DB
        });
    }
    get() {
        return this.state.pool;
    }
}
exports.db = db;
