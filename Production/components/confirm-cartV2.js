let confirmCart = {
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        initialize:{
            type:Object,
            default:null
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
        'select-option':selectOption
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
                            if(value == -1){
                                return {isValid : false, msg : "Debe seleccionar una opcion valida"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_calle',
                        placeholder: 'Calle',
                        validation:function(value){
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_referencias',
                        placeholder: 'Referencias',
                        validation:function(value){
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};   
                            }else{
                                return {isValid : true, msg : ""};
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
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                ]
            },
            styleToClose:{
                background:"white",
                color:"black"
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
                }
            },
            buttons:{
                type:'primary-button-block',
                content:'Confirmar compra',
                typeButton:'submit',
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
        isActive:function(newValue, oldValue){
            if(newValue && this.$props.initialize.data.postal_code == ""){
                this.$emit("question-postal-code",newValue);
            }
        },
        'formDefaultData.select_asentamiento.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "select_asentamiento");
            let res = field[0].validation(newValue);
            this.formDefaultData.select_asentamiento.error.isActive = !res.isValid
            this.formDefaultData.select_asentamiento.error.message = res.msg
        },
        'formDefaultData.input_calle.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_calle");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_calle.error.isActive = !res.isValid
            this.formDefaultData.input_calle.error.message = res.msg
        },
        'formDefaultData.input_referencias.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_referencias");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_referencias.error.isActive = !res.isValid
            this.formDefaultData.input_referencias.error.message = res.msg
        },
        'formDefaultData.input_no_ext.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_no_ext");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_no_ext.error.isActive = !res.isValid
            this.formDefaultData.input_no_ext.error.message = res.msg
        },
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
            this.formDefaultData.select_asentamiento.error.isActive = false
        }
    },
    mounted() {
        this.formDefaultData.select_asentamiento.value="-1"
            this.formDefaultData.select_asentamiento.options.push({
            value:"-1",
            text:"Seleccione un asentamiento"
        });
        this.formDefaultData.select_asentamiento.error.isActive = false
    },
    methods: {
        close(){
            this.$emit("close");            
        },
        onEditPostalCode(){
            this.$emit("question-postal-code",true);
        },
        onSubmit(form){
            
            let currentContentButton = this.buttons.content;
            this.buttons.disabled = true;
            this.buttons.content = '<div class="lds-dual-ring"></div>'
            let bandera = true;
            this.formSchema.fields.forEach(field=>{
                if(typeof field.validation == 'function'){
                    if(!field.validation(this.formDefaultData[field.name].value).isValid){
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
        },
        addNumber(){
            this.$emit("add-number", true)
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
                <div class="card info-user" v-if="initialize!=null">
                    <div class="card-header">
                        <rounded-button
                            :field="buttonHeaderUser"
                        ></rounded-button>
                        <b>Datos de usuario</b>
                    </div>
                    <div class="card-body" v-if="initialize.data.telefono.length == 0">
                        <p><b>Nombre:</b> {{initialize.data.nombre}}</p>
                        <div class="alert alert-warning" role="alert" v-if="1 > 5">
                            <h4 class="alert-heading">¡Cuidado!</h4>
                            <p class="mb-0">No tenemos un numero telefonico, este dato podria mejorar el servicio que te brindemos. <a href="#" @click="addNumber">Agregalo aqui</a></p>
                        </div>
                    </div>
                    <div class="card-body" v-else>
                        <p><b>Nombre:</b> {{initialize.data.nombre}}</p>
                        <p v-if="initialize.data.telefono != 'vacio'"><b>Telefono:</b> {{initialize.data.telefono}}</p>
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
                        <p><b>Código Postal:</b> {{initialize.data.postal_code}} <span @click="onEditPostalCode" class="icon-Editar"></span></p>
                        <p v-if="locations.length>0"><b>Estado:</b> {{locations[0].d_estado}}</p>
                        <p v-if="locations.length>0"><b>Municipio:</b> {{locations[0].D_mnpio}}</p>
                        <component-form
                            :schema="formSchema"
                            :data="formDefaultData"
                            :buttons="buttons"
                            @on-submit="onSubmit"
                        ></component-form>  
                    </div>
                </div>
            </div>
        </transition>
    `
}