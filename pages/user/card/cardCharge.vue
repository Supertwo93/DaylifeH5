<template>
	<view>
		<view class="activity">
			<view class="title">充值活动</view>
			<view class="labelBox">
				<view @tap="chooseLabel(item,index)" :class="labelIndex==index?'active':''" v-for="(item,index) in activityList" :key="index" class="label">
					{{item.title}}
				</view>
			</view>
		</view>
		
		<view class="selfDefine">
			<view class="title">自定义充值金额</view>
			<view class="moneyBox">
				<view>￥</view>
				<input v-model="sMoney" @focus="handleFocus" type="number" />
				<image @tap="clearMoney" src="/static/cut/cancel.png"></image>
			</view>
		</view>
		
		<view @tap="toCharge" class="submit-button">确认充值
		<text v-if="aMoney!==''">￥{{aMoney}}</text>
		<text v-if="sMoney!==''">￥{{sMoney}}</text>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				id:'',
				userId:'',
				activityList:[],
				labelIndex:null,
				aMoney:'',
				sMoney:'',
				activityId:''
			}
		},
		onLoad(options){
			this.userId = options.userId
			this.id = options.id
			this.getChargeList()
		},
		methods:{
			getChargeList(){
				usermodel.getChargeActivity({memberCardId:this.id},data=>{
					this.activityList = data
				})
			},
			chooseLabel(item,index){
				this.activityId = item.id
				this.labelIndex = index
				this.aMoney = item.charge
			},
			handleFocus(){
				this.labelIndex = null
				this.aMoney = ''
			},
			clearMoney(){
				this.sMoney = ''
			},
			toCharge(){
				let req = {}
				req.userMemberCardId = this.userId
				req.memberCardId = this.id
				req.type = 3
				if(this.labelIndex==null&&this.sMoney==''){
					uni.showToast({
						title:'请选择充值类型',
						icon:'none',
						duration:1500
					})
					return 
				}else if(this.labelIndex !=null){
					req.rechargeType = 2
					req.memberCardRechargeActivityId = this.activityId
				}else if(this.labelIndex==null&&this.sMoney!=''){
					req.rechargeType = 1
					req.rechargeMoney = this.sMoney
				}
				usermodel.cardRecharge(req,data=>{
					uni.requestPayment({
						provider:'wxpay',
						timeStamp:data.timeStamp,
						nonceStr:data.nonceStr,
						package:data.package,
						signType:data.signType,
						paySign:data.paySign,
						success:()=>{
							uni.navigateTo({
								url:'/pages/success/success?type=' + 3
							})
						},
						fail:(err)=>{
							uni.showToast({
								title:'您已取消支付，请尽快完成支付',
								duration:2000,
								icon:'none'
							})
							setTimeout(function(){
								uni.reLaunch({
									url:'/pages/index/index'
								})
							},2000)
						}
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
	
	.activity{
		background-color: #fff;
		margin-top: 20rpx;
		padding:0 20rpx;
		.title{
			height:84rpx;
			line-height: 84rpx;
			color:#8C8C8C;
		}
		.labelBox{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.label{
				border:1rpx solid rgba(200,200,200,1);
				border-radius:10rpx;
				margin-right: 20rpx;
				padding:25rpx 30rpx;
				margin-bottom: 30rpx;
				color:#646464;
				&.active{
					border:1px solid rgba(255,102,0,1);
					color:#ff6600;
				}
			}
		}
	}
	
	.selfDefine{
		background-color: #fff;
		margin-top: 20rpx;
		padding:0 20rpx;
		.title{
			height:84rpx;
			line-height: 84rpx;
			color:#8C8C8C;
		}
		.moneyBox{
			display: flex;
			height:158rpx;
			align-items: center;
			view{
				font-size:60rpx;
				color:rgba(60,60,60,1);
			}
			input{
				height:60rpx;
				font-size:60rpx;
			}
			image{
				width:44rpx;
				height:44rpx;
			}
		}
	}
</style>
