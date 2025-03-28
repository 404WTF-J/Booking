<template>
	<!-- 自定义navbar -->
	<view class="CustomizeNav">
		<view class="uicon" @click="back">
			<uni-icons type="back" size="25"></uni-icons>
		</view>
		<view class="customcard">{{myValue}}</view>
	</view>
</template>
<script setup>
	import {
		defineProps,
		toRefs
	} from 'vue';

	// 使用 defineProps 定义组件的 props
	const props = defineProps({
		myValue: {
			type: String,
			required: true
		}
	});

	const back = () => {
		uni.navigateBack({
			delta: 1,
		})
	};
</script>

<style>
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