let primaryButton = {
    props:{
        field:{
            requiere:true
        }
    },
    methods:{
        clicked(){
            this.$emit('clicked-button');
        }
    },
    template:`
        <button :type="field.typeButton" class="btn btn-primary" @click="clicked">
            <span v-html="field.content"></span>
        </button>
    `    
}

let primaryButtonBlock = {
    props:{
        field:{
            requiere:true
        },
    },
    methods:{
        clicked(){
            this.$emit('clicked-button');
        }
    },
    template:`
        <button :type="field.typeButton" class="btn ios-btn-primary" @click="clicked" :disabled="field.disabled">
            <span v-html="field.content"></span>
        </button>
    `    
}


let SecondaryButton = {
    props:{
        field:{
            requiere:true
        }
    },
    methods:{
        clicked(){
            this.$emit('clicked-button');
        }
    },
    template:`
        <button :type="field.typeButton" class="btn btn-secondary" @click="clicked">
            <span v-html="field.content"></span>
        </button>
    `    
}