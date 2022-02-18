const Router = require("koa-router");
const ImageController = require("../controllers/ImageController")
const auth = require("../../middleware/auth");
const upload = require("../../middleware/image")

const router = new Router();
router.prefix("/api/v1/image");
router.post("/", auth, upload.single('image'), ImageController.createImage);
router.get("/:id", auth, ImageController.getOneImage);
router.put("/:id", auth, upload.single('image'), ImageController.updateImage)
router.delete("/:id", auth, ImageController.deleteImage);

module.exports = router