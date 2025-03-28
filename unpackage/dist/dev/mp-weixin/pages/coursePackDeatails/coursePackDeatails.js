"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (CustomNav + Custonfooter)();
}
const CustomNav = () => "../../components/customizenav.js";
const Custonfooter = () => "../../components/customfooter.js";
const _sfc_main = {
  __name: "coursePackDeatails",
  setup(__props) {
    const coursepackData = common_vendor.ref({});
    const courseDeatalisData = common_vendor.ref({});
    const propsValue = common_vendor.ref("课程包详情");
    const selectedIndex = common_vendor.ref(1);
    const handclick = (index) => {
      selectedIndex.value = index;
    };
    const gocoursepackzhanshi = (res) => {
      const params = JSON.stringify(res);
      console.log(params);
      common_vendor.index.navigateTo({
        url: `/pages/corsePackzhanshi/corsePackzhanshi?option=${params}`
      });
    };
    common_vendor.onLoad((option) => {
      coursepackData.value = JSON.parse(decodeURIComponent(option.option));
      courseDeatalisData.value = coursepackData.value.data;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: propsValue.value
        }),
        b: coursepackData.value
      }, coursepackData.value ? common_vendor.e({
        c: coursepackData.value.corusepackebanner,
        d: common_vendor.t(coursepackData.value.corusepackedesc),
        e: common_vendor.t(coursepackData.value.corusepackeprice),
        f: common_vendor.t(coursepackData.value.corusepackesxpriation),
        g: selectedIndex.value === 1
      }, selectedIndex.value === 1 ? {} : {}, {
        h: common_vendor.n({
          active: selectedIndex.value === 1
        }),
        i: common_vendor.o(($event) => handclick(1)),
        j: selectedIndex.value === 2
      }, selectedIndex.value === 2 ? {} : {}, {
        k: common_vendor.n({
          active: selectedIndex.value === 2
        }),
        l: common_vendor.o(($event) => handclick(2)),
        m: selectedIndex.value === 1
      }, selectedIndex.value === 1 ? common_vendor.e({
        n: courseDeatalisData.value
      }, courseDeatalisData.value ? {
        o: common_vendor.f(courseDeatalisData.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.project),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.frequency),
            e: index,
            f: common_vendor.o(($event) => gocoursepackzhanshi(item), index)
          };
        })
      } : {}) : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/coursePackDeatails/coursePackDeatails.vue"]]);
wx.createPage(MiniProgramPage);
