let emptyComponent = {
    props:{
        description:"",
        isActive:false,
        customStyle:{}
    },
    template:`
        <div :style="customStyle" v-if="isActive">
            {{description}}
        </div>
    `
}