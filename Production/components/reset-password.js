const resetPassword = {
    props:{
        isActive:false,
        initialize:null
    },
    data() {
        return {
            isValidate:false,
            smsIsActive:false,
            buttonHeaderUser:{
                type:'roundend-button',
                content:"<i class='icon-Usuario'></i>",
                typeButton:'button',
                align:'center',
                size:''
            },
            formSchema: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'input_user',
                        placeholder: 'Correo eléctronico',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(letters.length > 0){
                                return {isValid : true, msg : ""};
                            }else if(value.length < 100){
                                return {isValid : true, msg : ""};
                            }
                            else if(value.length > 10){
                                return {isValid : true, msg : ""};
                            }else if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    }
                ]
            },
            formSchemaPass:{
                fields:[
                    {
                        type: 'password-input',
                        name: 'input_password',
                        placeholder: 'Contraseña',
                        validation:function(value){
                            if(value.length <= 8){
                                return {isValid : false, msg : "Su contraseña debe de tener mas de 8 caracteres"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        },
                        comparation:function(value,compareValue){
                            if(value == compareValue){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    },
                    {
                        type: 'password-input',
                        name: 'input_r_password',
                        placeholder: 'Repetir Contraseña',
                        validation:function(value){
                            if(value.length <= 8){
                                return {isValid : false, msg : "Su contraseña debe de tener mas de 8 caracteres"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    }
                ]
            },
            formDefaultData: {
                input_user: {
                    value: '',
                    complementHtml:'<div style="height: 100%; width: 100px; border-radius: 25px; background: #e6e6e6; margin-right: 10px; color:#666; display:flex; justify-content:center; align-items:center;"><img style="width:20px; height:20px; margin-right:5px;" src="../images/mexico.png">+52</div>',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }
            },
            formPasswordData: {
                input_password: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    },
                    toCompare:"input_r_password"
                },
                input_r_password: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }
            },
            buttons:{
                type:'primary-button-block',
                content:'Validar',
                typeButton:'submit',
                disabled:false,
                isValidate:false
            },
            buttonsPass:{
                type:'primary-button-block',
                content:'Actualizar',
                typeButton:'submit',
                disabled:false,
                isValidate:false
            }
        }
    },
    watch:{
        
        'formDefaultData.input_user.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_user");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_user.error.isActive = !res.isValid
            this.formDefaultData.input_user.error.message = res.msg
        
            let text1 = newValue;
            let text2 =  text1.replace(/\s+/g, ''); 
            this.formDefaultData.input_user.value=text2;
        },
        'formPasswordData.input_password.value':function(newValue, oldValue){
            let field = this.formSchemaPass.fields.filter(x => x.name == "input_password");
            let res = field[0].validation(newValue);
            this.formPasswordData.input_password.error.isActive = !res.isValid
            this.formPasswordData.input_password.error.message = res.msg
           

        },
        'formPasswordData.input_r_password.value':function(newValue, oldValue){
            let field = this.formSchemaPass.fields.filter(x => x.name == "input_r_password");
            let res = field[0].validation(newValue);
            this.formPasswordData.input_r_password.error.isActive = !res.isValid
            this.formPasswordData.input_r_password.error.message = res.msg


        },
    },
    components:{
        'rounded-button':roundedButton,
        'component-form':componentForm,
        'primary-button-block':primaryButtonBlock,
       // 'modal-to-sms-code':modalToSmsCode
    },
    methods: {
        init(use_mode, id_app, data){
            this.initialize = {
                use_mode: use_mode,
                id_app: id_app,
                data: JSON.parse(data)
            }
        },
        close(){
            this.$emit("cancel")
        },
        onSubmit(){
           // alert("submitpass2");

            let currentContentButton = this.buttons.content;
            this.buttons.disabled = true;
            this.buttons.content = '<div class="lds-dual-ring"></div>'
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
                this.validateNumber()
            }else{
                this.buttons.disabled = false;
                this.buttons.content = currentContentButton;
            }
        },
        requestSmsCode(formSubmitted){
            //console.log(this.pendingRegister.data.input_apodo.value);
            var code = formSubmitted.data.input_sms_code.value;
            let currentThis = this
            confirmationResult.confirm(code).then(function (result) {
                currentThis.smsIsActive = false
                currentThis.isValidate = true
                formSubmitted.buttons.content = '<i class="icon-Correcto"></i>'
                formSubmitted.buttons.disabled = false
            }).catch(function (error) {
                createAviso(error)
                console.log("codigo incorrecto")
                formSubmitted.buttons.content = '<i class="icon-Correcto"></i>'
                formSubmitted.buttons.disabled = false
            });
        },
        onSubmitPass(){
           // alert("submitpass");
            let currentContentButton = this.buttons.content;
            this.buttonsPass.disabled = true;
            this.buttonsPass.content = '<div class="lds-dual-ring"></div>'
            let bandera = true;
            this.formSchemaPass.fields.forEach(field=>{
                if(typeof field.validation == 'function'){
                    if(!field.validation(this.formPasswordData[field.name].value).isValid){
                        this.formPasswordData[field.name].error.isActive=true;
                        bandera = false;
                    }else{
                        this.formPasswordData[field.name].error.isActive=false;
                    }
                }
                if(typeof field.comparation == 'function' && !this.formPasswordData[field.name].error.isActive){
                    if(!field.comparation(this.formPasswordData[field.name].value, this.formPasswordData[this.formPasswordData[field.name].toCompare].value)){
                        this.formPasswordData[field.name].error.isActive=true;
                        this.formPasswordData[field.name].error.message = "Contraseñas no coinciden";
                        bandera = false;
                    }else{
                        this.formPasswordData[field.name].error.isActive=false;
                    }
                }
            });
            if(bandera){
                    this.updatePassword()
                    //console.log("Validaciones correctas")
            }else{
                this.buttonsPass.disabled = false;
                this.buttonsPass.content = "Actualizar";
            }
        },
        updatePassword(){
            const services = this.$props.initialize.use_mode == "testing" ? 
            "https://arvispace.com/serviciosASAR/actualizarPasswordUser.php" : 
            "https://arvispace.com/serviciosASAR/actualizarPasswordUser.php"
            let currentThis = this
            let form = new FormData()
            form.append("password",this.formPasswordData.input_password.value)
            form.append("telefono",this.formDefaultData.input_user.value)
            axios.post(services, form).then((response)=>{
                if(response.status == 200){
                    createAviso("Tu contraseña se ha actualizado correctamente")
                    currentThis.$emit('password-updated')
                }
            }).catch((exception) => {
                console.log(exception)
            })
        },
        validateNumber(){
           
           // alert("validar2");
           // alert("initialize: "+this.$props.initialize+" inizialite: "+this.initialize);
           /*
            const services = this.$props.initialize.use_mode == "testing" ? 
            "https://arvispace.com/serviciosASARAmbientePruebas/validarTelefonoUsuario.php" : 
            "https://arvispace.com/serviciosASAR/validarTelefonoUsuario.php";
          */
           /* const services = this.$props.initialize.use_mode == "testing" ? 
            "https://arvispace.com/serviciosASARAmbientePruebas/validarTelefonoUsuario.php" : 
            "https://arvispace.com/serviciosASAR/validarTelefonoUsuario.php"
            */
            /*
            let services = this.initialize.use_mode == "testing" ? 
                "https://arvispace.com/serviciosASARAmbientePruebas/validarTelefonoUsuario.php" : 
                "https://arvispace.com/serviciosASAR/validarTelefonoUsuario.php";
                 */

            // alert("validar3");
            let form = new FormData()
            form.append('correo', this.formDefaultData.input_user.value)
            
            //alert("mail: "+this.formDefaultData.input_user.value);
            let currentComponent = this
            axios.post("https://arvispace.com/serviciosASAR/recoverpassbymail.php", form).then((response)=>{
                //alert("status: "+response.status+" status2: "+response.data[0].status+" mensaje: "+response.msg);
                if(response.data[0].status == 10){

                    console.log(response.data)

                    if(response.data[0].status == 10){
                        //TODO SALIO BIEN


                        //+52 estatico de momento
                        /*
                        var phoneNumber = "+52 "+currentComponent.formDefaultData.input_user.value
                        var appVerifier = window.recaptchaVerifier
                        console.log(phoneNumber);
                        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function (confirmationResult) {
                                window.confirmationResult = confirmationResult
                                currentComponent.smsIsActive = true
                            }).catch(function (error) {
                                createAviso(error)
                                console.log(error)
                                grecaptcha.reset(window.recaptchaWidgetId)
                        });
                        */


                        createAviso("Tu contraseña ha sido reiniciada exitosamente,Revisa tu correo eléctronico para ver las intruccciones y recuperar la contraseña de tu cuenta")
                        setTimeout(function() { currentComponent.buttons.content = "Validar";
                        currentComponent.buttons.disabled = true;
                        comunicateWebView("open-profile","postal_code="+1); }, 6000);


                       /*
                        Swal.fire({
                            title: "<span style='color:#000000'>Tu contraseña ha sido reiniciada exitosamente</span>",
                            text: "Revisa tu correo eléctronico para ver las intruccciones y recuperar la contraseña de tu cuenta",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#c1c1c1',
                            confirmButtonText: "<span style='color:#000000'>Esta bien</span>",
                            cancelButtonText: 'No'
                          }).then((result) => {
                            if (result.value) {
                               currentComponent.buttons.content = "Validar";
                               currentComponent.buttons.disabled = true;
                               comunicateWebView("open-profile","postal_code="+1);
                            }
                          });
                          */


                    }else{

                        if(response.data[0].status == 100)
                        {//no exite el correo
                            createAviso("No existe una cuenta con este correo eléctronico, por favor intente con un correo eléctronico con una cuenta válida")
                        }

                        if(response.data[0].status == 150)
                        {//error al regstrar
                            createAviso("Ha ocurrido un error por favor intentelo más tarde")
                        }


                        currentComponent.buttons.content = "Validar";
                        currentComponent.buttons.disabled = false;
                       
                    }
                }else{
                    if(response.data[0].status == 100)
                    {//no exite el correo
                        createAviso("No existe una cuenta con este correo, por favor intente con un correo con una cuenta válida")
                    }

                    if(response.data[0].status == 150)
                    {//error al regstrar
                        createAviso("H ocurrido un error por favor intentelo más tarde")
                    }
                    currentComponent.buttons.content = "Validar";
                    currentComponent.buttons.disabled = false;
                   
                }
            }).catch((exception)=>{
                currentComponent.buttons.content = "Validar";
                currentComponent.buttons.disabled = false;
                createAviso(exception)
            })
        },
    },
    template:`
        <div>
            <div class="container-fluidReset" v-show="isActive" >
            
                <div class="login-head">
                </div>

                <div>
                    <!-- <img src="https://arvispace.com/lib/ImagenesPedidos/fondos/logo.png" id="imagenLogo"></img> -->
                    <img src="https://arvispace.com/InmobewiseApp/Production/images/logo.png" id="imagenLogo"></img>
                </div>

                <rounded-button
                :field="buttonHeaderUser" style="-webkit-filter: blur(0px);filter: blur(0px);color:white;"
                ></rounded-button>
                
                <div class="container" v-if="!isValidate" style="display: contents;text-align: center;">
                    
                    <component-form
                        :schema="formSchema"
                        :data="formDefaultData"
                        :buttons="buttons"
                        @on-submit="onSubmit" style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                    ></component-form>  
                    
                    <div style="margin-top:30px">
                    <p  class="textoLogin cancel"><a href="#" @click="close" class="subtextoLogin">Cancelar</a></p>
                    </div>

                </div>

                <div class="container" v-else   style="display: contents;text-align: center;">
                    
                    <component-form
                        :schema="formSchemaPass"
                        :data="formPasswordData"
                        :buttons="buttonsPass"
                        @on-submit="onSubmitPass" style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                    ></component-form> 
                     
                   

                    <div style="margin-top:30px">
                    <p  class="textoLogin cancel"><a href="#" @click="close" class="subtextoLogin">Cancelar</a></p>
                    </div>
                    
                </div>
            </div>
            <!--
            <modal-to-sms-code
                :is-active = "smsIsActive"
                @request-sms-code = "requestSmsCode"
            >
            </modal-to-sms-code>-->
        </div>
    `
}