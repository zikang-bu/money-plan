const { query, insert, update } = require('../utils/better-mysql');

const budgetModel = {
  budget(params) {
    const { date } = params;
    const sql = `SELECT
                  *
                  FROM
                  budget 
                  where date like '${date}%' `;
    return query(sql);
  },
  budgetItems(params) {
    const { pid, date } = params;
    const sql = `SELECT
                 item.id,
                 item.pid,
                 item.category,
                 item.sum,
                 SUM(b.amount) as expend,
                 c.name as categoryName 
                 FROM
                 budget_items item
                 LEFT JOIN bill b ON item.category = b.category
                 AND date LIKE '${date}%'
                 LEFT JOIN category c ON c.id = item.category 
                 WHERE
                 item.pid = ${pid}
                 GROUP BY
                 id `;
    return query(sql);
  },
  setBudget(params) {
    return insert(params, 'budget');
  },
  updateBudget(params) {
    return update(params, 'budget', { id: id });
  },
  setItem(params) {
    return insert(params, 'budget_items');
  },
  updateItem({ id: id, ...params }) {
    return update(params, 'budget_items', { id: id });
  }
};

module.exports = budgetModel;
