<template>
	<view class="invite_detail">
		<view class="page_bg"></view>
		<view class="invite_detail_top">
			<image :src="invite_avatar" mode="widthFix"></image>
			<view class="idt_right">
				<view>{{invite_name}}</view>
				<text>{{invite_time}}注册软件</text>
			</view>
		</view>
		<view class="invite_till">收益详细</view>
		<scroll-view scroll-y="true" class="invite_detail_box">
			<view class="commission_item" v-for="(item,index) in inviteDetails" :key="index">
				<view class="ci_left">
					<view>{{item.title}}</view>
					<text>{{item.time}}</text>
				</view>
				<view class="ci_right">
					<view>{{item.income}}</view>
					<text>{{item.status}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				invite_avatar: '/static/cut/logo.png',
				invite_name: '汤圆圆',
				invite_time: '2019-09-01',
				inviteDetails: [
					{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					},{
						title: '邀请用户136****7521',
						time: '昨天 15:30',
						income: '+0.5',
						status: '已结算'
					}
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.invite_detail_top{
		padding: 40rpx 20rpx;
		background: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		image{
			display: block;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 15rpx;
		}
		.idt_right{
			width: 70%;
			view{
				font-size:34rpx;
				color:rgba(30,30,30,1);
				margin-bottom: 10rpx;
			}
			text{
				font-size:26rpx;
				color:rgba(140,140,140,1);
			}
		}
	}
	.invite_till{
		padding: 20rpx;
		font-size:26rpx;
		color:rgba(160,160,160,1);
	}
	.invite_detail_box{
		background: #fff;
		max-height: 72vh;
	}
</style>
