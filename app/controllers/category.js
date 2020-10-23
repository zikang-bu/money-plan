const Response = require('../utils/response');
const categoryModel = require('../model/category');

exports.items = async (ctx) => {
  const items = await categoryModel.items(ctx.request.query);
  let data = items.filter(i => !i.pid);
  data.forEach(d => d.children = items.filter(i => i.pid === d.id))
  return Response.success(ctx, {
    code: 200,
    data: data,
    message: 'success'
  });
};

exports.setItem = async (ctx) => {
  console.log('exports.setItem -> ctx', ctx.request.body);
  const item = await categoryModel.setItem(ctx.request.body);
  return Response.success(ctx, {
    code: 200,
    data: item,
    message: 'success'
  });
};
