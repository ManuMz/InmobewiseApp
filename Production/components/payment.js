let payment = {
    props:{
        paymentDetail:null
    },
    components:{
        'rounded-button':roundedButton
    },
    data() {
        return {
            buttonHeaderInfoPedido:{
                type:'roundend-button',
                content:"<i class='icon-Informacion-general'></i>",
                typeButton:'button',
                align:'',
                size:'lg'
            },
            buttonSuccess:{
                type:'roundend-button',
                content:"<i class='icon-Correcto'></i>",
                typeButton:'button',
                align:'center',
                size:''
            }
        }
    },
    filters:{
        status(value){
            if(value == "completed"){
                return "¡Pedido exitoso!";
            }else{
                return "¡Error al hacer el pedido!";
            }
        },
        toCurrency(val){
            return '$' + val.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
    methods: {
        accept(){
            comunicateWebView("close","");
        }
    },
    template:`
        <div class="payment-container" v-if="paymentDetail != null">
            <div class="header">
                <div class="header-container">
                    <div class="content" >
                        <label>
                            <b>{{paymentDetail.status | status}}</b>
                        </label>
                    </div>
                </div>
            </div>
            <div class="card firs-card">
                <div class="card-header">
                    <rounded-button
                        :field="buttonHeaderInfoPedido"
                    ></rounded-button>
                    <b>Detalle del pedido</b>
                </div>
                <div class="card-body" v-if="paymentDetail!=null">
                    <p><b>Monto:</b> {{paymentDetail.ammount | toCurrency}}</p>
                    <p><b>Fecha de creación:</b> {{paymentDetail.creation_date}}</p>
                    <p><b>Fecha de cobro:</b> {{paymentDetail.operation_date}}</p>
                    <p><b>Descripción:</b> {{paymentDetail.description}}</p>
                </div>
            </div>
            <rounded-button
                @clicked-rounded="accept"
                :field="buttonSuccess"
            ></rounded-button>
        </div>
    `
}