'use strict';
const sequelize = require('../connection');
const Comments = require("./Comment")

const {DataTypes, Sequelize} = require("sequelize")
const {Model} = require('sequelize');

class Post extends Model {

    static associate(Comments) {
        Post.hasMany(Comments, {foreignKey: 'postId'});

    }
}

Post.init({
    postName: DataTypes.STRING,
    postText: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}, {
    sequelize,
    modelName: 'Post',
});
Post.associate(Comments);


module.exports = Post;