<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="item">
			<view class="info">
				<image :src="item.logoImg" ></image>
				<view class="detail">
					<view class="name">{{item.nickname}}</view>
					<view class="time">{{item.createTime|filterTime}}</view>
				</view>
			</view>
			<view class="content">
				<view class="details">{{item.content}}</view>
				<image v-if="item.img!=null" :src="item.img"></image>
				<view class="reply" v-for="(row,num) in item.list" :key="num">
					<text>平台回复：</text>{{row.replyContent}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '../../common/models/user.js'
	const usermodel = new UserModel()
	export default{
		filters: {
			filterTime(value){
				return value.substring(0,10)
			}
		},
		data(){
			return{
				list:[]
			}
		},
		onLoad(){
			usermodel.getFeedBackList({},data=>{
				this.list = data
			})
		},
		methods:{
			
		},
		
	}
</script>

<style lang="scss" scoped>
	page{
		background:#fff;
		padding:0 20rpx;
	}
	
	.item{
		padding:20rpx 0;
		border-bottom:1px solid #f2f2f2;
		.info{
			display: flex;
			align-items: center;
			image{
				margin-right: 16rpx;
				width:64rpx;
				height:64rpx;
				border-radius:50%; 
			}
			.detail{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width:620rpx;
				.name{
					font-size:32rpx;
					color:rgba(30,30,30,1);
				}
				.time{
					font-size:24rpx;
					color:rgba(140,140,140,1);
				}
			}	
		}
		.content{
			padding-left: 80rpx;
			margin-top: 10rpx;
			.details{
				font-size:28rpx;
				color:#1e1e1e;
			}
			image{
				margin:28rpx 0;
				width:280rpx;
				height:280rpx;
			}
			
			.reply{
				margin-top: 20rpx;
				background-color: #f6f6f6;
				padding:20rpx;
				color:#1e1e1e;
				text{
					color:#FF6600;
				}
			}
		}
	}
</style>
