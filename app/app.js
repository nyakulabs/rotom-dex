'use strict';

// //

const {App} = require('jovo-framework');
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();

const config = {
    logging: true,
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
            let pokemonName = response.names.filter(o => (o.language.name === 'en'))[0].name;
            let pokemonIntro = response.genera.filter(o => (o.language.name === 'en'))[0].genus;
            let pokemonDesc = response.flavor_text_entries.filter(o => (o.language.name === 'en'))[0].flavor_text;
            this.tell(`${pokemonName}, the ${pokemonIntro}.\n${pokemonDesc}`);
        })
        .catch(err => {
            console.log(err);
            this.tell("Sorry, I don't know about that Pokémon.")
        })
    },
});

module.exports.app = app;
