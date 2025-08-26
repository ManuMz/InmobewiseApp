let loadingDownload = {
    props:{
        isActive:{
            type:Boolean,
            default:true
        }
    },
    template:`
        <transition name="show-load-container">
            <div v-if="isActive" class="loading">
                <img  src="../images/loading.png">
            </div>
        </transition>
    `
}