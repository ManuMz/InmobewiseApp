"use strict";

var producto = {
  props: {
    productos: Array,
    title: String,
    nameToCarousel: String
  },
  data: function data() {
    return {
      posts: [],
      page: 1,
      perPage: 4,
      pages: []
    };
  },
  components: {
    'carousel': carousel
  },
  filters: {
    toCurrency: function toCurrency(val) {
      return '$' + parseFloat(val).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
  },
  methods: {
    setPages: function setPages() {
      this.pages = [];
      var numberOfPages = Math.ceil(this.posts.length / this.perPage);

      for (var index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      } //console.log(this.pages.length);

    },
    paginate: function paginate(posts) {
      var page = this.page; //actual page

      var perPage = this.perPage; //productos por pagina

      var from = page * perPage - perPage; //

      var to = page * perPage;
      return posts.slice(from, to);
    },
    selectProduct: function selectProduct(producto) {
      this.$emit('selected-producto', producto);
    }
  },
  created: function created() {//post = this.productos;
  },
  computed: {
    displayedPosts: function displayedPosts() {
      this.posts = this.$props.productos;
      return this.paginate(this.posts);
    }
  },
  watch: {
    posts: function posts() {
      this.setPages();
    },
    page: function page() {//alert(this.page);
    },
    productos: function productos() {
      this.page = 1;
    }
  },
  template: "\n        <div class=\"row productos\">\n            <h4 class=\"titulo\">{{title}}</h4>\n            <div class=\"col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 padding\" v-for=\"(producto,productoIndex) in displayedPosts\">\n                <div class=\"card shadow\">\n                    <div class=\"element\" \n                        :class=\"caracteristicaIndex == 0 ? 'element-active' : 'element-disabled'\" \n                        v-for=\"(caracteristica, caracteristicaIndex) in producto.Caracteristicas\">\n                        <carousel\n                            v-bind:id=\"caracteristica.idCaracteristica\"\n                            v-bind:name=\"nameToCarousel\"\n                            @selected=\"selectProduct(producto)\"\n                            v-bind:imagenes=\"caracteristica.imagenes\"\n                        ></carousel>\n                        <hr class=\"line\">\n                        <h4 class=\"title\">{{producto.descripcion}}</h4>\n                        <p v-if=\"caracteristica.statusOferta == 0\" class=\"precio\">{{caracteristica.precio | toCurrency}}</p>\n                        <p v-if=\"caracteristica.statusOferta == 1\" class=\"precio-oferta\">{{caracteristica.precioOferta | toCurrency}}</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"pagination-element\">\n                <ul class=\"pagination pagination-sm\">\n                    <li class=\"page-item\"  v-if=\"page != 1\"><a class=\"page-link\" href=\"#\"  @click=\"page--\" disabled><</a></li>\n                    <li class=\"page-item\" v-for=\"pageNumber in pages\" v-if=\"pageNumber > (page-2) && pageNumber < (page+2)\"><a class=\"page-link\" :class=\"page==pageNumber?'active':''\" href=\"#\" @click=\"page = pageNumber\">{{pageNumber}}</a></li>\n                    <li class=\"page-item\"  v-if=\"page < pages.length\"><a class=\"page-link\" href=\"#\"  @click=\"page++\">></a></li>\n                </ul>\n            </div>\n        </div>\n    "
};