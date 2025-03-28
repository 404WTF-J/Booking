"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "popupTuanke",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    console.log(props);
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.data
      }, __props.data ? common_vendor.e({
        b: __props.data.img || _ctx.courseDeta_data.memberimg,
        c: __props.data
      }, __props.data ? {
        d: common_vendor.t(__props.data.price),
        e: common_vendor.t(__props.data.tech),
        f: common_vendor.f(__props.data.difficulty, (item, index, i0) => {
          return {
            a: index
          };
        })
      } : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/popupTuanke/popupTuanke.vue"]]);
wx.createComponent(Component);
