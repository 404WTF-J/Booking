<template>
	<view class="popupTukebox" v-if="data">
		<view class="courseDetailsimg">
			<image :src="data.img || courseDeta_data.memberimg" mode="aspectFill"></image>
		</view>
		<view class="courseDetailsDesc" v-if="data">
			<view style="font-weight: 500;color: #f7630b;margin:10rpx 0 15rpx 10rpx">
				¥{{data.price}}
			</view>
			<view style="font-weight: 500;margin:10rpx 0 15rpx 10rpx">
				{{data.tech}}
			</view>
			<view style="font-weight: 300;margin:10rpx 0 15rpx 10rpx">
				课程难度：<span v-for="(item,index) in data.difficulty" :key="index">:★</span>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		defineProps
	} from 'vue';

	import {
		onLoad,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	// const data = ref(null)

	const props = defineProps({
		data: {
			type: Object,
			required: true
		},
	});
	console.log(props);
	onLoad(() => {

	})
</script>

<style>
	.popupTukebox {
		background-color: white;
		height: 800rpx;
		border-radius: 30rpx 30rpx 0 0;
		margin-bottom: -70rpx;
	}

	.courseDetailsimg {
		width: 100%;
		overflow: hidden;
		margin-top: 20rpx;
		border-radius: 30rpx;
		position: relative;
	}

	.courseDetailsimg image {
		width: 100%;
	}

	.yuyuebtn{
		position: absolute;
		right:0;
		
	}
	
	.courseDetailsDesc {
		margin: 20rpx;
		border-radius: 20rpx;
		background-color: whitesmoke;
		box-sizing: border-box;
		padding: 10rpx;
	}
</style>