"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
const _sfc_main = {
  __name: "checkmore",
  setup(__props) {
    let cotch = common_vendor.reactive([]);
    const checkmorefn = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/moreJiaolian/moreJiaolian?option=${parmas}`
      });
    };
    const detailCoath = (item, index) => {
      console.log("教练详情" + JSON.stringify(item), index);
      const parmas = JSON.stringify(item);
      common_vendor.index.navigateTo({
        url: `/pages/coatchDetails/coatchDetails?option=${parmas}`
      });
    };
    function getjiaolian() {
      common_utils_utils.utils.request({
        url: "jiaolian",
        success: (res) => {
          Object.assign(cotch, res[0].data);
          console.log(cotch[0].name);
        }
      });
    }
    common_vendor.onMounted(() => {
      getjiaolian();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => checkmorefn(common_vendor.unref(cotch))),
        b: common_vendor.f(common_vendor.unref(cotch), (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => detailCoath(item, index), item.id)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/checkmore/checkmore.vue"]]);
wx.createComponent(Component);
