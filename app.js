const EXPRESS = require('express');
const {success} = require('./helper');
const MORGAN = require('morgan');
const FAVICON = require('serve-favicon');
const BODY_PARSER = require('body-parser');
const {Pokemon, PokemonType} = require('./src/database/models');

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
APP.get('/api/v1/pokemons', async (req, res) => {
    let message;
    let response = await Pokemon.findAll({
        include: [PokemonType]
    })
        .then(async (data) => {
        message = 'Tous les pokemons ont été trouvés';
        return data;
    })
        .catch(async (error) => {
        message = "Aucun pokemon n'a été trouvé";
        return {
            error: {
                status: error.status,
            }
        };
    });

    return res.json(success(message, response))
});

// SHOW
APP.get('/api/v1/pokemon/:id', async (req, res) => {
    const POKEMON_ID = parseInt(req.params.id);
    let message
    let response = Pokemon.findAll({
        where: {id: POKEMON_ID},
        include: [{
            model: PokemonType
        }]
    }).then((data) => {
        message = "Votre pokémon à bien été trouvé.";
        return data;
    }).catch((error) => {
        message = "Votre pokémon n'a pas été trouvé";
        return {
            error: {
                status: error.status
            }
        }
    });

    return res.json(success(message, await response));
});

// POST
APP.post('/api/v1/pokemons', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    let message;
    let response = await Pokemon.create(POKEMON_DATA)
        .then(async (pokemon) => {
            await pokemon.addPokemonTypes(POKEMON_DATA.PokemonTypePokemon);
            return pokemon;
        })
        .then(async (pokemon) => {
            message = "Pokemon ajouté";
            return await Pokemon.findAll({
                where: {id: pokemon.id},
                include: [PokemonType],
            });
        }).catch(error => {
            message = "Problème avec le corp de la requète"
            return {
                error: {
                    status: error.status
                }
            }
        });

    return res.json(success(message, response));
});

// UPDATE
APP.put('/api/v1/pokemon', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    let message;
    let pokemon = await Pokemon.findAll({
        where: {id: POKEMON_DATA.id},
        include: [PokemonType]
    }).then(async (pokemon) => {
        let pokemonModel = pokemon.at(0);
        await pokemonModel.update(POKEMON_DATA);
        await pokemonModel.removePokemonTypes(await pokemonModel.getPokemonTypes());
        await pokemonModel.addPokemonTypes(POKEMON_DATA.PokemonTypePokemon);
        message = "Pokemon mis a jour";
        return Pokemon.findAll({
            where: {id: pokemonModel.id}, include: [PokemonType]
        });
    }).catch(error => {
        message = "Pokemon non mis à jour"
        return {
            error: {
                status: error.status,
                message: "Vérifier le corps de votre requête"
            }
        }
    });

    return res.json(success(message, pokemon));
});


// DESTROY
APP.delete("/api/v1/pokemons/:id", async (req, res) => {
    const POKEMON_ID = parseInt(req.params.id);
    let message;
    let pokemon = await Pokemon.findAll({
        where: {id: POKEMON_ID},
        include: [PokemonType]
    }).then(async (pokemon) => {
        return [pokemon.at(0), await pokemon.at(0).getPokemonTypes()]
    }).then(async (data) => {
        let [pokemon, pokemonTypes] = data;
        pokemon.removePokemonTypes(pokemonTypes);
        return pokemon;
    }).then((pokemon) => {
        Pokemon.destroy({
            where: {id: POKEMON_ID}
        });
        message = "Pokemon supprimé"
        return pokemon;
    }).catch(error => {
        message = "Votre pokemon n'a pas été supprimé"
        return {
            error: {
                status: error.status,
                message: "Votre pokémon a probablement déja été supprimé"
            }
        }
    });

    return res.json(success(message, pokemon));
});

APP.listen(APP_PORT, () => console.log(`APP turning on :  http://localhost:${APP_PORT}`));
