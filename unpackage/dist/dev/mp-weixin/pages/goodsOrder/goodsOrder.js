"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
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
    store_cart.useCartStore();
    const conbutton = common_vendor.ref(false);
    common_vendor.ref("");
    const show = common_vendor.ref(true);
    const goodDatas = common_vendor.ref([]);
    common_vendor.ref(0);
    const singleprice = common_vendor.ref(0);
    const paymentMethod = common_vendor.ref("wechat");
    const totalPrice = common_vendor.computed(() => {
      if (goodDatas.value < 0 && goodDatas.value.length === 0) {
        return "0.00";
      }
      const total = goodDatas.value.reduce((sum, item) => {
        const price = item.goodprice || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0);
      return total.toFixed(2);
    });
    const increaseQuantity = (id) => {
      const item = goodDatas.value.find((i) => i.id === id);
      if (!item)
        return;
      const increasenum = item.quantity + 1;
      common_vendor.index.request({
        url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
        method: "PATCH",
        data: {
          quantity: increasenum
        },
        success: (res) => {
          console.log(res, "patch");
          item.quantity = increasenum;
        },
        fail: (err2) => {
          console.log(err2);
        }
      });
    };
    const decreaseQuantity = (id) => {
      const item = goodDatas.value.find((i) => i.id === id);
      if (!item) {
        common_vendor.index.showToast({
          title: "请刷新重试",
          icon: "error"
        });
        return;
      }
      const decreasenum = item.quantity - 1;
      if (decreasenum <= 0) {
        conbutton.value = true;
        common_vendor.index.showModal({
          title: "警告",
          content: "是要移除此商品吗？",
          success: (res) => {
            console.log(res, "delete");
            if (res.confirm) {
              common_vendor.index.request({
                url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
                method: "DELETE",
                success: (res2) => {
                  common_vendor.index.showToast({
                    title: "删除成功",
                    icon: "success"
                  });
                  conbutton.value = false;
                }
              });
              synchronous(id);
            } else {
              console.log("用户取消");
              conbutton.value = false;
              return;
            }
          }
        });
      } else {
        common_vendor.index.request({
          url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
          method: "PATCH",
          data: {
            quantity: decreasenum
          },
          success: (res) => {
            item.quantity = decreasenum;
          },
          fail: (err2) => {
            console.log(err2);
          }
        });
      }
    };
    const synchronous = (id) => {
      const index = goodDatas.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        goodDatas.value.splice(index, 1);
      }
      common_vendor.index.setStorage({
        key: "orderData",
        data: goodDatas.value,
        success: () => {
          console.log("本地缓存更新成功");
        },
        fail: () => {
          console.error("本地缓存更新失败");
        }
      });
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
        fail: (err2) => {
          console.log(err2);
        }
      });
    };
    const handlePayment = () => {
      if (!show.value) {
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
      } else {
        common_vendor.index.showToast({
          title: "请选址地址",
          icon: "error",
          duration: 500
        });
        return;
      }
    };
    const baseurl = "http://192.168.31.73:3000/cart";
    const getOnlyData = (id) => {
      common_vendor.index.request({
        url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            singleprice.value = res.data.goodprice;
            goodDatas.value = [...goodDatas.value, res.data];
            console.log(goodDatas.value[0].quantity, "拿到quantity");
            console.log(goodDatas.value, "我是根据id拿到的下单数据lll");
          } else {
            console.log("返回异常", err);
          }
        },
        fail: (err2) => {
          console.log(err2);
        }
      });
    };
    common_vendor.onLoad((options) => {
      try {
        const ids = JSON.parse(options.option);
        console.log(ids, "我是下单id");
        if (Array.isArray(ids)) {
          ids.forEach((id) => getOnlyData(id));
        } else {
          getOnlyData(ids);
        }
      } catch (e) {
        const id = Number(option);
        if (id && !isNaN(id)) {
          getOnlyData(id);
        } else {
          common_vendor.index.showToast({
            title: "参数错误",
            icon: "none"
          });
        }
      }
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
        g: goodDatas.value
      }, goodDatas.value ? {
        h: common_vendor.f(goodDatas.value, (goodDatas2, index, i0) => {
          return {
            a: goodDatas2.goodimg,
            b: common_vendor.t(goodDatas2.goodname),
            c: common_vendor.t(goodDatas2.goodprice),
            d: common_vendor.o(($event) => decreaseQuantity(goodDatas2.id), goodDatas2.id),
            e: common_vendor.t(goodDatas2.quantity),
            f: common_vendor.o(($event) => increaseQuantity(goodDatas2.id), goodDatas2.id),
            g: goodDatas2.id
          };
        }),
        i: conbutton.value
      } : {}, {
        j: common_vendor.t(common_vendor.unref(totalPrice)),
        k: paymentMethod.value === "balance" ? 1 : "",
        l: common_vendor.o(($event) => selectPayment("balance")),
        m: paymentMethod.value === "wechat" ? 1 : "",
        n: common_vendor.o(($event) => selectPayment("wechat")),
        o: common_vendor.t(common_vendor.unref(totalPrice)),
        p: common_vendor.o(handlePayment)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c83de28"], ["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/goodsOrder/goodsOrder.vue"]]);
wx.createPage(MiniProgramPage);
