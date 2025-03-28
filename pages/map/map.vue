<template>
	<view class="section">
		<input placeholder="输入关键字" auto-focus type="text" @input="bindKeyInput" />
	</view>
	<view v-if="sugData">
		<text>{{sugData}}</text> 
	</view>
	<view class="map_container">
		<map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" :show-location=showLocation
			:markers="markers" @markertap="makertap" isHighAccuracy='true' @click="onMapTap">
		</map>

		<!-- 用户位置的按钮 -->
		<view class="location_button" @click="goToUserLocation">
			<view class="location_circle">
				<view class="location_point"></view>
			</view>
		</view>
	</view>
	<!-- 显示转换后的地址信息 -->
	<view v-if="rgcData">
		<p>地址：{{ rgcData.address }}</p>
		<p>描述：{{ rgcData.desc }}</p>
		<p>商圈：{{ rgcData.business }}</p>
	</view>
	
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import utils from '@/common/utils/utils.js';

	// 引用百度地图微信小程序JSAPI模块
	const bmap = require('../../libs/bmap-wx.js');

	let wxMarkerData = [];
	let showLocation = false;
	const markers = ref([]);
	const latitude = ref('');
	const longitude = ref('');
	const placeData = ref({});
	const userLatitude = ref(''); // 用户当前位置纬度
	const userLongitude = ref(''); // 用户当前位置经度
	const rgcData = ref({});
	const sugData = ref();
	
	// 绑定输入事件
	const bindKeyInput = (e) => {
		// 新建百度地图对象
		const BMap = new bmap.BMapWX({
			ak: 'CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y'
		});

		const fail = (data) => {
			// console.log(data);
		};

		const success = (data) => {
			console.log(data);
			let sugDataStr = '';
			for (let i = 0; i < data.result.length; i++) {
				sugDataStr += data.result[i].name + '\n';
			}
			sugData.value = sugDataStr; // 更新响应式数据
		};
		sugData.value = null
		// 发起suggestion检索请求
		BMap.suggestion({
			query: e.target.value, // 获取输入框的值
			region: '西安',
			city_limit: true,
			fail: fail,
			success: success
		});

	};

	// 事件：标记点击
	const makertap = (e) => {
		console.log(e);
		const id = e.markerId;
		showSearchInfo(wxMarkerData, id);
		changeMarkerColor(wxMarkerData, id);
	};

	// 更改标记颜色
	const changeMarkerColor = (data, i) => {
		const updatedMarkers = data.map((marker, index) => {
			if (index === i) {
				marker.iconPath = '../../img/marker_yellow.png'; // 被点击的标记变为黄色
			} else {
				marker.iconPath = '../../img/marker_red.png'; // 其他标记保持红色
			}
			return marker;
		});
		markers.value = updatedMarkers;
	};
	const BMap = new bmap.BMapWX({
		ak: 'CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y',
	});
	//初始化map
	const initMap = () => {

		const fail = (data) => {
			console.log(data);
		};

		const success = (data) => {
			// console.log(data.originalData.query_type);
			wxMarkerData = data.wxMarkerData.map((marker) => {
				// 如果 marker 中没有 width 和 height，设置默认值（如30）
				marker.width = marker.widht || 30,
					marker.height = marker.height || 30
				return marker;
			})
			markers.value = wxMarkerData; // 更新标记
			latitude.value = wxMarkerData[0].latitude; // 更新纬度
			longitude.value = wxMarkerData[0].longitude; // 更新经度
			console.log(latitude.value, longitude.value);
		};
		
		// 发起POI检索请求
		BMap.search({
			query: '健身',
			fail: fail,
			success: success,
			iconPath: '../../img/marker_red.png',
			iconTapPath: '../../img/marker_red.png',
		});
	}
	// 显示标记信息
	const showSearchInfo = (data, i) => {
		rgcData.value = {
			address: '地址：' + data[i].address + '\n',
			desc: '描述：' + data[i].desc + '\n',
			business: '商圈：' + data[i].business,
		};
	};
	// 点击地图事件，获取点击位置的经纬度并进行反向地理编码
	const onMapTap = (e) => {
		const {
			latitude: clickedLat,
			longitude: clickedLng
		} = e.detail;
		latitude.value = clickedLat;
		longitude.value = clickedLng;

		// 调用反向地理编码（regeocoding）
		const BMap = new bmap.BMapWX({
			ak: 'CcWHFjHvgR4g0flMG6mGswiMdd0Dpo4Y', 
		});

		const fail = (data) => {
			console.log(data);
		};

		const success = (data) => {
			// console.log(data);
			// console.log(data.originalData.result.formatted_address)
			// 获取第一个返回结果
			rgcData.value = {
				address: data.originalData.result.formatted_address_poi,
				desc: data.originalData.result.formatted_address,
				business: data.originalData.result.business,
			};
		};
		const locationString = `${clickedLat},${clickedLng}`
		// 发起反向地理编码请求
		BMap.regeocoding({
			location: locationString, //传递字符串格式经纬度
			fail: fail,
			success: success,
		});
	};
	
	
	// 定位按钮：回到用户当前位置
	const goToUserLocation = () => {
		console.log(userLatitude.value,userLongitude.value);
		if (userLatitude.value && userLongitude.value) {
			longitude.value = userLongitude.value;
			latitude.value = userLatitude.value;
			markers.value = [{
				id: 0,
				latitude: userLatitude.value,
				longitude: userLongitude.value,
				iconPath: '../../img/marker_red.png',
				width: 30,
				height: 30,
				anchor: { x: 0.5, y: 0.5 }  // 点击中心点对齐
			}];
		} else {
			uni.showToast({
				title: '未获取到位置，请稍后重试',
				icon: 'none',
			});
		}
	};
	onLoad(() => {
		uni.getLocation({
		 type: 'gcj02',
		 success: (res) => {
			 console.log(res);
		 userLatitude.value = res.latitude;
		 userLongitude.value = res.longitude;
		  console.log(userLatitude.value,userLongitude.value);
		 //初始化地图到用户位置 
		 latitude.value = res.latitude;
		 longitude.value = res.longitude;
		 showLocation=true
		 },
		 fail: (err) => {
		 uni.showToast({ title: '获取位置失败', icon: 'none' });
		 }
		 });
	})
	// 页面加载时调用
	onMounted(() => {
		initMap()
	});
</script>

<style>
	.map_container {
		height: 500rpx;
		width: 100%;
		position: relative;
	}

	.map {
		height: 100%;
		width: 100%;
	}

	.location_button {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		padding: 10px;
		background-color: #edf8fa;
		text-align: center;
		position: absolute;
		bottom: 0;
		right: 10rpx;
	}

	.location_circle {
		width: 30rpx;
		height: 30rpx;
		border: 5rpx solid #1b5eed;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.location_point {
		width: 15rpx;
		height: 15rpx;
		border-radius: 50%;
		background-color: #1b5eed;
	}
</style>