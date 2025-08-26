let account = {
    props:{
        initialize:null,
        pedidos:null
    },
    components:{
        'pedidos':pedidos,
        'rounded-button':roundedButton,
        'configuration':configuration,
        'close-container':closeContainer

    },
    data(){
        return{
            styleToClose:{
                // background:"#131328",
                background:"black",
                color:"White"
            },
            isPedidosContainerActive:false,
            isConfigurationContainerActive:false,
            buttonHeaderUser:{
                type:'roundend-button',
                content:"<i class='icon-Usuario bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonEdit:{
                type:'roundend-button',
                content:"<i class='icon-Editar bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonPedidos:{
                type:'roundend-button',
                content:"<i class='icon-Paquetes bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonFacturacion:{
                type:'roundend-button',
                content:"<i class='icon-Facturacin bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonConfiguracion:{
                type:'roundend-button',
                content:"<i class='icon-Configuracion bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonCerrarSesion:{
                type:'roundend-button',
                content:"<i class='icon-cerrar-sesin bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonEliminarCuenta:{
                type:'roundend-button',
                content:"X",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonCambiarContrasena:{
                type:'roundend-button',
                content:"<i class='icon-Usuario bold'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            }
        }
    },
    methods: {
        closeSesion(){
            let params = "";
            comunicateWebView("cerrar-session",params);
        },
        setPedidosContainer(){
            this.isPedidosContainerActive = !this.isPedidosContainerActive;
        },
        setConfigurationContainer(){
            this.isConfigurationContainerActive = !this.isConfigurationContainerActive; 
        },
        eliminarSesion(){
            
           
            //-----------------
           //createQuestion("Se borrara su cuenta junto con todos sus datos" +  " ¿Desea continuar?",true,()=>{
            //createQuestion("Cancelación de Pedido", "Está a punto de cancelar el pedido #" +  " ¿Está seguro?",true,()=>{
                createQuestion("¡Eliminacion de cuenta!", "Se borrara su cuenta junto con todos sus datos " +  " ¿Desea continuar?",true,()=>{
                //console.log("los datos de la sesion son: ")
                console.log(JSON.stringify(this.initialize));
                //---------------
                let tempInitialize = this.initialize;
                let services = tempInitialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/eliminaCuenta.php" : "https://arvispace.com/serviciosASAR/eliminaCuenta.php";
                let form = new FormData();
                form.append('correo',tempInitialize.data.correo);
                axios.post(services,form).then(function(response){
                    if(response.status == 200){
                       // createAviso("Se borrara la cuenta.");
                        console.log(response.data);
                        let params = "";
                        comunicateWebView("cerrar-session",params);
                    }
                }).catch(function(error){
                    console.log(error);
                    console.log(response.data);
                });
           });
    
        },
        contrasena(){
            // this.isPedidosContainerActive = !this.isPedidosContainerActive;
            window.location.href = "https://arvispace.com/InmobewiseApp/Production/Contrasena/"; 
        }
    },
    template:`
        <div class="account-container" v-if="initialize!=null">
            <a href="uniwebview://close">
               <close-container
               :style-content="styleToClose"
               title=""
                @close="close"
                ></close-container>
            </a>
            <pedidos
                :isActive = "isPedidosContainerActive"
                @close = "setPedidosContainer"
                :initialize="initialize"
                :listaPedidos = "pedidos"
            ></pedidos>
            <configuration
                :isActive="isConfigurationContainerActive"
                :initialize="initialize"
                @close="setConfigurationContainer"
            ></configuration>
            <div class="header">
                <div class="header-container">
                    <div class="content">
                        <rounded-button
                            :field = "buttonHeaderUser"
                        ></rounded-button>
                        <label>
                            <b>{{initialize.data.nombre}}</b>
                        </label>
                    </div>
                </div>
            </div>
            <div class="card" v-if="1>5">
                <div class="card-body option-to-menu ">
                    <rounded-button
                        :field="buttonEdit"
                    ></rounded-button>
                    <label><b>Editar Cuenta.</b></label>
                </div>
            </div>
            <div class="card first-card" @click="setPedidosContainer">
                <div class="card-body option-to-menu ">
                    <rounded-button
                        :field="buttonPedidos"
                    ></rounded-button>
                    <label><b>Ver pedidos</b></label>
                </div>
            </div>
            <div class="card">
                <div class="card-body option-to-menu ">
                    <rounded-button
                        :field="buttonFacturacion"
                    ></rounded-button>
                    <label><b>Facturación.</b></label>
                </div>
            </div>
            
            <div class="card" @click="setConfigurationContainer">
                <div class="card-body option-to-menu">
                    <rounded-button
                        :field="buttonConfiguracion"
                    ></rounded-button>
                    <label><b>Configuración.</b></label>
                </div>
            </div>
            <div class="card" @click="closeSesion">
                <div class="card-body option-to-menu ">
                    <rounded-button
                        :field="buttonCerrarSesion"
                    ></rounded-button>
                    <label><b>Cerrar sesión.</b></label>
                </div>
            </div>
                        <div class="card" @click="eliminarSesion">
                <div class="card-body option-to-menu ">
                    <rounded-button
                        :field=" buttonEliminarCuenta"
                        :initialize="initialize"
                    ></rounded-button>
                    <label><b>Eliminar Cuenta.</b></label>
                </div>
            </div>

                               <div class="card" @click="contrasena">
                <div class="card-body option-to-menu ">
                    <rounded-button
                        :field=" buttonCambiarContrasena"
                        :initialize="initialize"
                    ></rounded-button>
                    <label><b>Cambiar Contraseña.</b></label>
                </div>
            </div>

        </div>
    `
}