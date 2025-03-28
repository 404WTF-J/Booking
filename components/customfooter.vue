<template>
	<view class="footBar">
		<view class="iconbox">
			<view class="home" @click="gohome">
				<uni-icons type="home" size="25"></uni-icons>
				<text>首页</text>
			</view>
			<button class="share" @click="Toshare" open-type="share"
				style="background: none; border: none; padding: 0; margin: 0;">
				<uni-icons type="redo" size="25"></uni-icons>
				<text>分享</text>
			</button>
		</view>
		<view class="buybtn" @click="order">
			立即购买
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	import {
		onLoad,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import utils from "@/common/utils/utils.js";
	import CustomNav from "@/components/customizenav.vue"

	const gohome = () =>{
		uni.reLaunch({
			url:'/pages/index/index'
		})
	}
	const Toshare = () => {
		uni.showShareMenu({
			title: "baga",
			path: "/pages/member/member",
			success: (res) => {
				console.log(res);
			},
			fail: (res) => {
				console.log(res);
			}
		})
	}
</script>

<style>
	/* 底部bar */
	.footBar {
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

	.iconbox {
		width: 40%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.share {
		/* display: contents; */
	}

	.share::after {
		border: none;
		background-color: none;
		padding: 0;
		margin: 0;
	}

	.buybtn {
		width: 40%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 15rpx;
		background-color: black;
		color: white;
		font-weight: 500;
		font-size: 38rpx;
		text-align: center;
	}
</style>