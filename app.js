const EXPRESS = require('express');
const POKEMONS = require('./mock-pokemon.js');
const {success} = require('./helper');
const MORGAN = require('morgan');
const FAVICON = require('serve-favicon');

const APP = EXPRESS();
const APP_PORT = 3000;

// MIDDLEWARE
const LOGGER = (req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
}
APP
    .use(FAVICON(__dirname + '/favicon.ico'))
    .use(MORGAN('dev'), LOGGER);

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
APP.get('/api/v1/pokemonss', (req, res) => {
   let pokemonId = POKEMONS.sort((a,b) => b.id - a.id).at(0).id
    console.log(typeof pokemonId)
    return res.send(toString( pokemonId))
});


APP.listen(APP_PORT, () => console.log(`APP turning on :  http://localhost:${APP_PORT}`));
