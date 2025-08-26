let modaltutorial = {

    methods: {
        closeListAddress(){
          //  this.$emit("close-list");
        },
        selectedAddress(address){
           // this.$emit('selected-address',address);
        }
    },
    watch: {
        
    },
    props:{
      isDisabled2:{
          type:Boolean,
          default:false
      }
      
   },
   data(){
    return{
        buttdisabled:{
            type: Boolean,
            default:true
           }
        }
      },
    methods: {
        mounted(){
            alert("alert desde el mounted");
        },
        numimg(numimg){
          // alert("numero de imagen: "+numimg);
         if(numimg>=6)
         { 
           //alert("se ejecuta funcion");
           this.buttdisabled=false;
         // this.$emit('cambiaevento') 
          // this.isDisabled2=false;
         }

      }
    }
    ,
    template:`
    <div class="modal fade" id="myModal" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
    
      <!-- Modal content-->
      <div class="modal-content" >
        <!--  
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        -->
        <div class="modal-body">
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-mdb-ride="carousel" data-interval="false" data-mdb-touch="false">
        <ol class="carousel-indicators" style="margin-bottom: -4vh;">
           <!--
           <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
           -->
          <li data-target="#carouselExampleIndicators" data-slide-to="0" @click="numimg(1)" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1" @click="numimg(2)" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2" @click="numimg(3)" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3" @click="numimg(4)" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4" @click="numimg(5)" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
           <li data-target="#carouselExampleIndicators" data-slide-to="5" @click="numimg(6)" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
        </ol>
        <div class="carousel-inner">
           <!--
           <div class="carousel-item active">
            <img class="d-block w-100" src="volcan1.jpg" alt="First slide">
          </div>
           -->  
          <div class="carousel-item active">
            <img class="d-block w-100" src="tutorial1.gif" alt="First slide">
          </div>
    
          <div class="carousel-item">
            <img class="d-block w-100" src="tutorial2.gif" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="tutorial3.gif" alt="Third slide">
          </div>

          <div class="carousel-item">
          <img class="d-block w-100" src="tutorial4.gif" alt="Third slide">
        </div>

        <div class="carousel-item">
        <img class="d-block w-100" src="tutorial5.gif" alt="Third slide">
      </div>
        
          <div class="carousel-item">
        <img class="d-block w-100" src="tutorial6.gif" alt="Third slide">
      </div>

        </div>
         <!--
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
          -->
      </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal" :disabled='isDisabled2'>Siguiente</button>
        </div>
      </div>
      
    </div>
  </div>
    `
}