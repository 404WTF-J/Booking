"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const title = common_vendor.ref("我的");
    const back = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    common_vendor.ref({
      phone: "155****9263",
      memberType: "普通会员"
    });
    common_vendor.ref([
      { label: "余额", value: "0" },
      { label: "积分", value: "0" },
      { label: "优惠券", value: "0" },
      { label: "会员码", value: "" },
      { label: "会员卡", value: "0" },
      { label: "课程包", value: "0" }
    ]);
    common_vendor.ref([
      "我的预约",
      "我的订单",
      "我的合同",
      "divider",
      "我的订场",
      "我的拼团",
      "divider",
      "入场照片",
      "我的回货",
      "divider",
      "关于我们"
    ]);
    common_vendor.onLoad(() => {
    });
    const gocart = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shoppingCart/shoppingCart"
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.reLaunch({
              url: "/pages/login/index"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "back",
          size: "25"
        }),
        b: common_vendor.o(back),
        c: common_vendor.t(title.value),
        d: common_vendor.o(gocart),
        e: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
