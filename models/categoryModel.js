const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_id:{
        type: String,
        require: true,
        unique: true
    },
    cat_name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    cat_images: {
        type: Object,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category1', categorySchema);