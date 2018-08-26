'use strict';

// //

const {App} = require('jovo-framework');
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();

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
        })
        .catch(err => {
            console.log(err);
            this.tell("Sorry, I don't know about that Pokémon.")
        });
    },
});

module.exports.app = app;
