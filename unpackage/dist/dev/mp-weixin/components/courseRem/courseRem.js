"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
const _sfc_main = {
  __name: "courseRem",
  setup(__props) {
    const data = common_vendor.ref({});
    const gocourseDeatail = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/courseDetails/courseDetails?option=${parmas}`
      });
    };
    const checkmorefn = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/courseDetails/courseDetails?option=${parmas}`
      });
    };
    const initDatas = () => {
      common_utils_utils.utils.request({
        url: "/member",
        success: (res) => {
          data.value = res[0].data[0].qixianka[0];
          console.log(data, "data");
        },
        faill: (err) => {
          console.log(err);
        }
      });
    };
    common_vendor.onLoad(() => {
      initDatas();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => checkmorefn(data.value)),
        b: data.value
      }, data.value ? {
        c: data.value.img,
        d: common_vendor.t(data.value.memberleixin),
        e: common_vendor.t(data.value.newprice),
        f: common_vendor.o(($event) => gocourseDeatail(data.value))
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/courseRem/courseRem.vue"]]);
wx.createComponent(Component);
