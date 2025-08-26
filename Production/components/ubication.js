let ubication = {
    props:{
        initialize:{
            type:Object
        }
    },
    components:{
        'component-form': componentForm
    }, 
    data(){
        return{
            postalCode:"",
            formSchema: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'input_codigo_postal',
                        placeholder: 'Codigo postal',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(letters.length > 0){
                                return {isValid : false, msg : "Esta campo no permite letras"};
                            }else if(value.length < 5){
                                return {isValid : false, msg : "Debe tener 5 caracteres"};
                            }
                            else if(value.length > 5){
                                return {isValid : false, msg : "No puedes tener mas de 5 caracteres"};
                            }else if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    }
                ]
            },
            formDefaultData: {
                input_codigo_postal: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Valor invalido"
                    }
                }
            },
            buttons:{
                type:'roundend-button',
                content:'<i class="icon-Correcto"></i>',
                typeButton:'submit',
                align:'center'
            }
        }
    }, 
    computed:{

    },
    watch:{
        'formDefaultData.input_codigo_postal.value': function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_codigo_postal");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_codigo_postal.error.isActive = !res.isValid
            this.formDefaultData.input_codigo_postal.error.message = res.msg
        }
    },
    methods:{
        setPostalCode(value){
            this.formDefaultData.input_codigo_postal.value  = value;
        },
        setPostalCodeApp(){
            let bandera = true;
            this.formSchema.fields.forEach(field=>{
                if(typeof field.validation == 'function'){
                    if(!field.validation(this.formDefaultData[field.name].value).isValid){
                        this.formDefaultData[field.name].error.isActive=true;
                        bandera = false;
                    }else{
                        this.formDefaultData[field.name].error.isActive=false;
                    }
                }
            });
            if(bandera){
                comunicateWebView("location","postal_code="+this.formDefaultData.input_codigo_postal.value);
            }
        }
    },
    template:`
        <div class="container">
            <div class="wrapper" v-if="initialize!=null">
                <div class="form">
                    <h1>Elige donde recibiras tus compras.</h1>
                    <div v-if="initialize.data.cp !=''">
                        <p class="text-center"><b>Codigo postal actual:</b> {{initialize.data.cp}}</p>
                    </div>
                    <component-form
                        :schema="formSchema"
                        :data="formDefaultData"
                        :buttons="buttons"
                        @on-submit="setPostalCodeApp"
                    ></component-form>       
                </div>
            </div>
        </div>
    `
}