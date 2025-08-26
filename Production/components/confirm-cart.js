let confirmCart = {
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        initialize:{
            type:Object
        },
        total:{
            type:Number,
            default:0
        },
        locations:null
    },
    components:{
        'rounded-button':roundedButton,
        'component-form':componentForm,
        'close-container':closeContainer,
        'select-option':selectOption,
        'secondary-button':SecondaryButton

    },
    data(){
        return{
            formSchema: {
                fields: [
                    {
                        type: 'select-option',
                        name: 'select_asentamiento',
                        label: 'Seleccionar opcion',
                        validation:function(value){
                            if(value != -1){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_calle',
                        placeholder: 'Nombre de la calle',
                        validation:function(value){
                            if(value != ""){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_referencias',
                        placeholder: 'Referencias',
                        validation:function(value){
                            if(value != ""){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_no_int',
                        placeholder: 'Numero interior'
                    },
                    {
                        type: 'text-input',
                        name: 'input_no_ext',
                        placeholder: 'Numero exterior',
                        validation:function(value){
                            if(value != ""){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_calle_1',
                        placeholder: 'Entre Calle 1',
                        validation:function(value){
                            if(value != ""){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_calle_2',
                        placeholder: 'Entre Calle 2',
                        validation:function(value){
                            if(value != ""){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    }/*,
                    {
                        type: 'text-input',
                        name: 'input_referencias',
                        placeholder: 'Referencias (Color de casa, # de pisos, etc.)',
                        validation:function(value){
                            if(value != ""){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_entre_calles',
                        placeholder: 'Entre qué calles',
                        validation: function(value) {
                            if (value.length == 0) {
                                return { isValid: false, msg: "Campo requerido" };
                            } else {
                                return { isValid: true, msg: "" };
                            }
                        }
                    }*/
                ]
            },
            styleToClose:{
                background:"#0F0F19",
                color:"#FFFFFF"
            },
            formDefaultData: {
                select_asentamiento:{
                    value:"",
                    options:[
                        {
                            value:"",
                            text:"",
                            isSelect:false
                        }
                    ],
                    error:{
                        isActive:false,
                        message:"Opción invalida"
                    }
                },
                input_calle: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                input_referencias: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                input_no_int: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                input_no_ext: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                input_calle_1:{
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },input_calle_2:{
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }

            },
            // buttons:{
            //     type:'primary-button-block',
            //     content:'Confirmar compra',
            //     typeButton:'submit',
            //     disabled:false
            // },
            buttons:{
                type:'secondary-button',
                content:'Confirmar compra',
                typeButton:'submit',
                color:'#00000',
                disabled:false
            },
            buttonsRegresar:{
                type:'secondary-button',
                content:'Regresar',
                typeButton:'submit',
                color:'red',
                disabled:false
            },
            buttonHeaderUser:{
                type:'roundend-button',
                content:"<i class='icon-Usuario'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonHeaderInfoPedido:{
                type:'roundend-button',
                content:"<i class='icon-Informacion-general'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            }
            
        }
    },
    watch: {
        locations(){
            this.formDefaultData.select_asentamiento.options = [];
            this.formDefaultData.select_asentamiento.value="-1"
            this.formDefaultData.select_asentamiento.options.push({
                value:"-1",
                text:"Seleccione un asentamiento"
            });
            this.$props.locations.forEach(location =>{
                this.formDefaultData.select_asentamiento.options.push({
                    value:location.d_asenta,
                    text:location.d_asenta
                });
            });
        }
    },
    methods: {
        close(){
            this.$emit("close");            
        },
        onSubmit(form){
            
            //alert("a cobrar con :"+this.total+" --- " );
            
            if(this.total>0)
            {
                let currentContentButton = this.buttons.content;
                this.buttons.disabled = true;
                this.buttons.content = "Procesando...";
                let bandera = true;
                this.formSchema.fields.forEach(field=>{
                    if(typeof field.validation == 'function'){
                        if(!field.validation(this.formDefaultData[field.name].value)){
                            this.formDefaultData[field.name].error.isActive=true;
                            bandera = false;
                        }else{
                            this.formDefaultData[field.name].error.isActive=false;
                        }
                    }
                });
                if(bandera){
                    this.$emit("on-submit",form);
                }else{
                    this.buttons.disabled = false;
                    this.buttons.content = currentContentButton;
                }
            }
            else
            {
                createAviso("Para continuar por favor agregue productos a su carrito");
            }
         
        },
        regresarCarrito(){
            //alert("1er brn");
            this.$emit('close-confirmacion');
        },
        ejecutarFunction(){
            //alert("ejecuta la funcion desde confirm-cart");
            this.$emit('ejecuta-function');
        }
    },
    filters:{
        toCurrency(val){
            return '$' + val.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
    template:`
        <transition name="show-container">
            <div v-if="isActive" class="confirm-cart-container">
                <close-container
                    :style-content="styleToClose"
                    title="Confirmar compra"
                    @close="close"
                ></close-container>
                <div class="header">
                    <div class="header-container">
                        <div class="content">
                            <label>
                                <b>{{total | toCurrency}}</b>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="card info-user">
                    <div class="card-header">
                        <rounded-button
                            :field="buttonHeaderUser"
                        ></rounded-button>
                        <b>Datos de usuario</b>
                    </div>
                    <div class="card-body" v-if="initialize!=null">
                        <p><b>Nombre:</b> {{initialize.data.nombre}}</p>
                        <!--<p><b>Correo:</b> {{initialize.data.correo}}</p>-->
                        <p><b>Telefono:</b> {{initialize.data.telefono}}</p>
                        <p><b>Código Postal:</b> {{initialize.data.postal_code}}</p>
                        <p v-if="locations.length>0"><b>Estado:</b> {{locations[0].d_estado}}</p>
                        <p v-if="locations.length>0"><b>Municipio:</b> {{locations[0].D_mnpio}}</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <rounded-button
                            :field="buttonHeaderInfoPedido"
                        ></rounded-button>
                        <b>Información de pedido</b>
                    </div>
                    <div class="card-body">
                        <component-form
                            :schema="formSchema"
                            :data="formDefaultData"
                            :buttons="buttons"
                            @on-submit="onSubmit"
                        ></component-form>  
                        <secondary-button
                            :field="buttonsRegresar"
                            @clicked-button="regresarCarrito();ejecutarFunction();"
                            style="width: 100%;filter: invert(0%);margin-top: 1%;"
                        ></secondary-button>
                    </div>
                </div>
            </div>
        </transition>
    `
}