let category = {
    props:['categorias'],
    methods:{
        selected(idCategoria){
            this.$emit('selected-category',idCategoria);
        }
    },
    template: `
        <div class="categories">
            <div class="scrollable-x">
                <div class="item-category shadow" @click="selected(item.idCategoria)" v-for="item in categorias">
                    <img :src="item.foto" class="img-fluid">
                    <p>{{item.nombreCategoria}}</p>
                </div>
            </div>
        </div>
    `
}

