let subcategory = {
    props:{
        category:null,
        idBrand:0
    },
    data(){
        return{
            selected:null,
            idSelected:-1,
            productos:[],
            styleToClose:{
                background:"#0F0F19",
                color:"#FFFFFF"
            }
        }
    },
    methods:{
        close(){
            /**
             * Reiniciamos variables para cuando se vuelva a abrir
             */
            this.selected = null;
            this.$emit('close-subcategory');
        }, 
        selectProducto(producto){
            this.$emit('select-producto',producto);
        },
        selectSubCategory(idSubCategory){
            let currentBrand = this.$props.idBrand;
            
            if(this.$props.category!=null||idSubCategory==this.idSelected){
                if(idSubCategory==this.idSelected){
                    this.idSelected=-1;
                    this.selected=null;

                    this.productos=[];
                    let tempProductos = [];
                    this.$props.category.SubCategorias.forEach(subcategoria=>{
                        subcategoria.Productos.forEach(producto=>{
                            if(producto.idEmpresa == currentBrand){
                                tempProductos.push(producto);
                            }
                        });
                    });
                    //console.log(tempProductos);
                    this.productos = tempProductos;
                }else{
                    this.idSelected = idSubCategory;
                    this.productos=[];
                    let tempProductos = [];
                    this.$props.category.SubCategorias.forEach(subcategoria=>{
                        if(subcategoria.idProducto == idSubCategory){
                            this.selected = subcategoria;
                            subcategoria.Productos.forEach(producto=>{
                                if(producto.idEmpresa == currentBrand){
                                    tempProductos.push(producto);
                                }
                            });
                            return false;
                        }
                    });
                    //console.log(tempProductos);
                    this.productos = tempProductos;
                }
            }else{
            }
        }
    },
    components:{
        'component-productos': producto,
        'close-container':closeContainer
    },
    watch:{
        category(){
            if(this.$props.category!=null){
                this.productos=[];
                let tempProductos = [];
                this.$props.category.SubCategorias.forEach(subcategoria=>{
                    subcategoria.Productos.forEach(producto=>{
                        tempProductos.push(producto);
                    });
                });
                //console.log(tempProductos);
                this.productos = tempProductos;
            }
        }
    },
    template:`
        <transition name="show-container">
            <div v-if="category!=null" class="subcategory-container"> 
                <close-container
                    :style-content="styleToClose"
                    :title="category.nombreCategoria"
                    @close="close"
                ></close-container>
                <div class="subcategories">
                    <div class="scrollable-x">
                        <div class="item-subcategory shadow" @click="selectSubCategory(item.idProducto)" v-bind:class="idSelected==item.idProducto?'active':''" v-for="item in category.SubCategorias">
                            <img :src="item.foto" class="img-fluid">
                            <p>{{item.nombreProducto}}</p>
                        </div>
                    </div>
                </div>      
                
                <component-productos
                    v-bind:productos = "productos"
                    name-to-carousel="subcategory-carousel-"
                    @selected-producto = "selectProducto"
                    v-bind:title = "selected!=null?selected.nombreProducto:''"
                ></component-productos>    
            </div>
        </transition>
    `
}