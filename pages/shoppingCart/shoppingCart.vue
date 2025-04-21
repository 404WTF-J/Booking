<template>
	<Customnav :myValue='title'></Customnav>
	<view class="containner" v-if="Array.isArray(shopdata)">
		<!-- 商品信息 -->
		<view class="shopData-box">
			<view class="product-section" v-for="(shopdata,index) in shopdata" :key="shopdata.id"
				:class="{ selected: selectedMap[shopdata.id], swiped: swipedMap[shopdata.id] }"
				@touchstart="e => handleTouchStart(e, shopdata.id)"
				@touchmove.passive.prevent="e => handleTouchMove(e, shopdata.id)"
				@touchend="e => handleTouchEnd(e, shopdata.id)">
				<!-- 选中圆圈 -->
				<view class="selection-circle" @click.stop="toggleSelection(shopdata.id)">
					<view class="inner-circle" v-if="selectedMap[shopdata.id]"></view>
				</view>
				<image class="product-image" :src="shopdata.goodimg" mode="aspectFit" />
				<view class="product-info">
					<text class="product-name">{{shopdata.goodname}}</text>
					<view class="product-price_box">
						<text class="product-price">现价:¥{{shopdata.goodprice}}</text>
						<!-- <text class="product-price">总计:¥{{(shopdata.quantity * shopdata.goodprice).toFixed(2)}}</text> -->
					</view>
					<view class="quantity-selector">
						<button class="quantity-btn" :disabled=conbutton @click="decreaseQuantity(shopdata.id)">-</button>
						<text class="quantity">{{ shopdata.quantity }}</text>
						<button class="quantity-btn" :disabled=conbutton @click="increaseQuantity(shopdata.id)">+</button>
					</view>
				</view>
				<!-- 删除按钮 -->
				<view class="delete-btn" @click.stop="deleteItem(shopdata.id)">
					<uni-icons type="trash" size="40"></uni-icons>
				</view>
			</view>
		</view>
		
		<!-- 底部选框 支付按钮 -->
		<view class="allcheck" v-if="shopdata && shopdata.length > 0" >
			<view class="comfirmbox">
				<view class="selection-circle" @click="toggleSelectAllOrInvert">
					<view class="inner-circle" v-if='isAllSelected'></view>
				</view>
				<view class="okbtn" @click="submitSelected(shopdata.id)">提交</view>
			</view>
		</view>
	</view>
	<!-- 清空购物车的页面 -->
	<view class="shopdataNone_box" v-if="!shopdata || shopdata.length === 0">
		<view class="shopdataNone_imgbox">
			<image src="../../static/assest/Taricon/shopCartnoneimg.jpeg" mode=""></image>
			<view class="Catrnone">购物车空空如也</view>
		</view>
		<view class="backorderbtn">
			<view class="backtext" @click="goHome">去选购</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		reactive,
		defineProps
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import Customnav from '../../components/customizenav.vue'
	import {
		useCartStore
	} from "@/store/cart.js";
	const cartStore = useCartStore()

	const baseurl = 'http://192.168.31.73:3000/cart';

	const title = ref('购物车')


	// 商品数量
	const quantity = ref(0);

	const shopdata = ref([])
	//控件变量
	const conbutton = ref(false)

	const totalprice = computed(() => {
		if (!Array.isArray(shopdata.value)) return '0.00';

		const total = shopdata.value.reduce((sum, item) => {
			return sum + item.quantity * item.goodprice;
		}, 0);

		return total.toFixed(2);
	});

	//计算是否全部选中
	const isAllSelected = computed(() => {
		return shopdata.value.length > 0 && shopdata.value.every(item => selectedMap[item.id])
	})

	const emit = defineEmits(['delete']);

	// 选中状态和滑动状态，key为商品id
	const selectedMap = reactive({});
	const swipedMap = reactive({});
	const startXMap = reactive({});

	// 增加数量
	const increaseQuantity = (id) => {
		// 先找到当前商品
		const item = shopdata.value.find(i => i.id === id);
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
				//quantity角标监听函数
				cartStore.getItems()
				cartStore.increaseItemQuantity(id)
			},
			fail: (err) => {
				console.log(err);
			}
		})
	};

	// 减少数量
	const decreaseQuantity = (id) => {
		const item = shopdata.value.find(i => i.id === id)
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
						deleteItem(id)
						synchronous(id)
						cartStore.getItems()
						cartStore.decreaseItemQuantity(id)
						conbutton.value = false
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
					cartStore.getItems()
					cartStore.decreaseItemQuantity(id)
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
	};

	// 选中切换
	const toggleSelection = (id) => {
		console.log(id, '我是点击切换的商品id-204');
		selectedMap[id] = !selectedMap[id];
	};

	//获取所有的选中id
	const getSelectedIds = () => {
		if (!shopdata.value || !Array.isArray(shopdata.value)) {
			return []
		}
		return shopdata.value.filter(item => selectedMap[item.id]).map(item => item.id)
	}

	//做全选反选逻辑
	const toggleSelectAllOrInvert = () => {
		if (isAllSelected.value) {
			// 已全选，反选
			shopdata.value.forEach(item => {
				selectedMap[item.id] = !selectedMap[item.id]
				console.log(item.id, '101选中标机');
			})
		} else {
			// 未全选，全选
			shopdata.value.forEach(item => {
				selectedMap[item.id] = true
			})
		}
	}

	//提交逻辑
	const submitSelected = (id) => {
		const selectedIds = getSelectedIds()
		if (selectedIds.length === 0) {
			uni.showToast({
				title: '请先选择商品',
				icon: 'none'
			})
			return
		}
		let param = ''
		if (selectedIds.legth === 1) {
			param = selectedIds[0]
		} else {
			param = JSON.stringify(selectedIds)
		}
		uni.navigateTo({
			url: `/pages/goodsOrder/goodsOrder?option=${param}`
		})
	}

	// 删除商品
	const deleteItem = (id) => {
		const item = shopdata.value.find(i => i.id === id)
		if (!item) {
			uni.showToast({
				title: '请刷新重试',
				icon: 'error'
			})
		}

		//删除的提示
		uni.showModal({
			title: '警告',
			content: '确定删除吗',
			success: (res) => {
				if (res.confirm) {
					uni.request({
						url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
						method: 'DELETE',
						success: (res) => {
							uni.showToast({
								title: '删除成功'
							})
							//并且将本地storage中对应的数据删除 也要更新页面中
							synchronous(id)
						}
					})
				} else {
					console.log('用户取消删除');
				}
			}
		})
	};

	//同步本地数据
	const synchronous = (id) => {
		// 1. 删除本地内存数据
		const index = shopdata.value.findIndex(i => i.id === id);
		if (index !== -1) {
			shopdata.value.splice(index, 1);
		}

		// 2. 更新本地缓存
		uni.setStorage({
			key: 'orderData',
			data: shopdata.value,
			success: () => {
				console.log('本地缓存更新成功');
			},
			fail: () => {
				console.error('本地缓存更新失败');
			}
		});
	}

	// 触摸开始
	// 触摸事件处理
	const handleTouchStart = (e, id) => {
		startXMap[id] = e.touches[0].clientX;

		// 关闭其他商品的滑动状态
		for (const key in swipedMap) {
			if (key !== id) {
				swipedMap[key] = false;
			}
		}
	};

	const handleTouchMove = (e, id) => {
		e.preventDefault() //阻止页面滚动

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
		// 可添加惯性滑动效果，这里简单处理
	};

	//下单选中数据变量
	const SelectedOrderData = ref([])

	// 进入购物车后请求数据
	const getShopData = (id) => {
		// const isnull = uni.getStorageSync('orderData'&&'idCounter')
		// if(isnull){
		// 	//清空后端数据
		// }
		uni.request({
			url: id ? `${baseurl}/items/${id}` : `${baseurl}/items`,
			method: 'GET',
			success: (res) => {
				console.log(res.data, '拿到了hhh');
				shopdata.value = res.data
				let cratList = []
				if (Array.isArray(res.data)) {
					cratList = res.data
				} else if (res.data && typeof res.data === 'object') {
					cratList = [res.data]
				} else {
					uni.showToast({
						title: '数据格式异常',
						icon: 'error'
					});
					console.error('接口返回数据格式不正确', res.data);
					return;
				}
				shopdata.value = cratList
				// 初始化选中状态
				cratList.forEach(item => {
					if (!(item.id in selectedMap)) selectedMap[item.id] = false;
					if (!(item.id in swipedMap)) swipedMap[item.id] = false;
					if (!(item.id in startXMap)) startXMap[item.id] = 0;
				});
			},
			fail: (err) => {
				console.log(err);
			}
		})
	}
	
	//购物车为空是的goHome
	const goHome = () =>{
		uni.reLaunch({
			url:"/pages/index/index"
		})
	}

	//拿到最新公共数据
	const changeiconnum = () => {
		cartStore.getItems()
	}

	onShow(() => {
		getShopData()
		changeiconnum()
	})

	onLoad((options) => {
		getShopData(options.option)
		console.log(options.option, 'id');

	})
