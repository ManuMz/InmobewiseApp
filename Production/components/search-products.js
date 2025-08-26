let searchProductos = {
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        listProductos:{
            type: Array,
            default:null
        }
    },
    data(){
        return{
            styleToClose:{
                background:"transparent",
                color:"#FFFFFF"
            },
            inputSearch:"",
            productos:[],
            styleToEmpty:{
                width:'100%',
                height:'25rem',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                color:'white'
            }
        }
    },
    components:{
        'component-productos':producto,
        'close-container':closeContainer,
        'empty-component':emptyComponent
    },
    methods:{
        close(){
            this.inputSearch="";
            this.productos = [];
            this.$emit('close-search');
        },
        selectProducto(producto){
            this.$emit("selected-producto",producto);
        }
    },
    watch:{
        productos(){
        },
        inputSearch(){
            let filter = this.inputSearch;
            filter = removeAccents(filter);
            let tempProductos = [];
            if(filter.length > 3){
                this.listProductos.forEach(producto => {
                    if(removeAccents(producto.descripcion.toLowerCase()).indexOf(filter.toLowerCase())>-1){
                        //console.log(producto);
                        tempProductos.push(producto);
                    }
                });
                if(tempProductos.length == 0){
                    this.productos = [];
                }else{
                    this.productos = tempProductos;
                }
            }
        }
        
    },
    template:`
        <transition name="show-search-container">
            <div v-if="isActive" class="search-container"> 
                <close-container
                    :style-content="styleToClose"
                    title=""
                    @close="close"
                ></close-container>
                <div class="">
                    <input type="text" name="input-search" v-model="inputSearch" placeholder="Buscar..." class="input-search" value="">
                </div>
                <component-productos
                    v-bind:productos = "productos"
                    name-to-carousel="search-container-carousel-"
                    @selected-producto = "selectProducto"
                    title = ""
                ></component-productos>
                <empty-component
                    description="Sin resultados"
                    :style="styleToEmpty"
                    :isActive="productos.length<1"
                ></empty-component>
            </div>
        </transition>
    `
}