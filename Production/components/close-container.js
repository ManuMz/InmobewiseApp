let closeContainer = {
    props:{
        styleContent:{
            type:Object,
            default:function(){
                return {
                    background:"#FFFFFF",
                    color:"#000"
                }
            }
        },
        title:{
            type:String,
            default:""
        }
    },
    methods: {
        close(){
            this.$emit('close');
        }
    },
    template:`
        <div class="close-container" :style="styleContent">
            <button @click="close" :style="styleContent">
                <i class="icon-atras2"></i>
            </button>
            <h1>
                {{title}}
            </h1>
        </div>
    `
}