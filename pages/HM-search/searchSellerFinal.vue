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
				<view class="title">{{item.nickName}}</view>
				<view class="middle">
					<view class="point">
						<image src="/static/cut/comment-star.png"></image>
						<view>{{item.mainScore.toFixed(1)}}</view>
					</view>
					<view class="sell">
						总售{{item.monthlySale}}
					</view>
					<view class="dis">{{item.distance|fixOne}}km</view>
				</view>
				<view class="bottom">
					<view class="tags">
						<view v-if="item.firstTypeId==8&&item.deliveryFee==0" class="y-tag">免费配送</view>
						<view class="tag">商品{{item.goodsCount}}</view>
						<view v-if="item.firstTypeId==8" class="tag">商品{{item.startingAndDeliveringFee}}</view>
					</view>
					<view class="in">
						<view>进店</view>
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
			},
			fixOne(value){
				return parseInt(value/1000).toFixed(1)
			},
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
		width:750rpx;
		height:190rpx;
		background-color: #fff;
		margin-bottom: 10rpx;
		padding:20rpx;
		display: flex;
		.storeImg{
			width:150rpx;
			height:150rpx;
			border-radius:10rpx;
			margin-right: 20rpx;
		}
		.content{
			width:520rpx;
			height:150rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			.title{
				font-size:30rpx;
				color:#1e1e1e;
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.middle{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.point{
					display: flex;
					align-items: center;
					image{
						margin-right: 5rpx;
						width:25rpx;
						height:25rpx;
					}
					view{
						font-size:30rpx;
						color:#FFC600;
						font-weight:700;
					}
				}
			}
			.bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.tags{
					display: flex;
					.tag{
						margin-right: 10rpx;
						font-size: 22rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 5rpx;
						color: #a0a0a0;
						border: 1rpx solid #a0a0a0;
						border-radius: 6rpx;
					}
					.y-tag{
						margin-right: 10rpx;
						font-size: 22rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 5rpx;
						color: #ff6600;
						border: 1rpx solid #ff6600;
						border-radius: 6rpx;
					}
				}
				.in{
					display: flex;
					align-items: center;
					color:#ff6600;
					image{
						margin-left: 5rpx;
						width:8rpx;
						height:16rpx;
					}
				}
			}
		}
	}
	
</style>
