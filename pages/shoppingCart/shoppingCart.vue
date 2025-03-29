<template>
	<Customnav :myValue='title'></Customnav>
	<view class="containner">
		<!-- 商品信息 -->
		<view class="product-section"
		:class="{ 'selected': isSelected, 'swiped': isSwiped }"
		@touchstart="handleTouchStart"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
		>
		<!-- 选中圆圈 -->
		<view class="selection-circle" @click.stop="toggleSelection">
			<view class="inner-circle" v-if="isSelected"></view>
		</view>
		  <image class="product-image" :src="shopdata.img" mode="aspectFit" />
		  <view class="product-info">
			<text class="product-name">{{shopdata.goodname}}</text>
			<text class="product-price">¥{{totalprice}}</text>
			<view class="quantity-selector">
			  <button class="quantity-btn" @click="decreaseQuantity">-</button>
			  <text class="quantity">{{ quantity }}</text>
			  <button class="quantity-btn" @click="increaseQuantity">+</button>
			</view>
		  </view>
		  <!-- 删除按钮 -->
		    <view class="delete-btn" @click.stop="deleteItem">
				<uni-icons type="trash" size="40"></uni-icons>
			</view>
		</view>	
		<!-- 底部选框 支付按钮 -->
		<view class="allcheck">
			
		</view>
	</view>
</template>

<script setup>
	import { ref, computed , reactive , defineProps} from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import Customnav from "@/components/customizenav.vue";
	
	const title = ref('购物车')
	// 商品数量
	const quantity = ref(1);
	
	const shopdata = ref({})
	//商品价格灵活计算
	const totalprice = computed(()=>{
		return (quantity.value * shopdata.value.newprice).toFixed(2)
	})
	
	const props = defineProps({
	  shopdata: {
	    type: Object,
	    required: true
	  }
	});
	
	const emit = defineEmits(['delete']);
	
	const isSelected = ref(false);
	const isSwiped = ref(false);
	const startX = ref(0);
	const moveX = ref(0);
	
	// 切换选择状态
	const toggleSelection = () => {
	  isSelected.value = !isSelected.value;
	};
	
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
	
	// 触摸开始
	const handleTouchStart = (e) => {
	  startX.value = e.touches[0].clientX;
	};
	
	// 触摸移动
	const handleTouchMove = (e) => {
	  moveX.value = e.touches[0].clientX;
	  const diff = startX.value - moveX.value;
	  
	  // 向右滑动时恢复原位
	  if (diff < 0) {
	    isSwiped.value = false;
	    return;
	  }
	  
	  // 向左滑动超过50px显示删除按钮
	  if (diff > 50) {
	    isSwiped.value = true;
	  } else {
	    isSwiped.value = false;
	  }
	};
	
	// 触摸结束
	const handleTouchEnd = () => {
	  // 可以根据需要添加惯性滑动效果
	};
	
	// 删除商品
	const deleteItem = () => {
	  emit('delete', props.shopdata.id);
	};
	
	onLoad((options)=>{
		shopdata.value = JSON.parse(options.option)
		console.log(shopdata);
	})
</script>

<style>
.product-section {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx 0;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.product-section.swiped {
  transform: translateX(-120rpx);
}

.product-section.selected {
  background-color: #f5f9ff;
}

.selection-circle {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #ccc;
  margin-right: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-circle {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background-color: #2979ff;
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
  font-size: 28rpx;
}

.delete-btn {
  position: absolute;
  right: -120rpx;
  top: 0;
  bottom: 0;
  width: 120rpx;
  background-color: #f44;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
}
</style>
