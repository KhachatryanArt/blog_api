const Post = require("../db/models/Post");
const Comment = require("../db/models/Comment")
const redisService = require("../db/redis-connetion");


class PostService {
    static async createPost(postName, postText, userId) {

        try {
            const post = await Post.create({
                postName: postName,
                postText: postText,
                userId: userId
            })
            await post.save()
            return ("Post saved!")
        } catch (err) {
            console.log(err)
        }
    }

    static async getPost(userId) {
        const getPost = await redisService.getCache(`userId${userId}`)
        if (getPost) {
            return getPost;
        } else {
            const post = await Post.findAll({where: {userId: userId}, include: Comment})
            // const post =await Post.sequelize.query('SELECT "Posts"."postName" , "Posts"."postText", "Comments"."commentText"   FROM "Posts" LEFT JOIN "Comments" ON "Posts"."id" = "Comments"."postId" ; ',{ type: QueryTypes.SELECT })
            await redisService.setCache(`userId${userId}`, post)
            return post;
        }
    }

    static async getOnePost(postId) {
        const getPost = await redisService.getCache(`postId-${postId}`)
        if (getPost) {
            return getPost;
        } else {
            const post = await Post.findOne({where: {id: postId}})
            const comment = await Comment.findAll({where: {postId: postId}})
            await redisService.setCache(`postId-${postId}`, {post, comment})
            return {
                post: post,
                comments: comment
            }
        }
    }

    static async updatePost(postId, text, postName, userId) {
        const post = await Post.findOne({where: {id: postId}})
        if (post.userId === userId) {
            await redisService.delKey(`userId${userId}`)
            const updatePost = await Post.update({postName: postName, postText: text}, {where: {id: postId}})
            return (updatePost , "Done")
        } else {
            return ("Not Done!Permission denied")
        }
    }

    static async deletePost(postId, userId) {
        const post = await Post.findOne({where: {id: postId}})
        if (post.userId === userId) {
            await Post.destroy({where: {id: postId}})
            await redisService.delKey(`userId${userId}`)
            return ("Done")
        } else {
            return ("Not Done!Permission denied")
        }
    }
}

module.exports = PostService;