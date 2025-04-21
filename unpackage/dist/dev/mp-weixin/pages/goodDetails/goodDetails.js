"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (CustomNav + _easycom_uni_icons + _easycom_uni_goods_nav)();
}
const CustomNav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "goodDetails",
  setup(__props) {
    const cartStore = store_cart.useCartStore();
    const allQuantity = common_vendor.ref(0);
    const myValue = common_vendor.ref("商品详情");
    const goodData = common_vendor.ref({});
    const show = common_vendor.ref(false);
    const cartoptions = common_vendor.ref([
      {
        icon: "headphones",
        text: "客服"
      },
      {
        icon: "shop",
        text: "店铺",
        infoBackgroundColor: "#007aff",
        infoColor: "white"
      },
      {
        icon: "cart",
        text: "购物车",
        infoBackgroundColor: "#fc0000",
        infoColor: "white",
        info: 0
      }
    ]);
    const buttonGroup = common_vendor.ref([
      {
        text: "加入购物车",
        backgroundColor: "#ffa200",
        color: "#fff"
      },
      {
        text: "立即购买",
        backgroundColor: "#ff0000",
        color: "#fff"
      }
    ]);
    const changeQuantity = () => {
      sentUrl({
        method: "GET",
        path: "/items"
      }).then((res) => {
        console.log(res, "我是旧的的数据");
        allQuantity.value = res.reduce((sum, item) => sum + item.quantity, 0);
        cartoptions.value[2].info = allQuantity.value;
        console.log(allQuantity, "我是所有新数据quantity数量总和");
      });
    };
    const buttonClick = (e, goodData2) => {
      if (e.content.text === "加入购物车") {
        shopentrance(goodData2);
      } else {
        clickbuy(goodData2);
      }
    };
    const CART_API = "http://192.168.31.73:3000/cart";
    let orderDatas = {
      code: 200,
      message: "success",
      data: []
    };
    let idCounter = 1;
    const syncOrderDataFromServer = async () => {
      try {
        const res = await sentUrl({
          method: "GET",
          path: "/items"
        });
        console.log("购物车接口返回数据:", res);
        if (res && Array.isArray(res.data)) {
          orderDatas.data = res.data;
        } else if (Array.isArray(res)) {
          orderDatas.data = res;
        } else {
          orderDatas.data = [];
        }
        common_vendor.index.setStorageSync("orderData", orderDatas);
      } catch (error) {
        console.error("同步购物车数据失败", error);
      }
    };
    const shopentrance = async (res) => {
      show.value = true;
      try {
        await syncOrderDataFromServer();
        console.log("同步后购物车数据:", orderDatas.data.goodname);
        console.log("待添加商品名称:", res.goodname);
        const existingIndex = orderDatas.data.findIndex(
          (item) => item.goodname.trim().toLowerCase() === res.goodname.trim().toLowerCase()
        );
        console.log("妈的没有", existingIndex);
        if (existingIndex === -1) {
          const newItem = {
            id: idCounter++,
            goodname: res.goodname,
            goodprice: res.newprice,
            goodimg: res.img,
            quantity: 1
          };
          const postRes = await sentUrl({
            method: "POST",
            path: "/items",
            data: newItem
          });
          orderDatas.data.push(postRes);
          common_vendor.index.setStorageSync("idCounter", idCounter);
          common_vendor.index.setStorageSync("orderData", orderDatas);
          goodData.value.id = postRes.id;
          common_vendor.index.showToast({
            title: "前往购物车..",
            icon: "success"
          });
          changeQuantity();
          console.log(orderDatas, "我有了");
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: `/pages/shoppingCart/shoppingCart?option=${postRes.id}`
            });
          }, 2e3);
        } else {
          const updatedItem = {
            ...orderDatas.data[existingIndex],
            quantity: orderDatas.data[existingIndex].quantity + 1
          };
          console.log(updatedItem.id, `di${updatedItem}`);
          orderDatas.data[existingIndex] = updatedItem;
          const patchRes = await sentUrl({
            method: "PATCH",
            path: `/items/${updatedItem.id}`,
            data: {
              quantity: updatedItem.quantity
            }
          });
          console.log("我是谁", patchRes);
          orderDatas.data[existingIndex] = patchRes.data || patchRes;
          common_vendor.index.setStorageSync("orderData", orderDatas);
          common_vendor.index.showToast({
            title: "商品数量已更新"
          });
          changeQuantity();
        }
      } catch (error) {
        console.error("操作失败:", error);
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "error",
          duration: 1e3
        });
      }
    };
    const clickbuy = async (res) => {
      try {
        await syncOrderDataFromServer();
        console.log("同步后购物车数据:", orderDatas.data.goodname);
        console.log("待添加商品名称:", res.goodname);
        const existingIndex = orderDatas.data.findIndex(
          (item) => item.goodname.trim().toLowerCase() === res.goodname.trim().toLowerCase()
        );
        console.log("妈的没有", existingIndex);
        if (existingIndex === -1) {
          const newItem = {
            id: idCounter++,
            goodname: res.goodname,
            goodprice: res.newprice,
            goodimg: res.img,
            quantity: 1
          };
          const postRes = await sentUrl({
            method: "POST",
            path: "/items",
            data: newItem
          });
          orderDatas.data.push(postRes);
          common_vendor.index.setStorageSync("idCounter", idCounter);
          common_vendor.index.setStorageSync("orderData", orderDatas);
          goodData.value.id = postRes.id;
          common_vendor.index.showToast({
            title: "前往下单页..",
            icon: "success"
          });
          console.log(orderDatas, "我有了");
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: `/pages/goodsOrder/goodsOrder?option=${postRes.id}`
            });
          }, 2e3);
        } else {
          common_vendor.index.navigateTo({
            url: `/pages/goodsOrder/goodsOrder?option=${orderDatas.data[existingIndex].id}`
          });
        }
      } catch (error) {
        console.error("操作失败:", error);
        common_vendor.index.showToast({
          title: "操作失败",
          icon: "error",
          duration: 2e3
        });
      }
    };
    const sentUrl = ({
      method,
      path,
      data
    }) => {
      return new Promise((resolve, reject) => {
        const fullUrl = `${CART_API}${path}`;
        console.log("🛒 购物车请求:", {
          method,
          url: fullUrl,
          data
        });
        common_vendor.index.request({
          url: fullUrl,
          method,
          header: {
            "Content-Type": "application/json",
            "X-Request-Source": "mini-program"
          },
          data: JSON.stringify(data),
          success: (res) => {
            console.log(`📩 响应状态: ${res.statusCode}`, res.data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(res.data);
            } else {
              reject(new Error(`购物车操作失败: ${res.statusCode}`));
            }
          },
          fail: (err) => {
            console.error("🛒 请求异常:", err);
            reject(new Error("网络连接失败，请检查后重试"));
          }
        });
      });
    };
    const cartPage = () => {
      cartStore.getItems();
      common_vendor.index.navigateTo({
        url: `/pages/shoppingCart/shoppingCart`
      });
    };
    common_vendor.onLoad((options) => {
      goodData.value = JSON.parse(options.option);
      console.log(goodData);
    });
    common_vendor.onShow(() => {
      changeQuantity();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: myValue.value
        }),
        b: goodData.value.img,
        c: goodData.value
      }, goodData.value ? {
        d: common_vendor.t(goodData.value.newprice),
        e: common_vendor.t(goodData.value.oldprice),
        f: common_vendor.t(goodData.value.kucun),
        g: common_vendor.t(goodData.value.yishou),
        h: common_vendor.t(goodData.value.goodname)
      } : {}, {
        i: common_vendor.t(goodData.value.gooddescrtion),
        j: common_vendor.t(goodData.value.goodxuzhi),
        k: show.value
      }, show.value ? {
        l: common_vendor.p({
          type: "cart-filled",
          size: "50"
        }),
        m: common_vendor.o(($event) => shopentrance(goodData.value))
      } : {}, {
        n: common_vendor.o(($event) => cartPage()),
        o: common_vendor.o((e) => buttonClick(e, goodData.value)),
        p: common_vendor.p({
          fill: true,
          options: cartoptions.value,
          buttonGroup: buttonGroup.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/goodDetails/goodDetails.vue"]]);
wx.createPage(MiniProgramPage);
