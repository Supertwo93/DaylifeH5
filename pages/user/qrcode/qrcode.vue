<template>
	<view>
		<view class="codeContainer">
			<view class="content">点击扫一扫，扫二维码立即付款</view>
			<view class="moneySet">￥{{money.toFixed(2)}}</view>
			<image :src="url"></image>
			<view @tap="setMoney" class="button">
				<text v-if="set==false">设置支付金额</text>
				<text v-else>取消支付金额</text>
				</view>
		</view>
		<view class="middle">
			<view class="lf">近10条收款记录</view>
			<view @tap="toRecord">
				查看全部
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		<view v-for="(item,index) in data" :key="index" class="item">
			<view class="lf">
				<view class="reason">{{reason[item.reason]}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<view class="rt">
				<text v-if="item.type==1">+</text>
				<text v-if="item.type==2">-</text>
				{{item.money}}
			</view>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default {
		data() {
			return {
				url:'',
				data:'',
				reason:{
					1:'订单收入',
					2:'充值收入',
					3:'全款支出/订单支出',
					4:'配件费支出',
					5:'佣金收入',
					6:'服务方补偿收入',
					7:'积分兑换收入',
					8:'扫描会员码/钱包支出',
					9:'取消订单扣款支出',
					10:'预约金支出',
					11:'提现支出',
					12:'拒收订单支出',
					13:'拒收订单收入',
					14:'售后退款',
					15:'余款支出',
					16:'提现被拒退款',
					17:'预约金退款',
					18:'取消订单退款',
					19:'扫描收款码/钱包支出',
					20:'收款码收入',
					21:'会员码收入/钱包',
					22:'订单奖励',
					23:'订单奖励失效',
					24:'预约收入'
				},
				money:0.00,
				set:false
			}
		},
		onLoad(options){
			if(options.type==1){
				this.money = parseFloat(options.money) 
				this.set = true
				this.getCode(this.money)
			}else{
				this.getCode(0)
			}
			this.getList()
		},
		methods: {
			getCode(money){
				usermodel.createQrcode({money},data=>{
					this.url = data
				})
			},
			getList(){
				usermodel.getReceiptRecord({},data=>{
					this.data = data
				})
			},
			toRecord(){
				uni.navigateTo({
					url:'/pages/user/qrcode/record'
				})
			},
			setMoney(){
				if(this.set==false){
					uni.navigateTo({
						url:'setMoney'
					})
				}else{
					this.set = false
					this.money = 0.00
					this.getCode(0.00)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #f2f2f2;
}	

.codeContainer{
	margin-top: 20rpx;
	background-color: #fff;
	width:750rpx;
	height:694rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	image{
		width:350rpx;
		height:350rpx;
	}
	.content{
		color:#787878;
	}
	.button{
		color:#FF6600;
		display: flex;
		align-items: center;
		justify-content: center;
		width:300rpx;
		height:60rpx;
		border:1rpx solid rgba(255,102,0,1);
		border-radius:10rpx;
	}
}

.middle{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height:63rpx;
	padding:0 20rpx;
	.lf{
		color:#787878;
	}
	image{
		margin-left: 10rpx;
		width:9.6rpx;
		height:18.8rpx;
	}
}

.item{
	background-color: #fff;
	height:123rpx;
	border-bottom: 1rpx solid #f2f2f2;
	padding:0 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.reason{
		color:#3c3c3c;
		font-size:28rpx;
	}
	.time{
		color:#a0a0a0;
		font-size:22rpx;
	}
	
}

.moneySet{
	font-size:50rpx;
	color:#3c3c3c;
}
</style>
