let cardCobro = {
    props:{
        total:{
            type:Number,
            default:0.0
        },
        cantidad:{
            type:Number,
            default:0
        },
        envio:{
            type:Boolean,
            default:false
        },
        limiteEnvio:{
            type:Number,
            default:0.0
        },
        costoEnvio:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            cantidadTotal:this.$props.cantidad,
            dataTotal:{
                type:Number,
                default:0
            },
            dataEnvio:{
                type:Number,
                default:0
            },
            isSendFree:false,
            // buttonPay:{
            //     type:'primary-button-block',
            //     content:'Continuar compra',
            //     typeButton:'submit'
                
            // }
            buttonPay:{
                type:'secondary-button',
                content:'Continuar compra',
                typeButton:'submit',
                color:'#00000',
                disabled:false
            }
        }
    },
    components:{
        // 'primary-button-block':primaryButton,
        'secondary-button':SecondaryButton,
        color: '#000000'
    },
    watch: {
        total(){
            this.dataTotal = this.$props.total;
        },
        cantidad(newVal){
            return this.cantidadTotal = newVal;
        }
    },
    computed: {
        getTotalEnvio(){
            if(this.$props.envio){
                if(this.$props.total>this.$props.limiteEnvio){
                    this.dataTotal = this.$props.total;
                    this.isSendFree = true;
                    return "¡Gratis!"
                }else{
                    
                    this.isSendFree = false;
                    this.dataTotal = this.$props.total + this.$props.costoEnvio;
                    return this.$props.costoEnvio;
                }
            }else{
                this.isSendFree = false;
                return "";
            }
        }
    },
    methods: {
        //cobroSetActiveConfirmCart(){
        setActiveConfirmCart(){
            this.$emit('clicked-button');//me manda al index
        },
        isDisabled(){
            //Activar boton si hay datos
            var stored = localStorage['DatosPaquete'];
            if (stored && stored != "") {
                return false;
            }
            //Desactivar si no hay
            else{
                return true;
            }
        }
        /*
        deleteAllProducts(){
            console.log("Ha");
            this.$emit('emit-index-delete-all-products');//me manda al index
        }
            */
    },
    filters:{
        toCurrency(val){
            return '$' + parseFloat(val).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
    template:`
        <div class="navbar fixed-bottom">
            <!--
            <p class="label-card-cobro" v-if="envio && !isSendFree"><b>Costo por envio:</b> <label>{{getTotalEnvio | toCurrency}}</label></p>
            <p class="label-card-cobro" v-if="envio && isSendFree"><b>Costo por envio:</b> <label>{{getTotalEnvio}}</label></p>
            -->
            <p class="label-card-cobro"><b>Cantidad de productos:</b> <label>{{cantidad}}</label></p>
            <p class="label-card-cobro"><b>Total:</b> <label>{{dataTotal | toCurrency}}</label></p>
            <p class="label-card-cobro"><b>Costo de Envio:</b>
            <span v-if="!dataEnvio">
                <label class="loader">Calculando...</label>
            </span>
            <span v-else>
                <label>{{ dataEnvio | toCurrency  }}</label>
            </span></p>
            <secondary-button
                :field="buttonPay"
                :disabled='isDisabled()'
                @clicked-button="setActiveConfirmCart();"
                
                style="width: 100%;filter: invert(0%);"
            ></secondary-button>
        </div>
    `
}
