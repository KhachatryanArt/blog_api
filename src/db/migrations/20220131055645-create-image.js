'use strict';
const {DataTypes} = require("sequelize")
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            Name: {
                type: DataTypes.STRING
            },
            imageText: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Images');
    }
};