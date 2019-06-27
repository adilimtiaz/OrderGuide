const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    archived: Boolean,
    boxSize: Number,
    category: String,
    cutoff: Number,
    deliveryDays: {
        friday: Boolean,
        saturday: Boolean,
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean
    },
    description: String,
    fisherId: String,
    hidden: Boolean,
    imageUrl: String,
    leadTime: Number,
    name: String,
    productId: String,
    purchasePrice: Number,
    regionId: String,
    selectedDay: String,
    sellingPrice: Number,
    timestamp: Number,
    trackingId: String,
    unitQuantity: String,
    orderQuantity: Number,
    minQuantity: Number
});

mongoose.model('products', productSchema);
