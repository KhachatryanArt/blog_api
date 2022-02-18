'use strict';
const sequelize = require('../connection');
const Post = require("./Post")
const {DataTypes, Sequelize} = require("sequelize")
const {Model} = require('sequelize');

class Comment extends Model {


}

Comment.init({
    commentText: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}, {
    sequelize,
    modelName: 'Comment',
});

module.exports = Comment
