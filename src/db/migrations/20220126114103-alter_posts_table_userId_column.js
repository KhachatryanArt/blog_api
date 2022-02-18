'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Posts', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'userId_fkey', // optional
            references: {
                table: 'Users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Posts", "userId")
    }
};
