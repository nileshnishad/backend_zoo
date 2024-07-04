const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

router.post('/createProduct', auth, productController.createProduct);
router.get('/getProducts', productController.getProducts);

module.exports = router;
