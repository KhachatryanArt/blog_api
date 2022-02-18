'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        module.exports = {
            up: (queryInterface, Sequelize) => {
                return queryInterface.bulkInsert('Posts', [{
                    postName: 'John',
                    postText: 'Doe',
                    userId: '2',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }]);
            },
            down: (queryInterface, Sequelize) => {
                return queryInterface.bulkDelete('Posts', null, {});
            }
        };
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
