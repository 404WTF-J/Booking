<template>
	<CustomNav :myValue="propsValue"></CustomNav>
	<view class="containner" v-if="coursepackData">
		<view class="coursePackBox">
			<view class="coursePackswiper">
				<swiper class="swiperBox" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item">
							<image :src="coursepackData.corusepackebanner" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="coursePackDescBox">
			<view style="">{{coursepackData.corusepackedesc}}</view>
			<view style="display: flex;justify-content: space-between;margin-top: 30rpx;
	font-weight: 300;">
				<view class="">
					¥{{coursepackData.corusepackeprice}}.00
				</view>
				<view class="">
					有效期：{{coursepackData.corusepackesxpriation}}年
				</view>
			</view>
		</view>

		<view class="memberdetailsBox">
			<view class="memberSelect">
				<view :class="['memberx', { active: selectedIndex === 1 }]" @click="handclick(1)">包含课程
					<view v-if="selectedIndex === 1" class="underline"></view>
				</view>
				<view :class="['memberg',{active:selectedIndex === 2 }]" @click="handclick(2)">使用说明
					<view v-if="selectedIndex === 2" class="underline"></view>
				</view>
			</view>
			<!-- 点击上方选择当selectedIndex为1时 -->
			<view class="memberzhnashi" v-if="selectedIndex === 1">
				<!-- 点击预约时根据点击的目标展示对应的模块 -->
				<view class="memberData" v-for="(item,index) in courseDeatalisData" :key='index'
					v-if="courseDeatalisData" @click="gocoursepackzhanshi(item)">
					<view class="memberImg">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="memberText1">
						<view>{{item.project}}</view>
						<view style="text-decoration:line-through;font-size: 28rpx;color: #666;">
							¥{{item.price}}</view>
						<view>总次数：{{item.frequency}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<Custonfooter></Custonfooter>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	import {
		onLoad
	} from '@dcloudio/uni-app';
	import CustomNav from "@/components/customizenav.vue"
	import Custonfooter from "@/components/customfooter.vue"

	const coursepackData = ref({});
	const courseDeatalisData = ref({})
	const propsValue = ref('课程包详情');
	const selectedIndex = ref(1);

	const handclick = (index) => {
		selectedIndex.value = index
	}
	const gocoursepackzhanshi = (res) => {
		const params = JSON.stringify(res)
		console.log(params);
		uni.navigateTo({
			url: `/pages/corsePackzhanshi/corsePackzhanshi?option=${params}`
		})
	}

	onLoad((option) => {
		coursepackData.value = JSON.parse(decodeURIComponent(option.option));
		courseDeatalisData.value = coursepackData.value.data
		// console.log(coursepackData);
	})
</script>

<style>
	.containner {
		overflow: hidden;
		box-sizing: border-box;
	}

	.coursePackBox {
		height: 500rpx;
		margin-top: 20rpx;
	}

	.coursePackswiper {
		height: 500rpx;
	}

	.swiperBox {
		height: 500rpx;
	}

	.swiper-item {
		display: block;
		height: 500rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

	.coursePackDescBox {
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* 选项卡样式 */
	.memberdetailsBox {}

	.memberBox {
		height: 300rpx;
	}

	.memberQx,
	.memberCx {
		width: 95%;
		height: 300rpx;
		border-radius: 30rpx;
		background-color: white;
		margin: 10rpx auto;
		display: flex;
		align-items: center;
	}

	.memberimg {
		width: 400rpx;
		height: 240rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
	}

	.memberimg image {
		width: 100%;
		height: 100%;
	}

	.memberText {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 30rpx;
	}

	.membername {
		font-size: large;
	}


	.memberSelect {
		display: flex;
		justify-content: space-around;
		height: 100rpx;
		align-items: center;
	}

	.memberzhnashi {
		height: 100vh;
	}

	.memberData {
		padding: 20rpx;
		display: flex;
	}

	.memberImg {
		width: 300rpx;
		height: 200rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.memberImg image {
		width: 100%;
		height: 100%;
	}

	.memberText1 {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 30rpx;
	}

	.memberx,
	.memberg,
	.memberdetail {
		position: relative;
	}

	.active {
		font-weight: bold;
		color: #000;
		font-size: 35rpx;
	}

	.underline {
		position: absolute;
		bottom: -8rpx;
		left: 40%;
		width: 20%;
		height: 4rpx;
		background-color: #000;
		transition: left 0.3s ease;
	}
</style>