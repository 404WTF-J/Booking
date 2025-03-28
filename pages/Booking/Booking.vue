<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view class="container no-scroll">
		<view class="tuankeNav">
			<view class="tuankeTextbox">
				<view class="tuankeleft">团课</view>
				<view class="tuankeright">私教</view>
			</view>
		</view>
		<!-- 横向滚动日期选择 -->
		<view class="scrollBox">
			<scroll-view scroll-x class="date-picker">
				<view v-for="(date, index) in dateList" :key="index" class="date-item"
				:class="{ active: selectedIndex === index }" @click="selectDate(index)">
					<text>{{ date.day }}</text>
					<text>{{ date.week }}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 下方联动内容 -->
		<view class="content-area" v-for="(contentData,index) in contentData"
			:style="{backgroundImage:'url('+contentImg+')'}" :key='index'
			>
			<view class="contentDataBox" v-if="contentData" @click="popupPage(contentData)">
				<view class="title">{{ contentData.tech }}</view>
				<view class="time">{{ contentData.time }}</view>
				<view style='display: flex;justify-content: space-between;'>
					<view class="coach">
						{{ contentData.name }}
					</view>
				</view>
				<view class="capacity">预约人数:{{ contentData.capacity }}</view>
				<view class="difficulty">
					难度
					<span v-for="(contentData , index) in contentData.difficulty" :key="index"
						:class="{ filled: index < contentData.difficulty }">:★</span>
				</view>
				
			</view>
			<view class="yuyuebtn" @click="gospin(contentData)">
					【 预约 】
			</view>
		</view>
		<!-- 弹出层 -->
		
		<uni-popup ref="popup" type="bottom" :animation="true" :safe-area="true" class='popupT' @change="change" >
			<popup-tanke :data='popupData'></popup-tanke>
		</uni-popup>
	</view>
	
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {onLoad} from "@dcloudio/uni-app";
	import utils from '@/common/utils/utils.js';
	import popupTanke from '@/components/popupTuanke/popupTuanke.vue'

	// 日期列表数据
	let dateList

	// 当前选中的日期索引
	const selectedIndex = ref(0);

	// 下方内容数据
	const contentData = ref(null);
	const contentImg = ref()

	//暂存数据
	const mockdatalist = reactive([])



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
	
	
	// 初始化数据
	const initmockdata = () => {
		utils.request({
			url: '/jiaolian',
			success: (res) => {
				contentImg.value = res[0].bgimg;
				const data = res[0].data.map((item) => {
					return item;
				});
				Object.assign(mockdatalist, data);
				console.log(mockdatalist);
				
				// 在数据初始化完成后，选择今天的日期
		      const todayIndex = findTodayIndex(getDatelist());
		      selectDate(todayIndex); // 自动匹配并展示今天的课程
			},
		});  
	};
	
	const show = ref(false)
	const change = (e) =>{
		show.value = e.show
	}
	const open = ref(false)
	// 创建一个 ref 来引用弹出层
	const popup = ref(null);
	const popupData = ref(null); // 用于存储传递给弹出层的数据
	
	const popupPage =(res)=>{
		console.log(res);
		open.value = true
		popupData.value = res
		popup.value.open('bottom')
	}
	
	//点击预约进入预约申请页
	const gospin =(res)=>{
		const parmas = JSON.stringify(res)
		uni.navigateTo({
			url:`/pages/spinClass/spinClass?option=${parmas}`
		})
	}
	
	onLoad(()=>{
		initmockdata()
		selectDate(0)
	})
	// 初始化日期列表
	onMounted(() => {
		initmockdata()
		dateList = getDatelist();
		
	});
</script>

<style scoped>
	.container {
		width: 100%;
		box-sizing: border-box;
		position: relative;
	}

	.no-scroll {
	    overflow: hidden; /* 禁止滚动 */
	    height: 100%; /* 确保高度为100% */
	}
	
	.tuankeNav {
		width: 100%;
		height: 200rpx;
		background-color: black;
		position: relative;
		color: white;
	}

	.tuankeTextbox {
		width: 30%;
		display: flex;
		justify-content: space-between;
		position: absolute;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 40rpx;
		font-weight: 500;
	}
	
	.popupT{
		
	}
	
	.yuyuebtn{
		position: absolute;
		right: 0;
		top: 30%;
		
	}

	.scrollBox{
		width: 100%;
	}
	
	.date-picker {
		overflow: hidden;
		display: flex;
		white-space: nowrap;
		padding: 10rpx 0rpx;
		background-color: black;
	}

	.date-item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx 20rpx;
		margin-right: 10rpx;
		border-radius: 16rpx;
		cursor: pointer;
		color: white;
	}

	.date-item.active {
		background-color: #007aff;
		color: #fff;
	}

	.content-area {
		margin: 30rpx;
		padding: 20rpx;
		background-color: #eccbcb;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
		background: 28% 0%;
		position: relative;
	}

	.contentDataBox {
		
	}

	.title {
		font-size: 40rpx;
		font-weight: 400;
		margin-bottom: 10rpx;
		color: #fbcbbc;
	}

	.time,
	.coach,
	.capacity {
		font-weight: 500;
		display: block;
		margin-bottom: 5rpx;
		color: #0d1725;
	}

	.difficulty span {
		color: #0d0714;
	}

	.difficulty span.filled {
		color: gold;
	}
</style>