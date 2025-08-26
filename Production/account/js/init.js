/**
 * Area para testing comentar en prodduction
 */

$(document).ready(function(){
    //content.init("testing","1",'{"nombre":"Ivan Villegas Rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"90796","configuration":{"m_menu":1,"sesion":0,"cp":1,"tutorial":1}}')
    //content.init("testing","1",'{"nombre":"Manuelito Perez","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","configuration":{"m_menu":1,"sesion":0,"cp":1,"tutorial":1}}')
    //content.init("tes")
    content.init("testing","1",'{"nombre":"Manuel","correo":"manu.entony.123@gmail.com","telefono":"2411942580","postal_code":"72100","configuration":{"m_menu":1,"sesion":0,"cp":1,"tutorial":1}}')
});

let content = new Vue({
    el:"#account",
    components:{
        'header-nav':headerNav,
        'side-menu-container':sideMenuContainer,
        'account':account
    },
    data(){
        return{
            initialize:null,
            sideMenuIsActive:false,
            pedidos:{
                type:Array,
                default:[]
            }
        }
    },
    watch:{
        initialize(){
            if(this.initialize!=null){
                this.requestPedidos();
            }
        }
    },
    methods:{
        init(use_mode, id_app, data){

            //alert("recibe los datos por aca");
            this.initialize = {
                use_mode: use_mode,
                id_app: id_app,
                data: JSON.parse(data)
            }
        },
        setSideMenu(){
            this.sideMenuIsActive = !this.sideMenuIsActive;
        },
        requestPedidos(){
            let tempInitialize = this.initialize;
            let services = tempInitialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/pedidos.php" : "https://arvispace.com/serviciosASAR/pedidos.php";
            let form = new FormData();                             //http://localhost//... 
            form.append('correo',tempInitialize.data.correo);
            form.append('idEmpresaApp',tempInitialize.id_app);
            axios.post(services,form).then(function(response){
                if(response.status == 200){
                    content.pedidos = response.data;
                }
            }).catch(function(error){
                console.log(error);
            });
        },
        setAccountInfoFromUnity(info) {
            alert("entre al init");
            console.log(info);
            alert(JSON.stringify(info));
            //alert("setAccountInfoFromUnity",account);
        }
    }
});