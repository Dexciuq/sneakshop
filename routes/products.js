const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();

router.get('/', controller.getAll);
router.patch('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;