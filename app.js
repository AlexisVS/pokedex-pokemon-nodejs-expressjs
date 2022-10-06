const EXPRESS = require('express');
const {success, getUniqueId} = require('./helper');
const MORGAN = require('morgan');
const FAVICON = require('serve-favicon');
const BODY_PARSER = require('body-parser');
const {Sequelize, DataTypes} = require('sequelize');
const POKEMON_MODEL = require('./models/pokemon');
const {sequelize, Pokemon, PokemonType, PokemonTypePokemon} = require('./models');
const {db} = sequelize;

const APP = EXPRESS();
const APP_PORT = 3000;


// MIDDLEWARE
const LOGGER = (req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
}
APP
    .use(FAVICON(__dirname + '/favicon.ico'))
    .use(MORGAN('dev'))
    .use(LOGGER)
    .use(BODY_PARSER.json());

// --- ROUTES ---
APP.get('/', (req, res) => res.send('sdf'))

// INDEX
APP.get('/api/v1/pokemons', async (req, res) => res.json(success('Tous les pokemons ont été trouvés', await Pokemon.findAll({
    include: [PokemonType]
}))));

// SHOW
APP.get('/api/v1/pokemon/:id', async (req, res) => {
    const POKEMON_ID = parseInt(req.params.id);
    const POKEMON = Pokemon.findAll({
        where: {id: POKEMON_ID},
        include: [{
            model: PokemonType
        }]
    });
    const MESSAGE = "Votre pokémon à bien été trouvé.";

    return res.json(success(MESSAGE, await POKEMON));
});

// POST
APP.post('/api/v1/pokemons', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    let pokemon = await Pokemon.create(POKEMON_DATA)
        .then(async (pokemon) => {
            await pokemon.addPokemonTypes(POKEMON_DATA.PokemonTypePokemon);
            return pokemon;
        })
        .then(async (pokemon) => {
            return await Pokemon.findAll({
                where: {id: pokemon.id},
                include: [PokemonType],
            });
        });

    return res.json(success("Pokemon ajouté", pokemon));
});

// UPDATE
APP.put('/api/v1/pokemon', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    const POKEMON = await Pokemon.findAll({
        where: {id: POKEMON_DATA.id},
        include: [PokemonType]
    }).then(async (pokemon) => {
        let pokemonModel = pokemon.at(0);
        await pokemonModel.update(POKEMON_DATA);
        await pokemonModel.removePokemonTypes(await pokemonModel.getPokemonTypes());
        await pokemonModel.addPokemonTypes(POKEMON_DATA.PokemonTypePokemon);
        return Pokemon.findAll({
            where: {id: pokemonModel.id}, include: [PokemonType]
        });
    });

    return res.json(success("Pokemon ajouté", POKEMON));
});


// DESTROY
APP.delete("/api/v1/pokemons/:id", async (req, res) => {
    const POKEMON_ID = parseInt(req.params.id);
    const POKEMON = await Pokemon.findAll({
        where: {id: POKEMON_ID},
        include: [PokemonType]
    }).then(async (pokemon) => {
        return [pokemon.at(0), await pokemon.at(0).getPokemonTypes()]
    }).then(async (data) => {
        let [pokemon, pokemonTypes] = data;
        pokemon.removePokemonTypes(pokemonTypes);
        return pokemon;
    }).then( (pokemon) => {
        Pokemon.destroy({
            where: {id: POKEMON_ID}
        });
        return pokemon;
    });

    return res.json(success("Pokemon supprimé", POKEMON));
});

APP.listen(APP_PORT, () => console.log(`APP turning on :  http://localhost:${APP_PORT}`));
