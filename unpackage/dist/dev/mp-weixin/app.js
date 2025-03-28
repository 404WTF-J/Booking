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
}
const _sfc_main = {
  onLaunch: function() {
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
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
