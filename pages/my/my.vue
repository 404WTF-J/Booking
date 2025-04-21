<template>
	<!-- 自定义nav -->
	<view class="CustomizeNav">
		<view class="uicon" @click="back">
			<uni-icons type="back" size="25"></uni-icons>
		</view>
		<view class="customcard">{{title}}</view>
	</view>
	<view class="container">
	    <!-- 顶部用户信息 -->
	    <view class="user-section">
	      <view class="user-header">
	        <image class="headimg" src="../../static/assest/Taricon/TablerUser.png"></image>
	        <view class="subtitle">未设置 ></view>
	      </view>
	      <view class="user-info">
	        <text class="phone">155****9263</text>
	        
	      </view>
	      <view class="member-rights">
	       
	      </view>
	    </view>
	
	    <!-- 余额积分等卡片 -->
	    <view class="card-section">
			<view class="card-yue">
				<view class="member-tag">普通会员</view>
				<text>会员权益 ></text>
			</view>
	      <view class="card-row">
	        <view class="card-item">
	          <text class="card-label">余额</text>
	          <text class="card-value">0 </text>
	        </view>
	        <view class="card-item">
	          <text class="card-label">积分</text>
	          <text class="card-value">0 </text>
	        </view>
	      </view>
	      <view class="card-row">
	        <view class="card-item">
	          <text class="card-label">优惠券</text>
	          <text class="card-value">0 </text>
	        </view>
	        <view class="card-item">
	          <text class="card-label">会员码</text>
	          <text class="card-value"></text>
	        </view>
	      </view>
	      <view class="card-row">
	        <view class="card-item">
	          <text class="card-label">会员卡</text>
	          <text class="card-value">0 </text>
	        </view>
	        <view class="card-item">
	          <text class="card-label">课程包</text>
	          <text class="card-value">0 </text>
	        </view>
	      </view>
	    </view>
	
	    <!-- 功能列表 -->
	    <view class="menu-section">
	      <view class="menu-item">
	        <text>我的预约</text>
	        <text>></text>
	      </view>
	      <view class="menu-item" @click="gocart">
	        <text>我的订单</text>
	        <text>></text>
	      </view>
	      <view class="menu-item">
	        <text>我的合同</text>
	        <text>></text>
	      </view>
	      <view class="menu-divider"></view>
	      <view class="menu-item">
	        <text>我的订场</text>
	        <text>></text>
	      </view>
	      <view class="menu-item">
	        <text>我的拼团</text>
	        <text>></text>
	      </view>
	      <view class="menu-divider"></view>
	      <view class="menu-item">
	        <text>入场照片</text>
	        <text>></text>
	      </view>
	      <view class="menu-item">
	        <text>我的回货</text>
	        <text>></text>
	      </view>
	      <view class="menu-divider"></view>
	      <view class="menu-item">
	        <text>关于我们</text>
	        <text>></text>
	      </view>
	    </view>
	
	    <!-- 退出登录 -->
	    <view class="logout-section">
	      <button @click="handleLogout">退出登录</button>
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
	import CustomNav from "@/components/customizenav.vue"
	import CustomFooter from "@/components/customfooter.vue"
	import utils from '@/common/utils/utils.js';

	const title = ref('我的')
	const back = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	};

	// 用户数据
	const userInfo = ref({
	  phone: '155****9263',
	  memberType: '普通会员'
	})
	
	// 卡片数据
	const cardData = ref([
	  { label: '余额', value: '0' },
	  { label: '积分', value: '0' },
	  { label: '优惠券', value: '0' },
	  { label: '会员码', value: '' },
	  { label: '会员卡', value: '0' },
	  { label: '课程包', value: '0' }
	])
	
	// 菜单数据
	const menuItems = ref([
	  '我的预约',
	  '我的订单',
	  '我的合同',
	  'divider',
	  '我的订场',
	  '我的拼团',
	  'divider',
	  '入场照片',
	  '我的回货',
	  'divider',
	  '关于我们'
	])
	
	// 初始化加载
	onLoad(() => {
	  // 可以在这里请求用户数据
	  // fetchUserData()
	})
	
	const gocart = () =>{
		uni.navigateTo({
			url:"/pages/shoppingCart/shoppingCart"
		})
	}
	
	// 退出登录
	const handleLogout = () => {
	  uni.showModal({
	    title: '提示',
	    content: '确定要退出登录吗？',
	    success: (res) => {
	      if (res.confirm) {
	        uni.removeStorageSync('token')
	        uni.reLaunch({
	          url: '/pages/login/index'
	        })
	      }
	    }
	  })
	}

</script>

<style lang="scss">
	/* 自定义navcss */
	.CustomizeNav {
		height: 80rpx;
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


	.container {
	  padding-bottom: 100rpx;
	  background-color: #f5f5f5;
	  min-height: 100vh;
	}
	
	.user-section {
	  padding: 20rpx;
	  background-color: #fff;
	  margin-bottom: 10rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  height: 300rpx;
	  justify-content: space-around;
	  .user-header {
		text-align: center;
	    margin-bottom: 15rpx;
	    
	    .headimg {
		  width: 200rpx;
		  height: 200rpx;
		  border-radius: 100rpx;
	    }
	    
	    .subtitle {
	      font-size: 24rpx;
	      color: #999;
	    }
	  }
	  
	  .user-info {
	    display: flex;
	    align-items: center;
	    margin-bottom: 10rpx;
	    
	    .phone {
	      font-size: 24rpx;
	      margin-right: 10rpx;
	    }
	    
	  }
	  
	  .member-rights {
	    text-align: right;
	    color: #666;
	    font-size: 14rpx;
	  }
	}
	
	.card-section {
	  background-color: #fff;
	  padding: 15rpx;
	  margin-bottom: 10rpx;
	  
	  .card-yue{
		display: flex;
		align-items: center;
		height: 100rpx;

		.member-tag {
		  background-color: #f0f0f0;
		  color: #666;
		  padding: 4rpx 18rpx;
		  border-radius: 20rpx;
		  margin: 0rpx 20rpx 0rpx 15rpx;
		}
		
	  }
	  
	  .card-row {
	    display: flex;
	    margin-bottom: 15rpx;
	    
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  
	  .card-item {
	    flex: 1;
	    text-align: center;
	    
	    .card-label {
	      display: block;
	      color: #666;
	      font-size: 28rpx;
	      margin-bottom: 5rpx;
	    }
	    
	    .card-value {
	      display: block;
	      font-size: 32rpx;
	      font-weight: bold;
	    }
	  }
	}
	
	.menu-section {
	  background-color: #fff;
	  
	  .menu-item {
	    display: flex;
	    justify-content: space-between;
	    padding: 15rpx;
	    border-bottom: 1rpx solid #f0f0f0;
	    
	    &:last-child {
	      border-bottom: none;
	    }
	  }
	  
	  .menu-divider {
	    height: 10rpx;
	    background-color: #f5f5f5;
	  }
	}
	
	.logout-section {
	  margin: 20rpx;
	  
	  button {
	    background-color: #fff;
	    color: #f56c6c;
	    border: 1rpx solid #f56c6c;
	  }
	}
	
	
</style>