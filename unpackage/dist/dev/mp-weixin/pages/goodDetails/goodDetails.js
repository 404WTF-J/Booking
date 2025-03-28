"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (CustomNav + _easycom_uni_icons + CustomFooter)();
}
const CustomNav = () => "../../components/customizenav.js";
const CustomFooter = () => "../../components/customfooter.js";
const _sfc_main = {
  __name: "goodDetails",
  setup(__props) {
    const myValue = common_vendor.ref("商品详情");
    const goodData = common_vendor.ref({});
    const show = common_vendor.ref(false);
    const orderpage = (res) => {
      show.value = true;
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/goodsOrder/goodsOrder?option=${parmas}`
      });
    };
    const shopentrance = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/shoppingCart/shoppingCart?option=${parmas}`
      });
    };
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
        j: common_vendor.t(goodData.value.goodxuzhi),
        k: show.value
      }, show.value ? {
        l: common_vendor.p({
          type: "cart-filled",
          size: "50"
        }),
        m: common_vendor.o(($event) => shopentrance(goodData.value))
      } : {}, {
        n: common_vendor.p({
          customhandleclick: () => orderpage(goodData.value)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/goodDetails/goodDetails.vue"]]);
wx.createPage(MiniProgramPage);
