const { query, insert, update } = require('../utils/better-mysql');

const bookModel = {
  items(params) {
    const { date } = params;
    const sql = `SELECT
                  a.id,
                  a.amount,
                  a.date,
                  a.type,
                  a.category AS categoryId,
                  a.remarks,
                  c.name AS category 
                  FROM
                  bill a 
                  JOIN category c ON a.category = c.id
                  where a.date like '${date}%' `;
    return query(sql);
  },
  setItem(params) {
    return insert(params, 'bill');
  },
  updateItem({ id: id, ...params }) {
    return update(params, 'bill', { id: id });
  }
};

module.exports = bookModel;
