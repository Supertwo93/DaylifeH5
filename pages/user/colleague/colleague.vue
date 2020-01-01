<template>
	<view>
		<view class="nav">
			<view @tap="backToLast" class="backto">
				<image src="/static/cut/lifecircle/backto.png"></image>
			</view>
			<view class="title">我的同事</view>
			<image @tap="dropDown" class="add" src="/static/cut/addwhite.png"></image>
			<view v-if="isDrop" class="drop">
				<view>新的好友</view>
				<view @tap="toAdd">添加好友</view>
			</view>
		</view>
		
		<view class="me">
			<image class="myIcon" :src="uerInfo.logoImg"></image>
			<view class="info">
				<view class="userName">{{uerInfo.nickname}}</view>
				<view class="gray">联系电话：{{uerInfo.phone}}</view>
			</view>
		</view>
		
		<view class="graytitle">同事列表</view>
		<block v-for="(item,index) in data" :key="index">
			<view class="itemBox">
				<image :src="item.logoImg"></image>
				<view class="info">
					<view class="userName">{{item.nickname}}</view>
					<view class="gray">账号：{{item.phone}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default {
		computed:{
			...mapState(['uerInfo'])
		},
		onLoad(){
			usermodel.queryColleagueList({},data=>{
				this.data = data
			})
			console.log(this.uerInfo)
		},
		onHide(){
			this.isDrop = false
		},
		data() {
			return {
				isDrop:false,
				data:''
			}
		},
		methods: {
			backToLast(){
				uni.navigateBack({
					delta: 1
				});
			},
			dropDown(){
				this.isDrop = !this.isDrop
			},
			toAdd(){
				uni.navigateTo({
					url:'/pages/user/colleague/addcolleague'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #f2f2f2;
}
.nav{
	background-color: #fff;
	height:88rpx;
	padding:0 20rpx;
	position: relative;
	.backto{
		top:27rpx;
		position: fixed;
		width:40rpx;
		display: flex;
		align-items: center;
		image{
			width:20rpx;
			height:34rpx;
		}
	}
	.title{
		position: fixed;
		top:20rpx;
		left:300rpx;
		font-size:36rpx;
		color:rgba(60,60,60,1);
	}
	.add{
		position: fixed;
		left:680rpx;
		top:27rpx;
		width:40rpx;
		height:40rpx;
	}
	.drop{
		width:180rpx;
		height:222rpx;
		position: fixed;
		left:550rpx;
		top:65rpx;
		background: (url('~@/static/cut/user/dropdown.png'));
		background-size: 180rpx 222rpx;
		display: flex;
		align-items: center;
		justify-content:space-around;
		flex-direction: column;
		color:#fff;
	}
	
}

.me{
	margin-top: 20rpx;
	height:160rpx;
	background-color: #fff;
	padding:30rpx 20rpx;
	display: flex;
	.myIcon{
		width:100rpx;
		height:100rpx;
		border-radius:10rpx;
	}
	.info{
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-left: 20rpx;
		.userName{
			font-size:34rpx;
		}
	}
}

.itemBox{
	border-bottom: 1rpx solid #f2f2f2;
	height:140rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	image{
		width:100rpx;
		height:100rpx;
		border-radius:10rpx;
	}
	.info{
		height:100rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-left: 20rpx;
		width:520rpx;
		.userName{
			font-size:32rpx;
			color:rgba(60,60,60,1);
		}
	}
	.button{
		display: flex;
		align-items: center;
		justify-content: center;
		color:#fff;
		width:90rpx;
		height:54rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:8rpx;
	}
}
</style>
