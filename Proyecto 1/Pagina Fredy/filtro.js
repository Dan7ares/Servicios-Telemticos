document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form.d-flex');
    const inputTexto = document.getElementById('buqueda');
    const tbody = document.querySelector("#myTable tbody");

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const valorInput = inputTexto.value.trim();
        console.log("Valor del input:", valorInput);
        tbody.innerHTML = ''; // Limpia la tabla antes de la nueva búsqueda
        procesarBusqueda(valorInput);
    });

    function procesarBusqueda(texto) {
        console.log("Buscando por:", texto);

        // Realiza una petición GET a la API de Flask
        fetch('http://127.0.0.1:5000/api/personas')
            .then(response => response.json())
            .then(dataDesdeApi => {
                tbody.innerHTML = ''; // Limpia la tabla aquí también, para manejar el caso de no resultados

                let resultadosEncontrados = false; // Variable para rastrear si se encontraron resultados

                dataDesdeApi.forEach((persona, index) => {
                    // Verifica si los campos existen antes de intentar acceder a ellos
                    if (persona.ganador && persona.perdedor && persona.fecha) {
                        if (persona.ganador.toLowerCase().includes(texto.toLowerCase()) ||
                            persona.perdedor.toLowerCase().includes(texto.toLowerCase()) ||
                            persona.fecha.toLowerCase().includes(texto.toLowerCase())) {
                            const fila = `
                                <tr>
                                    <th scope="row">${index + 1}</th>
                                    <td>${persona.ganador}</td>
                                    <td>${persona.perdedor}</td>
                                    <td>${persona.fecha}</td>
                                </tr>`;
                            tbody.innerHTML += fila;
                            resultadosEncontrados = true; // Se encontró al menos un resultado
                        }
                    }
                });

                if (!resultadosEncontrados) {
                    tbody.innerHTML = '<tr><td colspan="4">No se encontraron resultados.</td></tr>';
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API:', error);
                tbody.innerHTML = '<tr><td colspan="4">Error al obtener los datos.</td></tr>'; // Muestra un mensaje de error en la tabla
            });
    }
});
