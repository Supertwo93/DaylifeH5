<template>
	<view>
		<view class="noMoney">
			<view class="title">无退款金额</view>
			<image @tap="chooseMoney" :src="hasMoney?src[1]:src[0]"></image>
		</view>
		
		<view class="accountNumber">
			<view class="title">
				<view>充值金额</view>
				<image @tap="chooseMoney" :src="hasMoney?src[0]:src[1]"></image>
			</view>
			<view class="number">
				<view class="renmibi">￥</view>
				<input v-if="hasMoney==true" type="digit" placeholder="请输入退款金额" v-model="number" @input="checkChange"/>
				<image src="/static/cut/cancel.png" @tap="clearNumber()"></image>
			</view>
		</view>
		
		<view class="submit-button" @tap="submit">确认退款{{number}}并解约</view>
	</view>
</template>

<script>
	import {OrderModel} from '@/common/models/order.js'
	const ordermodel = new OrderModel()
	export default{
		data(){
			return{
				hasMoney:false,
				src:['/static/cut/choosed.png','/static/cut/no_selected.png'],
				number:'',
				data:''
			}
		},
		onLoad(options){
			this.data = JSON.parse(options.data)
		},
		methods:{
			checkChange(e){
				this.number = this.number.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			},
			clearNumber(){
				this.number = '';
			},
			chooseMoney(){
				this.hasMoney = !this.hasMoney
				if(this.hasMoney==false){
					this.number = ''
				}
			},
			submit(){
				let req = {}
				req.agreeType = 1
				req.sum = 0.01
				req.billCode = this.data.rescissionBillcode
				if(this.hasMoney==true){
					req.refundAmount = this.number
				}
				ordermodel.sellerAgreeHouseBack(req,data=>{
					uni.showToast({
						title:'操作成功',
						duration:1500,
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
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
	}
	.noMoney{
		height:84rpx;
		margin-top: 20rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 20rpx;
		image{
			width:28rpx;
			height:28rpx;
		}
	}
	.accountNumber{
		margin-top:20rpx;
		height:242rpx;
		background-color: #fff;
		.title{
			height:54rpx;
			padding:29rpx 20rpx 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view{
				
			}
			image{
				width:28rpx;
				height:28rpx;
			}
		}
		.number{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height:188rpx;
			.renmibi{
				width:37rpx;
				height:45rpx;
				margin-right:28rpx;
				margin-left:20rpx;
				font-size:60rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
				margin-bottom:40rpx;
			}
			input{
				width:600rpx;
				font-size:68rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
				min-height: 68rpx;
			}
			image{
				width:44rpx;
				height:44rpx;
				margin-right:20rpx;
			}
		}
	}
</style>
