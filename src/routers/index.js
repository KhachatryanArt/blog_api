const Router = require('koa-router');
const authRouter = require('./auth');
const postRouter = require('./post');
const imageRouter = require('./image');
const connectRouter = require('./comment');

const router = new Router();

router.use(authRouter.routes());
router.use(postRouter.routes());
router.use(imageRouter.routes());
router.use(connectRouter.routes());


module.exports = router;

