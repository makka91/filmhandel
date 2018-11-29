const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');


router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('This email is already registered');
    try {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.loginToken();
        res.header('x-login-token', token).send({
            name: user.name,
            email: user.email
        })
    }
    catch (err) {
        res.send(err.message)
    }
});

module.exports = router;