const EXPRESS = require('express');
const POKEMONS = require('./mock-pokemon.js');
const {success, getUniqueId} = require('./helper');
const MORGAN = require('morgan');
const FAVICON = require('serve-favicon');
const BODY_PARSER = require('body-parser');

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
    .use(BODY_PARSER.json())

// --- ROUTES ---
APP.get('/', (req, res) => res.send('sdf'))

//INDEX
APP.get('/api/v1/pokemons', (req, res) => res.json(success('Tous les pokemons ont été trouvés', POKEMONS)))

//SHOW
APP.get('/api/v1/pokemon/:id', (req, res) => {
    const POKEMON_ID = parseInt(req.params.id);
    const POKEMON = POKEMONS.filter(pokemon => pokemon.id === POKEMON_ID);
    const MESSAGE = "Votre pokémon à bien été trouvé.";
    return res.json(success(MESSAGE, POKEMON));
});

//POST
APP.post('/api/v1/pokemons', (req, res) => {
    const POKEMON_ID = getUniqueId(POKEMONS);
    const POKEMON = {...req.body, id: POKEMON_ID};
    POKEMONS.push(POKEMON)
    return res.json(success("Pokemon ajouté", POKEMON))
});


APP.listen(APP_PORT, () => console.log(`APP turning on :  http://localhost:${APP_PORT}`));
