'use strict';
const Response = require('../utils/response');
const bookModel = require('../model/book')

exports.items = async (ctx) => {
  const items = await bookModel.items()
  return Response.success(ctx, {
    code: 200,
    data: items,
    message: 'success'
  });
};
