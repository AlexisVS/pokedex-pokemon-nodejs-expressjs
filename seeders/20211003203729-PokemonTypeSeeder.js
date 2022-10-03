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
        await queryInterface.bulkInsert('PokemonTypes', [
            {
                name: "Plante",
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Poison",
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Feu",
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Vol",
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                name: "Eau",
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
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
