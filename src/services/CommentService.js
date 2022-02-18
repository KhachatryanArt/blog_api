const Comment = require("../db/models/Comment");
const redisService = require("../db/redis-connetion");

class CommentService {
    static async createComment(commentText, postId, userId) {
        try {
            const comment = await Comment.create({
                commentText: commentText,
                postId: postId,
                userId: userId
            })
            const getPost = await redisService.getCache(`userId${userId}`)
            if (getPost) {
                await redisService.delKey(`userId${userId}`)
            }
            await comment.save()
            return ("Comment saved!")
        } catch (err) {
            console.log(err)
        }
    }

    static async updateComment(commentText, commentId, userId) {
        const comment = await Comment.findOne({where: {id: commentId}});
        if (comment.userId === userId) {
            await redisService.delKey(`userId${userId}`)
            const updateComment = await Comment.update({commentText: commentText}, {where: {id: commentId}});
            return (updateComment, "Done")
        } else {
            return ("Not Done!Permission denied")
        }
    }

    static async deleteComment(commentId, userId) {
        const comment = await Comment.findOne({where: {id: commentId}});
        if (comment.userId === userId) {
            await Comment.destroy({where: {id: commentId}});
            await redisService.delKey(`userId${userId}`);
            return ("Done")
        } else {
            return ("Not Done!Permission denied")
        }
    }
}

module.exports = CommentService