const tallas = {
    props:{
        list:Array,
        currentTalla:0
    },
    data(){
        return{
        }
    },
    methods:{
        handleSelect(selectedTalla){
            let {idTalla} = selectedTalla

            if(idTalla != this.$props.currentTalla){
                this.$emit('onChangeTalla',selectedTalla)
            }
        }
    },
    watch:{
        list(){
            //let {idTalla} = this.$props.list[0]
            //this.currentTalla = idTalla
            //console.log(this.currentTalla)
        }
    },
    template :`
        <div class="talla__container">
            <div :class="currentTalla == talla.idTalla ? 'talla__element active' : 'talla__element'" v-for="(talla, tallaIndex) in list" @click="handleSelect(talla)">
                {{talla.abreviacion}}
            </div>
        </div>
    `
}