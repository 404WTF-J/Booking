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
  __name: "customizenav",
  props: {
    myValue: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const back = () => {
      common_vendor.index.navigateBack({
        delta: 2
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "back",
          size: "25"
        }),
        b: common_vendor.o(back),
        c: common_vendor.t(__props.myValue)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/customizenav.vue"]]);
wx.createComponent(Component);
