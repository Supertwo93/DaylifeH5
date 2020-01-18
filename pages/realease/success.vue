<template>
	<view>
		<image src="/static/cut/upload-success.png"></image>
		<view class="title">商品上传成功</view>
		<view class="buttons">
			<view @tap="toIndex" class="index">返回首页</view>
			<view @tap="upload" class="upload">继续上传</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods: {
			toIndex() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			upload(){
				uni.switchTab({
					url:'/pages/realease/provideIndex'
				})
			}
		},
	}
</script>





<style lang="scss">
	image{
		width:271rpx;
		height:243rpx;
		margin-top: 179rpx;
		margin-left: 240rpx;
	}
	
	.title{
		text-align: center;
		margin-top: 26rpx;
		color:#1E1E1E;
		font-size: 30rpx;
	}
	
	.buttons{
		margin-top: 60rpx;
		display: flex;
		view{
			text-align: center;
			line-height: 60rpx;
			width:240rpx;
			height:60rpx;
		}
		.index{
			margin-left: 115rpx;
			color:#ff6600;
			border:1rpx solid rgba(255,102,0,1);
			border-radius:10rpx;
		}
		.upload{
			margin-left: 40rpx;
			color:#fff;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			border-radius:10rpx;
		}
	}
	
</style>