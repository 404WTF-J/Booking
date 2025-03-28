<template>
	<view class="memberbigbox">
		<view class="memberheader">
			<view class="CustomizeNav">
				<view class="membercard" :class="{active:selectT===1}" @click="selectTab(1)">会员卡</view>
				<view class="membercard" :class="{active:selectT===2}" @click="selectTab(2)">课程包</view>
			</view>
		</view>
		<view class="memberBox" v-if="selectT === 1">
			<view class="memberQx" v-if="memberqixian,publicData" @click="gomemberDetails(memberqixian,publicData,1)" :index='1'>
				<view class="memberimg">
					<image :src="publicData.memberbackimg" mode=""></image>
					<view style="position:absolute;left: 10rpx;top: 10rpx;color:white">{{memberqixian.othername}}</view>
					<view style="position:absolute;right: 10rpx;bottom:15rpx;color:white">
						有效期：{{memberqixian.expriation}}</view>
				</view>
				<view class="memberText">
					<view class="membername">{{memberqixian.name}}</view>
					<view class="membername">¥{{memberqixian.price}}</view>
				</view>
			</view>
			<view class="memberCx" v-if="membercishu,publicData" @click="gomemberDetails(membercishu,publicData,2)" :index='2'>
				<view class="memberimg">
					<image :src="publicData.memberbackimg" mode=""></image>
					<view style="position:absolute;left: 10rpx;top: 10rpx;color:white">{{membercishu.othername}}</view>
					<view style="position:absolute;right: 20rpx;bottom:15rpx;color:white">
						有效期：{{membercishu.expriation}}</view>
				</view>
				<view class="memberText">
					<view class="membername">{{membercishu.name}}</view>
					<view class="membername">¥{{membercishu.price}}</view>
				</view>
			</view>
		</view>
		<view class="membercousrsePackBox"  v-if="selectT === 2">
			<view class="membercousrsePack" v-if="coursepackData" @click="gocoursepackDetails(coursepackData)">
				<view class="membercousrsePackimg">
					<image :src="coursepackData.corusepackebanner" mode=""></image>
				</view>
				<view class="membercousrsePackdecs">
					<view style="font-size:40rpx;margin-left: 10rpx">{{coursepackData.corusepackedesc}}</view>
					<view style="font-weight:400;margin:5rpx 0rpx 5rpx 10rpx">
						有效期:{{coursepackData.corusepackesxpriation}}年</view>
					<view style="margin-left: 10rpx;">¥{{coursepackData.corusepackeprice}}</view>
				</view>
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
	import utils from "@/common/utils/utils.js";
	const selectT = ref(1);
	const memberqixian = ref({})
	const membercishu = ref({})
	const coursepackData = ref({})
	const publicData = ref({})
	const index = ref(1);

	//选项卡
	const selectTab = (opt) => {
		selectT.value = opt;
		console.log(opt);
	}
	//初始化处理数据
	const initMemberData = () => {
		utils.request({
			url: '/member',
			success: (res) => {
				console.log(res[0]);
				publicData.value = res[0].data[0].public[0]
				console.log(publicData);
				memberqixian.value = res[0].data[0].qixianka[0]
				console.log(memberqixian);
				membercishu.value = res[0].data[0].cika[0]
				console.log(membercishu);
				coursepackData.value = res[0].data[0].corusepacke[0]
				console.log(coursepackData);
			}
		})
	}

	//点击跳转详情页面
	const gomemberDetails = (res,res1,index) => {
		let params
		if (index === 1) {
			params = Object.assign({}, res,res1)
			console.log(params);
		}else{
			params = Object.assign({}, res,res1)
			console.log(params);		
		}
		
		// 将对象转换为 JSON 字符串
		const queryParams = JSON.stringify(params);
		console.log(queryParams);
		uni.navigateTo({
// 但 params 是一个对象，直接将对象放入 URL 中会导致它被转换为字符串 [object Object]
			url:`/pages/memberdetails/memberdetails?option=${queryParams}`
		})
	}

	//课程包跳转
	const gocoursepackDetails=(res)=>{
		// const courseP = Object.assign({},coursepackData)
		const courseParams = JSON.stringify(res)
		console.log(courseParams);
		uni.navigateTo({
			url:`/pages/coursePackDeatails/coursePackDeatails?option=${courseParams}`
		})
	}
	
	
	
	onMounted(() => {
		initMemberData()
	})
</script>

<style>
	.memberheader {
		height: 200rpx;
		background-color: black;
		overflow: hidden;
	}

	.CustomizeNav {
		display: flex;
		box-sizing: border-box;
		margin-top: 100rpx;
		color: white;
		justify-content: space-evenly;
		align-items: center;

	}

	.memberbigbox {
		width: 100%;
		height: 100vh;
		background-color: #f7f5fc;
		overflow: hidden;
	}

	.active {
		font-weight: bold;
		/* 加粗字体 */
		border-bottom: 2px solid #666666;
		/* 添加底部边框 */
		color: #e6e6e6;
		/* 改变字体颜色 */
	}

	.memberQx,
	.memberCx {
		width: 95%;
		height: 300rpx;
		border-radius: 30rpx;
		background-color: white;
		margin: 20rpx auto;
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

	.membercousrsePackBox {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: border-box;
		border-radius: 30rpx;
		background-color: #f7f5fc;
	}

	.membercousrsePack {
		width: 48%;
		height: 350rpx;
		border-radius: 30rpx;
		overflow: hidden;
		background-color: white;
		margin: 25rpx;
	}

	.membercousrsePackimg {
		width: 100%;
		height: 200rpx;
	}

	.membercousrsePackimg image {
		width: 100%;
		height: 100%;
	}
</style>