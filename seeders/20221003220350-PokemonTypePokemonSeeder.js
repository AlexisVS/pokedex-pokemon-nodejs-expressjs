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
        await queryInterface.bulkInsert('pokemon-type_pokemons', [
            {
                pokemonId: 1,
                pokemonTypeId: 1,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                pokemonId: 1,
                pokemonTypeId: 2,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                pokemonId: 2,
                pokemonTypeId: 1,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                pokemonId: 3,
                pokemonTypeId: 1,
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
