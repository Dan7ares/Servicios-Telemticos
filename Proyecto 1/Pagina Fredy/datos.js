const tbody = document.querySelector("#myTable tbody");

// Realiza una petición GET a la API de Flask
fetch('http://127.0.0.1:5000/api/personas')
  .then(response => response.json()) // Convierte la respuesta a JSON
  .then(dataDesdeApi => {
    // 'dataDesdeApi' ahora contiene los datos JSON que tu API devolvió
    // Limpia el contenido actual de la tabla (si es necesario)
    tbody.innerHTML = '';

    // Itera sobre los datos recibidos de la API y crea las filas de la tabla
    dataDesdeApi.forEach((persona, index) => {
      const fila = `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${persona.ganador}</td>
          <td>${persona.perdedor}</td>
          <td>${persona.fecha}</td>
        </tr>`;
      tbody.innerHTML += fila;
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de la API:', error);
    // Aquí podrías mostrar un mensaje de error en la página
  });