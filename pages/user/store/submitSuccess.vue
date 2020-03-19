<template>
	<view>
		<image src="/static/cut/submit-success.png"></image>
		<view class="title">提交成功</view>
		<view class="content">资料提交成功啦，等待审核</view>
		<view class="button">去首页看看</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	image{
		width:271rpx;
		height:243rpx;
		margin-top: 179rpx;
		margin-left: 240rpx;
	}
	.title{
		text-align: center;
		font-size:30rpx;
		color:rgba(30,30,30,1);
		margin-top: 26rpx;
	}
	.content{
		text-align: center;
		font-size:24rpx;
		color:rgba(160,160,160,1);
		margin-top: 18rpx;
	}
	.button{
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left:255rpx;
		margin-top: 60rpx;
		width:240rpx;
		height:60rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;
	}
	
	
	
	
</style>
