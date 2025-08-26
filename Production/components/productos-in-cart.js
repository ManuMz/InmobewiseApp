let productosInCart = {
    props:{
        productos:Array,
        initialize:{
            type:Object
        },
        costoEnvio:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            total:0,
            cantidad:0
        }
    },
    methods: {
        setTotal(){
            let tempTotal = 0;
            this.$props.productos.forEach(producto=>{
                producto.Caracteristicas.forEach(caracteristica=>{
                    if(caracteristica.statusOferta == 0){
                        tempTotal+= parseFloat(caracteristica.precio);
                    }else{
                        tempTotal+= parseFloat(caracteristica.precioOferta);
                    }
                });
            });
            this.total = tempTotal;
            this.$emit("on-change-total",this.total)
        },
        setCantidad(){
            this.cantidad = this.$props.productos.length;
        },
        setActiveConfirmCart(){
            this.$emit('clicked-button');
        },
        onChangeProducto(){
            try{
                let tempTotal = 0;
                let tempCantidad = 0;
                for (let index = 0; index < this.$refs.dataPorProducto.length; index++) {
                    tempCantidad += this.$refs.dataPorProducto[index].inputNumberData.value;
                    tempTotal += this.$refs.dataPorProducto[index].currentPrice;
                }
                this.total = tempTotal;
                this.cantidad = tempCantidad;
                this.$emit("on-change-total",this.total);
            }catch(e){
                console.log("Error por que se monto antes de iniciar variables.");

                let tempTotal = 0;
                let tempCantidad = 0;
                this.total = tempTotal;
                this.cantidad = tempCantidad;
                this.$emit("on-change-total",this.total);
            }
        },/**
         * Aun no ha sido probado en produccion con muchas caracteristicas (Ya fue probado si manda la informacion correctamente)
         * @param {Objeto producto} producto 
         */
        getIndexCaractersticaSelected(producto){
            let idProBodPre = producto.idProBodPre;
            let pos = this.$props.initialize.data._cartCollection.data.map(function(e) { return e.idProBodPre; }).indexOf(idProBodPre);
            let tempcurrentProducto = this.$props.initialize.data._cartCollection.data[pos];
            pos = producto.Caracteristicas.map(function(e) { return e.idCaracteristica; }).indexOf(tempcurrentProducto.idCaracteristica);
            return pos;
        },
        getCantidadByCart(producto){
            let idProBodPre = producto.idProBodPre;
            let pos = this.$props.initialize.data._cartCollection.data.map(function(e) { return e.idProBodPre; }).indexOf(idProBodPre);
            let tempcurrentProducto = this.$props.initialize.data._cartCollection.data[pos];
            return parseInt(tempcurrentProducto.cantidad);
        },
        deleteProduct(id){
            this.$emit('delete-producto',id);
            this.onChangeProducto();
        },
        handleChangeCantidad(values){
            this.$emit("on-change-cantidad",values)
        },
        SetPackageCostOnChange(){//----Añadido manuel
            this.$emit("set-package-cost");
        },
        productAdd(ID){
            this.$emit("increment-product",ID);
        },
        productDec(ID){
            this.$emit("decrement-product",ID);
        },
        deleteAllProducts(){
            console.log("Borrando carrito");
            var emptyArray = [];
            setProductos(emptyArray);
            this.productos.forEach(product=>{
                let params = "id="+product.idProBodPre;
                comunicateWebView("delete-cart",params);
                console.log("Borrando " + product.idProBodPre);
            });
        },
        buscarFunctionIncar(){//#5
            //alert("esta apunto de pasar a la ultima validacion productincart ");
            //se agrego esta validacion para que cuente el numero de productos en el carrito y se guarde la posicion para que cuando este en rojo sean todos los que tengan menos existencias
            let tempTotal = 0;
            let tempCantidad = 0;
            for (let index = 0; index < this.$refs.dataPorProducto.length; index++) {
                //le pase false para que cuando se le de clic al boton confirmar no se pongan rojos si no hasta que le den en confirmar compra si se pone true cuando le den clic al boron de continuar mostrara el mensaje de aquellos que no tengan existencia
                this.$refs.dataPorProducto[index].changeStatusExistencia(false); //#6
                //this.$refs.dataPorProducto[index].changeStatusExistencia(false,tempCantidad); //#6 
                // tempCantidad += this.$refs.dataPorProducto[index].inputNumberData.value;
                // tempTotal += this.$refs.dataPorProducto[index].currentPrice;
            }
            this.onChangeProducto();//se manda a llamar la funcion para que detecte los cambios de las existencias
            // this.$refs.dataPorProducto[0].changeStatusExistencia(true);//accedes a la funcion con posicion 0
            
        },
        regresarFunctionIncar(){//#boton que regresa
            //alert("esta apunto de pasar a la ultima validacion productincart ");
            let tempTotal = 0;
            let tempCantidad = 0;
            for (let index = 0; index < this.$refs.dataPorProducto.length; index++) {
                this.$refs.dataPorProducto[index].changeStatusExistencia(true); //#6 //true para que cuando le den en regresar aparezcan todos los rojos
                //this.$refs.dataPorProducto[index].changeStatusExistencia(true,tempCantidad); //#6 //true para que cuando le den en regresar aparezcan todos los rojos
                // tempCantidad += this.$refs.dataPorProducto[index].inputNumberData.value;
                // tempTotal += this.$refs.dataPorProducto[index].currentPrice;
            }
            this.onChangeProducto();//se manda a llamar la funcion para que detecte los cambios de las existencias
            // this.$refs.dataPorProducto[0].changeStatusExistencia(true);  
        },
        activarEstatusCar(){//#boton que regresa
            //alert("esta apunto de pasar a la ultima validacion productincart ");
            let tempTotal = 0;
            let tempCantidad = 0;
            for (let index = 0; index < this.$refs.dataPorProducto.length; index++) {
                this.$refs.dataPorProducto[index].changeStatusExistencia(true); //#6 //true para que cuando le den en regresar aparezcan todos los rojos
                //tempCantidad += this.$refs.dataPorProducto[index].inputNumberData.value; //cantidad por producto
                //this.$refs.dataPorProducto[index].changeStatusExistencia(true,tempCantidad); //#6 //true para que cuando le den en regresar aparezcan todos los rojos
                //alert("cant: "+this.cantidad);
                // tempCantidad += this.$refs.dataPorProducto[index].inputNumberData.value;
                // tempTotal += this.$refs.dataPorProducto[index].currentPrice;
            }
            this.onChangeProducto();//se manda a llamar la funcion para que detecte los cambios de las existencias
            // this.$refs.dataPorProducto[0].changeStatusExistencia(true);  
        }
    },
    watch: {
        total(){
            this.$emit('on-change-total',this.total);
        },
        productos(){
            this.setTotal();
            this.setCantidad();
        },
        initialize(){
            this.storageInfo = this.$props.initialize.data._cartCollection.data
        }
    },
    mounted(){
        this.onChangeProducto()
    },
    computed:{
        currentProducts(){
            return this.$props.productos
        }
    },
    components:{
        'card-cobro':cardCobro,
        'product-in-cart':productInCart
    },
    
    template:`
        <div class="container">
            <div class="row products-in-cart">
                <div class="col-12"  v-for="(producto,productoIndex) in currentProducts">
                    <product-in-cart
                        ref="dataPorProducto"
                        :producto="producto"
                        :selected="producto.Caracteristicas[getIndexCaractersticaSelected(producto)].idCaracteristica"
                        :precio="producto.Caracteristicas[getIndexCaractersticaSelected(producto)].statusOferta == '1'?producto.Caracteristicas[getIndexCaractersticaSelected(producto)].precioOferta:producto.Caracteristicas[getIndexCaractersticaSelected(producto)].precio"
                        :cantidad="getCantidadByCart(producto)"
                        @on-change-cantidad="handleChangeCantidad"
                        @set-current-price="onChangeProducto"
                        @set-package-cost-on-change="SetPackageCostOnChange"
                        @product-add="productAdd"
                        @product-dec="productDec"
                        @delete-producto="deleteProduct"
                    ></product-in-cart>
                </div>
            </div>
            <card-cobro
                :limiteEnvio="100000"
                :costoEnvio="costoEnvio"
                :total="total"
                :cantidad="cantidad"
                ref="card-cobro"
                @clicked-button="setActiveConfirmCart"
            ></card-cobro>
        </div>
    `
    
}

