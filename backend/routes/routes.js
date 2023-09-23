const express = require("express");
const controller = require("./../controllers/controllers.js");

const router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/:id", controller.getUser);

module.exports = router;
