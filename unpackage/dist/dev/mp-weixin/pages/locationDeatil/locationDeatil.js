"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "locationDeatil",
  setup(__props) {
    require("../../libs/bmap-wx.js");
    const staLatitude = common_vendor.ref(34.22259);
    const staLongitude = common_vendor.ref(108.94878);
    const scaleMap = common_vendor.ref(15);
    const locationInfo = common_vendor.ref("西安一店 小寨 距你3公里 16分钟");
    common_vendor.onLoad(() => {
      const getScreenHeight = () => {
        if (typeof common_vendor.index !== "undefined" && common_vendor.index.getSystemInfoSync) {
          const systemInfo = common_vendor.index.getSystemInfoSync();
          return systemInfo.windowHeight;
        } else if (typeof window !== "undefined") {
          return window.innerHeight;
        } else {
          console.error("无法获取屏幕高度");
          return 0;
        }
      };
      const screenHeight = getScreenHeight();
      common_vendor.ref(screenHeight * 0.7);
      common_vendor.ref(screenHeight * 0.3);
      common_vendor.ref(0);
      common_vendor.ref(false);
    });
    const goback = () => {
      common_vendor.index.navigateBack({
        url: 1
      });
    };
    common_vendor.onMounted(() => {
      initmap();
      if (typeof window !== "undefined") {
        const height = window.innerHeight;
        console.log("视口高度:", height);
      } else {
        console.error("window 对象未定义");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: staLatitude.value,
        b: staLongitude.value,
        c: scaleMap.value,
        d: common_vendor.p({
          type: "back",
          size: "25",
          color: "black"
        }),
        e: common_vendor.o(goback),
        f: _ctx.mapHeight + "px",
        g: common_vendor.t(locationInfo.value),
        h: common_vendor.o((...args) => _ctx.startNavigation && _ctx.startNavigation(...args)),
        i: common_vendor.o((...args) => _ctx.addToFavorites && _ctx.addToFavorites(...args)),
        j: _ctx.infoHeight + "px",
        k: common_vendor.o((...args) => _ctx.handleTouchStart && _ctx.handleTouchStart(...args)),
        l: common_vendor.o((...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
        m: common_vendor.o((...args) => _ctx.handleTouchEnd && _ctx.handleTouchEnd(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c802115"], ["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/locationDeatil/locationDeatil.vue"]]);
wx.createPage(MiniProgramPage);
