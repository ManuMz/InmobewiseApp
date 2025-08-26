/**
 * Area para testing comentar en prodduction
 */
/*$(document).ready(function(){
    content.init("testing","1",'{"nombre":"Ivan Villegas Rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"90796","configuration":{"m_menu":1,"sesion":0,"cp":1,"tutorial":1}}')
});*/


let content = new Vue({
    el:"#agreements",
    components:{
        'header-nav':headerNav,
        'agreements':agreements,
        'glassmorphism':glassmorphism
    },
    data(){
        return{
        }
    },
    watch:{
    },
    methods:{
    }
});