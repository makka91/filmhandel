const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    director: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    releaseDate: {
        type: String,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    language: {
        type: String,
        minlength: 1,
        maxlength: 25
    },

});

const Movie = mongoose.model('Movie', movieSchema)

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;