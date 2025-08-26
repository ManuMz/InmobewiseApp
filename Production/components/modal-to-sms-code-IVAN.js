let modalToSmsCode = {
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
                        type: 'text-input-sms',
                        name: 'input_sms_code',
                        placeholder: 'Codigo de 6 digitos',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(letters.length > 0){
                                return {isValid : false, msg : "Esta campo no permite letras"};
                            }else if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else if(value.length < 6){
                                return {isValid : false, msg : "Debe tener 6 caracteres"};
                            }
                            else if(value.length > 6){
                                return {isValid : false, msg : "No puedes tener mas de 6 caracteres"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                ]
            },
            formDefaultData: {
                input_sms_code: {
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
            cancelButton:{
                type:'roundend-button',
                content:'<i class="icon-Cancelar"></i>',
                // typeButton:'submit',
                align:'center',
                disabled:false
            },
        }
    },
    watch:{
        'formDefaultData.input_sms_code.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_sms_code");
            let res = field[0].validation(newValue)
            this.formDefaultData.input_sms_code.error.isActive = !res.isValid
            this.formDefaultData.input_sms_code.error.message = res.msg
        }
    },
    methods: {
        handleBack(){
            
            this.buttons.disabled = false
            
            this.buttons.content = '<i class="icon-Correcto"></i>'
            this.$emit("cancel-sms")
        },
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
                this.$emit("request-sms-code", form)
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
        <transition name="show-question-sms">
            <div v-if="isActive" class="modal-sms-code">
            <div class="container-fluid">
            <div class="Head">
                <div class="backButton">
                    <button @click="handleBack" class="modern-button-small btnSecondary"><span class="ico_back"></span></button>
                </div>
            </div>
                <div class="container">
                    <component-form
                        :schema="formSchema"
                        :data="formDefaultData"
                        :buttons="buttons"
                        @on-submit="onSubmit"
                    ></component-form>  
                </div>
            </div>
            </div>
        </transition>
    `
}