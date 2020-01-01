<template>
	<view>
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
					<picker mode="date" :start="endday" @change="enddateChange">
						<view>{{endDate}}</view>
					</picker>
				</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		<view class="payType">
			<view class="star title">付款方式</view>
			<view class="content" @tap="choosePay">
				<view class="way">{{payType}}</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		<view class="confirm">
			<view class="tips">
				<view class="star">房屋合同事项确认</view>
				<image :src="[isContract?src[1]:src[0]]" @tap="conformToast"></image>
			</view>
			<view class="gray">请仔细阅读并确认租聘合同事项哦~<text @tap="toContract">点击查看合同</text></view>
		</view>
		
		<view class="property">
			<view class="tips">
				<view class="star">物业交割信息确认</view>
				<image :src="[isProperty?src[1]:src[0]]" @tap="conformProperty"></image>
			</view>
			<view class="survey">
				<view class="water">水：起始数{{data.waterRise}};{{data.waterCost}}/m³</view>
				<view class="elec">电：起始数{{data.electricRise}};{{data.electricCost}}/kwh</view>
				<view class="else">房屋设施：{{data.survey}}</view>
			</view>
		</view>
		
		<view class="info">
			<view class="tips">
				<view class="star">房源信息确认</view>
				<image :src="[isHousingResources?src[1]:src[0]]" @tap="conformResource"></image>
			</view>
			<view class="detail">
				<view class="line"><view class="gray">面积</view><view class='data'>{{data.squareMetre}}㎡</view></view>
				<view class="line"><view class="gray">户型</view><view class='data'>{{data.houseType}}</view></view>
			</view>
			<view class="detail">
				<view class="line"><view class="gray">租房</view><view class='data'>合租</view></view>
				<view class="line"><view class="gray">楼层</view><view class='data'>{{floorInfo}}</view></view>
			</view>
			<view class="detail">
				<view class="line"><view class="gray">年代</view><view class='data'>{{data.years}}年</view></view>
				<view class="line"><view class="gray">面积</view><view class='data'>{{data.houseType}}</view></view>
			</view>
			<view class="detail">
				<view class="lineBottom"><view class="gray">地址</view><view>{{data.address}}</view></view>
			</view>
		</view>
		
		<view class="remark">注：确认签约后待商家同意签约，再支付款项。</view>
		
		<view class="submit-button" @click="confirmSign">确认签约</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="container">
				<view class="top">
					<view class="cancel" @tap="cancel">取消</view>
					<view class="title">请选择付款方式</view>
					<view class="sure" @tap="sure">确定</view>
				</view>
				<view class="typeBox">
					<view>月付<text class="gray">（押金￥{{data.deposit}}元、服务费￥{{data.monthServicecharge}}/年）</text></view>
					<view>￥{{data.paMonthly}}/月</view>
					<image @tap="chooseMonth" :src="[isMonth?src[1]:src[0]]"></image>
				</view>
				<view class="typeBox">
					<view>季付<text class="gray">（押金￥{{data.deposit}}元、服务费￥{{data.seasonServicecharge}}/年）</text></view>
					<view>￥{{data.quarterlyPayment}}</view>
					<image @tap="chooseSeason" :src="[isSeason?src[1]:src[0]]"></image>
				</view>
				<view class="typeBox">
					<view>半年付<text class="gray">（押金￥{{data.deposit}}元、服务费￥{{data.halfServicecharge}}/年）</text></view>
					<view>￥{{data.halfPay}}</view>
					<image @tap="chooseHalf" :src="[isHalf?src[1]:src[0]]"></image>
				</view>
				<view class="typeBox">
					<view>年付<text class="gray">（押金￥{{data.deposit}}元、服务费￥{{data.yearServicecharge}}/年）</text></view>
					<view>￥{{data.yearPay}}</view>
					<image @tap="chooseYear" :src="[isYear?src[1]:src[0]]"></image>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import {HouseModel} from '@/common/models/house.js'
