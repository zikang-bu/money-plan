const { query, insert } = require('../utils/better-mysql');

const categoryModel = {
  items(params) {
    const sql = `select * from category`;
    return query(sql);
  },
  setItem(params) {
    return insert(params, 'category');
  }
};

module.exports = categoryModel;
