export default [
  {
    path: "/",
    name: "PASS_INDEX",
    meta: {
      title: "考过生服务",
      icon: "",
      isNav: true,
    },
    redirect: "/pass/apply",
  },

  {
    path: "apply",
    name: "PASS_APPLY",
    meta: {
      title: "申请执照",
    },
    component: () => import("@/views/pass/apply.vue"),
  },

  {
    path: "applyForm",
    name: "PASS_APPLY_FORM",
    meta: {
      title: "申请执照表单",
    },
    component: () => import("@/views/pass/applyForm.vue"),
  },

  {
    path: "applyLicenseResult",
    name: "PASS_APPLY_LICENSE_RESULT",
    meta: {
      title: "申请执照详情",
    },
    component: () => import("@/views/pass/licenseResult.vue"),
  },

  {
    path: "licenseUpdata",
    name: "PASS_LICENSE_UPDATA",
    meta: {
      title: "更新执照",
    },
    component: () => import("@/views/pass/licenseUpdata.vue"),
  },
];
