const express = require('express');
const mongoose = require('mongoose');

require('./models/products');
const Products = mongoose.model('products');

// Load env variables such as MONGO URI
require('dotenv').config();

// Mongoose should use native JS promises
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.get('/api/products', async (req, res) => {
    const allProducts = await Products.find({});
    res.send(allProducts);
});

const PORT = 5000;
app.listen(PORT);
