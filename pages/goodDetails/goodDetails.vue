<template>
	<CustomNav :myValue="myValue"></CustomNav>
	<view class="containner">
		<view class="swiperbox">
			<swiper class="swiperbox" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image :src="goodData.img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="padding:20rpx">
			<view class="goodDescBox" v-if="goodData">
				<view class="goodDesc jiange">
					<view class="goodprice">
						<text class="newPrice">¥{{goodData.newprice}}</text>
						<text class="oldPrice">¥{{goodData.oldprice}}</text>
					</view>
					<view class="goodKucun">
						<text class="kucun">库存：{{goodData.kucun}}</text>
						<text class="yishou">已售：{{goodData.yishou}}</text>
					</view>
				</view>
				<view class="goodname jiange">{{goodData.goodname}}</view>
				<view class="freight jiange">
					<text>运费</text>
					<text>全国包邮</text>
				</view>
			</view>
			<view class="goodDescBox">
				<view class="goodname jiange">商品描述</view>
				<view class="descri jiange">
					{{goodData.gooddescrtion}}
				</view>
			</view>
			<view class="goodDescBox">
				<view class="goodname jiange">购买须知</view>
				<view class="descri jiange">
					{{goodData.goodxuzhi}}
				</view>
			</view>
		</view>
		<!-- 购物车入口 -->
		<view class="shoppingCrat" v-if="show" @click="shopentrance(goodData)">
			<uni-icons type="cart-filled" size="50"></uni-icons>
		</view>
		<!-- 底部nav -->
		<view class="goods-nav-box">
			<uni-goods-nav class="goods-nav" :fill="true" :options="cartoptions" :buttonGroup="buttonGroup"
				@click="cartPage()" @buttonClick="(e) => buttonClick(e, goodData)" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		watch
	} from 'vue';

	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import utils from "@/common/utils/utils.js"
	import CustomNav from "@/components/customizenav.vue"
	import CustomFooter from "@/components/customfooter.vue"
	import {
		useCartStore
	} from "@/store/cart.js";
	const cartStore = useCartStore()
	
	const allQuantity = ref(0)
	const myValue = ref('商品详情')
	const goodData = ref({})
	const show = ref(false);
	// 购物车组件数据
	const cartoptions = ref([{
			icon: 'headphones',
			text: '客服'
		},
		{
			icon: 'shop',
			text: '店铺',
			infoBackgroundColor: '#007aff',
			infoColor: "white"
		},
		{
			icon: 'cart',
			text: '购物车',
			infoBackgroundColor: '#fc0000',
			infoColor: "white",
			info: 0
		}
	])

	const buttonGroup = ref([{
			text: '加入购物车',
			backgroundColor: '#ffa200',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#ff0000',
			color: '#fff'
		}
	])

	//改变角标逻辑
	const changeQuantity = () =>{
		sentUrl({
			method: 'GET',
			path: '/items'
		}).then(res => {
			console.log(res, '我是旧的的数据');
			allQuantity.value = res.reduce((sum, item) => sum + item.quantity, 0)
			cartoptions.value[2].info = allQuantity.value
			console.log(allQuantity, '我是所有新数据quantity数量总和');
		})
	}
	

	const buttonClick = (e, goodData) => {
		if (e.content.text === '加入购物车') {
			shopentrance(goodData)
		} else {
			clickbuy(goodData)
			// orderpage(goodData.id)
		}
	}


	//定义的新接口地址
	const CART_API = 'http://192.168.31.73:3000/cart';

	// 初始化购物车数据（兼容新旧结构）
	let orderDatas = {
		code: 200,
		message: "success",
		data: []
	};

	// 从本地存储恢复ID计数器
	let idCounter = 1

	// 从服务器拉取购物车数据，更新本地缓存和内存数据
	const syncOrderDataFromServer = async () => {
		try {
			const res = await sentUrl({
				method: 'GET',
				path: '/items'
			});

			console.log('购物车接口返回数据:', res);

			if (res && Array.isArray(res.data)) {
				orderDatas.data = res.data;
			} else if (Array.isArray(res)) {
				// 如果接口直接返回数组
				orderDatas.data = res;
			} else {
				orderDatas.data = [];
			}

			uni.setStorageSync('orderData', orderDatas);

		} catch (error) {
			console.error('同步购物车数据失败', error);
			// 失败时保持本地数据不变
		}
	};
	
	//点击加购的处理
	const shopentrance = async (res) => {
		show.value = true;
		try {
			await syncOrderDataFromServer()
			console.log('同步后购物车数据:', orderDatas.data.goodname);
			console.log('待添加商品名称:', res.goodname);

			// 检查商品是否已存在（先在本地检查）
			const existingIndex = orderDatas.data.findIndex(
				item => item.goodname.trim().toLowerCase() === res.goodname.trim().toLowerCase()
			);
			console.log('妈的没有', existingIndex);
			if (existingIndex === -1) {
				// 新增商品
				const newItem = {
					id: idCounter++,
					goodname: res.goodname,
					goodprice: res.newprice,
					goodimg: res.img,
					quantity: 1,
				};

				// 3. 先同步到服务器
				const postRes = await sentUrl({
					method: 'POST',
					path: '/items',
					data: newItem
				})
				
				// 本地添加
				orderDatas.data.push(postRes);
				// 先保存ID避免重复
				uni.setStorageSync('idCounter', idCounter);
				uni.setStorageSync('orderData', orderDatas);
				goodData.value.id = postRes.id;  // 赋值新id
				uni.showToast({
					title: '前往购物车..',
					icon: 'success'
				});
				changeQuantity()
				console.log(orderDatas, '我有了');
				
				//跳转到购物车
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/shoppingCart/shoppingCart?option=${postRes.id}`
					})
				}, 2000)
			} else {
				// 更新数量
				const updatedItem = {
					...orderDatas.data[existingIndex],
					quantity: orderDatas.data[existingIndex].quantity + 1
				};
				console.log(updatedItem.id, `di${updatedItem}`);
				// 本地更新
				orderDatas.data[existingIndex] = updatedItem;

				// 同步到服务器
				const patchRes = await sentUrl({
					method: 'PATCH',
					path: `/items/${updatedItem.id}`,
					data: {
						quantity: updatedItem.quantity
					}
				});
				console.log('我是谁', patchRes);
				// 4. 更新本地数据和缓存
				orderDatas.data[existingIndex] = patchRes.data || patchRes;
				uni.setStorageSync('orderData', orderDatas);
				// 服务器返回成功后更新本地
				uni.showToast({
					title: '商品数量已更新'
				});
				changeQuantity()
			}
		} catch (error) {
			console.error('操作失败:', error);
			uni.showToast({
				title: '操作失败',
				icon: 'error',
				duration: 1000
			});
		}
	};

	//点击立即购买处理
	const clickbuy = async (res)=>{
		try {
			await syncOrderDataFromServer()
			console.log('同步后购物车数据:', orderDatas.data.goodname);
			console.log('待添加商品名称:', res.goodname);
		
			// 检查商品是否已存在（先在本地检查）
			const existingIndex = orderDatas.data.findIndex(
				item => item.goodname.trim().toLowerCase() === res.goodname.trim().toLowerCase()
			);
			console.log('妈的没有', existingIndex);
			if (existingIndex === -1) {
				// 新增商品
				const newItem = {
					id: idCounter++,
					goodname: res.goodname,
					goodprice: res.newprice,
					goodimg: res.img,
					quantity: 1,
				};
		
				// 3. 先同步到服务器
				const postRes = await sentUrl({
					method: 'POST',
					path: '/items',
					data: newItem
				})
				
				// 本地添加
				orderDatas.data.push(postRes);
				// 先保存ID避免重复
				uni.setStorageSync('idCounter', idCounter);
				uni.setStorageSync('orderData', orderDatas);
				goodData.value.id = postRes.id;  // 赋值新id
				uni.showToast({
					title: '前往下单页..',
					icon: 'success'
				});
				// changeQuantity()
				console.log(orderDatas, '我有了');
				
				//跳转到购物车
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/goodsOrder/goodsOrder?option=${postRes.id}`
					})
				}, 2000)
			} else {
				uni.navigateTo({
					url: `/pages/goodsOrder/goodsOrder?option=${orderDatas.data[existingIndex].id}`
				})
			}
		} catch (error) {
			console.error('操作失败:', error);
			uni.showToast({
				title: '操作失败',
				icon: 'error',
				duration: 2000
			});
		}
	}
	
	// 发送请求到cart-db.json
	const sentUrl = ({
		method,
		path,
		data
	}) => {
		return new Promise((resolve, reject) => {
			const fullUrl = `${CART_API}${path}`;
			console.log('🛒 购物车请求:', {
				method,
				url: fullUrl,
				data
			});
			uni.request({
				url: fullUrl,
				method,
				header: {
					'Content-Type': 'application/json',
					'X-Request-Source': 'mini-program'
				},
				data: JSON.stringify(data),
				success: (res) => {
					console.log(`📩 响应状态: ${res.statusCode}`, res.data);
					if (res.statusCode >= 200 && res.statusCode < 300) {
						resolve(res.data)
					} else {
						reject(new Error(`购物车操作失败: ${res.statusCode}`));
					}
				},
				fail: (err) => {
					console.error('🛒 请求异常:', err);
					reject(new Error('网络连接失败，请检查后重试'));
				}
			});
		});
	};

	//前往购物车页面
	const cartPage = () => {
		cartStore.getItems()
		uni.navigateTo({
			url: `/pages/shoppingCart/shoppingCart`
		})
	}
	//前往下单页面
	const orderpage = (id) => {
		// const parmas = JSON.stringify(id)
		console.log(id);
		if(!id){
			uni.showToast({ title: '商品ID不存在，无法下单', icon: 'none' });
			return;
		}
		uni.navigateTo({
			url: `/pages/goodsOrder/goodsOrder?option=${id}`
		})
	}

	onLoad((options) => {
		goodData.value = JSON.parse(options.option)
		console.log(goodData)
	})

	onShow(() => {
		changeQuantity()
	})
