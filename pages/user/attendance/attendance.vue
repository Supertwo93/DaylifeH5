<template>
	<view>
		<view :class="isShow?'opac':''" class="calendarContainer">
			<view class="navigation">
				<image src="/static/cut/back_white.png" @tap="toUser()"></image>
				<view>签到</view>
			</view>
			<view class="mypoints" @tap="toMyPoints">
				<image class="pointIcon" src="/static/cut/bigPoint.png"></image>
				<view>我的积分：{{checkArr.store}}</view>
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
				<view class="text1">1、第1天签到得5分,第2天签到得10分,第3天签到得15分,第4天签到得20分。</view>
				<view class="text2"> 2、连续签到4天后,每日签到获得积分都为20分。</view>
				<view class="text2">3、连续签到中断,则从第1天重新开始累计。</view>
			</view>
			
		</view>
		
		<view class="signBox" :class="isShow?'':'none'">
			<view class="addPoints">+{{todayStore}}积分</view>
			<view class="success">恭喜签到成功</view>
			<view class="days">本月累计签到{{checkArr.totalSignCount}}天</view>
			<image @tap="closeShow" src="https://sgz.wdttsh.com/mini_static/cut/iknow.png"></image>
		</view>
		
		<view v-if="isAttendance==1" class="bottomButton">今日已签到，明日再来</view>
		<view @tap="confirmSign" v-else class="bottomButton">签到</view>
		
	</view>
</template>

