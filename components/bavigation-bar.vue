<template>
	<view>
		<view class="top">
			<view class="top-search" @click="clicksearch">
				<view>
					<image class="lf" src="/static/cut/ss.png" mode=""></image>
					<text>搜索标题</text>
				</view>
				<image class="rt" src="/static/cut/yy.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			firsttype:{
				type:String
			}
		},
		data () {
			return {
				
			}
		},
		methods:{
			clicksearch () {
				uni.navigateTo({
					url: '/pages/HM-search/HM-search' + this.firsttype
				});
			}
		}
	}
</script>

<style lang="scss">
	.top{
		// position: fixed;
		// top:0;
		// left: 0;
		// right: 0;
		// z-index: 1000;
	
		height: 88rpx;
		padding:12rpx 20rpx;
		background-color: #FFFFFF;

		.top-search{
		
			height: 64rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color:#F6F6F6 ;
			padding:0 20rpx;
			.lf{
				width: 28rpx;
				height: 28rpx;
				
			}
			.rt{
				width: 20rpx;
				height: 30rpx;
			}
			text{
				font-size: 24rpx;
				color:#B4B4B4;
				padding-left: 10rpx;
			}	
		}
		
	}
</style>
