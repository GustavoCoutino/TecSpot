const express = require("express");
const pool = require("../db/db");

const usuarioRouter = express.Router();

usuarioRouter.post("/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "admin") {
    res.send("Logged in");
  }
});

usuarioRouter.post("/register", (req, res) => {});
