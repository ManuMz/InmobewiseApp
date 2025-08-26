/*Vue.component('nav-done-icon', */
let navDoneIcon = {
    props:{
        textDone:String,
        urlToPressDone:{
            default:"uniwebview://close",
            type:String
        },
        headerIcon:{
            type:String,
            default:""
        }
    },
    template: `
        <nav class="navbar fixed-top bg">
            <a class="navbar-brand" href="#">
                <img :src="headerIcon" class="">
            </a>
            <a v-if="textDone.length > 0" v-bind:href="urlToPressDone" class="navbar-link">{{textDone}}</a>
        </nav>`
};

/*Vue.component('image-brand',*/


/*Vue.component('side-menu-open',*/
let sideMenuOpen = {
    props:{
        secondaryButton:""
    },
    methods:{
        sideMenu(){
            this.$emit('set-side-menu');
        },
        secondaryClick(){
            this.$emit('secondary-click');
        }
    },
    template: `
    <nav class="navbar fixed-top bg">
        <a class="navbar-link open-menu" @click="sideMenu"><i class="icon-menu"></i></a>
        <a class="navbar-link" href="#" @click="secondaryClick" v-if="secondaryButton != ''" v-html="secondaryButton"></a>
    </nav>`
};



let headerNav = /*new Vue(*/{
    props:{
        navToSide:{
            type:Boolean,
            default:false
        },
        navToDoneIcon:{
            type:Boolean,
            default:false
        },
        textDone:{
            type:String,
            default:""
        },
        headerIcon:{
            type:String,
            default:""
        },
        secondaryButtonContent:{
            type:String,
            default:""
        }
    },
    components:{
        'nav-done-icon':navDoneIcon,
        'side-menu-open':sideMenuOpen
    },
    methods:{
        setSideMenu(){
            this.$emit('set-side-menu');
        },
        secondaryClick(){
            this.$emit('secondary-click');
        }
    },
    template:`
        <side-menu-open 
            v-if="navToSide"
            @set-side-menu="setSideMenu"
            :secondary-button = "secondaryButtonContent"
            @secondary-click="secondaryClick"
        ></side-menu-open>
        <nav-done-icon 
            v-else-if="navToDoneIcon"
            v-bind:text-done="textDone"
            :header-icon = "headerIcon"
        ></nav-done-icon>
    `
};

