'use strict';

// //

// import this dumb veekun sht
const json = [
    'abilities': require('../json/abilities.json'),
    'pokemon_species': require('../json/pokemon_species.json'),
    'pokemon_species_flavor_summaries': require('../json/pokemon_species_flavor_text.json'),
    'pokemon_species_flavor_text': require('../json/pokemon_species_flavor_text.json'),
    'pokemon_species_prose': require('../json/pokemon_species_prose.json'),
    'pokemon_types': require('../json/pokemon_types.json')
];

const {App} = require('jovo-framework');
/*
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
*/

const config = {
    logging: false,
};

const app = new App(config);

// //

app.setHandler({
    'LAUNCH': function() {
        this.toIntent('HelloWorldIntent');
    },

    'HelloWorldIntent': function() {
        this.ask('I\'m Rotom Dex. Ask me about Pokémon.');
        console.log('New client.');
    },

    'PokemonInfo': function(pokemon) {
        pokedex.getPokemonSpeciesByName(pokemon.value.toLowerCase())
        .then(response => {
            /*
            try {
                let pkmnName = response.names.filter(o => o.language.name === 'en')[0].name;
                let pkmnSpecies = response.genera.filter(o => o.language.name === 'en')[0].genus;
                let pkmnDesc = response.flavor_text_entries.filter(o => o.language.name === 'en')[0].flavor_text;
                let fullResponse = `${pkmnName}, the ${pkmnSpecies}. ${pkmnDesc}`;
                this.tell(fullResponse);
                console.log(`Request for ${pkmnName} fulfilled. [${Date.now()}]`);
            } catch(err) {
                this.tell('An error has occurred.');
                console.log(err);
            }
            */

            try {
                let pkmnObj = json.pokemon_species.filter(o => {
                    o.identifier === pokemon.toLowerCase()
                });
                let pkmnID = species.id;

                let pkmnSpNameObj = json.pokmeon_species_names.filter(o => {
                    o.pokemon_species_id === pkmnID && o.local_language_id === 9
                });
                let pkmnName = pkmnSpNameObj.name;
                let pkmnGenus = pkmnSpNameObj.genus;

                let pkmnFlavorObj = json.pokemon_species_flavor_text.filter(o => {
                    o.version_id === 29 && o.language_id === 9
                });
                let pkmnFlavor = pkmnFlavorObj.flavor_text;
                let fullResponse = `${pkmnName}, the ${pkmnGenus}. ${pkmnDesc}`;
                this.tell(fullResponse);
                console.log(`Request for ${pkmnName} fulfilled. [${Date.now()}]`);

            } catch(err) {
                this.tell('An error has occurred.');
                console.log(err);
            }
        })
        .catch(err => {
            console.log(err);
            this.tell("Sorry, I don't know about that Pokémon.")
        });
    },
});

module.exports.app = app;
