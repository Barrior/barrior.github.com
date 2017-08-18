const Router = require('koa-router');
const user = require('./user');

const router = new Router();

// REST API : USER
router.get('/user/getCookie', user.getCookie);
router.get('/user/logout', user.logout);
router.post('/user/login', user.login);
router.post('/user/register', user.register);
router.put('/user', user.updateUser);
router.del('/user', user.deleteUser);

module.exports = router;