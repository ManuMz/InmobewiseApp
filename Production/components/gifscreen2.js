let gifs = {
    data() {
        return {
            buttonAccept:{
                type:'primary-button-block',
                content:'Aceptar',
                typeButton:'button'
            },
            numitem:{
              type: Number,
              default: 0
             },
             rolesSelected:"",
        }
    },
    components:{
        'primary-button-block':primaryButtonBlock
    },
    methods: {
        acceptAgreements(){
           
         // alert("check: "+this.checkmostrar);

            comunicateWebView("closetutorial","tutorialwatch="+this.checkmostrar);
        },
        Anterior01()
        {
          this.number1--;
         //  alert("num1: "+this.number1);
          if(this.number1==0)
          {
            this.isDisabled2=true;
          }

          if(this.number1<1)
          {
            this.isDisabled1=false;

            this.showfinalizar=false;
            this.vistasig=true;

          }


          $('#carouselExampleIndicators').carousel('prev');
        }
        ,
        Siguiente01()
        {
            //alert("siguiente");
            this.number1++;
           // alert("num item: "+this.number1);
          // alert("num2: "+this.number1);
           $('#carouselExampleIndicators').carousel('next');
            if(this.number1>0)
            {
              this.isDisabled2=false;
            }

            if(this.number1==1)
            {
              this.isDisabled1=true;
              this.showfinalizar=true;
              this.vistasig=false;
            }

            
           
        },
        notutorials()
        {
          this.checkmostrar=true;

          comunicateWebView("closetutorial","tutorialwatch="+this.checkmostrar);

        }
        ,
        samplefunction : function(event) {
          if (event.target.checked) {
            // alert('isSelected');
             this.checkmostrar=true;
          }
          else
          {
            //alert('dont isSelected');
            this.checkmostrar=false;
          }
          
      }
        

    },
    props:{
      isDisabled2:{
          type:Boolean,
          default:true
      },

      isDisabled1:{
        type:Boolean,
        default:false
    },

       number1:{
        type:Number,
        default:0
    },
    showfinalizar:{
      type:Boolean,
      default:false
  },
  vistasig:{
    type:Boolean,
    default:true
   },
   checkmostrar:{
    type:Boolean,
    default:false
   }
   },
    template:`
        <div class="container mb-3">
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-mdb-ride="carousel" >
        <ol class="carousel-indicators" style="margin-bottom: -4vh;">
           <!--
           <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
           -->
         
          <li data-target="#carouselExampleIndicators"  data-slide-to="0" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;" class="active"></li>
          <li data-target="#carouselExampleIndicators"  data-slide-to="1" style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
          

          <!--
          <li data-target="#carouselExampleIndicators"   style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
          <li data-target="#carouselExampleIndicators"   style="background-color: black;background-color: black;height: 0.7vh;width: 5vw;"></li>
           -->
      </ol>

    


        <div class="carousel-inner">
           <!--
           <div class="carousel-item active">
            <img class="d-block w-100" src="volcan1.jpg" alt="First slide">
          </div>
           -->  
          <div class="carousel-item active">
            <img class="d-block w-100" src="tutorial5.gif" alt="First slide">
          </div>
    
          <div class="carousel-item">
            <img class="d-block w-100" src="tutorial6.gif" alt="Second slide">
          </div>

        

     <!--
        <div class="carousel-item">
        <img class="d-block w-100" src="tutorial5.gif" alt="Third slide">
      </div>
        
          <div class="carousel-item">
        <img class="d-block w-100" src="tutorial6.gif" alt="Third slide">
      </div>
        -->

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






  <!--
      <div class="container" style="padding-top: 10vh;">
        <div  class="row">
            <div class="col" style="text-align: center;">
               <button type="button" class="btn btn-info" @click="Anterior01()" :disabled='isDisabled2'>Anterior</button>
            </div>
            <div class="col" style="text-align: center;">
               <button type="button" class="btn btn-success" @click="Siguiente01()" :disabled='isDisabled1' v-if="vistasig">Siguiente</button>
               <button type="button" class="btn btn-danger" @click=" acceptAgreements()"  v-if="showfinalizar" >Finalizar</button>
            </div>
        </div>
      </div>
      <div class="form-check" style="padding-top: 3vh;">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" v-model="rolesSelected" v-on:click="samplefunction($event)">
      <label class="form-check-label" for="flexCheckChecked">
        No volver a mostrar tutoriales.
      </label>
    </div>


    <div class="container" style="padding-top: 1vh;">
       <label class="form-check-label" style="display: block;" @click=" acceptAgreements()">
        <u> Omitir tutorial.</u>
      </label>
    </div>
       -->







    <div class="container" style="padding-top: 10vh;">
         <div  class="row">
           
         <div class="col" style="text-align: center;">
             <p class="form-check-label" style="display: block;" @click=" notutorials()">
              <u> No volver a mostrar tutoriales.</u>
             </p>
           </div>

          <div class="col" style="text-align: center;">
             <p class="form-check-label" style="display: block;" @click=" acceptAgreements()">
                <u> Omitir tutorial.</u>
             </p>
             </div>
    </div>
  </div>




      

      </div>
     
    `
};