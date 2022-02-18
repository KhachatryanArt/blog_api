'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            commentText: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            postId: {
                type: DataTypes.INTEGER
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
        await queryInterface.addConstraint('Comments', {
            fields: ['postId'],
            type: 'foreign key',
            name: 'postId_fkey', // optional
            references: {
                table: 'Posts',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Comments');
    }
};