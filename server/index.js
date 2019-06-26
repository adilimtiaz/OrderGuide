const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('./models/products');
const Products = mongoose.model('products');


if (process.env.NODE_ENV !== 'production'){
    // Load env variables such as MONGO URI from .env file
    // in top level directory
    require('dotenv').config();
}

// Mongoose should use native JS promises
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.get('/api/products', async (req, res) => {
    const allProducts = await Products.find({});
    res.send(allProducts);
});

if (process.env.NODE_ENV === 'production'){
    // If no routes found in express endpoints, check main.js (react build)
    // for routes that serve files or components
    app.use(express.static(path.join(__dirname, '../client/build')));

    // If no other route matches, serve index.html in ../client/build
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
