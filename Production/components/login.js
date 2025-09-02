/*aqui se modifica la vista de login en el de ar-anim-js ya no*/
let login = { // Variable login
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
                        placeholder: 'Email o Número Telefónico',
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
                        placeholder: 'Contraseña',
                        validation:function(value){
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo Requerido"};
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
                }
            },
            buttons:{
                type:'primary-button-block',
                content:'Iniciar',
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
        //console.log(auth);
        // firebase.auth()
        // .getRedirectResult()
        // .then((result) => {
        //     //alert("result del redirect: "+JSON.stringify(result)+"result credential: "+JSON.stringify(result.credential));
        //   if (result.credential) {
        //       var user = result.user;
        //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //       let accessToken = result.credential.accessToken;
        //       let name=user.displayName;
        //       let uid=user.uid;
        //       this.nombreFb=name;
        //       this.idFb= uid;
        //      this.getresponseregisterfb();
        //   }
        // }).catch((error) => {
        //   // Handle Errors here.
        //   let errorCode = error.code;
        //   let errorMessage = error.message;
        //   let email = error.email;
        //   let credential = error.credential;

        //   //alert("errors: "+errorCode+" -- "+errorMessage+" -- "+email+" -- "+credential);
        //   createAviso("Ha ocurrido un error por favor intentelo más tarde");
        // }); 
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
            this.buttons.content = "Procesando...";
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
        recuperarPass(){
            this.$emit('reset-password');
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
        // requestFacebook() {
        //   console.log("facebook")
        //   this.$emit("request-facebook");
        // },
        requestFacebook(){
            
           // alert("request fb 1");
            // let provider = new firebase.auth.FacebookAuthProvider();

            // firebase.auth().signInWithRedirect(provider).then(() => 
            // { 			               
            //      firebase.auth().getRedirectResult().then(result => { 					
            //         console.log(result); 					
            //         // alert("resultado: "+result);
            //         const that = this; 					
            //         this.storage.set(TOKEN_KEY, result.user.refreshToken).then(res => 
            //          { 							
            //             that.authenticationState.next(true); 		
            //             //alert("autentication: +"+taht);				
            //           }); 				
            //         }).catch(function(error) 
            //         { 					
            //           //  alert(error.message); 
            //         }); 
            
            //     })
           /*
              let provider = new firebase.auth.FacebookAuthProvider();
              firebase.auth().signInWithRedirect(provider)
              .then ( () => {
                alert("Help4")     
                firebase.auth.getRedirectResult().then( res => {         
            
                  alert(res)
                  alert('from -Google--')
            
                  this.provider.loggedin = true;
                  this.provider.name = res.user.displayName;
                  this.provider.name = res.user.email;
                  this.provider.profilePicture = res.user.photoURL;
                  this.ref.detectChanges();
                  alert("cambios: "+res)
            
                 // this.navCtrl.push(LoggedinPage);
                  alert("has iniciado sesion de facebook con: "+JSON.stringify(res));
                  this.getresponseregisterfb();
  
                  });
                })*/
  
             /*
              firebase.auth().signInWithPopup(provider).then((result) => {
               
                var credential = result.credential;
                // The signed-in user info.
                var user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
                let name=user.displayName;
                let uid=user.uid;
  
                 this.nombreFb=name;
                 this.idFb= uid;
  
             
  
                alert("has iniciado sesion de facebook con: "+JSON.stringify(user));
                this.getresponseregisterfb();
                  
                // ...
              })
              .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
      
                // alert("ha ocurrido un error");
      
                createAviso("Ha ocurrido un error por favor intentelo más tarde");
              });
  
              */
        },
        async getresponseregisterfb()
        {
           // alert("a conseguir respuesta fb: "+this.nombreFb+" id: "+this.idFb);
             try{
                let services ="https://arvispace.com/serviciosASAR/validarNomberFb.php";
                let form = new FormData()
                form.append("nombrefb",this.nombreFb);
                form.append("idfb",this.idFb);
                form.append("displayName","usuario Facebook");
                let respuestaregister= await axios.post(services, form);   
                let resp=respuestaregister.data;
                let codresp=resp.status;
                if(codresp!=undefined)
                {
                    //codigo de error
                    createAviso("Ha ocurrido un error por favor intentelo más tarde");
                    //setTimeout(function() {   this.$emit('close-sms') }, 1500);
                }
                else
                {//registro existoso
                    let params = "correo="+this.nombreFb+"&password="+this.idFb+"&userName="+this.nombreFb+"&nombreCompleto="+this.nombreFb+"&telefono="+this.nombreFb;
                    comunicateWebView("logg  u  er",params);
                }
                //alert("rspuesta: "+JSON.stringify(resp)+" respuesta2: "+JSON.stringify(respuestaregister));
            }
            catch (error) {
               createAviso("Ha ocurrido un error por favor intentelo más tarde");
            }

        },
        signInGoogle() {
            //console.log("request-google en Login.js");
            this.$emit("sign-in-google");
        },
        requestApple() {
          console.log("apple");
          this.$emit("request-apple");
        },
        setActiveresetPassword() {
          //alert("diste click");
          this.$emit("active-password");
        },
        requestPhone(){
          this.$emit("active-phone");
           // alert("dio click");
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


            <!--Inicio de sesion-->
            <div class="container" style="display: contents;text-align: center;">
                <component-form
                    :schema="formSchema"
                    :data="formDefaultData"
                    :buttons="buttons" style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                    @on-submit="onSubmit"
                ></component-form>
                
                <!--Boton inicio de sesion con Google-->
                <div class="col-sm-4" style="display: contents;text-align: center;">
                    <button 
                    class="btn btn-primary"
                    style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                    @click="signInGoogle"  
                    id="buttonToGoogle"
                    ><img src='../images/icon_google.png' style='height:24px'>
                    <span>Continuar con Google</span>
                    </button>
                </div>

                <div class="row" style="margin-bottom:4%;">

                    <div class="col-sm-12"><p class="textoLogin">¿Olvidaste tu contraseña? <a href="#" @click="recuperarPass" class="subtextoLogin">Recuperala aqui</a></p></div>
                    <div class="col-sm-12"><p class="textoLogin"> <a href="#" @click="setActiveRegister" class="subtextoLogin">Registrate aqui</a></p></div>
      
                    <div class="col-sm-3" style="margin-left: auto;margin-right: auto;">
                      <a style="color: black;" href="uniwebview://close">
                        <button class="btn ios-btn-primary mt-3" id="botonSalir"><img src='../images/icon-salir.png' style=' height:18px'></img></button>
                      </a>
                    </div>

                    <div class="col-sm-12" style="margin-top:4%;display:block">
                      <p class="textoLogin"> -------------- Bienvenido --------------</p>
                    </div>

                    <!--<div class="col-sm-4" v-show="buttongmailactive">-->
                    
                    <div class="col-sm-6" v-show="buttongmailactive">
                      <primary-button-block  
                      class="button-apple  mt-3" 
                      :field="buttonToFacebook" 
                      @clicked-button="requestFacebook" 
                      id="buttonToFacebook">
                      </primary-button-block>
                    </div>
                    
                </div>

                <!--<p class="textoLogin">¿Olvidaste tu contraseña? <a href="#" @click="recuperarPass" class="subtextoLogin">Recuperala aqui</a></p>
                    <p class="textoLogin">¿No tienes cuenta? <a href="#" @click="setActiveRegister" class="subtextoLogin">Registrate aqui</a></p>
                -->
                <!--<div  style="text-align: center;">
                <p  class="textoLogin cancel"><a @click="hideLogin" style="color: #00e7fffa;text-decoration: underline;-webkit-filter: blur(0px);filter: blur(0px);">Cancelar</a></p>
                </div>-->
                 
            </div>
        </div>
    `
}