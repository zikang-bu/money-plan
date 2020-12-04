const Response = require('../utils/response');
const bookModel = require('../model/book');
const _ = require('lodash');
const dateFn = require('../utils/date')
const countFn = require('../utils/count')

exports.items = async (ctx) => {
  const items = await bookModel.items(ctx.request.query);
  items.forEach(i => i.date = dateFn.dateformat(i.date, 'YYYY-MM-DD'))
  const obj = _.groupBy(items, 'date')
  let data = []
  for (let key in obj) {
    data.push({
      date: key,
      expend: countFn.add(obj[key].filter(i => i.type === 1).map(i => i.amount)),
      income: countFn.add(obj[key].filter(i => i.type === 2).map(i => i.amount)),
      items: obj[key],
    })
  }
  return Response.success(ctx, {
    code: 200,
    data,
    message: 'success'
  });
};

exports.setItem = async (ctx) => {
  console.log('exports.setItem -> ctx', ctx.request.body);
  const params = ctx.request.body
  let item = {}
  params.id ? (item = await bookModel.updateItem(ctx.request.body)) :
    (item = await bookModel.setItem(ctx.request.body))
  return Response.success(ctx, {
    code: 200,
    data: item,
    message: 'success'
  });
};
