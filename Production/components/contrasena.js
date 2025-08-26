/*aqui se modifica la vista de login en el de ar-anim-js ya no*/
let login = {
    props:{
        isActive:false
    },
    components:{
        'rounded-button':roundedButton,
        'rounded-button':roundedButton,
        'component-form':componentForm,
        'primary-button-block': primaryButtonBlock //agregue aqui
    },
    data() {
        return {
            buttonHeaderUser:{
                type:'roundend-button',
                content:"<i class='icon-Usuario bold'></i>",
                typeButton:'button',
                align:'center',
                size:''
            },
            os:"",
            buttonToFacebook: {//agregue aqui
              type: "roundend-button",
              // content:"<span class='mr-3'>Inicie sesión con</span><img src='../images/color_facebook.png' style=' height:18px'>",
              content:"<img src='../images/color_facebook.png' style=' height:18px'>",
              typeButton: "button",
              childClass: "fb",
              size: "",
            },
            buttonToGoogle: {
              type: "roundend-button",
              content:"<img src='../images/color_google_plus.png' style='width:24px;'>",
              typeButton: "button",
              childClass: "google",
              size: "",
            },
            buttonToApple: {
              type: "roundend-button",
              content:
                "<span class='mr-3'>Inicie sesión con</span><img src='../images/color_apple_logo.png' style='width:18px;'>",
              typeButton: "button",
              childClass: "apple",
              size: "",
            },
            buttonToPhone: {
              type: "roundend-button",
              //content:"<span class='mr-3'></span><i class='fas fa-phone-alt'></i>",
              // "<span class='mr-3'>Inicie sesión con</span><i class='fas fa-phone-alt'></i>", icon-cancel
              content:"<img src='../images/icon1-telefono.png' style=' height:20px'>",
              typeButton: "button",
              childClass: "phone",
              size: "",
            },
            buttonphoneactive:true,
            buttonfbeactive:true,
            buttongmailactive:true,//hasta aqui
            formSchema: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'input_user',
                        placeholder: 'Correo electronico',
                        validation:function(value){
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo Requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                    {
                        type: 'password-input',
                        name: 'input_password',
                        placeholder: 'Contraseña actual',
                        validation:function(value){
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo Requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'input_passwordNew',
                        placeholder: 'Nueva Contraseña',
                        validation:function(value){
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo Requerido"};
                            }else{
                                return {isValid : true, msg : ""};
                            }
                        }
                    }
                    // {
                    //     type: 'text-input',
                    //     name: 'input_passwordNew2',
                    //     placeholder: 'Repite la nueva contraseña',
                    //     validation:function(value){
                    //         if(value.length == 0){
                    //             return {isValid : false, msg : "Campo Requerido"};
                    //         }else{
                    //             return {isValid : true, msg : ""};
                    //         }
                    //     }
                    // }
                ]
            },
            formDefaultData: {
                input_user: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                input_password: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                input_passwordNew: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                 }
                // input_passwordNew2: {
                //     value: '',
                //     error:{
                //         isActive:false,
                //         message:"Campo requerido"
                //     }
                // }
            },
            buttons:{
                type:'primary-button-block',
                content:'Cambiar',
                typeButton:'submit',
                disabled:false,
                color: '#000000'
            }
        }
    },
    watch:{
        'formDefaultData.input_user.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_user");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_user.error.isActive = !res.isValid
            this.formDefaultData.input_user.error.message = res.msg
        },
        'formDefaultData.input_password.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_password");
            let res = field[0].validation(newValue);
            this.formDefaultData.input_password.error.isActive = !res.isValid
            this.formDefaultData.input_password.error.message = res.msg
        },
    },
    beforeCreate()
    {
        firebase.auth()
        .getRedirectResult()
        .then((result) => {
            //alert("result del redirect: "+JSON.stringify(result)+"result credential: "+JSON.stringify(result.credential));
          if (result.credential) {
              var user = result.user;
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              let accessToken = result.credential.accessToken;
              let name=user.displayName;
              let uid=user.uid;
              this.nombreFb=name;
              this.idFb= uid;
             this.getresponseregisterfb();
          }
        }).catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;

          //alert("errors: "+errorCode+" -- "+errorMessage+" -- "+email+" -- "+credential);
          createAviso("Ha ocurrido un error por favor intentelo más tarde");
        }); 
    },
    mounted(){//agregue aqui
        this.os = getMobileOperatingSystem();
        this.buttonphoneactive=false;
        this.buttonfbeactive=false;
        this.buttongmailactive=false; 
    }, //end
    methods: {
        onSubmit(form){
            let currentContentButton = this.buttons.content;
            this.buttons.disabled = true;
            this.buttons.content = "Cambiar";
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
                this.$emit("on-submit",form);
            }else{
                this.buttons.disabled = false;
                this.buttons.content = currentContentButton;
            }
        },
        setActiveRegister(){
            this.$emit('open-register');
        },
        hideLogin(){
            
            this.$emit('hide-login')
        },
        handleRegister(){//agregue aqui
            console.log("Register")
            this.$emit('active-register');
        },
        handleLogin(){
          this.$emit('active-login');
        },

        salir(){
          window.location.replace('uniwebview://close');
        }//end 
    },
    template:`
        <div class="container-fluidLogin" v-show="isActive" >
            <div class="login-head">
            </div>
            
            <div>
                <!-- <img src="https://arvispace.com/lib/ImagenesPedidos/fondos/logo.png" id="imagenLogo"></img> -->
                <img src="https://arvispace.com/InmobewiseApp/Production/images/logo.png" id="imagenLogo"></img>
            </div>
        
            <rounded-button
            :field="buttonHeaderUser" style="-webkit-filter: blur(0px);filter: blur(0px);color:white;"
            ></rounded-button>

            <div class="container" style="display: contents;text-align: center;">
                <component-form
                    :schema="formSchema"
                    :data="formDefaultData"
                    :buttons="buttons" style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                    @on-submit="onSubmit"
                ></component-form>  

                
                <div class="row" style="margin-bottom:4%;">
      
                    <div class="col-sm-3" style="margin-left: auto;margin-right: auto;">
                      <a style="color: black;" href="uniwebview://close">
                        <button class="btn ios-btn-primary mt-3" id="botonSalir"><img src='../images/icon-salir.png' style=' height:18px'></img></button>
                      </a>
                    </div>

                    <div class="col-sm-12" style="margin-top:4%;display:block">
                      <p class="textoLogin"> -------------- Cambio de contraseña --------------</p>
                    </div>



                    
 

                </div>

                 
            </div>
        </div>
    `
    

}