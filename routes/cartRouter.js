const router = require('express').Router();
const cartCtrl = require('../controller/cartCtrl');
const auth = require('../middleware/auth');

router.get('/cart', cartCtrl.getCart)
router.post('/cart', auth, cartCtrl.createCart)
router.delete('/cart/:id',  cartCtrl.deleteCart)
router.put('/cart/:id',  cartCtrl.updateCart)


module.exports = router;