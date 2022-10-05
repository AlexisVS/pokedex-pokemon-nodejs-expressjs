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
                }
            ]
        }
    )
)));

// // SHOW
// APP.get('/api/v1/pokemon/:id', async (req, res) => {
//     const POKEMON_ID = parseInt(req.params.id);
//     const POKEMON = Pokemon.findAll(
//         {
//             where: {id: POKEMON_ID},
//             include: [
//                 {
//                     association: 'types',
//                     attributes: ['id', 'name'],
//                     where: {pokemonId: POKEMON_ID},
//                     through: {
//                         attributes: []
//                     }
//                 }
//             ]
//         }
//     );
//     const MESSAGE = "Votre pokémon à bien été trouvé.";
//     return res.json(success(MESSAGE, await POKEMON));
// });

// POST
APP.post('/api/v1/pokemons', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    let pokemon = await Pokemon.create(POKEMON_DATA, {
        include: [
            {
                association: 'types',
                attributes: [['id', 'pokemonTypeId']]
            }
        ]
    })


    return res.json(success("Pokemon ajouté", pokemon));
});

// UPDATE
APP.put('/api/v1/pokemon', async (req, res) => {
    const POKEMON_DATA = {...req.body};
    const POKEMON = await pokemon.upsert(POKEMON_DATA);
    return res.json(success("Pokemon ajouté", POKEMON));
});


// DESTROY
APP.delete("/api/v1/pokemons/:id", async (req, res) => {
    const POKEMON_ID = req.params.id;
    const POKEMON = await pokemon.findByPk(POKEMON_ID);
    await pokemon.destroy({where: {id: POKEMON_ID}});

    return res.json(success("Pokemon supprimé", POKEMON));
});

APP.listen(APP_PORT, () => console.log(`APP turning on :  http://localhost:${APP_PORT}`));
