const express = require("express");
const controller = require("./../controllers/controllers.js");

const router = express.Router();

// Rutas autenticación
router.post("/login", controller.login);
router.post("/register", controller.register);

// Rutas estacionamiento
router.get("/estacionamientos", controller.getAllEstacionamientos);
router.get(
  "/estacionamientos-disponibles",
  controller.getAllEstacionamientosDisponibles
);
router.patch(
  "/estacionamientos/:id",
  controller.modificarEstadoEstacionamiento
);

// Rutas reserva
router.post("/reservas/:id_estacionamiento", controller.createReserva);
router.delete("/reservas/:id", controller.cancelarReserva);

// Rutas usuario
router.get("/:matricula", controller.getUser);

module.exports = router;
