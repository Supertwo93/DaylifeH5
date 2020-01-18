<template>
	<view>
		<view class="box">
			<view class="title">收款金额</view>
			<view class="content">
				<view>￥</view>
				<input v-model="money"/>
			</view>
		</view>
		<view @tap="confirm" class="button">确认</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				money:''
			}
		},
		methods:{
			confirm(){
				if(this.money==''){
					uni.showToast({
						title:'请设置收款金额',
						duration:1500,
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url:'/pages/user/qrcode/qrcode?type=1&money=' + this.money
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	
	.box{
		margin-top: 20rpx;
		height:242rpx;
		background-color: #fff;
		padding:30rpx 20rpx;
		.title{
			color:#646464;
		}
		.content{
			align-items: center;
			height:80rpx;
			display: flex;
			font-size:60rpx;
			color:#3c3c3c;
			input{
				font-size:60rpx;
			}
			margin-top: 50rpx;
		}
	}
	
	.button{
		margin-top: 20rpx;
		font-size: 34rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width:750rpx;
		height:100rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	}
	
</style>
