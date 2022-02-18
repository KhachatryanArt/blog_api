const Router = require("koa-router");
const CommentController = require("../controllers/CommentController");
const auth = require("../../middleware/auth");

const router = new Router();

router.prefix("/api/v1/comment");

router.post("/", auth, CommentController.createComment);
router.put("/:id", auth, CommentController.updateComment);
router.delete("/:id", auth, CommentController.deleteComment);

module.exports = router;