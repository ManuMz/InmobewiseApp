let brandSelected = {
    props:{
        brand:null
    },
    data() {
        return {
            buttonBrand:{
                type:'roundend-button',
                content:'<img src="https://arvispace.com/ArvisAmbientePruebas/admin/imagenesCategoria/12144825Mobiliario.png" class="img-fluid">',
                typeButton:'button',
                align:'',
                size:''
            }
        }
    },
    watch: {
        brand(){
            if(this.$props.brand!=null){
                this.buttonBrand.content = '<img src="'+this.$props.brand.foto+'" class="img-fluid">'
            }
        }
    },
    methods: {
        selectBrand(){
            this.$emit("back-to-select-brand")
        }
    },
    components:{
        'rounded-button': roundedButton
    },
    template:`
        <div v-if="brand != null" class="brand-selected">
            <rounded-button
                    :field="buttonBrand"
                @clicked-rounded="selectBrand"
            ></rounded-button> 
        </div>
    `
}