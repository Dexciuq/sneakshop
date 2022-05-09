const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render("cart.ejs"))
    .post((req, res) => res.send("POST CART"));
module.exports = router;