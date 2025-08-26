/**
 * Area para testing comentar en prodduction
 */

/*$(document).ready(function(){
    content.init("testing","1","{}")
});
*/

let content = new Vue({
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
            isArAnimActive:true,
            initialize:null,
            isRegisterActive:false,
            isLoginActive:false,
            //isLoginActive:true,
            smsCodeIsActive:false,
            pendingRegister:null,
            loadLogin:false,
            resetPassIsActive:false
        }
    },
    mounted() {
       
      },      
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
           // alert("inicia contenido 2");

            this.isRegisterActive = !this.isRegisterActive;
            this.isArAnimActive=!this.isArAnimActive;

        },
        setContent3(){ //se agrego al para llamar al de recuperacion de contraseña
            // alert("inicia contenido 2");
             this.resetPassIsActive = !this.resetPassIsActive;
             this.isArAnimActive=!this.isArAnimActive;
         },
        startSession(user){
            let params = "correo="+user.correo+"&password="+user.password+"&userName="+user.usuario+"&nombreCompleto="+user.nombreCompleto+"&telefono="+user.telefono;
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
                     
                      
                      setTimeout(function() {  comunicateWebView("open-profile","postal_code="+1); }, 5000);
                      
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
            let services = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/login.php" : "https://arvispace.com/serviciosASAR/login.php";
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
                "https://arvispace.com/serviciosASARAmbientePruebas/validarCorreoLogin.php" :
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
            

            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
              /** @type {firebase.auth.OAuthCredential} */
              var credential = result.credential;
    
              // The signed-in user info.
              var user = result.user;
    
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var accessToken = credential.accessToken;
              alert("has iniciado sesion de facebook");
    
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
    
               alert("ha ocurrido un error");
    
              
            });


            



        },
        requestGoogle(){
           
           alert("sesion google");
            /*
            var provider = new firebase.auth.GoogleAuthProvider();
            this.loadLogin = true
            provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
            firebase.auth().signInWithRedirect(provider);
           */



            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
              /** @type {firebase.auth.OAuthCredential} */
              let credential = result.credential;
              let token = credential.accessToken;
              let user = result.user;
              let email=result.email;
              alert("todo ha estado correcto con el inicio de sesion con: "+" --- "+JSON.stringify(user));
              
              //console.log("Has iniciado sesión con Google!");
            }).catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
              let email = error.email;
              let credential = error.credential;
              console.log(error.message);
               alert("error de mensaje: "+errorMessage+" erorcode: "+errorCode)  

            });
        
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
           activatePhone()
           {

               this.smsCodeIsActive = !this.smsCodeIsActive;
               this.isArAnimActive=!this.isArAnimActive;


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