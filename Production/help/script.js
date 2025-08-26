document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todos los elementos del menú
    var menuItems = document.querySelectorAll('.menu-container li');
    var youtubePlayer = document.getElementById('youtubePlayer');
    var videoPlaceholder = document.getElementById('videoPlaceholder');

    // Agregamos eventos de clic a cada elemento del menú
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var videoSrc = this.getAttribute('data-video');

            // Agregamos los parámetros necesarios para ocultar la información
            videoSrc += '&controls=0&modestbranding=1&rel=0';

            youtubePlayer.src = videoSrc;
            youtubePlayer.style.display = 'block';
            videoPlaceholder.style.display = 'none';
        });
    });

    document.getElementById('closeButton').addEventListener('click', function() {
        if (typeof UniWebView !== 'undefined' && UniWebView.postMessage) {
            UniWebView.postMessage('close');
        } else {
            window.location.href = 'uniwebview://close';
        }
    });
});

