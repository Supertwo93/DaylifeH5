<template>
	<view>
		<view class="topContainer">
			<view class="navigationBar">
				<image src="/static/cut/back_white.png" @tap="toUser()"></image>
				<view>我的钱包</view>
			</view>
			<view class="icon">
				<image src="/static/cut/wallet.png"></image>
				<view></view>
			</view>
			<view class="accountTitle">账户总余额(元)</view>
			<view class="account">218.00</view>
		</view>
		
		<view class="middleContainer">
			<view class="cash">
				<view class="title">可提现余额</view>
				<view class="number">200.00</view>
			</view>
			<view class="line"></view>
			<view class="cash">
				<view class="title">不可提现余额</view>
				<view class="number">18.00</view>
			</view>
		</view>
		
		<view class="detail" @tap="accontDetail()">
			<view class="detailName">收支明细</view>
			<view class="iconfont icon-dibudaohanglan-"></view>
		</view>
		
		<view class="long-button button1" @tap="charge()">充值</view>
		<view class="long-button button2" @tap="cashOut()">提现</view>
	</view>
</template>

<script>
export default{
	methods:{
		charge(){
			uni.navigateTo({
				url:'charge'
			})
		},
		cashOut(){
			uni.navigateTo({
				url:'cashout'
			})
		},
		accontDetail(){
			uni.navigateTo({
				url:'detail'
			})
		},
		toUser(){
			uni.switchTab({
				url:'/pages/user/user'
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.topContainer{
	height:480rpx;
	background:linear-gradient(-90deg,rgba(255,143,108,1),rgba(255,104,148,1));
	.navigationBar{
		height:150rpx;
		display: flex;
		align-items:center;
		image{
			margin-left: 20rpx;
			width:21rpx;
			height:36rpx;
		}
		view{
			margin-left: 260rpx;
			font-size:36rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
	}
	.icon{
		height:110rpx;
		position:relative;
		image{
			position:absolute;
			width:44rpx;
			height:44rpx;
			left:352rpx;
			right:353rpx;
			top:33rpx;
			bottom:33rpx;
			z-index:2;
		}
		view{
			z-index:1;
			width:110rpx;
			height:110rpx;
			background:rgba(0,0,0,1);
			opacity:0.12;
			border-radius:50%;
			margin:0 320rpx;
		}
		
	}
	.accountTitle{
		height:57rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.account{
		height:163rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:110rpx;
		font-family:Bahnschrift;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
}
.middleContainer{
	height:150rpx;
	display: flex;
	background-color: #fff;
	.cash{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:49%;
		.title{
			font-size:26rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(160,160,160,1);
		}
		.number{
			font-size:36rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
		}
	}
	.line{
		width:2%;
		margin:45rpx 0;
		border-left:1rpx solid #DCDCDC;
	}
}

.detail{
	height:105rpx;
	background-color: #fff;
	margin-top:20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.detailName{
		margin-left: 20rpx;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(60,60,60,1);
	}
	.iconfont{
		margin-right: 20rpx;
	}
}

.button1{
	margin-top:279rpx;
}
.button2{
	margin-top:20rpx;
	background:rgba(255,255,255,1);
	color:rgba(60,60,60,1);
}

</style>
