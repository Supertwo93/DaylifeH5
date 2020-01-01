<template name="message">
	<view class="ordermessage">
		<view class="timeBox">
			<view class="time">{{time}}</view>
		</view>
		<view v-if="status==0" class="message">
			<view class="alert">您又有新的订单啦</view>
			<view class="content">有客户在[{{store}}]下订单啦，快去接单吧</view>
			<image src="/static/cut/grayright.png"></image>
		</view>
		<view v-if="status==1" class="message">
			<view class="alert">您的订单已送达</view>
			<view class="content">您在[{{store}}]下的订单已被商户接单啦。</view>
			<image src="/static/cut/grayright.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	name:'message',
	props:{
		time:{
			type:String,
			value:'11:00'
		},
		store:{
			type:String,
			value:'明丽煤气店'
		},
		status:{
			type:Number,
			value:3
		}
	},
	data() {
		return {

		}
	}
}
</script>

<style lang="scss">
.ordermessage{
	background-color: #f2f2f2;
	width:750rpx;
	height:220rpx;
	.timeBox{
		position: relative;
		height:90rpx;
		.time{
			position: absolute;
			top:40rpx;
			left:335rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width:80rpx;
			height:30rpx;
			background:rgba(180,180,180,1);
			border-radius:6rpx;
			font-size:20rpx;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:30rpx;
		}
	}
	.message{
		margin: 0 20rpx;
		height:130rpx;
		background-color: #fff;
		border-radius:10rpx;
		position: relative;
		.alert{
			position: absolute;
			left:30rpx;
			top:30rpx;
			font-size:28rpx;
			font-weight:500;
			color:rgba(60,60,60,1);
			line-height:30rpx;
		}
		.content{
			position: absolute;
			left:30rpx;
			top:75rpx;			
			font-size:24rpx;
			font-weight:400;
			color:rgba(160,160,160,1);
			line-height:30rpx;
		}
		image{
			position: absolute;
			left:676rpx;
			top:52rpx;	
			width:14rpx;
			height:26rpx;
		}
	}
}

</style>
