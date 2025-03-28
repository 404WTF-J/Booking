"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (popupTanke + _easycom_uni_popup)();
}
const popupTanke = () => "../../components/popupTuanke/popupTuanke.js";
const _sfc_main = {
  __name: "Booking",
  setup(__props) {
    let dateList;
    const selectedIndex = common_vendor.ref(0);
    const contentData = common_vendor.ref(null);
    const contentImg = common_vendor.ref();
    const mockdatalist = common_vendor.reactive([]);
    const getDatelist = () => {
      const today2 = /* @__PURE__ */ new Date();
      const dateList2 = [];
      dateList2.push({
        day: "今",
        week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][today2.getDay()],
        weekNumber: today2.getDay()
        // 添加星期几的数字标识，从 0 开始
      });
      const tomorrow = new Date(today2);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateList2.push({
        day: "明",
        week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][tomorrow.getDay()],
        weekNumber: tomorrow.getDay()
        // 添加星期几的数字标识，从 0 开始
      });
      for (let i = 2; i < 32; i++) {
        const nextDay = new Date(tomorrow);
        nextDay.setDate(nextDay.getDate() + i - 1);
        dateList2.push({
          day: String(nextDay.getDate()),
          week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][nextDay.getDay()],
          weekNumber: nextDay.getDay()
          // 添加星期几的数字标识，从 0 开始
        });
      }
      return dateList2;
    };
    const weekNumberFromOne = (weekNumber) => {
      return weekNumber === 0 ? 7 : weekNumber;
    };
    const today = /* @__PURE__ */ new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const findTodayIndex = (dateList2) => {
      for (let i = 0; i < dateList2.length; i++) {
        const dateObj = new Date(dateList2[i].year, dateList2[i].month - 1, dateList2[i].day);
        if (dateObj.getFullYear() === year && dateObj.getMonth() + 1 === month && dateObj.getDate() === day) {
          return i;
        }
      }
      return 0;
    };
    const selectDate = (index) => {
      selectedIndex.value = index;
      const dateList2 = getDatelist();
      const selectedDate = dateList2[index];
      const weekNumber = weekNumberFromOne(selectedDate.weekNumber);
      const hasClassCoaches = mockdatalist.filter((coach) => {
        return coach.has.includes(weekNumber);
      });
      contentData.value = hasClassCoaches;
    };
    dateList = getDatelist();
    console.log(dateList);
    const initmockdata = () => {
      common_utils_utils.utils.request({
        url: "/jiaolian",
        success: (res) => {
          contentImg.value = res[0].bgimg;
          const data = res[0].data.map((item) => {
            return item;
          });
          Object.assign(mockdatalist, data);
          console.log(mockdatalist);
          const todayIndex = findTodayIndex(getDatelist());
          selectDate(todayIndex);
        }
      });
    };
    const show = common_vendor.ref(false);
    const change = (e) => {
      show.value = e.show;
    };
    const open = common_vendor.ref(false);
    const popup = common_vendor.ref(null);
    const popupData = common_vendor.ref(null);
    const popupPage = (res) => {
      console.log(res);
      open.value = true;
      popupData.value = res;
      popup.value.open("bottom");
    };
    const gospin = (res) => {
      const parmas = JSON.stringify(res);
      common_vendor.index.navigateTo({
        url: `/pages/spinClass/spinClass?option=${parmas}`
      });
    };
    common_vendor.onLoad(() => {
      initmockdata();
      selectDate(0);
    });
    common_vendor.onMounted(() => {
      initmockdata();
      dateList = getDatelist();
    });
    return (_ctx, _cache) => {
      return {
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.f(common_vendor.unref(dateList), (date, index, i0) => {
          return {
            a: common_vendor.t(date.day),
            b: common_vendor.t(date.week),
            c: index,
            d: selectedIndex.value === index ? 1 : "",
            e: common_vendor.o(($event) => selectDate(index), index)
          };
        }),
        c: common_vendor.f(contentData.value, (contentData2, index, i0) => {
          return common_vendor.e({
            a: contentData2
          }, contentData2 ? {
            b: common_vendor.t(contentData2.tech),
            c: common_vendor.t(contentData2.time),
            d: common_vendor.t(contentData2.name),
            e: common_vendor.t(contentData2.capacity),
            f: common_vendor.f(contentData2.difficulty, (contentData3, index2, i1) => {
              return {
                a: index2,
                b: index2 < contentData3.difficulty ? 1 : ""
              };
            }),
            g: common_vendor.o(($event) => popupPage(contentData2), index)
          } : {}, {
            h: common_vendor.o(($event) => gospin(contentData2), index),
            i: index
          });
        }),
        d: "url(" + contentImg.value + ")",
        e: common_vendor.p({
          data: popupData.value
        }),
        f: common_vendor.sr(popup, "347f28c9-0", {
          "k": "popup"
        }),
        g: common_vendor.o(change),
        h: common_vendor.p({
          type: "bottom",
          animation: true,
          ["safe-area"]: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-347f28c9"], ["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/Booking/Booking.vue"]]);
wx.createPage(MiniProgramPage);
