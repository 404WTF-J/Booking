"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
const _sfc_main = {
  __name: "StoreRem",
  setup(__props) {
    const goodDatas = common_vendor.ref({});
    const initData = () => {
      common_utils_utils.utils.request({
        url: "/good",
        success: (res) => {
          goodDatas.value = res[0].data;
          console.log(goodDatas);
        }
      });
    };
    const goodDetails = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/goodDetails/goodDetails?option=${parmas}`
      });
    };
    common_vendor.onLoad(() => {
      initData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.checkmorefn && _ctx.checkmorefn(...args)),
        b: common_vendor.f(goodDatas.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.goodname),
            c: common_vendor.t(item.peoplenum),
            d: common_vendor.t(item.oldprice),
            e: common_vendor.t(item.newprice),
            f: common_vendor.o(($event) => goodDetails(item), index),
            g: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/StoreRem/StoreRem.vue"]]);
wx.createComponent(Component);
