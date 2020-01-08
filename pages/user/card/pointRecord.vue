<template>
	<view>
		<view class="topBox">
			<view>近期积分记录</view>
			<view @tap="toRules">积分规则>></view>
		</view>
		
		<view v-if="data.length==0">
			<image src="https://sgz.wdttsh.com/mini_static/cut/no_user_comment.png"></image>
			<view class="noRecord">暂无积分记录</view>
		</view>
		
		<view v-for="(item,index) in data" :key="index" class="item">
			<view class="left">
				<view class="title" v-if="item.reason==1">积分累计</view>
				<view class="title" v-if="item.reason==2">积分兑换余额</view>
				<view class="title" v-if="item.reason==3">会员卡支付</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<view class="right">
				<text v-if="item.type==1">+</text>
				<text v-if="item.type==2">-</text>
				{{item.points}}积分
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
				id:'',
				data:''
			}
		},
		onLoad(options){
			this.id = options.id
			this.getList()
		},
		methods:{
			getList(){
				usermodel.checkPointFlow({userMemberCardId:this.id},data=>{
					this.data = data.records
					console.log(this.data)
				})
			},
			toRules(){
				uni.navigateTo({
					url:'/pages/user/card/pointRule'
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.topBox{
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 20rpx;
	}
	
	.item{
		background-color: #fff;
		padding:0 20rpx;
		height:100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom:1rpx solid #f2f2f2;
		.left{
			.title{
				font-size:28rpx;
				color:#3c3c3c;
			}
			.time{
				font-size:22rpx;
				color:#A0A0A0;
			}
		}
		.right{
			font-size:28rpx;
			color:#3c3c3c;
		}
	}
	
	
	image{
		width:402rpx;
		height:389rpx;
		margin-left: 174rpx;
		margin-top: 269rpx;
	}
	.noRecord{
		margin-top: 40rpx;
		margin-left: 278rpx;
	}
</style>
