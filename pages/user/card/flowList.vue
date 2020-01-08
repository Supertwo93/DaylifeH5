<template>
	<view>
		<view v-if="list.length==0">
			<image src="https://sgz.wdttsh.com/mini_static/cut/no_user_comment.png"></image>
			<view class="noRecord">暂无积分记录</view>
		</view>
		
		<block v-for="(item,index) in list" :key="index">
			<view class="box" @tap="toDetail(item)">
				<view class="lf">
					<view v-if="item.reason==1" class="title">充值</view>
					<view v-if="item.reason==2" class="title">线上支付</view>
					<view v-if="item.reason==3" class="title">会员卡积分兑换</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="rt">
					<text v-if="item.type==1">+</text>
					<text v-if="item.type==2">-</text>
					{{item.money}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				id:'',
				list:[]
			}
		},
		onLoad(options){
			this.id = options.id
			this.getList()
		},
		methods:{
			getList(){
				usermodel.checkFlowList({userMemberCardId:this.id},data=>{
					this.list = data.records
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/user/card/flowDetail?id=' + item.id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		height:123rpx;
		width:750rpx;
		padding:0 20rpx;
		border-bottom:1rpx solid #f2f2f2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.lf{
			.title{
				font-size:28rpx;
				color:rgba(60,60,60,1);
			}
			.time{
				font-size:22rpx;
				color:rgba(160,160,160,1);
			}
		}
		.rt{
			font-size:30rpx;
			color:rgba(60,60,60,1);
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
