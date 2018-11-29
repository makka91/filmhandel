const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    admin: Boolean,
});

userSchema.methods.loginToken = function () {
    const token = jwt.sign({ _id: this._id, admin: this.admin }, 'secretKey');
    return { token };
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;