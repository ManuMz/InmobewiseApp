let configuration = {
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        initialize:null
    },
    data() {
        return {
            styleToClose:{
                background:"#0F0F19",
                color:"#FFFFFF"
            },
            checkMenuAr:false,
            checkSaveSesion:false,
            checkSavePostalCode:false,
            firstTime : false//ayuda a evitar que salgan notificaciones antes de tiempo
        }
    },
    created() {
        this.firstTime = false;
    },
    methods: {
        close(){
            this.$emit("close");
        }
    },
    mounted() {
        this.checkMenuAr = this.$props.initialize.data.configuration.m_menu == '1' ? true : false;
        this.checkSaveSesion = this.$props.initialize.data.configuration.sesion == '1' ? true : false;
        this.checkSavePostalCode = this.$props.initialize.data.configuration.cp == '1' ? true : false;
    },
    watch: {
        checkMenuAr(){
            let value = this.checkMenuAr ? 1 : 0;
            let params = "value="+ value;
            comunicateWebView("change-view-menu",params);
            if(this.firstTime){
                if(this.checkMenuAr){
                    createAviso("Menu AR activado");
                }else{
                    createAviso("Menu AR desactivado");
                }
            }
        },
        checkSaveSesion(){
            let value = this.checkSaveSesion ? 1 : 0;
            let params = "value="+ value;
            comunicateWebView("change-config-session",params);
            if(this.firstTime){
                if(this.checkSaveSesion){
                    createAviso("Se guardo su sesión actual");
                }else{
                    createAviso("La proxima vez que abra la app necesitara inicio de sesión");
                }
            }
        },
        checkSavePostalCode(){
            let value = this.checkSavePostalCode ? 1 : 0;
            let params = "value="+ value;
            comunicateWebView("change-config-cp",params);
            if(this.firstTime){
                if(this.checkSavePostalCode){
                    createAviso("Se guardo el codigo postal actual");
                }else{
                    createAviso("Se eliminara su codigo postal actual");
                }
            }
            this.firstTime = true;
        }
    },
    components:{
        'close-container':closeContainer 
    },
    template :`
        <transition name="show-container">
            <div v-if="isActive && initialize!=null" class="configuration-container">
                <close-container
                    :style-content="styleToClose"
                    title="Configuración"
                    @close="close"
                ></close-container>
                <div class="container">
                    <div class="card mt-2">
                        <div class="card-body">

                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                        <div class="option-to-configure">
                            <b>Recordar sesión</b> 
                            <label class="switch">
                                <input type="checkbox" v-model="checkSaveSesion">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="option-to-configure">
                                <b>Recordar codigo postal</b> 
                                <label class="switch">
                                    <input type="checkbox" v-model="checkSavePostalCode">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `
}