<template>
	<view>
		<view class="box">
			<view class="title">月付</view>
			<view class="price">
				<view class="deposit">押金￥{{data.deposit}}、服务费￥{{data.monthServicecharge}}/年</view>
				<view class="rent">￥{{data.paMonthly}}/月</view>
			</view>
		</view>
		<view class="box">
			<view class="title">季付</view>
			<view class="price">
				<view class="deposit">押金￥{{data.deposit}}、服务费￥{{data.seasonServicecharge}}/年</view>
				<view class="rent">￥{{data.quarterlyPayment}}</view>
			</view>
		</view>
		<view class="box">
			<view class="title">半年付</view>
			<view class="price">
				<view class="deposit">押金￥{{data.deposit}}、服务费￥{{data.halfServicecharge}}/年</view>
				<view class="rent">￥{{data.halfPay}}</view>
			</view>
		</view>
		<view class="box">
			<view class="title">年付</view>
			<view class="price">
				<view class="deposit">押金￥{{data.deposit}}、服务费￥{{data.yearServicecharge}}/年</view>
				<view class="rent">￥{{data.yearPay}}</view>
			</view>
		</view>
		
		<view class="show">押金说明</view>
		<view class="depositType">押金的方式：{{data.depositMode}}</view>
		<view class="parse1">押金的用途：用于担保租客及时、足额支付租金等其他费用用于租客未完整履行合同给平台造成损害时的赔偿。</view>
		<view class="parse2">押金的返还：租赁关系终止时，租客依约返还租赁物、缴清全部款项等，且并无其它不履行合同义务情形的，平台应返还押金或以扣除损害赔偿后的余额</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			data:''
		}
	},
	onLoad(options) {
		let jsondata = JSON.parse(options.data)
		this.data = jsondata
	}
}
</script>

<style lang="scss">
page{
	border-top:1rpx solid #f2f2f2;
	padding:0 20rpx;
}
.box{
	width:710rpx;
	height:128rpx;
	border-bottom:1rpx solid #f2f2f2;
	.title{
		margin-top: 30rpx;
	}
	.price{
		display: flex;
		margin-top: 21rpx;
		justify-content: space-between;
		.deposit{
			font-size:24rpx;
			color:rgba(160,160,160,1);
		}
	}
}
.show{
	width:710rpx;
	font-size:36rpx;
	margin-top: 60rpx;
}

.parse1{
	width:710rpx;
	margin-top: 38rpx;
}
.parse2{
	width:710rpx;
	margin-top: 50rpx;
}
.depositType{
	color:#FF6600;
	margin: 20rpx 0;
}
</style>
