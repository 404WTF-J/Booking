"use strict";
const common_vendor = require("../../common/vendor.js");
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
  props: {
    shopdata: {
      type: Object,
      required: true
    }
  },
  emits: ["delete"],
  setup(__props, { emit }) {
    const props = __props;
    const title = common_vendor.ref("购物车");
    const quantity = common_vendor.ref(1);
    const shopdata = common_vendor.ref({});
    const totalprice = common_vendor.computed(() => {
      return (quantity.value * shopdata.value.newprice).toFixed(2);
    });
    const isSelected = common_vendor.ref(false);
    const isSwiped = common_vendor.ref(false);
    const startX = common_vendor.ref(0);
    const moveX = common_vendor.ref(0);
    const toggleSelection = () => {
      isSelected.value = !isSelected.value;
    };
    const increaseQuantity = () => {
      quantity.value++;
    };
    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    const handleTouchStart = (e) => {
      startX.value = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      moveX.value = e.touches[0].clientX;
      const diff = startX.value - moveX.value;
      if (diff < 0) {
        isSwiped.value = false;
        return;
      }
      if (diff > 50) {
        isSwiped.value = true;
      } else {
        isSwiped.value = false;
      }
    };
    const handleTouchEnd = () => {
    };
    const deleteItem = () => {
      emit("delete", props.shopdata.id);
    };
    common_vendor.onLoad((options) => {
      shopdata.value = JSON.parse(options.option);
      console.log(shopdata);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          myValue: title.value
        }),
        b: isSelected.value
      }, isSelected.value ? {} : {}, {
        c: common_vendor.o(toggleSelection),
        d: shopdata.value.img,
        e: common_vendor.t(shopdata.value.goodname),
        f: common_vendor.t(common_vendor.unref(totalprice)),
        g: common_vendor.o(decreaseQuantity),
        h: common_vendor.t(quantity.value),
        i: common_vendor.o(increaseQuantity),
        j: common_vendor.p({
          type: "trash",
          size: "40"
        }),
        k: common_vendor.o(deleteItem),
        l: isSelected.value ? 1 : "",
        m: isSwiped.value ? 1 : "",
        n: common_vendor.o(handleTouchStart),
        o: common_vendor.o(handleTouchMove),
        p: common_vendor.o(handleTouchEnd)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wangtj/Learning/Booking/预约场地/pages/shoppingCart/shoppingCart.vue"]]);
wx.createPage(MiniProgramPage);
