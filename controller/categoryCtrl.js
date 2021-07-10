const Category1 = require('../models/categoryModel');

const categoryCtrl = {
    getCategories: async(req, res) =>{
        //res.json('category test ctrl');
        try {
            const categories = await Category1.find();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    createCategory: async(req,res) =>{
        try {
            const {cat_id, cat_name, cat_images} = req.body;
            if(!cat_images) return res.status(400).json({msg: "No image uploaded"});

            const category = await Category1.findOne({cat_id});

            if(category)
               return res.status(400).json({msg: "This cat already exists."});

            const newCategory = new Category1({
                cat_id, cat_name, cat_images
            });
            
            await newCategory.save();
            //res.json(newProduct);
            res.json(newCategory);
        }catch{
            return res.status(500).json({msg:err.message});
        }    
    },
    deleteCategory: async (req,res) => {
        try {
            await Category1.findByIdAndDelete(req.params.id)
            res.json({msg: "deleted a category"});
        } catch (err) {
            return res.status(500).json({msg: err.message}); 
        }
    },
    updateCategory: async (req,res) => {
        try {
            const {cat_name, cat_images} = req.body;
            if(!cat_images) return res.status(400).json({msg: "No image upload"})
            await Category1.findOneAndUpdate({_id: req.params.id}, {
                cat_name, cat_images
            })

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message}); 
        }
    }
}

module.exports = categoryCtrl;