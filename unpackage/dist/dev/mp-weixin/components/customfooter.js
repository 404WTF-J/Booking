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
  props: {
    customtext: {
      type: String,
      default: "立即购买"
    },
    customhandleclick: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { customtext, customhandleclick } = common_vendor.toRefs(props);
    const handleclick = () => {
      customhandleclick.value();
    };
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
        e: common_vendor.t(common_vendor.unref(customtext)),
        f: common_vendor.o(handleclick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/customfooter.vue"]]);
wx.createComponent(Component);
