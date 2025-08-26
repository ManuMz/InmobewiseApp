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
                content:
                  "<span class='mr-3'>Inicie sesión con</span><img src='../images/color_facebook.png' style=' height:18px'>",
                typeButton: "button",
                childClass: "fb",
                size: "",
              },
              buttonToGoogle: {
                type: "roundend-button",
                content:
                  "<img src='../images/color_google_plus.png' style='width:24px;'>",
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
                content:
                  "<span class='mr-3'>Inicie sesión con</span><i class='fas fa-phone-alt'></i>",
                typeButton: "button",
                childClass: "phone",
                size: "",
              },
        }
    },
    components:{

        'primary-button-block': primaryButtonBlock,
        'rounded-button':roundedButton
    },
    mounted(){
        this.os = getMobileOperatingSystem()
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

              <primary-button-block  class="button-apple  mt-3" :field="buttonToPhone" @clicked-button="requestPhone" id="botonIniciarTelefono">
              </primary-button-block>
              

              <button class="btn ios-btn-primary mt-3" @click="handleRegister" id="botonRegistrarse"><span>Registrate</span></button>

              <a style="color: black;" href="uniwebview://close" ><button class="btn ios-btn-primary mt-3"  id="botonSalir">Salir</button></a>
            </div>

        </div>
    `
}