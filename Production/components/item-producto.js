let itemProducto = {
    props:{
        producto:null
    },
    data(){
        return{
            styleToClose:{
                background:"#0F0F19",
                color:"#FFFFFF"
            },
            buttonAddCart:{
                type:'roundend-button',
                content:'<i class="icon-agregar-mas-al-carrito"></i>',
                typeButton:'button',
                align:'',
                size:''
            },
            buttonViewAr:{
                type:'roundend-button',
                content:'<i class="icon-modelo-3d-con-AR"></i>',
                typeButton:'button',
                align:'',
                size:''
            },
            buttonBuy:{
                type:'roundend-button',
                content:'<i class="icon-comprar-directo"></i>',
                typeButton:'button',
                align:'',
                size:''
            },
            buttonColor:{
                type:'roundend-button',
                content:'<span class="icon-Color"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span></span>',
                typeButton:'button',
                align:'',
                size:''
            },
            selectedCaracteristica:-1,
            isContainerVarianteActive:false
        }
    },
    components:{
        'carousel':carousel,
        'rounded-button': roundedButton,
        'close-container':closeContainer,
        'container-variante':containerVariante
    },
    filters:{
        toCurrency(val){
            return '$' + parseFloat(val).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
    methods:{
        close(){
            this.$emit("close-item-producto");
        },
        onlyBuy(){
            let params = "idProBodPre="+this.$props.producto.idProBodPre+"&idCaracteristica="+this.selectedCaracteristica;
            comunicateWebView("only-buy",params);
        },
        addCart(){
            //alert("Se agrego un producto AR");
            let params = "idProBodPre="+this.$props.producto.idProBodPre+"&idCaracteristica="+this.selectedCaracteristica;
            comunicateWebView("add-cart",params);
            createAviso("El producto se ha agregado a su carrito");
        },
        viewInAr(){
            let params = "idProBodPre="+this.$props.producto.idProBodPre+"&idCaracteristica="+this.selectedCaracteristica;
            comunicateWebView("view-in-camera",params);
        },
        setContainerViewVariante(){
            this.isContainerVarianteActive = !this.isContainerVarianteActive;
        },
        setVariante(idCaracteristica){
            this.setContainerViewVariante();
            this.selectedCaracteristica = idCaracteristica;
        }
    },
    watch: {
        producto(){
            if(this.$props.producto!=null){
                this.selectedCaracteristica = this.$props.producto.Caracteristicas[0].idCaracteristica;
            }
        }
    },
    template:`
        <transition name="show-container">
            <div v-if="producto!=null" class="item-producto">
                <close-container
                    :style-content="styleToClose"
                    title=""
                    @close="close"
                ></close-container>
                <container-variante 
                    :isActive="isContainerVarianteActive"
                    :caracteristicas="producto.Caracteristicas"
                    :currentCaracteristica="selectedCaracteristica"
                    @on-change-caracteristica="setVariante"
                ></container-variante>
                <div class="element row" 
                    :class="caracteristica.idCaracteristica == selectedCaracteristica ? 'element-active' : 'element-disabled'" 
                    v-for="(caracteristica, caracteristicaIndex) in producto.Caracteristicas">
                    <carousel
                        class="col-12 col-md-6 col-lg-4 col-xl-4"
                        v-bind:id="caracteristica.idCaracteristica"
                        name="item-carousel-"
                        v-bind:imagenes="caracteristica.imagenes"
                    ></carousel>
                    <div class="col-12 col-md-6 col-lg-4 col-xl-4">
                        <hr class="line d-block d-md-none">
                        <h4 class="title">{{producto.descripcion}}</h4>
                        <p v-if="caracteristica.statusOferta == 0" class="precio">{{caracteristica.precio | toCurrency}}</p>
                        <p v-if="caracteristica.statusOferta == 1" class="precio-oferta">{{caracteristica.precioOferta | toCurrency}}</p>
                        <div class="row" v-if="producto.Caracteristicas.length > 1">
                            <div class="col-3 d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonColor"
                                    @clicked-rounded="setContainerViewVariante"
                                ></rounded-button>
                            </div>
                            <div class="col-3  d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonBuy"
                                    @clicked-rounded="onlyBuy"
                                ></rounded-button>
                            </div>
                            <div class="col-3  d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonAddCart"
                                    @clicked-rounded="addCart"
                                ></rounded-button>
                            </div>
                            <div class="col-3  d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonViewAr"
                                    @clicked-rounded="viewInAr"
                                ></rounded-button>
                            </div>
                        </div>
                        <div class="row" v-else>
                            <div class="col-4  d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonBuy"
                                    @clicked-rounded="onlyBuy"
                                ></rounded-button>
                            </div>
                            <div class="col-4  d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonAddCart"
                                    @clicked-rounded="addCart"
                                ></rounded-button>
                            </div>
                            <div class="col-4  d-flex justify-content-center">
                                <rounded-button
                                    :field="buttonViewAr"
                                    @clicked-rounded="viewInAr"
                                ></rounded-button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p v-if="producto.descripcionLarga.length > 0" class="text" v-html="producto.descripcionLarga"></p>
                                <p v-else class="text text-center">Sin información adicional.</p>
                            </div>
                            <div class="col-12" v-if="1>5">
                                <p class="title-empresa">Este producto es distribuido por:</p>
                            </div>
                            <div class="col-12" v-if="1>5">
                                <img :src="producto.imagenEmpresa" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `
}


