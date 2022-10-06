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
            this.belongsTo(models.Pokemon);
            this.belongsTo(models.PokemonType);
            models.Pokemon.belongsToMany(models.PokemonType, {
                through: this,
            });

            models.PokemonType.belongsToMany(models.Pokemon, {
                through: this,
            })
        }
    }

    PokemonType_Pokemon.init({
        PokemonId: DataTypes.INTEGER,
        PokemonTypeId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'PokemonTypePokemon',
        tableName: 'pokemon-type_pokemons',
        freezeTableName: true
    });
    return PokemonType_Pokemon;
};
