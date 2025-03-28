"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (CustomNav + customfoot)();
}
const customfoot = () => "../../components/customfooter.js";
const CustomNav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "corsePackzhanshi",
  setup(__props) {
    const courseDeta_data = common_vendor.ref(null);
    const courseText = common_vendor.ref("课程详情");
    common_vendor.onLoad((options) => {
      courseDeta_data.value = JSON.parse(decodeURIComponent(options.option));
      console.log(courseDeta_data);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: courseDeta_data.value
      }, courseDeta_data.value ? {
        b: common_vendor.p({
          myValue: courseText.value
        }),
        c: courseDeta_data.value.img,
        d: common_vendor.t(courseDeta_data.value.price),
        e: common_vendor.t(courseDeta_data.value.project),
        f: common_vendor.t(courseDeta_data.value.diffculty)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/corsePackzhanshi/corsePackzhanshi.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
