'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.createTable('PokemontypePokemons'
            ,
            {
                pokemonId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'Pokemons',
                        key: 'id'
                    }
                },
                pokemontypeId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'PokemonTypes',
                        key: 'id'
                    }
                }
            }
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('PokemontypePokemons');
    }
};
