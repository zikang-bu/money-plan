const Router = require('koa-router');
const userController = require('../controllers/user')
const router = new Router();

router.prefix('/api/v1/user')

router.get('/info', userController.info);

router.post('/login', userController.login);

router.post('/register', userController.register);

router.post('/sendCode', userController.sendCode);

router.post('/vertifyCode', userController.vertifyCode);

module.exports = router;
