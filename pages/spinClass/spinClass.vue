<template>
	<view class="bannerbox" v-if="jiaolianData">
		<image :src="jiaolianData.img" mode=""></image>
		<view class="customnavspin">
			<view class="CustomizeNav">
				<view class="uicon" @click="back">
					<uni-icons type="back" size="25"></uni-icons>
				</view>
				<view class="customcard">预约申请</view>
			</view>
		</view>
	</view>
	<view class="container">
		<!-- 课程信息部分 -->
		<view class="course-info" v-if="jiaolianData">
			<view class="course-title">{{jiaolianData.tech || jiaolianData.project}}</view>
			<view class="course-tag">
				<text class="tagtuke">团课</text>
				<text class="tagyiyue">已约{{jiaolianData.available}}人次</text>
			</view>
			<view class="course-details">
				<view class="detail" v-if="jiaolianData.name">
					<view class="iconjiaol"></view>
					<text>教练：{{jiaolianData.name}}</text>
				</view>
				<view class="detail">
					<view class="iconjiage"></view>
					<text>价格：¥{{jiaolianData.price}}</text>
				</view>
				<view class="detail">
					<view class="icontime"></view>
					<text>时间：选择下方日期和时间段</text>
				</view>
			</view>
		</view>

		<!-- 横向滚动日期选择 -->
		<view class="scrollBox">
			<scroll-view scroll-x class="date-picker">
				<view v-for="(date, index) in dateList" :key="index" class="date-item"
					:class="{ active: selectedIndex === index }" @click="selectDate(index)">
					<text>{{ date.week }}</text>
					<text>{{ date.day }}</text>
				</view>
			</scroll-view>
		</view>

		<!-- 时间段选择部分 -->
		<view class="time-slots-container">
			<view v-if="timeSlots" :class="{ 'active-slot': selectedTimeSlot === timeSlots }"
				@click="selectTimeSlot(timeSlots)">
				<text>{{ timeSlots.time }} ({{ timeSlots.available }}/{{ timeSlots.capacity }})</text>
				<text class="slot-status">当前可约</text>
			</view>
		</view>

		<!-- 教练位置表部分 -->
		<view v-if="selectedTimeSlot" class="coach-table-container">
			<view class="coach-table-title">教练</view>
			<view class="coach-table">
				<view v-for="(row, rowIndex) in coachTable" :key="rowIndex">
					<view v-for="(seat, seatIndex) in row" :key="seatIndex" :class="{
		              'booked-seat': seat === 'booked',
		              'available-seat': seat === 'available',
		              'unavailable-seat': seat === 'unavailable',
		            }" @click="selectSeat(rowIndex, seatIndex)">
						<text>{{ rowIndex + 1 }}-{{ seatIndex + 1 }}</text>
					</view>
				</view>
			</view>
			<view class="seat-status">
				<view class="status-red">已选择</view>
				<view class="status-blue">可选</view>
				<view class="status-gray">不可选</view>
			</view>
		</view>

		<!-- 预约按钮部分 -->
		<view class="booking-button">
			<view class="iconphone"></view>
			<text>预约</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,reactive
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import Cusotmnav from "@/components/customizenav.vue"

	// 日期列表数据
	let dateList
	// 当前选中的日期索引
	const selectedIndex = ref(0);
	// 下方内容数据
	const contentData = ref(null);
	const contentImg = ref()
	//暂存数据
	const mockdatalist = reactive([])
	
	const jiaolianData = ref(null)
	
	
	const back = () =>{
		uni.navigateBack({
			url:'/pages/Booking/Booking',
			delta:1
		})
	}
	// 获取日期数据
	const getDatelist = () => {
		const today = new Date(); // 获取今天的时间
		const dateList = [];
	
		// 添加今天
		dateList.push({
			day: '今',
			week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][today.getDay()],
			weekNumber: today.getDay() // 添加星期几的数字标识，从 0 开始
		});
	
		// 添加明天
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		dateList.push({
			day: '明',
			week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][tomorrow.getDay()],
			weekNumber: tomorrow.getDay() // 添加星期几的数字标识，从 0 开始
		});
	
		// 添加接下来的一个月
		for (let i = 2; i < 32; i++) {
			const nextDay = new Date(tomorrow);
			nextDay.setDate(nextDay.getDate() + i - 1);
			dateList.push({
				day: String(nextDay.getDate()),
				week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][nextDay.getDay()],
				weekNumber: nextDay.getDay() // 添加星期几的数字标识，从 0 开始
			});
		}
	
		return dateList;
	};
	
	// 将 0（周日）转换为 7，其他保持不变
	const weekNumberFromOne = (weekNumber) => {
		return weekNumber === 0 ? 7 : weekNumber;
	};
	
	
	// 获取今天的日期
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1; // 月份从 0 开始，需要加 1
	const day = today.getDate();
	// 找到今天对应的索引
	const findTodayIndex = (dateList) => {
	  for (let i = 0; i < dateList.length; i++) {
	    const dateObj = new Date(dateList[i].year, dateList[i].month - 1, dateList[i].day);
	    if (dateObj.getFullYear() === year && dateObj.getMonth() + 1 === month && dateObj.getDate() === day) {
	      return i;
	    }
	  }
	  return 0; // 如果没找到，默认返回第一个日期的索引
	};
	
	// 示例：点击日期时获取星期数字
	const selectDate = (index) => {
		selectedIndex.value = index
		const dateList = getDatelist();
		const selectedDate = dateList[index];
		const weekNumber = weekNumberFromOne(selectedDate.weekNumber);
		// console.log(`点击的日期：${selectedDate.day}，星期：${selectedDate.week}，数字标识：${weekNumber}`);
	
		/**
		* filter 方法是一个非常有用的数组方法，可以根据条件从数组中筛选出特定的元素。
		它返回一个新数组，不会修改原始数组 常用于处理数据、过滤列表等场景。
		 */
		const hasClassCoaches = mockdatalist.filter((coach) => {
			return coach.has.includes(weekNumber);
			// 从课程列表中筛选出符合条件的课程
		});
	
		// console.log(hasClassCoaches); // 输出符合条件的教练课程
		contentData.value = hasClassCoaches
		// console.log(contentImg.value + '+bage');
		// console.log(Object.assign(contentData.value, ...hasClassCoaches));
	};
	
	// 初始化日期列表
	dateList = getDatelist();
	console.log(dateList);

	// 时间段数据
	const timeSlots = ref();

	// 选择的时间段
	const selectedTimeSlot = ref(null);

	// 选择时间段的方法
	const selectTimeSlot = (slot) => {
		selectedTimeSlot.value = selectedTimeSlot.value === slot ? null : slot;
	};

	// 教练位置表数据
	const coachTable = [
		Array.from({
			length: 5
		}, () => 'available'),
		Array.from({
			length: 5
		}, () => 'available'),
		Array.from({
			length: 5
		}, () => 'available'),
		Array.from({
			length: 5
		}, () => 'available'),
	];

	// 选择座位的方法
	const selectSeat = (rowIndex, seatIndex) => {
		const seat = coachTable[rowIndex][seatIndex];
		if (seat === 'available') {
			coachTable[rowIndex][seatIndex] = 'booked';
		} else if (seat === 'booked') {
			coachTable[rowIndex][seatIndex] = 'available';
		}
		console.log('选择的座位:', `${rowIndex + 1}-${seatIndex + 1}`);
	};

	onLoad((options) => {
		console.log(options.option);
		jiaolianData.value = JSON.parse(options.option)
		console.log(jiaolianData);
		timeSlots.value = jiaolianData.value
		// console.log(timeSlots.value);
		selectDate(0)
	})
