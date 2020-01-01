<template>
	<view>
		<view class="image">
			<image src="/static/cut/pay_ok.png"></image>
		</view>
		<view class="title">
			￥{{number.toFixed(2)}}充值成功
		</view>
		<view class="buttons">
			<view class="home">去首页逛逛</view>
			<view class="wallet">返回钱包</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				number:100.00
			}
		}
	}
</script>

<style lang="scss">
.image{
	width:426rpx;
	image{
		width:271rpx;
		height:243rpx;
		margin:182rpx 239rpx 0 240rpx;
	}
}

.title{
	height:124rpx;
	padding:30rpx 232rpx 60rpx 232rpx;
	font-size:36rpx;
	font-family:Source Han Sans CN;
	font-weight:500;
	color:rgba(60,60,60,1);
	line-height:36rpx;
}
.buttons{
	display: flex;
	height:60rpx;
	view{
		width:240rpx;
		height:100%;
		border:1px solid rgba(255,102,0,1);
		border-radius:10px;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,102,0,1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.home{
		margin-left:115rpx;
	}
	.wallet{
		margin-left: 40rpx;
	}
}
</style>
