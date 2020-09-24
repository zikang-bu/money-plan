const Router = require('koa-router');
const bookController = require('../controllers/book')
const router = new Router();

router.prefix('/api/v1/book')

router.get('/items', bookController.items);

module.exports = router;
