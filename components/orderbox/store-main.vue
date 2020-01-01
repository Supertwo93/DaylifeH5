<template name="storeMain">
	<view class="box">
		<image :src="pic"></image>
		<view class="content">
			<view class="detail">
				<view class="title">{{title}}</view>
				<view class="price">{{price}}</view>
			</view>
			<view class="detail">
				<view class="gray spec">{{specsize}}</view>
				<view class="gray spec">{{spec}}</view>
			</view>
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	name:'storeMian',
	props:{
		pic:{
			type:String,
			value:''
		},
		price:{
			type:String,
			value:''
		},
		title:{
			type:String,
			value:''
		},
		spec:{
			type:String,
			value:''
		},
		specsize:{
			type:String,
			value:''
		},
		disc:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="scss">
.box{
	margin-top: 10rpx;
	background-color: #fff;
	display: flex;
	image{
		width:140rpx;
		height:140rpx;
		border-radius:10rpx;
	}
	.content{
		margin-left: 20rpx;
		width:550rpx;
		.detail{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			.spec{
				margin-top: 10rpx;
				font-size:24rpx;
			}
			.title{
				width:420rpx;
				font-size:28rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
		}	
	}
}
</style>
