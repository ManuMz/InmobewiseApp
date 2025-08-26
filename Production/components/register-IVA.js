let register = {
  props: {
    isActive: false,
  },
  components: {
    "rounded-button": roundedButton,
    "rounded-button": roundedButton,
    "component-form": componentForm,
  },
  data() {
    return {
      buttonHeaderUser: {
        type: "roundend-button",
        content: "<i class='icon-Usuario'></i>",
        typeButton: "button",
        align: "center",
        size: "",
      },
      formSchema: {
        fields: [
          {
            type: "text-input",
            name: "input_nombre",
            placeholder: "Nombre completo",
            validation: function (value) {
              if (value != "") {
                return { isValid: true, msg: "" };
              } else {
                return { isValid: false, msg: "Campo Requerido" };
              }
            },
          },
          {
            type: "text-input",
            name: "input_apodo",
            placeholder: "Nombre se usuario (apodo)",
            validation: function (value) {
              if (value.length == 0) {
                return { isValid: false, msg: "Campo Requerido" };
              } else if (value.length < 4) {
                return {
                  isValid: false,
                  msg: "Debe tener minimo 4 caracteres",
                };
              } else {
                return { isValid: true, msg: "" };
              }
            },
          },
          {
            type: "text-input",
            name: "input_email",
            placeholder: "Email (Opcional)",
            validation: function (value) {
              let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (value.length == 0) {
                return { isValid: true, msg: "" };
              }
              if (!reg.test(value)) {
                return { isValid: false, msg: "Formato invalido" };
              } else {
                return { isValid: true, msg: "" };
              }
            },
          },
          {
            type: "text-input",
            name: "input_telefono",
            placeholder: "Ingresa tu numero de telefono",
            validation: function (value) {
              let letters = value
                .split("")
                .filter((x) => /\d/.test(x) == false);
              if (letters.length > 0) {
                return { isValid: false, msg: "Esta campo no permite letras" };
              } else if (value.length < 10) {
                return { isValid: false, msg: "Debe tener 10 caracteres" };
              } else if (value.length > 10) {
                return {
                  isValid: false,
                  msg: "No puedes tener mas de 10 caracteres",
                };
              } else if (value.length == 0) {
                return { isValid: false, msg: "Campo requerido" };
              } else {
                return { isValid: true, msg: "" };
              }
            },
          },
          {
            type: "password-input",
            name: "input_password",
            placeholder: "Contraseña",
            validation: function (value) {
              if (value.length <= 8) {
                return {
                  isValid: false,
                  msg: "Su contraseña debe de tener mas de 8 caracteres",
                };
              } else {
                return { isValid: true, msg: "" };
              }
            },
            comparation: function (value, compareValue) {
              if (value == compareValue) {
                return true;
              } else {
                return false;
              }
            },
          },
          {
            type: "password-input",
            name: "input_r_password",
            placeholder: "Repetir Contraseña",
            validation: function (value) {
              if (value.length <= 8) {
                return {
                  isValid: false,
                  msg: "Su contraseña debe de tener mas de 8 caracteres",
                };
              } else {
                return { isValid: true, msg: "" };
              }
            },
          },
        ],
      },
      formDefaultData: {
        input_nombre: {
          value: "",
          error: {
            isActive: false,
            message: "Campo requerido",
          },
        },
        input_apodo: {
          value: "",
          error: {
            isActive: false,
            message: "Campo requerido",
          },
        },
        input_telefono: {
          value: "",
          complementHtml:
            '<div style="height: 100%; width: 100px; border-radius: 25px; background: #e6e6e6; margin-right: 10px; color:#666; display:flex; justify-content:center; align-items:center;"><img style="width:20px; height:20px; margin-right:5px;" src="../images/mexico.png">+52</div>',
          error: {
            isActive: false,
            message: "Campo requerido",
          },
        },
        input_email: {
          value: "",
          error: {
            isActive: false,
            message: "Campo requerido",
          },
        },
        input_password: {
          value: "",
          error: {
            isActive: false,
            message: "Campo requerido",
          },
          toCompare: "input_r_password",
        },
        input_r_password: {
          value: "",
          error: {
            isActive: false,
            message: "Campo requerido",
          },
        },
      },
      buttons: {
        type: "primary-button-block",
        content: "Registrar",
        typeButton: "submit",
        id: "sign-in-button",
        disabled: false,
      },
    };
  },
  watch: {
    "formDefaultData.input_nombre.value": function (newValue, oldValue) {
      let field = this.formSchema.fields.filter(
        (x) => x.name == "input_nombre"
      );
      let res = field[0].validation(newValue);
      this.formDefaultData.input_nombre.error.isActive = !res.isValid;
      this.formDefaultData.input_nombre.error.message = res.msg;
    },
    "formDefaultData.input_apodo.value": function (newValue, oldValue) {
      let field = this.formSchema.fields.filter((x) => x.name == "input_apodo");
      let res = field[0].validation(newValue);
      this.formDefaultData.input_apodo.error.isActive = !res.isValid;
      this.formDefaultData.input_apodo.error.message = res.msg;
    },
    "formDefaultData.input_email.value": function (newValue, oldValue) {
      let field = this.formSchema.fields.filter((x) => x.name == "input_email");
      let res = field[0].validation(newValue);
      this.formDefaultData.input_email.error.isActive = !res.isValid;
      this.formDefaultData.input_email.error.message = res.msg;
    },
    "formDefaultData.input_password.value": function (newValue, oldValue) {
      let field = this.formSchema.fields.filter(
        (x) => x.name == "input_password"
      );
      let res = field[0].validation(newValue);
      this.formDefaultData.input_password.error.isActive = !res.isValid;
      this.formDefaultData.input_password.error.message = res.msg;
    },
    "formDefaultData.input_r_password.value": function (newValue, oldValue) {
      let field = this.formSchema.fields.filter(
        (x) => x.name == "input_r_password"
      );
      let res = field[0].validation(newValue);
      this.formDefaultData.input_r_password.error.isActive = !res.isValid;
      this.formDefaultData.input_r_password.error.message = res.msg;
    },
    "formDefaultData.input_telefono.value": function (newValue, oldValue) {
      let field = this.formSchema.fields.filter(
        (x) => x.name == "input_telefono"
      );
      let res = field[0].validation(newValue);
      this.formDefaultData.input_telefono.error.isActive = !res.isValid;
      this.formDefaultData.input_telefono.error.message = res.msg;
    },
  },
  methods: {
    onSubmit(form) {
      let currentContentButton = this.buttons.content;
      this.buttons.disabled = true;
      this.buttons.content = '<div class="lds-dual-ring"></div>';
      let bandera = true;
      this.formSchema.fields.forEach((field) => {
        if (typeof field.validation == "function") {
          if (
            !field.validation(this.formDefaultData[field.name].value).isValid
          ) {
            this.formDefaultData[field.name].error.isActive = true;
            bandera = false;
          } else {
            this.formDefaultData[field.name].error.isActive = false;
          }
        }
        if (
          typeof field.comparation == "function" &&
          !this.formDefaultData[field.name].error.isActive
        ) {
          if (
            !field.comparation(
              this.formDefaultData[field.name].value,
              this.formDefaultData[this.formDefaultData[field.name].toCompare]
                .value
            )
          ) {
            this.formDefaultData[field.name].error.isActive = true;
            this.formDefaultData[field.name].error.message =
              "Contraseñas no coinciden";
            bandera = false;
          } else {
            this.formDefaultData[field.name].error.isActive = false;
          }
        }
      });
      if (bandera) {
        this.$emit("on-submit", form);
      } else {
        this.buttons.disabled = false;
        this.buttons.content = currentContentButton;
      }
    },
    handleBack() {
      console.log("hola");
      this.$emit("back");
    },
    setActiveLogin() {
      this.$emit("open-login");
    },
  },
  template: `
  <div class="container-fluid" v-show="isActive">
  <div class="Head">
  <div class="background">
  <svg version="1.1" width="100vw" height="300" id="register-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 414 430" enable-background="new 0 0 414 430" xml:space="preserve">
<g id="triangles">
	<rect x="1.6" y="18.3" fill="none" width="435.8" height="405.7"/>
	
		<linearGradient id="SVGIDI_11_" gradientUnits="userSpaceOnUse" x1="128.8018" y1="222.4246" x2="193.9798" y2="254.1716" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="4.149999e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="1" style="stop-color:#EDEEF0"/>
	</linearGradient>
	<path fill="url(#SVGIDI_1_)" d="M154.6,175.5l-18,41.7l65.5-26.1L154.6,175.5z"/>
	
		<linearGradient id="SVGIDI_2_" gradientUnits="userSpaceOnUse" x1="204.9248" y1="230.9583" x2="141.0878" y2="162.7193" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#BCBEC4"/>
		<stop  offset="1" style="stop-color:#EDEEF0"/>
	</linearGradient>
	<path fill="url(#SVGIDI_2_)" d="M202.1,191.1L178.4,282l-41.7-64.9L202.1,191.1z"/>
	
		<linearGradient id="SVGIDI_3_" gradientUnits="userSpaceOnUse" x1="154.613" y1="268.2825" x2="202.136" y2="268.2825" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_3_)" d="M154.6,175.5v-43.4l47.5,59.1L154.6,175.5z"/>
	
		<linearGradient id="SVGIDI_4_" gradientUnits="userSpaceOnUse" x1="154.613" y1="268.2825" x2="232.271" y2="268.2825" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_4_)" d="M202.1,191.1l30.1-20.3l-77.7-38.8L202.1,191.1z"/>
	
		<linearGradient id="SVGIDI_5_" gradientUnits="userSpaceOnUse" x1="237.5547" y1="266.3687" x2="211.5077" y2="223.7877" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#BCBEC4"/>
		<stop  offset="1" style="stop-color:#EDEEF0"/>
	</linearGradient>
	<path fill="url(#SVGIDI_5_)" d="M202.1,191.1l25.7,18.5l4.4-38.8L202.1,191.1z"/>
	
		<linearGradient id="SVGIDI_6_" gradientUnits="userSpaceOnUse" x1="227.852" y1="239.619" x2="267.623" y2="239.619" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_6_)" d="M227.9,209.7l39.8-28.4l-35.4-10.4L227.9,209.7z"/>
	
		<linearGradient id="SVGIDI_7_" gradientUnits="userSpaceOnUse" x1="248.9544" y1="248.8937" x2="256.7664" y2="287.5477" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_7_)" d="M232.3,170.9l35.4-57.3v67.8L232.3,170.9z"/>
	
		<linearGradient id="SVGIDI_8_" gradientUnits="userSpaceOnUse" x1="175.1962" y1="151.9164" x2="125.2512" y2="199.7315" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#BCBEC4"/>
		<stop  offset="0.2531" style="stop-color:#CCCED2"/>
		<stop  offset="0.715" style="stop-color:#E4E5E8"/>
		<stop  offset="1" style="stop-color:#EDEEF0"/>
	</linearGradient>
	<path fill="url(#SVGIDI_8_)" d="M136.6,217.2l-16,32.4l57.7,32.4L136.6,217.2z"/>
	
		<linearGradient id="SVGIDI_9_" gradientUnits="userSpaceOnUse" x1="83.193" y1="245.8835" x2="138.7779" y2="185.4695" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_9_)" d="M136.6,217.2L97.8,179l22.8,70.6L136.6,217.2z"/>
	
		<linearGradient id="SVGIDI_10_" gradientUnits="userSpaceOnUse" x1="97.8138" y1="233.5415" x2="154.613" y2="233.5415" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_10_)" d="M97.8,179l56.8-3.5l-18,41.7L97.8,179z"/>
	
		<linearGradient id="SVGIDI_11_" gradientUnits="userSpaceOnUse" x1="57.246" y1="215.589" x2="120.652" y2="215.589" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_11_)" d="M97.8,179l-40.6,64.3l63.4,6.4L97.8,179z"/>
	
		<linearGradient id="SVGIDI_12_" gradientUnits="userSpaceOnUse" x1="97.8138" y1="264.231" x2="154.613" y2="264.231" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_12_)" d="M97.8,152.3V179l56.8-3.5L97.8,152.3z"/>
	
		<linearGradient id="SVGIDI_13_" gradientUnits="userSpaceOnUse" x1="170.9324" y1="257.197" x2="90.5634" y2="311.9819" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#BCBEC4"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_13_)" d="M154.6,132.1v43.4l-56.8-23.2L154.6,132.1z"/>
	
		<linearGradient id="SVGIDI_14_" gradientUnits="userSpaceOnUse" x1="126.2134" y1="277.549" x2="126.2134" y2="316.344" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_14_)" d="M97.8,152.3l28.4-38.8l28.4,18.5L97.8,152.3z"/>
	
		<linearGradient id="SVGIDI_15_" gradientUnits="userSpaceOnUse" x1="142.731" y1="297.812" x2="142.731" y2="326.19" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_15_)" d="M159.2,103.7l-4.6,28.4l-28.4-18.5L159.2,103.7z"/>
	
		<linearGradient id="SVGIDI_16_" gradientUnits="userSpaceOnUse" x1="148.3154" y1="314.1696" x2="120.9604" y2="348.9359" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="2.380000e-02" style="stop-color:#EEEFF1"/>
		<stop  offset="0.5286" style="stop-color:#FBFBFB"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_16_)" d="M128.9,82.9l-2.7,30.7l33-9.8L128.9,82.9z"/>
	
		<linearGradient id="SVGIDI_17_" gradientUnits="userSpaceOnUse" x1="109.9725" y1="259.5674" x2="37.4" y2="287.4034" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="2.380000e-02" style="stop-color:#EEEFF1"/>
		<stop  offset="0.5286" style="stop-color:#FBFBFB"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_17_)" d="M97.8,152.3L52.6,139l45.2,40V152.3z"/>
	
		<linearGradient id="SVGIDI_18_" gradientUnits="userSpaceOnUse" x1="120.652" y1="158.262" x2="178.366" y2="158.262" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_18_)" d="M120.7,249.6l28.9,44l28.9-11.6L120.7,249.6z"/>
	
		<linearGradient id="SVGIDI_19_" gradientUnits="userSpaceOnUse" x1="210.7592" y1="308.2751" x2="227.2502" y2="253.2571" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#BCBEC4"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_19_)" d="M154.6,132.1l113-18.5l-35.4,57.3L154.6,132.1z"/>
	
		<linearGradient id="SVGIDI_20_" gradientUnits="userSpaceOnUse" x1="178.366" y1="193.297" x2="227.852" y2="193.297" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_20_)" d="M202.1,191.1l25.7,18.5L178.4,282L202.1,191.1z"/>
	
		<linearGradient id="SVGIDI_21_" gradientUnits="userSpaceOnUse" x1="227.852" y1="228.327" x2="305.297" y2="228.327" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.5645" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_21_)" d="M227.9,209.7l77.4,12.2l-37.7-40.5L227.9,209.7z"/>
	
		<linearGradient id="SVGIDI_22_" gradientUnits="userSpaceOnUse" x1="154.613" y1="312.001" x2="267.623" y2="312.001" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_22_)" d="M159.2,103.7l108.4,9.8l-113,18.5L159.2,103.7z"/>
	
		<linearGradient id="SVGIDI_23_" gradientUnits="userSpaceOnUse" x1="149.509" y1="134.812" x2="219.523" y2="134.812" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_23_)" d="M178.4,282l41.2,26.1l-70-14.5L178.4,282z"/>
	
		<linearGradient id="SVGIDI_24_" gradientUnits="userSpaceOnUse" x1="178.366" y1="171.002" x2="227.852" y2="171.002" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_24_)" d="M227.9,209.7l-8.3,98.4L178.4,282L227.9,209.7z"/>
	
		<linearGradient id="SVGIDI_25_" gradientUnits="userSpaceOnUse" x1="219.523" y1="171.002" x2="305.297" y2="171.002" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_25_)" d="M219.5,308.1l85.8-86.3l-77.4-12.2L219.5,308.1z"/>
	
		<linearGradient id="SVGIDI_26_" gradientUnits="userSpaceOnUse" x1="267.623" y1="282.4685" x2="305.297" y2="282.4685" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_26_)" d="M267.6,113.5l37.7,33.9l-37.7,33.9V113.5z"/>
	
		<linearGradient id="SVGIDI_27_" gradientUnits="userSpaceOnUse" x1="267.623" y1="313.5928" x2="305.297" y2="313.5928" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.6332" style="stop-color:#F1F2F3"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_27_)" d="M267.6,113.5l23.8-28.4l13.9,62.2L267.6,113.5z"/>
	
		<linearGradient id="SVGIDI_28_" gradientUnits="userSpaceOnUse" x1="146.122" y1="116.185" x2="219.523" y2="116.185" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_28_)" d="M149.5,293.6l-3.4,40.1l73.4-25.7L149.5,293.6z"/>
	
		<linearGradient id="SVGIDI_29_" gradientUnits="userSpaceOnUse" x1="120.652" y1="138.189" x2="149.509" y2="138.189" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_29_)" d="M120.7,249.6l25.5,84.2l3.4-40.1L120.7,249.6z"/>
	
		<linearGradient id="SVGIDI_30_" gradientUnits="userSpaceOnUse" x1="219.523" y1="149.2875" x2="305.297" y2="149.2875" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#BCBEC4"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
	</linearGradient>
	<path fill="url(#SVGIDI_30_)" d="M219.5,308.1l19.6,31.3l66.2-117.5L219.5,308.1z"/>
	
		<linearGradient id="SVGIDI_31_" gradientUnits="userSpaceOnUse" x1="287.8456" y1="304.9885" x2="333.4536" y2="342.3755" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.1836" style="stop-color:#F1F2F3"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_31_)" d="M291.4,85.2l61.4-7.5l-47.5,69.8L291.4,85.2z"/>
	
		<linearGradient id="SVGIDI_32_" gradientUnits="userSpaceOnUse" x1="232.271" y1="338.6392" x2="291.387" y2="338.6392" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.5271" style="stop-color:#E4E5E8"/>
		<stop  offset="1" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_32_)" d="M232.3,69l35.4,44.6l23.8-28.4L232.3,69z"/>
	
		<linearGradient id="SVGIDI_33_" gradientUnits="userSpaceOnUse" x1="197.1772" y1="304.6671" x2="240.1712" y2="348.5671" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.3583" style="stop-color:#F5F5F7"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_33_)" d="M232.3,69l-73,34.7l108.4,9.8L232.3,69z"/>
	
		<linearGradient id="SVGIDI_34_" gradientUnits="userSpaceOnUse" x1="43.6194" y1="141.8993" x2="56.161" y2="154.9437" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.1836" style="stop-color:#F1F2F3"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_34_)" d="M36.6,281.3l26.6,0.4l-13.5-9.2L36.6,281.3z"/>
	
		<linearGradient id="SVGIDI_35_" gradientUnits="userSpaceOnUse" x1="309.3184" y1="371.5711" x2="312.5841" y2="392.42" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#EDEEF0"/>
		<stop  offset="0.1836" style="stop-color:#F1F2F3"/>
		<stop  offset="1" style="stop-color:#FFFFFF"/>
	</linearGradient>
	<path fill="url(#SVGIDI_35_)" d="M303.5,57.4L318,41.2l-9.2-4.3L303.5,57.4z"/>
	
		<linearGradient id="SVGIDI_36_" gradientUnits="userSpaceOnUse" x1="188.8538" y1="343.804" x2="186.4938" y2="364.1312" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_36_)" d="M196.2,85.2l-16-9.9l5.1-9.5L196.2,85.2z"/>
	<rect x="277.6" y="144.9" fill="none" width="122.8" height="107.6"/>
	
		<linearGradient id="SVGIDI_37_" gradientUnits="userSpaceOnUse" x1="300.249" y1="242.241" x2="355.309" y2="242.241" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_37_)" d="M300.2,207.5l31.4-39.6l23.7,16.5L300.2,207.5z"/>
	
		<linearGradient id="SVGIDI_38_" gradientUnits="userSpaceOnUse" x1="52.6707" y1="193.6792" x2="81.9498" y2="176.0268" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_38_)" d="M89,227.6l-49.8,30.9l38,3.2L89,227.6z"/>
	
		<linearGradient id="SVGIDI_39_" gradientUnits="userSpaceOnUse" x1="69.6917" y1="341.2925" x2="98.2905" y2="341.2925" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#D8D9DD"/>
	</linearGradient>
	<path fill="url(#SVGIDI_39_)" d="M69.7,73.3l28.6,30.7L94,78.5L69.7,73.3z"/>
	
		<linearGradient id="SVGIDI_40_" gradientUnits="userSpaceOnUse" x1="308.9898" y1="204.4761" x2="329.4301" y2="209.8077" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#D8D9DD"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_40_)" d="M307.5,219.7l20.7,6.8l0.3-10.2L307.5,219.7z"/>
	
		<linearGradient id="SVGIDI_41_" gradientUnits="userSpaceOnUse" x1="133.4451" y1="375.6899" x2="161.9352" y2="266.4205" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_41_)" d="M143.2,51.7l46.5,104.6l-64.4-19.7L143.2,51.7z"/>
	<rect x="3.3" y="246.3" fill="none" width="200.2" height="183.2"/>
	
		<linearGradient id="SVGIDI_42_" gradientUnits="userSpaceOnUse" x1="54.556" y1="64.1349" x2="99.91" y2="109.116" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="3.760000e-02" style="stop-color:#BCBEC4"/>
		<stop  offset="0.5538" style="stop-color:#EDEEF0"/>
		<stop  offset="1" style="stop-color:#F7F7F8"/>
	</linearGradient>
	<path fill="url(#SVGIDI_42_)" d="M78.5,367.9l-35.9-16.3l99.1-66.1L78.5,367.9z"/>
	<rect x="205.2" y="205.4" fill="none" width="195.7" height="159.1"/>
	
		<linearGradient id="SVGIDI_43_" gradientUnits="userSpaceOnUse" x1="244.6759" y1="155.9007" x2="339.1395" y2="156.1706" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_43_)" d="M244.6,245l56.7,57.7l37.9-36.9L244.6,245z"/>
	<rect x="-9.6" y="130.3" fill="none" width="150.3" height="124.4"/>
	
		<linearGradient id="SVGIDI_44_" gradientUnits="userSpaceOnUse" x1="76.0037" y1="251.0689" x2="29.3997" y2="241.9921" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0" style="stop-color:#F7F7F8"/>
		<stop  offset="0.4462" style="stop-color:#EDEEF0"/>
		<stop  offset="0.9624" style="stop-color:#BCBEC4"/>
	</linearGradient>
	<path fill="url(#SVGIDI_44_)" d="M78.8,193.1L45.4,170l-15.2,21.8L78.8,193.1z"/>
</g>
<g id="spheres">
	
		<linearGradient id="sphere1_one_1_" gradientUnits="userSpaceOnUse" x1="410.9937" y1="183.1658" x2="417.5697" y2="176.5838" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_one_1_" fill="url(#sphere1_one_1_)" d="M418.4,254.1c-1,1-2.7,1-3.8,0s-1-2.7,0-3.8s2.7-1,3.8,0
		C419.4,251.4,419.4,253.1,418.4,254.1z"/>
	
		<linearGradient id="sphere1_two_1_" gradientUnits="userSpaceOnUse" x1="230.4304" y1="422.2453" x2="236.3474" y2="415.4352" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_two_1_" fill="url(#sphere1_two_1_)" d="M236.2,14c-1,1-2.7,1-3.8,0c-1-1-1-2.7,0-3.8c1-1,2.7-1,3.8,0
		C237.3,11.3,237.3,13,236.2,14z"/>
	
		<radialGradient id="sphere1_three_1_" cx="-86.6091" cy="628.1218" r="1" gradientTransform="matrix(26.5413 0 0 -26.5184 2395.647 16796.7539)" gradientUnits="userSpaceOnUse">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3436" style="stop-color:#52C0E9"/>
		<stop  offset="0.587" style="stop-color:#4E78D2"/>
		<stop  offset="0.762" style="stop-color:#4B4AC4"/>
		<stop  offset="0.8499" style="stop-color:#4A39BE"/>
	</radialGradient>
	<path id="sphere1_three_1_" fill="url(#sphere1_three_1_)" d="M111.1,156.6c-2.8,2.8-7.5,2.8-10.3,0c-2.8-2.8-2.8-7.5,0-10.3
		c2.8-2.8,7.5-2.8,10.3,0C113.9,149.2,113.9,153.8,111.1,156.6z"/>
	
		<linearGradient id="sphere1_four_1_" gradientUnits="userSpaceOnUse" x1="309.376" y1="318.6487" x2="320.221" y2="307.4547" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_four_1_" fill="url(#sphere1_four_1_)" d="M325.6,127.9c-2.8,2.8-7.5,2.8-10.3,0c-2.8-2.8-2.8-7.5,0-10.3
		c2.8-2.8,7.5-2.8,10.3,0C328.5,120.4,328.5,125,325.6,127.9z"/>
	
		<radialGradient id="sphere1_five_1_" cx="-85.8402" cy="626.3604" r="1" gradientTransform="matrix(21.6355 0 0 -21.6167 2205.9209 13750.3115)" gradientUnits="userSpaceOnUse">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3518" style="stop-color:#52C0E9"/>
		<stop  offset="0.6104" style="stop-color:#4E78D2"/>
		<stop  offset="0.7963" style="stop-color:#4B4AC4"/>
		<stop  offset="0.8897" style="stop-color:#4A39BE"/>
	</radialGradient>
	<path id="sphere1_five_1_" fill="url(#sphere1_five_1_)" d="M363.5,224.9c-2.8,2.8-7.5,2.8-10.3,0c-2.8-2.8-2.8-7.5,0-10.3
		c2.8-2.8,7.5-2.8,10.3,0C366.4,217.5,366.4,222.1,363.5,224.9z"/>
	
		<linearGradient id="sphere1_six_1_" gradientUnits="userSpaceOnUse" x1="111.4422" y1="378.0687" x2="117.6262" y2="368.9656" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_six_1_" fill="url(#sphere1_six_1_)" d="M121.1,64.2c-2.1,2.1-5.5,2.1-7.6,0c-2.1-2.1-2.1-5.5,0-7.6
		c2.1-2.1,5.5-2.1,7.6,0C123.2,58.8,123.2,62.1,121.1,64.2z"/>
	
		<linearGradient id="sphere1_seven_1_" gradientUnits="userSpaceOnUse" x1="16.5828" y1="223.8209" x2="26.2487" y2="211.6229" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_seven_1_" fill="url(#sphere1_seven_1_)" d="M28.3,219.8c-2.1,2.1-5.5,2.1-7.6,0c-2.1-2.1-2.1-5.5,0-7.6
		c2.1-2.1,5.5-2.1,7.6,0C30.4,214.4,30.4,217.8,28.3,219.8z"/>
	
		<linearGradient id="sphere1_eight_2_" gradientUnits="userSpaceOnUse" x1="153.1853" y1="99.3354" x2="162.1143" y2="89.4064" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_eight_1_" fill="url(#sphere1_eight_2_)" d="M165.1,343.4c-2.1,2.1-5.5,2.1-7.6,0c-2.1-2.1-2.1-5.5,0-7.6
		c2.1-2.1,5.5-2.1,7.6,0C167.2,337.9,167.2,341.3,165.1,343.4z"/>
	
		<linearGradient id="sphere1_nine_1_" gradientUnits="userSpaceOnUse" x1="39.1454" y1="391.952" x2="43.6256" y2="384.0389" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_nine_1_" fill="url(#sphere1_nine_1_)" d="M44.5,45.9c-1,1-2.7,1-3.8,0c-1-1-1-2.7,0-3.8c1-1,2.7-1,3.8,0
		C45.6,43.2,45.5,44.9,44.5,45.9z"/>
	
		<linearGradient id="sphere1_ten_1_" gradientUnits="userSpaceOnUse" x1="253.3029" y1="123.4024" x2="257.9739" y2="116.6504" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_ten_1_" fill="url(#sphere1_ten_1_)" d="M259.3,314.3c-1,1-2.7,1-3.8,0c-1-1-1-2.7,0-3.8c1-1,2.7-1,3.8,0
		C260.4,311.6,260.4,313.3,259.3,314.3z"/>
	
		<linearGradient id="sphere1_eleven_1_" gradientUnits="userSpaceOnUse" x1="11.765" y1="147.6008" x2="18.414" y2="141.4788" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_eleven_1_" fill="url(#sphere1_eleven_1_)" d="M19.7,289.8c-1,1-2.7,1-3.8,0s-1-2.7,0-3.8s2.7-1,3.8,0
		C20.8,287,20.8,288.7,19.7,289.8z"/>
	
		<linearGradient id="sphere1_twelve_1_" gradientUnits="userSpaceOnUse" x1="380.7751" y1="299.9077" x2="384.5421" y2="294.1067" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_twelve_1_" fill="url(#sphere1_twelve_1_)" d="M386.3,137.4c-1,1-2.7,1-3.8,0c-1-1-1-2.7,0-3.8c1-1,2.7-1,3.8,0
		C387.3,134.7,387.3,136.4,386.3,137.4z"/>
	
		<linearGradient id="sphere1_thirteen_1_" gradientUnits="userSpaceOnUse" x1="104.6553" y1="155.9689" x2="109.7073" y2="148.8309" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_thirteen_1_" fill="url(#sphere1_thirteen_1_)" d="M109.8,280.5c-1,1-2.7,1-3.8,0c-1-1-1-2.7,0-3.8c1-1,2.7-1,3.8,0
		C110.9,277.7,110.9,279.4,109.8,280.5z"/>
	
		<linearGradient id="sphere1_eight_1_" gradientUnits="userSpaceOnUse" x1="191.823" y1="177.4711" x2="200.822" y2="163.4601" gradientTransform="matrix(1 0 0 -1 0 429.89)">
		<stop  offset="0.2107" style="stop-color:#55EAF7"/>
		<stop  offset="0.3747" style="stop-color:#52C0E9"/>
		<stop  offset="0.6753" style="stop-color:#4E78D2"/>
		<stop  offset="0.8914" style="stop-color:#4B4AC4"/>
		<stop  offset="1" style="stop-color:#4A39BE"/>
	</linearGradient>
	<path id="sphere1_eight_1_" fill="url(#sphere1_eight_3_)" d="M204.7,269.6c-2.8,2.8-7.5,2.8-10.3,0c-2.8-2.8-2.8-7.5,0-10.3
		c2.8-2.8,7.5-2.8,10.3,0C207.5,262.1,207.5,266.7,204.7,269.6z"/>
</g>
</svg>

  </div>
  <div class="backButton">
    <button @click="handleBack" class="modern-button-small btnSecondary"><span class="ico_back"></span></button>
  </div>
  <div class="middleButton">
    <button class="modern-button-rounded  btnSecondary"><span class="ico_user"></span></button>
  </div>
</div>
    <div class="Body">
        <component-form :schema="formSchema" :data="formDefaultData" :buttons="buttons" @on-submit="onSubmit">
        </component-form>
        <p class="text-recupera" style="padding-bottom: 20px;">¿Ya tienes cuenta? <a href="#"
                @click="setActiveLogin">Inicia sesión aqui</a></p>
    </div>
</div>
`,
};