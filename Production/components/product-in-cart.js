
let productInCart = {
    props: {
        producto: {
            type: Object
        },
        selected: {
            type: String
        },
        precio: 0,
        cantidad: 0
    },
    data() {
        return {
            initialize: {},
            field: {
                placeholder: "Cantidad",
                name: 'input-cantidad',
                placeholder: 'Cantidad'
            },
            inputNumberData: {
                value: 1
            },
            currentPrice: 0,
            isContainerVarianteActive: false,
            selectedCaracteristica: -1,
            buttonDelete: {
                type: 'roundend-button',
                content: 'x',
                typeButton: 'button',
                align: 'top-end ',
                size: ''
            },
            statusExistencia: false,
            numeroExistencias: 0
        };
    },
    watch: {
        selected() {
            this.selectedCaracteristica = this.$props.selected;
        },
        selectedCaracteristica() {
            this.setCurrentPrice();
        },
        'inputNumberData.value'() {
            this.setCurrentPrice();
        }
    },
    components: {
        carousel: carousel,
        'number-input': numberInput,
        'container-variante': containerVariante,
        'roundend-button': roundedButton
    },
    mounted() {
        this.inputNumberData.value = this.$props.cantidad;
        this.selectedCaracteristica = this.$props.selected;
        this.setCurrentPrice();
        this.setCantidadesProductos();
        this.verificarExistenciasIniciales(); // Verifica existencias al inicializar
    },
    computed: {
        selectedIndex() {
            return this.$props.producto.Caracteristicas.map(function(e) { return e.idCaracteristica; }).indexOf(this.$props.selected);
        }
    },
    methods: {
        init(use_mode, id_app, data) {
            this.initialize = {
                use_mode: use_mode
            };
        },
        async consultaStock(idCaracteristicaProducto, cantidadProducto) {
            let form = new FormData();
            form.append('idCaracteristica', idCaracteristicaProducto);

            let service = this.initialize.use_mode == "testing"
                ? "https://arvispace.com/serviciosASAR/consultarExistenciasProductosAR.php"
                : "https://arvispace.com/serviciosASAR/consultarExistenciasProductosAR.php";

            try {
                let response = await axios.post(service, form);
                if (response.status === 200) {
                    let stock = response.data[0]?.status || 0; // Obtén el stock disponible
                    console.log(`Stock consultado para ${idCaracteristicaProducto}: ${stock}`);
                    return stock; // Retorna el stock disponible
                }
            } catch (e) {
                console.error("Error al consultar el stock:", e);
                createAviso("Error al consultar las existencias. Intenta de nuevo.");
                return 0; // En caso de error, asumir que no hay stock
            }
        },
        async verificarExistenciasIniciales() {
            // Itera sobre las características para validar existencias
            for (let caracteristica of this.producto.Caracteristicas) {
                let stock = await this.consultaStock(caracteristica.idCaracteristica, this.inputNumberData.value);
                if (stock <= 0) {
                    console.log(`Sin existencias para la característica ${caracteristica.idCaracteristica}`);
                    this.changeStatusExistencia(true); // Marca que no hay existencias
                    break; // Solo necesitas mostrar el mensaje una vez
                }
            }
        },
        async increment() {
            this.$emit("set-package-cost-on-change");//--Añadio manuel (josé)
            //Checar costo de envio
            this.$emit("product-add",this.$props.producto.idProBodPre);
            let stockDisponible = await this.consultaStock(this.selectedCaracteristica, this.inputNumberData.value + 1);
            if (stockDisponible <= this.inputNumberData.value) {
                createAviso("El producto seleccionado ya no cuenta con más existencias.");
                return;
            }
            this.inputNumberData.value++;
            let params = `idProBodPre=${this.$props.producto.idProBodPre}&idCaracteristica=${this.selectedCaracteristica}&cantidad=${this.inputNumberData.value}`;
            comunicateWebView("increment-cantidad-cart", params);
        },
        decrement() {
             //Checar costo de envio
             this.$emit("set-package-cost-on-change");
            this.$emit("product-dec",this.$props.producto.idProBodPre);

            let tempValue = this.inputNumberData.value - 1;
            if (tempValue > 0) {
                this.inputNumberData.value--;
                let params = "idProBodPre=" + this.$props.producto.idProBodPre + "&idCaracteristica=" + this.selectedCaracteristica + "&cantidad=" + this.inputNumberData.value;
                comunicateWebView("decrement-cantidad-cart", params);
                console.log('this.$props.initInfo');
                console.log(this.$props.initInfo);
                let values = {
                    idCaracteristica:this.selectedCaracteristica,
                    idProBodPre:this.$props.producto.idProBodPre,
                    cantidad:tempValue
                }
                this.$emit("on-change-cantidad",values)
            }
        },
        deleteFromCart() {
            this.$emit('delete-producto', this.$props.producto.idProBodPre);
        },
        changeToProduct(producto){
            console.log('Producto seleccionado');
            console.log(producto);
        },
        setCurrentPrice() {
            let tempPrecio = 0;
            this.$props.producto.Caracteristicas.forEach(caracteristica => {
                if (this.selectedCaracteristica == caracteristica.idCaracteristica) {
                    tempPrecio = caracteristica.statusOferta == "1" ? caracteristica.precioOferta : caracteristica.precio;
                    return false;
                }
            });
            tempPrecio *= this.inputNumberData.value;
            this.currentPrice = tempPrecio;
            this.$emit('set-current-price');
        },
        setCantidadesProductos() {
            this.numeroExistencias = this.inputNumberData.value;
        },
        changeStatusExistencia(valor) {
            this.statusExistencia = valor;
        }
    },
    filters: {
        toCurrency(val) {
            return '$' + val.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
        template: `
        <div>
            <container-variante 
                :isActive="isContainerVarianteActive"
                :caracteristicas="producto.Caracteristicas"
                :currentCaracteristica="selectedCaracteristica"
            ></container-variante>
            <div class="row element"
                :class="caracteristica.idCaracteristica == selectedCaracteristica ? 'element-active' : 'element-disabled'" 
                v-for="(caracteristica, caracteristicaIndex) in producto.Caracteristicas"
            >
                <roundend-button
                    :field="buttonDelete"
                    @clicked-rounded="deleteFromCart"
                ></roundend-button>
                <div class="col-5">
                    <carousel
                        v-bind:id="caracteristica.idCaracteristica"
                        name="product-in-cart-carousel-"
                        v-bind:imagenes="caracteristica.imagenes"
                    ></carousel>
                </div>
                <div class="col-7">
                    <!--<div id="mostrarExisteciasDiv" style="margin-left:-3%"> </div>-->
                    <div class="col-12"  v-if="caracteristica.existencia < numeroExistencias && statusExistencia==true"><p style="color:red;font-weight:bolder;">El producto ya no cuenta con existencias</p></div>
                    <!--<p>idcarac {{caracteristica.existencia}}</p>
                    <p>idPro: {{caracteristica.idCaracteristica}}</p>
                    <p>idcarac {{caracteristica.idProBodPre}}</p>-->

                    <h4 class="title">{{producto.descripcion}}</h4>
                    <a @click="setContainerViewVariante" v-if="producto.Caracteristicas.length > 1">Ver colores</a>
                    <p v-if="caracteristica.statusOferta == 0" class="precio">{{currentPrice | toCurrency}}</p>
                    <p v-if="caracteristica.statusOferta == 1" class="precio-oferta">{{currentPrice | toCurrency}}</p>
                    <!--<p style="color:black;font-weight:bolder;">Existencias: {{caracteristica.existencia}}</p>-->
                    <number-input
                        :field="field"
                        :data="inputNumberData"
                        @increment="increment"
                        @decrement="decrement"
                    ></number-input>
                </div>
            </div>
        </div>
    `
};


