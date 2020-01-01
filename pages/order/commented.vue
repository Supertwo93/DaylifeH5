<template>
	<view>
		<view class="top">
			<view class="image">
				<image src="../../static/cut/pay_ok.png"></image>
			</view>
			<view class="successTitle">评价成功</view>
			<view class="button" @tap="toIndex">返回首页</view>
		</view>
		
<!-- 		<view class="middle">
			继续评价
		</view> -->
		
<!-- 		<view class="bottom">
			<view v-for="(item,index) in goodsInfo" :key='index' class='detail'>
				<view class="imgContainer">
					<view class="goodsImg">
						<image :src="item.img"></image>
					</view>
					
				</view>
				<view class="goodsDetail">
					<view class="content">{{item.content}}</view>
					<view class="size">{{item.size}}</view>
				</view>
				<view class="buttonContainer">
					<view class="goodsButton">去评价</view>
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				goodsInfo:[
					{content:'清风原木纯品纸巾三层360抽 买三送一 限时抢购 ',size:'选择大小：默认；',img:'/static/goods/p5.jpg'},
					{content:'清风原木纯品纸巾三层360抽 买三送一 限时抢购 ',size:'选择大小：默认；',img:'/static/goods/p5.jpg'},
					{content:'清风原木纯品纸巾三层360抽 买三送一 限时抢购 ',size:'选择大小：默认；',img:'/static/goods/p5.jpg'}
				]
			}
		},
		methods:{
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #fff;
}

.top{
	width:100%;
	height:590rpx;
	background-color: #fff;
	position: relative;
	.image{
		image{
			width:271rpx;
			height:243rpx;
			position:absolute;
			top:82rpx;
			right:239rpx;
			left:240rpx;
		}
	}
	.successTitle{
		height:34rpx;
		font-size:36rpx;
		color:rgba(60,60,60,1);
		position: absolute;
		top:355rpx;
		left:305rpx;
	}
	.button{
		width:240rpx;
		height:60rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,102,0,1);
		border-radius:10rpx;
		display:flex;
		align-items: center;
		justify-content: center;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,102,0,1);
		position:absolute;
		top:449rpx;
		right:255rpx;
		left:255rpx;
		
	}
}

.middle{
	height:65rpx;
	text-align: center;
	line-height: 65rpx;
	font-size:26rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(60,60,60,1);
}

.bottom{
	.detail{
		width:100%;
		height:202rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		display: flex;
		.imgContainer{
			width:182rpx;
			padding:31rpx 0 31rpx 21rpx;
			.goodsImg{
				width:140rpx;
				height:140rpx;
				padding:17rpx 15rpx 16rpx 18rpx;
				image{
					width:107rpx;
					height:107rpx;
				}
			}
		}
		.goodsDetail{
			width:350rpx;
			margin-top:39rpx;
			.content{
				height:60rpx;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
				line-height:36rpx;
			}
			.size{
				margin-top:19rpx;
				height:21rpx;
				font-size:20rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(160,160,160,1);
				line-height:40rpx;
			}
		}
		.buttonContainer{
			width:218rpx;
			padding:74rpx 20rpx 71rpx 58rpx;
			.goodsButton{
				width:140rpx;
				height:60rpx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:10rpx;
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>
