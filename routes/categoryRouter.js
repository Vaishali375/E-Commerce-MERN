const router = require('express').Router();
const categoryCtrl = require('../controller/categoryCtrl');

router.get('/category', categoryCtrl.getCategories)
router.post('/category', categoryCtrl.createCategory)
router.delete('/category/:id',  categoryCtrl.deleteCategory)
router.put('/category/:id',  categoryCtrl.updateCategory)


module.exports = router;