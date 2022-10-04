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
      // define association here
    }
  }
  PokemonType_Pokemon.init({
    pokemon_id: DataTypes.INTEGER,
    pokemon_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PokemonType_Pokemon',
    freezeTableName: true,
    underscored: true,
    tableName: 'pokemon-type_pokemons'
  });
  return PokemonType_Pokemon;
};
