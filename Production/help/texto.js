document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar el botón de reproducción
    const playButton = document.querySelector('.play-button');

    // Añadir evento de clic al botón de reproducción
    playButton.addEventListener('click', function () {
        // Seleccionar el contenedor de video
        const videoContainer = document.querySelector('.video-container');

        // Crear el nuevo elemento de texto
        const textElement = document.createElement('div');
        textElement.textContent = 'Por favor selecciona un elemento del menu';
        textElement.className = 'video-text'; // Añadir clase para poder aplicar estilo

        // Añadir el nuevo elemento de texto al contenedor de video
        videoContainer.appendChild(textElement);
    });

    // Seleccionar todos los elementos del menú
    const menuItems = document.querySelectorAll('.menu-container li');

    // Añadir evento de clic a cada elemento del menú
    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Seleccionar el texto de video si existe y eliminarlo
            const textElement = document.querySelector('.video-text');
            if (textElement) {
                textElement.remove();
            }
        });
    });
});

