const Router = require("koa-router");
const PostController = require("../controllers/PostController");
const auth = require("../middleware/auth");

const router = new Router();

router.prefix("/api/v1/post");

router.post("/", auth, PostController.createPost);
router.get("/", auth, PostController.getPost);
router.get("/:id", auth, PostController.getOnePost);
router.put("/:id", auth, PostController.updatePost);
router.delete("/:id", auth, PostController.deletePost);

module.exports = router;