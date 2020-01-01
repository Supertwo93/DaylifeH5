<template name="itemList">
	<view class="item" @tap="toInfo">
		<view class="lf">
			<image class="goodImg" :src="src"></image>
		</view>
		<view class="rg">
			<view class="top">
				<view class="title">{{title}}</view>
				<view class="distance">{{distance}}km</view>
			</view>
			<view class="bottom">
				<view class="money">
					<view class="icon"></view>
					<view class="number">￥{{money}}</view>
				</view>
				<view class="sales">月售{{sales}}</view>
				<view v-if="deliver!=0" class="deliver">配送费￥{{deliver}}</view>
				<view v-if="deliver==0" class="noDeliver">免配送费</view>
				<image src="/static/cut/car.png" class="cartImg" @tap.stop="childrenTap"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'itemList',
	props:{
		title:{
			type:String,
			value:'NONE'
		},
		distance:{
			type:String,
			value:''
		},
		money:{
			type:Number,
			value:''
		},
		sales:{
			type:Number,
			value:''
		},
		deliver:{
			type:Number,
			value:''
		},
		src:{
			type:String,
			value:''
		}
		
	},
	data() {
		return {
			
		};
	},
	methods:{
		childrenTap(){
			this.$emit('addcart')
		},
		toInfo(){
			this.$emit('toDetailPage')
		}
	}
}
</script>

<style lang="scss">
.item{
	margin-top: 10rpx;
	width:750rpx;
	height:220rpx;
	background-color: #fff;
	padding:30rpx 20rpx 30rpx 20rpx;
	display: flex;
	.lf{
		.goodImg{
			width:160rpx;
			height:160rpx;
			border-radius:10rpx;
		}
	}
	.rg{
		width:520rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.top{
			display: flex;
			justify-content: space-between;
			.title{
				width:378rpx;
				font-size:26rpx;
				font-weight:400;
				color:rgba(60,60,60,1);
				line-height:40rpx;
			}
			.distance{
				font-size:24rpx;
				font-weight:400;
				color:rgba(120,120,120,1);
			}
		}
		.bottom{
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.money{
				display: flex;
				align-items: flex-end;
				.icon{
					font-size: 20rpx;
					color:#A0A0A0;
				}
				.number{
					font-size: 34rpx;
					color:#FF6600;
				}
			}
			.sales{
				font-size:22rpx;
				color:rgba(180,180,180,1);
			}
			.deliver{
				font-size:22rpx;
				color:rgba(180,180,180,1);
			}
			.noDeliver{
				font-size:22rpx;
				color:rgba(120,120,120,1);
			}
			image{
				width:56rpx;
				height:56rpx;
			}
		}
	}
}
</style>