let housemodel = new HouseModel()
export default{
	components:{
		uniPopup
	},
	data(){
		return{
			src:['/static/cut/no_selected.png','/static/cut/selected.png'],
			data:'',
			isHousingResources:false,
			isContract:false,
			isProperty:false,
			startDate:'请选择开始日期',
			endDate:'请选择结束日期',
			startday:'',
			endday:'',
			payType:'月付',
			isMonth:true,
			isSeason:false,
			isHalf:false,
			isYear:false
		}
	},
	onLoad:function(options){
		let jsondata = JSON.parse(options.data)
		this.data = jsondata
		console.log(jsondata)
		this.getCurrentDate()
	},
	computed:{
		floorInfo(){
			return this.data.floor + '/' + this.data.attribute +'层'
		}
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
		toContract(){
			uni.navigateTo({
				url:'housecontract'
			})
		},
		conformToast(){
			if(this.isContract == 0){
				uni.showToast({
					title:'请先阅读租聘合同再做确认',
					icon:'none'
				})
			}else{
				
			}
		},
		conformProperty(){
			this.isProperty = !this.isProperty
		},
		conformResource(){
			this.isHousingResources = !this.isHousingResources
		},
		chooseMonth(){
			this.isMonth = true
			this.isSeason = false
			this.isHalf = false
			this.isYear = false
		},
		chooseSeason(){
			this.isMonth = false
			this.isSeason = true
			this.isHalf = false
			this.isYear = false
		},
		chooseHalf(){
			this.isMonth = false
			this.isSeason = false
			this.isHalf = true
			this.isYear = false
		},
		chooseYear(){
			this.isMonth = false
			this.isSeason = false
			this.isHalf = false
			this.isYear = true
		},
		choosePay(){
			this.$refs.popup.open()
		},
		cancel(){
			if(this.payType == '月付'){
				this.chooseMonth()
			}else if(this.payType == '季付'){
				this.chooseSeason()
			}else if(this.payType == '半年付'){
				this.chooseHalf()
			}else{
				this.chooseYear()
			}
			this.$refs.popup.close()
		},
		sure(){
			if(this.isMonth == true){
				this.payType = '月付'
			}else if(this.isSeason == true){
				this.payType = '季付'
			}else if(this.isHalf == true){
				this.payType = '半年付'
			}else{
				this.payType = '年付'
			}
			this.$refs.popup.close()
		},
		confirmSign(){
			let req = {}
			if(!this.startDate.startsWith('2')){
				uni.showToast({
					title:'请选择租期开始日期',
					icon:'none',
					duration:1500
				})
				return
			}else if(!this.endDate.startsWith('2')){
				uni.showToast({
					title:'请选择租期结束日期',
					icon:'none',
					duration:1500
				})
				return
			}else{
				let start = new Date(this.startDate)
				let end = new Date(this.endDate)
				if(start > end){
					uni.showToast({
						title:'租期开始日期大于结束日期，请重新选择',
						icon:'none',
						duration:1500
					})
					return
				}
			}
			if(this.isContract == 0){
				uni.showToast({
					title:'请先确认合同信息',
					icon:'none',
					duration:1500
				})
				return
			}else{
				req.confirmContract = 1
			}
			if(this.isProperty == 0){
				uni.showToast({
					title:'请先确认物业信息',
					icon:'none',
					duration:1500
				})
				return
			}else{
				req.confirmProperty = 1
			}
			if(this.isHousingResources == 0){
				uni.showToast({
					title:'请先确认房源信息',
					icon:'none',
					duration:1500
				})
				return
			}else{
				req.confirmHousingResources = 1
			}
			req.sellerId = this.data.sellerId
			req.name = this.data.name
			req.gender = this.data.sex
			req.telephone = this.data.telephone
			req.picture = this.data.idenPicture
			req.identityCard = this.data.identityCard
			req.duration = this.startDate + '至' + this.endDate
			req.paymentMethod = this.payType
			switch(this.payType){
				case '月付':
					req.serviceCharge = this.data.monthServicecharge
					break
				case '季付':
					req.serviceCharge = this.data.seasonServicecharge
				case '半年付':
					req.serviceCharge = this.data.halfServicecharge
				case '年付':
					req.serviceCharge = this.data.yearServicecharge
			}
			req.deposit = this.data.deposit
			req.rental = this.data.price
			req.releaseId = this.data.id
			req.firstTypeId = 1
			housemodel.addSigning(req,(data)=>{
				uni.navigateTo({
					url:'success'
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

.payType{
	height:84rpx;
	background-color: #fff;
	border-top: 1rpx solid #f2f2f2;
	display: flex;
	padding:0 20rpx;
	justify-content: space-between;
	align-items: center;
	.content{
		display: flex;
		align-items: center;
		image{
			margin-left: 20rpx;
			width:10rpx;
			height:20rpx;
		}
	}
}

.confirm{
	width:100%;
	height:208rpx;
	background-color: #fff;
	margin: 20rpx 0;
	padding: 0 20rpx;
	.gray{
		margin-top: 39rpx;
		text{
			color:#FF6600;
		}
	}
}

.property{
	width:100%;
	height:320rpx;
	background-color: #fff;
	padding: 0 20rpx;
}

.info{
	width:100%;
	height:339rpx;
	background-color: #fff;
	margin: 20rpx 0;
	padding:0 20rpx;
	.detail{
		display: flex;
		height:64rpx;
		align-items: center;
		.line{
			width:50%;
			display: flex;
			.gray{
				margin-right: 38rpx;
			}
		}
		.lineBottom{
			display: flex;
			.gray{
				margin-right: 38rpx;
			}
		}
	}
}
.tips{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height:82rpx;
	border-bottom: 1rpx solid #f2f2f2;
	image{
		width:28rpx;
		height:28rpx;
	}
}

.remark{
	heigth:65rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color:#8C8C8C;
}
.container{
	height:650rpx;
	padding:0 20rpx;
	.top{
		height:90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.cancel{
			color:#FF6600;
		}
		.sure{
			color:#FF6600;
		}
	}
	.typeBox{
		height:127rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		image{
			width:28rpx;
			height:28rpx;
		}
	}
}
</style>
