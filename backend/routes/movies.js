const express = require('express');
const router = express.Router();

const { Movie } = require('../models/movie');
const { Genre } = require('../models/genre');
const admin = require('../middleware/admin');
const authorization = require('../middleware/login');

router.get('/', admin, async (req, res) => {
    const movies = await Movie.find().populate('genre', 'name').sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('No such genre with the given ID');
    try {
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            director: req.body.director,
            releaseDate: req.body.releaseDate,
            language: req.body.language
        });
        movie = await movie.save();
        res.send(movie);
    }
    catch (err) {
        res.send(err.message)
    }
});

router.put('/:id', async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('No such genre with the given ID');
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                director: req.body.director,
                releaseDate: req.body.releaseDate,
                language: req.body.language
            },
            { new: true });

        if (!movie) return res.status(404).send('No such movie with the given ID');

        res.send(movie);
    }
    catch (err) {
        res.send(err.message)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);

        if (!movie) return res.status(404).send('No such movie with the given ID.');

        res.send(movie);
    }
    catch (err) {
        res.send('No such movie with the given ID')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) return res.status(404).send('No such movie with the given ID.');

        res.send(movie);
    }
    catch (err) {
        res.send('No such movie with the given ID')
    }
});

module.exports = router; 