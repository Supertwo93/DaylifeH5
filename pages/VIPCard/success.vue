<template>
	<view>
		<image src="/static/cut/vipcardok.png"></image>
		<view class="title">会员卡办理成功</view>
		<view class="whiteButton" @tap="toIndex">返回首页</view>
		<view class="yellowButton" @tap="toMyPackage">我的卡包</view>
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
			uni.navigateTo({
				url:'../user/card/cardpackage'
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
	top:179rpx;
	left:240rpx;
}
.whiteButton{
	position: absolute;
	top:536rpx;
	left: 115rpx;
	width:240rpx !important;
}
.yellowButton{
	position:absolute;
	top:536rpx;
	left:395rpx;
	width:240rpx !important;
}
.title{
	position:absolute;
	top:448rpx;
	left:264rpx;
	font-size:30rpx;
	color:rgba(100,100,100,1);
}
</style>
