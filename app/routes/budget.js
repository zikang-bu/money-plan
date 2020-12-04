const Router = require('koa-router');
const budgetController = require('../controllers/budget')
const router = new Router();

router.prefix('/api/v1/budget')

router.post('/budget', budgetController.budget);

router.post('/setBudget', budgetController.setBudget);

router.post('/setItem', budgetController.setItem);

module.exports = router;
