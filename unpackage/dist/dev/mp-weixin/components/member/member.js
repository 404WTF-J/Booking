"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
const _sfc_main = {
  __name: "member",
  setup(__props) {
    const selectT = common_vendor.ref(1);
    const memberqixian = common_vendor.ref({});
    const membercishu = common_vendor.ref({});
    const publicData = common_vendor.ref({});
    common_vendor.ref(1);
    const initMemberData = () => {
      common_utils_utils.utils.request({
        url: "/member",
        success: (res) => {
          publicData.value = res[0].data[0].public[0];
          memberqixian.value = res[0].data[0].qixianka[0];
          console.log(memberqixian);
          membercishu.value = res[0].data[0].cika[0];
          console.log(membercishu);
        }
      });
    };
    const goMember_details = (res, res1, index) => {
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
    const checkmorefn = () => {
      common_vendor.index.switchTab({
        url: "/pages/member/member"
      });
    };
    common_vendor.onMounted(() => {
      initMemberData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(checkmorefn),
        b: selectT.value === 1
      }, selectT.value === 1 ? common_vendor.e({
        c: (memberqixian.value, publicData.value)
      }, (memberqixian.value, publicData.value) ? {
        d: publicData.value.memberbackimg,
        e: common_vendor.t(memberqixian.value.othername),
        f: common_vendor.t(memberqixian.value.expriation),
        g: common_vendor.t(memberqixian.value.name),
        h: common_vendor.t(memberqixian.value.price),
        i: common_vendor.o(($event) => goMember_details(memberqixian.value, publicData.value, 1))
      } : {}, {
        j: (membercishu.value, publicData.value)
      }, (membercishu.value, publicData.value) ? {
        k: publicData.value.memberbackimg,
        l: common_vendor.t(membercishu.value.othername),
        m: common_vendor.t(membercishu.value.expriation),
        n: common_vendor.t(membercishu.value.name),
        o: common_vendor.t(membercishu.value.price),
        p: common_vendor.o(($event) => goMember_details(membercishu.value, publicData.value, 2))
      } : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/components/member/member.vue"]]);
wx.createComponent(Component);
