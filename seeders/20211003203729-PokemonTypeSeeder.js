'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('pokemon-types', [
            {
                name: "Plante",
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Poison",
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Feu",
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Vol",
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Eau",
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }
        ]);
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
