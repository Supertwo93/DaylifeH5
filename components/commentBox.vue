<template name="commentBox">
	<view class="hasCommnet" :class="[margin?'margin':'']">
		<view class="content">{{row.content}}</view>
		<view class="stars">
			<view class="commentStar">
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="row.goodScore>index?starOn:starOff"></image>
				</block>
				商品
			</view>
			<view class="commentStar">
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="row.deliveryScore>index?starOn:starOff"></image>
				</block>
				配送
			</view>
			<view class="commentStar">
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="row.serviceScore>index?starOn:starOff"></image>
				</block>
				服务
			</view>
		</view>
		<slot></slot>
		<view class="time">
			<view class="gray">{{row.createTime}}</view>
			<view v-if="button==1" class="gray">来自用户{{row.user}}的评价</view>
			<view v-if="button==0" class="deleteButton" @tap="deleteComment">删除评价</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'commentBox',
		props:{
			row:{
				type:Object,
				value:''
			},
			margin:{
				type:Boolean,
				value:''
			},
			button:{
				type:Boolean,
				value:''
			}
			
		},
		data() {
			return {
				starOn:'/static/cut/star_on.png',
				starOff:'/static/cut/star_off.png',
				starIndex:[0,1,2,3,4],
			};
		},
		methods:{
			deleteComment(){
				this.$emit('delete')
			}
		}
	}
</script>

<style lang="scss">
.margin{
	margin-top: 20rpx;
}
.hasCommnet{
	background-color: #fff;
	padding: 20rpx 20rpx 0 20rpx;
	.content{
		
	}
	.stars{
		display: flex;
		height:84rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		.commentStar{
			display: flex;
			align-items: center;
			image{
				width:25rpx;
				height:23rpx;
				margin-right: 8rpx;
			}
		}
	}
	.time{
		height:81rpx;
		display: flex;
		align-items: center;
		justify-content: space-between
	}
}

.deleteButton{
	width:160rpx;
	height:60rpx;
	background:rgba(255,255,255,1);
	border:1rpx solid rgba(200,200,200,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color:#787878;
}
</style>
