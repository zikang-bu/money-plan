'use strict';

const Router = require('koa-router');
const miscController = require('./controllers/misc');
const bookRouters = require('./routes/book');
const categoryRouters = require('./routes/category');
const budgetRouters = require('./routes/budget');

const router = new Router();
router.get('/', miscController.getApiInfo);
router.get('/spec', miscController.getSwaggerSpec);
router.get('/status', miscController.healthcheck);
//book
router.use(bookRouters.routes(), router.allowedMethods());
router.use(categoryRouters.routes(), router.allowedMethods());
router.use(budgetRouters.routes(), router.allowedMethods());

module.exports = router;
