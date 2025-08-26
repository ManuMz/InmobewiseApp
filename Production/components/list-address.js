let listAdress = {
    props:{
        address:null,
        isActive:false
    },
    data() {
        return {
            button:{
                type:'rounded-button',
                content:"<i class='icon-Zona-de-bodegas'></i>",
                typeButton:'button',
                align:'lg',
                size:'',
            },
            fieldScheme: 
            {
                placeholder: 'Busca aquí'
            },
            inputAddress: {
                value: '',
                error:{
                    isActive:false,
                    message:"Opción invalida"
                },
                action:null
            }
        }
    },
    methods: {
        closeListAddress(){
            this.$emit("close-list");
        },
        selectedAddress(address){
            this.$emit('selected-address',address);
        },
        initAutoComplete(){
            let element = this.$refs.inputAddressRef.$el.firstChild;
            const autocomplete = new google.maps.places.Autocomplete(element);
            // Vincula los límites del mapa con el autocompletado
            autocomplete.bindTo("bounds", mapGoogle);
            // Escuchar cuando un lugar es seleccionado
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry) {
                    // Si no hay detalles disponibles, alerta al usuario
                    createAviso("No se encontraron detalles para el lugar seleccionado");
                    return;
                }
                else{
                    marker.setPosition(place.geometry.location);  // Coloca el marcador en la ubicación seleccionada
                    marker.setVisible(true);
                    content.autoCompleteSelectedAddress(place);
                }
                // Si el lugar tiene una geometría, ajusta el mapa y el marcador
                if (place.geometry.viewport) {
                    mapGoogle.fitBounds(place.geometry.viewport);  // Ajusta el mapa a los límites del lugar
                } else {
                    mapGoogle.setCenter(place.geometry.location);  // Centra el mapa en el lugar
                    mapGoogle.setZoom(17);  // Zoom en el lugar
                }

                //marker.setPosition(place.geometry.location);  // Coloca el marcador en la ubicación seleccionada
                //marker.setVisible(true);
                //content.autoCompleteSelectedAddress(place);
            });
            //--*****************************************************
        },
        autoCompleteSelectedAddress(autoCompletePlace){
            this.$emit('auto-complete-selected-address',autoCompletePlace);
        },
    },
    /*watch: {
        'inputAddress.value':function(){
            if(this.inputAddress.action != null){
                clearTimeout(this.inputAddress.action);
            }
            this.inputAddress.action = setTimeout(() => 
                { this.$emit('change-input-address',this.inputAddress.value); 
                this.inputAddress.action = null;
            }, 2000);
        },
    },*/
    components:{
        'rounded-button':roundedButton,
        'input-text':textInput
    },
    template:`
        <transition name="show-container">
            <div class="list-address-container" :class="isActive? '':'hide'">
                <div class="close-list" @click="closeListAddress">
                    <div class="icon-atras2" :class="isActive ? 'arrow-down':'arrow-up'">
                    </div>
                </div>
                <div class="input-address" @click="initAutoComplete"> 
                    <input-text
                        ref="inputAddressRef"
                        :field="fieldScheme"
                        :data.sync="inputAddress"
                    ></input-text>
                </div>
                <div v-if="isActive && address != null">
                    <div @click="selectedAddress(item)" class="row address-element" v-if="item.geometry.location_type == 'ROOFTOP' || item.geometry.location_type == 'RANGE_INTERPOLATED' || item.geometry.location_type == 'GEOMETRIC_CENTER'" v-for="item in address">
                        <div class="col-3 icon">
                            <rounded-button
                                :field="button"
                            ></rounded-button>
                        </div>
                        <div class="col-9 formated-address">
                            <p class="title">{{item.address_components[1].long_name+", "+item.address_components[0].long_name}}</p>
                            <p class="text">{{item.address_components[2].long_name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    `
};

