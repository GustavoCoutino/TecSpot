const express = require("express");
const pool = require("./db/db");

const app = express();

// Middlewares
app.use(express.json());

pool.query("SELECT * FROM estacionamientos", (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

console.log("WORKING");
