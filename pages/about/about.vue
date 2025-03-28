<template>
	<view class="aboutContainer" v-if="aboutData">
		<view class="bannerBox">
			<image src="../../static/assest/courseImage/course3.jpg" mode=""></image>
		</view>
		<view class="aboutDescBox">
			<view class="logo">
				<view class="imgbox">
					<image class="logoimg" :src="aboutData.storeimg" />
				</view>
				<view class="adrrescarText">
					<view style="font-size: 24px;font-weight: 500;">{{aboutData.storeName}}</view>
					<p class="opentime">
						<span class="openTime_text">营业时间</span>
						周一到周日08:00--22:00
					</p>
				</view>
			</view>
			<view class="divider"></view>
			<view class="aboutadd">
				<view class="aboutaddText">
					<view class="">地址：<span>{{aboutData.address}}</span></view>
					<view style="margin-top: 20rpx;">距离：<span style="color: #717070;font-weight: 400;">5km</span></view>
				</view>
				<view class="aboutaddicon">
					<uni-icons type="location" size="30" color="black" @click="getlocation"></uni-icons>
				</view>
			</view>
			<view class="divider"></view>
			<view class="aboutLocation">
				<view class="aboutTell">客服电话：<span>{{aboutData.telphone}}</span></view>
				<uni-icons type="phone-filled" size="30" @click="showActionSheet(aboutData.telphone)"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue';
	import {onLoad } from "@dcloudio/uni-app";
	import utils from "@/common/utils/utils.js"
	
	const aboutData = ref('');
	
	function getlocation(){
		uni.navigateTo({
			url:"/pages/map/map"
		})
	}
	
	const initaboutdata=()=>{
		utils.request({
			url:'/about',
			success:(res)=>{
				aboutData.value = res[0].data[0]
				console.log(res[0].data[0]);
			}
		})
	}
	
	
	const showActionSheet = (num) => {
	    const phoneNumber = num; // 替换为你要拨打的电话号码

	    uni.showActionSheet({
			title:phoneNumber,
	        itemList: [ '拨打'], // 弹出选项
	        success: (res) => {
	            if (res.tapIndex === 0) { // 用户选择了拨打电话
	                makePhoneCall(phoneNumber);
	            }
	        },
	        fail: (err) => {
	            console.error('操作失败', err);
	        }
	    });
	};
	
	const makePhoneCall = (phoneNUm) => {
	    uni.makePhoneCall({
	        phoneNumber: phoneNUm,
	        success: () => {
	            console.log('拨打电话成功');
	        },
	        fail: (err) => {
	            console.error('拨打电话失败', err);
	        }
	    });
	};
		
	onMounted(()=>{
		initaboutdata()
	})
</script>

<style>
.aboutContainer{
	height: 100vh;
	background-color: #fafcfd;
}
.bannerBox{
	width: 100%;
	height:400rpx;
}
.bannerBox image{
	width: 100%;
	height: 100%;
	border-radius:40rpx;
}
.aboutDescBox{
	width: 95%;
	height: 600rpx;
	margin: 20rpx auto;
	border-radius: 20rpx;
	background-color: white;
}

.aboutadd,
.aboutLocation,
.logo{
	display: flex;
	height: 140rpx;
	padding: 30rpx;
	align-items: center;
	/* border: 1px solid red; */
	position: relative;
}

.divider{
	width: 90%; 
	height: 1rpx; 
	background-color: #b3b3b3;
	margin-bottom: 2rpx; 
	margin:0 auto;
}
.imgbox{
	width: 100rpx;
	height: 100rpx;
	
}
.imgbox image{
	width: 100%;
	height: 100%;
}
.adrrescarText{
	margin-left: 10rpx;
	padding: 10rpx;
}
.opentime{
	font-size: 30rpx;
	font-weight: 400;
	display: flex;
	align-items: center;
}
.openTime_text{
	width: 130rpx;
	text-align: center;
	border: 1px solid #666666;
	margin-right:10rpx;
	border-radius: 20rpx;
	font-size: 30rpx;
	font-weight: 400;
}

.aboutadd,
.aboutLocation{
	justify-content: space-between;
	align-items: center;
}
</style>
