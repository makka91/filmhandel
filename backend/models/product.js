const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    format: {
        type: String

    },
    price: {
        type: String

    },
    subtitles: {
        type: [String]

    }

});

const Product = mongoose.model('Product', productSchema)

module.exports.productSchema = productSchema;
module.exports.Product = Product;