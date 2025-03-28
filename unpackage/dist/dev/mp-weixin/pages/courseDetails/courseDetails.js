"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (CustomNav + _easycom_uni_icons)();
}
const CustomNav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "courseDetails",
  setup(__props) {
    const courseDeta_data = common_vendor.ref(null);
    const courseText = common_vendor.ref("课程详情");
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
    const gospin = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/spinClass/spinClass?option=${parmas}`
      });
    };
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
        c: courseDeta_data.value.img || courseDeta_data.value.memberimg,
        d: common_vendor.t(courseDeta_data.value.price),
        e: common_vendor.t(courseDeta_data.value.project),
        f: common_vendor.t(courseDeta_data.value.frequency)
      } : {}, {
        g: common_vendor.p({
          type: "home",
          size: "25"
        }),
        h: common_vendor.o((...args) => _ctx.gohome && _ctx.gohome(...args)),
        i: common_vendor.p({
          type: "redo",
          size: "25"
        }),
        j: common_vendor.o(Toshare),
        k: common_vendor.o(($event) => gospin(courseDeta_data.value))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/courseDetails/courseDetails.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
