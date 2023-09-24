const express = require("express");
const controller = require("./../controllers/controllers.js");

const router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/estacionamientos", controller.getAllEstacionamientos);
router.get(
  "/estacionamientos/disponibles",
  controller.getAllEstacionamientosDisponibles
);
router.patch(
  "/estacionamientos/:id",
  controller.modificarEstadoEstacionamiento
);
router.get("/:matricula", controller.getUser);

module.exports = router;
