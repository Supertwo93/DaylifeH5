<template>
	<view>
		<view class="title">所有地址</view>
		<view class="adress">
			<view class="for" v-for="(item,index) in addressList.data" :key="index">
				<view class="detail">
					<view class="addressInfo">
						<view v-if="item.SET_DEFAULT_ADDRESS==1" class="default">默认</view>
						<view class="addressDetail">{{item.RECEIVER_DISTRICT}}{{item.RECEIVER_ADDRESS}}</view>
					</view>
					
					<view class="userInfo">
						<view class="userName">{{item.RECEIVER_NAME}}</view>
						<view class="phone">{{item.RECEIVER_PHONE}}</view>
					</view>
				</view>
				
				<view class="icon">
					<image src="/static/cut/address_edit.png"></image>
				</view>
				
			</view>
		</view>
		<view class="container">
			<view class="button">
				<image src="/static/cut/add.png"></image>
				<view>添加新地址</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				addressList:{
					"data": [
						{
							"STATUS": 1,
							"RECEIVER_CITY": "深圳",
							"RECEIVER_NAME": "王勇",
							"USER_ID": "117d3fa3aa1a460da07504f074f01739",
							"RECEIVER_DISTRICT": "深圳龙华区",
							"SET_DEFAULT_ADDRESS": "0",
							"RECEIVER_ADDRESS_ID": "8c0bedd06f67faa",
							"RECEIVER_ADDRESS": "龙华广场房",
							"CREATE_TIME": "2019-03-18 16:58:57",
							"RECEIVER_PHONE": "13627178493"
						},
						{
							"STATUS": 1,
							"RECEIVER_CITY": "深圳",
							"RECEIVER_NAME": "肖战",
							"USER_ID": "117d3fa3aa1a460da07504f074f01739",
							"RECEIVER_DISTRICT": "深圳龙岗区",
							"SET_DEFAULT_ADDRESS": "1",
							"RECEIVER_ADDRESS_ID": "8c0bedd06f67faa",
							"RECEIVER_ADDRESS": "龙岗中心城",
							"CREATE_TIME": "2019-03-18 16:58:57",
							"RECEIVER_PHONE": "13627178493"
						}
					],
					"resultCode": "01",
					"message": "获取成功"
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.title{
	display: flex;
	height:59rpx;
	align-items: center;
	margin-left:20rpx;
	font-size:24rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(160,160,160,1);	
}

.adress{
	.for{
		display: flex;
		align-items: center;
		margin-bottom:20rpx;
		background-color: #fff;
		height:180rpx;
		.detail{
			width:690rpx;
			.addressInfo{
				display: flex;
				margin:37rpx 124rpx 0 20rpx;
				height:67rpx;
				width:550rpx;
				.default{
					width:60rpx;
					height:30rpx;
					background:rgba(255,102,0,1);
					border-radius:6rpx;
					font-size:22rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(255,255,255,1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.addressDetail{
					margin-left:10rpx;
					font-size:30rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(100,100,100,1);
				}
			}
			.userInfo{
				display: flex;
				margin:16rpx 0 37rpx 20rpx;
				.phone{
					margin-left:26rpx;
					font-size:24rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(160,160,160,1);
				}
			}
		}
		.icon{
			width:56rpx;
		}
	}	
}

.container{
	position:fixed;
	height:100rpx;
	width:750rpx;
	bottom:0;
	background-color: #fff;
	.button{
		width:100%;
		height:100%;
		display:flex;
		align-items: center;
		justify-content: center;
		image{
			width:32rpx;
			height:32rpx;
			margin-right:10rpx;
		}
		view{
			font-size:30rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,102,0,1);
		}
	}
	
}

image{
	width:37rpx;
	height:37rpx;
}



</style>
