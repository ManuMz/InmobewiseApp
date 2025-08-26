
 $(document).ready(function() {
    //content.init("testing","1",'{"nombre":"Ivan Villegas rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"90796","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}')
    content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1747","idCaracteristica":"17472","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1749","idCaracteristica":"17474","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}, {"cp":"72100","idProBodPre":"1754","idCaracteristica":"17479","cantidad":"1"}]}}')
    // content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}, {"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}')
    // content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}') //, {"cp":"72100","idProBodPre":"1754","idCaracteristica":"17479","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}')
    // content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Ivan Villegas rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"72106","_cartCollection":{"data":[{"cp":"90796","idProBodPre":"6","idCaracteristica":"16","cantidad":"1"}]}}')
     //content.init("testing","1",'{"nombre":"Ivan Villegas rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"72106","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1752","idCaracteristica":"17477","cantidad":"1"}]}}')
     //content.init("testing","1",'{"nombre":"Ivan Villegas rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"90796","_cartCollection":{"data":[{"cp":"90796","idProBodPre":"1543","idCaracteristica":"1568","cantidad":"1"},{"cp":"90796","idProBodPre":"1543","idCaracteristica":"1568","cantidad":"1"},{"cp":"90796","idProBodPre":"1543","idCaracteristica":"1568","cantidad":"1"}]}}')
     //content.init("testing","68",'{"nombre":"Ivan Villegas rojas","correo":"villegas.rojas.ivan@gmail.com","telefono":"2211620123","postal_code":"90796","_cartCollection":{"data":[{"cp":"90796","idProBodPre":"1426","idCaracteristica":"1447","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1748","idCaracteristica":"17473","cantidad":"1"}]}}')
    //content.init("testing","1",'{"nombre":"Manuelito","correo":"Manuelito@gmail.com","telefono":"2211620123","postal_code":"72100","_cartCollection":{"data":[{"cp":"72100","idProBodPre":"1747","idCaracteristica":"17472","cantidad":"1"}]}}')
});

 let content = new Vue({
    el: "#cart",
    components: {
        'header-nav': headerNav,
        'products-in-cart': productosInCart,
        'confirm-cart': confirmCart
    },
    data() {
        return {
            initialize: {},
            productos: [],
            productosPaquetes: [],
            datosEnvio: [], //[0]=Peso, [1]=EnvioCosto
            datosEmpaquetado:[],  //se genera prueba para enviar  
            cajaEnvio:[],
            isActiveConfirmCart: false,
            total: 0,
            costoEnvio:0,
            locations: {
                type: Array,
                default: []
            },
            productoServidor: []
        }
    },
    watch: {
        initialize() {
            this.requestProductos();
            this.requestAsentamiento();
            this.requestCostoEnvio() //agregado requestCostoEnvio
            this.setPackageCost();
        }
    },
    mounted() {
    },
    methods: {
        init(use_mode, id_app, data) {
            this.initialize = {
                use_mode: use_mode,
                id_app: id_app,
                data: JSON.parse(data)
            }
            let idPayment = getParameterByName('id');
            this.redirectPayment(idPayment);
        },
        deleteProduct(id) {
            let tempProducto = [];
            this.productos.forEach(product => {
                if (product.idProBodPre !== id) {
                    tempProducto.push(product);
                }
            });
 
            let params = "id=" + id;
            comunicateWebView("delete-cart", params);
            this.setProductos(tempProducto);
        },
        changeProduct(id){
            this.initialize.data._cartCollection.data.forEach(function (producto) {
                if (producto.idProBodPre === id) {
                    producto.cantidad =  parseInt(producto.cantidad) + 1;
                }
            });
        },
        decrementProduct(id){
            this.initialize.data._cartCollection.data.forEach(function (producto) {
                if (producto.idProBodPre === id) {
                    producto.cantidad = producto.cantidad >1? parseInt(producto.cantidad) - 1:0;
                }
            });
        },
        requestCostoEnvio(){ //agregado 
            let service = this.initialize.use_mode === "testing" ?
                "https://arvispace.com/serviciosASAR/infoPedido.php" : 
                "https://arvispace.com/serviciosASAR/infoPedido.php"; 
            axios.get(service).then(function (response) {
                //cachamos informacion 
                if(response.status ==200){
                    content.setCostoEnvio(response.data)
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        setCostoEnvio(data){
            let {everFree} = data
            if(everFree.toLowerCase() == "y"){
                //TODO: siempre e gratis
                this.costoEnvio = costo
                //console.log("costo envio"+this.costoEnvio);
                this.limitToFree = 0
            }
            else{
                let {hasLimitToFree} = data
                if(hasLimitToFree.toLowerCase() == "y"){
                    let {costo,limitToFree} = data
                    this.costoEnvio = costo
                    this.limitToFree = limitToFree
                }else{

                    let {costo} = data
                    this.costoEnvio = costo
                    this.limitToFree = 999999999
                    //console.log(productInCart.limitToFree)
                }
            }
            this.requestProductos();
        }, //aquí termina lo agregado
        redirectPayment(idPayment) {
            if (idPayment != "") {
                //Esto lo hago para redireccionar el pedido, activarlo y validarlo
                window.location.replace("../payment?id=" + idPayment + "&use_mode=" + this.initialize.use_mode);
            }
        },
        setProductos(productos) {
            this.productos = productos;
        },
        setActiveConfirmCart() {
            this.sessionvalidate();
        },
        regresarCarCobro() {
            this.sessionvalidate2();
        },
        setEjecucionScript() {
            let element = this.$refs.productosInCart.regresarFunctionIncar();
        },
        ejecutaconsultaExistencia() {
            this.clickedbuttonExist();
        },
        clickedbuttonExist() {
            this.$refs.productosInCart.activarEstatusCar();
        },
        onChangeTotal(total) {
            let tempCardCobro = this.$refs['productosInCart'].$refs['card-cobro'];
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
        setPackageCost(){
            this.getPackage();
 
            let tempCardCobro = this.$refs['productosInCart'].$refs['card-cobro'];
            var stored = localStorage['DatosPaquete'];
            if (stored && stored != "") {
                myVar = JSON.parse(stored);
                tempCardCobro.dataEnvio = myVar.Viaje.Total;

                tempCardCobro.isDisabled();
            }
            if (stored == "") {
                tempCardCobro.isDisabled();
            }
        },
        standarLocation(formSubmit) {
            return "Calle: " + formSubmit.data.input_calle.value + " #Int: " + formSubmit.data.input_no_int.value + " #Ext: " + formSubmit.data.input_no_ext.value + " C.P.: " +this.initialize.data.postal_code + " Municipio: " + this.locations[0].D_mnpio + " Col.: " + formSubmit.data.select_asentamiento.value + " Ciudad: " + this.locations[0].d_ciudad + " Estado: " + this.locations[0].d_estado;
        },
        requestProductos() {
 
            // ESTE ES EL ORIGINAL let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/Productoscaracteristicas.php" : "https://arvispace.com/serviciosASARAmbientePruebas/Productoscaracteristicas.php";
            let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/Productoscaracteristicas.php" : "https://arvispace.com/serviciosASAR/Productoscaracteristicas.php";  
            let tempProductos = [];
            this.initialize.data._cartCollection.data.forEach(producto => {
                tempProductos.push(parseInt(producto.idProBodPre));
            });
            let form = new FormData();
            form.append('idProBodPre', JSON.stringify(tempProductos));
            axios.post(service, form).then(function(response) {
                //cachamos informacion 
                content.productos = response.data;
                //this.setProductos(response.data);
            }).catch(function(error) {
                //devolvemos error en caso de que lo haya
                console.log(error);
            });
        },
        requestAsentamiento() {
            //ESTE ES EL ORIGINAL let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/cpAsentamientoEstados.php" : "https://arvispace.com/serviciosASARAmbientePruebas/cpAsentamientoEstados.php";
            let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/cpAsentamientoEstados.php" : "https://arvispace.com/serviciosASAR/cpAsentamientoEstados.php"; 
            let form = new FormData();
            form.append('cp', this.initialize.data.postal_code); // voy a comentar esto y solo igualare el cp como el que si sirve
            axios.post(service, form).then(function(response) {
                content.locations = response.data;
            }).catch(function(e) {
                console.log(e);
            })
        },
        validateExists(formSubmit) {

            this.ejecutaconsultaExistencia();
            let toValidateExisting = [];

            for (let index = 0; index < this.$refs.productosInCart.$refs.dataPorProducto.length; index++) {
                /**
                 * Get references from childs 
                 */
                let element = this.$refs.productosInCart.$refs.dataPorProducto[index];
                //Variable para el producto y no entrar a cada rato a las refs de element
                let producto = element._props.producto;
                //objeto temporal con atributos para saber cuantos va a comprar
                /**
                 * esto esta estatico aun, debe de detectar cambios de cantidad y de caracteristica en front end
                 */
                let tempProduct = {
                        idBodPro: producto.idProBodPre,
                        count: element.inputNumberData.value, //estatico de mientras!
                        id_caracteristica: producto.Caracteristicas[element.selectedIndex].idCaracteristica,
                        codigo: producto.Caracteristicas[element.selectedIndex].codigo
                    }
                toValidateExisting.push(tempProduct);
            }
 
            let form = new FormData();
            form.append('arregloProductos', JSON.stringify(toValidateExisting));
            form.append('codigoPostal', this.initialize.data.postal_code); //pasa el codigo pstal

             let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/validaExistencias.php" : "https://arvispace.com/serviciosASAR/validaExistencias.php";
            formSubmit.buttons.content = "Validando exitencias...";
            axios.post(service, form).then(function(response) {
 
                //alert("response"+response);
                if (response.data[0].metodo == 3) {
                    createAviso("Lo sentimos no tenemos cobertura en esta zona: ");
                } else {
                    if (response.data[0].metodo == 1) {
                        /**
                         * Hay existencias
                         */
                        //limpiamos el carrito de la app una vez que se inserten los datos
                        content.createPayOrder(formSubmit);
                    } else {
 
 
                        let arrayDatos = JSON.stringify(response.data);
                        let variebleLocalArray = arrayDatos.toString();
                        let variableArrayReplace = variebleLocalArray.replace(/[\[\]'"{}]+/g, '')
                            //alert("variebleLocalArray:  \n"+variebleLocalArray.replace(/[\[\]'"{}]+/g,''));
                        createAviso("No podemos surtir el pedido debido a que los siguientes productos ya no cuentan con existencias: " +
                            variableArrayReplace
                        );
 
 
                    }
                }

            }).catch(function(e) {
                createAviso(e);
                formSubmit.buttons.content = "Reintentar";
                formSubmit.buttons.disabled = false;
            });
            /*}*/
 
        },
        createPayOrder(formSubmit) {
            let form = new FormData();
 
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
            form.append('description_charge', "Compra desde Inmobewise");
            form.append('url_to_redirect', window.location.href);
 
            //let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/lib/payment/pay.php":"https://arvispace.com/lib/payment/pay.php";//tiene la de produccion y testing
            // ESTE ES LA ORIGINAL let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/lib/paymenttesting/pay.php" : "https://arvispace.com/lib/paymenttesting/pay.php"; //tiene la de testing
            let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/lib/payment/pay.php":"https://arvispace.com/lib/payment/pay.php";//tiene la de produccion y testing
           // alert("se va alanzar el servicia de pay");
           const nombre_paqueteria = localStorage.getItem('cajaNombreData');
           const saved_nombre_paqueteria = JSON.parse(nombre_paqueteria);
           console.log("NombrePaqueteria de la empresa de envio es: " + nombre_paqueteria);
           console.log("Nombre de la empresa de envio es: " + saved_nombre_paqueteria);
           //console.log("Local storage BETOO: " + localStorage.getItem('DatosPaquete'));

           const datosPaquete =localStorage.getItem('DatosPaquete');
           const datoPaqueteJson = JSON.parse(datosPaquete);
           //console.log(datosPaquete);
           const empresaEnvio = datoPaqueteJson.Viaje.Empresa.toString();
           console.log("Empresa es de envio: " + empresaEnvio);

            formSubmit.buttons.content = "Creando orden...";
            axios.post(service, form).then(function(response) {
                if (response.status == 200) {
                    if (response.data.status == "charge_pending") {
                        content.insertOrder(response.data, formSubmit, empresaEnvio);
                    } else {
                        createAviso(response.data);
                        formSubmit.buttons.content = "Reintentar";
                        formSubmit.buttons.disabled = false;
                    }
                }
            }).catch(function(e) {
 
                createAviso(e);
                formSubmit.buttons.content = "Reintentar";
                formSubmit.buttons.disabled = false;
                console.log(e);
            });
        },
        entreCalles(formSubmit){
            return formSubmit.data.input_calle_1.value + " Y " +formSubmit.data.input_calle_2.value;
        },
        insertOrder(responseBank, formSubmit, empresaEnvio) {
 
            // Este es el original let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASARAmbientePruebas/insertarPedido.php" : "https://arvispace.com/serviciosASARAmbientePruebas/insertarPedido.php";
            let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/insertarPedido.php" : "https://arvispace.com/serviciosASAR/insertarPedido.php";
 
            //creamos arreglo de productos que se ordenaron
            let productsToOrder = [];
            //recorremos nuestros productos para ver cual va a comprar
            for (let index = 0; index < this.$refs.productosInCart.$refs.dataPorProducto.length; index++) {
                /**
                 * Get references from childs 
                 */
                let element = this.$refs.productosInCart.$refs.dataPorProducto[index];
 
                //Variable para el producto y no entrar a cada rato a las refs de element
                let producto = element._props.producto;
                //objeto temporal con atributos para saber cuantos va a comprar
                /**
                 * esto esta estatico aun, debe de detectar cambios de cantidad y de caracteristica en front end
                 */
                let tempProduct = {
                        idBodPro: producto.idProBodPre,
                        count: element.inputNumberData.value, //estatico de mientras!
                        CantidadPromocion: 0,
                        TotalProducto: producto.Caracteristicas[element.selectedIndex].statusOferta == "1" ? producto.Caracteristicas[element.selectedIndex].precioOferta : producto.Caracteristicas[element.selectedIndex].precio,
                        totalPag: this.total,
                        id_caracteristica: producto.Caracteristicas[element.selectedIndex].idCaracteristica,
                        codigo: producto.Caracteristicas[element.selectedIndex].codigo
                    }
                    //agregamos a nuestro arreglo
                productsToOrder.push(tempProduct);
            }
 
            console.log(productsToOrder);
 
            let form = new FormData();
            form.append('arregloProductos', JSON.stringify(productsToOrder));
            form.append('total', this.total);
            form.append('express',0); //agregado xd
            form.append('correoCliente', this.initialize.data.correo);
            form.append('telefono', this.initialize.data.telefono);
            form.append('direccion', this.standarLocation(formSubmit));
            //form.append('numeroInterior', formSubmit.data.input_no_int.value);
            let numeroInteriorValue = formSubmit.data.input_no_int.value;
            if (numeroInteriorValue === '') {
                //lo establecemos como 0 si la cadena es vacia, pq da error en la bd aunque el campo sea null
                numeroInteriorValue = 0;
                //numeroInteriorValue = null;
            }
            form.append('numeroInterior', numeroInteriorValue);
            form.append('numeroExterior', formSubmit.data.input_no_ext.value);
            form.append('referencias', formSubmit.data.input_referencias.value);
            form.append('idEmpresaApp', this.initialize.id_app);
            form.append('MetodoPag', 'Tarjeta');
            form.append('idBanco', responseBank.id);
            form.append('street',formSubmit.data.input_calle.value);
            form.append('suburb',formSubmit.data.select_asentamiento.value);
            form.append('crossStreet',this.entreCalles(formSubmit));
            form.append('zipCode',this.initialize.data.postal_code);
            
            form.append('nombreEntrega', empresaEnvio);
 
            formSubmit.buttons.content = "Agregando productos...";
            //agregado aquí
                        //Obtenemos los datos que queremos guardar
                        let formDatGuia={
                            name: this.initialize.data.nombre,
                            email: this.initialize.data.correo,
                            phone_number: this.initialize.data.telefono,
                            direccion: this.standarLocation(formSubmit),
                            numeroInterior: formSubmit.data.input_no_int.value,
                            numeroExterior: formSubmit.data.input_no_ext.value,
                            referencias: formSubmit.data.input_referencias.value,
                            street: formSubmit.data.input_calle.value,
                            suburb: formSubmit.data.select_asentamiento.value,
                            crossStreet: this.entreCalles(formSubmit),
                            zipCode: this.initialize.data.postal_code
                        }
                        // convertimos el obj en una cadena JSON
                        let formDataJSON = JSON.stringify(formDatGuia);
            
                        //Guardamos la cadena en el localStorage
                        localStorage.setItem('formDatGuia',formDataJSON);
            //hasta aquí 
            axios.post(service, form).then(function(response) {
                if (response.status == 200) {
                    //success request
 
                    console.log(response.data);
                    if (response.data.metodo == 1) { //success pedido
                        window.location.replace(responseBank.url);
                        //window.location.replace(responseBank.url);
                    } else {
                        createAviso("Error inesperado intentelo nuevamente");
                        formSubmit.buttons.content = "Reintentar";
                        formSubmit.buttons.disabled = false;
                    }
                }
            }).catch(function(e) {
                createAviso(e);
                formSubmit.buttons.content = "Reintentar";
                formSubmit.buttons.disabled = false;
                console.log(e);
            });
        },
        sessionvalidate() {
            console.log("corre: " + this.initialize.data.correo);
            let correo = this.initialize.data.correo;
 
            let passa = 0;
 
            if (correo == "") {
                passa = 1;
            }
 
            //no pasa 
            //passa=1;
            if (passa == 1) {
                createAviso("Para poder visualizar el carrito por favor inicialize sesión.");
 
                Swal.fire({
                    title: "<span style='color:#000000'>Presione el boton 'ok' para iniciar sesión</span>",
                    text: "",
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#c1c1c1',
                    confirmButtonText: "<span style='color:#000000'>OK</span>",
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.value) {
                        comunicateWebView("open-profile", "postal_code=" + 1);
 
                    }
                });
            } else {
                this.isActiveConfirmCart = !this.isActiveConfirmCart;
                this.clickedbuttonExist(); //#2
 
            }
        },
        getPackage()
        {
            localStorage['DatosPaquete'] = "";
            let tempCardCobro = this.$refs['productosInCart'].$refs['card-cobro'];
            tempCardCobro.dataEnvio = "";
            let cartReference = this;

            let tempProductos = [];
            let cartCollectionData = this.initialize.data._cartCollection.data;
            this.initialize.data._cartCollection.data.forEach(producto => {
                tempProductos.push(parseInt(producto.idProBodPre));
            });

            let form = new FormData();
            form.append('idProBodPre', JSON.stringify(tempProductos));
            let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/ObtenerPaquetesPorIdProBodPre_pro.php" : "https://arvispace.com/serviciosASAR/ObtenerPaquetesPorIdProBodPre_pro.php"; //ambos son iguales, producción y pruebas
            axios.post(service, form).then(async function (response) {
                if (response.status == 200) {
                    var cajas;
                    let volumenMaximoPaquete;
                    await axios.post('https://arvispace.com/serviciosASAR/obtenerCajasEmpaquetado_pro.php', form)
                        .then(function (response) {
                            if (response.status == 200) {
                                cajas = response.data;
                                let volumenMaximo = 0;
                                let cajaConVolumenMaximo = null;
                                for (let key in cajas) {
                                    if (key !== 'success') {
                                        let caja = cajas[key];
                                        let volumen = parseFloat(caja.Alto) * parseFloat(caja.Ancho) * parseFloat(caja.Largo);
                                        if (volumen > volumenMaximo) {
                                            volumenMaximo = volumen;
                                            cajaConVolumenMaximo = caja;
                                        }
                                    }
                                }


                                 volumenMaximoPaquete = volumenMaximo;
                                console.log('volumenMaximo');
                                console.log(volumenMaximo);
                                console.log('cajaConVolumenMaximo');
                                console.log(cajaConVolumenMaximo);
                            }
                        })
                        .catch(function (error) {
                            console.error('Error en la petición:', error);
                        });




                    this.productosPaquetes = response.data;
                    var pesoTotal = 0;
                   // let cantidadDeProducto = 1;
                    let cantidadDeProducto = 0;
                    var alturaGlobal=0;


                    const alturaAlta = 100;
                    const productosAltos = [];
                    const productosBajos = [];
                    let productosIndependientes = [];

                    this.productosPaquetes.forEach(producto => {
                        producto.volumen = producto.length * producto.height * producto.width;
                        if (producto.height > alturaAlta) {
                            productosAltos.push(producto);
                        } else {
                            productosBajos.push(producto);
                        }
                    });

                    const agruparPaquete = (productos) => {
                        let paqueteTemp = [];
                        let volumenTotalTemp = 0;

                        productos.sort((a, b) => b.volumen - a.volumen);

                        productos.forEach(producto => {
                            if (volumenTotalTemp + producto.volumen <= volumenMaximoPaquete) {
                                paqueteTemp.push(producto);
                                volumenTotalTemp += producto.volumen;
                            } else {
                                productosIndependientes.push(producto);
                            }
                        });

                        return paqueteTemp;
                    };

                    let paquetes = [];
                    paquetes.push(agruparPaquete(productosAltos));
                    paquetes.push(agruparPaquete(productosBajos));

                    console.log("Paquetes creados: JMVM", paquetes);
                    console.log("Paquetes independientes: JMVM", productosIndependientes);


                    const calcularCaja = (productos) => {
                        productos.sort((a, b) => (b.length * b.width * b.height) - (a.length * a.width * a.height));

                        let largoMaximo = 0;
                        let anchoMaximo = 0;
                        let alturaTotal = 0;

                        let volumenTotalTemp = 0;
                        let productosApilados = [];

                        productos.forEach(producto => {
                            if (volumenTotalTemp + (producto.length * producto.width * producto.height) <= volumenMaximoPaquete) {
                                productosApilados.push(producto);
                                volumenTotalTemp += (parseInt(producto.length) * parseInt(producto.width) * parseInt(producto.height));
                                largoMaximo = Math.max(largoMaximo, producto.length);
                                anchoMaximo = Math.max(anchoMaximo, producto.width);
                                alturaTotal += parseInt(producto.height);
                            }
                        });

                        return {
                            largo: largoMaximo,
                            ancho: anchoMaximo,
                            altura: alturaTotal
                        };
                    };

                    const dimensionesCaja = calcularCaja(this.productosPaquetes);

                    console.log("Dimensiones de la caja:");
                    console.log("Largo:", dimensionesCaja.largo, "cm");
                    console.log("Ancho:", dimensionesCaja.ancho, "cm");
                    console.log("Altura:", dimensionesCaja.altura, "cm");

                    console.log('AQUI EMPIEZA LA PRUEBA');
                    cartReference.datosEmpaquetado= [dimensionesCaja.largo,dimensionesCaja.ancho,dimensionesCaja.altura];
                    

                    
                    console.log(cartReference.datosEmpaquetado);
                    
                    
                   








                    //hasta qui JMVM




                    this.productosPaquetes.forEach(productoPaquete => {
                        cartCollectionData.forEach(producto => {
                            if (producto.idProBodPre == productoPaquete.idProBodPre) {
                                cantidadDeProducto = producto.cantidad;
                            }
                        });
                        pesoTotal += parseFloat(productoPaquete.weight) * cantidadDeProducto;
                        alturaGlobal+=parseFloat(productoPaquete.height) * cantidadDeProducto;
                    });
                    console.log("Peso total: " + pesoTotal);
                    console.log("Altura total: " + alturaGlobal);
                    cartReference.datosEnvio[0] = pesoTotal;
                    cartReference.datosEnvio[1]= alturaGlobal;

                    var tamanoBase = [0, 0, 0];
                    this.productosPaquetes.forEach(productoPaquete => {

                        let cantidadDeProducto = 1;
                        cartCollectionData.forEach(producto => {
                            if (producto.idProBodPre == productoPaquete.idProBodPre) {
                                cantidadDeProducto = producto.cantidad;
                            }
                        });
                        var valoresMasAltos = [0, 0];
                        var paqueteAlto = parseFloat(productoPaquete.height);
                        var paqueteLargo = parseFloat(productoPaquete.length);
                        var paqueteAncho = parseFloat(productoPaquete.width);

                        if (paqueteAlto <= paqueteLargo && paqueteAlto <= paqueteAncho) {
                            valoresMasAltos[0] = paqueteLargo;
                            valoresMasAltos[1] = paqueteAncho;
                            tamanoBase[2] += paqueteAlto * cantidadDeProducto;
                        }
                        //Largo y alto
                        if (paqueteAncho <= paqueteLargo && paqueteAncho <= paqueteAlto) {
                            valoresMasAltos[0] = paqueteLargo;
                            valoresMasAltos[1] = paqueteAlto;

                            tamanoBase[2] += paqueteAncho * cantidadDeProducto;
                        }
                        //Ancho y alto
                        if (paqueteLargo <= paqueteAncho && paqueteLargo <= paqueteAlto) {
                            valoresMasAltos[0] = paqueteAncho;
                            valoresMasAltos[1] = paqueteAlto;

                            tamanoBase[2] += paqueteLargo * cantidadDeProducto;
                        }

                        if (valoresMasAltos[0] > tamanoBase[0]) {
                            tamanoBase[0] = valoresMasAltos[0];

                            if (valoresMasAltos[1] > tamanoBase[1]) {
                                tamanoBase[1] = valoresMasAltos[1];
                            }
                        } else if (valoresMasAltos[0] > tamanoBase[1]) {
                            tamanoBase[1] = valoresMasAltos[0];

                            if (valoresMasAltos[1] > tamanoBase[0]) {
                                tamanoBase[0] = valoresMasAltos[1];
                            }
                        } else if (valoresMasAltos[1] > tamanoBase[0]) {
                            tamanoBase[0] = valoresMasAltos[1];
                        } else if (valoresMasAltos[1] > tamanoBase[1]) {
                            tamanoBase[1] = valoresMasAltos[1];
                        }
                    });
                    let caja = cartReference.getCajas(tamanoBase);
                }
            }).catch(function(e) {
                console.error("Error:", e);
            });
        },
        getCajas(volumen){
            let cartReference = this;

            let form = new FormData();
            console.log('volumen JMVM');
            console.log(volumen);
            let service = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/obtenerCajasEmpaquetado_pro.php" : "https://arvispace.com/serviciosASAR/obtenerCajasEmpaquetado_pro.php";
            axios.post(service, form).then(function(response) {
                if (response.status == 200) { 
 
                    //Respuesta
                    var cajas = response.data;
 
                    //Datos de la caja seleccionada
                    var cajaNombre = "";
                    var minDiferenciaVolumen = 10000000000.0;
                    var cajaLlave = 0;
 
                    Object.keys(cajas).forEach(cajaKey => {
                        //Volumen de la caja
                        var cajaAlto = parseFloat(cajas[cajaKey].Alto);
                        var cajaLargo = parseFloat(cajas[cajaKey].Largo);
                        var cajaAncho = parseFloat(cajas[cajaKey].Ancho);
 

                        //Buscamos la caja en la que entre el pedido y con el menor volumen desperdiciado
                        if ((cajaAlto >= volumen[0] && cajaLargo >= volumen[1] && cajaAncho >= volumen[2]) || 
                            (cajaAlto >= volumen[0] && cajaLargo >= volumen[2] && cajaAncho >= volumen[1]) ||
                            (cajaAlto >= volumen[1] && cajaLargo >= volumen[2] && cajaAncho >= volumen[0]) ||
                            (cajaAlto >= volumen[1] && cajaLargo >= volumen[0] && cajaAncho >= volumen[2]) ||
                            (cajaAlto >= volumen[2] && cajaLargo >= volumen[0] && cajaAncho >= volumen[1]) ||
                            (cajaAlto >= volumen[2] && cajaLargo >= volumen[1] && cajaAncho >= volumen[0])
                            ){
 
                            //Checamos el volumen vacio
                            var volumenCaja = cajaAlto * cajaAncho * cajaLargo;
                            var volumenPaquete = volumen[0] * volumen[1] * volumen[2];
                            var diferenciaVolumen = volumenCaja - volumenPaquete;
 
                            if (diferenciaVolumen < minDiferenciaVolumen){
                                //Guardamos los datos de la caja
                                minDiferenciaVolumen = diferenciaVolumen;
                                cajaNombre = cajas[cajaKey].NombreCaja;
                                cajaLlave = cajaKey;
                            }
                        };
                    });
 
                    //Se usa la última caja guardada para el empaquetado
                    console.log("Caja seleccionada: " + cajaNombre + " (Volumen de diferencia: " + minDiferenciaVolumen + ")");
                    cartReference.cajaEnvio = cajas[cajaLlave];

                    cartReference.consultarCotizacion();
                }
            }).catch(function(e) {
                console.error("Error:", e);
            });
 
        },
        consultarCotizacion(){
            let cartReference = this;

            const packageData = {
                origin_zip_code: this.initialize.data._cartCollection.data[0].cp,
                destination_zip_code: this.initialize.data.postal_code,
                //datos del paquete
                package: { 
                    //Contenido del paquete
                    description: "Pedido a " + this.initialize.data.postal_code,
                    //Valor facturado declarado
                    contentValue: this.total,
                    //Peso fisico del paquete kg
                    weight: this.datosEnvio[0],
                    //largo del paquete Cm
                    //length: this.cajaEnvio.Largo,
                    length:this.datosEmpaquetado[0],
                    //alto del paquete Cm
                    //height: this.cajaEnvio.Alto,
                    height: this.datosEnvio[1],
                    //Ancho del paquete Cm
                   //width: this.cajaEnvio.Ancho
                    width: this.datosEmpaquetado[1]
                }
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'f5f196da-3ddc-4f57-a8c8-15141529c35e',
            };

            axios.post('https://api.envioclickpro.com/api/v2/quotation', packageData, { headers })
            .then((response) => {
                //Respuesta
                var data = response.data;
                console.log(data);

                cartReference.datosEnvio[1] = data.data.rates[0];

                //Guardamos en el cache los datos del envio
                let envioDatos =  {
                        Origen: this.initialize.data._cartCollection.data[0].cp,
                        Destino: this.initialize.data.postal_code,
                        Paquete: 
                        {
                            Descripcion: "Pedido a " + this.initialize.data.postal_code,
                            Total: this.total,
                            Peso: this.datosEnvio[0],
                            Largo: this.cajaEnvio.Largo,
                            Alto: this.cajaEnvio.Alto,
                            Ancho: this.cajaEnvio.Ancho
                        },
                        Viaje: 
                        {
                            id: data.data.rates[0].idRate,
                            Empresa: data.data.rates[0].carrier,
                            TiempoDeEntrega: data.data.rates[0].deliveryDays,
                            TipoEntrega: data.data.rates[0].deliveryType,
                            Total: data.data.rates[0].total
                        }
                    };
                
                localStorage['DatosPaquete'] = JSON.stringify(envioDatos);

                let tempCardCobro = this.$refs['productosInCart'].$refs['card-cobro'];
                console.log("ESTE ES TEMPCARTCOBRO: ");
                console.log(tempCardCobro);
                var stored = localStorage['DatosPaquete'];
                if (stored) {
                    myVar = JSON.parse(stored);

                    tempCardCobro.dataEnvio = myVar.Viaje.Total;
                    console.log("COSTO ENV 1: " + tempCardCobro.dataEnvio);

                    tempCardCobro.isDisabled();

                    myVar = JSON.parse(stored);
                    this.total += myVar.Viaje.Total;
                }
            })
            .catch((error) => {
                //errores
                console.error('Error al realizar la solicitud:', error);
            });
        },
        clickedbuttonExist() { //#3

        },
        sessionvalidate2()
        {
            console.log("corre 2: " + this.initialize.data.correo);
            let correo = this.initialize.data.correo;
 
            let passa = 0;
 
            if (correo == "") {
                passa = 1;
            }

            if (passa == 1) {
                createAviso("Para poder visualizar el carrito por favor inicialize sesión.");
 
                Swal.fire({
                    title: "<span style='color:#000000'>Presione el boton 'ok' para iniciar sesión</span>",
                    text: "",
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#c1c1c1',
                    confirmButtonText: "<span style='color:#000000'>OK</span>",
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.value) {
                        comunicateWebView("open-profile", "postal_code=" + 1);
 
                    }
                });
            } else {
                this.isActiveConfirmCart = !this.isActiveConfirmCart;
                this.executeAnterior(); //#18
 
            }
        },
    }
 });