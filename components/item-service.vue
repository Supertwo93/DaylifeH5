<template name="itemService">
	<view class="item" @tap="toDetail()">
		<view class="lf">
			<image class="goodImg" :src="src"></image>
		</view>
		<view class="rg">
			<view class="topBox">
				<view class="title">{{title}}</view>
				<view class="distance">{{distance}}</view>
			</view>
			<view class="bottom">
				<view class="money">
					<view class="number">
						<block v-if="type==1">
							<text>免费办理</text>
						</block>
						<block v-else>
							<text> ￥{{money}}</text>
						</block>
					</view>
				</view>
				<view class="desc">{{desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'itemService',
	props:{
		title:{             //标题
			type:String,
			value:'NONE'
		},
		distance:{         //商家距离
			type:String,
			value:''
		},
		money:{
			type:Number,
			value:''
		},
		desc:{           //销量 楼层等
			type:String,
			value:''
		},
		src:{             //图片地址
			type:String,
			value:''
		},
		type:{             //会员卡类型
			type:String,
			value:''
		}
		
	},
	data() {
		return {
			
		};
	},
	methods:{
		toDetail(){
			this.$emit('toNextPage')
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
		.topBox{
			display: flex;
			justify-content: space-between;
			.title{
				width:478rpx;
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
			align-items: center;
			.money{
				display: flex;
				align-items: flex-end;
				.number{
					text{
						font-size: 34rpx;
						color:#FF6600;
						line-height:36px;
					}
				}
			}
			.desc{
				margin-left: 60rpx;
				font-size:22rpx;
				color:rgba(180,180,180,1);
			}
		}
	}
}
</style>
