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
            this.belongsToMany(models.Pokemon, {as: 'pokemons', through: models.PokemonType_Pokemon})
        }
    }

    PokemonType.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'PokemonType',
        underscored: true,
        tableName: 'pokemon-types',
        freezeTableName: true
    });
    return PokemonType;
};
