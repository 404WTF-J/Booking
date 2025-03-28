"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (CustomNav + CustomFooter)();
}
const CustomNav = () => "../../components/customizenav.js";
const CustomFooter = () => "../../components/customfooter.js";
const _sfc_main = {
  __name: "goodDetails",
  setup(__props) {
    const myValue = common_vendor.ref("商品详情");
    const goodData = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      goodData.value = JSON.parse(options.option);
      console.log(goodData);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: myValue.value
        }),
        b: goodData.value.img,
        c: goodData.value
      }, goodData.value ? {
        d: common_vendor.t(goodData.value.newprice),
        e: common_vendor.t(goodData.value.oldprice),
        f: common_vendor.t(goodData.value.kucun),
        g: common_vendor.t(goodData.value.yishou),
        h: common_vendor.t(goodData.value.goodname)
      } : {}, {
        i: common_vendor.t(goodData.value.gooddescrtion),
        j: common_vendor.t(goodData.value.goodxuzhi)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/goodDetails/goodDetails.vue"]]);
wx.createPage(MiniProgramPage);
