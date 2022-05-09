const express = require("express");
const controller = require("../controllers/profileController");
const passport = require("passport");
const router = express.Router();

router.get('/', controller.profile);

router.get('/orders', controller.getOrders);

router.get('/edit', controller.editProfile);

// router.get('/', passport.authenticate('jwt', {session: false}), controller.profile);
// router.get('/orders', passport.authenticate('jwt', {session: false}), controller.getOrders);
// router.patch('/edit', passport.authenticate('jwt', {session: false}), controller.editProfile);
// router.delete('/delete', passport.authenticate('jwt', {session: false}), controller.deleteProfile);

module.exports = router;