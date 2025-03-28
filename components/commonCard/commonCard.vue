<template>
	<view class="checkinstru">
		<view class="decscript">
			<view class="dectext">会员卡</view>
			<view class="checkbtn" @click='checkmorefn'>查看更多</view>
		</view>
		<view class="checkCard">
			
		</view>
	</view>
</template>

<script setup>
	import utils from '@/common/utils/utils.js';
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	
	import {
		onLoad
	} from '@dcloudio/uni-app';
	
	
</script>

<style>
	.checkinstru {
		width: 100%;
		position: absolute;
		top: 116%;
		left: 2%;
	}

	.decscript {
		width: 95%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
		align-items: center;
		font-weight: 600;
		text-align: center;
	}

	.checkbtn {
		width: 25%;
		position: relative;
		text-align: center;
	}

	.checkbtn::before {
		content: "";
		width: 20rpx;
		height: 20rpx;
		border: 1px solid black;
		border-left: 0 transparent;
		border-bottom: transparent;
		/* transform: rotate(45deg); */
		transform: translate(0px, 5px) rotate(45deg);
		position: absolute;
		right: 0;
	}

	.checkCard {
		width: 95%;
		border-radius: 20rpx;
		background-color: #fefefe;
		display: flex;
		flex-direction: column;
	}
	
</style>