/*Vue.component('side-menu',*/
let sideMenu = {
    props:{
        optionsMenu:{
            type:Array
        },
        imageBrand:String
    },
    methods:{
        sideMenu(){
            this.$emit('set-side-menu');
        }
    },
    data() {
        return {
        }
    },
    components:{
        'rounded-button': roundedButton,
    },
    template:`
        <transition name="slide">
            <div class="side-menu">
                <div class="menu">
                    <a hreaf="" class="">
                        <img v-bind:src="imageBrand" class="img-fluid image-brand">
                    </a>
                    <div class="container-options">
                        <div class="option-menu-container" v-for="option in optionsMenu">
                            <a v-bind:href="option.url" class="option-menu-ref">
                                <div class="option-menu-icon">
                                    <span v-bind:class="option.icon"></span>
                                </div>
                                <label>
                                    {{option.titulo}}
                                </label>
                            </a>
                        </div>
                    </div>
                    <div class="close-menu" @click="sideMenu">
                        <button class="btn btn-close"><i class="icon-atras2"></i></button>
                    </div>
                </div>
            </div>
        </transition>
    `
};

/*Vue.component('image-brand',*/
let imageBrand = {
    props:{
        srcImage:{
            default:"../images/logo.png",
            type:String,
            required:true
        }
    },
    template:`<img v-bind:src="srcImage" class="img-fluid image-brand">`
};



//A todos les quite '(' para que no se inicialicen como objeto
let sideMenuContainer = /*new Vue(*/{
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        options:{
            required:true
        }
    },
    components:{
        'side-menu':sideMenu
    },
    methods:{
        setSideMenu(){
            this.$emit('set-side-menu');
        }
    },
    template:`
        <side-menu
            v-if="isActive"
            imageBrand="../images/logo.png"
            v-bind:options-menu = "options"
            @set-side-menu="setSideMenu"
        ></side-menu>
    `
}; 


