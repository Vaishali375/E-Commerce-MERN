const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    cat_id:{
        type: String,
        require: true
    },
    product_name:{
        type: String,
        trim: true,
        require: true
    },
    product_images:{
        type: Object,
        require: true
    },
    product_price:{
        type: Number,
        trim: true,
        require: true
    },
    product_description:{
        type: String,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Products', productSchema);