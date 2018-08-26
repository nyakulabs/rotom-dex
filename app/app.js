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
        pokedex.getPokemonSpeciesByName(pokemon.value).then(response => {
            this.tell(response.flavor_text_entries.filter(o => (o.language.name === 'en') && (o.version.name === 'moon')).flavor_text);
        });
    },
});

module.exports.app = app;
