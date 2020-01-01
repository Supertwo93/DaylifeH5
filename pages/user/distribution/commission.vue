<template>
	<view class="commission">
		<view class="page_bg"></view>
		<view class="commission_top">
			<view class="ct_box">
				<text>累计获取佣金</text>
				<view class="dl_money">{{all_money}}</view>
			</view>
			<view class="ct_box">
				<text>今日获取佣金</text>
				<view class="dl_money">{{today_money}}</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="commission_list_box">
			<view class="commission_item" v-for="(item,index) in commissionList" :key="index">
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
				today_money: '500.88',
				all_money: '568.88',
				commissionList: [
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
	.commission_top{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background: #fff;
		padding: 60rpx 0;
		margin-bottom: 10rpx;
		.ct_box{
			position: relative;
			width: 50%;
			text-align: center;
			&:first-child:after{
				content: "";
				display: block;
				width:1rpx;
				height:60rpx;
				background:rgba(230,230,230,1);
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 0;
			}
			text{
				font-size:26rpx;
				color:rgba(160,160,160,1);
			}
			.dl_money{
				font-size:36rpx;
				font-family:Bahnschrift;
				font-weight:400;
				color:rgba(30,30,30,1);
				margin-top: 10rpx;
			}
		}
	}
	.commission_list_box{
		background: #fff;
		max-height: 75vh;
	}
</style>
