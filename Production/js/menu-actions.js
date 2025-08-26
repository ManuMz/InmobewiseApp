$(document).ready(function(){
    listenerToOpenMenu();
    listenerToCloseMenu();
});



const listenerToOpenMenu = function(){
    $('.open-menu').on('click',function(){
        $('.side-menu ').animate({
            opacity:1,
            'z-index':1500
        }, {
            duration: 100,
            specialEasing: {
            },
            complete: function() {
                $(this).find('.menu').animate({
                    left:0
                },{
                    duration:200
                });
            }
        });
    });
}


const listenerToCloseMenu = function(){
    $('.close-menu').on('click',function(){
        $('.side-menu .menu').animate({
            left: "-325px",
        }, {
            duration: 200,
            specialEasing: {
            },
            complete: function() {
                $(this).parent().animate({
                    opacity:"0",
                    "z-index":-100
                },{
                    duration:100
                });
            }
        });
    });
}