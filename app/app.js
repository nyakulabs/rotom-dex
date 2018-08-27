'use strict';

// //

// import this dumb veekun sht

const abilities = require('../json/abilities.json');
const pokemon_species = require('../json/pokemon_species.json');
const pokemon_species_flavor_summaries = require('../json/pokemon_species_flavor_text.json');
const pokemon_species_flavor_text = require('../json/pokemon_species_flavor_text.json');
const pokemon_species_names = require('../json/pokemon_species_names.json');
const pokemon_species_prose = require('../json/pokemon_species_prose.json');
const pokemon_types = require('../json/pokemon_types.json');

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
                let pkmnObj = pokemon_species.filter(o => (
                    o.identifier === pokemon.value.toLowerCase()
                ));
                console.log(pkmnObj)[0];
                let pkmnID = pkmnObj[0].id;
                console.log(pkmnID[0]);
                let pkmnSpNameObj = pokemon_species_names.filter(o => (
                   o.pokemon_species_id === pkmnID && o.local_language_id === 9
                ));
                console.log(pkmnSpNameObj)[0];
                let pkmnName = pkmnSpNameObj[0].name;
                let pkmnGenus = pkmnSpNameObj[0].genus;
                console.log(pkmnName);
                console.log(pkmnGenus);
                let pkmnFlavorObj = pokemon_species_flavor_text.filter(o => (
                    o.version_id === 29 && o.language_id === 9
                ));
                console.log(pkmnFlavorObj[0]);
                let pkmnFlavor = pkmnFlavorObj[0].flavor_text;
                console.log(pkmnFlavor[0]);
                let fullResponse = `${pkmnName}, the ${pkmnGenus}. ${pkmnFlavor}`;
                this.tell(fullResponse);
                console.log(`Request for ${pkmnName} fulfilled. [${Date.now()}]`);

            } catch(err) {
                this.tell('An error has occurred.');
                console.log(err);
            }
    },
});

module.exports.app = app;