</script>

<style>
	.containner {
		overflow-x: hidden;
		margin-top: 190rpx;
	}
	
	.shopData-box{
		height: 100%;
		padding: 6rpx;
	}

	.product-section {
		background-color: #fff;
		padding: 20rpx;
		margin: 20rpx 0;
		border: 1px solid aliceblue;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		position: relative;
		transition: transform 0.3s ease;
		transform: translateX(0);
	}
	
	.product-section:nth-last-child(1) {
		margin-bottom:120rpx ;
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

	.product-price_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product-price {
		color: #ff5000;
		font-size: 30rpx;
		margin-bottom: 20rpx;
		margin-left: 15rpx;
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
		right: -128rpx;
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

	.allcheck {
		width: 100%;
		height: 140rpx;
		background-color: #fbfbfb;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
	}

	.comfirmbox {
		width: 90%;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.okbtn {
		width: 35%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 15rpx;
		background-color: black;
		color: white;
		font-weight: 500;
		font-size: 38rpx;
		text-align: center;
	}

	/* 给组件设置宽高和背景色方便调试 */
	.goods-nav {
		width: 100%;
	}
	
	/* 清空购物车的页面 */
	.shopdataNone_box{ 
		width: 100%;
		margin-top: 200rpx;
	}
	
	.shopdataNone_imgbox {
		width: 30%;
		height: 200rpx;
		margin: 100rpx auto;
		text-align: center;
	}
	
	.shopdataNone_imgbox image{
		width: 100%;
		height: 100%;
	}
	
	.Catrnone {
		font-size: 28rpx;
		color: #ccc;
		margin-top: 20rpx;
	}
	
	.backorderbtn {
		width: 300rpx;
		height: 70rpx;
		text-align: center;
		line-height:70rpx;
		border-radius: 45rpx;
		background-color: black;
		margin: 0 auto;
	}
	
	.backtext {
		color: white;
		font-size: 32rpx;
	}
</style>