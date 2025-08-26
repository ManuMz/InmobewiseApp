let modalToSmsCode = {

    props: {
    isActive:{
        type:Boolean,
        default:false
    },
    initialize:{
        type:Object,
        default:null
    },
    
    },
    data() {
        return {
            formSchema: {
                fields: [
                    {
                        type: 'text-input',
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
            formSchema2: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'input_number_phone',
                        placeholder: 'Número de telefono',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(letters.length > 0){
                                return {isValid : false, msg : "Esta campo no permite letras"};
                                
                            }else if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else if(value.length < 10){
                                return {isValid : false, msg : "Debe tener 10 números"};
                            }
                            else if(value.length > 10){
                                return {isValid : false, msg : "No puedes tener mas de 10 números"};
                            }else{
                                
                                
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                    {

                    }
                ]
            },
            formSchema3: {
                fields: [
                    {
                        type: 'text-input',
                        name: 'fullname',
                        placeholder: 'Nombre completo',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                           
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else if(value.length < 12){
                                return {isValid : false, msg : "Debe tener 12 caracteres como mínimo"};
                            }
                            else if(value.length > 50){
                                return {isValid : false, msg : "Debe tener 50 caracteres como máximo"};
                            }else{
                                
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                    {
                        type: 'text-input',
                        name: 'user_name',
                        placeholder: 'Nombre de usuario',
                        validation:function(value){
                            let letters = value.split('').filter(x => /\d/.test(x) == false);
                            if(value.length == 0){
                                return {isValid : false, msg : "Campo requerido"};
                            }else if(value.length < 7){
                                return {isValid : false, msg : "Debe tener 7 caracteres como mínimo"};
                            }
                            else if(value.length > 50){
                                return {isValid : false, msg : "No puedes tener mas de 50 números"};
                            }else{
                                
                                
                                return {isValid : true, msg : ""};
                            }
                        }
                    },
                ]
            }
            ,
            formDefaultData: {
                input_sms_code: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }
            },
            formDefaultData2: {
                input_number_phone: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }
            },
            formDefaultData3: {
                user_name: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                },
                fullname: {
                    value: '',
                    error:{
                        isActive:false,
                        message:"Campo requerido"
                    }
                }
            },
            buttons:{   
            },
            buttons2: {
              },
            container1:false,
            container2:true,
            container3:false,
            isDisabled0: true,
            begined: false,
            begined01: false,
            phone:"",
            codigoverif:"",
            data0:"",
            fiish:false,
            entrada:0,
            userdata:"",
            nomusuario:"",
            nomcompl:""
        }
    },
    watch:{
        'formDefaultData.input_sms_code.value':function(newValue, oldValue){
            let field = this.formSchema.fields.filter(x => x.name == "input_sms_code");
            let res = field[0].validation(newValue)
            this.formDefaultData.input_sms_code.error.isActive = !res.isValid
            this.formDefaultData.input_sms_code.error.message = res.msg
            this.codigoverif=newValue;
        },
        'formDefaultData2.input_number_phone.value':function(newValue, oldValue){
            let field = this.formSchema2.fields.filter(x => x.name == "input_number_phone");
            let res = field[0].validation(newValue)
            this.formDefaultData2.input_number_phone.error.isActive = !res.isValid

            this.formDefaultData2.input_number_phone.error.message = res.msg


            if(this.begined==false)
            {
               // alert("a recapcha");
              //this.initrecapcha();
              this.begined=true;
            }

            if(res.isValid==true)
            { this.isDisabled0=false;

              //  alert("es valido: "+this.isDisabled0);
            }
            else
            {
                this.isDisabled0=true;
            }

            this.phone=newValue;

        },
        'formDefaultData3.user_name.value':function(newValue, oldValue){
            let field = this.formSchema3.fields.filter(x => x.name == "user_name");
            let res = field[0].validation(newValue)
            this.formDefaultData3.user_name.error.isActive = !res.isValid
            this.formDefaultData3.user_name.error.message = res.msg
            //this.codigoverif=newValue;
            this.nomusuario=newValue;

        },
        'formDefaultData3.fullname.value':function(newValue, oldValue){
            let field = this.formSchema3.fields.filter(x => x.name == "fullname");
            let res = field[0].validation(newValue)
            this.formDefaultData3.fullname.error.isActive = !res.isValid
            this.formDefaultData3.fullname.error.message = res.msg
            //this.codigoverif=newValue;
           this.nomcompl=newValue;
        }
       
    },
     mounted()
     {
        // alert("acaba de entrar: "+this.entrada);
          

     }
     ,updated()
     {
        //alert("aupdate")
       // alert("entrada: "+this.entrada);
       this.initrecapcha();

         
    }
     ,beforeDestroy()
     {
         //alert("before destroy");
     },
     destroyed()
     {
         //alert("destoryed");
     },
     beforeUpdate()
     {
         //alert("BEFORE UPDATE");
     }
     ,beforeMount()
     {
         //alert("before mounted");
     },
     created()
     {
         //alert("created");
     },
     beforeCreate()
     {
         //alert("2before create");
     }

    ,
    methods: {
        initrecapcha()
        {
             // alert("inicializa recaptcha");
             const self = this;
             try {
                //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button');
                
                /*
                let widgetId = window.grecaptcha.render('sign-in-button', {
                    sitekey: 'AIzaSyDp2gyFs-OHmMGngXfKLe_kJNyOJVZI_wQ',
                    size: 'invisible',
                    // the callback executed when the user solve the recaptcha
                    callback: (response) => {
                      alert("es aceptado");
                    
                    }
                  })
                */
                   // alert("inicializa 2");
                this.entrada=1;   
                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
                    size: 'invisible',
                    callback: () => {
                        if(this.isDisabled0==false)//el campo es correcto
                        {
                              //this.change();
       
                               //alert("listo");
                            this.initrecapcha2()
                        }
       
       
                    },
                  });
                     
     
     
             }
             catch(error)
             {
                    //alert("error: "+JSON.stringify(error));
                     grecaptcha.reset(window.recaptchaWidgetId);
                       //this.exit();
                     this.reiniciar();
                     createAviso("Ha ocurrido un error por favor intentelo más tarde");
             }
     
             window.recaptchaVerifier.render().then((widgetId) => {
                //alert("widged: "+widgetId);
               window.recaptchaWidgetId = widgetId;
             }); 


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
          },
          initrecapcha3() {
            let phoneNumber = "+52 "+ this.phone;
            let appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function(confirmationResult) {
                    let code = window.prompt("Please enter your code");
                    return confirmationResult.confirm(code);
                })
                .then(function(result){
                    //alert("Result" + JSON.stringify(result));
                })
                .catch(function (err) {
                    //alert("Err" + JSON.stringify(err));
                });
          },
          async initrecapcha2()
            {
                //alert("initcapchag2 con numero: "+this.phone);
              try{
                //let phoneNumber = 
                let phoneNumber = "+52 "+this.phone;
                let appVerifier = window.recaptchaVerifier;
                 let response= await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
                                    //firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  
               // alert("response: "+JSON.stringify(response));
  
                this.container1=true;
                this.container2=false;
                this.container3=false;
  
                window.confirmationResult = response;
  
              }catch (error) {
                 // alert("ha ocurrido un error en: "+JSON.stringify(error));
                 //ocurrio un error
                    createAviso("Ha ocurrido un error por favor intentelo más tarde");  
                 grecaptcha.reset(window.recaptchaWidgetId);
                       //this.exit();
  
                     this.reiniciar();
                    
                }
            }
          ,
          async getresponsecode()
          {
  
              // alert("codigo a enviar: "+this.codigoverif);
  
             //let response= await confirmationResult.confirm(this.codigoverif);
            // alert("respuesta codigo de confirmacion"+JSON.stringify(response));
  
             try {
               let response= await confirmationResult.confirm(this.codigoverif);
              // alert("respuesta codigo de confirmacion"+JSON.stringify(response));
               let user = response.user;
               let telefono=this.phone;
                 /*
               let services = this.initialize.use_mode == "testing" ?
                   "https://arvispace.com/serviciosASARAmbientePruebas/validarCorreoLogin.php" :
                   "https://arvispace.com/serviciosASAR/validarCorreoLogin.php";
               */

                   let services ="https://arvispace.com/serviciosASAR/validarCorreoLogin3.php";
                   let form = new FormData()
                   form.append("correo",telefono)
                   form.append("displayName","usuario telefono")
                   
                   let respuestaregister= await axios.post(services, form);
                   
                   //alert("respuesta: "+JSON.stringify(respuestaregister));
                    let resp=respuestaregister.data;
                     //  alert("ultima respuesta: "+JSON.stringify(respuestaregister));
                   
                  //  alert("status respuesta2: "+resp);
                    if(parseInt(resp)==120)
                    {  //no existe el usuario

                        //existe el estatus entonces no existe el usuario
                    //    alert("no existe el usuario");
                        this.userdata=user;
                        this.container1=false;
                        this.container2=false;
                        this.container3=true;
                    }
                    else
                    { //existe el usuario
                      
                      // alert("exite el usuario");
           
         
                     let user = respuestaregister.data[0];
                    
                     grecaptcha.reset(window.recaptchaWidgetId);
                     //alert("usuario: "+JSON.stringify(user));
                     this.startSession(user);
              
                          
                    }


  
                } catch (error) {
                   // alert("error: "+JSON.stringify(error));
                //ocurrio un error
                createAviso("El código de verificacion es incorrecto por favor intentelo más tarde");  
                this.reiniciar();
               
               //2461375273
               //setTimeout(function() {   this.$emit('close-sms') }.bind(this), 1500);
                setTimeout(function() {   this.$emit('cancel') }.bind(this), 1500);//este regresa al login.js
               
                // this.initrecapcha();
               // grecaptcha.reset(window.recaptchaWidgetId);
                // grecaptcha.reset(window.recaptchaWidgetId);    
            }
  
          },
          reiniciar()
          {
              //this.initrecapcha();
            this.container1=false;
            this.container2=true;
            this.container3=false;
  
            this.formDefaultData.input_sms_code.error.isActive = false;
            this.formDefaultData.input_sms_code.error.message = "";
            this.formDefaultData.input_sms_code.value = "";
  
            this.formDefaultData2.input_number_phone.error.isActive = false;
            this.formDefaultData2.input_number_phone.error.message = "";
            this.formDefaultData2.input_number_phone.value = "";
  
  
          },
          startSession(user){
              let params = "correo="+user.correo+"&password="+user.password+"&userName="+user.usuario+"&nombreCompleto="+user.nombreCompleto+"&telefono="+user.telefono;
              comunicateWebView("logguer",params);
          },
          onSubmit2(){
            //alert("codigo a enviar: "+this.codigoverif);
  
  
            /*
            window.confirmationResult.confirm(this.codigoverif).then(function (result) {
               alert("resultado exitoso: "+JSON.stringify(result));
  
               this.revisatel();
               // User signed in successfully.
              var user = result.user;
              // ...
              //route to set password !
  
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              // ...
              alert("error");
            });
           */
  
             confirmationResult.confirm(this.codigoverif).then(function (result) {
  
              //alert("resultado exitoso: "+JSON.stringify(result));
             // this.$emit("request-sms-code")
              //modalToSmsCode.smsCodeIsActive = false;
              this.data0=result;
              this.fiish=true;
              //modalToSmsCode.change();
              //revisatel();
              //return result
  
  
          }).catch(function (error) {
             // alert("error: "+error);
          }).finally(() => {
              //alert("i should go second "+this.data0);
              //this.revisatel();
          });
  
          },
          change()
          {
               // alert("cambia");
                this.container1=true;
                this.container2=false;
          },
          revisatel()
          {
              let user = this.data0.user;
             // alert("user "+JSON.stringify(this.data0.user)+"data: "+JSON.stringify(this.data0));
  
          },
          exit()
          {
              /*
            setTimeout(function() {
                this.$emit('close-sms');
               },5000);
              this.reiniciar();
             */
                //this.$emit('close-sms');//este regresa al ar-anim.js
                this.$emit("cancel");//regresa al login.js
          },
          enviar()
          {
            //grecaptcha.execute();
            //grecaptcha.render;  
              window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
                  'size': 'invisible',
                  'callback': function(response) {
                        console.log(response);
                        //alert('Response' + reponse);
                   },
                   'expired-callback': function(err) {
                        //alert('Err' + err);
                   } 
              });
             // alert("enviar 2");
             this.initrecapcha3()
          
          },
        async regisuser()
          {
              //alert("a registrar usuario");
 

             try{
                let services ="https://arvispace.com/serviciosASAR/validarCorreoLogin2.php";
                let form = new FormData()
                form.append("correo",this.phone)
                form.append("displayName","usuario telefono")
                form.append("nombrecompleto",this.nomcompl)
                form.append("nombreusuario",this.nomusuario) 
                let respuestaregister= await axios.post(services, form);
  
                let resp=respuestaregister.data.status;
                 // alert("resp: "+respuestaregister.data);
                 
                  let resp0=respuestaregister.data;
                 // alert("ultima respuesta: "+resp0);

                if(parseInt(resp0)==120)
                {//hubo un error
  
            
  
                   createAviso("Ha ocurrido un error por favor intentelo más tarde");
                   this.reiniciar();

                 }
                 else
                {//no existen datos entonces se registro al usuario
                    //alert("usuario: "+JSON.stringify(user));
                    // console.log(response.data)
                    //todo empieza aqui
         
                     let user = respuestaregister.data[0];
                     this.startSession(user);
                   
                   //this.container1=false;
                  // this.container2=false;
                  //this.container3=true;
                 grecaptcha.reset(window.recaptchaWidgetId);
                }   

             }
             catch (error) {
                createAviso("Ha ocurrido un error por favor intentelo más tarde");

             }
             


            


          }
      

    },
    components:{
       // 'rounded-button':roundedButton,
        'component-form':componentForm,
    },
    template:`
        <div class="container-fluidSMS" v-show="isActive" >
            <div class="login-head">
            </div>
            
            <div>
                <img src="https://arvispace.com/lib/ImagenesPedidos/fondos/logo.png" id="imagenLogo"></img>
            </div>
           <!--
            <rounded-button style="-webkit-filter: blur(0px);filter: blur(0px);color:white;"
            ></rounded-button>
             -->

            <transition name="show-question-sms">
                <div v-if="isActive" class="modal-sms-code">
                    <div class="container" >
                    
                    
                        <div v-show="container2" style="text-align: center;">
                            <component-form
                             :schema="formSchema2"
                             :data="formDefaultData2"
                             :buttons="buttons2" style="margin-top: 8%;margin-bottom: 0%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                             >
                            </component-form>
                                  
                            <button type="submit" class="btn ios-btn-primary"    id="sign-in-button" ><span>enviar teléfono</span></button>
                        </div>
                        

                        
                        <div v-show="container1" style="text-align: center;">
                              <component-form
                               :schema="formSchema"
                                :data="formDefaultData" 
                               :buttons="buttons" style="margin-top: 8%;margin-bottom: 0%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                                >
                               </component-form>  
    
                           <button type="submit" class="btn ios-btn-primary"  @click="getresponsecode()" style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"><span>Enviar código</span></button>
                        </div>

                        
                        <div v-show="container3" style="text-align: center;">
                              <component-form
                              :schema="formSchema3"
                              :data="formDefaultData3" 
                              :buttons="buttons" style="margin-top: 8%;margin-bottom: 0%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"
                              >
                            </component-form>  

                            <button type="submit" class="btn ios-btn-primary"  @click="regisuser()" style="margin-top: 8%;margin-bottom: 7%;-webkit-filter: blur(0px);filter: blur(0px);width: 100%;"><span>Registrarse</span></button>       

                        </div>
                        
                
                         
                         <div style="margin-top: 25px;text-align: center;">
                            <p  class="textoLogin cancel"><a href="#" @click="exit()" class="subtextoLogin">Cancelar</a></p>
                         </div>
                    
    
    
                    </div>
                </div>
            </transition>
        </div>
    `
}