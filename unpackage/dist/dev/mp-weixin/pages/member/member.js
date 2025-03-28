"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
const _sfc_main = {
  __name: "member",
  setup(__props) {
    const selectT = common_vendor.ref(1);
    const memberqixian = common_vendor.ref({});
    const membercishu = common_vendor.ref({});
    const coursepackData = common_vendor.ref({});
    const publicData = common_vendor.ref({});
    common_vendor.ref(1);
    const selectTab = (opt) => {
      selectT.value = opt;
      console.log(opt);
    };
    const initMemberData = () => {
      common_utils_utils.utils.request({
        url: "/member",
        success: (res) => {
          console.log(res[0]);
          publicData.value = res[0].data[0].public[0];
          console.log(publicData);
          memberqixian.value = res[0].data[0].qixianka[0];
          console.log(memberqixian);
          membercishu.value = res[0].data[0].cika[0];
          console.log(membercishu);
          coursepackData.value = res[0].data[0].corusepacke[0];
          console.log(coursepackData);
        }
      });
    };
    const gomemberDetails = (res, res1, index) => {
      let params;
      if (index === 1) {
        params = Object.assign({}, res, res1);
        console.log(params);
      } else {
        params = Object.assign({}, res, res1);
        console.log(params);
      }
      const queryParams = JSON.stringify(params);
      console.log(queryParams);
      common_vendor.index.navigateTo({
        // 但 params 是一个对象，直接将对象放入 URL 中会导致它被转换为字符串 [object Object]
        url: `/pages/memberdetails/memberdetails?option=${queryParams}`
      });
    };
    const gocoursepackDetails = (res) => {
      const courseParams = JSON.stringify(res);
      console.log(courseParams);
      common_vendor.index.navigateTo({
        url: `/pages/coursePackDeatails/coursePackDeatails?option=${courseParams}`
      });
    };
    common_vendor.onMounted(() => {
      initMemberData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: selectT.value === 1 ? 1 : "",
        b: common_vendor.o(($event) => selectTab(1)),
        c: selectT.value === 2 ? 1 : "",
        d: common_vendor.o(($event) => selectTab(2)),
        e: selectT.value === 1
      }, selectT.value === 1 ? common_vendor.e({
        f: (memberqixian.value, publicData.value)
      }, (memberqixian.value, publicData.value) ? {
        g: publicData.value.memberbackimg,
        h: common_vendor.t(memberqixian.value.othername),
        i: common_vendor.t(memberqixian.value.expriation),
        j: common_vendor.t(memberqixian.value.name),
        k: common_vendor.t(memberqixian.value.price),
        l: common_vendor.o(($event) => gomemberDetails(memberqixian.value, publicData.value, 1))
      } : {}, {
        m: (membercishu.value, publicData.value)
      }, (membercishu.value, publicData.value) ? {
        n: publicData.value.memberbackimg,
        o: common_vendor.t(membercishu.value.othername),
        p: common_vendor.t(membercishu.value.expriation),
        q: common_vendor.t(membercishu.value.name),
        r: common_vendor.t(membercishu.value.price),
        s: common_vendor.o(($event) => gomemberDetails(membercishu.value, publicData.value, 2))
      } : {}) : {}, {
        t: selectT.value === 2
      }, selectT.value === 2 ? common_vendor.e({
        v: coursepackData.value
      }, coursepackData.value ? {
        w: coursepackData.value.corusepackebanner,
        x: common_vendor.t(coursepackData.value.corusepackedesc),
        y: common_vendor.t(coursepackData.value.corusepackesxpriation),
        z: common_vendor.t(coursepackData.value.corusepackeprice),
        A: common_vendor.o(($event) => gocoursepackDetails(coursepackData.value))
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/member/member.vue"]]);
wx.createPage(MiniProgramPage);
