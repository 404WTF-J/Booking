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
  __name: "pupopadd",
  setup(__props) {
    function TostoreList() {
      common_vendor.index.navigateTo({
        url: "/pages/map/map"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "location",
          size: "27",
          color: "white"
        }),
        b: common_vendor.o(TostoreList)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/pupopadd/pupopadd.vue"]]);
wx.createComponent(Component);
