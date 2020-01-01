<template>
	<view>
		<view class="item">
			<view class="title">姓名</view>
			<view class="content">{{data.partybName}}</view>
		</view>
		<view class="item">
			<view class="title">房屋</view>
			<view class="content">{{data.title}}</view>
		</view>
		<view class="item">
			<view class="title">证件</view>
			<view class="content">{{data.partybId}}</view>
		</view>
		
		<view class="read">
			<view class="confirm">
				<view class="gray">租赁合同事项确认</view>
				<image @tap="showAlert" :src="isContract?img[1]:img[0]"></image>
			</view>
			<view class="reading">
				<view class="gray">请仔细阅读并确认租赁合同事项哦~</view>
				<view class="check" @tap="toContract">点击查看合同</view>
			</view>
		</view>
		
		<view class="timepicker">
			<view class="star title">租期时长</view>
			<view class="choose">
				<view class="startDate">
					<picker mode="date" :start="startday" @change="startdateChange">
						<view>{{startDate}}</view>
					</picker>
				</view>
				<view>至</view>
				<view class="endDate">
					<picker mode="date" @change="enddateChange">
						<view>{{endDate}}</view>
					</picker>
				</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		<view class="payway">
			<view class="star">付款方式</view>
			<view class="gray">已选择：{{data.paymentMethod}}</view>
		</view>
		
		<view class="info">
			<view class="storeInfo">
				<image src="/static/cut/dpicon.png"></image>
				<view>刘小虎</view>
			</view>
			<view class="houseInfo">
				<image src="../../../static/cut/alipay.png"></image>
				<view class="detail">
					<view class="title">合租-万科天誉二期4居室-01卧室</view>
					<view class="gray">季付</view>
				</view>
			</view>
			<view class="list">
				<view class="name">租金</view>
				<view class="price">{{rent}}</view>
			</view>
			<view class="list">
				<view class="name">服务费</view>
				<view class="price">{{service}}</view>
			</view>
			<view class="total">
			</view>
		</view>
		<view class="graytips">注：确认支付即为同意签约，系统自动生成合同</view>
		
		<view @tap="confirm()" class="submit-button">确认提交</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	import {HouseModel} from '@/common/models/house.js'
	const housemodel = new HouseModel()
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				img:['/static/cut/no_selected.png','/static/cut/choosed.png'],
				isRead:false,
				startDate:'请选择开始日期',
				endDate:'请选择结束日期',
				startday:'',
				endday:'',
				data:'',
				rent:'',
				service:'',
				isContract:false,
				info:''
			}
		},
		onLoad(options){
			this.data = JSON.parse(options.data)
			console.log(this.data)
			usermodel.queryRerentInfo({orderCode:this.data.orderCode,contractCode:this.data.contractCode},data=>{
				this.info = data
				if(this.data.paymentMethod=="月付"){
					this.rent = data.paMonthly
					this.service = data.monthServicecharge
				}else if(this.data.paymentMethod=='季付'){
					this.rent = data.quarterlyPayment
					this.service = data.seasonServicecharge
				}
				else if(this.data.paymentMethod=='半年付'){
					this.rent = data.halfPay
					this.service = data.halfServicecharge
				}else if(this.data.paymentMethod=='年付'){
					this.rent = data.yearPay
					this.service = data.yearServicecharge
				}
			})
		},
		methods:{
			getCurrentDate(){
				const date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				this.starday = year + '-' + month + '-' + day
				const endYear = year + 1
				this.endday = endYear + '-' + month + '-' + day
				console.log(this.endday)
				
			},
			startdateChange(e){
				this.startDate = e.target.value
			},
			enddateChange(e){
				this.endDate = e.target.value
			},
			showAlert(){
				if(this.isContract==false){
					uni.showToast({
						title:'请先阅读合同后再确认',
						duration:1500,
						icon:'none'
					})
				}
			},
			toContract(){
				uni.navigateTo({
					url:`/pages/house/housecontract?type=1&id=${this.data.releaseId}`
				})
			},
			confirm(){
				let req = {}
				req.orderCode = this.data.orderCode
				req.changeName = 3
				housemodel.changeSingningStatus(req,data=>{
					let request = {}
					request.sellerId = this.info.sellerId
					request.releaseId = this.info.releaseId
					request.firstTypeId = 1
					request.name = this.info.name
					request.gender = this.info.gender
					request.telephone = this.info.telephone
					request.identityCard = this.info.identityCard
					request.picture = this.info.picture
					request.duration = this.startDate + '至' + this.endDate
					request.paymentMethod = this.data.paymentMethod
					request.confirmContract = 1
					request.confirmProperty = 1
					request.confirmHousingResources = 1
					request.deposit = this.info.deposit
					request.serviceCharge = this.service
					request.rental = this.rent
					housemodel.addSigning(request,data=>{
						uni.navigateTo({
							url:'/pages/success/success'
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
		padding-bottom: 100rpx;
	}
	
	.item{
		display: flex;
		background-color: #fff;
		height:84rpx;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		.title{
			margin-left: 19rpx;
			margin-right: 33rpx;
		}
	}
	.item:first-child{
		margin-top: 20rpx;
	}
	.read{
		height:208rpx;
		background-color: #fff;
		padding:0 20rpx;
		.confirm{
			height:82rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width:28rpx;
				height:28rpx;
			}
			margin-top: 20rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.reading{
			height: 125rpx;
			display: flex;
			align-items: center;
			.check{
				color:#FF6600;
			}
		}
	}
	
	.timepicker{
		height:84rpx;
		background-color: #fff;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title{
			padding-left:20rpx;
			width:300rpx;
		}
		.choose{
			display: flex;
			width:450rpx;
			justify-content:space-around;
			align-items: center;
			image{
				width:10rpx;
				height:20rpx;
			}
		}
	}
	
	.payway{
		border-top: 1rpx solid #f2f2f2;
		height:84rpx;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		justify-content:space-between;
		background-color: #fff;
	}
	
	
	.info{
		background-color: #fff;
		padding:0 20rpx;
		margin-top: 20rpx;
		
		.storeInfo{
			height:89rpx;
			display: flex;
			align-items: center;
			image{
				width:32rpx;
				height:29rpx;
			}
		}
		.houseInfo{
			height:80rpx;
			display: flex;
			margin-bottom: 20rpx;
			image{
				margin-right: 20rpx;
				width:80rpx;
				height:80rpx;
			}
			.detail{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		.list{
			margin-bottom: 25rpx;
			display: flex;
			height:30rpx;
			justify-content: space-between;
			align-items: center;
		}
		.total{
			border-top: 1rpx solid #f2f2f2;
		}
	}
	.graytips{
		display: flex;
		align-items: center;
		justify-content: center;
		height:62rpx;
	}
	
</style>
