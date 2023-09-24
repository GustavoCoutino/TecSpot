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
        window.location.href = "estacionamientos.html";
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
      window.location.href = "estacionamientos.html";
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
      let userDetails = `Matrícula: ${data.matricula}\nNombre: ${data.nombre}\nApellido Paterno: ${data.apellido_paterno}\nApellido Materno: ${data.apellido_materno}\nEmail: ${data.email}`;

      if (data.reservation) {
        userDetails += `\n\nEl usuario tiene una reservación\nID de Estacionamiento: ${data.reservation.id_estacionamiento}\nFecha: ${data.reservation.fecha}\nHora de Inicio: ${data.reservation.hora_inicio}\nHora de Fin: ${data.reservation.hora_fin}`;
      } else {
        userDetails += "\n\nEl usuario no tiene una reservación";
      }

      document.getElementById("userDetails").innerText = userDetails;
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

function formatDataAsTable(data) {
  const table = document.createElement("table");
  table.className = "table table-bordered";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  for (const key in data[0]) {
    const th = document.createElement("th");
    if (key === "id") {
      th.textContent = "Numero de estacionamiento";
    } else if (key === "estado") {
      th.textContent = "Estado";
    } else {
      th.textContent = key;
    }
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach((item) => {
    const row = document.createElement("tr");

    for (const key in item) {
      const cell = document.createElement("td");
      const cellValue =
        key === "estado" ? (item[key] ? "Libre" : "Ocupado") : item[key];
      cell.textContent = cellValue;
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

function getAllEstacionamientos() {
  fetch("/estacionamientos")
    .then((response) => response.json())
    .then((data) => {
      const estacionamientosListDisponibles = document.getElementById(
        "estacionamientosListDisponibles"
      );
      estacionamientosListDisponibles.innerHTML = "";

      const table = formatDataAsTable(data);
      estacionamientosListDisponibles.appendChild(table);
    })
    .catch((error) => console.error("Error:", error));
}

function getAllEstacionamientosDisponibles() {
  fetch("/estacionamientos-disponibles")
    .then((response) => response.json())
    .then((data) => {
      const estacionamientosListDisponibles = document.getElementById(
        "estacionamientosListDisponibles"
      );
      estacionamientosListDisponibles.innerHTML = ""; // Clear previous data

      const table = formatDataAsTable(data);
      estacionamientosListDisponibles.appendChild(table);
    })
    .catch((error) => console.error("Error:", error));
}
