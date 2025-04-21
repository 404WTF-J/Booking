"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/Booking/Booking.js";
  "./pages/member/member.js";
  "./pages/my/my.js";
  "./pages/map/map.js";
  "./pages/StoreLIst/StoreLIst.js";
  "./pages/locationDeatil/locationDeatil.js";
  "./pages/about/about.js";
  "./pages/memberdetails/memberdetails.js";
  "./pages/courseDetails/courseDetails.js";
  "./pages/coursePackDeatails/coursePackDeatails.js";
  "./pages/corsePackzhanshi/corsePackzhanshi.js";
  "./pages/coatchDetails/coatchDetails.js";
  "./pages/spinClass/spinClass.js";
  "./pages/moreJiaolian/moreJiaolian.js";
  "./pages/goodDetails/goodDetails.js";
  "./pages/goodsOrder/goodsOrder.js";
  "./pages/shoppingCart/shoppingCart.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.request({
      url: "http://192.168.31.73:3000/cart/items",
      success: () => console.log("基础连接正常"),
      fail: () => console.log("基础连接失败")
    });
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
