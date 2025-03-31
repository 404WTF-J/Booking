<template>
	<view v-if="memberData" class="containner">
		<CustomNav :myValue="memberText"></CustomNav>
		<view class="memberBox">
			<view class="memberQx" v-if="memberData" :index='1'>
				<view class="memberimg">
					<image :src="memberData.memberbackimg" mode=""></image>
					<view style="position:absolute;left: 10rpx;top: 10rpx;color:white">{{memberData.othername}}</view>
				</view>
				<view class="memberText">
					<view class="membername">{{memberData.name}}</view>
					<view class="membername">¥{{memberData.price}}</view>
				</view>
			</view>
		</view>
		<view class="memberDetails_desc">
			<view class="info-container">
				<view class="info-item">
					<text class="label">有效期：</text>
					<text class="value">{{memberData.expriation}}</text>
				</view>
				<view class="info-item">
					<text class="label">激活方式：</text>
					<text class="value">{{memberData.activeation}}</text>
				</view>
				<view class="info-item">
					<text class="label">可用时段：</text>
					<text class="value">{{memberData.avliabletime}}</text>
				</view>
				<view class="info-item">
					<text class="label">使用频率：</text>
					<text class="value">{{memberData.frequency}}</text>
				</view>
				<view class="info-item">
					<text class="label">适用场馆：</text>
					<text class="value">{{memberData.ablePlace}}</text>
				</view>
			</view>
		</view>
		<view class="memberdetailsBox" >
			<view class="memberSelect">
				<view :class="['memberx', { active: selectedIndex === 1 }]" @click="handclick(1)">包含项目
					<view v-if="selectedIndex === 1" class="underline"></view>
				</view>
				<view :class="['memberg',{active:selectedIndex === 2 }]" @click="handclick(2)">购卡须知
					<view v-if="selectedIndex === 2" class="underline"></view>
				</view>
				<view :class="['memberdetail',{active:selectedIndex === 3}]" @click="handclick(3)">会员卡详情
					<view v-if="selectedIndex === 3" class="underline"></view>
				</view>
			</view>
			<!-- 点击上方选择当selectedIndex为1时 -->
			<view class="memberzhnashi"  v-if="selectedIndex === 1">
				<view class="memberData" v-if="memberData.index === 1" @click="gocourseDetails(memberData)">
					<view class="memberImg">
						<image :src="memberData.memberimg" mode=""></image>
					</view>
					<view class="memberText1">
						<view>{{memberData.memberleixin}}</view>
						<view style="text-decoration:line-through;font-size: 28rpx;color: #666;">
							¥{{memberData.oldprice}}</view>
						<view>总次数：{{memberData.cishu}}</view>
					</view>
				</view>
				<!-- 点击预约时根据点击的目标展示对应的模块 -->
				<view class="memberData" v-for="(item,index) in changguiData" :key='index' v-if="memberData.index === 2"
					@click="gocourseDetails(item)">
					<view class="memberImg">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="memberText1">
						<view>{{item.project}}</view>
						<view style="text-decoration:line-through;font-size: 28rpx;color: #666;">
							¥{{item.price}}</view>
						<view>总次数：{{item.frequency}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 点击上方选择当selectedIndex为2时 -->
		<view class="buyCard_notebox" v-if="selectedIndex === 2">
			<view class="buyCard_note">
				<view class="buyCard_noteContainer">
					{{memberData.name}}
				</view>
			</view>
		</view>
		<!-- 点击上方选择当selectedIndex为3时 -->
		<view class="buyCard_notebox" v-if="selectedIndex === 3">
			<view class="buyCard_note">
				<view class="buyCard_noteContainer"></view>
			</view>
		</view>
	
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

	const selectedIndex = ref(1);
	const memberData = ref(null);
	const changguiData = ref({});
	const memberText = ref('会员详情卡')

	const gohome = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	};


	//点击包含项目下的内容跳转课程详情
	const gocourseDetails = (res) => {
		const params = JSON.stringify(res)
		console.log(params);
		uni.navigateTo({
			// url:'/pages/courseDetails/courseDetails'
			url: `/pages/courseDetails/courseDetails?option=${params}`
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



	onLoad((options) => {
		// const memberData = Object.assign({},options)
		// 解析 JSON 字符串为对象
		memberData.value = JSON.parse(decodeURIComponent(options.option));
		// console.log(memberData);
		changguiData.value = memberData.value.data
		// console.log(changguiData);
	})
	const handclick = (index) => {
		selectedIndex.value = index;
		// console.log('点击了' + index);
	}
</script>

<style>
	.containner {
		height: 100vh;
	}

	.memberheader {
		background-color: white;
		overflow: hidden;
	}

	.CustomizeNav {
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

	.memberdetailsBox {}

	.memberBox {
		height: 300rpx;
	}

	.memberQx,
	.memberCx {
		width: 95%;
		height: 300rpx;
		border-radius: 30rpx;
		background-color: white;
		margin: 10rpx auto;
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


	.memberSelect {
		display: flex;
		justify-content: space-around;
		height: 100rpx;
		align-items: center;
	}

	.memberzhnashi {
		height: 100vh;
	}

	.memberData {
		padding: 20rpx;
		display: flex;
	}

	.memberImg {
		width: 300rpx;
		height: 200rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.memberImg image {
		width: 100%;
		height: 100%;
	}

	.memberText1 {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 30rpx;
	}

	.memberx,
	.memberg,
	.memberdetail {
		position: relative;
	}

	.active {
		font-weight: bold;
		color: #000;
		font-size: 35rpx;
	}

	.underline {
		position: absolute;
		bottom: -8rpx;
		left: 40%;
		width: 20%;
		height: 4rpx;
		background-color: #000;
		transition: left 0.3s ease;
	}

	.memberDetails_desc {
		padding: 10rpx;
	}

	.info-container {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	/* 信息项 */
	.info-item {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
	}

	/* 标签样式 */
	.label {
		width: 150rpx;
		/* 适当调整宽度 */
		font-size: 28rpx;
		color: #666;
	}

	/* 值样式 */
	.value {
		flex: 1;
		/* 占据剩余空间 */
		font-size: 30rpx;
		color: #333;
	}

	/* 目标为一时的内容样式 */
	.buyCard_notebox {
		background-color: #cccccc;
		border-radius: 15rpx;
		margin: 20rpx;
	}

	.buyCard_note {
		height: 80rpx;
		padding: 10rpx;
	}

	.buyCard_noteContainer {
		line-height: 80rpx;
	}

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