<template>
	<view>
		<view class="process">
			<view class="lineProcess">
				<view class="line"></view>
				<view class="light top">
					<view class="container">
						<view class="out"></view>
						<view class="middle"></view>
						<view class="in"></view>
					</view>
				</view>
				<view class="light bottom">
					<view class="container">
						<view class="out"></view>
						<view class="middle"></view>
						<view class="in"></view>
					</view>
				</view>
			</view>
			<view class="detail">
				<view class="stepOne">
					<view class="descri">发起提现申请</view>
					<view class="time">2019-09-24 15:30:10</view>
				</view>
				<view class="stepTwo">
					<view class="descri">已申请，等待处理中</view>
					<view class="deta">提现到支付宝(137****7436)</view>
				</view>
			</view>
		</view>
		
		<view class="describle">
			<view class="money">
				<view class="left">金额</view>
				<view class="right">1000.01</view>
			</view>
			<view class="cashto">
				<view class="left">提现到</view>
				<view class="right">支付宝</view>
			</view>
		</view>
		
		<view class="whiteButton">完成</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
.process{
	width:100%;
	height:430rpx;
	border-top: 1rpx solid #DCDCDC;
	display: flex;
	.lineProcess{
		width:106rpx;
		position: relative;
		.line{
			z-index:5;
			height:165rpx;
			width:2rpx;
			background-color: #DEE3E6;
			position: absolute;
			top:79rpx;
			left:72rpx;
		}
		.top{
			top:70rpx;
			left:53rpx;
		}
		.bottom{
			top:244rpx;
			left:53rpx;
		}
		.light{
			width:40rpx;
			height:40rpx;
			position:absolute;
			z-index:9;
			.container{
				width:100%;
				height:100%;
				position: relative;
				.out{
					position: absolute;
					width:100%;
					height:100%;
					background:rgba(255,102,0,0.1);
					border-radius:50%;
				}
				.middle{
					position: absolute;
					width:30rpx;
					height:30rpx;
					background-color: #fff;
					border-radius:50%;
					top:6rpx;
					left:6rpx;
				}
				.in{
					width:18rpx;
					height:18rpx;
					position: absolute;
					top:12rpx;
					left:12rpx;
					background-color: #FF6600;
					border-radius: 50%;
					
				}
			}
		}
	}
	.detail{
		width:644rpx;
		position: relative;
		.stepOne{
			position:absolute;
			top:70rpx;
			.descri{
				font-size:30rpx;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.time{
				font-size:26rpx;
				font-weight:400;
				color:rgba(160,160,160,1);
			}
		}
		.stepTwo{
			position:absolute;
			top:238rpx;
			.descri{
				font-size:30rpx;
				font-weight:400;
				color:rgba(255,102,0,1);
			}
			.deta{
				font-size:26rpx;
				font-weight:400;
				color:rgba(120,120,120,1);
			}
		}
	}
}

.describle{
	height:249rpx;
	margin:0 20rpx;
	border-top: 1rpx solid #DCDCDC;
	.money{
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}
	.cashto{
		display: flex;
		justify-content: space-between;
		margin-top: 59rpx;
	}
}

.left{
	font-size:26rpx;
	font-weight:400;
	color:rgba(100,100,100,1);
	line-height:38rpx;
}
.right{
	font-size:26rpx;
	font-weight:500;
	color:rgba(60,60,60,1);
	line-height:36rpx;
}
.whiteButton{
	width:240rpx;
	height:60rpx;
	margin-left: 255rpx;
}
</style>
