'use strict';

const Router = require('koa-router');
const miscController = require('./controllers/misc');
const bookRouters = require('./routes/book');

const router = new Router();
router.get('/', miscController.getApiInfo);
router.get('/spec', miscController.getSwaggerSpec);
router.get('/status', miscController.healthcheck);
//book
router.use(bookRouters.routes(), router.allowedMethods());

module.exports = router;
