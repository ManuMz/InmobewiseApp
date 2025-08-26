
let brands = {
    props:{
        isActive:{
            type:Boolean,
            default:true
        },
        info:Array
    },
    data() {
        return {
            cards:Array,
            xDown: null,
            yDown: null,
            xDiff:null,
            yDiff:null,
            selectedIndex : 0
        }
    },
    mounted() {
        document.addEventListener('touchstart', this.handleTouchStart, false);        
        document.addEventListener('touchmove', this.handleTouchMove, false);
        document.addEventListener('touchend', this.handleToEnd, false);
    },
    methods: {
        getTouches(evt) {
            return evt.touches ||          
                   evt.originalEvent.touches; 
        },
        handleTouchStart(evt) {
            const firstTouch = this.getTouches(evt)[0];                                      
            this.xDown = firstTouch.clientX;                                      
            this.yDown = firstTouch.clientY;                                 
        },  
        handleToEnd(){
            if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) {/*most significant*/
                if ( this.xDiff > 0 ) {
                    /* left swipe */ 
                } else {
                    /* right swipe */
                }                       
            } else {
                if ( this.yDiff > 80 ) {
                    /* up swipe */ 
                    if(this.selectedIndex - 1 < 0){
                        this.selectedIndex = this.$props.info.length -1;
                    }else{
                        this.selectedIndex--;
                    }
                } else if(this.yDiff < -80){ 
                    /* down swipe */
                    
                    if(this.selectedIndex + 1 == this.$props.info.length){
                        this.selectedIndex = 0;
                    }else{
                        this.selectedIndex++;
                    }
                }                                                                 
            }  
            this.yDiff = 0;
            this.xDiff = 0;                               
        },     
        onClickBrand(id,index){
            if(this.selectedIndex == index){
                this.$emit("select-brand",id);
            }
        },
        handleTouchMove(evt) {
            if ( ! this.xDown || ! this.yDown ) {
                return;
            }
        
            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;
        
            this.xDiff = this.xDown - xUp;
            this.yDiff = this.yDown - yUp;
            /* reset values */
            xDown = 0;
            yDown = 0;                                             
        },
        calculateClass(index){
            if(this.$props.info.length==1 && index == 0){
                return "active"
            }

            if(this.selectedIndex-1 < 0 && index == this.$props.info.length-1){
                return "semi-active-top"
            }else if(this.selectedIndex+1 >= this.$props.info.length && index == 0){
                return "semi-active-bot"
            }
            else if(this.selectedIndex == index){
                return "active"
            }
            else if(this.selectedIndex-1 == index){
                return "semi-active-top"
            }else if(this.selectedIndex+1 == index){
                return "semi-active-bot"
            }else{
                return "disable"
            }
        }
    },
    template:`
        <transition name="show-brand-container">
            <div v-if="isActive" class="brand-container">
                <div class='wrapper'>
                    <div class='carousel'>
                        <div class='carousel__item' :class="calculateClass(index)" v-for="(brand, index) in info">
                            <div class="card">
                                <div class="card-body">
                                    <img :src="brand.foto" class="img-fluid" @click="onClickBrand(brand.idEmpresa, index)">
                                </div>
                                <div class="card-footer">
                                    {{brand.nombreEmpresa}}
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </transition>
    `

}
