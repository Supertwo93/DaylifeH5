<template>
	<view>
		<view v-if="cardList.length==0">
			<image class="noneImg" src="/static/cut/no_card.png"></image>
			<view class="noneTitle">暂无会员卡办理</view>
		</view>
		
		<block v-for="(item,index) in cardList" :key="index">
			<view class="item">
				<image :src="item.logoPic" class="icon"></image>
				<view class="title">{{item.nickName}}</view>
				<view class="image" @tap="toCard(item)" :style="{background:'url('+item.carPic+')','background-size': '100% 100%'}">
					<view class="type">会员卡</view>
					<view class="detail">{{item.nickName}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {VipModel} from '@/common/models/vip.js'
	let vipmodel = new VipModel()
	export default {
		data() {
			return {
				cardList:''
			}
		},
		onShow(){
			vipmodel.getMycardList((data)=>{
				this.cardList = data
			})
		},
		methods: {
			toCard(item){
				uni.navigateTo({
					url:'card?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	border-top:1rpx solid #DCDCDC;
}

.noneImg{
	position: absolute;
	width:402rpx;
	height:389rpx;
	top:271rpx;
	left:174rpx;
}
.noneTitle{
	position: absolute;
	top:700rpx;
	left:278rpx;
}
.item{
	width:710rpx;
	height:349rpx;
	margin: 0 20rpx;
	border-bottom: 1rpx solid #DCDCDC;
	position: relative;
	.icon{
		position:absolute;
		width:60rpx;
		height:60rpx;
		border-radius:10rpx;
		top:40rpx;
		left:20rpx;
	}
	.title{
		position:absolute;
		font-size:32rpx;
		font-weight:500;
		color:rgba(60,60,60,1);
		top:41rpx;
		left:110rpx;
	}
	.image{
		width:620rpx;
		height:200rpx;
		border-radius:10rpx;
		position:absolute;
		right:0;
		bottom:39rpx;
		background-size: cover;
		.type{
			margin-left: 30rpx;
			margin-top: 29rpx;
			font-size:44rpx;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-shadow:0rpx 4rpx 4rpx rgba(0, 0, 0, 0.2);
		}
		.detail{
			margin-left: 29rpx;
			// margin-top: 20rpx;
			font-size:28rpx;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
	}
}
</style>
