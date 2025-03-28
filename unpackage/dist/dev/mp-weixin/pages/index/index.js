"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (popupadd + _easycom_uni_icons + checkmore + commondCard + courseRem + StoreRem)();
}
const checkmore = () => "../../components/checkmore/checkmore.js";
const popupadd = () => "../../components/pupopadd/pupopadd.js";
const commondCard = () => "../../components/member/member.js";
const courseRem = () => "../../components/courseRem/courseRem.js";
const StoreRem = () => "../../components/StoreRem/StoreRem.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    "../../libs/bmap-wx.js";
    const scrollTop = common_vendor.ref(0);
    const isBannerHidden = common_vendor.ref(false);
    const bannerHideThreshold = 200;
    common_vendor.ref(null);
    const onScroll = (event) => {
      const scrollTopValue = event.detail.scrollTop;
      isBannerHidden.value = scrollTopValue > bannerHideThreshold;
    };
    const items = common_vendor.ref([]);
    let coursedata = common_vendor.reactive([]);
    function getBanner() {
      common_utils_utils.utils.request({
        url: "banner",
        success: (res) => {
          items.value = res[0].data;
          console.log(items.value);
        }
      });
    }
    function getcourse() {
      common_utils_utils.utils.request({
        url: "course",
        success: (res) => {
          Object.assign(coursedata, res[0].data);
          console.log(coursedata);
        }
      });
    }
    const handclick = (index) => {
      if (index < 2) {
        yuyue();
      } else if (index === 2) {
        gomember();
      } else {
        about();
      }
    };
    function yuyue() {
      common_vendor.index.switchTab({
        url: "/pages/Booking/Booking"
      });
    }
    function gomember() {
      common_vendor.index.switchTab({
        url: "/pages/member/member"
      });
    }
    function about() {
      common_vendor.index.navigateTo({
        url: "/pages/about/about"
      });
    }
    function getLocation() {
      common_vendor.index.navigateTo({
        url: "/pages/locationDeatil/locationDeatil"
      });
    }
    function TostoreList() {
      common_vendor.index.navigateTo({
        url: "/pages/map/map"
      });
    }
    common_vendor.onMounted(() => {
      getBanner();
      getcourse();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(items.value, (url, index, i0) => {
          return {
            a: url.img,
            b: url.name,
            c: index
          };
        }),
        b: !isBannerHidden.value,
        c: isBannerHidden.value ? 1 : "",
        d: common_vendor.p({
          type: "location",
          size: "20",
          color: "black"
        }),
        e: common_vendor.o(TostoreList),
        f: common_vendor.p({
          type: "location",
          size: "22",
          color: "black"
        }),
        g: common_vendor.o(getLocation),
        h: common_vendor.f(common_vendor.unref(coursedata), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "50d2e5dc-3-" + i0,
            c: common_vendor.t(item.description),
            d: item.id,
            e: common_vendor.o(($event) => handclick(index), item.id)
          };
        }),
        i: common_vendor.p({
          type: "right",
          size: "23",
          color: "black"
        }),
        j: scrollTop.value,
        k: common_vendor.o(onScroll)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
