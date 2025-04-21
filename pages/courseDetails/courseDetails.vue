<template>
	<view class="containner" v-if="courseDeta_data">
		<!-- 自定义navbar -->
		<CustomNav :myValue="courseText"></CustomNav>
		
		<view class="courseDetailsimg" >
			<image :src="courseDeta_data.img || courseDeta_data.memberimg" mode="aspectFill"></image>
		</view>
		<view class="courseDetailsDesc" >
			<view style="font-weight: 500;color: #f7630b;margin:10rpx 0 15rpx 10rpx">
				¥{{courseDeta_data.price}}
			</view>
			<view style="font-weight: 500;margin:10rpx 0 15rpx 10rpx">
				{{courseDeta_data.project}}
			</view>
			<view style="font-weight: 300;margin:10rpx 0 15rpx 10rpx">
				次数：{{courseDeta_data.frequency}}
			</view>
		</view>

	</view>
	<!-- 自定义footbar -->
	<view class="footBar">
		<view class="iconbox">
			<view class="home" @click="gohome">
				<uni-icons type="home" size="25"></uni-icons>
				<text>首页</text>
			</view>
			<button class="share" @click="Toshare" open-type="share">
				<uni-icons type="redo" size="25"></uni-icons>
				<text>分享</text>
			</button>
		</view>
		<view class="buybtn" @click="gospin(courseDeta_data)">
			立即预约
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
	import CustomNav from "@/components/customizenav.vue"
	const courseDeta_data = ref(null)
	const courseText = ref('课程详情')


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
	
	const gospin =(res)=>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/spinClass/spinClass?option=${parmas}`
		})
	}
	onLoad((options) => {
		courseDeta_data.value = JSON.parse(decodeURIComponent(options.option))
		console.log(courseDeta_data);
	})
</script>

<style>
	.containner {
		height: 100vh;
	}

	.courseDetailsimg {
		width: 100%;
		overflow: hidden;
		margin-top: 200rpx;
	}

	.courseDetailsimg image {
		width: 100%;
	}

	.courseDetailsDesc {
		margin: 20rpx;
		border-radius: 20rpx;
		background-color: whitesmoke;
		box-sizing: border-box;
		padding: 10rpx;
	}


	/* 底部bar */
	.footBar {
		height: 140rpx;
		background-color: #fbfbfb;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: sticky;
		bottom: 0;
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