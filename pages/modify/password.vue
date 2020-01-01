<template>
	<view>
		<view class="default">
			<image class="icon" src="../../static/cut/phone.png"></image>
			<input/>
			<image class="delete" src="../../static/cut/delete.png"></image>
		</view>
		<view class="default">
			<image class="icon" src="../../static/cut/checkok.png"></image>
			<input/>
			
		</view>
		<view class="default">
			<image class="icon" src="../../static/cut/lock.png"></image>
			<input/>
			<image class="showHide" src="../../static/cut/hide.png"></image>
		</view>
		
		<view class="long-button">确认</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.showHide{
	width:33rpx;
	height:16rpx;
}
.icon{
	width:26rpx;
	height:34rpx;
}
.delete{
	width:22rpx;
	height:22rpx;
}
.default{
	height:115rpx;
	margin:0 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid rgba(230,230,230,1);
	input{
		width:621rpx;
	}
}

.long-button{
	margin-top: 100rpx;
}
</style>
