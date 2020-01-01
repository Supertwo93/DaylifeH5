<template>
	<view>
		<view class="topContainer">
			<view class="container" @tap="toAgreement()">
				用户协议
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container" @tap="toIntroduction()">
				平台介绍
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container none">
				给我们评分
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	methods:{
		toAgreement(){
			uni.navigateTo({
				url:'agreement'
			})
		},
		toIntroduction(){
			uni.navigateTo({
				url:'introduction'
			})
		}
	}
}
</script>

<style>
page{
	background-color: #f2f2f2;
}

.topContainer{
	margin-top:20rpx;
}

.none{
	border:none !important
}
</style>
