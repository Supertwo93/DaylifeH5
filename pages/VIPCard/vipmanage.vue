<template>
	<view>
		<view @tap="settingVip" class="item">
			<view class="detail">
				<view>设置会员卡</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		<view @tap="vipMember" class="item">
			<view class="detail">
				<view>已办卡名单</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			settingVip(){
				uni.navigateTo({
					url:'/pages/VIPCard/setting'
				})
			},
			vipMember(){
				uni.navigateTo({
					url:'/pages/VIPCard/list'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
		padding-top: 20rpx;
	}
	.item{
		padding:0 20rpx;
		display: flex;
		height:104rpx;
		background-color: #fff;
		.detail{
			border-bottom: 1rpx solid #f2f2f2;
			height:104rpx;
			width:100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width:10rpx;
				height:20rpx;
			}
		}
	}
</style>
