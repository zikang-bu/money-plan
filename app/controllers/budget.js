const Response = require('../utils/response');
const budgetModel = require('../model/budget');
const _ = require('lodash');
const dateFn = require('../utils/date')
const countFn = require('../utils/count')

exports.budget = async (ctx) => {
  const budgetRes = await budgetModel.budget(ctx.request.body);
  const budget = JSON.parse(JSON.stringify(budgetRes))[0];
  budget.date = dateFn.dateformat(budget.date, 'YYYY-MM')
  const budgetItems = await budgetModel.budgetItems(
    { pid: budget.id, date: budget.date });
  budget.items = budgetItems
  budget.expend = countFn.add(budgetItems.map(i => i.expend));
  budget.last = budget.sum - budget.expend
  return Response.success(ctx, {
    code: 200,
    data: budget,
    message: 'success'
  });
};

exports.setBudget = async (ctx) => {
  const params = ctx.request.body
  let item = {}
  params.id ? (item = await budgetModel.updateBudget(ctx.request.body)) :
    (item = await budgetModel.setBudget(ctx.request.body))
  return Response.success(ctx, {
    code: 200,
    data: item,
    message: 'success'
  });
};

exports.setItem = async (ctx) => {
  const params = ctx.request.body
  let item = {}
  params.id ? (item = await budgetModel.updateItem(ctx.request.body)) :
    (item = await budgetModel.setItem(ctx.request.body))
  return Response.success(ctx, {
    code: 200,
    data: item,
    message: 'success'
  });
};
