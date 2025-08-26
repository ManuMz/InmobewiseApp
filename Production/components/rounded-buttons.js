let roundedButton = {
    props:{
        field:{}
    },
    methods:{
        clicked(){
            this.$emit('clicked-rounded');
        }
    },
    template:`
        <button :type="field.typeButton" class="roudend-button" :class="[field.size, field.align]" @click="clicked">
            <span v-html="field.content"></span>
        </button>
    `    
}
