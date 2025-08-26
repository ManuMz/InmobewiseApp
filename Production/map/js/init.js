/**
 * Area para testing comentar en prodduction
 */

let mapGoogle;
let marker;
let geocoder;
let infowindow;

$(document).ready(function(){
   // $('#myModal').modal('handleUpdate');
   // $('#myModal').modal('toggle');
    content.init("testing","1",'{"lat":,19.1232528"lng":-98.2237298}',1,"19.1232528","-98.2237298");
    //18.781571,-98.9887522  Anenenuilco
    //18.7425098,-98.9868339 col elijal
    //19.1232528, -98.2237298 agricola covadonga
});

function initMap() {
    infowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    mapGoogle = new google.maps.Map(document.getElementById("map-component"), {
      
        center: { 
            lat: content.initialize.latt, 
            lng: content.initialize.longg 
        },
        mapTypeControl:false,
        fullscreenControl:false,
        streetViewControl:false,
        zoomControl:false,
        styles:styleMap,
        zoom: 18
    });
    marker = new google.maps.Marker({
        position: mapGoogle.center, 
        animation:google.maps.Animation.DROP,
        draggable: true,
        map: mapGoogle
    });

    geocodeLatLng(geocoder);
    mapGoogle.addListener('zoom_changed', function() {
        mapGoogle.panTo(marker.getPosition());
    });

    mapGoogle.addListener('drag',function(){
        marker.setPosition(mapGoogle.center);
    });
    
    marker.addListener('dragend',function(){
        mapGoogle.panTo(marker.getPosition());
        geocodeLatLng(geocoder);
    });
    
    marker.addListener('click', function() {
        mapGoogle.setZoom(18);
        mapGoogle.panTo(marker.getPosition());
    });

    mapGoogle.addListener('dragend',function(){
        geocodeLatLng(geocoder);
    });
    
}

function geocodeLatLng(geocoder) {
    const latlng = {
        lat : marker.position.lat(),
        lng : marker.position.lng()
    }
    geocoder.geocode(
        { location: latlng }, 
        (results, status) => {
            if (status === "OK") {
                content.activateListAdress(results);
            } else {
                //window.alert("Geocoder failed due to: " + status);
            }
    });
}

function geocodeAddress(value) {
    let address = value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            content.activateListAdress(results);
            let latlng = {
                lat:results[0].geometry.location.lat(),
                lng:results[0].geometry.location.lng(),
            }
            mapGoogle.panTo(latlng);
            marker.setPosition(latlng);
        } else {
            console.log(status);
        }
    });
}
function extractPostalCode(formattedAddress) {
    // Expresión regular para un código postal (puedes ajustar según el formato de tu país)
    const postalCodePattern = /\b\d{5}(-\d{4})?\b/; // Esto busca un código postal de 5 dígitos, opcionalmente seguido de un '-XXXX'.
    const found = formattedAddress.match(postalCodePattern);
    return found ? found[0] : null; // Devuelve el código postal o null si no se encuentra
}

