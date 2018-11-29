const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('The submitted email or password is invalid');

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).send('The submitted email or password is invalid');

    const token = user.loginToken();
    res.status(200).send(token);
});

module.exports = router;