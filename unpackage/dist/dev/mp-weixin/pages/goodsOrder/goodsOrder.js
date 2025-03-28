"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Customnav();
}
const Customnav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "goodsOrder",
  setup(__props) {
    const title = common_vendor.ref("商品下单");
    const addressinfo = common_vendor.reactive({
      diqu: "",
      daolu: "",
      info: ""
    });
    common_vendor.ref("");
    const show = common_vendor.ref(true);
    const goodDatas = common_vendor.ref({});
    const quantity = common_vendor.ref(1);
    const singleprice = common_vendor.ref(0);
    const paymentMethod = common_vendor.ref("wechat");
    const totalPrice = common_vendor.computed(() => {
      return (singleprice.value * quantity.value).toFixed(2);
    });
    const increaseQuantity = () => {
      quantity.value++;
    };
    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    const selectPayment = (method) => {
      paymentMethod.value = method;
    };
    const addAddressInfo = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          console.log(res);
          addressinfo.diqu = res.provinceName + "-" + res.cityName + "-" + res.countyName;
          addressinfo.daolu = res.detailInfo;
          addressinfo.info = res.userName + " " + res.telNumber;
          show.value = false;
          console.log(addressinfo);
        },
        fail: (err) => {
        }
      });
    };
    const handlePayment = () => {
      common_vendor.index.showModal({
        title: "确认支付",
        content: `确认支付 ¥${totalPrice.value} 购买商品吗？`,
        success: (res) => {
          if (res.confirm) {
            setTimeout(() => {
              common_vendor.index.showToast({
                title: "支付成功",
                icon: "success"
              });
            }, 2e3);
          } else {
            common_vendor.index.showToast({
              title: "取消支付",
              icon: "error"
            });
          }
        }
      });
    };
    common_vendor.onLoad((options) => {
      goodDatas.value = JSON.parse(options.option);
      singleprice.value = goodDatas.value.newprice;
      console.log(goodDatas.value.newprice);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: title.value
        }),
        b: show.value
      }, show.value ? {} : {}, {
        c: common_vendor.t(addressinfo.diqu),
        d: common_vendor.t(addressinfo.daolu),
        e: common_vendor.t(addressinfo.info),
        f: common_vendor.o(addAddressInfo),
        g: goodDatas.value.img,
        h: common_vendor.t(goodDatas.value.goodname),
        i: common_vendor.t(goodDatas.value.newprice),
        j: common_vendor.o(decreaseQuantity),
        k: common_vendor.t(quantity.value),
        l: common_vendor.o(increaseQuantity),
        m: common_vendor.t(common_vendor.unref(totalPrice)),
        n: paymentMethod.value === "balance" ? 1 : "",
        o: common_vendor.o(($event) => selectPayment("balance")),
        p: paymentMethod.value === "wechat" ? 1 : "",
        q: common_vendor.o(($event) => selectPayment("wechat")),
        r: common_vendor.t(common_vendor.unref(totalPrice)),
        s: common_vendor.o(handlePayment)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c83de28"], ["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/goodsOrder/goodsOrder.vue"]]);
wx.createPage(MiniProgramPage);
