"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const aboutData = common_vendor.ref("");
    function getlocation() {
      common_vendor.index.navigateTo({
        url: "/pages/map/map"
      });
    }
    const initaboutdata = () => {
      common_utils_utils.utils.request({
        url: "/about",
        success: (res) => {
          aboutData.value = res[0].data[0];
          console.log(res[0].data[0]);
        }
      });
    };
    const showActionSheet = (num) => {
      const phoneNumber = num;
      common_vendor.index.showActionSheet({
        title: phoneNumber,
        itemList: ["拨打"],
        // 弹出选项
        success: (res) => {
          if (res.tapIndex === 0) {
            makePhoneCall(phoneNumber);
          }
        },
        fail: (err) => {
          console.error("操作失败", err);
        }
      });
    };
    const makePhoneCall = (phoneNUm) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: phoneNUm,
        success: () => {
          console.log("拨打电话成功");
        },
        fail: (err) => {
          console.error("拨打电话失败", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      initaboutdata();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: aboutData.value
      }, aboutData.value ? {
        b: aboutData.value.storeimg,
        c: common_vendor.t(aboutData.value.storeName),
        d: common_vendor.t(aboutData.value.address),
        e: common_vendor.o(getlocation),
        f: common_vendor.p({
          type: "location",
          size: "30",
          color: "black"
        }),
        g: common_vendor.t(aboutData.value.telphone),
        h: common_vendor.o(($event) => showActionSheet(aboutData.value.telphone)),
        i: common_vendor.p({
          type: "phone-filled",
          size: "30"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);
