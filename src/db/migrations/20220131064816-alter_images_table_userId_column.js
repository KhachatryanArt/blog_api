'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Images', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'userId_key', // optional
            references: {
                table: 'Users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Images", "userId")
    }
};
