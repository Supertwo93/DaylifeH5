<template>
	<view>
		<view class="title-box">
			<image :src="data.picture|formatPic"></image>
			<view class="rt">
				<view class="title">{{data.title}}</view>
				<view class="gray">￥{{data.price}}/年</view>
			</view>
		</view>
		
		<view class="graytitle">联系人信息</view>
		
		<view class="item">
			<view class="item-name">姓名</view>
			<input v-model="name" placeholder="姓名"/>
		</view>
		
		<view class="item">
			<view class="item-name">称呼</view>
			<view class="choose-box">
				<view :class="female==1?'on':''" @tap="chooseSex(0)">女士</view>
				<view :class="male==1?'on':''" @tap="chooseSex(1)">男士</view>
			</view>
		</view>
		
		<view class="item">
			<view class="item-name">手机</view>
			<input v-model="phone"  placeholder="手机"/>
		</view>
		
		<view class="item">
			<view class="item-name">预约时间</view>
			<hTimePicker interval="15" @changeTime="changeTime">
				<view slot="pCon" class="changeTime">
					{{appointment}}
					<image src="/static/cut/grayright.png"></image>
				</view>
			</hTimePicker>
		</view>
		
		<view class="graytitle">留言</view>
		<textarea v-model="message" placeholder="更多需求或想办理的业务(选填)"></textarea>
		
		<view class="submit-button" @tap="confirm()">确认预约</view>
	</view>
</template>

<script>
import hTimePicker from "@/components/h-timePicker.vue"
import {FinanceModel} from '@/common/models/finance.js'
const financemodel = new FinanceModel()
export default{
	filters:{
		formatPic(value){
			return value.split(',')[0]
		}
	},
	components:{
		hTimePicker
	},
	data(){
		return{
			male:true,
			female:false,
			name:'',
			phone:'',
			appointment:'点击选择时间',
			message:'',
			data:''
		}
	},
	onLoad(options) {
		this.data = JSON.parse(options.data)
	},
	methods:{
		chooseSex(index){
			if(index==0){
				this.female = true
				this.male = false
			}else if(index==1){
				this.female = false
				this.male = true
			}
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
			this.appointment = `${year}年${month}月${day}日 ${hours}:${minute}`
		},
		confirm(){
			if(this.name==''){
				uni.showToast({
					title: '请输入姓名',
					duration:1500,
					icon:'none'
				})
				return
			}
			if(this.phone==''){
				uni.showToast({
					title: '请输入电话号码',
					duration:1500,
					icon:'none'
				})
				return
			}
			if(this.appointment=='点击选择时间'){
				uni.showToast({
					title: '请选择预约时间',
					duration:1500,
					icon:'none'
				})
				return
			}
			let req = {}
			req.sellerId = this.data.sellerId
			req.leavingMessage = this.message
			req.appointmentDate = this.appointment
			req.telephone = this.phone
			req.name = this.name 
			if(this.male==true){
				req.gender = 1
			}else{
				req.gender = 0
			}
			req.orderType = 2
			req.financeCode = this.data.financeCode
			let signingFinanceJson = JSON.stringify(req)
			financemodel.signFinance({signingFinanceJson},data=>{
				uni.redirectTo({
					url:`/pages/success/success?type=6`
				})
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.title-box{
	margin-top: 20rpx;
	width:750rpx;
	height:220rpx;
	background-color: #fff;
	display: flex;
	padding:30rpx 20rpx;
	image{
		width:160rpx;
		height:160rpx;
	}
	.rt{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}

.item{
	background-color: #fff;
	border-bottom: 1rpx solid #f2f2f2;
	width:750rpx;
	height:84rpx;
	padding:0 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	input{
		text-align: right;
	}
	.changeTime{
		image{
			margin-left: 20rpx;
			width:10rpx;
			height:20rpx;
		}
	}
	.choose-box{
		display: flex;
		align-items: center;
		view{
			font-size:20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width:80rpx;
			height:36rpx;
			border:1rpx solid rgba(255,102,0,1);
			border-radius:6rpx 0rpx 0rpx 6rpx;
			&.on{
				background-color:#FF6600;
				color:#fff;
			}
		}
	}
}

textarea{
	background-color: #fff;
	width:750rpx;
	height:360rpx;
	padding-top:20rpx;
}
</style>
