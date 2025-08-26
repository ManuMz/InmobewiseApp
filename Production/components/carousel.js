let carousel = {
    props:{
        id:{
            type:String,
            default:""
        },
        name:{
            type:"",
            default:""
        },
        imagenes:{
            type:Array,
            default:null
        }
    },
    data(){
        return{
            selected:0
        }
    },
    methods:{
        select(){
            this.$emit('selected');
        },
        prev(){
            if(this.selected-1<0){
                this.selected=this.$props.imagenes.length-1;
            }else{
                this.selected--;
            }
        },
        next(){
            if(this.selected+1 == this.$props.imagenes.length){
                this.selected=0;
            }else{
                this.selected++;
            }
        }
    },
    components:{
        'image-to-carousel':imageToCarousel
    },
    template:`
        <div v-bind:id="name+id"  class="carousel slide">
            <div class="carousel-inner" @click="select">
                <div :class="imagenIndex == selected ? 'active' : ''" class="carousel-item" v-for="(imagen,imagenIndex) in imagenes">
                    <image-to-carousel
                        :isActive="imagenIndex == selected"
                        :src="imagen.nombreImagen"
                    ></image-to-carousel>
                </div>
            </div>
            <a v-if="imagenes.length > 1" @click="prev" class="carousel-control-prev" role="button">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a v-if="imagenes.length > 1" @click="next" class="carousel-control-next" role="button">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `
}