'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Users', {
            fields: ['email'],
            type: 'unique'
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Users", "email")
    }
};
