const { Pool } = require("pg");

//Conexion a base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TecSpotDB",
  password: "contrasena",
  port: 5432,
});

exports.login = (req, res) => {
  const { matricula, contrasena } = req.body;

  pool.query(
    "SELECT * FROM usuarios WHERE matricula = $1 AND contrasena = $2",
    [matricula, contrasena],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.rows.length === 1) {
        res.status(200).json({ message: "Logged in" });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    }
  );
};

exports.register = async (req, res) => {
  const {
    matricula,
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    contrasena,
  } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM usuarios WHERE matricula = $1",
      [matricula]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Usuario" });
    }

    await pool.query(
      "INSERT INTO usuarios (matricula, nombre, apellido_paterno, apellido_materno, email, contrasena) VALUES ($1, $2, $3, $4, $5, $6)",
      [matricula, nombre, apellido_paterno, apellido_materno, email, contrasena]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const { matricula } = req.params;

  try {
    const user = await pool.query(
      "SELECT * FROM usuarios WHERE matricula = $1",
      [matricula]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
