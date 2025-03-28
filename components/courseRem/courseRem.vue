<template>
	<view class="checkinstru" >
		<view class="decscript">
			<view class="dectext">课程推荐</view>
			<view class="checkbtn" @click='checkmorefn(data)'>查看更多</view>
		</view>
		<view class="checkCard">
			<view class="courseRemBox" v-if="data" @click="gocourseDeatail(data)">
				<view class="courseRem">
					<view class="courseDesic" >
						<image :src="data.img" mode=""></image>
					</view>
					<view class="courseDesicText">
						{{data.memberleixin}}
					</view>
				</view>
				<view class="coursePrice">
					¥{{data.newprice}}
				</view>
			</view>
			<!-- <view class="courseRemBox">
				<view class="courseRem">
					<view class="courseDesic" v-if="data.cika[0].img">
						<image :src="data.cika[0].img" mode=""></image>
					</view>
					<view class="courseDesicText">
						{{data.cika[0].memberleixin}}
					</view>
				</view>
				<view class="coursePrice">
					¥{{data.cika[0].newprice}}
				</view>
			</view> -->
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
	const data = ref({})
	
	const gocourseDeatail=(res)=>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/courseDetails/courseDetails?option=${parmas}`
		})
	}
	
	const checkmorefn = (res) =>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/courseDetails/courseDetails?option=${parmas}`
		})
	}
	
	const initDatas = () =>{
		utils.request({
			url:"/member",
			success:(res)=>{
				data.value = res[0].data[0].qixianka[0]
				console.log(data,"data");
			},
			faill:(err)=>{
				console.log(err);
			}
		})
	}
	
	onLoad(()=>{
		initDatas()
	})
</script>

<style>
	.checkinstru {
		width: 100%;
		height: 400rpx;
		position: absolute;
		top: 170%;
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

	.courseRemBox{
		text-align: center;
	}
	.checkCard {
		width: 95%;
		border-radius: 20rpx;
		background-color: #fefefe;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.courseDesic {
		width: 330rpx;
		height: 300rpx;
		border-radius: 0 10rpx 0 0;
	}

	.courseDesic image {
		width: 100%;
		height: 100%;
	}

	.courseDesicText {
		font-size: 35rpx;
		margin-top: 10rpx;
	}

	.coursePrice {
		letter-spacing: 2rpx;
		color: #fc974d;
	}
</style>