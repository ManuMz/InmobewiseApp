"use strict";

var payment = {
  props: {
    paymentDetail: null
  },
  components: {
    'rounded-button': roundedButton
  },
  data: function data() {
    return {
      buttonHeaderInfoPedido: {
        type: 'roundend-button',
        content: "<i class='icon-Informacion-general'></i>",
        typeButton: 'button',
        align: '',
        size: 'lg'
      },
      buttonSuccess: {
        type: 'roundend-button',
        content: "<i class='icon-Correcto'></i>",
        typeButton: 'button',
        align: 'center',
        size: ''
      }
    };
  },
  filters: {
    status: function status(value) {
      if (value == "completed") {
        return "¡Pedido exitoso!";
      } else {
        return "¡Error al hacer el pedido!";
      }
    },
    toCurrency: function toCurrency(val) {
      return '$' + val.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
  },
  methods: {
    accept: function accept() {
      comunicateWebView("close", "");
    }
  },
  template: "\n        <div class=\"payment-container\" v-if=\"paymentDetail != null\">\n            <div class=\"header\">\n                <div class=\"header-container\">\n                    <div class=\"content\" >\n                        <label>\n                            <b>{{paymentDetail.status | status}}</b>\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card firs-card\">\n                <div class=\"card-header\">\n                    <rounded-button\n                        :field=\"buttonHeaderInfoPedido\"\n                    ></rounded-button>\n                    <b>Detalle del pedido</b>\n                </div>\n                <div class=\"card-body\" v-if=\"paymentDetail!=null\">\n                    <p><b>Monto:</b> {{paymentDetail.ammount | toCurrency}}</p>\n                    <p><b>Fecha de creaci\xF3n:</b> {{paymentDetail.creation_date}}</p>\n                    <p><b>Fecha de cobro:</b> {{paymentDetail.operation_date}}</p>\n                    <p><b>Descripci\xF3n:</b> {{paymentDetail.description}}</p>\n                </div>\n            </div>\n            <rounded-button\n                @clicked-rounded=\"accept\"\n                :field=\"buttonSuccess\"\n            ></rounded-button>\n        </div>\n    "
};