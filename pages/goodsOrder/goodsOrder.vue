<template>
	<Customnav :myValue="title"></Customnav>
  <view class="container">

    <!-- 收货地址选择 -->
    <view class="address-section" @click="addAddressInfo">
      <text v-if="show">请选择收货地址</text>
	  <view class="addressText">
	  	<view class="diqu">{{addressinfo.diqu}}</view>
		<view class="daolu">{{addressinfo.daolu}}</view>
		<view class="info">{{addressinfo.info}}</view>
	  </view>
      <text class="delivery-tag">快递</text>
    </view>

    <!-- 商品信息 -->
    <view class="product-section">
      <image class="product-image" :src="goodDatas.img" mode="aspectFit" />
      <view class="product-info">
        <text class="product-name">{{goodDatas.goodname}}</text>
        <text class="product-price">¥{{goodDatas.newprice}}</text>
        <view class="quantity-selector">
          <button class="quantity-btn" @click="decreaseQuantity">-</button>
          <text class="quantity">{{ quantity }}</text>
          <button class="quantity-btn" @click="increaseQuantity">+</button>
        </view>
      </view>
    </view>

    <!-- 费用详情 -->
    <view class="price-details">
      <view class="price-row">
        <text>运费</text>
        <text>包邮</text>
      </view>
      <view class="price-row">
        <text>会员折扣</text>
        <text>10.0折 -¥0.00</text>
      </view>
      <view class="price-row">
        <text>优惠券</text>
        <text>不使用</text>
      </view>
      <view class="price-row total">
        <text>总计</text>
        <text>¥{{ totalPrice }}</text>
      </view>
    </view>

    <!-- 支付方式选择 -->
    <view class="payment-methods">
      <view class="payment-method" @click="selectPayment('balance')">
        <text>余额支付</text>
        <text>剩余0元可用</text>
        <view class="radio" :class="{ selected: paymentMethod === 'balance' }"></view>
      </view>
      <view class="payment-method" @click="selectPayment('wechat')">
        <text>微信支付</text>
        <view class="radio" :class="{ selected: paymentMethod === 'wechat' }"></view>
      </view>
    </view>

    <!-- 底部支付栏 -->
    <view class="footer">
      <text class="total-payment">应付金额: ¥{{ totalPrice }}</text>
      <button class="pay-btn" @click="handlePayment">支付</button>
    </view>
  </view>

</template>

<script setup>
import { ref, computed , reactive } from 'vue';
import { onLoad } from "@dcloudio/uni-app";
import Customnav from "@/components/customizenav.vue";

const title = ref('商品下单')
// 地址信息
const addressinfo = reactive({
	diqu:'',
	daolu:'',
	info:''
})

const addText = ref('')
const show = ref(true)
const goodDatas = ref({})
// 商品数量
const quantity = ref(1);
//单品价格
const singleprice = ref(0)
// 支付方式
const paymentMethod = ref('wechat');

// 计算总价
const totalPrice = computed(() => {
  return (singleprice.value * quantity.value).toFixed(2);
});

// 增加数量
const increaseQuantity = () => {
  quantity.value++;
};

// 减少数量
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// 选择支付方式
const selectPayment = (method) => {
  paymentMethod.value = method;
};

// 选择地址
  const addAddressInfo  = () => {
  	// 调用自带原生地址页面
  	uni.chooseAddress({
  		success:(res)=>{
			console.log(res);
			addressinfo.diqu = res.provinceName+'-'+res.cityName+'-'+res.countyName
			addressinfo.daolu = res.detailInfo
			addressinfo.info = res.userName+' '+res.telNumber
			show.value = false
			console.log(addressinfo);
  		},
  		fail:err=>{
  			// console.log(err);
  		}
  	})
  };

// 处理支付
const handlePayment = () => {
  uni.showModal({
    title: '确认支付',
    content: `确认支付 ¥${totalPrice.value} 购买商品吗？`,
    success: (res) => {
      if (res.confirm) {
		  setTimeout(()=>{
			 uni.showToast({
			title: '支付成功',
			icon: 'success'
			}); 
		},2000)
      }else{
		  uni.showToast({
		  	title:'取消支付',
			icon:'error'
		  })
	  }
    }
  });
};

onLoad((options)=>{
	goodDatas.value = JSON.parse(options.option)
	singleprice.value = goodDatas.value.newprice
	console.log(goodDatas.value.newprice)
})
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
}

.status-icons {
  display: flex;
  gap: 20rpx;
}

.diqu,
.info{
  font-size: 27rpx;
  font-weight: 300;
}
.daolu{
	font-weight: 500;
	font-size: 40rpx;
	margin: 10rpx 0;
}

.address-section {
  background-color: #fff;
  padding: 30rpx;
  margin: 20rpx 0;
  border-radius: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-tag {
  background-color: #ff9500;
  color: #fff;
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.product-section {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx 0;
  border-radius: 10rpx;
  display: flex;
}

.product-image {
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.product-price {
  color: #ff5000;
  font-size: 32rpx;
  margin-bottom: 20rpx;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.quantity-btn {
  line-height: 55rpx;
  text-align: center;
  background-color: #fff;
  font-size: 32rpx;
}

.quantity {
  margin: 0 20rpx;
  min-width: 40rpx;
  text-align: center;
}

.price-details {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx 0;
  border-radius: 10rpx;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 15rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.price-row.total {
  font-weight: bold;
  border-bottom: none;
}

.payment-methods {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx 0;
  border-radius: 10rpx;
}

.payment-method {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.payment-method:last-child {
  border-bottom: none;
}

.radio {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 1rpx solid #ddd;
}

.radio.selected {
  background-color: #09bb07;
  border-color: #09bb07;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.total-payment {
  font-weight: bold;
  font-size: 32rpx;
}

.pay-btn {
  background-color: #000;
  color: #fff;
  padding: 0 60rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 32rpx;
  margin: 0;
}
</style>