<template>
	<view>
		<view v-if="data.firsttypeId==5" class="user">
			<view class="title">签约人</view>
			<view>欧阳华</view>
		</view>
		
		<view v-if="data.firsttypeId==5" class="user">
			<view class="title">联系电话</view>
			<view>13751157643</view>
		</view>
		
		<view v-if="data.firsttypeId==5" class="address">
			<view class="title">服务地址</view>
			<view class="content">广东省深圳市龙岗区龙岗街道9002号志联佳大厦508号</view>
		</view>
		
		<view v-if="data.firsttypeId==5" class="reason">
			<view class="choose">您要解约的原因</view>
			<picker @change="bindPickerChange" :value="index" :range="array" >
				<view class="container">
					<view class="detail">{{array[index]}}</view>
					<image src="/static/cut/grayright.png"></image>
				</view>
			</picker>
		</view>
		
		<view v-if="data.firsttypeId==1" class="user">
			<view class="title">姓名</view>
			<view>{{data.partyaName}}</view>
		</view>
		
		<view v-if="data.firsttypeId==1" class="user">
			<view class="title">电话</view>
			<view>{{data.partyaPhone}}</view>
		</view>
		
		<view v-if="data.firsttypeId==1" class="address">
			<view class="title">房屋</view>
			<view class="content">{{data.address}}</view>
		</view>
		
		<view v-if="data.firsttypeId==1" class="reason">
			<view class="choose">您要退租的原因</view>
			<picker @change="bindPickerChange1" :value="index1" :range="array1" >
				<view class="container">
					<view class="detail">{{array1[index1]}}</view>
					<image src="/static/cut/grayright.png"></image>
				</view>
			</picker>
		</view>
		
		<view v-if="data.firsttypeId==1" class="reason">
			<view class="choose star">选择搬离时间</view>
			<hTimePicker interval="15" @changeTime="changeTime">
				<view  slot="pCon" class="container">
					<view class="detail">{{leaveTime}}</view>
					<image src="/static/cut/grayright.png"></image>
				</view>
			</hTimePicker>
		</view>
		
		<view class="remark1">注：未在合同约定时间内解约的，</view>
		<view class="remark2">还需甲方同意解约，才可正式解除合同。</view>
		
		
		<view v-if="data.firsttypeId==5" class="submit-button" @tap="financeConfirm">确认提交</view>
		<view v-if="data.firsttypeId==1" class="submit-button" @tap="houseConfirm">确认提交</view>
	</view>
</template>

<script>
import hTimePicker from '@/components/h-timePicker.vue'
import {HouseModel} from '@/common/models/house.js'
import {FinanceModel} from '@/common/models/finance.js'
const housemodel = new HouseModel()
const financemodel = new FinanceModel()
export default{
	components:{
		hTimePicker
	},
	data(){
		return{
			data:'',
			index:0,
			index1:0,
			array:['合同到期','个人原因','服务太差'],
			array1:['清洁问题','室友问题','个人原因','租金太高','合同到期'],
			leaveTime:'选择时间'
		}
	},
	onLoad(options){
		this.data = JSON.parse(options.data)
		console.log(this.data);
	},
	methods:{
		bindPickerChange: function(e) {
			this.index = e.target.value
		},
		bindPickerChange1: function(e) {
			this.index1 = e.target.value
		},
		changeTime(date,time){
			time = new Date(time)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let day = time.getDate()
			let hours = time.getHours()
			let minute = time.getMinutes()
			if(month>0&&month<10){
				month = '0' + month
			}
			if(day>0&&day<10){
				day = '0' + day
			}
			if(hours>=0&&hours<10){
				hours = '0' + hours
			}
			if(minute>=0&&minute<10){
				minute = '0' + minute
			}
			this.leaveTime = `${year}年${month}月${day}日 ${hours}:${minute}`
		},
		houseConfirm(){
			if(this.leaveTime=='选择时间'){
				uni.showToast({
					title:'请选择搬离时间',
					duration:1500,
					icon:'none'
				})
				return 
			}
			let req = {}
			req.orderCode = this.data.orderCode
			req.evacuateReason = this.array1[this.index1]
			req.changeName = 1
			req.evacuateDate = this.leaveTime
			req.billCode = this.data.billCode
			housemodel.changeSingningStatus(req,data=>{
				uni.showToast({
					title:'您已申请成功，请等待房东反馈',
					icon:'none',
					duration:1500
				})
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/user/agreement/agreement'
					})
				},1500)
			})
		},
		financeConfirm(){
			let req = {}
			req.orderCode = this.data.orderCode
			req.financeCode = this.data.financeCode
			req.rescissionReason = this.array[this.index]
			req.changeName = 2
			 financemodel.modifyFinancialOrders(req,data=>{
				uni.showToast({
					title:'您已申请成功，请等待甲方确认',
					icon:'none',
					duration:1500
				})
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/user/agreement/agreement'
					})
				},1500)
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	margin-top: 20rpx;
}
.user{
	background-color: #fff;
	display: flex;
	align-items: center;
	height:84rpx;
	border-bottom:1rpx solid #f2f2f2;
}
.title{
		width:144rpx;
		padding-left: 19rpx;
		color:rgba(100,100,100,1);
}
.address{
	height:121rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
}	
.reason{
	margin-top: 20rpx;
	background-color: #fff;
	height:84rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 20rpx;
	.container{
		display: flex;
		align-items: center;
	}
}
image{
	width:10rpx;
	height:20rpx;
	margin-left: 10rpx;
}

.remark1{
	color:rgba(255,102,0,1);
	margin-top: 80rpx;
	margin-left: 180rpx;
}
.remark2{
	color:rgba(255,102,0,1);
	margin-left: 144rpx;
}
</style>
