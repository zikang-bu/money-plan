const { query, insert, update } = require('../utils/better-mysql');

const bookModel = {
  items(params) {
    const { pageNumber, pageSize, orderBy } = params;
    const sql = `select * from book  ORDER BY ${orderBy}  limit ${(pageNumber - 1) * pageSize},${pageSize}`;
    return query(sql);
  },
  setItem(params) {
    return insert(params, 'book');
  },
  updateItem({ id: id, ...params }) {
    return update(params, 'book', { id: id });
  }
};

module.exports = bookModel;
