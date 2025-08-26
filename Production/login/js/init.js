/**
 * Area para testing comentar en prodduction
 */

/*$(document).ready(function(){
    content.init("testing","1","{}")
});
*/
//Se importa la autenticacion desde "firebase.js"
import {auth} from '../components/firebase.js';

//Autenticacion con google 
import { GoogleAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

//Options API
//objeto de opciones
let content = new Vue({ //estructura createApp:any
    el:"#login",
    components:{
        'component-login':login,
        'component-register':register,
        'user-principal':userPrincipal,
        'ar-anim':arAnim,
        'modal-to-sms-code':modalToSmsCode,
        'loading':loadingDownload,
        'reset-password':resetPassword
    }, 
    data(){
        return{
            
            isLoginActive:true,
            isArAnimActive:false,
            initialize :null,
            isRegisterActive:false,
            //isLoginActive:true,
            smsCodeIsActive:false,
            pendingRegister:null,
            loadLogin:false,
            resetPassIsActive:false,
            nombreFb:"",
            idFb:"",
            idG:"",
            mailG:"",
            nameG:""
        }
    },

    async created(){
        await this.requestGoogle();

    },

    beforeCreate(){/*
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
        }); */
    },
    mounted() {
       
    },

    // Los métodos son funciones que modifican el estado y activan actualizaciones.
    // Se pueden vincular como controladores de eventos en plantillas.      
    methods: {
        init(use_mode, id_app, data){
            this.initialize = {
                use_mode: use_mode,
                id_app: id_app,
                data: JSON.parse(data)
            }
        },
        setContent(){
            //alert("inicia contenido");
            this.isRegisterActive = !this.isRegisterActive;
            this.isLoginActive = !this.isLoginActive;

        },
        setContent2(){
            //alert("inicia contenido 2");
            this.isRegisterActive = !this.isRegisterActive;//para redirigir a ar-anim.js
            this.isArAnimActive=!this.isArAnimActive;
            this.isLoginActive = true;
            this.isRegisterActive = false;
            this.isArAnimActive = false;

            // this.isRegisterActive = false;
            // this.isLoginActive = true;
            // this.isArAnimActive=false;
            // this.resetPassIsActive = false;
            // this.smsCodeIsActive=false;
        },
        setContent3(){ //se agrego al para llamar al de recuperacion de contraseña
           // alert("inicia contenido 2");
            this.resetPassIsActive = !this.resetPassIsActive;
            this.isArAnimActive=!this.isArAnimActive;
        },
        startSession(user){
            let params = "correo="+user.correo+"&password="+user.password+"&userName="+user.usuario+"&nombreCompleto="+user.nombreCompleto+"&telefono="+user.telefono;
            //alert("params: "+params);
            comunicateWebView("logguer",params);

        },
        onRegister(formSubmitted){
            //let services = this.initialize.use_mode == "testing" ?
              //  "https://arvispace.com/serviciosASARAmbientePruebas/insertarUsuario.php" :
                //"https://arvispace.com/serviciosASAR/insertarUsuario.php";

          //   alert("correo: "+formSubmitted.data.input_email.value+" pass: "+formSubmitted.data.input_password.value+" usuario: "+formSubmitted.data.input_apodo.value+" nombre completo: "+formSubmitted.data.input_nombre.value+" telefono: "+formSubmitted.data.input_telefono.value);

          let services="https://arvispace.com/serviciosASAR/insertarUsuario.php"
          


            let form = new FormData();
            form.append('correo',formSubmitted.data.input_email.value);
            form.append('password',formSubmitted.data.input_password.value);
            form.append('usuario',formSubmitted.data.input_apodo.value);
            form.append('nombreCompleto',formSubmitted.data.input_nombre.value);
            form.append('telefono',formSubmitted.data.input_telefono.value);
            axios.post(services,form).then(function(response){
                formSubmitted.buttons.content = "Registrar";
                formSubmitted.buttons.disabled = false;

                let resp=parseInt(response.status);
                //alert("estatus registro: "+resp);
                let respuesta0 = response.data[0];

                // alert("respuesta: "+ JSON.stringify(respuesta0)+ " ----" +respuesta0.status);
                
                if(respuesta0.status==1)
                {  
                    /*
                    Swal.fire({
                        title: "<span style='color:#000000'>Tu registro ha sido exitoso</span>",
                        text: "Presione el boton 'ok' para seguir adelante",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#c1c1c1',
                        confirmButtonText: "<span style='color:#000000'>OK</span>",
                        cancelButtonText: 'No'
                      }).then((result) => {
                        if (result.value) {
                           // window.location.replace('https://sandbox.arvispace.com/front-end/v1/login/index.html');
                          // window.location.replace('../login/');
                           //webViewManager.showWebView(url);
                           //comunicateWebView("location","postal_code="+this.postalCode);
                           //this.$emit('open-register');
                           comunicateWebView("open-profile","postal_code="+1);
                           /*
                           formSubmitted.data.input_email.value="";
                           formSubmitted.data.input_password.value="";
                           formSubmitted.data.input_r_password.value="";
                           formSubmitted.data.input_apodo.value="";
                           formSubmitted.data.input_nombre.value="";
                           formSubmitted.data.input_telefono.value="";
                           */
                      /*  }
                      });
                      */


                      createAviso("Se ha registrado el usuario exitosamente");
                     
                      
                      setTimeout(function() {  comunicateWebView("open-profile","postal_code="+1);}, 5000);
                      
                }
                else
                {
                       if(respuesta0.status==100)
                        {//el usuario ya existe
                            createAviso("El correo eléctronico o teléfono que intentas registrar ya existe, por favor intenta con otro correo eléctronico o teléfono.");
                           // comunicateWebView("open-profile","postal_code="+1);
                        }
                        else
                        {// ha ocurrido un error
                            createAviso("Ha ocurrido un error por favor inténtelo más tarde"); 

                            setTimeout(function() {  this.handleRegister(); }, 5000);
                        }

                }
                
             
            }).catch(function(error){

                formSubmitted.buttons.content = "Error"
                console.log(error);
            });
        },
        onSubmit(formSubmitted){
           // let services = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/login.php" : "https://arvispace.com/serviciosASAR/login.php";
            let services =  "https://arvispace.com/serviciosASAR/login.php";
            let form = new FormData();
            form.append('correo',formSubmitted.data.input_user.value);
            form.append('password',formSubmitted.data.input_password.value);
            axios.post(services,form).then(function(response){
                if(response.status==200){
                    formSubmitted.buttons.content = "Completado";
                    let user = response.data[0];
                    if(user.correo != undefined){
                        content.startSession(user);
                    }else{

                        formSubmitted.buttons.content = "Iniciar";
                        formSubmitted.buttons.disabled = false;
                        createAviso(user.msg);
                        console.log(user.msg);
                    }
                }
            }).catch(function(error){
                console.log(error);
            });
        },
        handleLogin(){

            //alert("se eta manejando el login");
            this.isLoginActive = !this.isLoginActive;
            this.isArAnimActive=!this.isArAnimActive;

        },
        handleRegister(){
           //alert("manejador de registro");
            this.isRegisterActive = !this.isRegisterActive;
            this.isArAnimActive=!this.isArAnimActive;
        },
        setActiveresetPassword(){ //agrego esto
            this.resetPassIsActive = !this.resetPassIsActive;
            this.isArAnimActive=!this.isArAnimActive;
        },
        loginSocialNetworks(dataUser){
            let services = this.initialize.use_mode == "testing" ?
                "https://arvispace.com/serviciosASAR/validarCorreoLogin.php" :
                "https://arvispace.com/serviciosASAR/validarCorreoLogin.php";

            let form = new FormData();
            form.append('correo', dataUser.correo);
            form.append('displayName', dataUser.nombreCompleto);
            axios.post(services,form).then((response) => {
                if(response.status==200){
                    let user = response.data[0];
                    console.log(response.data)
                    content.startSession(user);
                }else{
                    console.log("Error al obtener los datos")
                }
            }).catch((error)=>{
                console.log(error);
            });
        },
        requestFacebook(){
          /*   
        alert("request fb 2");

            let provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithRedirect(provider).then(() => 
            { 			               
                 firebase.auth().getRedirectResult().then(result => { 					
                    console.log(result); 					
                    // alert("resultado: "+result);
                    const that = this; 					
                    this.storage.set(TOKEN_KEY, result.user.refreshToken).then(res => 
                     { 							
                        that.authenticationState.next(true); 		
                        //alert("autentication: +"+taht);				
                      }); 				
                    }).catch(function(error) 
                    { 					
                      //  alert(error.message); 
                    }); 
            
                })
            */
            //let provider = new firebase.auth.FacebookAuthProvider();
           // this.loadLogin = true
           // firebase.auth().signInWithRedirect(provider);
            // var provider = new firebase.auth.FacebookAuthProvider();
            // firebase.auth().signInWithPopup(provider).then((result) => {
            //   /** @type {firebase.auth.OAuthCredential} */
            //   var credential = result.credential;
            //   // The signed-in user info.
            //   var user = result.user;
            //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //   var accessToken = credential.accessToken;
            //   let name=user.displayName;
            //   let uid=user.uid;

            //    this.nombreFb=name;
            //    this.idFb= uid;
            //    // alert("has iniciado sesion de facebook con: "+JSON.stringify(user));
            //    this.getresponseregisterfb();
            //    // ...
            // })
            // .catch((error) => {
            //   // Handle Errors here.
            //   var errorCode = error.code;
            //   var errorMessage = error.message;
            //   // The email of the user's account used.
            //   var email = error.email;
            //   // The firebase.auth.AuthCredential type that was used.
            //   var credential = error.credential;
            //   // alert("ha ocurrido un error");
            //   createAviso("Ha ocurrido un error por favor intentelo más tarde");
            // });
        },

        /*modificacion del metodo para INMOBEWISE*/
        //metodo asincrono
        async requestGoogle () {
            const googleProvider = new GoogleAuthProvider();
            
            try {
                //Se despliega la ventana emergente de google de manera asincrona, se guardan
                //las credenciales google del usuario
                const credentials = signInWithPopup(auth, googleProvider);

                console.log("Credenciales Google del usuario: " + credentials);

                //alert("todo ha estado correcto con el inicio de sesion");
                
                
            } catch (error) {
                console.log(error);
            }

            this.loadLogin = true
            provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
            firebase.auth().signInWithRedirect(provider);
            // let provider = new firebase.auth.GoogleAuthProvider();
            // firebase.auth().signInWithPopup(provider).then((result) => {
            //   /** @type {firebase.auth.OAuthCredential} */

            //   let user = result.user;
            //   let nombre=user.displayName;
            //   let email=user.email;
            //   let id=user.uid;
            //   //alert("todo ha estado correcto con el inicio de sesion con: "+JSON.stringify(user));
                 
            //    this.idG=id;
            //    this.mailG=email;
            //    this.nameG=nombre;               
            //    this.getresponseregistergoogle();

            //   //console.log("Has iniciado sesión con Google!");
            // }).catch((error) => {
            //   let errorCode = error.code;
            //   let errorMessage = error.message;
            //   let email = error.email;
            //   let credential = error.credential;
            //   console.log(error.message);
            //    //alert("error de mensaje: "+errorMessage+" erorcode: "+errorCode);  
            //    createAviso("Ha ocurrido un error por favor intentelo más tarde");
            // });
        },
        /*async getresponseregistergoogle()
        { 

            //alert("registrar en gmail: "+this.mailG+" -- "+this.nameG+" -- "+this.idG);
             try{
                let services ="https://arvispace.com/serviciosASAR/validarNomberGmail.php";
                let form = new FormData()
                form.append("nombreGmail",this.mailG);
                form.append("idGmail",this.idG);
                form.append("displayName",this.nameG);
                let respuestaregister= await axios.post(services, form);   
                let resp=respuestaregister.data;
                let codresp=resp.status;

                if(codresp!=undefined)
                {  //codigo de error
                    createAviso("Ha ocurrido un error por favor intentelo más tarde");
                }
                else
                {  //registro exitoso   
                    let params = "correo="+this.mailG+"&password="+this.idG+"&userName="+this.nameG+"&nombreCompleto="+this.nameG+"&telefono="+this.mailG;
                    comunicateWebView("logguer",params);
                }

             }
             catch (error) {
                createAviso("Ha ocurrido un error por favor intentelo más tarde");
             }

        },*/
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
                    comunicateWebView("logguer",params);
                }
                //alert("rspuesta: "+JSON.stringify(resp)+" respuesta2: "+JSON.stringify(respuestaregister));
            }
            catch (error) {
               createAviso("Ha ocurrido un error por favor intentelo más tarde");
            }

        },
        requestApple(){
            var provider = new firebase.auth.OAuthProvider('apple.com');
            this.loadLogin = true
            provider.addScope('email');
            provider.addScope('name');
            firebase.auth().signInWithRedirect(provider);
        },
        resetPassword(){
            //  alert("reset pass");
            this.isRegisterActive = false;
            this.isLoginActive = false;
            this.resetPassIsActive = true
        },
        closeResetPassword(){
              // alert("se cierra");
              // this.isRegisterActive = false;
            this.isLoginActive = true;
            this.resetPassIsActive = false;
           
        },
        closesms(){
            this.smsCodeIsActive = !this.smsCodeIsActive;
            this.isArAnimActive=!this.isArAnimActive;
        },
        closeRegister(){ //nuevo que agregue 23-08-2021
                // alert("se cierra");
                // this.isRegisterActive = false;
            this.isLoginActive = true;
            this.isRegisterActive = false;
        },
        closetosms(){ //cuando se cierra el boton de cancelar de validar por telefono
            this.isLoginActive = true;
            this.isRegisterActive = false;
            this.isArAnimActive=false;
            this.resetPassIsActive = false;
            this.smsCodeIsActive=false;
        },
        activatePhone()
        {
            //alert("diste click al telefono");
            this.isArAnimActive=false;
            this.isLoginActive = false;
            this.isRegisterActive = false;
            this.resetPassIsActive = false;
            this.smsCodeIsActive=true;
               //this.smsCodeIsActive = !this.smsCodeIsActive;
               //this.isArAnimActive=!this.isArAnimActive;


             /*
        setTimeout(function() {
            //alert("recapcha");

            const self = this;

            // Start Firebase invisible reCAPTCHA verifier
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
              size: 'invisible',
              callback: () => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                alert("a llamar");
                //self.sendSMS();




                var phoneNumber = "+52 2461550696"
                var appVerifier = window.recaptchaVerifier;
                firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function (confirmationResult) {

                       alert("confirm: "+confirmationResult);
                        content.smsCodeIsActive = true;
                        window.confirmationResult = confirmationResult
                        content.pendingRegister = formSubmitted
                    }).catch(function (error) {
                        alert("error telefono: "+telefono);
                        createAviso(error)
                        console.log(error)
                        grecaptcha.reset(window.recaptchaWidgetId)
                });





              },
            });

            window.recaptchaVerifier.render().then((widgetId) => {

              // alert("widged: "+widgetId);
              window.recaptchaWidgetId = widgetId;
            });


       },3000);
          */

        },
        
    },
    watch:{
    }
});