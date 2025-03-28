"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const bmap = require("../../libs/bmap-wx.js");
    let wxMarkerData = [];
    let showLocation = false;
    const markers = common_vendor.ref([]);
    const latitude = common_vendor.ref("");
    const longitude = common_vendor.ref("");
    common_vendor.ref({});
    const userLatitude = common_vendor.ref("");
    const userLongitude = common_vendor.ref("");
    const rgcData = common_vendor.ref({});
    const sugData = common_vendor.ref();
    const bindKeyInput = (e) => {
      const BMap2 = new bmap.BMapWX({
        ak: "CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y"
      });
      const fail = (data) => {
      };
      const success = (data) => {
        console.log(data);
        let sugDataStr = "";
        for (let i = 0; i < data.result.length; i++) {
          sugDataStr += data.result[i].name + "\n";
        }
        sugData.value = sugDataStr;
      };
      sugData.value = null;
      BMap2.suggestion({
        query: e.target.value,
        // 获取输入框的值
        region: "西安",
        city_limit: true,
        fail,
        success
      });
    };
    const makertap = (e) => {
      console.log(e);
      const id = e.markerId;
      showSearchInfo(wxMarkerData, id);
      changeMarkerColor(wxMarkerData, id);
    };
    const changeMarkerColor = (data, i) => {
      const updatedMarkers = data.map((marker, index) => {
        if (index === i) {
          marker.iconPath = "../../img/marker_yellow.png";
        } else {
          marker.iconPath = "../../img/marker_red.png";
        }
        return marker;
      });
      markers.value = updatedMarkers;
    };
    const BMap = new bmap.BMapWX({
      ak: "CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y"
    });
    const initMap = () => {
      const fail = (data) => {
        console.log(data);
      };
      const success = (data) => {
        wxMarkerData = data.wxMarkerData.map((marker) => {
          marker.width = marker.widht || 30, marker.height = marker.height || 30;
          return marker;
        });
        markers.value = wxMarkerData;
        latitude.value = wxMarkerData[0].latitude;
        longitude.value = wxMarkerData[0].longitude;
        console.log(latitude.value, longitude.value);
      };
      BMap.search({
        query: "健身",
        fail,
        success,
        iconPath: "../../img/marker_red.png",
        iconTapPath: "../../img/marker_red.png"
      });
    };
    const showSearchInfo = (data, i) => {
      rgcData.value = {
        address: "地址：" + data[i].address + "\n",
        desc: "描述：" + data[i].desc + "\n",
        business: "商圈：" + data[i].business
      };
    };
    const onMapTap = (e) => {
      const {
        latitude: clickedLat,
        longitude: clickedLng
      } = e.detail;
      latitude.value = clickedLat;
      longitude.value = clickedLng;
      const BMap2 = new bmap.BMapWX({
        ak: "CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y"
      });
      const fail = (data) => {
        console.log(data);
      };
      const success = (data) => {
        rgcData.value = {
          address: data.originalData.result.formatted_address_poi,
          desc: data.originalData.result.formatted_address,
          business: data.originalData.result.business
        };
      };
      const locationString = `${clickedLat},${clickedLng}`;
      BMap2.regeocoding({
        location: locationString,
        //传递字符串格式经纬度
        fail,
        success
      });
    };
    const goToUserLocation = () => {
      console.log(userLatitude.value, userLongitude.value);
      if (userLatitude.value && userLongitude.value) {
        longitude.value = userLongitude.value;
        latitude.value = userLatitude.value;
        markers.value = [{
          id: 0,
          latitude: userLatitude.value,
          longitude: userLongitude.value,
          iconPath: "../../img/marker_red.png",
          width: 30,
          height: 30,
          anchor: { x: 0.5, y: 0.5 }
          // 点击中心点对齐
        }];
      } else {
        common_vendor.index.showToast({
          title: "未获取到位置，请稍后重试",
          icon: "none"
        });
      }
    };
    common_vendor.onLoad(() => {
      common_vendor.index.getLocation({
        type: "gcj02",
        success: (res) => {
          console.log(res);
          userLatitude.value = res.latitude;
          userLongitude.value = res.longitude;
          console.log(userLatitude.value, userLongitude.value);
          latitude.value = res.latitude;
          longitude.value = res.longitude;
          showLocation = true;
        },
        fail: (err) => {
          common_vendor.index.showToast({ title: "获取位置失败", icon: "none" });
        }
      });
    });
    common_vendor.onMounted(() => {
      initMap();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(bindKeyInput),
        b: sugData.value
      }, sugData.value ? {
        c: common_vendor.t(sugData.value)
      } : {}, {
        d: longitude.value,
        e: latitude.value,
        f: common_vendor.unref(showLocation),
        g: markers.value,
        h: common_vendor.o(makertap),
        i: common_vendor.o(onMapTap),
        j: common_vendor.o(goToUserLocation),
        k: rgcData.value
      }, rgcData.value ? {
        l: common_vendor.t(rgcData.value.address),
        m: common_vendor.t(rgcData.value.desc),
        n: common_vendor.t(rgcData.value.business)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/map/map.vue"]]);
wx.createPage(MiniProgramPage);
