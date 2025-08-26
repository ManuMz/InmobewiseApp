"use strict";

/**
 * Area para testing comentar en prodduction
 */

/*$(document).ready(function(){
    content.init("testing","1",'{"nombre":"Ivan Villegas rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"90796","_cartCollection":{"data":[{"cp":"90796","idProBodPre":"5","idCaracteristica":"13","cantidad":"1"},{"cp":"90796","idProBodPre":"6","idCaracteristica":"16","cantidad":"1"}]}}')
});*/
var content = new Vue({
  el: "#cart",
  components: {
    'header-nav': headerNav,
    'products-in-cart': productosInCart,
    'confirm-cart': confirmCart
  },
  data: function data() {
    return {
      initialize: {},
      productos: [],
      isActiveConfirmCart: false,
      total: 0,
      locations: {
        type: Array,
        "default": []
      }
    };
  },
  watch: {
    initialize: function initialize() {
      this.requestProductos();
      this.requestAsentamiento();
    }
  },
  methods: {
    init: function init(use_mode, id_app, data) {
      this.initialize = {
        use_mode: use_mode,
        id_app: id_app,
        data: JSON.parse(data)
      };
      var idPayment = getParameterByName('id');
      this.redirectPayment(idPayment);
    },
    deleteProduct: function deleteProduct(id) {
      var tempProducto = [];
      this.productos.forEach(function (product) {
        if (product.idProBodPre != id) {
          tempProducto.push(product);
        }
      });
      var params = "id=" + id;
      comunicateWebView("delete-cart", params);
      this.setProductos(tempProducto);
    },
    changeProduct(id){
      console.log('Finaly component');
      console.log(id);
    },decrementProduct(){

    },
    redirectPayment: function redirectPayment(idPayment) {
      if (idPayment != "") {
        //Esto lo hago para redireccionar el pedido, activarlo y validarlo
        window.location.replace("../payment?id=" + idPayment + "&use_mode=" + this.initialize.use_mode);
      }
    },
    setProductos: function setProductos(productos) {
      this.productos = productos;
    },
    setActiveConfirmCart: function setActiveConfirmCart() {
      this.isActiveConfirmCart = !this.isActiveConfirmCart;
    },
    onChangeTotal: function onChangeTotal(total) {
      var tempCardCobro = this.$refs['productosInCart'].$refs['card-cobro'];

      if (tempCardCobro.envio) {
        if (tempCardCobro.$props.limiteEnvio > total) {
          this.total = total + tempCardCobro.costoEnvio;
        } else {
          this.total = total;
        }
      } else {
        this.total = total;
      }
    },
    standarLocation: function standarLocation(formSubmit) {
      return "Calle: " + formSubmit.data.input_calle.value + " #Int: " + formSubmit.data.input_no_int.value + " #Ext: " + formSubmit.data.input_no_ext.value + " Municipio: " + this.locations[0].D_mnpio + " Ciudad: " + this.locations[0].d_ciudad + " Estado: " + this.locations[0].d_estado;
    },
    requestProductos: function requestProductos() {
      var service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/Productoscaracteristicas.php" : "https://arvispace.com/serviciosASAR/Productoscaracteristicas.php";
      var tempProductos = [];

      this.initialize.data._cartCollection.data.forEach(function (producto) {
        tempProductos.push(parseInt(producto.idProBodPre));
      });

      var form = new FormData();
      form.append('idProBodPre', JSON.stringify(tempProductos));
      axios.post(service, form).then(function (response) {
        //cachamos informacion 
        content.productos = response.data; //this.setProductos(response.data);
      })["catch"](function (error) {
        //devolvemos error en caso de que lo haya
        console.log(error);
      });
    },
    requestAsentamiento: function requestAsentamiento() {
      var service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/cpAsentamientoEstados.php" : "https://arvispace.com/serviciosASAR/cpAsentamientoEstados.php";
      var form = new FormData();
      form.append('cp', this.initialize.data.postal_code);
      axios.post(service, form).then(function (response) {
        content.locations = response.data;
      })["catch"](function (e) {
        console.log(e);
      });
    },
    validateExists: function validateExists(formSubmit) {
      /*
      /***
       * Validamos existencias bro
       */
      //creamos arreglo de productos que nos ayudara a validar existencias
      var toValidateExisting = []; //recorremos nuestros productos para ver cual va a comprar

      for (var index = 0; index < this.$refs.productosInCart.$refs.dataPorProducto.length; index++) {
        /**
         * Get references from childs 
         */
        var element = this.$refs.productosInCart.$refs.dataPorProducto[index]; //Variable para el producto y no entrar a cada rato a las refs de element

        var producto = element._props.producto; //objeto temporal con atributos para saber cuantos va a comprar

        /**
         * esto esta estatico aun, debe de detectar cambios de cantidad y de caracteristica en front end
         */

        var tempProduct = {
          idBodPro: producto.idProBodPre,
          count: element.inputNumberData.value,
          //estatico de mientras!
          id_caracteristica: producto.Caracteristicas[element.selectedIndex].idCaracteristica,
          codigo: producto.Caracteristicas[element.selectedIndex].codigo
        }; //agregamos a nuestro arreglo

        toValidateExisting.push(tempProduct);
      }

      console.log(toValidateExisting);
      var form = new FormData();
      form.append('arregloProductos', JSON.stringify(toValidateExisting)); //consumimos servicio

      var service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/validaExistencias.php" : "https://arvispace.com/serviciosASAR/validaExistencias.php";
      formSubmit.buttons.content = "Validando exitencias...";
      axios.post(service, form).then(function (response) {
        if (response.status == 200) {
          //validat if request is success
          console.log(response.data);

          if (response.data[0].metodo == 1) {
            /**
             * Hay existencias
             */
            //limpiamos el carrito de la app una vez que se inserten los datos
            content.createPayOrder(formSubmit);
          } else {
            /**
             * No hay existencias
             */
            createAviso("No podemos surtir el pedido debido a la falta de productos.");
          }
        }
      })["catch"](function (e) {
        createAviso(e);
        formSubmit.buttons.content = "Reintentar";
        formSubmit.buttons.disabled = false;
      });
    },
    createPayOrder: function createPayOrder(formSubmit) {
      var form = new FormData();
      form.append('total', this.total);
      form.append('name', this.initialize.data.nombre);
      form.append('email', this.initialize.data.correo);
      form.append('phone_number', this.initialize.data.telefono);
      form.append('calle', formSubmit.data.input_calle.value);
      form.append('asentamiento', formSubmit.data.select_asentamiento.value);
      form.append('referencias', formSubmit.data.input_referencias.value);
      form.append('cp', this.initialize.data.postal_code);
      form.append('noExt', formSubmit.data.input_no_ext.value);
      form.append('noInt', formSubmit.data.input_no_int.value);
      form.append('estado', this.locations[0].d_estado);
      form.append('ciudad', this.locations[0].d_ciudad);
      form.append('municipio', this.locations[0].D_mnpio);
      form.append('description_charge', "Compra desde ARVISPACE");
      form.append('url_to_redirect', window.location.href);
      var service = this.initialize.use_mode == "testing" ? "https://arvispace.com/lib/paymenttesting/pay.php" : "https://arvispace.com/lib/payment/pay.php";
      formSubmit.buttons.content = "Creando orden...";
      axios.post(service, form).then(function (response) {
        if (response.status == 200) {
          if (response.data.status == "charge_pending") {
            content.insertOrder(response.data, formSubmit);
          } else {
            createAviso(response.data);
            formSubmit.buttons.content = "Reintentar";
            formSubmit.buttons.disabled = false;
          }
        }
      })["catch"](function (e) {
        createAviso(e);
        formSubmit.buttons.content = "Reintentar";
        formSubmit.buttons.disabled = false;
        console.log(e);
      });
    },
    insertOrder: function insertOrder(responseBank, formSubmit) {
      var service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/insertarPedido.php" : "https://arvispace.com/serviciosASAR/insertarPedido.php"; //creamos arreglo de productos que se ordenaron

      var productsToOrder = []; //recorremos nuestros productos para ver cual va a comprar

      for (var index = 0; index < this.$refs.productosInCart.$refs.dataPorProducto.length; index++) {
        /**
         * Get references from childs 
         */
        var element = this.$refs.productosInCart.$refs.dataPorProducto[index]; //Variable para el producto y no entrar a cada rato a las refs de element

        var producto = element._props.producto; //objeto temporal con atributos para saber cuantos va a comprar

        /**
         * esto esta estatico aun, debe de detectar cambios de cantidad y de caracteristica en front end
         */

        var tempProduct = {
          idBodPro: producto.idProBodPre,
          count: element.inputNumberData.value,
          //estatico de mientras!
          CantidadPromocion: 0,
          TotalProducto: producto.Caracteristicas[element.selectedIndex].statusOferta == "1" ? producto.Caracteristicas[element.selectedIndex].precioOferta : producto.Caracteristicas[element.selectedIndex].precio,
          totalPag: this.total,
          id_caracteristica: producto.Caracteristicas[element.selectedIndex].idCaracteristica,
          codigo: producto.Caracteristicas[element.selectedIndex].codigo
        }; //agregamos a nuestro arreglo

        productsToOrder.push(tempProduct);
      }

      console.log(productsToOrder);
      var form = new FormData();
      form.append('arregloProductos', JSON.stringify(productsToOrder));
      form.append('total', this.total);
      form.append('correoCliente', this.initialize.data.correo);
      form.append('telefono', this.initialize.data.telefono);
      form.append('direccion', this.standarLocation(formSubmit));
      form.append('referencias', formSubmit.data.input_referencias.value);
      form.append('idEmpresaApp', this.initialize.id_app);
      form.append('MetodoPag', 'Tarjeta');
      form.append('idBanco', responseBank.id);
      formSubmit.buttons.content = "Agregando productos...";
      axios.post(service, form).then(function (response) {
        if (response.status == 200) {
          //success request
          console.log(response.data);

          if (response.data.metodo == 1) {
            //success pedido
            window.location.replace(responseBank.url); //window.location.replace(responseBank.url);
          } else {
            createAviso("Error inesperado intentelo nuevamente");
            formSubmit.buttons.content = "Reintentar";
            formSubmit.buttons.disabled = false;
          }
        }
      })["catch"](function (e) {
        createAviso(e);
        formSubmit.buttons.content = "Reintentar";
        formSubmit.buttons.disabled = false;
        console.log(e);
      });
    }
    /*
    timerToOrder(responseBank){
      /**
       *  Ya funciona el schedule
       *
      let form = new FormData();
      let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/tiempos.php" : "https://arvispace.com/serviciosASAR/tiempos.php";
      form.append('correo',this.initialize.data.correo);
      form.append('idBanco',responseBank.id);
        axios.post(service, form).then(function(response){
          console.log(response);
      }).catch(function(e){
          console.log(e);
      });
    }*/

  }
});