<script>
	import {CheckModel} from '../../../common/models/check.js';
	let checkModel = new CheckModel()
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
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
				isClick: 0,
				store:'',
				todayStore:'',
				isShow:false,
				isAttendance:''
			}
		},
		computed: {
			...mapState(['myScore','signCount','uerInfo'])
		},  
		onLoad:function(){
			usermodel.getInfo(data=>{
				this.isAttendance = data.isTodaySign
			})
			
			this.year = this.today.getFullYear();
			this.month = this.today.getMonth() + 1;
			this.day = this.today.getDate();
			
			this.getCalendar(this.year,this.month);
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
			checkModel.getUserInfo(data=>{
				this.store = data.store
			})
		},
		methods: {
			...mapMutations(['myScoreAdd','signCountAdd','signCountZero']),
			closeShow(){
				this.isShow = false
			},
			confirmSign(){
				checkModel.getSignIn((data)=>{
					this.isClick = 1;
					console.log(data);
					this.todayStore = data
					this.$api.msg(data.data);
					this.dateArr[this.day-1].sign = 1;
					this.isShow = true
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
					this.getCalendar(this.year,this.month);
					this.isAttendance = 1
				})
			},
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
			getCalendar(cYear,cMonth){
				var len = this.getLen();
				var arr = new Array();
				var daySign = {};
				let years = [];
				let months = [];
				let days = [];
				let integrals = [];
					
				checkModel.getSignSelect({year:cYear,month:cMonth},(data)=>{
					console.log(data);
					this.checkArr = data;
					
					for(var c=0;c<len;c++){
						if(data.signList[c] != undefined){
							years.push(data.signList[c].createTime.substring(0,4))
							months.push(data.signList[c].createTime.substring(5,7))
							days.push(data.signList[c].createTime.substring(8,10))
							integrals.push(data.signList[c].integral)
						}else{
							years.push(0)
							months.push(0)
							days.push(0)
							integrals.push(0)
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
							count: 5
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
								arr[i-1].count = integrals[j]
								// console.log(this.year,this.month,arr[i-1].num);
								// arr.push({
								// 	num: i,
								// 	sign: 1
								// })
							}
						}
						
					}
					this.dateArr = arr;
					console.log(this.dateArr)
				})
			},
			preMonth(){
				if(this.month == 1) {
					this.year --;
					this.month = 12;
					console.log(this.year,this.month)
					
				}else {
					this.month --;
					
				}
				this.getCalendar(this.year,this.month)
			},
			nextMonth(){
				if(this.month == 12) {
					this.year ++;
					this.month = 1;
				}else {
					this.month ++;
				};
				this.getCalendar(this.year,this.month)
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
						this.todayStore = data
						this.$api.msg(data.data);
						this.dateArr[this.day-1].sign = 1;
						this.isShow = true
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
						this.getCalendar(this.year,this.month);
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
	padding-bottom:100rpx;
}
.calendarContainer{
	width:100%;
	height:1662rpx;
	position:relative;
	&.opac{
		opacity: 0.4;
	}
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


.signBox{
	background:url('data:image/png;base64,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CiZAgAABAgQEGDNAgAABAgQIpBMQYNK1TMEECBAgQICAAGMGCBAgQIAAgXQCAky6limYAAECBAgQEGDMAAECBAgQIJBOQIBJ1zIFEyBAgAABAgKMGSBAgAABAgTSCQgw6VqmYAIECBAgQECAMQMECBAgQIBAOgEBJl3LFEyAAAECBAgIMGaAAAECBAgQSCcgwKRrmYIJECBAgAABAcYMECBAgAABAukEBJh0LVMwAQIECBAgIMCYAQIECBAgQCCdgACTrmUKJkCAAAECBAQYM0CAAAECBAikExBg0rVMwQQIECBAgIAAYwYIECBAgACBdAICTLqWKZgAAQIECBAQYMwAAQIECBAgkE5AgEnXMgUTIECAAAECAowZIECAAAECBNIJCDDpWqZgAgQIECBAQIAxAwQIECBAgEA6AQEmXcsUTIAAAQIECAgwZoAAAQIECBBIJyDApGuZggkQIECAAAEBxgwQIECAAAEC6QQEmHQtUzABAgQIECAgwJgBAgQIECBAIJ2AAJOuZQomQIAAAQIEBBgzQIAAAQIECKQTEGDStUzBBAgQIECAgABjBggQIECAAIF0AgJMupYpmAABAgQIEBBgzAABAgQIECCQTkCASdcyBRMgQIAAAQICjBkgQIAAAQIE0gkIMOlapmACBAgQIEBAgDEDBAgQIECAQDoBASZdyxRMgAABAgQICDBmgAABAgQIEEgnIMCka5mCCRAgQIAAAQHGDBAgQIAAAQLpBASYdC1TMAECBAgQICDAmAECBAgQIEAgnYAAk65lCiZAgAABAgQEGDNAgAABAgQIpBMQYNK1TMEECBAgQICAAGMGCBAgQIAAgXQCAky6limYAAECBAgQEGDMAAECBAgQIJBOQIBJ1zIFEyBAgAABAgKMGSBAgAABAgTSCQgw6VqmYAIECBAgQECAMQMECBAgQIBAOgEBJl3LFEyAAAECBAgIMGaAAAECBAgQSCcgwKRrmYIJECBAgAABAcYMECBAgAABAukEBJh0LVMwAQIECBAgIMCYAQIECBAgQCCdgACTrmUKJkCAAAECBAQYM0CAAAECBAikExBg0rVMwQQIECBAgIAAYwYIECBAgACBdAICTLqWKZgAAQIECBAQYMwAAQIECBAgkE5AgEnXMgUTIECAAAECAowZIECAAAECBNIJCDDpWqZgAgQIECBAQIAxAwQIECBAgEA6AQEmXcsUTIAAAQIECAgwZoAAAQIECBBIJyDApGuZggkQIECAAAEBxgwQIECAAAEC6QQEmHQtUzABAgQIECAgwJgBAgQIECBAIJ2AAJOuZQomQIAAAQIEBBgzQIAAAQIECKQTEGDStUzBBAgQIECAgABjBggQIECAAIF0AgJMupYpmAABAgQIEBBgzAABAgQIECCQTkCASdcyBRMgQIAAAQICjBkgQIAAAQIE0gkIMOlapmACBAgQIEBAgDEDBAgQIECAQDoBASZdyxRMgAABAgQICDBmgAABAgQIEEgnIMCka5mCCRAgQIAAAQHGDBAgQIAAAQLpBASYdC1TMAECBAgQICDAmAECBAgQIEAgnYAAk65lCiZAgAABAgQEGDNAgAABAgQIpBMQYNK1TMEECBAgQICAAGMGCBAgQIAAgXQCAky6limYAAECBAgQEGDMAAECBAgQIJBOQIBJ1zIFEyBAgAABAgKMGSBAgAABAgTSCQgw6VqmYAIECBAgQECAMQMECBAgQIBAOgEBJl3LFEyAAAECBAgIMGaAAAECBAgQSCcgwKRrmYIJECBAgAABAcYMECBAgAABAukEBJh0LVMwAQIECBAgIMCYAQIECBAgQCCdgACTrmUKJkCAAAECBAQYM0CAAAECBAikExBg0rVMwQQIECBAgIAAYwYIECBAgACBdAICTLqWKZgAAQIECBAQYMwAAQIECBAgkE5AgEnXMgUTIECAAAECAowZIECAAAECBNIJCDDpWqZgAgQIECBAQIAxAwQIECBAgEA6AQEmXcsUTIAAAQIECAgwZoAAAQIECBBIJyDApGuZggkQIECAAAEBxgwQIECAAAEC6QQEmHQtUzABAgQIECAgwJgBAgQIECBAIJ2AAJOuZQomQIAAAQIEBBgzQIAAAQIECKQTEGDStUzBBAgQIECAgABjBggQIECAAIF0AgJMupYpmAABAgQIEBBgzAABAgQIECCQTkCASdcyBRMgQIAAAQICjBkgQIAAAQIE0gkIMOlapmACBAgQIEBAgDEDBAgQIECAQDoBASZdyxRMgAABAgQICDBmgAABAgQIEEgnIMCka5mCCRAgQIAAAQHGDBAgQIAAAQLpBASYdC1TMAECBAgQICDAmAECBAgQIEAgnYAAk65lCiZAgAABAgQEGDNAgAABAgQIpBMQYNK1TMEECBAgQICAAGMGCBAgQIAAgXQCAky6limYAAECBAgQEGDMAAECBAgQIJBOQIBJ1zIFEyBAgAABAgKMGSBAgAABAgTSCQgw6VqmYAIECBAgQECAMQMECBAgQIBAOgEBJl3LFEyAAAECBAgIMGaAAAECBAgQSCcgwKRrmYIJECBAgAABAcYMECBAgAABAukEBJh0LVMwAQIECBAgIMCYAQIECBAgQCCdgACTrmUKJkCAAAECBAQYM0CAAAECBAikExBg0rVMwQQIECBAgIAAYwYIECBAgACBdAICTLqWKZgAAQIECBAQYMwAAQIECBAgkE5AgEnXMgUTIECAAAECAowZIECAAAECBNIJCDDpWqZgAgQIECBAQIAxAwQIECBAgEA6AQEmXcsUTIAAAQIECAgwZoAAAQIECBBIJyDApGuZggkQIECAAAEBxgwQIECAAAEC6QQEmHQtUzABAgQIECAgwJgBAgQIECBAIJ2AAJOuZQomQIAAAQIEBBgzQIAAAQIECKQTEGDStUzBBAgQIECAgABjBggQIECAAIF0AgJMupYpmAABAgQIEBBgzAABAgQIECCQTkCASdcyBRMgQIAAAQICjBkgQIAAAQIE0gkIMOlapmACBAgQIEBAgDEDBAgQIECAQDoBASZdyxRMgAABAgQICDBmgAABAgQIEEgnIMCka5mCCRAgQIAAAQHGDBAgQIAAAQLpBASYdC1TMAECBAgQICDAmAECBAgQIEAgnYAAk65lCiZAgAABAgQEGDNAgAABAgQIpBMQYNK1TMEECBAgQICAAGMGCBAgQIAAgXQCAky6limYAAECBAgQEGDMAAECBAgQIJBOQIBJ1zIFEyBAgAABAgKMGSBAgAABAgTSCQgw6VqmYAIECBAgQECAMQMECBAgQIBAOgEBJl3LFEyAAAECBAgIMGaAAAECBAgQSCcgwKRrmYIJECBAgAABAcYMECBAgAABAukEBJh0LVMwAQIECBAgIMCYAQIECBAgQCCdgACTrmUKJkCAAAECBAQYM0CAAAECBAikExBg0rVMwQQIECBAgIAAYwYIECBAgACBdAICTLqWKZgAAQIECBAQYMwAAQIECBAgkE5AgEnXMgUTIECAAAECAowZIECAAAECBNIJCDDpWqZgAgQIECBAQIAxAwQIECBAgEA6AQEmXcsUTIAAAQIECAgwZoAAAQIECBBIJyDApGuZggkQIECAAAEBxgwQIECAAAEC6QQEmHQtUzABAgQIECAgwJgBAgQIECBAIJ2AAJOuZQomQIAAAQIEBBgzQIAAAQIECKQTEGDStUzBBAgQIECAgABjBggQIECAAIF0AgJMupYpmAABAgQIEBBgzAABAgQIECCQTkCASdcyBRMgQIAAAQICjBkgQIAAAQIE0gkIMOlapmACBAgQIEBAgDEDBAgQIECAQDoBASZdyxRMgAABAgQICDBmgAABAgQIEEgnIMCka5mCCRAgQIAAAQHGDBAgQIAAAQLpBASYdC1TMAECBAgQICDAmAECBAgQIEAgnYAAk65lCiZAgAABAgQEGDNAgAABAgQIpBMQYNK1TMEECBAgQICAAGMGCBAgQIAAgXQCAky6limYAAECBAgQEGDMAAECBAgQIJBOQIBJ1zIFEyBAgAABAgKMGSBAgAABAgTSCQgw6VqmYAIECBAgQECAMQMECBAgQIBAOgEBJl3LFEyAAAECBAgIMGaAAAECBAgQSCcgwKRrmYIJECBAgAABAcYMECBAgAABAukEBJh0LVMwAQIECBAgIMCYAQIECBAgQCCdgACTrmUKJkCAAAECBAQYM0CAAAECBAikExBg0rVMwQQIECBAgIAAYwYIECBAgACBdAICTLqWKZgAAQIECBAQYMwAAQIECBAgkE5AgEnXMgUTIECAAAECAowZIECAAAECBNIJCDDpWqZgAgQIECBAQIAxAwQIECBAgEA6AQEmXcsUTIAAAQIECAgwZoAAAQIECBBIJyDApGuZggkQIECAAAEBxgwQIECAAAEC6QQEmHQtUzABAgQIECBQAsyFiBhGQYAAAQIECBBIIjBeAszxiFiTpGBlEiBAgAABAgRGS4B5ISJuYUGAAAECBAgQSCLwYgkwj0bELyUpWJkECBAgQIAAgW+XAPOFiPgUCwIECBAgQIBAEoEHSoB5f0R8J0nByiRAgAABAgQIvL8EmGsi4kBErOdBgAABAgQIEKi5wNGI2FaVIhuNxl9ExO/VvGDlESBAgAABAgT+sqqq358MMLdGxFMRsZwLAQIECBAgQKCmAucj4q6qqp5vBpj2Xpi/iojfrWnByiJAgAABAgQIfKWqqt8pDNMDzLr2XpgtfAgQIECAAAECNRM4GBF3V1X1xkUBpr0X5lci4uGIGKpZ0cohQIAAAQIElq7ARER8qKqqf5kkeGsPzOR/aDQafxwRX1y6RlZOgAABAgQI1Ezgk1VVfWl6TZcFmPaemD+NiD+sWfHKIUCAAAECBJaewJ9VVfVHly57xgDTDjGfiIgH/Jy09CbFigkQIECAQA0Eys9Gn6qq6ssz1XLFANMOMeUeSV+LCAf21qCTSiBAgAABAktEoByw+5tVVX37Suu9aoBph5i1EVHul/RbEVGu2utBgAABAgQIEJgPgXMR8TcR8emqqo5f7Qs6BpjJNzcajZsj4g8i4jciYtN8VO0zCRAgQIAAgSUpcDgivh4Rf15V1U+6Eeg6wEwLMssi4hciotwEckdE3B4RmyNiZUQMd/OltiFAgAABAgSWpMB4RJyOiEMR8WxEPB4R/x4R/1FV1YVeRP4fGHz+EDdB7g8AAAAASUVORK5CYII=');
	background-size: 560rpx 628rpx;
	position: fixed;
	// display: none;
	top:340rpx;
	left:95rpx;
	z-index: 999;
	width:560rpx;
	height:628rpx;
	&.none{
		display: none;
	}
	.addPoints{
		font-size:63rpx;
		color:rgba(255,255,255,1);
		margin-top: 206rpx;
		margin-left: 165rpx;
	}
	.success{
		margin-top: 80rpx;
		margin-left: 169rpx;
		font-size:36rpx;
		color:rgba(255,102,0,1);
	}
	.days{
		margin-top: 15rpx;
		margin-left: 171rpx;
		color:rgba(140,140,140,1);
	}
	image{
		width:240rpx;
		height:70rpx;
		margin-left: 160rpx;
		margin-top: 39rpx;
	}
}


.bottomButton{
	font-size:32rpx;
	color:white;
	z-index:11111;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0;
	width:750rpx;
	height:100rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
}
</style>
