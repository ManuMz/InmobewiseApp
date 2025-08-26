let completeAccount = {
    props:{
        isActive:{
            type:Boolean,
            default:true
        },
        initialize:{
            type:Object,
            default:null
        }
    },
    data() {
        return {
            styleToClose:{
                background:"#131328",
                color:"#FFFFFF"
            },
            formSchema: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'input_telefono',
                        placeholder: 'Ingresa tu numero de telefono',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(letters.length > 0){
                                return {isValid : false, msg : "Esta campo no permite letras"};
                            }else if(value.length < 10){
                                return {isValid : false, msg : "Debe tener 10 caracteres"};
                            }
                            else if(value.length > 10){
                                return {isValid : false, msg : "No puedes tener mas de 10 caracteres"};
                            }else if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                ]
            },
            formDefaultData: {
                input_telefono: {
                    value: '',
                    complementHtml:'<div style="height: 100%; width: 100px; border-radius: 25px; background: #e6e6e6; margin-right: 10px; color:#666; display:flex; justify-content:center; align-items:center;"><img style="width:20px; height:20px; margin-right:5px;" src="../images/mexico.png">+52</div>',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
            },
            buttons:{
                type:'primary-button-block',
                content:'Actualizar',
                typeButton:'submit',
                id:"sign-in-button",
                disabled:false
            }
        }
    },
    watch:{
    },
    methods: {
        close:function(){
            this.$emit('close-add-number')
        }
    },
    
    components:{
        'close-container':closeContainer,
        'component-form':componentForm
    },
    template:`
        <div v-if="isActive" class="complete-account">
            <close-container
                :style-content="styleToClose"
                title="Completar cuenta"
                @close="close"
            ></close-container>
            <br>
            <div class="container">
                <component-form
                    :schema="formSchema"
                    :data="formDefaultData"
                    :buttons="buttons"
                ></component-form>  
            </div>
        </div>
    `
}