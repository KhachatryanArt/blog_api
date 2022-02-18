'use strict';
const {DataTypes} = require("sequelize")
const {Model} = require('sequelize');
const sequelize = require('../connection');

class Image extends Model {

    static associate(models) {
        // define association here
    }
}

Image.init({
    Name: DataTypes.STRING,
    imageText: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}, {
    sequelize,
    modelName: 'Image',
});

module.exports = Image