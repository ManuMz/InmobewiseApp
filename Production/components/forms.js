let componentForm = {
    components: {
        'text-input': textInput,
        'select-option' : selectOption,
        'password-input':passwordInput,
        'roundend-button':roundedButton,
        'primary-button':primaryButton,
        'primary-button-block':primaryButton,
        'secondary-button':SecondaryButton

    },
    props: {
        schema: { 
            required: true 
        },
        data: { 
            required: true 
        },
        buttons:{
            required:true
        }
    },
    data() {
        return {
            isSubmitted:false
        }
    },
    methods:{
        onSubmit(event){
            event.preventDefault();
            this.$emit("on-submit",this); //comentado por ahorita para hace pruebas de preventdefault
        }
    },
    template: `
        <form class="form" @submit="onSubmit">
            <template v-for="field in schema.fields">
                <component :is="field.type" :field="field" :data.sync="data[field.name]"></component>
            </template>
            <component :is="buttons.type" :field="buttons" style="width: 100%;filter: invert(0%);">
            </component>
        </form>
    `
}