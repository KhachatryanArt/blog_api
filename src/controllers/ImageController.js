const fs = require("fs")
const mime = require("mime-types")
const ImageService = require("../services/ImageService");
const redisService = require("../db/redis-connetion");


class ImageController {
    static async createImage(ctx) {
        const {id} = ctx.state.user;
        const name = ctx.file.filename;
        const filePath = ctx.file.destination;
        ctx.body = await ImageService.createImage(name, filePath, id)
    }

    static async getOneImage(ctx) {
        const id = ctx.request.params.id;
        const imageObj = await ImageService.getOneImage(id);
        const path = `${imageObj.imageText}/${imageObj.Name}`;
        const mimeType = mime.lookup(path);
        const src = fs.createReadStream(path);
        ctx.response.set("content-type", mimeType);
        ctx.body = src;
    }

    static async deleteImage(ctx) {
        const id = ctx.request.params.id;
        console.log(ctx.state.user)
        const userId = ctx.state.user.id
        const imageObj = await ImageService.getOneImage(id);
        const path = `${imageObj.imageText}\\${imageObj.Name}`;
        await redisService.delKey("")
        ctx.body = await ImageService.deleteImage(id, path, userId)
    }

    static async updateImage(ctx) {
        const imageId = ctx.request.params.id
        const imageObj = await ImageService.getOneImage(imageId)
        const path = ctx.file.destination
        const name = ctx.file.filename
        const thisPath = `${path}\\${name}`;
        if (imageObj != null) {
            const oldPath = `${imageObj.imageText}\\${imageObj.Name}`;
            const userId = ctx.state.user.id
            ctx.body = await ImageService.updateImage(imageId, name, path, userId, oldPath)
        } else {
            fs.unlinkSync(thisPath)
            await redisService.delKey(`imageId${imageId}`);
            ctx.body = "Photo does not exist"
        }
    }
}

module.exports = ImageController