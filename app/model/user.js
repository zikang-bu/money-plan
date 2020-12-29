const { query, insert, update } = require('../utils/better-mysql');

const bookModel = {
  info(params) {
    const { date } = params;
    const sql = `SELECT
                  * 
                  FROM
                  user `;
    return query(sql);
  },
  checkUser(params) {
    const { mail, password } = params;
    const sql = `SELECT
                  count(*) as count 
                  FROM
                  user where mail = '${mail}' and password = '${password}'`;
    console.log('%c[ sql ]', 'font-size:13; background:pink; color:#bf2c9f;', sql)
    return query(sql);
  },
  setItem(params) {
    return insert(params, 'user');
  },
  updateItem({ id: id, ...params }) {
    return update(params, 'user', { id: id });
  }
};

module.exports = bookModel;
