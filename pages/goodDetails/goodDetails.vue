<template>
	<CustomNav :myValue="myValue"></CustomNav>
	<view class="containner">
		<view class="swiperbox">
			<swiper class="swiperbox" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image :src="goodData.img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="padding:20rpx">
			<view class="goodDescBox" v-if="goodData">
				<view class="goodDesc jiange">
					<view class="goodprice">
						<text class="newPrice">¥{{goodData.newprice}}</text>
						<text class="oldPrice">¥{{goodData.oldprice}}</text>
					</view>
					<view class="goodKucun">
						<text class="kucun">库存：{{goodData.kucun}}</text>
						<text class="yishou">已售：{{goodData.yishou}}</text>
					</view>
				</view>
				<view class="goodname jiange">{{goodData.goodname}}</view>
				<view class="freight jiange">
					<text>运费</text>
					<text>全国包邮</text>
				</view>
			</view>
			<view class="goodDescBox">
				<view class="goodname jiange">商品描述</view>
				<view class="descri jiange">
					{{goodData.gooddescrtion}}
				</view>
			</view>
			<view class="goodDescBox">
				<view class="goodname jiange">购买须知</view>
				<view class="descri jiange">
					{{goodData.goodxuzhi}}
				</view>
			</view>
		</view>
		<!-- 购物车入口 -->
		<view class="shoppingCrat" v-if="show" @click="shopentrance(goodData)">
			<uni-icons type="cart-filled" size="50"></uni-icons>
		</view>
	</view>
	<CustomFooter :customhandleclick="() =>orderpage(goodData)"></CustomFooter>
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
	import CustomNav from "@/components/customizenav.vue"
	import CustomFooter from "@/components/customfooter.vue"
	
	const myValue = ref('商品详情')
	const goodData = ref({})
	const show = ref(false);

	const orderpage =(res)=>{
		show.value = true;
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/goodsOrder/goodsOrder?option=${parmas}`
		})
	}
	const shopentrance = (res) =>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/shoppingCart/shoppingCart?option=${parmas}`
		})
	}
	onLoad((options) => {
		goodData.value = JSON.parse(options.option)
		console.log(goodData)
	})
</script>

<style>
	.containner {
		height: 100vh;
		/* padding: 20rpx; */
		background-color: #f7f7f7;
		position: relative;
	}
	/*  购物车*/
	.shoppingCrat{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #efecea;
		position: absolute;
		bottom: 30%;
		right: 40rpx;
		text-align: center;
		line-height: 100rpx;
	}
	.swiperbox {
		width: 100%;
		height: 400rpx;
	}

	.swiper-item {
		width: 100%;
		height: 400rpx;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

	.goodDescBox {
		padding: 20rpx;
		background-color: white;
		border-radius: 30rpx;
		margin: 20rpx;
	}

	.jiange {
		margin-bottom: 20rpx;
	}

	.goodDesc,
	.freight {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goodprice {
		width: 40%;
	}

	.newPrice {
		margin-right: 20rpx;
		color: #fd8008;
		font-size: 35rpx;
		font-weight: 400;
	}

	.oldPrice {
		font-size: 25rpx;
		font-weight: 200;
		text-decoration: line-through;
	}

	.goodKucun {}

	.goodname {
		font-size: 40rpx;
	}

	.kucun,
	.yishou {
		font-size: 30rpx;
		font-weight: 400;
		margin-right: 10rpx;
	}
</style>