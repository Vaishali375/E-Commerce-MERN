const Products = require('../models/productModel');

const productCtrl = {
    getProducts: async(req, res) =>{
        try {
           const products = await Products.find();
           res.json(products);
        } catch (err) {
           return res.status(500).json({msg:err.message}); 
        }
    },
    createProduct: async(req, res) =>{
        try {
            const {product_id, cat_id, product_name, product_price, product_description, product_images} = req.body;
            if(!product_images) return res.status(400).json({msg: "No image uploaded"});

            const product = await Products.findOne({product_id});

            if(product)
               return res.status(400).json({msg: "This product already exists."});

            const newProduct = new Products({
                product_id, cat_id, product_name, product_price, product_description, product_images
            });
            
            await newProduct.save();
            //res.json(newProduct);
            res.json(newProduct);

        } catch (err) {
            return res.status(500).json({msg:err.message});   
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})  
        } catch (err) {
            return res.status(500).json({msg:err.message});  
        }
    },
    updateProduct: async(req, res) => {
        try {
            const {product_id, cat_id, product_name, product_price, product_description, product_images} = req.body;
            if(!product_images) return res.status(400).json({msg: "No image upload"})

            await Products.findOneAndUpdate({_id: req.params.id}, {
                product_id, cat_id, product_name, product_price, product_description, product_images
            })

            res.json({msg: "Updated a Product"});
        } catch (err) {
           return res.status(500).json({msg:err.message});  
        }
    }
}

module.exports= productCtrl;