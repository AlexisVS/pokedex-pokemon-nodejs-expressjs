const EXPRESS = require('express');
const {success, getUniqueId} = require('./helper');
const MORGAN = require('morgan');
const FAVICON = require('serve-favicon');
const BODY_PARSER = require('body-parser');
const {Sequelize, DataTypes} = require('sequelize');
const POKEMON_MODEL = require('./models/pokemon');
const {sequelize, Pokemon, PokemonType, PokemonType_Pokemon} = require('./models');

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

// INDEX
APP.get('/api/v1/pokemons', async (req, res) => res.json(success('Tous les pokemons ont été trouvés',
    await Pokemon.findAll(
        {
            include: [
                {
                    association: 'types',
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        }
    )
)));

// SHOW
APP.get('/api/v1/pokemon/:id', async (req, res) => {
    const POKEMON_ID = parseInt(req.params.id);
    const POKEMON = await Pokemon.findByPk(POKEMON_ID, {
        include: [
            {

                association: 'types',
            }
        ]
    });
    const MESSAGE = "Votre pokémon à bien été trouvé.";
    return res.json(success(MESSAGE, POKEMON));
});

// POST
APP.post('/api/v1/pokemons', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    const POKEMON = await Pokemon.create(POKEMON_DATA, {
        include: [{association: 'PokemonType_Pokemon',as: 'types'}]
    });
    return res.json(success("Pokemon ajouté", POKEMON));
});

// UPDATE
APP.put('/api/v1/pokemon', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    const POKEMON = await Pokemon.upsert(POKEMON_DATA);
    return res.json(success("Pokemon ajouté", POKEMON));
});


// DESTROY
APP.delete("/api/v1/pokemons/:id", async (req, res) => {
    const POKEMON_ID = req.params.id;
    const POKEMON = await Pokemon.findByPk(POKEMON_ID);
    await Pokemon.destroy({where: {id: POKEMON_ID}});

    return res.json(success("Pokemon supprimé", POKEMON));
});

APP.listen(APP_PORT, () => console.log(`APP turning on :  http://localhost:${APP_PORT}`));
