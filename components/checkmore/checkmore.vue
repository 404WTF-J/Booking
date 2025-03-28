<template>
	<view class="checkinstru">
		<view class="decscript">
			<view class="dectext">教练</view>
			<view class="checkbtn" @click='checkmorefn(cotch)'>查看更多</view>
		</view>
		<view class="personCard">
			<view class="persons" v-for="(item,index) in cotch" :key="item.id" @click='detailCoath(item,index)'>
				<view class="personimg">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="personName">{{item.name}}</view>
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
	
	import utils from "@/common/utils/utils.js"
	
	let cotch = reactive([])
	
	const checkmorefn =(res)=>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/moreJiaolian/moreJiaolian?option=${parmas}`
		})
	}
	
	const detailCoath=(item,index)=>{
		console.log('教练详情'+JSON.stringify(item),index);
		const parmas = JSON.stringify(item)
		uni.navigateTo({
			url:`/pages/coatchDetails/coatchDetails?option=${parmas}`
		})
	}
	
	function getjiaolian(){
		utils.request({
			url:'jiaolian',
			success:(res)=>{
				Object.assign(cotch,res[0].data)
				console.log(cotch[0].name)
			}
		})
	}
	onMounted(()=>{
		getjiaolian()
	})
</script>

<style>
	@import './cheakmore.css';
</style>