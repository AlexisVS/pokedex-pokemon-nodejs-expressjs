'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pokemon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.PokemonType, {through: 'PokemontypePokemon'});
        }
    }

    Pokemon.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        height: DataTypes.NUMBER,
        weight: DataTypes.NUMBER,
        category: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Pokemon',
        underscored: true
    });
    return Pokemon;
};
