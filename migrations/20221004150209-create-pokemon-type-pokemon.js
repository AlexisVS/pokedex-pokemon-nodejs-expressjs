'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('pokemon-type_pokemons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pokemon_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'pokemons',
                    key: 'id'
                }
            },
            pokemon_type_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'pokemon-types',
                    key: 'id'
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('pokemon-type_pokemons');
    }
};
