var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = 'tkmanager'
  , TEST_DB = 'tkmanager'

var PRODUCTION_HOST = '10.121.255.2'
  , TEST_HOST = '10.121.255.2'

var PRODUCTION_USER = 'tkmanager'
  , TEST_USER = 'tkmanager'

var PRODUCTION_PASSWORD = 'tkmanager'
  , TEST_PASSWORD = 'tkmanager'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

//connection to DB if mode === 'mode test' || === 'mode_production'
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   mode_test IS FOR AUTOMATED TESTING ONLY   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: mode === exports.MODE_PRODUCTION ? PRODUCTION_HOST : TEST_HOST,
    user: mode === exports.MODE_PRODUCTION ? PRODUCTION_USER : TEST_USER,
    password: mode === exports.MODE_PRODUCTION ? PRODUCTION_PASSWORD : TEST_PASSWORD,
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
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