const mongoose = require('mongoose'); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema construtor

// Product Schema
const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        img: { type: String, required: false },
        price: { type: Number, required: false },
        qty: { type: Number, required: false },
    }
);

// Comment Model
const Product = mongoose.model('Product', productSchema);

// Export Product Model
module.exports = Product;