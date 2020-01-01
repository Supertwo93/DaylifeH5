<template>
	<view class="distribution">
		<view class="page_bg"></view>
		<view class="discenter_top_box">
			<view class="discenter_info">
				<image :src="avatar" class="avatar_img" mode="widthFix"></image>
				<view class="info_right">
					<view class="info_title">{{name}}<image src="/static/cut/level_png.png" mode="widthFix"></image></view>
					<view class="info_txt">{{time}}加入代理</view>
				</view>
			</view>
			<view class="dis_money_box">
				<text>当前累计获取佣金(元)</text>
				<view class="dis_money_txt">{{total_money}}</view>
			</view>
		</view>
		<view class="discenter_bottom_box">
			<view class="disbottom_list">
				<view class="dl_box">
					<text>今日获取佣金</text>
					<view class="dl_money">{{today_money}}</view>
				</view>
				<view class="dl_box">
					<text>待收益佣金</text>
					<view class="dl_money">{{wait_money}}</view>
				</view>
			</view>
			<view class="disbottom_with">
				<text>可提现佣金：{{withdraw_money}}元</text>
				<view>立即提现<image src="/static/cut/right_orange.png" mode="widthFix"></image></view>
			</view>
			<view class="my_invite_code">
				<view>我的邀请码：<text>{{invite_code}}</text></view>
				<text>复制</text>
			</view>
			<view class="invite_nav_box">
				<view class="invite_item" @tap="toInvitePage()">
					<image src="/static/cut/discenter_icon1.png" mode="widthFix"></image>
					<view>已邀请用户</view>
					<text>{{person_num}}人</text>
				</view>
				<view class="invite_item" @tap="toCommissionPage()">
					<image src="/static/cut/discenter_icon2.png" mode="widthFix"></image>
					<view>佣金明细</view>
					<text>{{money_num}}笔</text>
				</view>
				<view class="invite_item">
					<image src="/static/cut/discenter_icon3.png" mode="widthFix"></image>
					<view>推广二维码</view>
					<text>扫描邀请</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				avatar: '/static/cut/logo.png',
				name: '汤圆圆',
				time: '2019-09-01',
				total_money: '568.88',
				today_money: '568.88',
				wait_money: '12.82',
				withdraw_money: '99.86',
				invite_code: 'ABC456',
				person_num: 100,
				money_num: 180
			}
		},
		components: {
			
		},
		methods:{
			toInvitePage(){
				uni.navigateTo({
					url: '/pages/user/distribution/invite'
				})
			},
			toCommissionPage(){
				uni.navigateTo({
					url: '/pages/user/distribution/commission'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.discenter_top_box{
		background:linear-gradient(90deg,rgba(255,105,75,1),rgba(247,63,67,1));
		border-radius:0px 0px 50rpx 50rpx;
		padding: 20rpx 20rpx 0;
		.discenter_info{
			background: #fff;
			border-radius: 20rpx;
			padding: 40rpx 30rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.avatar_img{
				display: block;
				width:100rpx;
				height:100rpx;
				border-radius:50%;
				margin-right: 15rpx;
			}
			.info_right{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				.info_title{
					font-size:34rpx;
					font-family:Source Han Sans CN;
					font-weight:500;
					color:rgba(30,30,30,1);
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 10rpx;
					image{
						display: block;
						width: 104rpx;
						height: 42rpx;
					}
				}
				.info_txt{
					width: 100%;
					font-size:26rpx;
					color:rgba(140,140,140,1);
				}
			}
		}
		.dis_money_box{
			background: #fff;
			border-radius: 20rpx;
			margin-top: 20rpx;
			padding: 70rpx 0;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			text-align: center;
			text{
				font-size:26rpx;
				color:rgba(160,160,160,1);
			}
			.dis_money_txt{
				font-size:66rpx;
				font-family:Bahnschrift;
				font-weight:400;
				color:rgba(30,30,30,1);
				margin-top: 10rpx;
			}
		}
	}
	.discenter_bottom_box{
		padding: 0 20rpx 20rpx;
		.disbottom_list{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			background: #fff;
			.dl_box{
				position: relative;
				margin-bottom: 70rpx;
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
		.disbottom_with{
			background: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #F2F2F2;
			border-radius:0px 0px 20rpx 20rpx;
			text{
				font-size:26rpx;
				color:rgba(60,60,60,1);
			}
			view{
				font-size:26rpx;
				color:rgba(255,102,0,1);
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					display: block;
					width: 10rpx;
					height: 20rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.my_invite_code{
		margin: 20rpx 0;
		background: #fff;
		padding: 35rpx 30rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text{
			font-size:26rpx;
			color:rgba(255,102,0,1);
		}
		view{
			font-size:26rpx;
			color:rgba(120,120,120,1);
			text{
				font-size:34rpx;
				font-family:Source Han Sans CN;
				font-weight:500;
				color:rgba(60,60,60,1);
			}
		}
	}
	.invite_nav_box{
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 20rpx;
		.invite_item{
			width: 33.3%;
			padding: 45rpx 10rpx 40rpx;
			box-sizing: border-box;
			text-align: center;
			border-right: 1px solid #F2F2F2;
			&:last-of-type{
				border-right: 0;
			}
			image{
				display: block;
				width: 58rpx;
				height: 59rpx;
				margin: 0 auto 25rpx;
			}
			view{
				font-size:26rpx;
				color:rgba(30,30,30,1);
				margin-bottom: 10rpx;
			}
			text{
				font-size:24rpx;
				color:rgba(140,140,140,1);
			}
		}
	}
</style>
