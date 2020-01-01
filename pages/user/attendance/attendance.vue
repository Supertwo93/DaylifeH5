<template>
	<view>
		<view class="calendarContainer">
			<view class="navigation">
				<image src="/static/cut/back_white.png" @tap="toUser()"></image>
				<view>签到</view>
			</view>
			<view class="mypoints" @tap="toMyPoints">
				<image class="pointIcon" src="/static/cut/bigPoint.png"></image>
				<view>我的积分：{{myScore}}</view>
				<image class="arrowIcon" src="/static/cut/grayright.png"></image>
			</view>
			
			<view class="calendar">
				<view class="chooseMonth">
					<image class="left" src="/static/cut/leftIcon.png" @tap="preMonth()"></image>
					<view>{{year}}年{{month}}月</view>
					<image class="right" src="/static/cut/rightIcon.png" @tap="nextMonth()"></image>
				</view>
				
				<view class="list">
					<view class="item" v-for="(item,index) in dateArr" :key="index">
						<!-- status显示状态： 0：默认  1：已签到  2：未签到 -->
						<block v-if="item.sign == 0">
							<view class="ball" @tap="clickCheck(index)">签</view>
						</block>
						<block v-if="item.sign == 1">
							<view class="ball finish" @tap="clickCheck(index)">+{{item.count}}</view>
						</block>
						<block v-if="item.sign == 2">
							<view class="ball miss">0</view>
						</block>
						<view class="day">{{item.num}}</view>
					</view>
				</view>
				
			</view>
			
			<view class="topleft"><image class="circle" src="/static/cut/ring.png"></image></view>
			<view class="topright"><image class="circle" src="/static/cut/ring.png"></image></view>
			<view class="bottomleft"><image class="circle" src="/static/cut/ring.png"></image></view>
			<view class="bottomright"><image class="circle" src="/static/cut/ring.png"></image></view>
			
			<view class="rules">
				<view class="title">签到积分规则</view>
				<view class="text1">1、每日签到获得10积分，积分累计可兑换余额。</view>
				<view class="text2"> 2、累计签到第7天额外获得20积分，第14天额外获得30积分，第21天额外获得40积分依次叠加。</view>
			</view>
			
			<image class="pointIcon1" src="/static/cut/积分icon-大.png"></image>
			<view class="bottomTitle">积分可抵商品</view>
			<image class="pointIcon2" src="/static/cut/积分icon-大.png"></image>
		</view>
		
	</view>
</template>

