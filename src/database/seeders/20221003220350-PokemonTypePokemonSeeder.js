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
                PokemonId: 1,
                PokemonTypeId: 1,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                PokemonId: 1,
                PokemonTypeId: 2,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                PokemonId: 2,
                PokemonTypeId: 1,
                createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                PokemonId: 3,
                PokemonTypeId: 1,
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
