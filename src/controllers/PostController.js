const PostService = require("../services/PostService");

class PostController {

    static async createPost(ctx) {
        const {id} = ctx.state.user;
        const {postName, postText} = ctx.request.body;

        ctx.body = await PostService.createPost(postName, postText, id)
    }

    static async getPost(ctx) {
        const {id} = ctx.state.user;

        ctx.body = await PostService.getPost(id)
    }

    static async getOnePost(ctx) {
        const id = ctx.request.params.id;

        ctx.body = await PostService.getOnePost(id)
    }

    static async updatePost(ctx) {
        const {updateName, updateText} = ctx.request.body
        const userId = ctx.state.user.id;
        const id = ctx.request.params.id;

        ctx.body = await PostService.updatePost(id, updateText, updateName, userId)
    }

    static async deletePost(ctx) {
        const id = ctx.request.params.id;
        const userId = ctx.state.user.id;

        ctx.body = await PostService.deletePost(id, userId)
    }
}

module.exports = PostController;