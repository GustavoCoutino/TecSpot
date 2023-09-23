const express = require("express");
const router = require("./routes/routes");
const app = express();

// Middlewares
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

//pool.query("SELECT * FROM estacionamientos", (err, res) => {
//  if (!err) {
//    console.log(res.rows);
//  } else {
//    console.log(err);
//  }
//});