let content = new Vue({
    el:"#map",
    components:{
        'component-map':map,
        'lis-address':listAdress,
        'modal-tutorial':modaltutorial
    },
    data(){
        return{
            initialize:{},
            showModal: true,
            listAdressIsActive:false, //booleano 
            address:null,
            postalCode:"", 
            extractedPostalCode:""
        }
    },
    watch:{
        initialize(){
        } 
    },
    methods:{
        init(use_mode, id_app, data,optutorial,latitud,longitud){
            var latt1=parseFloat(latitud);
            var logg1=parseFloat(longitud);

         //   alert("latitud: "+latitud+" longitud: "+longitud);
        if(optutorial==1)//enseñara el tutotial
        {
           // showModal:true;
           $('#myModal').modal('toggle');
        }
        else
        {
           // showModal:false;
           $('#myModal').modal('hide');
        }
         //   alert("datos recibidos44: "+data+" optutorial22: "+optutorial);
            console.log(data);
            this.initialize = {
                use_mode: use_mode,
                id_app: id_app,
                latt:latt1,
                longg:logg1
            }

            /***
             * Add script to google maps before to init execute
             */
            let script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            //script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyDTYVpzbCOcSSB54S6f9qUVVKqQkZDvvaY&libraries=places&callback=initMap");Original
            script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAlwvv6DPfMA1dn8Egn0EBqpnN2u5bGJZU&libraries=places&callback=initMap");
            document.getElementsByTagName("head")[0].appendChild(script);
        },
        initialPosition(){
            let latlng = {
                lat:this.initialize.latt,
                lng:this.initialize.longg,
            }
            mapGoogle.panTo(latlng);
            marker.setPosition(latlng);
            geocodeLatLng(geocoder);
        },
        changeInputAddress(value){
            geocodeAddress(value);
        },
        selectedAddress(address){
            console.log(address);
            if(this.postalCode == ""){
                createAviso("Lo sentimos no tenemos alcance en esta zona");
            }else{
                createQuestion("Dirección de entrega",address.formatted_address ,true,()=>{
                    //console.log(this.postalCode);
                    comunicateWebView("location","postal_code="+this.postalCode);
                },
                ()=>{
                    content.address =null;
                    //listAdress.methods.getInputAddress();
                }
                )
                //const createQuestion = (title,text,cancelButtonIsActive = true,okCallBack = () => {}, cancelCallBack = () => {})
            }
        },
        autoCompleteSelectedAddress(place){
            content.extractedPostalCode = extractPostalCode(place.formatted_address);
            if (this.extractedPostalCode==null){
                createAviso("Lo sentimos, no encontramos una dirección válida");
            }
            else{
                createQuestion("Dirección de entrega",place.formatted_address ,true,()=>{
                    //console.log(this.extractedPostalCode);
                    comunicateWebView("location","postal_code="+this.extractedPostalCode);
                },
                ()=>{
                    content.address =null;
                }
                )
                //const createQuestion = (title,text,cancelButtonIsActive = true,okCallBack = () => {}, cancelCallBack = () => {})
            }
        },
        activateListAdress(address){
            this.listAdressIsActive = true;
            this.address = address;
            /**
             * sublocality = asentamiento  (creo)
             * administrative_area_level_1 = estado
             * administrative_area_level_2 = municipio
             */

            let asentamiento = "";
            let estado = "";
            let municipio = "";

            address.forEach(item =>{
                item.address_components.forEach(component=>{
                    component.types.forEach(type=>{
                        if(type == "sublocality" && asentamiento == ""){
                            asentamiento = component.long_name;
                            //console.log(component.long_name);
                        }
                        if(type == "administrative_area_level_1" && estado == ""){
                            estado = component.long_name;
                            //console.log(component.long_name);
                        }
                        if(type == "administrative_area_level_2" && municipio == ""){
                            municipio = component.short_name;
                            //console.log(component.long_name);
                        }
                        /**
                         * Rompemos ciclo
                         */
                        if(estado != "" && asentamiento != "" && municipio != ""){
                            return false;
                        }
                    });
                    /**
                     * Rompemos ciclo
                     */
                    if(estado != "" && asentamiento != "" && municipio != ""){
                        return false;
                    }
                });                
                /**
                 * Rompemos ciclo
                 */
                if(estado != "" && asentamiento != "" && municipio != ""){
                    return false;
                }
            });

            let form = new FormData();
            form.append('asentamiento',asentamiento);
            form.append('estado',estado);
            form.append('municipio',municipio);
            
            //console.log(asentamiento);
            //console.log(estado);
            //console.log(municipio);
            /**
             * Recuerda subir el script a produccion tambien!!
             */
            let services = this.initialize.use_mode == "testing" ? "https://arvispace.com/serviciosASAR/complete_address.php" : "https://arvispace.com/serviciosASAR/complete_address.php";
            /**
             * En axios debes de acceder a elementos de tipo vue por su variable this es iinutilizable
             */
            axios.post(services,form).then(function(response){
                if(response.status == 200){
                    if(response.data.postal_code != null){
                        content.postalCode = response.data.postal_code;
                        //console.log(content.postalCode);
                    }else{
                        createAviso("Lo sentimos,no encontramos una dirección válida");
                        content.postalCode = "";
                    }
                }
            }).catch(function(error){
                console.log(error)
            });
        },
        closeListAddress(){
            this.listAdressIsActive = !this.listAdressIsActive;
        }
    }
});