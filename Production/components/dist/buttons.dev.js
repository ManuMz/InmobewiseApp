"use strict";

var primaryButton = {
  props: {
    field: {
      requiere: true
    }
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked-button');
    }
  },
  template: "\n        <button :type=\"field.typeButton\" class=\"modern-button btnSecundary\" @click=\"clicked\" >\n            <span v-html=\"field.content\"></span>\n        </button>\n    "
};
var primaryButtonBlock = {
  props: {
    field: {
      requiere: true
    }
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked-button');
    }
  },
  template: "\n        <button :type=\"field.typeButton\" class=\"modern-button btnPrimary\" :class=\"field.childClass\" @click=\"clicked\" :id=\"field.id\" :disabled=\"field.disabled\">\n            <span v-html=\"field.content\"></span>\n        </button>\n    "
};