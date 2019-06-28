const mongoose = require('mongoose');

require('../models/products');
const Products = mongoose.model('products');


module.exports = app => {
    app.get('/api/products', async (req, res) => {
        const allProducts = await Products.find({});
        res.send(allProducts);
    });

    app.put('/api/products', async (req, res) => {
        try {
            const product = req.body.product;
            let existingProduct = await Products.findById(product._id).exec();
            if ( existingProduct ) {
                existingProduct.set(product);
                let result = await existingProduct.save();
                res.send(result);
            }
        } catch(err) {
            res.send(err);
        }
    });
};