</script>

<style>
	.containner {
		height: 100vh;
		/* padding: 20rpx; */
		background-color: #f7f7f7;
		position: relative;
		margin-top: 200rpx;
	}

	/*  购物车*/
	.shoppingCrat {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #efecea;
		position: absolute;
		bottom: 30%;
		right: 40rpx;
		text-align: center;
		line-height: 100rpx;
	}

	.swiperbox {
		width: 100%;
		height: 400rpx;
	}

	.swiper-item {
		width: 100%;
		height: 400rpx;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

	.goodDescBox {
		padding: 20rpx;
		background-color: white;
		border-radius: 30rpx;
		margin: 20rpx;
	}

	.jiange {
		margin-bottom: 20rpx;
	}

	.goodDesc,
	.freight {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goodprice {
		width: 40%;
	}

	.newPrice {
		margin-right: 20rpx;
		color: #fd8008;
		font-size: 35rpx;
		font-weight: 400;
	}

	.oldPrice {
		font-size: 25rpx;
		font-weight: 200;
		text-decoration: line-through;
	}

	.goodKucun {}

	.goodname {
		font-size: 40rpx;
	}

	.kucun,
	.yishou {
		font-size: 30rpx;
		font-weight: 400;
		margin-right: 10rpx;
	}

	/* 底部 */
	.goods-nav-box {
		/* 给外层容器设置宽高，确保组件有空间 */
		width: 100%;
		height: 160rpx;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		border: 1px solid #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 给组件设置宽高和背景色方便调试 */
	.goods-nav {
		width: 100%;
	}
</style>