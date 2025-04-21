<template>
	<view class="checkinstru">
		<view class="decscript">
			<view class="dectext">商品推荐</view>
			<view class="checkbtn" @click='checkmorefn'>查看更多</view>
		</view>
		<view class="checkCard">
			<view class="StoreRemBox" @click="goodDetails(item)" v-for="(item,index) in goodDatas" :key="index">
				<view class="stroeDesicBox">
					<view class="stroeDesic">
						<view class="stroeImg">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="storeName">
							{{item.goodname}}
						</view>
					</view>
					<view class="stroeicon">
						<view class="storeMember">会员价</view>
						<view class="storeOrderNum .storeMember">{{item.peoplenum}}人已下单</view>
					</view>
				</view>
				<view class="storePrice">
					<view class="storeOld_price">
						原价<span style='text-decoration: line-through;margin-left: 10rpx;'>¥{{item.oldprice}}</span>
					</view>
					<view class="storeNew_price">
						<view class="storepiceNum"><span style="color:#d57247 ;"></span><span style="color:#e02835">¥{{item.newprice}}</span></view>
						<view class="storeOder_btn">购买</view>
					</view>
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
	const goodDatas = ref({})
	
	const initData = () =>{
		utils.request({
			url:'/good',
			success:(res)=>{
				goodDatas.value = res[0].data
				console.log(goodDatas);
			}
		})
	}
	
	const goodDetails = (res) =>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/goodDetails/goodDetails?option=${parmas}`
		})
	}
	
	onLoad(()=>{
		initData()
	})
</script>

<style>
	@import "@/components/StoreRem/StoreRem.css";
</style>