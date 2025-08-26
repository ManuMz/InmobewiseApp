let containerVariante = {
    props:{
        isActive:false,
        caracteristicas:{
            requiere:true
        },
        currentCaracteristica:0
    },
    methods: {
        onChangeCaracteristica(idCaracteristica){
            this.$emit('on-change-caracteristica',idCaracteristica);
        }
    },
    template:`
    <transition name="fade">
        <div class="container-variante" v-if="isActive">
            <div class="navbar fixed-bottom">
                <p><b>Variante:</b></p>
                <div class="variante">
                    <div class="scrollable-x">
                        <div class="item-variante" :class="caracteristica.idCaracteristica == currentCaracteristica ? 'active' : '' " v-for="caracteristica in caracteristicas">
                            <img :src="caracteristica.foto" class="img-fluid" @click="onChangeCaracteristica(caracteristica.idCaracteristica)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    `
}