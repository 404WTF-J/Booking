<template>
	<!-- 自定义nav -->
	<view class="CustomizeNav">
		<view class="uicon" @click="back">
			<uni-icons type="back" size="25"></uni-icons>
		</view>
		<view class="customcard">{{title}}</view>
	</view>
	<view>
		
	</view>
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
	import CustomFooter from "@/components/customfooter.vue"
	import utils from '@/common/utils/utils.js';
	
	const title = ref('我的')
	const back = () => {
		uni.reLaunch({
			url:'/pages/index/index'
		})
	};
</script>

<style>
/* 自定义navcss */
.CustomizeNav {
		height: 80rpx;
		display: flex;
		box-sizing: border-box;
		margin-top: 100rpx;
		font-weight: 500;
		font-size: 35rpx;
		color: black;
		justify-content: space-evenly;
		align-items: center;
		position: relative;
	}

	.uicon {
		position: absolute;
		left: 10rpx;
		top: 0;
	}
</style>