</script>

<style>
	.container {
		padding: 20rpx;
		background-color: #f5f5f5;
		/* position: relative; */
	}

	.bannerbox {
		width: 100%;
		height: 500rpx;
		position: relative;
	}

	.bannerbox image {
		width: 100%;
		height: 100%;
	}
	
	.customnavspin{
		width: 100%;
		position: absolute;
		top: 80rpx;
	}
	.CustomizeNav{
		display: flex;
		box-sizing: border-box;
		font-weight: 500;
		font-size: 35rpx;
		color: black;
		justify-content: space-evenly;
		align-items: center;
		position: relative;
	}
	.uicon{
		position: absolute;
		left: 10rpx;
		top: 0;
	}

	/* 课程信息部分样式 */
	.course-info {
		background-color: #fff;
		padding: 20px;
		margin-bottom: 15px;
	}

	.course-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.course-tag {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
	}

	.tagtuke {
		background-color: #ff9900;
		color: #fff;
		padding: 5px 10px;
		border-radius: 5px;
		margin-right: 10px;
	}

	.tagyiyue {
		background-color: #ccc;
		color: #000;
		padding: 5px 10px;
		border-radius: 5px;
	}

	.course-details {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.detail {
		display: flex;
		align-items: center;
	}
	.scrollBox{
		border-bottom: 2rpx solid whitesmoke;
	}	
	.date-picker {
		overflow: hidden;
		display: flex;
		white-space: nowrap;
		padding: 10rpx 0rpx;
		background-color: white;
	}
	
	.date-item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx 20rpx;
		margin-right: 10rpx;
		border-radius: 16rpx;
		color: black;
	}
	.date-item.active {
		background-color: #000;
		color: #fff;
	}

	/* 时间段选择部分样式 */
	.time-slots-container {
		background-color: #fff;
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.time-slots-container view {
		width: 40%;
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
		border-radius: 5px;
	}

	.active-slot {
		border: 1px solid black;
	}

	.slot-status {
		color: #007aff;
		font-size: 12px;
	}

	/* 教练位置表部分样式 */
	.coach-table-container {
		background-color: #fff;
		padding: 10px;
		margin-bottom: 15px;
	}

	.coach-table-title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.coach-table {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.coach-table view {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.coach-table view view {
		flex: 1;
		padding: 10px;
		border-radius: 5px;
		text-align: center;
		cursor: pointer;
	}

	.booked-seat {
		background-color: red;
		color: #fff;
	}

	.available-seat {
		background-color: blue;
		color: #fff;
	}

	.unavailable-seat {
		background-color: gray;
		color: #fff;
	}

	.seat-status {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}

	.status-red {
		color: red;
	}

	.status-blue {
		color: blue;
	}

	.status-gray {
		color: gray;
	}

	/* 预约按钮部分样式 */
	.booking-button {
		background-color: #000;
		color: #fff;
		padding: 15px;
		border-radius: 5px;
		text-align: center;
		cursor: pointer;
	}

	.iconphone {
		margin-right: 10px;
	}
</style>