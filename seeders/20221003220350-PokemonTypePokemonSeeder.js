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
                pokemon_id: 1,
                pokemon_type_id: 1,
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                pokemon_id: 1,
                pokemon_type_id: 2,
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                pokemon_id: 2,
                pokemon_type_id: 1,
                created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            }, {
                pokemon_id: 3,
                pokemon_type_id: 1,
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
