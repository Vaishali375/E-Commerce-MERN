const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    payment_id :{
        type: String,
        require: true,
        trim : true
    },
    user_email:{
        type: String,
        require: true,
        trim: true
    },
    address:{
        type: String,
        require: true
    },
    items:{
       type: Array,
       default:[]
    },
    status:{
        type: String,
        require: true
    },
    amount:{
        type: Number,
        require: true
    }
},{
    timestamps : true
});

module.exports = mongoose.model('cart', cartSchema);