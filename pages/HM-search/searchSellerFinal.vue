<template>
	<view>
		<view class="topContainer">
			<view class="top" @tap="toBack()">
				<image class="search" src="/static/cut/ss.png"></image>
				<input placeholder="请输入关键字" v-model="queryInfo.title" />
				<image class="voice" src="/static/cut/yy.png"></image>
			</view>
		</view>
		
		
		<view v-for="(item,index) in list" :key="index" class="item" @tap="toStore(item)">
			<image class="storeImg" :src="item.logoPic"></image>
			<view class="content">
				<view class="topTitle">
					<view class="title">{{item.nickName}}</view>
					<view class="distance">{{item.distance|disFilter}}km</view>
				</view>
				<view class="middle">
					<image src="/static/cut/star_on.png"></image>
					<view>评分{{item.mainScore.toFixed(1)}}</view>
				</view>
				<view class="bottom">
					<view class="gray">月售{{item.monthlySale}}</view>
					<view class="gray">商品数量{{item.goodsCount}}</view>
					<view class="toStore" @tap="toStore(item)">
						<view>进店看看</view>
						<image src="/static/cut/right_orange.png"></image>
					</view>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="loadingType">
		</uni-load-more>
	</view>
	
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {IndexModel} from '@/common/models/index.js'
	const indexmodel = new IndexModel()
	export default{
		filters: {
			disFilter:(value)=> {
				return (value/1000).toFixed(2)
			}
		},
		components: {
			uniLoadMore
		},
		data(){
			return{
				loadingType:"loading",
				queryInfo:{
					title:'',
					pageNo:1,
					pageSize:10,
					longitude:114.012257,
					latitude:22.687355,
				},
				list:[]
			}
		},
		methods:{
			toBack(){
				uni.navigateBack({
					delta:1
				})
			},
		 	getList(){
				indexmodel.findAllSeller(this.queryInfo,data=>{
					if(data.length<=5){
						this.loadingType = 'noMore'
					}
					if(this.queryInfo.pageNo===1){
						this.list = data
					}else{
						this.list = this.list.concat(data)
					}
				})
			},
			toStore(item){
				uni.navigateTo({
					url:`/pages/shop/theStore?sellerId=${item.sellerId}&type=${item.firstTypeId}`
				})
			},
		},
		onLoad(options){
			this.queryInfo.title = options.key
			this.getList()
		},
		onReachBottom(){
			this.queryInfo.pageNo += 1
			this.getList()
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	
	
	.topContainer{
		background-color: #fff;
	}
	
	.top{
		width:710rpx;
		margin-left: 20rpx;
		height:64rpx;
		background-color: #F6F6F6;
		display: flex;
		align-items: center;
		padding:0 20rpx;
		input{
			margin-left: 20rpx;
			width:600rpx;
			font-size: 26rpx;
		}
		.search{
			width:27rpx;
			height:28rpx;
		}
		.voice{
			width:20rpx;
			height:30rpx;
		}
	}
	
	.item{
		height:230rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
		padding:30rpx 20rpx;
		display: flex;
		.storeImg{
			width:150rpx;
			height:150rpx;
			border-radius:10rpx;
			margin-right: 20rpx;
		}
		.content{
			.topTitle{
				width:540rpx;
				display: flex;
				justify-content: space-between;
				.title{
					font-size:28rpx;
					color:#1E1E1E;
				}
			}
			.middle{
				margin-top: 20rpx;
				display: flex;
				height:30rpx;
				align-items: center;
				image{
					width:25rpx;
					height:23rpx;
				}
				view{
					margin-left: 8rpx;
					color:#646464;
					font-size:24rpx;
				}
			}
			.bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				.toStore{
					display: flex;
					align-items: center;
					view{
						color:#FF6600;
						margin-right: 5rpx;
					}
					image{
						width:10rpx;
						height:20rpx;
					}
				}
			}
		}
	}
	
</style>
