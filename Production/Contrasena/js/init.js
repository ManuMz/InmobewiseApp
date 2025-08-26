/**
 * Area para testing comentar en prodduction
 */

// $(document).ready(function(){
//     content.init("testing","1","{}")
// });


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
            isLoginActive:true,
            isArAnimActive:false,
            initialize:null,
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
    beforeCreate()
    {
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
            //alert("inicia contenido 2");
            this.isRegisterActive = !this.isRegisterActive;//para redirigir a ar-anim.js
            this.isArAnimActive=!this.isArAnimActive;
            this.isLoginActive = true;
            this.isRegisterActive = false;
            this.isArAnimActive = false;

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
            let services =  "https://arvispace.com/serviciosASAR/cambioContrasena.php";
            let form = new FormData();
            form.append('correo',formSubmitted.data.input_user.value);
            form.append('password',formSubmitted.data.input_password.value);
            form.append('passwordNew',formSubmitted.data.input_passwordNew.value);
            createQuestion("¿Realmente deseas cambiar tu contraseña actual? ", "Su contraseña será modificada " +  " ¿Desea continuar?",true,()=>{

            axios.post(services,form).then(function(response){
                
                if(response.status==200){
                    formSubmitted.buttons.content = "Cambiar";

                    
                    let user = response.data[0];
                    if(user.correo != undefined){
                        createAviso("Contraseña cambiada exitosamente");
                        content.startSession(user);
                    }else{

                        formSubmitted.buttons.content = "Cambiar";
                        formSubmitted.buttons.disabled = false;
                        createAviso(user.msg);
                        console.log(user.msg);
                    }
                }
            }).catch(function(error){
                console.log(error);
            });
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

        },
        requestGoogle(){
            var provider = new firebase.auth.GoogleAuthProvider();
            this.loadLogin = true
            provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
            firebase.auth().signInWithRedirect(provider);
 
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

           },
        
    },
    watch:{
    }
});