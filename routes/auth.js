const express = require("express");
const controller = require("../controllers/authController");
const router = express.Router();

router.route("/login").get((req, res) => res.render('login.ejs'))
    .post(controller.login);

router.route("/register").get((req, res) => res.render('register.ejs'))
    .post(controller.register);

router.route("/logout").get(controller.logout);

module.exports = router;