<template>
	<view>
		<view class="info">
			<view class="storeInfo">
				<image src="/static/cut/dpicon.png" class="storeIcon"></image>
				<view class="storeName">{{data.nickName}}</view>
			</view>
			<view class="goodsInfo">
				<image :src="data.picture|picOne" class="goodsImg"></image>
				<view class="goodsName">
					<view class="title">{{data.title}}</view>
					<view class="spec">{{data.paymentMethod}}</view>
				</view>
			</view>
			<view class="paymentInfo">
				<view class="payment">
					<view class="paymentTitle">租金</view>
					<view class="money">{{data.rental}}</view>
				</view>
				<view class="payment">
					<view class="paymentTitle">押金</view>
					<view class="money">{{data.deposit}}</view>
				</view>
				<view class="payment">
					<view class="paymentTitle">服务费</view>
					<view class="money">{{data.serviceCharge}}</view>
				</view>
			</view>
			<view class="sum">合计：<text>￥{{data.sum}}</text></view>
		</view>
		
		<view class="submit-button" @tap="toPay">确认支付￥{{data.sum.toFixed(2)}}</view>
	</view>
</template>

<script>
import {PayModel} from '@/common/models/pay.js'
const paymodel = new PayModel()
export default{
	filters:{
		picOne(value){
			return value.split(',')[0]
		}
	},
	data(){
		return{
			data:''
		}
	},
	onLoad(options){
		this.data = JSON.parse(options.data)
		console.log(this.data)
	},
	methods:{
		toPay(){
			let req = {}
			req.billCode = this.data.firstBillcode
			req.sum = this.data.sum
			req.type = 3
			paymodel.housePay(req,(res)=>{
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: res.timeStamp, 
					nonceStr: res.nonceStr, 
					package: res.package, 
					signType: "MD5",
					paySign: res.paySign,
					success: function(res) {
						console.log(res)
						uni.navigateTo({
							url:'/pages/success/success?type=' + 3
						})
					},
					fail:(err)=> {
						uni.showToast({
							title:'您已取消支付，请尽快完成支付',
							duration:2000,
							icon:'none'
						})
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/order/order?index=' + 1
							})
						},2000)
									
					}
				});
			})
		}
	}
	
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.info{
	padding:0 20rpx;
	background-color: #fff;
	margin-top: 20rpx;
	width:750rpx;
	height:440rpx;
	.storeInfo{
		height:89rpx;
		display: flex;
		align-items: center;
		.storeIcon{
			width:32rpx;
			height:29rpx;
		}
		.storeName{
			margin-left: 10rpx;
		}
	}
	.goodsInfo{
		height:80rpx;
		display: flex;
		.goodsImg{
			width:80rpx;
			height:80rpx;
		}
		.goodsName{
			margin-left: 20rpx;
			.title{
				font-size:26rpx;
				color:rgba(60,60,60,1);
			}
			.spec{
				margin-top: 20rpx;
				font-size:20rpx;
				color:rgba(160,160,160,1);
			}
		}
	}
	.paymentInfo{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height:186rpx;
		.payment{
			display: flex;
			justify-content: space-between;
			.paymentTitle{
				
			}
		}
	}
	.sum{
		height:84rpx;
		border-top: 1rpx solid #f2f2f2;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
}

</style>
