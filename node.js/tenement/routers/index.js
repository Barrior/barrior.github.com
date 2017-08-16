const Router = require('koa-router');
const user = require('./user');

const router = new Router();

// REST API : USER
router.get('/user/:id', user.getUser);
router.post('/user', user.createUser);
router.put('/user/:id', user.updateUser);
router.del('/user/:id', user.deleteUser);

module.exports = router;