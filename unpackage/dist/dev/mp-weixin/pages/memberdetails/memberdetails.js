"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (CustomNav + _easycom_uni_icons)();
}
const CustomNav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "memberdetails",
  setup(__props) {
    const selectedIndex = common_vendor.ref(1);
    const memberData = common_vendor.ref(null);
    const changguiData = common_vendor.ref({});
    const memberText = common_vendor.ref("会员详情卡");
    const gohome = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    const gocourseDetails = (res) => {
      const params = JSON.stringify(res);
      console.log(params);
      common_vendor.index.navigateTo({
        // url:'/pages/courseDetails/courseDetails'
        url: `/pages/courseDetails/courseDetails?option=${params}`
      });
    };
    const Toshare = () => {
      common_vendor.index.showShareMenu({
        title: "baga",
        path: "/pages/member/member",
        success: (res) => {
          console.log(res);
        },
        fail: (res) => {
          console.log(res);
        }
      });
    };
    common_vendor.onLoad((options) => {
      memberData.value = JSON.parse(decodeURIComponent(options.option));
      changguiData.value = memberData.value.data;
    });
    const handclick = (index) => {
      selectedIndex.value = index;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: memberData.value
      }, memberData.value ? common_vendor.e({
        b: common_vendor.p({
          myValue: memberText.value
        }),
        c: memberData.value
      }, memberData.value ? {
        d: memberData.value.memberbackimg,
        e: common_vendor.t(memberData.value.othername),
        f: common_vendor.t(memberData.value.name),
        g: common_vendor.t(memberData.value.price)
      } : {}, {
        h: common_vendor.t(memberData.value.expriation),
        i: common_vendor.t(memberData.value.activeation),
        j: common_vendor.t(memberData.value.avliabletime),
        k: common_vendor.t(memberData.value.frequency),
        l: common_vendor.t(memberData.value.ablePlace),
        m: selectedIndex.value === 1
      }, selectedIndex.value === 1 ? {} : {}, {
        n: common_vendor.n({
          active: selectedIndex.value === 1
        }),
        o: common_vendor.o(($event) => handclick(1)),
        p: selectedIndex.value === 2
      }, selectedIndex.value === 2 ? {} : {}, {
        q: common_vendor.n({
          active: selectedIndex.value === 2
        }),
        r: common_vendor.o(($event) => handclick(2)),
        s: selectedIndex.value === 3
      }, selectedIndex.value === 3 ? {} : {}, {
        t: common_vendor.n({
          active: selectedIndex.value === 3
        }),
        v: common_vendor.o(($event) => handclick(3)),
        w: selectedIndex.value === 1
      }, selectedIndex.value === 1 ? common_vendor.e({
        x: memberData.value.index === 1
      }, memberData.value.index === 1 ? {
        y: memberData.value.memberimg,
        z: common_vendor.t(memberData.value.memberleixin),
        A: common_vendor.t(memberData.value.oldprice),
        B: common_vendor.t(memberData.value.cishu),
        C: common_vendor.o(($event) => gocourseDetails(memberData.value))
      } : {}, {
        D: memberData.value.index === 2
      }, memberData.value.index === 2 ? {
        E: common_vendor.f(changguiData.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.project),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.frequency),
            e: index,
            f: common_vendor.o(($event) => gocourseDetails(item), index)
          };
        })
      } : {}) : {}, {
        F: selectedIndex.value === 2
      }, selectedIndex.value === 2 ? {
        G: common_vendor.t(memberData.value.name)
      } : {}, {
        H: selectedIndex.value === 3
      }, selectedIndex.value === 3 ? {} : {}, {
        I: common_vendor.p({
          type: "home",
          size: "25"
        }),
        J: common_vendor.o(gohome),
        K: common_vendor.p({
          type: "redo",
          size: "25"
        }),
        L: common_vendor.o(Toshare),
        M: common_vendor.o((...args) => _ctx.order && _ctx.order(...args))
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/memberdetails/memberdetails.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
