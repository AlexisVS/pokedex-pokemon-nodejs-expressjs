'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PokemonType_Pokemon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.pokemon);
            this.belongsTo(models.pokemonType);
        }
    }

    PokemonType_Pokemon.init({
        pokemonId: DataTypes.INTEGER,
        pokemonTypeId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'pokemonTypePokemon',
        tableName: 'pokemon-type_pokemons',
        freezeTableName: true
    });
    return PokemonType_Pokemon;
};
