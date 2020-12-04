const Response = require('../utils/response');
const categoryModel = require('../model/category');

exports.items = async (ctx) => {
  const data = await categoryModel.items(ctx.request.query);
  return Response.success(ctx, {
    code: 200,
    data,
    message: 'success'
  });
};

exports.setItem = async (ctx) => {
  const item = await categoryModel.setItem(ctx.request.body);
  return Response.success(ctx, {
    code: 200,
    data: item,
    message: 'success'
  });
};
