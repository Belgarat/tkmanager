// MySQL
import mysql = require('mysql');
import async = require('async');

/**
 * / model
 *
 * @class DB
 */
export class db {

  PRODUCTION_DB:string = 'tkmanager';

  PRODUCTION_HOST:string = 'localhost';

  PRODUCTION_USER:string = 'tkmanager'

  PRODUCTION_PASSWORD:string = 'tkmanager'

  MODE_PRODUCTION:string = 'mode_production'

  state:any = {
    pool: null,
    mode: null,
  }

  constructor(){
    this.connect();
  }

  //connection to DB if mode === 'mode test' || === 'mode_production'
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   mode_test IS FOR AUTOMATED TESTING ONLY   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //export function connect(mode: string) {
  public connect() {
      this.state.pool = mysql.createPool({
        host: this.PRODUCTION_HOST,
        user: this.PRODUCTION_USER,
        password: this.PRODUCTION_PASSWORD,
        database: this.PRODUCTION_DB
    });
  }

  public get() {
    return this.state.pool
  }
}
/*exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}*/

/*exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}*/