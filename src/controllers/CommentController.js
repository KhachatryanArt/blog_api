const CommentService = require("../services/CommentService")

class CommentController {
    static async createComment(ctx) {
        const userId = ctx.state.user.id;
        const {commentText, postId} = ctx.request.body;

        ctx.body = await CommentService.createComment(commentText, postId, userId)

    }

    static async updateComment(ctx) {
        const userId = ctx.state.user.id
        const commentId = ctx.request.params.id;
        const {commentText} = ctx.request.body;

        ctx.body = await CommentService.updateComment(commentText, commentId, userId)
    }

    static async deleteComment(ctx) {
        const userId = ctx.state.user.id;
        const commentId = ctx.request.params.id;

        ctx.body = await CommentService.deleteComment(commentId, userId)
    }
}

module.exports = CommentController