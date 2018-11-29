const express = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');
const authorization = require('../middleware/login');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', [authorization, admin], async (req, res) => {

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);

        if (!genre) return res.status(404).send('No such genre with the given ID');

        res.send(genre);
    }
    catch (err) {
        res.send('No such genre with the given ID')
    }
});

router.delete('/:id', [authorization, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);

        if (!genre) return res.status(404).send('No such genre with the given ID');

        res.send(genre);
    }
    catch (err) {
        res.send('No such genre with the given ID')
    }
});

router.put('/:id', [authorization, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
        });

        if (!genre) return res.status(404).send('No such genre with the given ID');

        res.send(genre);
    }
    catch (err) {
        res.send('No such genre with the given ID')
    }
});

module.exports = router;