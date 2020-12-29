const mysql = require('mysql');

const config = require('../config/mysql');

let pool = mysql.createPool({
  user: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port
});

let query = (sql) => {
  return _operation(sql);
};
/**
 *
 * @param {*} array :Array select a,b,c from
 * @param {*} table :String
 * @param {*} where :{ key: value }
 * @param {*} link  :'AND' or 'OR' default 'AND'
 */
let select = (array, table, where, link) => {
  return _operation(_handleSelectString(array, table, where, link));
};

let insert = (info, table) => {
  let sql = 'INSERT INTO ' + table + '(';
  let keyArray = [];
  let valueArray = [];
  Object.keys(info).forEach((key) => {
    keyArray.push(key);
    valueArray.push("'" + info[key] + "'");
  });
  let keyStr = keyArray.join(',');
  let valueStr = valueArray.join(',');
  sql += keyStr + ') ';
  sql += 'VALUES(' + valueStr + ')';
  return _operation(sql);
};

let update = (info, table, where, link = 'AND') => {
  let sql = 'UPDATE ' + table + ' SET ';
  let sqlArray = [];
  Object.keys(info).forEach((key) => {
    sqlArray.push(key + "='" + info[key] + "'");
  });
  sql += sqlArray.join(',');
  if (where) {
    sql += _handleWhereString(where, link);
  }
  return _operation(sql);
};

let deleteItem = (info, table, where, link = 'AND') => {
  let sql = 'DELETE FROM ' + table;
  if (where) {
    sql += _handleWhereString(where, link);
  }
  return _operation(sql);
};

let _operation = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, (err, fields) => {
          if (err) {
            reject(err);
          }else {
            resolve(fields);
          }
          connection.release();
        });
      }
    });
  });
};

let _handleWhereString = (where, link) => {
  let str = '';
  let whereArray = [];
  Object.keys(where).forEach((key) => {
    whereArray.push(String(key + "='" + where[key] + "'"));
  });
  let whereStr = whereArray.join(' ' + link + ' ');
  str += ' WHERE ' + whereStr;
  return str;
};
let _handleSelectString = (array, table, where, link = 'AND') => {
  let sql = array.length > 0 ? 'SELECT ' : 'SELECT *';
  sql += array.join();
  sql += ' FROM ' + table;
  if (where) {
    sql += _handleWhereString(where, link);
  }
  return sql;
};
module.exports = { query, select, insert, update, deleteItem };
