"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "customfooter",
  setup(__props) {
    const gohome = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    const Toshare = () => {
      common_vendor.index.showShareMenu({
        title: "baga",
        path: "/pages/member/member",
        success: (res) => {
          console.log(res);
        },
        fail: (res) => {
          console.log(res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "home",
          size: "25"
        }),
        b: common_vendor.o(gohome),
        c: common_vendor.p({
          type: "redo",
          size: "25"
        }),
        d: common_vendor.o(Toshare),
        e: common_vendor.o((...args) => _ctx.order && _ctx.order(...args))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/customfooter.vue"]]);
wx.createComponent(Component);
