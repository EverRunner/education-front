export default [
  {
    path: "/",
    name: "ORDER_INDEX",
    meta: {
      title: "支付订单",
      icon: "",
      isNav: true,
    },
    component: () => import("@/views/order/pay.vue"),
  },

  {
    path: "/pay/success",
    name: "ORDER_PAY_SUCCESS",
    meta: {
      title: "支付成功",
    },
    component: () => import("@/views/order/paySuccess.vue"),
  },

  {
    path: "/pay/cancel",
    name: "ORDER_PAY_CANCEL",
    meta: {
      title: "支付失败",
    },
    component: () => import("@/views/order/payCancel.vue"),
  },
];
