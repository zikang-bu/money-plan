const Response = require('../utils/response');
const bookModel = require('../model/book');

exports.items = async (ctx) => {
  const items = await bookModel.items(ctx.request.query);
  return Response.success(ctx, {
    code: 200,
    data: items,
    message: 'success'
  });
};

exports.setItem = async (ctx) => {
  console.log('exports.setItem -> ctx', ctx.request.body);
  const item = await bookModel.setItem(ctx.request.body);
  return Response.success(ctx, {
    code: 200,
    data: item,
    message: 'success'
  });
};
