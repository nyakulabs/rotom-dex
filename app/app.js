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
        this.tell('I\'m Rotom Dex. Ask me about Pokémon.');
    },

    'PokemonInfo': function(pokemon) {
        pokedex.getPokemonSpeciesByName(pokemon.value.toLowerCase())
        .then(response => {
            try {
                let pkmnName = response.names.filter(o => o.language.name === 'en')[0].name;
                console.log('name worked');
                let pkmnSpecies = response.genera.filter(o => o.language.name === 'en')[0].genus;
                console.log('species worked');
                let pkmnDesc = response.flavor_text_entries.filter(o => o.language.name === 'en')[0].flavor_text;
                console.log('desc worked');
                let fullResponse = `${pkmnName}, the ${pkmnSpecies}. ${pkmnDesc}`;
                console.log(fullResponse);
                this.tell(fullResponse);
                console.log('wtf');
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
