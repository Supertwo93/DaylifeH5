<template>
	<view>
		<view class="item">
			<view class="title">姓名</view>
			<view class="content">{{info.name}}</view>
		</view>
		<view class="item">
			<view class="title">联系电话</view>
			<view class="content">{{data.telephone}}</view>
		</view>
		<view class="item">
			<view class="title">公司名称</view>
			<view class="content">{{data.companyName}}</view>
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
		
		<view class="info">
			<view class="storeInfo">
				<image src="/static/cut/dpicon.png"></image>
				<view>{{data.partyaName}}</view>
			</view>
			<view class="houseInfo">
				<image :src="info.picture.split(',')[0]"></image>
				<view class="detail">
					<view class="title">{{info.title}}</view>
					<view class="gray">{{info.specsName}}</view>
				</view>
			</view>
		</view>
		<view class="graytips">注：确认支付即为同意签约，系统自动生成合同</view>
		
		<view @tap="confirm()" class="submit-button">确认提交</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	import {HouseModel} from '@/common/models/house.js'
	import {FinanceModel} from '@/common/models/finance.js'
	const housemodel = new HouseModel()
	const usermodel = new UserModel()
	const financemodel = new FinanceModel()
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
			usermodel.queryResignInfo({orderCode:this.data.orderCode},data=>{
				this.info = data
				console.log(this.info)
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
					url:`/pages/house/housecontract?type=金融&code=${this.data.financeCode}`
				})
			},
			confirm(){
				let req = {}
				req.orderCode = this.data.orderCode
				req.financeCode = this.data.financeCode
				req.changeName = 1
				financemodel.modifyFinancialOrders(req,data=>{
					let req = {}
					req.name = this.info.name
					req.signingStartTime = this.startDate
					req.signingEndTime = this.endDate
					req.sellerId = this.info.sellerId
					req.confirmContract = 1
					req.companyAddress = this.info.companyAddress
					req.identityCard = this.info.identityCard
					req.companyName = this.info.companyName
					req.gender = this.info.gender
					req.telephone = this.info.telephone
					req.specsId = this.info.specsId
					req.financeCode = this.info.financeCode
					req.orderType = 1
					req.idPicture = this.info.idPicture
					req.businessLicense = this.info.businessLicense
					let request = JSON.stringify(req)
					financemodel.signFinance({signingFinanceJson:request},data=>{
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
		padding:0 20rpx 20rpx 20rpx;
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
