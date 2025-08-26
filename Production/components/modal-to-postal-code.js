let modalToPostalCode = {
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        initialize:{
            type:Object,
            default:null
        }
    },
    data() {
        return {
            formSchema: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'input_postal_code',
                        placeholder: 'Codigo postal',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(letters.length > 0){
                                return {isValid : false, msg : "Esta campo no permite letras"};
                            }else if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else if(value.length < 5){
                                return {isValid : false, msg : "Debe tener 5 caracteres"};
                            }
                            else if(value.length > 5){
                                return {isValid : false, msg : "No puedes tener mas de 5 caracteres"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                ]
            },
            formDefaultData: {
                input_postal_code: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }
            },
            buttons:{
                type:'roundend-button',
                content:'<i class="icon-Correcto"></i>',
                typeButton:'submit',
                align:'center',
                disabled:false
            },
        }
    },
    watch:{
        isActive:function(newValue, oldValue){
            //console.log(this.$props.initialize.data.postal_code);
            if(newValue && this.$props.initialize.data.postal_code != ""){
                this.formDefaultData.input_postal_code.value = this.$props.initialize.data.postal_code
            }
        },
        'formDefaultData.input_postal_code.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_postal_code");
            let res = field[0].validation(newValue)
            this.formDefaultData.input_postal_code.error.isActive = !res.isValid
            this.formDefaultData.input_postal_code.error.message = res.msg
        }
    },
    methods: {
        onSubmit(form){
            let currentContentButton = this.buttons.content;
            this.buttons.disabled = true;
            this.buttons.content = '<div class="lds-dual-ring"></div>';
            let bandera = true;
            this.formSchema.fields.forEach(field=>{
                if(typeof field.validation == 'function'){
                    if(!field.validation(this.formDefaultData[field.name].value).isValid){
                        this.formDefaultData[field.name].error.isActive = true
                        bandera = false
                    }else{
                        this.formDefaultData[field.name].error.isActive = false
                    }
                }
            });

            if(bandera){
                this.$emit("request-postal-code", form)
            }else{
                this.buttons.disabled = false
                this.buttons.content = currentContentButton
            }
        }
    },
    components:{
        'rounded-button':roundedButton,
        'component-form':componentForm,
    },
    template:`
        <transition name="show-question-cp">
            <div v-if="isActive" class="modal-postal-code">
                <div class="container">
                    <component-form
                        :schema="formSchema"
                        :data="formDefaultData"
                        :buttons="buttons"
                        @on-submit="onSubmit"
                    ></component-form>  
                </div>
            </div>
        </transition>
    `
}