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
                type: DataTypes.INTEGER
            },
            pokemonId: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'pokemons'
                    },
                    key: 'id',
                },
                allowNull: false
            },
            pokemonTypeId: {
                type: DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'pokemon-types',
                    },
                    key: 'id'
                },
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('pokemon-type_pokemons');
    }
};
