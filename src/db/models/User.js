'use strict';
const Post = require("./Post")
const sequelize = require('../connection');

const {DataTypes, Sequelize} = require("sequelize")

const {Model} = require('sequelize');


class User extends Model {

    static associate(models) {
        // define association here

    }
}

User.init({

    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.CHAR,

}, {
    sequelize,
    modelName: 'Users',
});

module.exports = User;