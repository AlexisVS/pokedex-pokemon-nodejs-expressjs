'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PokemonType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.pokemon, {
                as: 'pokemons',
                through: 'pokemon-type_pokemons',
            })
            this.hasMany(models.pokemon);
        }
    }

    PokemonType.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'pokemonType',
        tableName: 'pokemon-types',
        freezeTableName: true
    });
    return PokemonType;
};
