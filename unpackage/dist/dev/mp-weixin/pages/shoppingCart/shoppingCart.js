"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (Customnav + _easycom_uni_icons)();
}
const Customnav = () => "../../components/customizenav.js";
const _sfc_main = {
  __name: "shoppingCart",
  emits: ["delete"],
  setup(__props, { emit }) {
    const cartStore = store_cart.useCartStore();
    const baseurl = "http://192.168.31.73:3000/cart";
    const title = common_vendor.ref("购物车");
    common_vendor.ref(0);
    const shopdata = common_vendor.ref([]);
    const conbutton = common_vendor.ref(false);
    common_vendor.computed(() => {
      if (!Array.isArray(shopdata.value))
        return "0.00";
      const total = shopdata.value.reduce((sum, item) => {
        return sum + item.quantity * item.goodprice;
      }, 0);
      return total.toFixed(2);
    });
    const isAllSelected = common_vendor.computed(() => {
      return shopdata.value.length > 0 && shopdata.value.every((item) => selectedMap[item.id]);
    });
    const selectedMap = common_vendor.reactive({});
    const swipedMap = common_vendor.reactive({});
    const startXMap = common_vendor.reactive({});
    const increaseQuantity = (id) => {
      const item = shopdata.value.find((i) => i.id === id);
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
          cartStore.getItems();
          cartStore.increaseItemQuantity(id);
        },
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const decreaseQuantity = (id) => {
      const item = shopdata.value.find((i) => i.id === id);
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
              deleteItem(id);
              synchronous(id);
              cartStore.getItems();
              cartStore.decreaseItemQuantity(id);
              conbutton.value = false;
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
            cartStore.getItems();
            cartStore.decreaseItemQuantity(id);
          },
          fail: (err) => {
            console.log(err);
          }
        });
      }
    };
    const toggleSelection = (id) => {
      console.log(id, "我是点击切换的商品id-204");
      selectedMap[id] = !selectedMap[id];
    };
    const getSelectedIds = () => {
      if (!shopdata.value || !Array.isArray(shopdata.value)) {
        return [];
      }
      return shopdata.value.filter((item) => selectedMap[item.id]).map((item) => item.id);
    };
    const toggleSelectAllOrInvert = () => {
      if (isAllSelected.value) {
        shopdata.value.forEach((item) => {
          selectedMap[item.id] = !selectedMap[item.id];
          console.log(item.id, "101选中标机");
        });
      } else {
        shopdata.value.forEach((item) => {
          selectedMap[item.id] = true;
        });
      }
    };
    const submitSelected = (id) => {
      const selectedIds = getSelectedIds();
      if (selectedIds.length === 0) {
        common_vendor.index.showToast({
          title: "请先选择商品",
          icon: "none"
        });
        return;
      }
      let param = "";
      if (selectedIds.legth === 1) {
        param = selectedIds[0];
      } else {
        param = JSON.stringify(selectedIds);
      }
      common_vendor.index.navigateTo({
        url: `/pages/goodsOrder/goodsOrder?option=${param}`
      });
    };
    const deleteItem = (id) => {
      const item = shopdata.value.find((i) => i.id === id);
      if (!item) {
        common_vendor.index.showToast({
          title: "请刷新重试",
          icon: "error"
        });
      }
      common_vendor.index.showModal({
        title: "警告",
        content: "确定删除吗",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.request({
              url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
              method: "DELETE",
              success: (res2) => {
                common_vendor.index.showToast({
                  title: "删除成功"
                });
                synchronous(id);
              }
            });
          } else {
            console.log("用户取消删除");
          }
        }
      });
    };
    const synchronous = (id) => {
      const index = shopdata.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        shopdata.value.splice(index, 1);
      }
      common_vendor.index.setStorage({
        key: "orderData",
        data: shopdata.value,
        success: () => {
          console.log("本地缓存更新成功");
        },
        fail: () => {
          console.error("本地缓存更新失败");
        }
      });
    };
    const handleTouchStart = (e, id) => {
      startXMap[id] = e.touches[0].clientX;
      for (const key in swipedMap) {
        if (key !== id) {
          swipedMap[key] = false;
        }
      }
    };
    const handleTouchMove = (e, id) => {
      e.preventDefault();
      const moveX = e.touches[0].clientX;
      const diff = startXMap[id] - moveX;
      if (diff < 0) {
        swipedMap[id] = false;
        return;
      }
      if (diff > 50) {
        swipedMap[id] = true;
      } else {
        swipedMap[id] = false;
      }
    };
    const handleTouchEnd = (e, id) => {
    };
    common_vendor.ref([]);
    const getShopData = (id) => {
      common_vendor.index.request({
        url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
        method: "GET",
        success: (res) => {
          console.log(res.data, "拿到了hhh");
          shopdata.value = res.data;
          let cratList = [];
          if (Array.isArray(res.data)) {
            cratList = res.data;
          } else if (res.data && typeof res.data === "object") {
            cratList = [res.data];
          } else {
            common_vendor.index.showToast({
              title: "数据格式异常",
              icon: "error"
            });
            console.error("接口返回数据格式不正确", res.data);
            return;
          }
          shopdata.value = cratList;
          cratList.forEach((item) => {
            if (!(item.id in selectedMap))
              selectedMap[item.id] = false;
            if (!(item.id in swipedMap))
              swipedMap[item.id] = false;
            if (!(item.id in startXMap))
              startXMap[item.id] = 0;
          });
        },
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const goHome = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    const changeiconnum = () => {
      cartStore.getItems();
    };
    common_vendor.onShow(() => {
      getShopData();
      changeiconnum();
    });
    common_vendor.onLoad((options) => {
      getShopData(options.option);
      console.log(options.option, "id");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: title.value
        }),
        b: Array.isArray(shopdata.value)
      }, Array.isArray(shopdata.value) ? common_vendor.e({
        c: common_vendor.f(shopdata.value, (shopdata2, index, i0) => {
          return common_vendor.e({
            a: selectedMap[shopdata2.id]
          }, selectedMap[shopdata2.id] ? {} : {}, {
            b: common_vendor.o(($event) => toggleSelection(shopdata2.id), shopdata2.id),
            c: shopdata2.goodimg,
            d: common_vendor.t(shopdata2.goodname),
            e: common_vendor.t(shopdata2.goodprice),
            f: common_vendor.o(($event) => decreaseQuantity(shopdata2.id), shopdata2.id),
            g: common_vendor.t(shopdata2.quantity),
            h: common_vendor.o(($event) => increaseQuantity(shopdata2.id), shopdata2.id),
            i: "2d600bf6-1-" + i0,
            j: common_vendor.o(($event) => deleteItem(shopdata2.id), shopdata2.id),
            k: shopdata2.id,
            l: selectedMap[shopdata2.id] ? 1 : "",
            m: swipedMap[shopdata2.id] ? 1 : "",
            n: common_vendor.o((e) => handleTouchStart(e, shopdata2.id), shopdata2.id),
            o: common_vendor.o((e) => handleTouchMove(e, shopdata2.id), shopdata2.id),
            p: common_vendor.o((e) => handleTouchEnd(e, shopdata2.id), shopdata2.id)
          });
        }),
        d: conbutton.value,
        e: conbutton.value,
        f: common_vendor.p({
          type: "trash",
          size: "40"
        }),
        g: shopdata.value && shopdata.value.length > 0
      }, shopdata.value && shopdata.value.length > 0 ? common_vendor.e({
        h: common_vendor.unref(isAllSelected)
      }, common_vendor.unref(isAllSelected) ? {} : {}, {
        i: common_vendor.o(toggleSelectAllOrInvert),
        j: common_vendor.o(($event) => submitSelected(shopdata.value.id))
      }) : {}) : {}, {
        k: !shopdata.value || shopdata.value.length === 0
      }, !shopdata.value || shopdata.value.length === 0 ? {
        l: common_vendor.o(goHome)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/shoppingCart/shoppingCart.vue"]]);
wx.createPage(MiniProgramPage);
