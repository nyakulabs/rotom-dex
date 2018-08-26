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
        this.ask('I\'m Rotom Dex. Ask me about Pokemon.');
    },

    /*'MyNameIsIntent': function(name) {
        if (!name.value === undefined) {
            this.tell('Excuse me, I couldn\'t quite understand that.');
        } else {
            this.tell('Hey ' + name.value + ', nice to meet you!');
        }
    },*/

    'PokemonInfo': function(pokemon) {
        pokedex.getPokemonSpeciesByName(pokemon.value.toLowercase())
        .then(response => {
            if (!response) {
              this.tell("Sorry, I don't know about that Pokémon.")
            } else {
              this.tell(response.flavor_text_entries.filter(o => (o.language.name === 'en'))[0].flavor_text);
            }
        })
    },
});

module.exports.app = app;
