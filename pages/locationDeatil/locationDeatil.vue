<template>
	<view class="container">
		<!-- 地图容器 -->
		<view class="map-container" :style="{height:mapHeight+'px'}">
			<map id="bmap" :latitude="staLatitude" :longitude="staLongitude" :scale="scaleMap" show-location="true"
				style="width: 100%; height: 1000rpx;">
			</map>
			<!-- 返回按键 -->
			<view class="backbtn" @click="goback">
				<uni-icons type="back" size="25" color="black"></uni-icons>
			</view>
		</view>

		<!-- 底部信息栏 -->
		<!-- 信息模块 -->
		<view class="info-container" :style="{ height: infoHeight + 'px' }" @touchstart="handleTouchStart"
			@touchmove="handleTouchMove" @touchend="handleTouchEnd">
			<view class="handle-bar"></view>
			<view class="info-content">
				<text>{{ locationInfo }}</text>
				<button @click="startNavigation">导航</button>
				<button @click="addToFavorites">收藏</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";

	// 引入本地百度地图 SDK
	const bmap = require('../../libs/bmap-wx.js');

			// 初始化地图相关参数
			const staLatitude = ref(34.22259); // 默认纬度（西安一店）
			const staLongitude = ref(108.94878); // 默认经度（西安一店）
			const scaleMap = ref(15); // 地图缩放级别
			const locationInfo = ref('西安一店 小寨 距你3公里 16分钟'); // 位置信息

			// const viewportHeight = ref(0);
			// 百度地图 API Key
			const akApi = 'CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y';

			// 初始化地图
			// const initmap = () => {
			// 	// 初始化百度地图实例
			// 	const BMap = new bmap.BMapWX({
			// 		ak: akApi,
			// 	});
			// 	console.log(BMap)
			// 	// 获取地图实例
			// 	BMap.getMap({
			// 		success: (res) => {
			// 			console.log('地图初始化成功', res);
			// 			const map = res.bMap;

			// 			// 添加标记
			// 			const point = new map.Point(staLongitude.value, staLatitude.value);
			// 			const marker = new map.Marker(point);
			// 			map.addOverlay(marker);

			// 			// 获取用户当前位置
			// 			getCurrentLocation(map);
			// 		},
			// 		fail: (err) => {
			// 			console.error('地图初始化失败', err);
			// 		},
			// 	});
			// };

			// // 获取用户当前位置
			// const getCurrentLocation = (map) => {
			// 	const geolocation = new map.Geolocation();
			// 	geolocation.getCurrentPosition((res) => {
			// 		if (res.status === 'BMAP_STATUS_SUCCESS') {
			// 			const userPoint = new map.Point(res.longitude, res.latitude);
			// 			const userMarker = new map.Marker(userPoint);
			// 			map.addOverlay(userMarker);

			// 			// 计算距离
			// 			const distance = getDistance(userPoint, new map.Point(staLongitude.value, staLatitude
			// 				.value));
			// 			locationInfo.value = `西安一店 小寨 距你${distance.toFixed(2)}公里`;

			// 			// 计算导航时间（假设速度为 60 公里/小时）
			// 			const duration = (distance / 60).toFixed(0);
			// 			locationInfo.value += ` ${duration}分钟`;
			// 		} else {
			// 			console.error('获取位置失败');
			// 		}
			// 	});
			// };

			// // 计算两点之间的距离（单位：公里）
			// const getDistance = (point1, point2) => {
			// 	const radLat1 = point1.lat * Math.PI / 180.0;
			// 	const radLat2 = point2.lat * Math.PI / 180.0;
			// 	const a = radLat1 - radLat2;
			// 	const b = point1.lng * Math.PI / 180.0 - point2.lng * Math.PI / 180.0;
			// 	const s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			// 		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			// 	s = s * 6378137.0; // 地球半径（米）
			// 	return s / 1000; // 转换为公里
			// };

			// // 导航功能
			// const startNavigation = () => {
			// 	uni.navigateTo({
			// 		url: `/pages/navigation/navigation?lat=${staLatitude.value}&lng=${staLongitude.value}`,
			// 	});
			// };

			// // 收藏功能
			// const addToFavorites = () => {
			// 	uni.showToast({
			// 		title: '已添加到收藏夹',
			// 		icon: 'none',
			// 	});
			// };


			onLoad(() => {
				// 获取屏幕高度
				const getScreenHeight = () => {
					if (typeof uni !== 'undefined' && uni.getSystemInfoSync) {
						const systemInfo = uni.getSystemInfoSync();
						return systemInfo.windowHeight;
					} else if (typeof window !== 'undefined') {
						return window.innerHeight;
					} else {
						console.error('无法获取屏幕高度');
						return 0;
					}
				};

				// 初始化地图和信息模块高度
				const screenHeight = getScreenHeight();
				const mapHeight = ref(screenHeight * 0.7); // 默认地图高度
				const infoHeight = ref(screenHeight * 0.3); // 默认信息模块高度

				// 手势交互变量
				const startY = ref(0); // 触摸起始位置
				const isDragging = ref(false); // 是否正在拖动

				// 触摸开始
				const handleTouchStart = (event) => {
					startY.value = event.touches[0].clientY;
					isDragging.value = true;
				};

				// 触摸移动
				const handleTouchMove = (event) => {
					if (!isDragging.value) return;

					const currentY = event.touches[0].clientY;
					const deltaY = currentY - startY.value;

					// 计算新的高度
					const newInfoHeight = infoHeight.value - deltaY;
					const newMapHeight = window.innerHeight - newInfoHeight;

					// 限制高度范围
					if (newInfoHeight >= 100 && newInfoHeight <= window.innerHeight - 100) {
						infoHeight.value = newInfoHeight;
						mapHeight.value = newMapHeight;
					}

					// 更新起始位置
					startY.value = currentY;
				};

				// 触摸结束
				const handleTouchEnd = () => {
					isDragging.value = false;

					// 自动吸附到顶部或底部
					if (infoHeight.value > window.innerHeight / 2) {
						infoHeight.value = window.innerHeight - 100; // 全屏
						mapHeight.value = 100;
					} else {
						infoHeight.value = window.innerHeight * 0.3; // 默认高度
						mapHeight.value = window.innerHeight * 0.7;
					}
				};
				
			})
			
			
			
			//返回事件
			const goback=()=>{
				uni.navigateBack({
					url:1
				})
			};
			// 组件挂载时初始化地图
			onMounted(() => {
				initmap();
				if (typeof window !== 'undefined') {
					const height = window.innerHeight;
					console.log('视口高度:', height);
				} else {
					console.error('window 对象未定义');
				}
			});
</script>

<style scoped>
	.container {
		width: 100%;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}

	.map-container {
		width: 100%;
		transition: height 0.3s ease;
		position: relative;
	}

	.backbtn{
		position: absolute;
		left: 0;
		top: 100rpx;
	}
	.info-container {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		transition: height 0.3s ease;
	}

	.handle-bar {
		width: 40px;
		height: 4px;
		background-color: #ccc;
		margin: 10px auto;
		border-radius: 2px;
	}

	.info-content {
		padding: 20px;
		text-align: center;
	}


	button {
		margin: 5px;
		padding: 5px 10px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}
</style>