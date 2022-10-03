'use strict';

const moment = require('moment');

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
    await queryInterface.bulkInsert('Pokemons', [
      {
        id: 1,
        name: "Bulbizarre",
        description: "Il y a une graine sur son dos depuis sa naissance. Elle grossit un peu chaque jour.",
        height: 0.7,
        weight: 6.9,
        category: 'Graine',
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      }, {
        id: 2,
        name: "Herbizarre",
        description: "Son bulbe dorsal est devenu si gros qu’il ne peut plus se tenir sur ses pattes postérieures.",
        height: 1,
        weight: 13,
        category: 'Graine',
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      }, {
        id: 3,
        name: "Florizarre",
        description: "Sa plante donne une grosse fleur quand elle absorbe les rayons du soleil. Il est toujours à la recherche des endroits les plus ensoleillés.",
        height: 2,
        weight: 100,
        category: 'Graine',
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
    ]);
  },
        // type: ['plante', 'poison']

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
