"use strict";

var resetPassword = {
  props: {
    isActive: false,
    initialize: null
  },
  data: function data() {
    return {
      isValidate: false,
      smsIsActive: false,
      buttonHeaderUser: {
        type: 'roundend-button',
        content: "<i class='icon-Usuario'></i>",
        typeButton: 'button',
        align: 'center',
        size: ''
      },
      formSchema: {
        fields: [{
          type: 'text-input',
          name: 'input_user',
          placeholder: 'Numero telefonico',
          validation: function validation(value) {
            var letters = value.split('').filter(function (x) {
              return /\d/.test(x) == false;
            });

            if (letters.length > 0) {
              return {
                isValid: false,
                msg: "Esta campo no permite letras"
              };
            } else if (value.length < 10) {
              return {
                isValid: false,
                msg: "Debe tener 10 caracteres"
              };
            } else if (value.length > 10) {
              return {
                isValid: false,
                msg: "No puedes tener mas de 10 caracteres"
              };
            } else if (value.length == 0) {
              return {
                isValid: false,
                msg: "Campo requerido"
              };
            } else {
              return {
                isValid: true,
                msg: ""
              };
            }
          }
        }]
      },
      formSchemaPass: {
        fields: [{
          type: 'password-input',
          name: 'input_password',
          placeholder: 'Contraseña',
          validation: function validation(value) {
            if (value.length <= 8) {
              return {
                isValid: false,
                msg: "Su contraseña debe de tener mas de 8 caracteres"
              };
            } else {
              return {
                isValid: true,
                msg: ""
              };
            }
          },
          comparation: function comparation(value, compareValue) {
            if (value == compareValue) {
              return true;
            } else {
              return false;
            }
          }
        }, {
          type: 'password-input',
          name: 'input_r_password',
          placeholder: 'Repetir Contraseña',
          validation: function validation(value) {
            if (value.length <= 8) {
              return {
                isValid: false,
                msg: "Su contraseña debe de tener mas de 8 caracteres"
              };
            } else {
              return {
                isValid: true,
                msg: ""
              };
            }
          }
        }]
      },
      formDefaultData: {
        input_user: {
          value: '',
          complementHtml: '<div style="height: 100%; width: 100px; border-radius: 25px; background: #e6e6e6; margin-right: 10px; color:#666; display:flex; justify-content:center; align-items:center;"><img style="width:20px; height:20px; margin-right:5px;" src="../images/mexico.png">+52</div>',
          error: {
            isActive: false,
            message: "Campo requerido"
          }
        }
      },
      formPasswordData: {
        input_password: {
          value: '',
          error: {
            isActive: false,
            message: "Campo requerido"
          },
          toCompare: "input_r_password"
        },
        input_r_password: {
          value: '',
          error: {
            isActive: false,
            message: "Campo requerido"
          }
        }
      },
      buttons: {
        type: 'primary-button-block',
        content: 'Validar',
        typeButton: 'submit',
        disabled: false,
        isValidate: false
      },
      buttonsPass: {
        type: 'primary-button-block',
        content: 'Actualizar',
        typeButton: 'submit',
        disabled: false,
        isValidate: false
      }
    };
  },
  watch: {
    'formDefaultData.input_user.value': function formDefaultDataInput_userValue(newValue, oldValue) {
      var field = this.formSchema.fields.filter(function (x) {
        return x.name == "input_user";
      });
      var res = field[0].validation(newValue);
      this.formDefaultData.input_user.error.isActive = !res.isValid;
      this.formDefaultData.input_user.error.message = res.msg;
    },
    'formPasswordData.input_password.value': function formPasswordDataInput_passwordValue(newValue, oldValue) {
      var field = this.formSchemaPass.fields.filter(function (x) {
        return x.name == "input_password";
      });
      var res = field[0].validation(newValue);
      this.formPasswordData.input_password.error.isActive = !res.isValid;
      this.formPasswordData.input_password.error.message = res.msg;
    },
    'formPasswordData.input_r_password.value': function formPasswordDataInput_r_passwordValue(newValue, oldValue) {
      var field = this.formSchemaPass.fields.filter(function (x) {
        return x.name == "input_r_password";
      });
      var res = field[0].validation(newValue);
      this.formPasswordData.input_r_password.error.isActive = !res.isValid;
      this.formPasswordData.input_r_password.error.message = res.msg;
    }
  },
  components: {
    'rounded-button': roundedButton,
    'component-form': componentForm,
    'primary-button-block': primaryButtonBlock,
    'modal-to-sms-code': modalToSmsCode
  },
  methods: {
    close: function close() {
      this.$emit("cancel");
    },
    onSubmit: function onSubmit() {
      var _this = this;

      var currentContentButton = this.buttons.content;
      this.buttons.disabled = true;
      this.buttons.content = '<div class="lds-dual-ring"></div>';
      var bandera = true;
      this.formSchema.fields.forEach(function (field) {
        if (typeof field.validation == 'function') {
          if (!field.validation(_this.formDefaultData[field.name].value).isValid) {
            _this.formDefaultData[field.name].error.isActive = true;
            bandera = false;
          } else {
            _this.formDefaultData[field.name].error.isActive = false;
          }
        }
      });

      if (bandera) {
        this.validateNumber();
      } else {
        this.buttons.disabled = false;
        this.buttons.content = currentContentButton;
      }
    },
    requestSmsCode: function requestSmsCode(formSubmitted) {
      //console.log(this.pendingRegister.data.input_apodo.value);
      var code = formSubmitted.data.input_sms_code.value;
      var currentThis = this;
      confirmationResult.confirm(code).then(function (result) {
        currentThis.smsIsActive = false;
        currentThis.isValidate = true;
        formSubmitted.buttons.content = '<i class="icon-Correcto"></i>';
        formSubmitted.buttons.disabled = false;
      })["catch"](function (error) {
        createAviso(error);
        console.log("codigo incorrecto");
        formSubmitted.buttons.content = '<i class="icon-Correcto"></i>';
        formSubmitted.buttons.disabled = false;
      });
    },
    onSubmitPass: function onSubmitPass() {
      var _this2 = this;

      var currentContentButton = this.buttons.content;
      this.buttonsPass.disabled = true;
      this.buttonsPass.content = '<div class="lds-dual-ring"></div>';
      var bandera = true;
      this.formSchemaPass.fields.forEach(function (field) {
        if (typeof field.validation == 'function') {
          if (!field.validation(_this2.formPasswordData[field.name].value).isValid) {
            _this2.formPasswordData[field.name].error.isActive = true;
            bandera = false;
          } else {
            _this2.formPasswordData[field.name].error.isActive = false;
          }
        }

        if (typeof field.comparation == 'function' && !_this2.formPasswordData[field.name].error.isActive) {
          if (!field.comparation(_this2.formPasswordData[field.name].value, _this2.formPasswordData[_this2.formPasswordData[field.name].toCompare].value)) {
            _this2.formPasswordData[field.name].error.isActive = true;
            _this2.formPasswordData[field.name].error.message = "Contraseñas no coinciden";
            bandera = false;
          } else {
            _this2.formPasswordData[field.name].error.isActive = false;
          }
        }
      });

      if (bandera) {
        this.updatePassword(); //console.log("Validaciones correctas")
      } else {
        this.buttonsPass.disabled = false;
        this.buttonsPass.content = "Actualizar";
      }
    },
    updatePassword: function updatePassword() {
      var services = this.$props.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/actualizarPasswordUser.php" : "https://arvispace.com/serviciosASAR/actualizarPasswordUser.php";
      var currentThis = this;
      var form = new FormData();
      form.append("password", this.formPasswordData.input_password.value);
      form.append("telefono", this.formDefaultData.input_user.value);
      axios.post(services, form).then(function (response) {
        if (response.status == 200) {
          createAviso("Tu contraseña se ha actualizado correctamente");
          currentThis.$emit('password-updated');
        }
      })["catch"](function (exception) {
        console.log(exception);
      });
    },
    validateNumber: function validateNumber() {
      var services = this.$props.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/validarTelefonoUsuario.php" : "https://arvispace.com/serviciosASAR/validarTelefonoUsuario.php";
      var form = new FormData();
      form.append('telefono', this.formDefaultData.input_user.value);
      var currentComponent = this;
      axios.post(services, form).then(function (response) {
        if (response.status == 200) {
          console.log(response.data);

          if (response.data[0].status == 1) {
            //+52 estatico de momento
            var phoneNumber = "+52 " + currentComponent.formDefaultData.input_user.value;
            var appVerifier = window.recaptchaVerifier;
            console.log(phoneNumber);
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function (confirmationResult) {
              window.confirmationResult = confirmationResult;
              currentComponent.smsIsActive = true;
            })["catch"](function (error) {
              createAviso(error);
              console.log(error);
              grecaptcha.reset(window.recaptchaWidgetId);
            });
          } else {
            currentComponent.buttons.content = "Validar";
            currentComponent.buttons.disabled = false;
            createAviso("Este numero no se ecnuentra registrado");
          }
        } else {
          currentComponent.buttons.content = "Validar";
          currentComponent.buttons.disabled = false;
          createAviso("Network error");
        }
      })["catch"](function (exception) {
        currentComponent.buttons.content = "Validar";
        currentComponent.buttons.disabled = false;
        createAviso(exception);
      });
    }
  },
  template: "\n     <div class=\"container-fluid\" v-show=\"isActive\">\n         <div class=\"Head\">\n             <div class=\"row\">\n                 <div class=\"background\">\n                     <svg width=\"100vw\" height=\"50vh\" viewBox=\"0 0 414 332\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"\n                         xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                         <g clip-path=\"url(#clip0)\">\n                             <rect x=\"-139.319\" y=\"-394.373\" width=\"768.979\" height=\"716.477\" fill=\"url(#pattern0)\" />\n                             <path d=\"M214.519 -89.0886L172.576 71.4557L98.9542 -43.0717L214.519 -89.0886Z\"\n                                 fill=\"url(#paint0_linear)\" />\n                             <path d=\"M98.9542 -43.0717L70.7385 14.197L172.576 71.4558L98.9542 -43.0717Z\"\n                                 fill=\"url(#paint1_linear)\" />\n                             <path d=\"M98.9542 -43.0717L30.4389 -110.563L70.7385 14.1969L98.9542 -43.0717Z\"\n                                 fill=\"url(#paint2_linear)\" />\n                             <path d=\"M30.4389 -110.563L-41.1444 2.94508L70.7385 14.1969L30.4389 -110.563Z\"\n                                 fill=\"url(#paint3_linear)\" />\n                             <path d=\"M70.7385 14.197L121.657 91.9109L172.576 71.4557L70.7385 14.197Z\"\n                                 fill=\"url(#paint4_linear)\" />\n                             <path d=\"M214.519 -89.0886L259.895 -56.3622L172.576 71.4557L214.519 -89.0886Z\"\n                                 fill=\"url(#paint5_linear)\" />\n                             <path d=\"M172.576 71.4558L245.199 117.473L121.657 91.911L172.576 71.4558Z\"\n                                 fill=\"url(#paint6_linear)\" />\n                             <path d=\"M259.895 -56.3622L245.199 117.473L172.576 71.4557L259.895 -56.3622Z\"\n                                 fill=\"url(#paint7_linear)\" />\n                             <path d=\"M245.199 117.473L396.55 -34.8877L259.895 -56.3622L245.199 117.473Z\"\n                                 fill=\"url(#paint8_linear)\" />\n                             <path d=\"M121.657 91.9109L115.68 162.807L245.199 117.473L121.657 91.9109Z\"\n                                 fill=\"url(#paint9_linear)\" />\n                             <path d=\"M70.7385 14.197L115.68 162.807L121.657 91.9109L70.7385 14.197Z\"\n                                 fill=\"url(#paint10_linear)\" />\n                             <path d=\"M245.199 117.473L279.748 172.693L396.55 -34.8877L245.199 117.473Z\"\n                                 fill=\"url(#paint11_linear)\" />\n                             <path d=\"M-15.6305 -6.30778L48.3223 65.3201L56.7247 -83.339L-15.6305 -6.30778Z\"\n                                 stroke=\"white\" stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M56.7247 -83.339L209.907 43.3409L48.3223 65.3201L56.7247 -83.339Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M48.3223 65.3201L96.2622 124.895L209.907 43.3409L48.3223 65.3201Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M48.3223 65.32L-59.5821 105.538L96.2623 124.895L48.3223 65.32Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M-59.5821 105.538L-15.6305 -6.30774L48.3223 65.3201L-59.5821 105.538Z\"\n                                 stroke=\"white\" stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M-59.5821 105.538L27.5391 240.6L96.2623 124.895L-59.5821 105.538Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M96.2623 124.895L206.393 108.932L209.907 43.3409L96.2623 124.895Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M56.7247 -83.3389L115.185 -116.026L209.907 43.3409L56.7247 -83.3389Z\"\n                                 stroke=\"white\" stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M209.907 43.3409L308.013 -17.2331L206.393 108.932L209.907 43.3409Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M115.185 -116.026L308.013 -17.233L209.907 43.3409L115.185 -116.026Z\"\n                                 stroke=\"white\" stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M96.2623 124.895L142.48 173.069L206.393 108.932L96.2623 124.895Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M490.193 -38.5195L312.071 125.122L308.013 -17.2331L490.193 -38.5195Z\"\n                                 stroke=\"white\" stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M514.915 17.047L312.071 125.122L490.193 -38.5195L514.915 17.047Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M312.071 125.122L303.016 202.836L206.235 108.814L312.071 125.122Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M303.016 202.836L204.434 215.919L206.235 108.814L303.016 202.836Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <path d=\"M426.24 163.074L312.071 125.122\" stroke=\"white\" stroke-width=\"0.75\"\n                                 stroke-miterlimit=\"10\" />\n                             <path d=\"M426.24 163.074L514.915 17.047L312.071 125.122L426.24 163.074Z\" stroke=\"white\"\n                                 stroke-width=\"0.75\" stroke-miterlimit=\"10\" />\n                             <rect x=\"347.602\" y=\"-170.722\" width=\"216.739\" height=\"190.005\" fill=\"url(#pattern1)\" />\n                             <path d=\"M14.8218 -24.6155L-72.9724 29.9416L-5.9812 35.6714L14.8218 -24.6155Z\"\n                                 fill=\"url(#paint12_linear)\" />\n                             <rect x=\"-136.35\" y=\"8.39746\" width=\"353.314\" height=\"323.602\" fill=\"url(#pattern2)\" />\n                             <path d=\"M-3.62578 223.094L-66.9057 194.365L108 77.7101L-3.62578 223.094Z\"\n                                 fill=\"url(#paint13_linear)\" />\n                             <rect x=\"219.934\" y=\"-63.844\" width=\"345.397\" height=\"281.049\" fill=\"url(#pattern3)\" />\n                             <path d=\"M289.497 6.09204L389.474 107.953L456.287 42.7571L289.497 6.09204Z\"\n                                 fill=\"url(#paint14_linear)\" />\n                             <rect x=\"-159.112\" y=\"-196.452\" width=\"265.233\" height=\"219.693\" fill=\"url(#pattern4)\" />\n                             <path\n                                 d=\"M219.002 49.3973C213.984 54.4146 205.839 54.4146 200.822 49.3973C195.804 44.38 195.804 36.2355 200.822 31.2182C205.839 26.2009 213.984 26.2009 219.002 31.2182C224.02 36.2355 224.02 44.38 219.002 49.3973Z\"\n                                 fill=\"url(#paint15_linear)\" />\n                             <path\n                                 d=\"M149.17 179.759C145.479 183.45 139.491 183.45 135.8 179.759C132.108 176.067 132.108 170.08 135.8 166.389C139.491 162.698 145.479 162.698 149.17 166.389C152.862 170.08 152.862 176.067 149.17 179.759Z\"\n                                 fill=\"url(#paint16_linear)\" />\n                             <path\n                                 d=\"M51.6675 68.6649C49.8168 70.5155 46.8279 70.5155 44.9772 68.6649C43.1265 66.8144 43.1265 63.8258 44.9772 61.9752C46.8279 60.1246 49.8168 60.1246 51.6675 61.9752C53.5182 63.8258 53.5182 66.8144 51.6675 68.6649Z\"\n                                 fill=\"url(#paint17_linear)\" />\n                             <path\n                                 d=\"M315.416 128.467C313.565 130.318 310.577 130.318 308.726 128.467C306.875 126.617 306.875 123.628 308.726 121.777C310.577 119.927 313.565 119.927 315.416 121.777C317.257 123.628 317.257 126.626 315.416 128.467Z\"\n                                 fill=\"url(#paint18_linear)\" />\n                         </g>\n                         <defs>\n                             <pattern id=\"pattern0\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n                                 <use xlink:href=\"#image0\" />\n                             </pattern>\n                             <pattern id=\"pattern1\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n                                 <use xlink:href=\"#image1\" />\n                             </pattern>\n                             <pattern id=\"pattern2\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n                                 <use xlink:href=\"#image2\" />\n                             </pattern>\n                             <pattern id=\"pattern3\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n                                 <use xlink:href=\"#image3\" />\n                             </pattern>\n                             <pattern id=\"pattern4\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n                                 <use xlink:href=\"#image4\" />\n                             </pattern>\n                             <linearGradient id=\"paint0_linear\" x1=\"219.519\" y1=\"-75.2487\" x2=\"106.781\" y2=\"45.1669\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#BCBEC4\" />\n                                 <stop offset=\"1\" stop-color=\"#EDEEF0\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint1_linear\" x1=\"167.052\" y1=\"64.1879\" x2=\"78.8543\" y2=\"-20.1804\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#BCBEC4\" />\n                                 <stop offset=\"0.2531\" stop-color=\"#CCCED2\" />\n                                 <stop offset=\"0.715\" stop-color=\"#E4E5E8\" />\n                                 <stop offset=\"1\" stop-color=\"#EDEEF0\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint2_linear\" x1=\"4.56596\" y1=\"-101.612\" x2=\"102.732\" y2=\"4.9981\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#D8D9DD\" />\n                                 <stop offset=\"0.5538\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"1\" stop-color=\"#F7F7F8\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint3_linear\" x1=\"-41.1431\" y1=\"-48.1824\" x2=\"70.7349\" y2=\"-48.1824\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#F7F7F8\" />\n                                 <stop offset=\"0.4462\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#D8D9DD\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint4_linear\" x1=\"70.7349\" y1=\"53.0523\" x2=\"172.577\" y2=\"53.0523\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#F7F7F8\" />\n                                 <stop offset=\"0.4462\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#D8D9DD\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint5_linear\" x1=\"172.577\" y1=\"-8.81335\" x2=\"259.892\" y2=\"-8.81335\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#F7F7F8\" />\n                                 <stop offset=\"0.4462\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#D8D9DD\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint6_linear\" x1=\"121.656\" y1=\"94.4664\" x2=\"245.197\" y2=\"94.4664\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#F7F7F8\" />\n                                 <stop offset=\"0.4462\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#D8D9DD\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint7_linear\" x1=\"172.577\" y1=\"30.5557\" x2=\"259.892\" y2=\"30.5557\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#D8D9DD\" />\n                                 <stop offset=\"0.5538\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"1\" stop-color=\"#F7F7F8\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint8_linear\" x1=\"245.197\" y1=\"30.5557\" x2=\"396.547\" y2=\"30.5557\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#D8D9DD\" />\n                                 <stop offset=\"0.5538\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"1\" stop-color=\"#F7F7F8\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint9_linear\" x1=\"115.676\" y1=\"127.357\" x2=\"245.197\" y2=\"127.357\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#D8D9DD\" />\n                                 <stop offset=\"0.5538\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"1\" stop-color=\"#F7F7F8\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint10_linear\" x1=\"70.7349\" y1=\"88.499\" x2=\"121.656\" y2=\"88.499\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#BCBEC4\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint11_linear\" x1=\"245.197\" y1=\"68.9021\" x2=\"396.547\" y2=\"68.9021\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#BCBEC4\" />\n                                 <stop offset=\"0.5538\" stop-color=\"#EDEEF0\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint12_linear\" x1=\"-49.2237\" y1=\"-9.47257\" x2=\"2.45801\" y2=\"21.6616\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#F7F7F8\" />\n                                 <stop offset=\"0.4462\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#D8D9DD\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint13_linear\" x1=\"-47.6552\" y1=\"217.496\" x2=\"32.4366\" y2=\"138.126\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.0376\" stop-color=\"#BCBEC4\" />\n                                 <stop offset=\"0.5538\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"1\" stop-color=\"#F7F7F8\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint14_linear\" x1=\"289.643\" y1=\"57.1664\" x2=\"456.327\" y2=\"56.691\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop stop-color=\"#F7F7F8\" />\n                                 <stop offset=\"0.4462\" stop-color=\"#EDEEF0\" />\n                                 <stop offset=\"0.9624\" stop-color=\"#BCBEC4\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint15_linear\" x1=\"196.301\" y1=\"19.144\" x2=\"212.199\" y2=\"43.8748\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.2107\" stop-color=\"#55EAF7\" />\n                                 <stop offset=\"0.3747\" stop-color=\"#52C0E9\" />\n                                 <stop offset=\"0.6753\" stop-color=\"#4E78D2\" />\n                                 <stop offset=\"0.8914\" stop-color=\"#4B4AC4\" />\n                                 <stop offset=\"1\" stop-color=\"#4A39BE\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint16_linear\" x1=\"128.13\" y1=\"157.127\" x2=\"143.898\" y2=\"174.648\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.2107\" stop-color=\"#55EAF7\" />\n                                 <stop offset=\"0.3747\" stop-color=\"#52C0E9\" />\n                                 <stop offset=\"0.6753\" stop-color=\"#4E78D2\" />\n                                 <stop offset=\"0.8914\" stop-color=\"#4B4AC4\" />\n                                 <stop offset=\"1\" stop-color=\"#4A39BE\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint17_linear\" x1=\"42.5093\" y1=\"57.1056\" x2=\"51.4316\" y2=\"69.7028\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.2107\" stop-color=\"#55EAF7\" />\n                                 <stop offset=\"0.3747\" stop-color=\"#52C0E9\" />\n                                 <stop offset=\"0.6753\" stop-color=\"#4E78D2\" />\n                                 <stop offset=\"0.8914\" stop-color=\"#4B4AC4\" />\n                                 <stop offset=\"1\" stop-color=\"#4A39BE\" />\n                             </linearGradient>\n                             <linearGradient id=\"paint18_linear\" x1=\"304.797\" y1=\"114.619\" x2=\"313.048\" y2=\"126.537\"\n                                 gradientUnits=\"userSpaceOnUse\">\n                                 <stop offset=\"0.2107\" stop-color=\"#55EAF7\" />\n                                 <stop offset=\"0.3747\" stop-color=\"#52C0E9\" />\n                                 <stop offset=\"0.6753\" stop-color=\"#4E78D2\" />\n                                 <stop offset=\"0.8914\" stop-color=\"#4B4AC4\" />\n                                 <stop offset=\"1\" stop-color=\"#4A39BE\" />\n                             </linearGradient>\n                             <clipPath id=\"clip0\">\n                                 <rect width=\"881\" height=\"760\" fill=\"white\" transform=\"translate(-217 -428)\" />\n                             </clipPath>\n                             <image id=\"image0\"\n                                 xlink:href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwkAAALUCAYAAABATH7JAAAACXBIWXMAAAsSAAALEgHS3X78AAAA\" />\n                             <image id=\"image1\"\n                                 xlink:href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAADACAYAAACNkhYYAAAACXBIWXMAAAsSAAALEgHS3X78AAAA\" />\n                             <image id=\"image2\"\n                                 xlink:href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWUAAAFHCAYAAAB54V2GAAAACXBIWXMAAAsSAAALEgHS3X78AAAA\" />\n                             <image id=\"image3\"\n                                 xlink:href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV0AAAEcCAYAAABkjGd+AAAACXBIWXMAAAsSAAALEgHS3X78AAAA\" />\n                             <image id=\"image4\"\n                                 xlink:href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAADeCAYAAADIDT4DAAAACXBIWXMAAAsSAAALEgHS3X78AAAA\" />\n                         </defs>\n                     </svg>\n\n                 </div>\n                 <div class=\"backButton\">\n                     <button @click=\"close\" class=\"modern-button-small btnSecondary\"><span\n                             class=\"ico_back\"></span></button>\n                 </div>\n             </div>\n             <div class=\"row\">\n                 <div class=\"middleButton\">\n                     <button class=\"modern-button-rounded  btnSecondary\"><span class=\"ico_password\"></span></button>\n                 </div>\n             </div>\n         </div>\n\n         <div class=\"container\" v-if=\"!isValidate\">\n             <component-form :schema=\"formSchema\" :data=\"formDefaultData\" :buttons=\"buttons\" @on-submit=\"onSubmit\">\n             </component-form>\n\n         </div>\n         <div class=\"container\" v-else>\n             <component-form :schema=\"formSchemaPass\" :data=\"formPasswordData\" :buttons=\"buttonsPass\"\n                 @on-submit=\"onSubmitPass\"></component-form>\n             <p class=\"cancel\"><a href=\"#\" @click=\"close\">Cancelar</a></p>\n         </div>\n     </div>\n     <modal-to-sms-code :is-active=\"smsIsActive\" @request-sms-code=\"requestSmsCode\">\n     </modal-to-sms-code>\n </div>\n "
};