<template>
	<CustomNav :myValue="coacth"></CustomNav>
	<view class="container" v-if="coathData">
		<!-- 教练信息 -->
		<view class="coach-info">
			<image class="avatar" :src="coathData.img" mode="aspectFill" />
			<view class="info">
				<text class="name">{{coathData.name}}</text>
				<text class="experience">{{coathData.experience}}年经验</text>
			</view>
		</view>

		<!-- 教练简介 -->
		<view class="intro">
			<text class="intro-title">教练简介</text>
			<text class="intro-content">{{coathData.description}}</text>
		</view>

		<!-- 所授课程 -->
		<view class="course-list">
			<view class="course-item" v-for="(course, index) in coathData.allproject" :key="index">
				<image class="course-image" :src="course.img" mode="aspectFill" />
				<view class="course-details">
					<text class="course-name">{{ course.project }}</text>
					<view class="course-rating">
						难度：
						<text v-for="star in course.difficulty" :key="star">⭐</text>
					</view>
					<text class="course-price">原价 ¥{{ course.price }}</text>
				</view>
				<button class="book-button" @click="bookCourse(course,coathData.name)">预约</button>
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
	import CustomNav from "@/components/customizenav.vue"
	import utils from "@/common/utils/utils.js"

	const coacth = ref('教练详情')
	const coathData = ref(null);

	const bookCourse =(res,name)=>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/spinClass/spinClass?option=${parmas}`
		})
	}

	
	onLoad((options) => {
		coathData.value = JSON.parse(options.option)
		console.log(coathData.value.allproject);
	})
</script>

<style lang="scss">
	.container {
		height: 100vh;
		padding: 20rpx;
		background-color: #f5f5f5;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;

		.back-icon {
			font-size: 40rpx;
		}

		.title {
			font-size: 32rpx;
			font-weight: bold;
		}

		.header-icons {
			display: flex;
			gap: 10rpx;

			.icon {
				font-size: 28rpx;
			}
		}
	}

	.coach-info {
		display: flex;
		align-items: center;
		padding: 20rpx;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}

		.info {
			margin-left: 20rpx;

			.name {
				font-size: 32rpx;
				font-weight: bold;
			}

			.experience {
				font-size: 24rpx;
				color: #666;
			}
		}
	}

	.intro {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;

		.intro-title {
			font-size: 28rpx;
			font-weight: bold;
		}

		.intro-content {
			font-size: 24rpx;
			color: #666;
		}
	}

	.course-list {
		.course-item {
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;

			.course-image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
			}

			.course-details {
				flex: 1;
				margin-left: 20rpx;

				.course-name {
					font-size: 28rpx;
					font-weight: bold;
				}

				.course-rating {
					margin: 10rpx 0;
				}

				.course-price {
					font-size: 24rpx;
					color: #666;
				}
			}

			.book-button {
				background-color: #007aff;
				color: #fff;
				padding: 10rpx 20rpx;
				border-radius: 5rpx;
				font-size: 24rpx;
			}
		}
	}
</style>