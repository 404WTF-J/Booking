"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "moreJiaolian",
  setup(__props) {
    const data = common_vendor.ref();
    const goyuyue = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/spinClass/spinClass?option=${parmas}`
      });
    };
    common_vendor.onLoad((options) => {
      data.value = JSON.parse(options.option);
      console.log(data);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.description),
            d: index,
            e: common_vendor.o(($event) => goyuyue(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/moreJiaolian/moreJiaolian.vue"]]);
wx.createPage(MiniProgramPage);
