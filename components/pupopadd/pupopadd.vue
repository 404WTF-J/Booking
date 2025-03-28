<template>
	<view class="popbox">
		<view class="poptext">
			<p>西安一店</p>
		</view>
		<view style="display: flex; margin-top: 40rpx;justify-content: space-between;">
			<view class="popLocation">
				<uni-icons type="location" size="27" color="white"></uni-icons>
				<view class="locationText">
					<p>西安一店</p>
					<p style="color:#cccfd2;">西安</p>
				</view>
			</view>
			<view class="popchangestore" @click="TostoreList">
				<p>切换门店</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import utils from '@/common/utils/utils.js';
	import checkmore from "@/components/checkmore/checkmore.vue";
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	import {
		onLoad
	} from '@dcloudio/uni-app';
	
	
	function TostoreList(){
		uni.navigateTo({
			url:"/pages/map/map"
		})
	}
</script>

<style>
	.popbox {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: white;
		position: relative;
	}

	.poptext {
		font-size: 40rpx;
		text-align: center;
		padding-top: 75rpx;
	}

	.popLocation {
		display: flex;
		align-items: center;
		justify-content: space-around;
		letter-spacing: 2rpx;
		padding-left: 20rpx;
	}

	.locationText {
		margin-left: 10rpx;
	}

	.popchangestore {
		width: 190rpx;
		height: 70rpx;
		border: 1px solid silver;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		color: #6c6f71;
		margin-right: 15rpx;

	}
</style>