const Router = require('koa-router');
const user = require('./user');

const router = new Router();

// REST API : USER
router.get('/user/getCookie', user.getCookie);
router.get('/user/signout', user.signout);
router.post('/user/signin', user.signin);
router.post('/user/signup', user.signup);
router.put('/user', user.updateUser);
router.del('/user', user.deleteUser);

module.exports = router;