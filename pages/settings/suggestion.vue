<template>
	<view>
		<view class="explain">
			<view class="text1">感谢您对我们平台提出的宝贵意见，您的建议对我们</view>
			<view class="text2">非常重要，我们将积极采纳并做出调整和反馈</view>
		</view>
		
		<textarea placeholder="请输入您的宝贵意见" />
		
		<view class="long-button">确认提交</view>
		
		
	</view>
</template>

<script>
</script>

<style>
page{
	background-color: #f2f2f2;
}
.explain{
	height:145rpx;
	width:100%;
}
textarea{
	height:316rpx;
	width:100%;
	background-color: #fff;
	padding:20rpx;
}

.long-button{
	margin-top:100rpx;
}
.text{
	width:624px;
	font-size:26rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(100,100,100,1);
	line-height:40rpx;
}

.text1{
	margin:39rpx 63rpx 0 63rpx;
}

.text2{
	margin:0 83rpx 0 90rpx;
}
</style>
