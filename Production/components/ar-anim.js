let arAnim = {
    props:{
        isActive:false
    },
    data(){
        return{
            buttonHeaderUser:{
                type:'roundend-button',
                content:"<i class='icon-Usuario bold'></i>",
                typeButton:'button',
                align:'center',
                size:''
            },
            os:"",
            buttonToFacebook: {
                type: "roundend-button",
                content:"<span class='mr-3'>Inicie sesión con</span><i class='fab fa-facebook-square'></i>",
                typeButton: "button",
                childClass: "phone",
                size: "",
              },
              buttonToGoogle: {
                type: "roundend-button",
                content:"<span class='mr-3'>Inicie sesión con</span><i class='fab fa-google'></i>",
                typeButton: "button",
                childClass: "phone",
                size: "",
              },
              buttonToApple: {
                type: "roundend-button",
                content:"<span class='mr-3'>Inicie sesión con</span><img src='../images/color_apple_logo.png' style='width:18px;'>",
                typeButton: "button",
                childClass: "apple",
                size: "",
              },
              buttonToPhone: {
                type: "roundend-button",
                content:"<span class='mr-3'>Inicie sesión con</span><i class='fas fa-phone-alt'></i>",
                typeButton: "button",
                childClass: "phone",
                size: "",
              },
              buttonphoneactive:true,
              buttonfbeactive:true,
              buttongmailactive:true

        }
    },
    components:{

        'primary-button-block': primaryButtonBlock,
        'rounded-button':roundedButton
    },
    mounted(){
        this.os = getMobileOperatingSystem();
         
        this.buttonphoneactive=true;
        this.buttonfbeactive=true;
        this.buttongmailactive=true;  

    },
    methods:{
        handleRegister(){
            console.log("Register")
            this.$emit('active-register')
          },
           handleLogin(){
        this.$emit('active-login')
         },requestFacebook() {
            console.log("facebook")
            this.$emit("request-facebook");
          },
          requestGoogle() {
            this.$emit("request-google");
          },
          requestApple() {
            console.log("apple")
            this.$emit("request-apple");
          },
          recuperarPass() {
            this.$emit("reset-password");
          },
          requestPhone()
          {
            this.$emit("active-phone");
          },
          salir()
          {
            window.location.replace('uniwebview://close');
          }

    },
    template:`
        <div class="container-fluidLogin" v-show="isActive">

            <div class="login-head">
            </div>
            
            <div>
            <img src="https://arvispace.com/lib/ImagenesPedidos/fondos/logo.png" id="imagenLogo"></img>
            </div>
            
            <rounded-button
            :field="buttonHeaderUser" style="-webkit-filter: blur(0px);filter: blur(0px);color:white;"
            ></rounded-button>

            <!--<div class=logo>
                <img class=logo-img src="../images/logo.png" alt="">
            </div>-->

          
            <div class="buttons mb-5">
              <button class="btn ios-btn-primary mt-3" @click="handleLogin" id="botonesIniciarSesion">Iniciar Sesión</button>


              <!-- 
              <primary-button-block class="button-facebook  mt-3" v-if="os != 'ios'"
                  :field="buttonToFacebook" @clicked-button="requestFacebook">
              </primary-button-block>
              -->
              <!--
              <primary-button-block v-if="1 > 5" :field="buttonToGoogle" @clicked-button="requestGoogle">
              </primary-button-block>
              -->
              <!--
              <primary-button-block class="button-apple  mt-3" v-if="os == 'ios'" :field="buttonToApple"
                  @clicked-button="requestApple">
              </primary-button-block>
               -->

              <div v-show="buttonphoneactive">
                <primary-button-block  class="button-apple  mt-3" :field="buttonToPhone" @clicked-button="requestPhone" id="botonIniciarTelefono">
                </primary-button-block>
              </div>

              <div v-show="buttonfbeactive">
                <primary-button-block  class="button-apple  mt-3" :field="buttonToFacebook" @clicked-button="requestFacebook" id="buttonToFacebook">
                </primary-button-block>
              </div>

              <div v-show="buttongmailactive">
                <primary-button-block  class="button-apple  mt-3" :field="buttonToGoogle" @clicked-button="requestGoogle" id="botonIniciarGmail">
                </primary-button-block>
              </div>


              <button class="btn ios-btn-primary mt-3" @click="handleRegister" id="botonRegistrarse"><span>Registrate</span></button>

              <button class="btn ios-btn-primary mt-3"  id="botonSalir"><a style="color: black;" href="uniwebview://close" >Salir</a></button>
            </div>

        </div>
    `
}