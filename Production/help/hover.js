const menuItems = document.querySelectorAll('.menu-container li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remueve la clase active de todos los elementos
        menuItems.forEach(el => el.classList.remove('active'));
        // Agrega la clase active al elemento seleccionado
        item.classList.add('active');
    });
});
