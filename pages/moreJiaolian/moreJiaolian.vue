<template>
	<view class="containner">
		<view class="jiaolianBox" v-for="(item , index) in data" :key="index"
		@click="goyuyue(item)"
		>
			<view class="jiaolianimg">
				<image :src="item.img" class="jlimg"></image>
			</view>
			<view class="jiaoliandesc">
				<view style="font-size: 35rpx;">{{item.name}}</view>
				<view>{{item.description}}</view>
			</view>
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
		onLoad
	} from '@dcloudio/uni-app';
	
	const data = ref()
	
	const goyuyue = (res) =>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/spinClass/spinClass?option=${parmas}`
		})
	}
	
	onLoad((options)=>{
		data.value = JSON.parse(options.option)
		console.log(data);
	})
</script>

<style>
.containner{
	height: 100vh;
	padding: 20rpx;
	background-color: #f5f7f9;
}
.jiaolianBox{
	display: flex;
	padding: 20rpx;
	background-color: white;
	border-radius: 20rpx;
	margin: 20rpx;
}
.jiaolianimg{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	overflow: hidden;
}
.jlimg{
	width: 100%;
	height: 100%;
}
.jiaoliandesc{
	margin-left:30rpx ;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
