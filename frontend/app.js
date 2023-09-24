// Ejemplo de función para hacer login
function login() {
  const matricula = document.getElementById("matricula").value;
  const contrasena = document.getElementById("contrasena").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matricula, contrasena }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Inicio de sesión exitoso") {
        // Haz algo después del inicio de sesión exitoso
      } else {
        // Mostrar mensaje de error
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Función para Registro
function register() {
  const data = {
    matricula: document.getElementById("reg_matricula").value,
    nombre: document.getElementById("nombre").value,
    apellido_paterno: document.getElementById("apellido_paterno").value,
    apellido_materno: document.getElementById("apellido_materno").value,
    email: document.getElementById("email").value,
    contrasena: document.getElementById("reg_contrasena").value,
  };

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manejar la respuesta, por ejemplo mostrar un mensaje
    })
    .catch((error) => console.error("Error:", error));
}

// Función para Obtener Usuario
function getUser() {
  const matricula = document.getElementById("get_matricula").value;

  fetch("/" + matricula)
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes mostrar los detalles del usuario, por ejemplo:
      document.getElementById("userDetails").innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
}

// Función para Reservar Estacionamiento
function createReserva() {
  const data = {
    matricula: document.getElementById("reserva_matricula").value,
    fecha: document.getElementById("fecha").value,
    hora_inicio: document.getElementById("hora_inicio").value,
    hora_fin: document.getElementById("hora_fin").value,
  };
  const id_estacionamiento =
    document.getElementById("id_estacionamiento").value;

  fetch("/reservas/" + id_estacionamiento, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar respuesta
    })
    .catch((error) => console.error("Error:", error));
}

// Función para Cancelar Reserva
function cancelarReserva() {
  const id = document.getElementById("reserva_id").value;

  fetch("/reservas/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar respuesta
    })
    .catch((error) => console.error("Error:", error));
}

// Función para Obtener Todos los Estacionamientos
function getAllEstacionamientos() {
  fetch("/estacionamientos")
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes mostrar la lista de estacionamientos
      document.getElementById("estacionamientosListDisponibles").innerText =
        JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
}

// Función para Obtener Estacionamientos Disponibles
function getAllEstacionamientosDisponibles() {
  fetch("/estacionamientos-disponibles")
    .then((response) => response.json())
    .then((data) => {
      // Mostrar lista de estacionamientos disponibles
      document.getElementById("estacionamientosListDisponibles").innerText =
        JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
}

// Función para Modificar Estado Estacionamiento
function modificarEstadoEstacionamiento() {
  const id = document.getElementById("estado_estacionamiento_id").value;

  fetch("/estacionamientos/" + id, {
    method: "PATCH",
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar respuesta
    })
    .catch((error) => console.error("Error:", error));
}
