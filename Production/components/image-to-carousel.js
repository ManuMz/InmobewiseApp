let imageToCarousel = {
    props:{
        isActive:false,
        src:""
    },
    data(){
        return{
            isLoad:false
        }
    },
    methods:{
        loaded(){
            this.isLoad = true;
        }
    },
    watch:{
        isActive(){
            this.isLoad = false;
        }
    },
    template:`
        <div>
            <div v-if="!isLoad" class="load-image">
                <div class="lds-dual-ring">
                </div>
            </div>
            <div v-if="isActive">
                <transition>
                    <img v-show="isLoad && isActive" @load="loaded" :src="src" class="img-fluid">
                </transition>
            </div>
        </div>
    `
}