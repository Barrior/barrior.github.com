const Router = require('koa-router');
const user = require('./user');
const house = require('./house');

const router = new Router();

// REST API : USER
router.post('/user/signup', user.signup);
router.post('/user/signin', user.signin);
router.get('/user/signout', user.signout);
router.get('/user/info', user.getUserInfo);
router.put('/user/change', user.updateUser);
router.del('/user', user.deleteUser);

// HOUSE
router.get('/house/list', house.list);

module.exports = router;