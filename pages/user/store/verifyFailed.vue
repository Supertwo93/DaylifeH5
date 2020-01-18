<template>
	<view>
		<view class="img">
			<image src="/static/cut/verify-no.png"></image>
		</view>
		<view class="title">审核不通过</view>
		<view class="reason">原因:{{reason}}</view>
		<view @tap="toOpen" class="btn">重新认证</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reason:''
			}
		},
		onLoad(options){
			this.reason = options.reason
			console.log(options)
		},
		methods: {
			toOpen() {
				uni.navigateTo({
					url:'/pages/user/store/openStore'
				})
			}
		},
	}
</script>

<style lang="scss">
	image{
		width:271rpx;
		height:243rpx;
	}
	.img{
		height:243rpx;
		margin-top: 179rpx;
	}
	view{
		text-align: center;
	}
	.title{
		margin-top: 26rpx;
		font-size:30rpx;
		color:#1e1e1e;
	}
	.reason{
		margin-top: 20rpx;
		font-size:24rpx;
		color:#828282;
	}
	.btn{
		margin-top: 60rpx;
		margin-left: 255rpx;
		width:240rpx;
		height:60rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;
		color:#fff;
		line-height: 60rpx;
	}
</style>
