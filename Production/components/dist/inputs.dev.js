"use strict";

var textInput = {
  props: {
    field: {
      required: true
    },
    data: {
      required: true
    }
  },
  template: "\n        <div>\n            <input class=\"modern-field\"  type=\"text\" :placeholder=\"field.placeholder\" :class=\"data.error.isActive ? 'error': '' \" v-model=\"data.value\" :disabled=\"field.disabled\">\n            <span class=\"focus-input\"></span>\n        \n        </div>\n    "
};
var passwordInput = {
  props: {
    field: {
      required: true
    },
    data: {
      required: true
    }
  },
  template: "\n        <div >\n            <input class=\"modern-field\" type=\"password\" :placeholder=\"field.placeholder\" :class=\"data.error.isActive ? 'error': '' \" v-model=\"data.value\">\n            <span class=\"focus-input\"></span>\n      \n        </div>\n    "
};
var numberInput = {
  props: {
    field: {
      required: true
    },
    data: {
      required: true
    },
    maxValue: null
  },
  components: {
    'rounded-button': roundedButton
  },
  methods: {
    increment: function increment() {
      this.$emit('increment');
    },
    decrement: function decrement() {
      this.$emit('decrement');
    }
  },
  watch: {
    'data.value': function dataValue(newVal, oldVal) {
      if (newVal >= this.maxValue) {
        this.buttonIncrement.disabled = true;
        this.buttonIncrement.disabledClass = 'disabled';
      } else {
        this.buttonIncrement.disabled = false;
        this.buttonIncrement.disabledClass = '';
      }

      if (newVal - 1 < 1) {
        this.buttonDecrement.disabled = true;
        this.buttonDecrement.disabledClass = 'disabled';
      } else {
        this.buttonDecrement.disabled = false;
        this.buttonDecrement.disabledClass = '';
      }
    }
  },
  mounted: function mounted() {
    if (this.$props.data.value >= this.maxValue) {
      this.buttonIncrement.disabled = true;
      this.buttonIncrement.disabledClass = 'disabled';
    } else {
      this.buttonIncrement.disabled = false;
      this.buttonIncrement.disabledClass = '';
    }

    if (this.$props.data.value - 1 < 1) {
      this.buttonDecrement.disabled = true;
      this.buttonDecrement.disabledClass = 'disabled';
    } else {
      this.buttonDecrement.disabled = false;
      this.buttonDecrement.disabledClass = '';
    }
  },
  data: function data() {
    return {
      buttonIncrement: {
        type: 'roundend-button',
        content: '<img src="../images/plus.png">',
        typeButton: 'button',
        align: '',
        size: 'md',
        disabled: false,
        disabledClass: 'disabled'
      },
      buttonDecrement: {
        type: 'roundend-button',
        content: '<img src="../images/min.png">',
        typeButton: 'button',
        align: '',
        size: 'md',
        disabled: false,
        disabledClass: 'disabled'
      }
    };
  },
  template: "\n        <div class=\"modern-field\">\n            <rounded-button\n                :field=\"buttonDecrement\"\n                @clicked-rounded=\"decrement\"\n            ></rounded-button>\n            <input type=\"text\" :placeholder=\"field.placeholder\" v-model=\"data.value\" readonly>\n            <span class=\"focus-input\"></span>\n            <rounded-button\n                :field=\"buttonIncrement\"\n                @clicked-rounded = \"increment\"\n            ></rounded-button>\n        </div>\n    "
};
var selectOption = {
  props: {
    field: {
      required: true
    },
    data: {
      required: true
    }
  },
  template: "\n        <div class=\"modern-field\">\n            <select v-model=\"data.value\" :class=\"data.error.isActive ? 'error': '' \">\n                <option v-for=\"option in data.options\" :value=\"option.value\">{{option.text}}</option>\n            </select>\n            <div v-if=\"data.error != null\">\n                <label v-if=\"data.error.isActive\" class=\"error\">\n                    <i class=\"icon-x\"></i>\n                    {{data.error.message}}\n                </label>\n            </div>\n        </div>\n    "
};