const Image = require("../db/models/Image");
const fs = require("fs");
const redisService = require("../db/redis-connetion");

class ImageService {
    static async createImage(name, imagePath, id) {
        try {
            const image = await Image.create({
                Name: name,
                imageText: imagePath,
                userId: id
            })
            await image.save();
            return ("Image saved!");
        } catch (err) {
            console.log(err)
        }
    }

    static async getOneImage(imageId) {
        const getImage = await redisService.getCache(`imageId${imageId}`);
        if (getImage) {
            return getImage;
        } else {
            const image = await Image.findOne({where: {id: imageId}});
            if (image) {
                await redisService.setCache(`imageId${imageId}`, image);
                return image
            } else {
                return "Image not found"
            }
        }
    }

    static async deleteImage(imageId, path, userId) {
        await fs.unlinkSync(path);
        const image = await Image.findOne({where: {id: imageId}});
        if (image.userId === userId) {
            await redisService.delKey(`imageId${imageId}`);
            await Image.destroy({where: {id: imageId}});
            return ("Image deleted!");
        } else {
            return ("Not Done!Permission denied")
        }
    }

    static async updateImage(imageId, name, path, userId, oldPath) {
        const image = await Image.findOne({where: {id: imageId}});
        console.log(image)
        if (image.userId === userId) {
            fs.unlinkSync(oldPath);
            await redisService.delKey(`imageId${imageId}`);
            await Image.update({Name: name, imageText: path}, {where: {id: imageId}});
            await redisService.setCache(`imageId${imageId}`, {imageText: path, Name: name});
            return ("Image updated!");
        } else {
            return ("Not Done!Permission denied")
        }
    }
}

module.exports = ImageService