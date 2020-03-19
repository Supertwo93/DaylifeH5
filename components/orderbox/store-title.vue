<template name="storeTitle">
	<view class="storeInfo">
		<view class="store">
			<image class="storeIcon" src="/static/cut/dpicon.png"></image>
			<view class="storetitle">{{title}}</view>
			<image class="arrow" src="/static/cut/black-arrow.png"></image>
		</view>
		<view class="status">{{typeText[status]}}</view>
	</view>
</template>

<script>
export default {
	name:'storeTitle',
	props:{
		price:{
			type:String,
			value:''
		},
		title:{
			type:String,
			value:''
		},
		spec:{
			type:String,
			value:''
		},
		disc:{
			type:String,
			value:''
		},
		status:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			typeText:{
				unpaid:'等待买家付款',
				unreceived:'等待商家接单',
				received:'商家已接单',
				deliver:'服务中',
				completed:'交易完成',
				refunds:'退款中',
				cancelled:'退款成功',
				serviced:'商家处理中',
				servicefinish:'售后完成',
				servicrefuse:'商家拒绝申请',
				drawdone:'售后完成',
				finished:'已完成',
				waiting:'等待商家签约',
				housefinished:'交易完成',
				houseback:'退租中'
			},
		};
	}
}
</script>

<style lang="scss">
.storeInfo{
	background-color: #fff;
	height:84rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.store{
		display: flex;
		align-items: center;
		.storeIcon{
			width:26rpx;
			height:25rpx;
		}
		.storetitle{
			color:#1E1E1E;
			font-weight: 500;
			font-size: 26rpx;
			margin-left: 10rpx;
		}
		.arrow{
			margin-left: 10rpx;
			width:10rpx;
			height:17rpx;
		}
	}
	.status{
		font-size:26rpx;
		color:#FF6600;
	}
}
</style>
