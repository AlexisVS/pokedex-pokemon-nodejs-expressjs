'use strict';

const moment = require("moment/moment");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('PokemontypePokemons', [
      {
        pokemonId: 1,
        pokemontypeId: 1,
      }, {
        pokemonId: 1,
        pokemontypeId: 2,
      }, {
        pokemonId: 2,
        pokemontypeId: 1,
      }, {
        pokemonId: 3,
        pokemontypeId: 1,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
