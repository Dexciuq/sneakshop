const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');
const {requireAuth} = require("../middleware/authMiddleware");

router.get('/', requireAuth, (req, res) => res.render('cart.ejs'));
router.post('/',requireAuth, productController.addToCart);

module.exports = router;