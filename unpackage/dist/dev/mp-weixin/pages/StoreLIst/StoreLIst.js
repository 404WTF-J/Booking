"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "StoreLIst",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.bindKeyInput && _ctx.bindKeyInput(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/StoreLIst/StoreLIst.vue"]]);
wx.createPage(MiniProgramPage);
