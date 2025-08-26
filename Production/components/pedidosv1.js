let pedidos = {
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        initialize: null,
        listaPedidos: null
    },
    data() {
        return {
            styleToClose: {
                background: "#fff",
                color: "#FFFFFF"
            },
            statusSelected: 1,//1:Proceso 2:Enviado 3:Entregado
            numstatus1: 0,
            numstatus2: 0,
            numstatus3: 0,
            productos: [],
            buttonFacturar: {
                type: 'primary-button-block',
                content: 'Facturar',
                typeButton: 'button'
            },
            buttonRastrear: {
                type: 'primary-button-block',
                content: 'Rastrear',
                typeButton: 'button'
            },
            pedidos: [] //se agrego
        }
    },
    watch: {
        /*listaPedidos(){
            if(this.$props.listaPedidos != null){
                let tempProductos = [];
                this.$props.listaPedidos.forEach(pedido =>{
                    pedido.Bodegas.forEach(bodega=>{
                        bodega.Productos.forEach(producto=>{
                            tempProductos.push(producto);
                        })
                    });
                });
                this.productos = tempProductos;
            }
        }*/
        listaPedidos() {
            let numm = 0;
            if (this.$props.listaPedidos != null) {
                if (this.$props.listaPedidos[0].metodo == undefined) {
                    let tempProductos = [];
                    this.$props.listaPedidos.forEach(pedido => {
                        const productos = pedido.Bodegas.reduce((acc, el) => el.Productos, [])
                        const objPedido = {
                            idPedido: pedido.idPedido,
                            fechaHoraPedido: pedido.fechaHoraPedido,
                            total: pedido.total,
                            metodoPago: pedido.metodoPago,
                            estatus: pedido.estatus,
                            direccion: pedido.direccion,
                            detalleDireccion: pedido.detalleDireccion,
                            url: productos[0].url,
                            fechaEntrega: productos[0].fechaEntrega,
                            activacionSeguimiento: productos[0].activacionSeguimiento,
                            productos: productos
                        }
                        numm++;
                        this.pedidos.push(objPedido)

                        if (objPedido.estatus == 1) {
                            this.numstatus1++;
                        }
                        if (objPedido.estatus == 2) {
                            this.numstatus2++;
                        }
                        if (objPedido.estatus == 3) {
                            this.numstatus3++;
                        }

                    });
                    this.$props.listaPedidos.forEach(pedido => {
                        pedido.Bodegas.forEach(bodega => {
                            bodega.Productos.forEach(producto => {
                                tempProductos.push(producto);
                            })
                        });
                    });
                    this.productos = tempProductos;
                    console.log(this.pedidos)
                    //this.productos = tempProductos;
                }
            }
        }
    },
    filters: {
        toCurrency(val) {
            return '$' + parseFloat(val).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        verProceso() {
            this.statusSelected = 1;
        },
        verEnviados() {
            this.statusSelected = 2;
        },
        verEntregados() {
            this.statusSelected = 3;
        },
        getPedidoById(id) {
            let pos = this.$props.listaPedidos.map(function (e) { return e.idPedido; }).indexOf(id);
            return this.$props.listaPedidos[pos];
        },
        validateView(estatus) {
            let result = false;
            estatus.forEach(data => {
                if (data == this.statusSelected)
                    result = true;
            });
            return result;
        },
        rastreo(urlSeguimiento) {
            window.location.replace(urlSeguimiento);
        }
    },
    components: {
        'close-container': closeContainer,
        'carousel': carousel,
        'primary-button-block': primaryButtonBlock
    },
    template: `
    <transition name="show-container">
        <div v-if="isActive && initialize!=null" class="pedidos-container">
            <close-container
                :style-content="styleToClose"
                title="Pedidos"
                @close="close"
            ></close-container>
            <div class="container">
                <div class="nav-wrapper">
                    <ul role="tablist" class="nav nav-pills nav-fill">
                        <li class="nav-item" @click="verProceso">
                            <a data-toggle="tab" role="tab" href="#undefined" class="nav-link" :class="statusSelected == 1 ? 'active':''">
                                <div>
                                    <i class="icon-Entregado mr-1"></i>
                                    Proceso
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" @click="verEnviados">
                            <a data-toggle="tab" role="tab" href="#undefined" class="nav-link" :class="statusSelected == 2 ? 'active':''">
                                <div>
                                    <i class="icon-Enviado mr-1"></i>
                                    Enviado
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" @click="verEntregados">
                            <a data-toggle="tab" role="tab" href="#undefined" class="nav-link" :class="statusSelected == 3 ? 'active':''">
                                
                                <div>
                                    <i class="icon-Entregado mr-1"></i>
                                    Entregado
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>



            <div v-if="pedidos.length" class="row">
                <div class="card mt-2 mb-2" v-if="pedido.estatus==statusSelected" v-for="pedido in pedidos">
                    
                    <div class="card-body">
                    
                        <p v-if="validateView(['1','2','3'])"><b>Id Pedido: #</b>{{pedido.idPedido}}</p>
                        <!--<p v-if="validateView(['1','2','3'])"><b>Estatus:</b> {{pedido.estatus}}</p>-->
                        <p v-if="validateView(['1'])"><b>Fecha de creación del pedido:</b> {{pedido.fechaHoraPedido}}</p>
                        <p v-if="validateView(['2','3'])"><b>Fecha de entrega del pedido:</b> {{pedido.fechaEntrega}}</p>
                        <p v-if="validateView(['1','2','3'])"><b>Dirección de entrega:</b> {{pedido.direccion}}</p>
                        <p v-if="validateView(['1','2','3'])"><b>Total:</b> {{pedido.total | toCurrency}}</p>
                        <a class="" data-toggle="collapse" :href="'#productos-'+pedido.idPedido" role="button" aria-expanded="false">
                            Ver Productos
                        </a>


                        <div v-if="producto.idPedido==pedido.idPedido" v-for="producto in productos" class="collapse" :id="'productos-'+pedido.idPedido">
                            
                            <div class="card-body">
                                <carousel
                                    v-bind:id="producto.idCaracteristica"
                                    name="pedido-carousel-"
                                    :imagenes="producto.imagnes"
                                ></carousel>
                                <p v-if="validateView(['1','2','3'])"><b>Cantidad de productos:</b> {{producto.cantidad}}</p>
                                <p v-if="validateView(['1','2','3'])"><b>Total:</b> {{producto.total | toCurrency}}</p>
                                <!--<primary-button-block
                                    v-if="validateView(['3'])"
                                    :field="buttonFacturar"
                                ></primary-button-block>
                                <primary-button-block
                                    v-if="(['2']) && producto.activacionSeguimiento=='1'"
                                    @clicked-button="rastreo(producto.url)"
                                    :field="buttonRastrear"
                                ></primary-button-block>-->
                            </div>

                        </div>

                    </div>

                </div>
    <div>


    <div class="anim__container container" v-if="statusSelected==1 && numstatus1==0">
    <div class="background">
<svg width="auto" height="-webkit-fill-available" viewBox="0 0 375 667" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<rect width="375" height="667" fill="white"/>
<g filter="url(#filter0_d)">  <!--la forma de las montañas--->
<path d="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z" fill="url(#paint0_linear)">
<animate dur="5s" begin="0s" repeatCount="indefinite" attributeName="d"
from ="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
to =  "M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z"
values="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z;
M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z;
M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
/></path>
</g>
<g filter="url(#filter1_d)">
<path d="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z" fill="url(#paint1_linear)">
<animate dur="4s" begin="0s" repeatCount="indefinite" attributeName="d"
from="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
to="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
values="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
/></path>
</g>
<g filter="url(#filter2_d)">
<path d="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z" fill="#url(#paint2_linear)"
><animate dur="3s" begin="0" repeatCount="indefinite" attributeName="d"
from ="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
to =  "M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z"
values="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z;
M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z;
M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
/> </path> 
/>
</g>
</g>
<defs>


<filter id="filter0_d" x="-15.7762" y="11.3929" width="406.27" height="671.001" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>

<feGaussianBlur stdDeviation="7.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="-8.6922" y="169.317" width="406.186" height="520.077" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="-20.7762" y="321.557" width="370.657" height="371.837" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dx="2" dy="4"/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<linearGradient id="paint0_linear" x1="202.458" y1="175.197" x2="-128.17" y2="822.872" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="151.062" y1="369.002" x2="541.702" y2="697.506" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E63B4A"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="208.309" y1="449.259" x2="17.2945" y2="700.936" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>

<clipPath id="clip0">
<rect width="375" height="667" fill="white"/>
</clipPath>
</defs>
</svg>
</div>

<!--
<div class="cube-wrap cw1">
<div class="img1 sides "></div>
</div>
<div class="cube-wrap cw2">
<div class="img2 sides"></div>
</div>
<div class="cube-wrap cw3">
<div class="img3 sides"></div>
</div>
-->
<div class="presentation">
<svg width="auto" height="75vh" viewBox="0 0 580 482" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="spheres">
   <path id="sphere_one"
       d="M577.925 351.384C576.423 352.885 573.996 352.885 572.493 351.384C570.99 349.882 570.99 347.457 572.493 345.956C573.996 344.454 576.423 344.454 577.925 345.956C579.42 347.457 579.42 349.882 577.925 351.384Z"
       fill="url(#paint0_linear)" />
   <path id="sphere_two"
       d="M316.986 7.45305C315.485 8.95423 313.058 8.95423 311.556 7.45305C310.053 5.95187 310.053 3.52741 311.556 2.02624C313.058 0.524987 315.485 0.524987 316.986 2.02624C318.489 3.52741 318.489 5.95187 316.986 7.45305Z"
       fill="url(#paint1_linear)" />
   <path id="sphere_three"
       d="M137.674 211.731C133.6 215.801 126.988 215.801 122.915 211.731C118.841 207.661 118.841 201.054 122.915 196.982C126.988 192.913 133.6 192.913 137.674 196.982C141.749 201.054 141.749 207.661 137.674 211.731Z"
       fill="url(#paint2_radial)" />
   <path id="sphere_four"
       d="M445.086 170.532C441.012 174.602 434.399 174.602 430.326 170.532C426.252 166.461 426.252 159.854 430.326 155.784C434.399 151.714 441.012 151.714 445.086 155.784C449.16 159.854 449.16 166.461 445.086 170.532Z"
       fill="url(#paint3_linear)" />
   <path id="sphere_five"
       d="M499.345 309.574C495.271 313.644 488.658 313.644 484.584 309.574C480.511 305.505 480.511 298.898 484.584 294.826C488.658 290.756 495.271 290.756 499.345 294.826C503.418 298.898 503.418 305.505 499.345 309.574Z"
       fill="url(#paint4_radial)" />
   <path id="sphere_six"
       d="M152.049 79.3748C149.052 82.3692 144.191 82.3692 141.194 79.3748C138.196 76.3804 138.196 71.5236 141.194 68.5292C144.191 65.5348 149.052 65.5348 152.049 68.5292C155.046 71.5236 155.046 76.3804 152.049 79.3748Z"
       fill="url(#paint5_linear)" />
   <path id="sphere_seven"
       d="M19.1049 302.301C16.1079 305.296 11.2469 305.296 8.24988 302.301C5.25297 299.306 5.25297 294.45 8.24988 291.456C11.2469 288.462 16.1079 288.462 19.1049 291.456C22.1099 294.45 22.1018 299.306 19.1049 302.301Z"
       fill="url(#paint6_linear)" />
   <path id="sphere_eight"
       d="M215.097 479.267C212.1 482.262 207.239 482.262 204.243 479.267C201.246 476.273 201.246 471.416 204.243 468.422C207.239 465.427 212.1 465.427 215.097 468.422C218.094 471.416 218.094 476.273 215.097 479.267Z"
       fill="url(#paint7_linear)" />
   <path id="sphere_nine"
       d="M42.3334 53.1798C40.831 54.6809 38.4045 54.6809 36.9021 53.1798C35.3996 51.6784 35.3996 49.2541 36.9021 47.7529C38.4045 46.2516 40.831 46.2516 42.3334 47.7529C43.8361 49.2541 43.828 51.6865 42.3334 53.1798Z"
       fill="url(#paint8_linear)" />
   <path id="sphere_ten"
       d="M350.066 437.659C348.564 439.159 346.137 439.159 344.635 437.659C343.132 436.158 343.132 433.733 344.635 432.231C346.137 430.73 348.564 430.73 350.066 432.231C351.561 433.733 351.561 436.165 350.066 437.659Z"
       fill="url(#paint9_linear)" />
   <path id="sphere_eleven"
       d="M6.85182 402.48C5.34936 403.981 2.92276 403.981 1.4203 402.48C-0.082158 400.979 -0.082158 398.555 1.4203 397.054C2.92276 395.552 5.34936 395.552 6.85182 397.054C8.35428 398.555 8.35428 400.987 6.85182 402.48Z"
       fill="url(#paint10_linear)" />
   <path id="sphere_twelve"
       d="M531.95 184.243C530.448 185.744 528.021 185.744 526.518 184.243C525.015 182.742 525.015 180.318 526.518 178.816C528.021 177.315 530.448 177.315 531.95 178.816C533.452 180.318 533.452 182.75 531.95 184.243Z"
       fill="url(#paint11_linear)" />
   <path id="sphere_thirteen"
       d="M135.938 389.146C134.437 390.647 132.01 390.647 130.507 389.146C129.005 387.645 129.005 385.221 130.507 383.72C132.01 382.218 134.437 382.218 135.938 383.72C137.441 385.221 137.441 387.645 135.938 389.146Z"
       fill="url(#paint12_linear)" />
   <path id="sphere_eight"
       d="M271.791 373.515C267.718 377.587 261.105 377.587 257.031 373.515C252.958 369.445 252.958 362.838 257.031 358.769C261.105 354.699 267.718 354.699 271.791 358.769C275.865 362.838 275.865 369.445 271.791 373.515Z"
       fill="url(#paint13_linear)" />
</g>
<g id="user">

</g>
<defs><!---color de las esferas-->
   <linearGradient id="paint0_linear" x1="567.345" y1="340.814" x2="576.765" y2="350.243"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint1_linear" x1="308.682" y1="-1.6863" x2="317.158" y2="8.06967"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
       gradientTransform="translate(117.438 187.871) scale(38.022 37.9891)">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="0.8499" stop-color="#1B4EDB" />
   </radialGradient>
   <linearGradient id="paint3_linear" x1="421.765" y1="146.733" x2="437.301" y2="162.769"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
       gradientTransform="translate(478.151 288.868) scale(30.9941 30.9671)">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3518" stop-color="#FFFFFF" />
       <stop offset="0.6104" stop-color="#FFFFFF" />
       <stop offset="0.7963" stop-color="#FFFFFF" />
       <stop offset="0.8897" stop-color="#1B4EDB" />
   </radialGradient>
   <linearGradient id="paint5_linear" x1="138.215" y1="61.6054" x2="147.074" y2="74.6461"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint6_linear" x1="2.32554" y1="282.574" x2="16.1725" y2="300.048"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint7_linear" x1="198.015" y1="460.909" x2="210.807" y2="475.132"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint8_linear" x1="34.6511" y1="41.7117" x2="41.0692" y2="53.0477"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#1B4EDB" />
       <stop offset="0.3747" stop-color="#1B4EDB" />
       <stop offset="0.6753" stop-color="#1B4EDB" />
       <stop offset="0.8914" stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint9_linear" x1="341.444" y1="426.425" x2="348.136" y2="436.098"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>



   <linearGradient id="paint10_linear" x1="-4.57321" y1="391.763" x2="4.95182" y2="400.533"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint11_linear" x1="524.057" y1="173.57" x2="529.453" y2="181.881"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#1B4EDB" />
       <stop offset="0.3747" stop-color="#1B4EDB" />
       <stop offset="0.6753" stop-color="#1B4EDB" />
       <stop offset="0.8914" stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint12_linear" x1="128.503" y1="379.769" x2="135.741" y2="389.994"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint13_linear" x1="253.362" y1="348.974" x2="266.254" y2="369.046"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint14_linear" x1="268.549" y1="366.324" x2="323.613" y2="327.728"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint15_linear" x1="15003.4" y1="16982.8" x2="8880.58" y2="23716.6"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint16_linear" x1="-162.074" y1="15638.9" x2="11638.3" y2="15638.9"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint17_linear" x1="322.582" y1="344.889" x2="306.191" y2="357.856"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#FFBD39" />
   </linearGradient>
   <linearGradient id="paint18_linear" x1="1739.72" y1="4482.34" x2="1496.47" y2="4799.16"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#FFBD39" />
   </linearGradient>
   <linearGradient id="paint19_linear" x1="324.477" y1="86.219" x2="324.477" y2="124.006"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#4060FF" />
   </linearGradient>
   <linearGradient id="paint20_linear" x1="305.722" y1="114.338" x2="296.51" y2="183.909"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#CB3DE8" />
   </linearGradient>
   <linearGradient id="paint21_linear" x1="261.958" y1="116.573" x2="253.87" y2="177.575"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint22_linear" x1="28323.2" y1="1304.83" x2="28566" y2="2839.44"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint23_linear" x1="19782.8" y1="1135.61" x2="19582.7" y2="1142.96"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint24_linear" x1="308.95" y1="105.378" x2="308.95" y2="118.154"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint25_linear" x1="-2573.55" y1="470.471" x2="-2573.55" y2="720.376"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint26_linear" x1="1902.55" y1="2621.43" x2="1902.55" y2="2326.76"
       gradientUnits="userSpaceOnUse">
            <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
</defs>
</svg>

<div style="text-align: -webkit-center;z-index: 1000;margin-top: -60vh;">
 <div >
  <img src="../images/rep02.svg" alt="Cover" style="    overflow: hidden;vertical-align: middle;width: auto;height: 46vh;">
</div>


</div>      
</div>
</div>



 <div class="anim__container container" v-if="statusSelected==2 && numstatus2==0">
    <div class="background">
<svg width="auto" height="-webkit-fill-available" viewBox="0 0 375 667" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<rect width="375" height="667" fill="white"/>
<g filter="url(#filter0_d)">
<path d="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z" fill="url(#paint0_linear)">
<animate dur="5s" begin="0s" repeatCount="indefinite" attributeName="d"
from ="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
to =  "M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z"
values="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z;
M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z;
M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
/></path>
</g>
<g filter="url(#filter1_d)">
<path d="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z" fill="url(#paint1_linear)">
<animate dur="4s" begin="0s" repeatCount="indefinite" attributeName="d"
from="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
to="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
values="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
/></path>
</g>
<g filter="url(#filter2_d)">
<path d="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z" fill="url(#paint2_linear)"
><animate dur="3s" begin="0" repeatCount="indefinite" attributeName="d"
from ="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
to =  "M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z"
values="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z;
M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z;
M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
/> </path> 
/>
</g>
</g>
<defs>
<filter id="filter0_d" x="-15.7762" y="11.3929" width="406.27" height="671.001" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="-8.6922" y="169.317" width="406.186" height="520.077" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="-20.7762" y="321.557" width="370.657" height="371.837" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dx="2" dy="4"/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<linearGradient id="paint0_linear" x1="202.458" y1="175.197" x2="-128.17" y2="822.872" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="151.062" y1="369.002" x2="541.702" y2="697.506" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E63B4A"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="208.309" y1="449.259" x2="17.2945" y2="700.936" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<clipPath id="clip0">
<rect width="375" height="667" fill="white"/>
</clipPath>
</defs>
</svg>
</div>


<!--
<div class="cube-wrap cw1">
<div class="img1 sides "></div>
</div>
<div class="cube-wrap cw2">
<div class="img2 sides"></div>
</div>
<div class="cube-wrap cw3">
<div class="img3 sides"></div>
</div>
-->
<div class="presentation">
<svg width="auto" height="75vh" viewBox="0 0 580 482" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="spheres">
<path id="sphere_one"
   d="M577.925 351.384C576.423 352.885 573.996 352.885 572.493 351.384C570.99 349.882 570.99 347.457 572.493 345.956C573.996 344.454 576.423 344.454 577.925 345.956C579.42 347.457 579.42 349.882 577.925 351.384Z"
   fill="url(#paint0_linear)" />
<path id="sphere_two"
   d="M316.986 7.45305C315.485 8.95423 313.058 8.95423 311.556 7.45305C310.053 5.95187 310.053 3.52741 311.556 2.02624C313.058 0.524987 315.485 0.524987 316.986 2.02624C318.489 3.52741 318.489 5.95187 316.986 7.45305Z"
   fill="url(#paint1_linear)" />
<path id="sphere_three"
   d="M137.674 211.731C133.6 215.801 126.988 215.801 122.915 211.731C118.841 207.661 118.841 201.054 122.915 196.982C126.988 192.913 133.6 192.913 137.674 196.982C141.749 201.054 141.749 207.661 137.674 211.731Z"
   fill="url(#paint2_radial)" />
<path id="sphere_four"
   d="M445.086 170.532C441.012 174.602 434.399 174.602 430.326 170.532C426.252 166.461 426.252 159.854 430.326 155.784C434.399 151.714 441.012 151.714 445.086 155.784C449.16 159.854 449.16 166.461 445.086 170.532Z"
   fill="url(#paint3_linear)" />
<path id="sphere_five"
   d="M499.345 309.574C495.271 313.644 488.658 313.644 484.584 309.574C480.511 305.505 480.511 298.898 484.584 294.826C488.658 290.756 495.271 290.756 499.345 294.826C503.418 298.898 503.418 305.505 499.345 309.574Z"
   fill="url(#paint4_radial)" />
<path id="sphere_six"
   d="M152.049 79.3748C149.052 82.3692 144.191 82.3692 141.194 79.3748C138.196 76.3804 138.196 71.5236 141.194 68.5292C144.191 65.5348 149.052 65.5348 152.049 68.5292C155.046 71.5236 155.046 76.3804 152.049 79.3748Z"
   fill="url(#paint5_linear)" />
<path id="sphere_seven"
   d="M19.1049 302.301C16.1079 305.296 11.2469 305.296 8.24988 302.301C5.25297 299.306 5.25297 294.45 8.24988 291.456C11.2469 288.462 16.1079 288.462 19.1049 291.456C22.1099 294.45 22.1018 299.306 19.1049 302.301Z"
   fill="url(#paint6_linear)" />
<path id="sphere_eight"
   d="M215.097 479.267C212.1 482.262 207.239 482.262 204.243 479.267C201.246 476.273 201.246 471.416 204.243 468.422C207.239 465.427 212.1 465.427 215.097 468.422C218.094 471.416 218.094 476.273 215.097 479.267Z"
   fill="url(#paint7_linear)" />
<path id="sphere_nine"
   d="M42.3334 53.1798C40.831 54.6809 38.4045 54.6809 36.9021 53.1798C35.3996 51.6784 35.3996 49.2541 36.9021 47.7529C38.4045 46.2516 40.831 46.2516 42.3334 47.7529C43.8361 49.2541 43.828 51.6865 42.3334 53.1798Z"
   fill="url(#paint8_linear)" />
<path id="sphere_ten"
   d="M350.066 437.659C348.564 439.159 346.137 439.159 344.635 437.659C343.132 436.158 343.132 433.733 344.635 432.231C346.137 430.73 348.564 430.73 350.066 432.231C351.561 433.733 351.561 436.165 350.066 437.659Z"
   fill="url(#paint9_linear)" />
<path id="sphere_eleven"
   d="M6.85182 402.48C5.34936 403.981 2.92276 403.981 1.4203 402.48C-0.082158 400.979 -0.082158 398.555 1.4203 397.054C2.92276 395.552 5.34936 395.552 6.85182 397.054C8.35428 398.555 8.35428 400.987 6.85182 402.48Z"
   fill="url(#paint10_linear)" />
<path id="sphere_twelve"
   d="M531.95 184.243C530.448 185.744 528.021 185.744 526.518 184.243C525.015 182.742 525.015 180.318 526.518 178.816C528.021 177.315 530.448 177.315 531.95 178.816C533.452 180.318 533.452 182.75 531.95 184.243Z"
   fill="url(#paint11_linear)" />
<path id="sphere_thirteen"
   d="M135.938 389.146C134.437 390.647 132.01 390.647 130.507 389.146C129.005 387.645 129.005 385.221 130.507 383.72C132.01 382.218 134.437 382.218 135.938 383.72C137.441 385.221 137.441 387.645 135.938 389.146Z"
   fill="url(#paint12_linear)" />
<path id="sphere_eight"
   d="M271.791 373.515C267.718 377.587 261.105 377.587 257.031 373.515C252.958 369.445 252.958 362.838 257.031 358.769C261.105 354.699 267.718 354.699 271.791 358.769C275.865 362.838 275.865 369.445 271.791 373.515Z"
   fill="url(#paint13_linear)" />
</g>
<g id="user">

</g>
<defs>
   <linearGradient id="paint0_linear" x1="567.345" y1="340.814" x2="576.765" y2="350.243"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint1_linear" x1="308.682" y1="-1.6863" x2="317.158" y2="8.06967"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
       gradientTransform="translate(117.438 187.871) scale(38.022 37.9891)">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="0.8499" stop-color="#1B4EDB" />
   </radialGradient>
   <linearGradient id="paint3_linear" x1="421.765" y1="146.733" x2="437.301" y2="162.769"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
       gradientTransform="translate(478.151 288.868) scale(30.9941 30.9671)">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3518" stop-color="#FFFFFF" />
       <stop offset="0.6104" stop-color="#FFFFFF" />
       <stop offset="0.7963" stop-color="#FFFFFF" />
       <stop offset="0.8897" stop-color="#1B4EDB" />
   </radialGradient>
   <linearGradient id="paint5_linear" x1="138.215" y1="61.6054" x2="147.074" y2="74.6461"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint6_linear" x1="2.32554" y1="282.574" x2="16.1725" y2="300.048"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint7_linear" x1="198.015" y1="460.909" x2="210.807" y2="475.132"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint8_linear" x1="34.6511" y1="41.7117" x2="41.0692" y2="53.0477"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#1B4EDB" />
       <stop offset="0.3747" stop-color="#1B4EDB" />
       <stop offset="0.6753" stop-color="#1B4EDB" />
       <stop offset="0.8914" stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint9_linear" x1="341.444" y1="426.425" x2="348.136" y2="436.098"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>



   <linearGradient id="paint10_linear" x1="-4.57321" y1="391.763" x2="4.95182" y2="400.533"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint11_linear" x1="524.057" y1="173.57" x2="529.453" y2="181.881"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#1B4EDB" />
       <stop offset="0.3747" stop-color="#1B4EDB" />
       <stop offset="0.6753" stop-color="#1B4EDB" />
       <stop offset="0.8914" stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint12_linear" x1="128.503" y1="379.769" x2="135.741" y2="389.994"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint13_linear" x1="253.362" y1="348.974" x2="266.254" y2="369.046"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint14_linear" x1="268.549" y1="366.324" x2="323.613" y2="327.728"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint15_linear" x1="15003.4" y1="16982.8" x2="8880.58" y2="23716.6"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint16_linear" x1="-162.074" y1="15638.9" x2="11638.3" y2="15638.9"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint17_linear" x1="322.582" y1="344.889" x2="306.191" y2="357.856"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#FFBD39" />
   </linearGradient>
   <linearGradient id="paint18_linear" x1="1739.72" y1="4482.34" x2="1496.47" y2="4799.16"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#FFBD39" />
   </linearGradient>
   <linearGradient id="paint19_linear" x1="324.477" y1="86.219" x2="324.477" y2="124.006"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#4060FF" />
   </linearGradient>
   <linearGradient id="paint20_linear" x1="305.722" y1="114.338" x2="296.51" y2="183.909"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#CB3DE8" />
   </linearGradient>
   <linearGradient id="paint21_linear" x1="261.958" y1="116.573" x2="253.87" y2="177.575"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint22_linear" x1="28323.2" y1="1304.83" x2="28566" y2="2839.44"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint23_linear" x1="19782.8" y1="1135.61" x2="19582.7" y2="1142.96"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint24_linear" x1="308.95" y1="105.378" x2="308.95" y2="118.154"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint25_linear" x1="-2573.55" y1="470.471" x2="-2573.55" y2="720.376"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint26_linear" x1="1902.55" y1="2621.43" x2="1902.55" y2="2326.76"
       gradientUnits="userSpaceOnUse">
            <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
</defs>
</svg>

<div style="text-align: -webkit-center;z-index: 1000;margin-top: -60vh;">
<div >
<img src="../images/rep03.svg" alt="Cover" style="    overflow: hidden;vertical-align: middle;width: auto;height: 46vh;">
</div>


</div>      
</div>
</div>


<div class="anim__container container" v-if="statusSelected==3 && numstatus3==0">
<div class="background">
<svg width="auto" height="-webkit-fill-available" viewBox="0 0 375 667" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<rect width="375" height="667" fill="white"/>
<g filter="url(#filter0_d)">
<path d="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z" fill="url(#paint0_linear)">
<animate dur="5s" begin="0s" repeatCount="indefinite" attributeName="d"
from ="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
to =  "M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z"
values="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z;
M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z;
M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
/></path>
</g>
<g filter="url(#filter1_d)">
<path d="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z" fill="url(#paint1_linear)">
<animate dur="4s" begin="0s" repeatCount="indefinite" attributeName="d"
from="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
to="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
values="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
/></path>
</g>
<g filter="url(#filter2_d)">
<path d="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z" fill="url(#paint2_linear)"
><animate dur="3s" begin="0" repeatCount="indefinite" attributeName="d"
from ="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
to =  "M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z"
values="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z;
M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z;
M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
/> </path> 
/>
</g>
</g>
<defs>
<filter id="filter0_d" x="-15.7762" y="11.3929" width="406.27" height="671.001" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="-8.6922" y="169.317" width="406.186" height="520.077" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="-20.7762" y="321.557" width="370.657" height="371.837" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dx="2" dy="4"/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<linearGradient id="paint0_linear" x1="202.458" y1="175.197" x2="-128.17" y2="822.872" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="151.062" y1="369.002" x2="541.702" y2="697.506" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E63B4A"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="208.309" y1="449.259" x2="17.2945" y2="700.936" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<clipPath id="clip0">
<rect width="375" height="667" fill="white"/>
</clipPath>
</defs>
</svg>
</div>

<!--
<div class="cube-wrap cw1">
<div class="img1 sides "></div>
</div>
<div class="cube-wrap cw2">
<div class="img2 sides"></div>
</div>
<div class="cube-wrap cw3">
<div class="img3 sides"></div>
</div>
-->

<div class="presentation">
<svg width="auto" height="75vh" viewBox="0 0 580 482" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="spheres">
<path id="sphere_one"
   d="M577.925 351.384C576.423 352.885 573.996 352.885 572.493 351.384C570.99 349.882 570.99 347.457 572.493 345.956C573.996 344.454 576.423 344.454 577.925 345.956C579.42 347.457 579.42 349.882 577.925 351.384Z"
   fill="url(#paint0_linear)" />
<path id="sphere_two"
   d="M316.986 7.45305C315.485 8.95423 313.058 8.95423 311.556 7.45305C310.053 5.95187 310.053 3.52741 311.556 2.02624C313.058 0.524987 315.485 0.524987 316.986 2.02624C318.489 3.52741 318.489 5.95187 316.986 7.45305Z"
   fill="url(#paint1_linear)" />
<path id="sphere_three"
   d="M137.674 211.731C133.6 215.801 126.988 215.801 122.915 211.731C118.841 207.661 118.841 201.054 122.915 196.982C126.988 192.913 133.6 192.913 137.674 196.982C141.749 201.054 141.749 207.661 137.674 211.731Z"
   fill="url(#paint2_radial)" />
<path id="sphere_four"
   d="M445.086 170.532C441.012 174.602 434.399 174.602 430.326 170.532C426.252 166.461 426.252 159.854 430.326 155.784C434.399 151.714 441.012 151.714 445.086 155.784C449.16 159.854 449.16 166.461 445.086 170.532Z"
   fill="url(#paint3_linear)" />
<path id="sphere_five"
   d="M499.345 309.574C495.271 313.644 488.658 313.644 484.584 309.574C480.511 305.505 480.511 298.898 484.584 294.826C488.658 290.756 495.271 290.756 499.345 294.826C503.418 298.898 503.418 305.505 499.345 309.574Z"
   fill="url(#paint4_radial)" />
<path id="sphere_six"
   d="M152.049 79.3748C149.052 82.3692 144.191 82.3692 141.194 79.3748C138.196 76.3804 138.196 71.5236 141.194 68.5292C144.191 65.5348 149.052 65.5348 152.049 68.5292C155.046 71.5236 155.046 76.3804 152.049 79.3748Z"
   fill="url(#paint5_linear)" />
<path id="sphere_seven"
   d="M19.1049 302.301C16.1079 305.296 11.2469 305.296 8.24988 302.301C5.25297 299.306 5.25297 294.45 8.24988 291.456C11.2469 288.462 16.1079 288.462 19.1049 291.456C22.1099 294.45 22.1018 299.306 19.1049 302.301Z"
   fill="url(#paint6_linear)" />
<path id="sphere_eight"
   d="M215.097 479.267C212.1 482.262 207.239 482.262 204.243 479.267C201.246 476.273 201.246 471.416 204.243 468.422C207.239 465.427 212.1 465.427 215.097 468.422C218.094 471.416 218.094 476.273 215.097 479.267Z"
   fill="url(#paint7_linear)" />
<path id="sphere_nine"
   d="M42.3334 53.1798C40.831 54.6809 38.4045 54.6809 36.9021 53.1798C35.3996 51.6784 35.3996 49.2541 36.9021 47.7529C38.4045 46.2516 40.831 46.2516 42.3334 47.7529C43.8361 49.2541 43.828 51.6865 42.3334 53.1798Z"
   fill="url(#paint8_linear)" />
<path id="sphere_ten"
   d="M350.066 437.659C348.564 439.159 346.137 439.159 344.635 437.659C343.132 436.158 343.132 433.733 344.635 432.231C346.137 430.73 348.564 430.73 350.066 432.231C351.561 433.733 351.561 436.165 350.066 437.659Z"
   fill="url(#paint9_linear)" />
<path id="sphere_eleven"
   d="M6.85182 402.48C5.34936 403.981 2.92276 403.981 1.4203 402.48C-0.082158 400.979 -0.082158 398.555 1.4203 397.054C2.92276 395.552 5.34936 395.552 6.85182 397.054C8.35428 398.555 8.35428 400.987 6.85182 402.48Z"
   fill="url(#paint10_linear)" />
<path id="sphere_twelve"
   d="M531.95 184.243C530.448 185.744 528.021 185.744 526.518 184.243C525.015 182.742 525.015 180.318 526.518 178.816C528.021 177.315 530.448 177.315 531.95 178.816C533.452 180.318 533.452 182.75 531.95 184.243Z"
   fill="url(#paint11_linear)" />
<path id="sphere_thirteen"
   d="M135.938 389.146C134.437 390.647 132.01 390.647 130.507 389.146C129.005 387.645 129.005 385.221 130.507 383.72C132.01 382.218 134.437 382.218 135.938 383.72C137.441 385.221 137.441 387.645 135.938 389.146Z"
   fill="url(#paint12_linear)" />
<path id="sphere_eight"
   d="M271.791 373.515C267.718 377.587 261.105 377.587 257.031 373.515C252.958 369.445 252.958 362.838 257.031 358.769C261.105 354.699 267.718 354.699 271.791 358.769C275.865 362.838 275.865 369.445 271.791 373.515Z"
   fill="url(#paint13_linear)" />
</g>
<g id="user">

</g>
<defs>  <!--esferas-->
   <linearGradient id="paint0_linear" x1="567.345" y1="340.814" x2="576.765" y2="350.243"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint1_linear" x1="308.682" y1="-1.6863" x2="317.158" y2="8.06967"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
       gradientTransform="translate(117.438 187.871) scale(38.022 37.9891)">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="0.8499" stop-color="#1B4EDB" />
   </radialGradient>
   <linearGradient id="paint3_linear" x1="421.765" y1="146.733" x2="437.301" y2="162.769"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
       gradientTransform="translate(478.151 288.868) scale(30.9941 30.9671)">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3518" stop-color="#FFFFFF" />
       <stop offset="0.6104" stop-color="#FFFFFF" />
       <stop offset="0.7963" stop-color="#FFFFFF" />
       <stop offset="0.8897" stop-color="#1B4EDB" />
   </radialGradient>
   <linearGradient id="paint5_linear" x1="138.215" y1="61.6054" x2="147.074" y2="74.6461"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint6_linear" x1="2.32554" y1="282.574" x2="16.1725" y2="300.048"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint7_linear" x1="198.015" y1="460.909" x2="210.807" y2="475.132"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint8_linear" x1="34.6511" y1="41.7117" x2="41.0692" y2="53.0477"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#1B4EDB" />
       <stop offset="0.3747" stop-color="#1B4EDB" />
       <stop offset="0.6753" stop-color="#1B4EDB" />
       <stop offset="0.8914" stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint9_linear" x1="341.444" y1="426.425" x2="348.136" y2="436.098"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>



   <linearGradient id="paint10_linear" x1="-4.57321" y1="391.763" x2="4.95182" y2="400.533"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint11_linear" x1="524.057" y1="173.57" x2="529.453" y2="181.881"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#1B4EDB" />
       <stop offset="0.3747" stop-color="#1B4EDB" />
       <stop offset="0.6753" stop-color="#1B4EDB" />
       <stop offset="0.8914" stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint12_linear" x1="128.503" y1="379.769" x2="135.741" y2="389.994"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint13_linear" x1="253.362" y1="348.974" x2="266.254" y2="369.046"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint14_linear" x1="268.549" y1="366.324" x2="323.613" y2="327.728"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint15_linear" x1="15003.4" y1="16982.8" x2="8880.58" y2="23716.6"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint16_linear" x1="-162.074" y1="15638.9" x2="11638.3" y2="15638.9"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#B9D2FC" />
   </linearGradient>
   <linearGradient id="paint17_linear" x1="322.582" y1="344.889" x2="306.191" y2="357.856"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#FFBD39" />
   </linearGradient>
   <linearGradient id="paint18_linear" x1="1739.72" y1="4482.34" x2="1496.47" y2="4799.16"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#FFBD39" />
   </linearGradient>
   <linearGradient id="paint19_linear" x1="324.477" y1="86.219" x2="324.477" y2="124.006"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#4060FF" />
   </linearGradient>
   <linearGradient id="paint20_linear" x1="305.722" y1="114.338" x2="296.51" y2="183.909"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#1B4EDB" />
       <stop offset="1" stop-color="#CB3DE8" />
   </linearGradient>
   <linearGradient id="paint21_linear" x1="261.958" y1="116.573" x2="253.87" y2="177.575"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint22_linear" x1="28323.2" y1="1304.83" x2="28566" y2="2839.44"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint23_linear" x1="19782.8" y1="1135.61" x2="19582.7" y2="1142.96"
       gradientUnits="userSpaceOnUse">
       <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
   <linearGradient id="paint24_linear" x1="308.95" y1="105.378" x2="308.95" y2="118.154"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint25_linear" x1="-2573.55" y1="470.471" x2="-2573.55" y2="720.376"
       gradientUnits="userSpaceOnUse">
       <stop stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#FFFFFF" />
   </linearGradient>
   <linearGradient id="paint26_linear" x1="1902.55" y1="2621.43" x2="1902.55" y2="2326.76"
       gradientUnits="userSpaceOnUse">
            <stop offset="0.2107" stop-color="#FFFFFF" />
       <stop offset="0.3747" stop-color="#FFFFFF" />
       <stop offset="0.6753" stop-color="#FFFFFF" />
       <stop offset="0.8914" stop-color="#FFFFFF" />
       <stop offset="1" stop-color="#1B4EDB" />
   </linearGradient>
</defs>
</svg>

<div style="text-align: -webkit-center;z-index: 1000;margin-top: -60vh;">
<div >
<img src="../images/rep04.svg" alt="Cover" style="    overflow: hidden;vertical-align: middle;width: auto;height: 46vh;">
</div>


</div>      
</div>
</div>
   




        <!---
          <div v-if="statusSelected==1 && numstatus1==0">
              <div class="card mt-2 mb-2">   
                <div class="card-body cardb" style=' align-content: center !important;align-items: center !important;text-align: center !important;'>
                   <div >
                    <img src="../images/not_process.gif" alt="Cover">
                    </div> 
                </div>
               </div>
          </div>
          <div v-if="statusSelected==2 && numstatus2==0">
              <div class="card mt-2 mb-2">   
                <div class="card-body cardb" style=' align-content: center !important;align-items: center !important;text-align: center !important;'>
                   <div >
                   <img src="../images/not_send.gif" alt="Cover">
                    </div> 
                </div>
               </div>
          </div>
           <div v-if="statusSelected==3 && numstatus3==0">
              <div class="card mt-2 mb-2">   
                <div class="card-body cardb" style=' align-content: center !important;align-items: center !important;text-align: center !important;'>
                   <div >
                   <img src="../images/not_deliver.gif" alt="Cover">
                    </div> 
                </div>
               </div>
          </div>
          -->

     </div>




</div>


              <div class=" mt-2 mb-2 row"   v-else > 

              <div class=" " style=' align-content: center !important;align-items: center !important;text-align: center !important;'>
                <div>
                                         
                <div class="anim__container container">
                   <div class="background">
    <svg width="auto" height="-webkit-fill-available" viewBox="0 0 375 667" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
       <rect width="375" height="667" fill="white"/>
         <g filter="url(#filter0_d)">
          <path d="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z" fill="#4B76E9">
           <animate dur="5s" begin="0s" repeatCount="indefinite" attributeName="d"
from ="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
to =  "M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z"
values="M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z;
M68.4643 170.708C73.4646 207.138 96.9612 234.643 110.611 267.742C121.422 294.018 139.718 324.622 158.638 343.214C181.078 353.73 196.368 383.008 195.316 391.241C212.258 413.59 218.926 457.428 209.606 461.812C210.867 493.676 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 38.1632 68.1734 50.8216 84.4545C67.3992 105.786 64.5001 141.907 68.4643 170.708Z;
M99.2746 145.464C104.275 181.894 98.1484 221.334 111.798 254.434C122.609 280.709 143.872 298.065 162.792 316.656C183.919 337.451 202.659 363.189 201.128 397.9C200.362 415.417 194.641 432.45 195.316 450.021C196.578 481.884 219.147 507.783 244.103 519.228C269.06 530.673 296.449 530.996 323.117 533.521C351.227 536.154 375.494 539.96 375.494 539.96V601.261V633.774V666.964H326.724H289.47H230.201C230.201 666.964 197.848 666.05 179.739 666.964C161.179 667.931 129.276 666.964 129.276 666.964H75.0874H27.6727H-0.776184L-0.0987968 506.092V231.087V109.163V48.2014C-0.0987968 48.2014 -2.62342 19.6216 18.2787 27.8964C36.2077 34.9891 54.4971 52.0762 67.1555 68.3572C83.7331 89.6891 95.3104 116.663 99.2746 145.464Z"
/></path>
</g>
<g filter="url(#filter1_d)">
<path d="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z" fill="#3B58A4">
<animate dur="4s" begin="0s" repeatCount="indefinite" attributeName="d"
from="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
to="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
values="M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 187.065 578.949 208.626 546.105C220.909 527.39 239.065 494.306 242.931 470.633C246.453 449.04 259.992 424.597 263.514 403.003C267.981 375.598 269.962 306.95 279.196 281.465C300.198 223.615 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z;
M374.424 666.057C288.526 666.057 202.671 666.057 116.773 666.057C100.409 666.057 84.0456 666.057 67.639 666.057C53.4229 666.057 34.8261 669.683 21.1253 664.991C17.0881 663.605 13.3516 659.339 13.3086 654.114C13.2657 650.488 14.9407 647.236 16.6157 644.304C39.9799 603.249 76.1859 574.831 115.141 561.022C147.954 549.398 186.092 545.239 207.653 512.396C219.936 493.681 224.145 468.995 228.011 445.322C231.532 423.729 235.011 402.188 238.533 380.595C243 353.189 247.509 325.517 256.743 300.032C277.745 242.182 323.873 199.581 374.553 191.317C376.743 305.31 374.424 419.836 374.424 533.936C374.424 541.241 374.424 666.057 374.424 666.057Z"
/></path>
</g>
<g filter="url(#filter2_d)">
<path d="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z" fill="#3B58A4"
><animate dur="3s" begin="0" repeatCount="indefinite" attributeName="d"
from ="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
to =  "M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z"
values="M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z;
M56.8236 364.44C61.883 368.729 67.4348 374.8 70.7519 380.965C78.1903 394.937 94.4221 400.474 104.038 413.307C117.675 431.467 126.224 453.231 146.059 462.647C166.867 472.531 184.118 486.767 191.858 508.445C195.912 519.77 216.836 529.936 220.186 541.495C225.547 559.923 240.103 556.101 258.43 561.797C276.725 567.46 284.056 581.943 298.799 594.14C308.851 602.449 312.277 614.322 315.56 626.954C319.313 641.361 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 23.9839 346.358 35.577 350.748C42.9148 353.495 51.0941 359.615 56.8236 364.44Z;
M61.9543 360.178C67.0137 364.467 71.3024 369.626 74.6195 375.792C82.0578 389.764 85.2409 405.913 94.8571 418.746C108.494 436.906 130.977 445.283 150.812 454.698C171.619 464.582 193.264 477.817 201.004 499.495C205.058 510.82 204.79 523.218 208.141 534.777C213.502 553.206 228.546 568.518 246.873 574.214C265.168 579.876 286.913 576.928 301.656 589.124C311.707 597.433 315.795 610.769 319.079 623.4C322.831 637.808 325.88 667.394 325.88 667.394H284.093C284.093 667.394 255.749 667.394 237.587 667.394C189.909 667.394 115.499 667.394 115.499 667.394H93.9387H-0.776184L0.673571 463.427V386.381V367.535C0.673571 367.535 -0.298101 352.739 0.673571 348.886C5.39791 330.29 30.5927 344.497 42.1858 348.886C49.5236 351.634 56.2247 355.353 61.9543 360.178Z"
/> </path> 
/>
</g>
</g>
<defs>
<filter id="filter0_d" x="-15.7762" y="11.3929" width="406.27" height="671.001" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter1_d" x="-8.6922" y="169.317" width="406.186" height="520.077" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<filter id="filter2_d" x="-20.7762" y="321.557" width="370.657" height="371.837" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dx="2" dy="4"/>
<feGaussianBlur stdDeviation="11"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<linearGradient id="paint0_linear" x1="202.458" y1="175.197" x2="-128.17" y2="822.872" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="151.062" y1="369.002" x2="541.702" y2="697.506" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E63B4A"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="208.309" y1="449.259" x2="17.2945" y2="700.936" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B4EDB"/>
<stop offset="1" stop-color="#E81124"/>
</linearGradient>
<clipPath id="clip0">
<rect width="375" height="667" fill="white"/>
</clipPath>
</defs>
</svg>
    </div>


     <!-- <div class="cube-wrap cw1">
          <div class="img1 sides "></div>
      </div>
      <div class="cube-wrap cw2">
          <div class="img2 sides"></div>
      </div>
      <div class="cube-wrap cw3">
          <div class="img3 sides"></div>
      </div>-->

      <div class="presentation">
          <svg width="auto" height="75vh" viewBox="0 0 580 482" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="spheres">
                  <path id="sphere_one"
                      d="M577.925 351.384C576.423 352.885 573.996 352.885 572.493 351.384C570.99 349.882 570.99 347.457 572.493 345.956C573.996 344.454 576.423 344.454 577.925 345.956C579.42 347.457 579.42 349.882 577.925 351.384Z"
                      fill="url(#paint0_linear)" />
                  <path id="sphere_two"
                      d="M316.986 7.45305C315.485 8.95423 313.058 8.95423 311.556 7.45305C310.053 5.95187 310.053 3.52741 311.556 2.02624C313.058 0.524987 315.485 0.524987 316.986 2.02624C318.489 3.52741 318.489 5.95187 316.986 7.45305Z"
                      fill="url(#paint1_linear)" />
                  <path id="sphere_three"
                      d="M137.674 211.731C133.6 215.801 126.988 215.801 122.915 211.731C118.841 207.661 118.841 201.054 122.915 196.982C126.988 192.913 133.6 192.913 137.674 196.982C141.749 201.054 141.749 207.661 137.674 211.731Z"
                      fill="url(#paint2_radial)" />
                  <path id="sphere_four"
                      d="M445.086 170.532C441.012 174.602 434.399 174.602 430.326 170.532C426.252 166.461 426.252 159.854 430.326 155.784C434.399 151.714 441.012 151.714 445.086 155.784C449.16 159.854 449.16 166.461 445.086 170.532Z"
                      fill="url(#paint3_linear)" />
                  <path id="sphere_five"
                      d="M499.345 309.574C495.271 313.644 488.658 313.644 484.584 309.574C480.511 305.505 480.511 298.898 484.584 294.826C488.658 290.756 495.271 290.756 499.345 294.826C503.418 298.898 503.418 305.505 499.345 309.574Z"
                      fill="url(#paint4_radial)" />
                  <path id="sphere_six"
                      d="M152.049 79.3748C149.052 82.3692 144.191 82.3692 141.194 79.3748C138.196 76.3804 138.196 71.5236 141.194 68.5292C144.191 65.5348 149.052 65.5348 152.049 68.5292C155.046 71.5236 155.046 76.3804 152.049 79.3748Z"
                      fill="url(#paint5_linear)" />
                  <path id="sphere_seven"
                      d="M19.1049 302.301C16.1079 305.296 11.2469 305.296 8.24988 302.301C5.25297 299.306 5.25297 294.45 8.24988 291.456C11.2469 288.462 16.1079 288.462 19.1049 291.456C22.1099 294.45 22.1018 299.306 19.1049 302.301Z"
                      fill="url(#paint6_linear)" />
                  <path id="sphere_eight"
                      d="M215.097 479.267C212.1 482.262 207.239 482.262 204.243 479.267C201.246 476.273 201.246 471.416 204.243 468.422C207.239 465.427 212.1 465.427 215.097 468.422C218.094 471.416 218.094 476.273 215.097 479.267Z"
                      fill="url(#paint7_linear)" />
                  <path id="sphere_nine"
                      d="M42.3334 53.1798C40.831 54.6809 38.4045 54.6809 36.9021 53.1798C35.3996 51.6784 35.3996 49.2541 36.9021 47.7529C38.4045 46.2516 40.831 46.2516 42.3334 47.7529C43.8361 49.2541 43.828 51.6865 42.3334 53.1798Z"
                      fill="url(#paint8_linear)" />
                  <path id="sphere_ten"
                      d="M350.066 437.659C348.564 439.159 346.137 439.159 344.635 437.659C343.132 436.158 343.132 433.733 344.635 432.231C346.137 430.73 348.564 430.73 350.066 432.231C351.561 433.733 351.561 436.165 350.066 437.659Z"
                      fill="url(#paint9_linear)" />
                  <path id="sphere_eleven"
                      d="M6.85182 402.48C5.34936 403.981 2.92276 403.981 1.4203 402.48C-0.082158 400.979 -0.082158 398.555 1.4203 397.054C2.92276 395.552 5.34936 395.552 6.85182 397.054C8.35428 398.555 8.35428 400.987 6.85182 402.48Z"
                      fill="url(#paint10_linear)" />
                  <path id="sphere_twelve"
                      d="M531.95 184.243C530.448 185.744 528.021 185.744 526.518 184.243C525.015 182.742 525.015 180.318 526.518 178.816C528.021 177.315 530.448 177.315 531.95 178.816C533.452 180.318 533.452 182.75 531.95 184.243Z"
                      fill="url(#paint11_linear)" />
                  <path id="sphere_thirteen"
                      d="M135.938 389.146C134.437 390.647 132.01 390.647 130.507 389.146C129.005 387.645 129.005 385.221 130.507 383.72C132.01 382.218 134.437 382.218 135.938 383.72C137.441 385.221 137.441 387.645 135.938 389.146Z"
                      fill="url(#paint12_linear)" />
                  <path id="sphere_eight"
                      d="M271.791 373.515C267.718 377.587 261.105 377.587 257.031 373.515C252.958 369.445 252.958 362.838 257.031 358.769C261.105 354.699 267.718 354.699 271.791 358.769C275.865 362.838 275.865 369.445 271.791 373.515Z"
                      fill="url(#paint13_linear)" />
              </g>
              <g id="user">
               
              </g>
              <defs>
              <linearGradient id="paint0_linear" x1="567.345" y1="340.814" x2="576.765" y2="350.243"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="308.682" y1="-1.6863" x2="317.158" y2="8.06967"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(117.438 187.871) scale(38.022 37.9891)">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="0.8499" stop-color="#1B4EDB" />
              </radialGradient>
              <linearGradient id="paint3_linear" x1="421.765" y1="146.733" x2="437.301" y2="162.769"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(478.151 288.868) scale(30.9941 30.9671)">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3518" stop-color="#FFFFFF" />
                  <stop offset="0.6104" stop-color="#FFFFFF" />
                  <stop offset="0.7963" stop-color="#FFFFFF" />
                  <stop offset="0.8897" stop-color="#1B4EDB" />
              </radialGradient>
              <linearGradient id="paint5_linear" x1="138.215" y1="61.6054" x2="147.074" y2="74.6461"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint6_linear" x1="2.32554" y1="282.574" x2="16.1725" y2="300.048"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#FFFFFF" />
              </linearGradient>
              <linearGradient id="paint7_linear" x1="198.015" y1="460.909" x2="210.807" y2="475.132"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#FFFFFF" />
              </linearGradient>
              <linearGradient id="paint8_linear" x1="34.6511" y1="41.7117" x2="41.0692" y2="53.0477"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#1B4EDB" />
                  <stop offset="0.3747" stop-color="#1B4EDB" />
                  <stop offset="0.6753" stop-color="#1B4EDB" />
                  <stop offset="0.8914" stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint9_linear" x1="341.444" y1="426.425" x2="348.136" y2="436.098"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#FFFFFF" />
              </linearGradient>
           
           
           
              <linearGradient id="paint10_linear" x1="-4.57321" y1="391.763" x2="4.95182" y2="400.533"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint11_linear" x1="524.057" y1="173.57" x2="529.453" y2="181.881"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#1B4EDB" />
                  <stop offset="0.3747" stop-color="#1B4EDB" />
                  <stop offset="0.6753" stop-color="#1B4EDB" />
                  <stop offset="0.8914" stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint12_linear" x1="128.503" y1="379.769" x2="135.741" y2="389.994"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#FFFFFF" />
              </linearGradient>
              <linearGradient id="paint13_linear" x1="253.362" y1="348.974" x2="266.254" y2="369.046"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint14_linear" x1="268.549" y1="366.324" x2="323.613" y2="327.728"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#B9D2FC" />
              </linearGradient>
              <linearGradient id="paint15_linear" x1="15003.4" y1="16982.8" x2="8880.58" y2="23716.6"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#B9D2FC" />
              </linearGradient>
              <linearGradient id="paint16_linear" x1="-162.074" y1="15638.9" x2="11638.3" y2="15638.9"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#B9D2FC" />
              </linearGradient>
              <linearGradient id="paint17_linear" x1="322.582" y1="344.889" x2="306.191" y2="357.856"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#FFBD39" />
              </linearGradient>
              <linearGradient id="paint18_linear" x1="1739.72" y1="4482.34" x2="1496.47" y2="4799.16"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#FFBD39" />
              </linearGradient>
              <linearGradient id="paint19_linear" x1="324.477" y1="86.219" x2="324.477" y2="124.006"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#4060FF" />
              </linearGradient>
              <linearGradient id="paint20_linear" x1="305.722" y1="114.338" x2="296.51" y2="183.909"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1B4EDB" />
                  <stop offset="1" stop-color="#CB3DE8" />
              </linearGradient>
              <linearGradient id="paint21_linear" x1="261.958" y1="116.573" x2="253.87" y2="177.575"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint22_linear" x1="28323.2" y1="1304.83" x2="28566" y2="2839.44"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint23_linear" x1="19782.8" y1="1135.61" x2="19582.7" y2="1142.96"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
              <linearGradient id="paint24_linear" x1="308.95" y1="105.378" x2="308.95" y2="118.154"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#FFFFFF" />
              </linearGradient>
              <linearGradient id="paint25_linear" x1="-2573.55" y1="470.471" x2="-2573.55" y2="720.376"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#FFFFFF" />
              </linearGradient>
              <linearGradient id="paint26_linear" x1="1902.55" y1="2621.43" x2="1902.55" y2="2326.76"
                  gradientUnits="userSpaceOnUse">
                       <stop offset="0.2107" stop-color="#FFFFFF" />
                  <stop offset="0.3747" stop-color="#FFFFFF" />
                  <stop offset="0.6753" stop-color="#FFFFFF" />
                  <stop offset="0.8914" stop-color="#FFFFFF" />
                  <stop offset="1" stop-color="#1B4EDB" />
              </linearGradient>
           </defs>
          </svg>
         
          <div style="text-align: -webkit-center;z-index: 1000;margin-top: -60vh;">
                <div v-if="statusSelected==1">
                 <img src="../images/rep02.svg" alt="Cover" style="    overflow: hidden;vertical-align: middle;width: auto;height: 46vh;">
               </div>

               <div v-if="statusSelected==2">
                 <img src="../images/rep03.svg" alt="Cover" style="overflow: hidden;vertical-align: middle;width: auto;height: 46vh;">
               </div>  
          
               <div v-if="statusSelected==3">
                  <img src="../images/rep04.svg" alt="Cover" style="overflow: hidden;vertical-align: middle;width: auto;height: 46vh;">
                </div>  
          </div>      
      </div>
  </div>


                </div>         
              </div>
         </div>
              
            </div>
        </div>
    </transition>
`
}