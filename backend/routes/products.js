const express = require('express');
const router = express.Router();

const { Movie } = require('../models/movie');
const admin = require('../middleware/admin');
const authorization = require('../middleware/login');
const { Product } = require('../models/product');

router.get('/', async (req, res) => {
    const products = await Product.find()
        .populate({
            path: 'movie',
            populate: {
                path: 'genre'
            }
        })
        .sort('name');
    res.send(products);
});


router.post('/', async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('No such movie with the given ID');

        let product = new Product({
            movie: {
                _id: movie._id,
                title: movie.title,
                director: movie.director,
                releaseDate: movie.releaseDate,
                genre: movie.genre.name,
                language: movie.language
            },
            format: req.body.format,
            price: req.body.price,
            subtitles: req.body.subtitles
        });
        product = await product.save();
        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('No such movie with the given ID');

        const product = await Product.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
            },
            { new: true });

        if (!product) return res.status(404).send('No such product with the given ID');

        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);

        if (!product) return res.status(404).send('No such product with the given ID.');

        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).send('No such product with the given ID.');

        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

module.exports = router; 