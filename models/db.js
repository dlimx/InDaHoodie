const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// leverage async/await syntax instead of callback
pool.asyncQuery = util.promisify(pool.query);

module.exports = {
  mysql,
  pool,
};
