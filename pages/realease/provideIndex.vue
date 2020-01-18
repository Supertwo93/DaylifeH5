<template>
	<view class="page">
		<view @tap="toProvide" class="service">
			<image src="/static/cut/provide-icon.png"></image>
			<view>提供服务</view>
		</view>
	</view>
</template>


<script>
	import {mapState} from 'vuex'
	export default{
		computed:{
			...mapState(['hasLogin'])
		},
		onLoad(){			
		},
		methods:{
			toProvide(){
				if(this.hasLogin){
					uni.navigateTo({
						url:'/pages/realease/provide'
					})
				}else{
					uni.showToast({
						title:'请先登录',
						icon:'none',
						duration:1500
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.page{
		height:90vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.service{
			opacity: 1 !important;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-around;
			opacity: 1;
			width:300rpx;
			height:200rpx;
			background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
			box-shadow:0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.14);
			border-radius:40rpx;
			image{
				width:60rpx;
				height:65rpx;
				
			}
			view{
				font-size:34rpx;
				color:#fff;
			}
		}
		.service:before{
			background: url('~@/static/cut/providebg.png') no-repeat;
			background-size: cover;
			content:'';
			height:90vh;
			width:750rpx;
			position: absolute;
			z-index:-1;
			opacity: 0.44;
			// -webkit-filter: blur(3px);
			// filter: blur(3px);
		}
	}
	
	
</style>
