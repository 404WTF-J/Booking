<template>
	<Customnav :myValue="title"></Customnav>
	<view class="container">
		<view class="goodOrder-box">
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
			<view v-if="goodDatas">
				<view class="product-section" v-for='(goodDatas,index) in goodDatas' :key='goodDatas.id'>
					<image class="product-image" :src="goodDatas.goodimg" mode="aspectFit" />
					<view class="product-info">
						<text class="product-name">{{goodDatas.goodname}}</text>
						<text class="product-price">单价：¥{{goodDatas.goodprice}}</text>
						<view class="quantity-selector">
							<button class="quantity-btn" :disabled="conbutton"
								@click="decreaseQuantity(goodDatas.id)">-</button>
							<text class="quantity">{{ goodDatas.quantity }}</text>
							<button class="quantity-btn" @click="increaseQuantity(goodDatas.id)">+</button>
						</view>
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
		</view>
	</view>
	<!-- 底部支付栏 -->
	<view class="footer">
		<text class="total-payment">应付金额: ¥{{ totalPrice }}</text>
		<button class="pay-btn" @click="handlePayment">支付</button>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		reactive,
		toRaw
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import Customnav from "@/components/customizenav.vue";
	import {
		useCartStore
	} from "@/store/cart.js";

	const title = ref('商品下单')
	// 地址信息
	const addressinfo = reactive({
		diqu: '',
		daolu: '',
		info: ''
	})

	const cartStore = useCartStore()

	const conbutton = ref(false)
	const addText = ref('')
	const show = ref(true)
	const goodDatas = ref([])
	// 商品数量
	const quantity = ref(0);
	//单品价格
	const singleprice = ref(0)
	// 支付方式
	const paymentMethod = ref('wechat');

	// 计算总价
	const totalPrice = computed(() => {
		if (goodDatas.value < 0 && goodDatas.value.length === 0) {
			return '0.00'
		}
		const total = goodDatas.value.reduce((sum, item) => {
			const price = item.goodprice || 0;
			const quantity = item.quantity || 0;
			return sum + price * quantity;
		}, 0)
		return total.toFixed(2)
	});

	// 增加数量
	const increaseQuantity = (id) => {
		// 先找到当前商品
		const item = goodDatas.value.find(i => i.id === id);
		if (!item) return;

		const increasenum = item.quantity + 1;

		uni.request({
			url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
			method: 'PATCH',
			data: {
				quantity: increasenum
			},
			success: (res) => {
				console.log(res, 'patch');
				//更新本地
				item.quantity = increasenum
			},
			fail: (err) => {
				console.log(err);
			}
		})
	};

	// 减少数量
	const decreaseQuantity = (id) => {
		const item = goodDatas.value.find(i => i.id === id)
		if (!item) {
			uni.showToast({
				title: '请刷新重试',
				icon: 'error'
			})
			return
		}

		const decreasenum = item.quantity - 1;
		if (decreasenum <= 0) {
			conbutton.value = true
			uni.showModal({
				title: '警告',
				content: '是要移除此商品吗？',
				success: (res) => {
					console.log(res, 'delete');
					if (res.confirm) {
						//用户点击确定，执行删除
						uni.request({
							url:id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
							method:"DELETE",
							success: (res) => {
								uni.showToast({
									title:'删除成功',
									icon: 'success'
								})
								conbutton.value = false
							}
						})
						synchronous(id)
					} else {
						console.log('用户取消');
						conbutton.value = false
						return
					}
				}
			})
		} else {
			uni.request({
				url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
				method: "PATCH",
				data: {
					quantity: decreasenum
				},
				success: (res) => {
					item.quantity = decreasenum
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
	};

	// // 删除商品
	// const deleteItem = (id) => {
	// 	const item = goodDatas.value.find(i => i.id === id)
	// 	if (!item) {
	// 		uni.showToast({
	// 			title: '请刷新重试',
	// 			icon: 'error'
	// 		})
	// 	}
	// 	//删除的提示
	// 	uni.showModal({
	// 		title: '警告',
	// 		content: '确定删除吗',
	// 		success: (res) => {
	// 			if (res.confirm) {
	// 				uni.request({
	// 					url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
	// 					method: 'DELETE',
	// 					success: (res) => {
	// 						uni.showToast({
	// 							title: '删除成功'
	// 						})
	// 						//并且将本地storage中对应的数据删除 也要更新页面中
	// 						synchronous(id)
	// 					}
	// 				})
	// 			} else {
	// 				console.log('用户取消删除');
	// 			}
	// 		}
	// 	})
	// };
	
	//同步本地数据
	const synchronous = (id) => {
		// 1. 删除本地内存数据
		const index = goodDatas.value.findIndex(i => i.id === id);
		if (index !== -1) {
			goodDatas.value.splice(index, 1);
		}
	
		// 2. 更新本地缓存
		uni.setStorage({
			key: 'orderData',
			data: goodDatas.value,
			success: () => {
				console.log('本地缓存更新成功');
			},
			fail: () => {
				console.error('本地缓存更新失败');
			}
		});
	}

	// 选择支付方式
	const selectPayment = (method) => {
		paymentMethod.value = method;
	};

	// 选择地址
	const addAddressInfo = () => {
		// 调用自带原生地址页面
		uni.chooseAddress({
			success: (res) => {
				console.log(res);
				addressinfo.diqu = res.provinceName + '-' + res.cityName + '-' + res.countyName
				addressinfo.daolu = res.detailInfo
				addressinfo.info = res.userName + ' ' + res.telNumber
				show.value = false
				console.log(addressinfo);
			},
			fail: err => {
				console.log(err);
			}
		})
	};

	// 处理支付
	const handlePayment = () => {
		if (!show.value) {
			uni.showModal({
				title: '确认支付',
				content: `确认支付 ¥${totalPrice.value} 购买商品吗？`,
				success: (res) => {
					if (res.confirm) {
						setTimeout(() => {
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							});
						}, 2000)
					} else {
						uni.showToast({
							title: '取消支付',
							icon: 'error'
						})
					}
				}
			});
		} else {
			uni.showToast({
				title: '请选址地址',
				icon: 'error',
				duration: 500
			})
			return
		}

	};


	//根据id获取对应商品
	const baseurl = 'http://192.168.31.73:3000/cart';
	const getOnlyData = (id) => {
		uni.request({
			url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
			method: "GET",
			success: (res) => {

				if (res.statusCode === 200 && res.data) {
					singleprice.value = res.data.goodprice;
					goodDatas.value = [...goodDatas.value, res.data]
					console.log(goodDatas.value[0].quantity, '拿到quantity');
					console.log(goodDatas.value, '我是根据id拿到的下单数据lll');
				} else {
					console.log('返回异常', err);
				}
			},
			fail: (err) => {
				console.log(err);
			}
		})
	}

	onLoad((options) => {
		try {
			//先解析为数组
			const ids = JSON.parse(options.option)
			console.log(ids, '我是下单id');
			if (Array.isArray(ids)) {
				//多个id，依次请求
				ids.forEach(id => getOnlyData(id))
			} else {
				//不是数组，单个id
				getOnlyData(ids)
			}
		} catch (e) {
			// 解析失败，说明是单个id字符串或数字
			const id = Number(option)
			if (id && !isNaN(id)) {
				getOnlyData(id)
			} else {
				uni.showToast({
					title: '参数错误',
					icon: 'none'
				})
			}
		}
	})
</script>

<style scoped>
	.container {
		padding: 20rpx;
		background-color: #f5f5f5;
		margin-top: 200rpx;
	}

	.goodOrder-box {
		height: 100%;
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
	.info {
		font-size: 27rpx;
		font-weight: 300;
	}

	.daolu {
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
		position: sticky;
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