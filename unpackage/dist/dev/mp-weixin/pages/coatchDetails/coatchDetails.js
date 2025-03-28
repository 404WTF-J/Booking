"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  CustomNav();
}
const CustomNav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "coatchDetails",
  setup(__props) {
    const coacth = common_vendor.ref("教练详情");
    const coathData = common_vendor.ref(null);
    const bookCourse = (res, name) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/spinClass/spinClass?option=${parmas}`
      });
    };
    common_vendor.onLoad((options) => {
      coathData.value = JSON.parse(options.option);
      console.log(coathData.value.allproject);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: coacth.value
        }),
        b: coathData.value
      }, coathData.value ? {
        c: coathData.value.img,
        d: common_vendor.t(coathData.value.name),
        e: common_vendor.t(coathData.value.experience),
        f: common_vendor.t(coathData.value.description),
        g: common_vendor.f(coathData.value.allproject, (course, index, i0) => {
          return {
            a: course.img,
            b: common_vendor.t(course.project),
            c: common_vendor.f(course.difficulty, (star, k1, i1) => {
              return {
                a: star
              };
            }),
            d: common_vendor.t(course.price),
            e: common_vendor.o(($event) => bookCourse(course, coathData.value.name), index),
            f: index
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/coatchDetails/coatchDetails.vue"]]);
wx.createPage(MiniProgramPage);
