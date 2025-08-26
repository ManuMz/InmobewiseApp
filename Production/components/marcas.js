const marca = {
    props:['marcas'],
    template:`
        <div class="empresas">
            <div class="scrollable-x">
                <div class="item-empresa"  v-for="item in marcas">
                    <img :src="item.foto" class="">
                </div>
            </div>
        </div>
    `
}