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
        this.ask('Hello World! What\'s your name?', 'Please tell me your name.');
    },

    'MyNameIsIntent': function(name) {
        if (!name.value === undefined) {
            this.tell('Excuse me, I couldn\'t quite understand that.');
        } else {
            this.tell('Hey ' + name.value + ', nice to meet you!');
        }
    },

    'PokemonInfo': function(pokemon) {
        (async() {
            let response = await pokedex.getPokemonByName(pokemon);
            console.log(response);
            this.tell('Okay.');
        })();
    },
});

module.exports.app = app;
