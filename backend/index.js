const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const adminMiddleware = require('./middleware/admin');

const login = require('./routes/login');
const users = require('./routes/users');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const products = require('./routes/products')

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var connstr = "mongodb://marcus:marcus@marcusdatabas-shard-00-00-tcwtx.mongodb.net:27017,marcusdatabas-shard-00-01-tcwtx.mongodb.net:27017,marcusdatabas-shard-00-02-tcwtx.mongodb.net:27017/filmhandel?ssl=true&replicaSet=MarcusDatabas-shard-0&authSource=admin&retryWrites=true"

mongoose.connect(connstr)
    .then(() => console.log('Connected to database.'))
    .catch(err => console.log('Could not connect to database.'));

app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use('/api/genres', genres)
app.use('/api/movies', movies);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/login', login);
app.use(adminMiddleware);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));