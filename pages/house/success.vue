<template>
	<view>
		<image src="/static/cut/pay_ok.png"></image>
		<view class="title">您已单方签约成功</view>
		<view class="content">等待商家签约完成后，再支付租房费用</view>
		<view class="whiteButton one" @tap="toIndex">返回首页</view>
		<view class="whiteButton two" @tap="toMyPackage">我的订单</view>
	</view>
</template>

<script>
export default{
	methods:{
		toIndex(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		toMyPackage(){
			uni.switchTab({
				url:'/pages/order/order'
			})
		}
	}
}
</script>

<style lang="scss">
image{
	width:271rpx;
	height:243rpx;
	position: absolute;
	top:182rpx;
	left:240rpx;
}
.one{
	position: absolute;
	top:583rpx;
	left: 115rpx;
	width:240rpx !important;
}
.two{
	position:absolute;
	top:583rpx;
	left:395rpx;
	width:240rpx !important;
}
.title{
	position:absolute;
	top:455rpx;
	left:250rpx;
	font-size:36rpx;
	color:rgba(60,60,60,1);
}

.content{
	position:absolute;
	top:508rpx;
	left:160rpx;
	color:#8C8C8C;
}
</style>