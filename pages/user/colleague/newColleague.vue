<template>
	<view>
		<view class="container">
			<view class="search">
				<view class="left">
					<image class="scope" src="/static/cut/ss.png"></image>
					<input placeholder="搜索账号">
				</view>
				<image class="voice" src="/static/cut/yy.png"></image>
			</view>
		</view>
		<view class="add" @tap="toAdd">
			<image src="/static/cut/new-friend.png"></image>
			<view class="title">添加新同事</view>
		</view>
		
		<view class="list">
			<view v-for="(item,index) in list" :key="index" class="item">
				<image :src="item.logoImg"></image>
				<view class="right">
					<view class="info">
						<view class="name">{{item.nickname}}</view>
						<view class="account">账号：{{item.phone}}</view>
					</view>
					<view class="status">已通过</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad(){
			usermodel.queryColleagueList({},data=>{
				this.list = data
			})
		},
		methods: {
			toAdd() {
				uni.navigateTo({
					url:'addcolleague'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	
	
	.container{
		height:94rpx;
		background-color: #fff;
		padding:0 20rpx;
		.search{
			padding:0 20rpx;
			height:64rpx;
			background-color: #f6f6f6;
			display: flex;
			align-items: center;
			justify-content:space-between;
			.left{
				display: flex;
				align-items: center;
				
				.scope{
					width:27rpx;
					height:30rpx;
				}
				input{
					margin-left: 10rpx;
					width:500rpx;
					color:#1e1e1e;
				}
			}
			.voice{
				width:27rpx;
				height:36rpx;
			}
		}
	}
	.add{
		text-align: center;
		height:160rpx;
		background-color: #fff;
		image{
			margin:35rpx 0 20rpx 0;
			width:47rpx;
			height:47rpx;
		}
		view{
			color:rgba(30,30,30,1);
			letter-spacing: 4rpx;
		}
		
	}
	
	.list{
		margin-top: 20rpx;
		background-color: #fff;
		.item{
			border-bottom:1rpx solid #f2f2f2;
			display: flex;
			padding:20rpx;
			height:140rpx;
			image{
				width:100rpx;
				height:100rpx;
				border-radius: 10rpx;
			}
			.right{
				padding-left:20rpx;
				width:600rpx;
				height:100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.name{
					font-size:32rpx;
					color:#1e1e1e;
				}
				.account{
					font-size:26rpx;
					color:#787878;
				}
				.status{
					color:#A0A0A0;
				}
			}
		}
	}
</style>
