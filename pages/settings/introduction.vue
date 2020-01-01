<template>
	<view class="container">
		<view>{{text1}}</view>
		<view>{{text2}}</view>
		<view>{{text3}}</view>
		<view>{{text4}}</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			text1:'《天天生活》APP是移动互联网时代的一个全新提供供需服务的平台，整合了身边提供方与需求方的快捷对接，让生活的供需要更便捷的实现。',
			text2:'  服务支持：让广大用户足不出户就能实现身边的供需要求服务。',
			text3:'  运营团队：公司专业的运营团队能提供全方位的运营指导帮助合作伙伴更好的提升服务效率与品质。',
			text4:'  支付渠道：可通过微信，支付宝等支付平台进行支付，有效的提升支付便捷性，为用户提供更好的支付体验。'
		}                                   
	}
}	

</script>

<style>
.container{
	padding:60rpx 20rpx 0 20rpx;
}
</style>
