const mongoose = require('mongoose');

//Schema
const UserSchema = new mongoose.Schema ({
    firstname: {
        type: String,
        required: true,
        max: 255
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: false,
        default: 'user'
    },

    age: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    //timestamps: quando utente salva i dati immessi si aggiorna le date di creazione ed aggiornamento e strict: accetta solo i dati che abbiamo richiesto
    timestamps: true,
    strict: true
})

//Esporto con 3 parametri: Nome modello, costante schema e in che tabella è salvato//
module.exports = mongoose.model( 'usersModel', UserSchema, 'users')