const { Pool } = require("pg");

//Conexion a base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TecSpotDB",
  password: "tu_contrasena_de_postgres",
  port: 5432,
});

module.exports = pool;
