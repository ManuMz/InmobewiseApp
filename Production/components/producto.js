let producto = {
    props:{
        productos:Array,
        title:String,
        nameToCarousel:String
    },
    data(){
        return{
            posts:[],
            page:1,
            perPage:4,
            pages:[],
            isActive:{
                type:Boolean,
                default:true
            }
        }
    },
    components:{
        'carousel':carousel
    },
    filters:{
        toCurrency(val){
            return '$' + parseFloat(val).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
    methods:{
        setPages(){
            this.pages = [];
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
            }
            //console.log(this.pages.length);
        },
        paginate(posts) {
			let page = this.page; //actual page
			let perPage = this.perPage; //productos por pagina
			let from = (page * perPage) - perPage; //
			let to = (page * perPage);
			return  posts.slice(from, to);
        },
        selectProduct(producto){
            this.$emit('selected-producto', producto);
        }
    },
    created(){
        //post = this.productos;
    },
    computed:{
        displayedPosts(){
            this.posts = this.$props.productos;
            return this.paginate(this.posts);
        }
    },
    watch: {
		posts(){
			this.setPages();
        },
        productos(){
            this.posts = this.$props.productos;
            this.isActive = this.posts.length > 0 ? true : false;
        }
	},
    template:`
        <div class="row productos" v-if="isActive">
            <h4 class="titulo">{{title}}</h4>
            <div class="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 padding" v-for="(producto,productoIndex) in displayedPosts">
                <div class="card shadow">
                    <div class="element" 
                        :class="caracteristicaIndex == 0 ? 'element-active' : 'element-disabled'" 
                        v-for="(caracteristica, caracteristicaIndex) in producto.Caracteristicas">
                        <carousel
                            v-bind:id="caracteristica.idCaracteristica"
                            v-bind:name="nameToCarousel"
                            @selected="selectProduct(producto)"
                            v-bind:imagenes="caracteristica.imagenes"
                        ></carousel>
                        <hr class="line">
                        <h4 class="title">{{producto.descripcion}}</h4>
                        <p v-if="caracteristica.statusOferta == 0" class="precio">{{caracteristica.precio | toCurrency}}</p>
                        <p v-if="caracteristica.statusOferta == 1" class="precio-oferta">{{caracteristica.precioOferta | toCurrency}}</p>
                    </div>
                </div>
            </div>
            <div class="pagination-element">
                <ul class="pagination pagination-sm">
                    <li class="page-item"  v-if="page != 1"><a class="page-link" href="#"  @click="page--" disabled><</a></li>
                    <li class="page-item" v-for="pageNumber in pages" v-if="pageNumber > (page-2) && pageNumber < (page+2)"><a class="page-link" :class="page==pageNumber?'active':''" href="#" @click="page = pageNumber">{{pageNumber}}</a></li>
                    <li class="page-item"  v-if="page < pages.length"><a class="page-link" href="#"  @click="page++">></a></li>
                </ul>
            </div>
        </div>
    `
}
