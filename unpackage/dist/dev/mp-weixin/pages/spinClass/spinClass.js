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
  __name: "spinClass",
  setup(__props) {
    let dateList;
    const selectedIndex = common_vendor.ref(0);
    const contentData = common_vendor.ref(null);
    common_vendor.ref();
    const mockdatalist = common_vendor.reactive([]);
    const jiaolianData = common_vendor.ref(null);
    const back = () => {
      common_vendor.index.navigateBack({
        url: "/pages/Booking/Booking",
        delta: 1
      });
    };
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
    today.getFullYear();
    today.getMonth() + 1;
    today.getDate();
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
    const timeSlots = common_vendor.ref();
    const selectedTimeSlot = common_vendor.ref(null);
    const selectTimeSlot = (slot) => {
      selectedTimeSlot.value = selectedTimeSlot.value === slot ? null : slot;
    };
    const coachTable = [
      Array.from({
        length: 5
      }, () => "available"),
      Array.from({
        length: 5
      }, () => "available"),
      Array.from({
        length: 5
      }, () => "available"),
      Array.from({
        length: 5
      }, () => "available")
    ];
    const selectSeat = (rowIndex, seatIndex) => {
      const seat = coachTable[rowIndex][seatIndex];
      if (seat === "available") {
        coachTable[rowIndex][seatIndex] = "booked";
      } else if (seat === "booked") {
        coachTable[rowIndex][seatIndex] = "available";
      }
      console.log("选择的座位:", `${rowIndex + 1}-${seatIndex + 1}`);
    };
    common_vendor.onLoad((options) => {
      console.log(options.option);
      jiaolianData.value = JSON.parse(options.option);
      console.log(jiaolianData);
      timeSlots.value = jiaolianData.value;
      selectDate(0);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: jiaolianData.value
      }, jiaolianData.value ? {
        b: jiaolianData.value.img,
        c: common_vendor.p({
          type: "back",
          size: "25"
        }),
        d: common_vendor.o(back)
      } : {}, {
        e: jiaolianData.value
      }, jiaolianData.value ? common_vendor.e({
        f: common_vendor.t(jiaolianData.value.tech || jiaolianData.value.project),
        g: common_vendor.t(jiaolianData.value.available),
        h: jiaolianData.value.name
      }, jiaolianData.value.name ? {
        i: common_vendor.t(jiaolianData.value.name)
      } : {}, {
        j: common_vendor.t(jiaolianData.value.price)
      }) : {}, {
        k: common_vendor.f(common_vendor.unref(dateList), (date, index, i0) => {
          return {
            a: common_vendor.t(date.week),
            b: common_vendor.t(date.day),
            c: index,
            d: selectedIndex.value === index ? 1 : "",
            e: common_vendor.o(($event) => selectDate(index), index)
          };
        }),
        l: timeSlots.value
      }, timeSlots.value ? {
        m: common_vendor.t(timeSlots.value.time),
        n: common_vendor.t(timeSlots.value.available),
        o: common_vendor.t(timeSlots.value.capacity),
        p: selectedTimeSlot.value === timeSlots.value ? 1 : "",
        q: common_vendor.o(($event) => selectTimeSlot(timeSlots.value))
      } : {}, {
        r: selectedTimeSlot.value
      }, selectedTimeSlot.value ? {
        s: common_vendor.f(coachTable, (row, rowIndex, i0) => {
          return {
            a: common_vendor.f(row, (seat, seatIndex, i1) => {
              return {
                a: common_vendor.t(seatIndex + 1),
                b: seatIndex,
                c: seat === "booked" ? 1 : "",
                d: seat === "available" ? 1 : "",
                e: seat === "unavailable" ? 1 : "",
                f: common_vendor.o(($event) => selectSeat(rowIndex, seatIndex), seatIndex)
              };
            }),
            b: common_vendor.t(rowIndex + 1),
            c: rowIndex
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/spinClass/spinClass.vue"]]);
wx.createPage(MiniProgramPage);
