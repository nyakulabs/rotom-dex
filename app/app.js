'use strict';

// //

// import this dumb veekun sht

const json = [];

json.abilities = require('../json/abilities.json');
json.pokemon_species = require('../json/pokemon_species.json');
json.pokemon_species_flavor_summaries = require('../json/pokemon_species_flavor_text.json');
json.pokemon_species_flavor_text = require('../json/pokemon_species_flavor_text.json');
json.pokemon_species_prose = require('../json/pokemon_species_prose.json');
json.pokemon_types = require('../json/pokemon_types.json');

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

            try {
                let pkmnObj = json.pokemon_species.filter(o => {
                    o.identifier === pokemon.value.toLowerCase()
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
    },
});

module.exports.app = app;
