const Cart = require('../models/cartModel');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const cartCtrl = {
    getCart: async(req, res) =>{
        try {
            const carts = await Cart.find();
            res.json(carts);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    createCart: async(req,res) =>{
        try {
            const { payment_id,amount, user_email, address, items, status} = req.body;
            const payment = await stripe.paymentIntents.create({
              amount: amount,
              currency: "inr",
              description: "Your Company Description",
              payment_method: payment_id,
              confirm: true,
            });
            console.log("payment", payment);
            res.json({
              message: "Payment Successful",
              success: true,
            });

            const newPayment = new Cart({
                payment_id,amount, user_email, address, items, status
            });
            
            await newPayment.save();
            //res.json(newProduct);
            res.json(newPayment);
          } catch (error) {
            console.log("error", error);
            res.json({
              message: "Payment Failed",
              success: false,
            });
          }
    },
    deleteCart: async (req,res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.json({msg: "deleted a cart"});
        } catch (err) {
            return res.status(500).json({msg: err.message}); 
        }
    },
    updateCart: async (req,res) => {
        try {
            const {payment_id,amount, user_email, address, items, status} = req.body;
            
            await Cart.findOneAndUpdate({_id: req.params.id}, {
               payment_id,amount,user_email, address, items, status
            })

            res.json({msg: "Updated a cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message}); 
        }
    }
}

module.exports = cartCtrl;