<script>
	import {CheckModel} from '../../../common/models/check.js';
	let checkModel = new CheckModel();
	import {mapState,mapMutations} from 'vuex';  
	export default {
		data() {
			return {
				today:new Date(),
				year:'',
				month:'',
				day:'',
				my_point: 0,
				dateArr:[],
				checkArr:[],
				count: 10,
				check_click: false,
				isClick: 0
			}
		},
		computed: {
			...mapState(['myScore','signCount'])
		},  
		onLoad:function(){
			this.year = this.today.getFullYear();
			this.month = this.today.getMonth() + 1;
			this.day = this.today.getDate();
			
			this.getCalendar();
		},
		onShow() {
			uni.checkSession({ //检测当前用户的session_key是否过期
				success: function () { //session_key 未过期，并且在本生命周期一直有效
					console.log("授权未过期")
					return ;
				},
				fail: function () { //session_key 已经失效，需要重新执行登录流程
					console.log("授权过期")
					uni.navigateTo({
						url: '/pages/login/getUserinfo' //重新授权
					})
				}
			})
		},
		methods: {
			...mapMutations(['myScoreAdd','signCountAdd','signCountZero']),
			isLeap(){
				const year = this.year;
				if(year%4 == 0 && year%100 > 0){
					return true;
				}else if(year % 400 == 0 && year % 3200 > 0){
					return true;
				}else{
					return false;
				}
			},
			getLen(){
				const month = this.month;
				if(month == 2){
					if(this.isLeap()){
						return 29
					}else{
						return 28
					}
				}else{
					if(month < 8){
						if(month%2>0){
							return 31;
						}else{
							return 30;
						}
					}else{
						if(month%2>0){
							return 30
						}else{
							return 31;
						}
					}
				}
			},
			getCalendar(){
				var len = this.getLen();
				var arr = new Array();
				var daySign = {};
				let years = [];
				let months = [];
				let days = [];
					
				checkModel.getSignSelect((data)=>{
					console.log(data);
					this.checkArr = data;
					
					for(var c=0;c<len;c++){
						if(data.signList[c] != undefined){
							years.push(data.signList[c].createTime.substring(0,4));
							months.push(data.signList[c].createTime.substring(5,7));
							days.push(data.signList[c].createTime.substring(8,10));
						}else{
							years.push(0);
							months.push(0);
							days.push(0);
						}
					}
					// console.log(years,months,days);
					
					for(let i = 1;i<=len;i++){
						// console.log(data.signList[i-1]);
						// arr[i-1] = i;
						// status显示状态： 0：默认  1：已签到  2：未签到
						arr.push({
							num: i,
							sign: 0,
							count: 10
						})
						
						if(this.year <= this.today.getFullYear() && this.month <= this.today.getMonth()+1 && arr[i-1].num < this.day){
							arr[i-1].sign = 2
						}else if(this.year <= this.today.getFullYear() && this.month < this.today.getMonth()+1){
							arr[i-1].sign = 2
						}else{
							arr[i-1].sign = 0
						}
						
						// console.log(years[i-1],parseInt(months[i-1]),parseInt(days[i-1]));
						
						for(var j=0;j<data.signList.length;j++){
							if(years[j] == this.year && parseInt(months[j]) == this.month && parseInt(days[j]) == arr[i-1].num){
								arr[i-1].sign = 1;
								// console.log(this.year,this.month,arr[i-1].num);
								// arr.push({
								// 	num: i,
								// 	sign: 1
								// })
							}
						}
						
					}
					this.dateArr = arr;
				})
			},
			preMonth(){
				if(this.month == 1) {
					this.year --;
					this.month = 12;
				}else {
					this.month --;
				}
				this.getCalendar();
			},
			nextMonth(){
				if(this.month == 12) {
					this.year ++;
					this.month = 1;
				}else {
					this.month ++;
				};
				this.getCalendar();
			},
			toUser(){
				// uni.switchTab({
				// 	url:'../user'
				// })
				uni.navigateBack({
					delta: 1
				})
			},
			clickCheck(e){
				// console.log(this.checkArr);
				if(this.isClick == 1){
					return false;
				}
				if(e+1 != this.day){
					this.$api.msg("只能签到今日");
					return;
				}
				console.log('积分：'+this.myScore,'连续天数：'+this.checkArr.continuityDays);
				if(this.checkArr.isTodaySign == 1){
					this.$api.msg('今日已签到，明日再来');
				}else{
					checkModel.getSignIn((data)=>{
						this.isClick = 1;
						console.log(data);
						this.$api.msg(data.data);
						this.dateArr[this.day-1].sign = 1;
						
						this.myScoreAdd();
						
						if(this.checkArr.continuityDays == 0){
							// this.signCount = 0;
							this.signCountZero();
						}
						// 判断是否连续签到7天以上
						if(this.checkArr.continuityDays!=0 && this.checkArr.continuityDays%7 == 0){
							//每累计7天的次数 7=>1  14=>2  21=>3
							// this.signCount++;
							//计算每累计签到7天 额外多获得10积分
							// this.myScore = this.myScore + (10+this.signCount*10);
							this.signCountAdd();
						}
						console.log(this.signCount,this.myScore);
					})
				}
			},
			toMyPoints(){
				uni.navigateTo({
					url: "/pages/wallet/points"
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.calendarContainer{
	width:100%;
	height:1662rpx;
	position:relative;
	.navigation{
		width:750rpx;
		height:689rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:0px 0px 50rpx 50rpx;
		padding-top: 40upx;
		display: flex;
		/*  #ifdef  MP  */
		padding-top: 66rpx;
		/*  #endif  */
		image{
			margin-left: 20rpx;
			width:22rpx;
			height:36rpx;
		}
		view{
			margin-left: 299rpx;
			font-size:36rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:36rpx;
		}
	}
	.mypoints{
		z-index:4;
		width:710rpx;
		height:140rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		position: absolute;
		top:128rpx;
		left:20rpx;
		right:20rpx;
		display: flex;
		align-items: center;
		.pointIcon{
			width:50rpx;
			height:50rpx;
			margin-left:20rpx;
		}
		view{
			width:598rpx;
			font-size:30rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
			line-height:30rpx;
			margin-left:12rpx;
		}
		.arrowIcon{
			width:10rpx;
			height:20rpx;
			
		}
	}
	.calendar{
		z-index:4;
		width:710rpx;
		height:997rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		position:absolute;
		top:288rpx;
		right:20rpx;
		left:20rpx;
		.chooseMonth{
			height:93rpx;
			display: flex;
			align-items: center;
			border-bottom:1rpx solid #E6E6E6;
			image{
				width:15rpx;
				height:25rpx;
			}
			.left{
				margin-left: 170rpx;
			}
			view{
				margin-left: 83rpx;
				width:247rpx;
			}
		}
		.list{
			padding:40rpx 40rpx 0 10rpx;
			display: flex;
			flex-wrap: wrap;
			.item{
				margin-left: 30rpx;
				width:80rpx;
				.ball{
					width:80rpx;
					height:80rpx;
					border-radius:50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-family:Source Han Sans CN;
					color:rgba(180,180,180,1);
					background:rgba(246,246,246,1);
					box-shadow:0rpx 3rpx 3rpx 0rpx rgba(180,180,180,1);	
					&.finish{	
						color:rgba(255,255,255,1);	
						background:linear-gradient(90deg,rgba(254,189,50,1),rgba(255,150,0,1));
						box-shadow:0rpx 3rpx 3rpx 0rpx rgba(223,159,35,0.34);			
					}
					&.miss{
						color:rgba(255,255,255,1);
						background:linear-gradient(90deg,rgba(254,106,85,1),rgba(239,58,46,1));
						box-shadow:0rpx 3rpx 3rpx 0rpx rgba(254,106,85,0.3);
					}
				}
				.day{
					width:80rpx;
					height:20rpx;
					margin-top: 14rpx;
					margin-bottom:26rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	.topleft{
		position:absolute;
		top:243rpx;
		left:100rpx;
		z-index:99
	}
	.topright{
		position:absolute;
		top:243rpx;
		left:628rpx;
		z-index:99
	}
	.bottomleft{
		position:absolute;
		top:1264rpx;
		left:100rpx;
		z-index:99
	}
	.bottomright{
		position:absolute;
		top:1264rpx;
		left:628rpx;
		z-index:99
	}
	.rules{
		width:710rpx;
		height:277rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		position: absolute;
		top:1305rpx;
		left:20rpx;
		right:20rpx;
		z-index:4;
		.title{
			font-size:30rpx;
			font-family:Source Han Sans CN;
			font-weight:500;
			color:rgba(60,60,60,1);
			line-height:30rpx;
			margin-top: 39rpx;
			margin-left: 263rpx;
			margin-bottom: 40rpx;
		}
		.text1{
			margin-left: 32rpx;
		}
		.text2{
			margin-left: 32rpx;
			margin-right: 32rpx;
		}
	}
	.pointIcon1{
		width:40rpx;
		height:40rpx;
		position: absolute;
		bottom:20rpx;
		left:219rpx;
	}
	.bottomTitle{
		font-size:30rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(60,60,60,1);
		line-height:30rpx;
		position: absolute;
		bottom:26rpx;
		left:283rpx;
	}
	.pointIcon2{
		width:40rpx;
		height:40rpx;
		position: absolute;
		bottom:20rpx;
		right:223rpx;
	}
}

.circle{
	width:26rpx;
	height:70rpx;
}

</style>
