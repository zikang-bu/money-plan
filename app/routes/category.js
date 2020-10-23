const Router = require('koa-router');
const categoryController = require('../controllers/category')
const router = new Router();

router.prefix('/api/v1/category')

router.get('/items', categoryController.items);

router.post('/setItem', categoryController.setItem);

module.exports = router;
