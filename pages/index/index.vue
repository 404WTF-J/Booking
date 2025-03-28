<template>
	<scroll-view class="content" scroll-y :scroll-top="scrollTop" @scroll="onScroll" :show-scrollbar="false">
		<!-- 背景图 -->
		<view class="banner" v-for="(url,index) in items" :key="index" v-show="!isBannerHidden">
			<image :src="url.img" :alt="url.name" class="bannerimg"></image>
		</view>
		<!-- Fixed Header -->
		<view class="sticky-header" :class="{ 'sticky': isBannerHidden }">
			<popupadd></popupadd>
		</view>
		<!-- 地址卡片 -->
		<view class="adrrescar">
			<view class="headcar">
				<view class="logo">
					<view class="imgbox">
						<image class="logoimg" src="../../static/assest/indexImage/store.jpg" />
					</view>
					<view class="adrrescarText">
						<h4>八嘎呀路</h4>
						<p class="opentime">营业时间:周一到周日08:00--22:00</p>
					</view>
				</view>
				<view class="changestore" @click="TostoreList">
					<uni-icons type="location" size="20" color="black"></uni-icons>
					<p style="font-size: 34rpx;">切换门店</p>
				</view>
			</view>
			<view class="footaddress">
				<view class="addicon">
					<uni-icons type="location" size="22" color="black"></uni-icons>
					<p style="color:#403e3e" @click='getLocation'>西安</p>
				</view>
				<view class="lianxi">
					<view class="wechat">
						<view class="wechatleft">
							<image src="../../static/assest/indexImage/WeChat.jpg" mode=""></image>
						</view>
						<view class="wechatleft">
							<image src="../../static/assest/indexImage/tellphone.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择模块 -->
		<view class="choosebox">
			<view class="soures" v-for="(item,index) in coursedata" :key="item.id" @click="handclick(index)">
				<view class="courseicon">
					<span class="text">{{item.name}}</span>
					<view class="courseicobox">
						<uni-icons type="right" size="23" color="black"></uni-icons>
					</view>
				</view>
				<view class="engtext">{{item.description}}</view>
			</view>
		</view>
		<!-- 教练 -->
		<checkmore class="cheakmore"></checkmore>
		<!-- 会员 -->
		<commondCard></commondCard>
		<!-- 课程推荐 -->
		<courseRem></courseRem>
		<!-- 商品推荐 -->
		<storeRem></storeRem>
	</scroll-view>
</template>

<script setup>
	import utils from '@/common/utils/utils.js';
	import checkmore from "@/components/checkmore/checkmore.vue";
	import popupadd from "@/components/pupopadd/pupopadd.vue";
	import commondCard from "@/components/member/member.vue";
	import courseRem from "@/components/courseRem/courseRem.vue";
	import StoreRem from "@/components/StoreRem/StoreRem.vue";
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	import {
		onLoad
	} from '@dcloudio/uni-app';

	var bmap = import('@/libs/bmap-wx.js'); 
	// 定义滑动数据
	const scrollTop = ref(0); // 当前滚动位置
	const isBannerHidden = ref(false); // 控制banner是否隐藏
	const bannerHideThreshold = 200; // 滑动超过100px后隐藏banner
	const scrollContainer = ref(null); // 滚动容器的 ref
	// 监听滚动事件
	const onScroll = (event) => {
		// console.log(event.detail);
		// 从 event.detail 中获取 scrollTop
		const scrollTopValue = event.detail.scrollTop;
		// 当滚动超过设置的阈值时，隐藏 banner
		isBannerHidden.value = scrollTopValue > bannerHideThreshold;
	};


	const items = ref([]);
	let coursedata = reactive([]);

	//切换门店
	function qiehuan() {
		console.log('qiehaun');
	}

	// 获取banner
	function getBanner() {
		utils.request({
			url: 'banner',
			success: (res) => {
				items.value = res[0].data
				console.log(items.value)
			}
		})
	}

	//获取课程
	function getcourse() {
		utils.request(({
			url: 'course',
			success: (res) => {
				Object.assign(coursedata, res[0].data);
				// coursedata = res[0].data
				console.log(coursedata);
			}
		}))
	}
	//给每个模块添加不同事件
	const handclick = (index) =>{
		if(index<2){
			yuyue()
		}else if(index===2){
			gomember()
		}else{
			about()
		}
	};
	
	function yuyue(){
		uni.switchTab({
			url:"/pages/Booking/Booking"
		})
	}
	function gomember(){
		uni.switchTab({
			url:"/pages/member/member"
		})
	}
	function about(){
		uni.navigateTo({
			url:"/pages/about/about"
		})
	}
	
	function getLocation(){
		uni.navigateTo({
			url:'/pages/locationDeatil/locationDeatil'
		})
	}
	function TostoreList(){
		uni.navigateTo({
			url:"/pages/map/map"
		})
	}
	
	onMounted(() => {
		getBanner()
		getcourse()
	})
</script>

<style>
	@import "index.css"
</style>