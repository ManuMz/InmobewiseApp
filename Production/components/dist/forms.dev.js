"use strict";

var componentForm = {
  components: {
    'text-input': textInput,
    'select-option': selectOption,
    'password-input': passwordInput,
    'roundend-button': roundedButton,
    'primary-button': primaryButton,
    'primary-button-block': primaryButtonBlock
  },
  props: {
    schema: {
      required: true
    },
    data: {
      required: true
    },
    buttons: {
      required: true
    }
  },
  data: function data() {
    return {
      isSubmitted: false
    };
  },
  methods: {
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      this.$emit("on-submit", this); //comentado por ahorita para hace pruebas de preventdefault
    }
  },
  template: "\n        <form class=\"form\" @submit=\"onSubmit\">\n            <template v-for=\"field in schema.fields\">\n                <component :is=\"field.type\" :field=\"field\" :data.sync=\"data[field.name]\"></component>\n            </template>\n            <div class=\"btn-center\">\n            <component :is=\"buttons.type\" :field=\"buttons\">\n            </component>\n            </div>\n        </form>\n    "
};