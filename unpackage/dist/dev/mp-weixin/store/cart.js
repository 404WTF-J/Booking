"use strict";
const common_vendor = require("../common/vendor.js");
const useCartStore = common_vendor.defineStore("cart", {
  state: () => ({
    items: []
  }),
  getters: {
    totalQuantity: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  actions: {
    getItems() {
      common_vendor.index.request({
        url: "http://192.168.31.73:3000/cart/items",
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200) {
            this.items = res.data;
          } else {
            console.log(res, statusCode);
            common_vendor.index.showToast({
              title: `${res.statusCode}`,
              icon: Error
            });
          }
        }
      });
    },
    //增加监听事件
    increaseItemQuantity(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity++;
      }
    },
    //减少监听事件
    decreaseItemQuantity(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    }
  }
});
exports.useCartStore = useCartStore;
