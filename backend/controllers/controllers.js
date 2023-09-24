const { Pool } = require("pg");

//Conexion a base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TecSpotDB",
  password: "contrasena",
  port: 5432,
});

// Rutas usuarios
exports.login = (req, res) => {
  const { matricula, contrasena } = req.body;

  pool.query(
    "SELECT * FROM usuarios WHERE matricula = $1 AND contrasena = $2",
    [matricula, contrasena],
    (error, results) => {
      if (error) {
        console.error("Error ejecutando el query:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }

      if (results.rows.length === 1) {
        res.status(200).json({ message: "Inicio de sesión exitoso" });
      } else {
        res.status(401).json({ message: "Autentiación fallida" });
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

    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    console.error("Error registrando al usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const matriculaFK = user.rows[0].matricula;

    const reservation = await pool.query(
      "SELECT * FROM reservas WHERE matricula = $1",
      [matriculaFK]
    );

    const userData = user.rows[0];
    userData.reservation =
      reservation.rows.length > 0 ? reservation.rows[0] : null;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error encontrando el usuario:", error);
    res.status(500).json({ message: "Error interno" });
  }
};
// *********************************************************************************************************************
// Rutas reserva
exports.createReserva = async (req, res) => {
  const { id_estacionamiento } = req.params;
  const { matricula, fecha, hora_inicio, hora_fin } = req.body;

  try {
    // Check if there is an existing reservation for this matricula
    const existingReservaByMatricula = await pool.query(
      "SELECT * FROM reservas WHERE matricula = $1",
      [matricula]
    );

    if (existingReservaByMatricula.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Ya existe una reserva para esta matrícula" });
    }

    // Check if there is an existing reservation for this parking space and time slot
    const existingReserva = await pool.query(
      "SELECT * FROM reservas WHERE id_estacionamiento = $1 AND fecha = $2 AND (($3 >= hora_inicio AND $3 < hora_fin) OR ($4 > hora_inicio AND $4 <= hora_fin))",
      [id_estacionamiento, fecha, hora_inicio, hora_fin]
    );

    if (existingReserva.rows.length > 0) {
      return res.status(400).json({
        message:
          "Este estacionamiento no está disponible en el horario especificado",
      });
    }

    await pool.query(
      "INSERT INTO reservas (matricula, id_estacionamiento, fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4, $5)",
      [matricula, id_estacionamiento, fecha, hora_inicio, hora_fin]
    );

    await pool.query(
      "UPDATE estacionamientos SET estado = false WHERE id = $1",
      [id_estacionamiento]
    );

    res.status(201).json({ message: "Reserva creada exitosamente" });
  } catch (error) {
    console.error("Error creando la reserva:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.cancelarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si existe la reserva
    const existingReserva = await pool.query(
      "SELECT * FROM reservas WHERE id = $1",
      [id]
    );

    if (existingReserva.rows.length === 0) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Eliminar la reserva de la base de datos
    await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    const idEstacionamiento = existingReserva.rows[0].id_estacionamiento;
    await pool.query(
      "UPDATE estacionamientos SET estado = true WHERE id = $1",
      [idEstacionamiento]
    );
    res.status(201).json({ message: "Reserva cancelada exitosamente" });
  } catch (error) {
    console.error("Error eliminando la reserva:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//*********************************************************************************************************************
// Rutas Estacionamiento

exports.getAllEstacionamientos = async (req, res) => {
  try {
    const estacionamientos = await pool.query("SELECT * FROM estacionamientos");
    res.status(200).json(estacionamientos.rows);
  } catch (error) {
    console.error("Error obteniendo los estacionamientos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getAllEstacionamientosDisponibles = async (req, res) => {
  try {
    const estacionamientos = await pool.query(
      "SELECT * FROM estacionamientos WHERE estado = true"
    );
    res.status(200).json(estacionamientos.rows);
  } catch (error) {
    console.error("Error obteniendo los estacionamientos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.modificarEstadoEstacionamiento = async (req, res) => {
  const { id } = req.params;

  try {
    const existingEstacionamiento = await pool.query(
      "SELECT * FROM estacionamientos WHERE id = $1",
      [id]
    );

    if (existingEstacionamiento.rows.length === 0) {
      return res.status(404).json({ message: "Estacionamiento no encontrado" });
    }

    const estadoActual = existingEstacionamiento.rows[0].estado;
    const nuevoEstado = !estadoActual;

    await pool.query("UPDATE estacionamientos SET estado = $1 WHERE id = $2", [
      nuevoEstado,
      id,
    ]);

    res.status(201).json({ message: "Estado modificado exitosamente" });
  } catch (error) {
    console.error("Error modificando el estado del estacionamiento:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
