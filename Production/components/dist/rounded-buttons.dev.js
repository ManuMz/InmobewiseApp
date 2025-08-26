"use strict";

var roundedButton = {
  props: {
    field: {}
  },
  methods: {
    clicked: function clicked() {
      this.$emit('clicked-rounded');
    }
  },
  template: "\n        <button :type=\"field.typeButton\" class=\"modern-button-rounded\" :class=\"[field.size, field.align, field.childClass, field.disabledClass]\" @click=\"clicked\" :disabled=\"field.disabled\">\n            <span v-html=\"field.content\"></span>\n        </button>\n    "
};