<template>
	<view class="checkinstru">
		<view class="decscript">
			<view class="dectext">会员卡</view>
			<view class="checkbtn" @click='checkmorefn'>查看更多</view>
		</view>
		<view class="memberBox" v-if="selectT === 1">
			<view class="memberQx" @click="goMember_details(memberqixian,publicData,1)" v-if="memberqixian,publicData" :index='1'>
				<view class="memberimg">
					<image :src="publicData.memberbackimg" mode=""></image>
					<view style="position:absolute;left: 10rpx;top: 10rpx;color:white">{{memberqixian.othername}}</view>
					<view style="position:absolute;right: 10rpx;bottom:15rpx;color:white">有效期：{{memberqixian.expriation}}</view>
				</view>
				<view class="memberText">
					<view class="membername">{{memberqixian.name}}</view>
					<view class="membername">¥{{memberqixian.price}}</view>
				</view>
			</view>
			<view class="memberCx" @click="goMember_details(membercishu,publicData,2)" v-if="membercishu,publicData" :index="2">
				<view class="memberimg">
					<image :src="publicData.memberbackimg" mode=""></image>
					<view style="position:absolute;left: 10rpx;top: 10rpx;color:white">{{membercishu.othername}}</view>
					<view style="position:absolute;right: 20rpx;bottom:15rpx;color:white">有效期：{{membercishu.expriation}}</view>
				</view>
				<view class="memberText">
					<view class="membername">{{membercishu.name}}</view>
					<view class="membername">¥{{membercishu.price}}</view>
				</view>
			</view>
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
	const selectT = ref(1);
	const memberqixian = ref({})
	const membercishu = ref({})
	const publicData = ref({})
	const index = ref(1)
	//选项卡
	const selectTab=(opt)=>{
		selectT.value = opt;
		console.log(opt);
	}
	//初始化处理数据
	const initMemberData = () => {
		utils.request({
			url:'/member',
			success:(res)=>{
				publicData.value = res[0].data[0].public[0]
				memberqixian.value = res[0].data[0].qixianka[0]
				console.log(memberqixian);
				membercishu.value = res[0].data[0].cika[0]
				console.log(membercishu);
			}
		})
	}
	
	//点击跳转详情页面
		const goMember_details = (res,res1,index) => {
			let params
			if (index === 1) {
				params = Object.assign({}, res,res1)
				console.log(params);
			}else{
				params = Object.assign({}, res,res1)
				console.log(params);		
			}
			
			// 将对象属性转换为 URL 参数
			// const queryParams = Object.keys(params).
			// map(key=>`${key}=${encodeURIComponent(params[key])}`).
			// join('&');
			// 将对象转换为 JSON 字符串
			
			const queryParams = JSON.stringify(params);
			console.log(queryParams);
			uni.navigateTo({
	// 但 params 是一个对象，直接将对象放入 URL 中会导致它被转换为字符串 [object Object]
				url:`/pages/memberdetails/memberdetails?option=${queryParams}`
			})
		}
		
		const checkmorefn =()=>{
			uni.switchTab({
				url:"/pages/member/member"
			})
		}
	onMounted(()=>{
		initMemberData()
	})
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

	.memberBox{
		width: 100%;
		height: 100vh;
		/* margin: 20rpx; */
		background-color: #f7f5fc;
		overflow: hidden;
	}
	.active{
		font-weight: bold; /* 加粗字体 */
		border-bottom: 2px solid #666666; /* 添加底部边框 */
		color: #e6e6e6; /* 改变字体颜色 */
	}
	.memberQx,
	.memberCx{
		width: 95%;
		height: 300rpx;
		border-radius: 30rpx;
		background-color: white;
		margin: 20rpx 0rpx;
		display: flex;
		align-items: center;
	}
	.memberimg{
		width: 400rpx;
		height: 240rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
	}
	.memberimg image{
		width: 100%;
		height: 100%;
	}
	.memberText{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 30rpx;
	}
	.membername{
		font-size: large;
	}
</style>