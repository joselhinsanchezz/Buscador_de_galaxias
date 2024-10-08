document.getElementById("btnBuscar").addEventListener("click", function() {
    const query = document.getElementById("inputBuscar").value.trim();
    if (query) {
        // Realizar la solicitud a la API de la NASA
        const url = `https://images-api.nasa.gov/search?q=${query}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Limpiar el contenedor antes de mostrar los nuevos resultados
                const contenedor = document.getElementById("contenedor");
                contenedor.innerHTML = "";

                // Verificar si hay resultados
                if (data.collection && data.collection.items.length > 0) {
                    data.collection.items.forEach(item => {
                        // Crear un div para cada imagen
                        const div = document.createElement("div");
                        div.classList.add("col-md-4", "py-3");

                        // Verificar si el item tiene enlaces a imágenes
                        if (item.links && item.links.length > 0) {
                            const img = document.createElement("img");
                            img.src = item.links[0].href;
                            img.alt = item.data[0].title || "Imagen de la NASA";
                            img.classList.add("img-fluid");

                            // Agregar la imagen al div
                            div.appendChild(img);
                        }

                        // Agregar el div al contenedor
                        contenedor.appendChild(div);
                    });
                } else {
                    // Mostrar mensaje si no se encontraron resultados
                    contenedor.innerHTML = "<p>No se encontraron imágenes para esa búsqueda.</p>";
                }
            })
            .catch(error => {
                console.error("Error al realizar la solicitud:", error);
                document.getElementById("contenedor").innerHTML = "<p>Ocurrió un error al buscar imágenes.</p>";
            });
    } else {
        alert("Por favor, ingrese un término de búsqueda.");
    }
});
