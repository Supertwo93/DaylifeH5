<template>
	<view>
		<view class="top-header">
			<image @tap="toSearch" class="searchImg" src="/static/cut/ss.png"></image>
			<view>附近</view>
			<image class="mapImg" @tap="toNearbyMap" src="/static/cut/icon--map.png"></image>
		</view>
		<view class="scroll">
			<scroll-view class="scroll_nav_box" scroll-x="true">
				<view class="scroll_nav_item" @tap="clickNav(nav)" :class="[queryInfo.firsttypeId==nav.id?'active':'']" v-for="(nav,idx) in iconList" :key="nav.id">
					<image :src="nav.url" mode="widthFix"></image>
					<text>{{nav.name}}</text>
				</view>
			</scroll-view>
			<view class="line"></view>
			<view class="filter" @tap="filter()">
				<view>筛选</view>
				<image src="/static/cut/filter_icon.png"></image>
			</view>
		</view>
		
		<view v-for="(item,index) in list" :key="index" class="item" @tap="toStore(item)">
			<image class="storeImg" :src="item.logoPic"></image>
			<view class="content">
				<view class="top">
					<view class="title">{{item.nickName}}</view>
					<view class="distance">{{item.distance|disFilter}}km</view>
				</view>
				<view class="middle">
					<image src="/static/cut/store-star.png"></image>
					<view>{{item.mainScore.toFixed(1)}}</view>
					<text>总售{{item.monthlySale}}</text>
				</view>
				<view class="bottom">
					<view class="yellowBox" v-if="item.deliveryFee==0">免费配送</view>
					<view class="grayBox" v-else>配送￥{{item.deliveryFee}}</view>
					<view class="grayBox">起送{{item.startingAndDeliveringFee}}</view>
					<view class="grayBox">商品{{item.goodsCount}}</view>
					<view class="toStore">
						<view>进店</view>
						<image src="/static/cut/right_orange.png"></image>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="poptop" type="top" style="margin-top:88rpx;">
			<view class="filterTop">
				<view class="title">服务商</view>
				<view class="labelBox">
					<view class="label" @tap="chooseProveide(item,index)" :class="provideIndex==index?'active':''" v-for="(item,index) in providerOptions" :key="index">{{item.name}}</view>
				</view>
			</view>
			<view class="filterTop">
				<view class="title">排序</view>
				<view class="labelBox">
					<view class="label" @tap="chooseSort(item,index)" :class="sortIndex==index?'active':''" v-for="(item,index) in sortOptions" :key="index">{{item.name}}</view>
				</view>
			</view>
			
			<view class="filterButton" @tap="search">
				确定
			</view>
		</uni-popup>
		<uni-load-more :status="loadingType">
		</uni-load-more>
	</view>
</template>


<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
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
			uniPopup,
			uniLoadMore
		},
		data(){
			return{
				loadingType:"loading",
				iconList:[
					{url:'/static/tab/icosh.png',name:'生活',id:8},
					{url:'/static/tab/icodg.png',name:'代购',id:10},
					{url:'/static/tab/icojz.png',name:'家政',id:3},
					{url:'/static/tab/icojr.png',name:'金融',id:5},
					{url:'/static/tab/icowx.png',name:'维修',id:9},
					{url:'/static/tab/icofw.png',name:'房屋',id:1},
				],
				queryInfo:{
					firsttypeId:8,
					longitude:114.012257,
					latitude:22.687355,
					pageNo:1,
					pageSize:10,
					type:'',
					sort:''
				},
				list:[],
				providerOptions:[
					{name:'全部',id:''},
					{name:'个人',id:1},
					{name:'公司',id:2}				
				],
				sortOptions:[
					{name:'销量',id:2},
					{name:'距离最近',id:1}			
				],
				provideIndex:null,
				sortIndex:null
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.getList()
		},
		onReachBottom(){
			this.queryInfo.pageNo += 1
			this.getList()
		},
		methods:{
			async getList(){
				await indexmodel.findAllSeller(this.queryInfo,data=>{
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
			clickNav(nav){
				this.queryInfo.firsttypeId = nav.id
				this.queryInfo.pageNo = 1
				this.getList()
			},
			toStore(item){
				uni.navigateTo({
					url:`/pages/shop/theStore?sellerId=${item.sellerId}&type=${item.firstTypeId}`
				})
			},
			filter(){
				this.$refs.poptop.open()
			},
			chooseProveide(item,index){
				if(this.provideIndex === index){
					this.provideIndex = null
				}else{
					this.provideIndex = index
				}
				
				if(this.provideIndex == null||this.provideIndex == 0){
					this.queryInfo.type = ''
				}else{
					this.queryInfo.type = this.provideIndex
				}
			},
			chooseSort(item,index){
				if(this.sortIndex === index){
					this.sortIndex = null
				}else{
					this.sortIndex = index
				}
				if(this.sortIndex == null){
					this.queryInfo.sort = ''
				}else{
					this.queryInfo.sort = this.sortIndex
				}
			
			},
			search(){
				this.queryInfo.pageNo = 1
				this.getList()
				this.$refs.poptop.close()
			},
			toSearch(){
				uni.navigateTo({
					url:'/pages/HM-search/searchSeller'
				})
			},
			toNearbyMap(){
				indexmodel.findAllSeller(this.queryInfo,data=>{
					let allSeller = data
					for(let i of allSeller){
						i.showFlag = false
					}
					uni.navigateTo({
						url:'/pages/nearby/nearbyMap?data=' + JSON.stringify(allSeller) + '&id=8' 
					})
					
				})
				
				
				
				
			}
			
			
		}
	}
</script>


<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	.top-header{
		background-color: #fff;
		height:88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		.searchImg{
			width:34rpx;
			height:38rpx;
		}
		view{
			font-size:34rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
		}
		.mapImg{
			width:40rpx;
			height:39rpx;
		}
	}
	
	.scroll{
		height:192rpx;
		display: flex;
		border-top: 10rpx solid #F2F2F2;
		border-bottom: 10rpx solid #F2F2F2;
		background-color: #fff;
		.scroll_nav_box{
			width:600rpx;
			padding: 30rpx;
			box-sizing: border-box;	
			display: flex;
			justify-content: flex-start;
			align-items: center;
			white-space: nowrap;
			background: #fff;
			.scroll_nav_item{
				display: inline-block;
				width:74rpx;
				text-align: center;
				margin-right: 60rpx;
				color:#3c3c3c;
				opacity: 0.6;
				&.active{
					opacity: 1;
				}
				image{
					display: block;
					width:74rpx;
					height:74rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.line{
			margin-top: 26rpx;
			width:2rpx;
			height:120rpx;
			background:rgba(255,201,165,1);
			box-shadow:0rpx 2rpx 8rpx 0rpx rgba(255,163,101,0.8);
		}
		.filter{
			padding:36rpx 0;
			width:148rpx;
			display: flex;
			align-items: center;
			view{
				margin-left: 30rpx;
				font-size:28rpx;
				color:#3C3C3C;
			}
			image{
				width:24rpx;
				height:26rpx;
			}
		}
	}
	
	.item{
		height:210rpx;
		background-color: #fff;
		margin-top: 10rpx;
		padding:30rpx 20rpx;
		display: flex;
		.storeImg{
			width:150rpx;
			height:150rpx;
			border-radius:10rpx;
			margin-right: 20rpx;
		}
		.content{
			.top{
				width:540rpx;
				display: flex;
				justify-content: space-between;
				.title{
					font-size:32rpx;
					color:#1E1E1E;
					font-weight: bolder;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp:1;
					-webkit-box-orient:vertical;
					word-wrap:break-word;
					word-break: break-all;
				}
			}
			.middle{
				margin-top: 20rpx;
				display: flex;
				height:30rpx;
				align-items: center;
				image{
					width:24rpx;
					height:25rpx;
				}
				view{
					margin-left: 8rpx;
					color:#646464;
					font-weight:bolder;
					color:rgba(255,198,0,1);
				}
				text{
					color:#505050;
					margin-left: 19rpx;
				}
			}
			.bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				.yellowBox{
					padding:0rpx 5rpx;
					border:1px solid rgba(255,102,0,1);
					font-size:22rpx;
					border-radius: 6rpx;
					color:rgba(255,102,0,1);
				}
				.grayBox{
					padding: 0 5rpx;
					border:1px solid  rgba(160,160,160,1);
					font-size:22rpx;
					border-radius: 6rpx;
					color:#8C8C8C;
				}
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
	
	.filterTop{
		.title{
			color:#646464;
			font-size:28rpx;
			margin-bottom: 20rpx;
		}
		.labelBox{
			border-bottom: 1rpx solid #F2F2F2;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 30rpx;
			.label{
				margin-right: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 30rpx;
				height:58rpx;
				background:rgba(240,240,240,1);
				border-radius:10px;
				&.active{
					background:#FFF1E8;
					color:#FF6600;
				}
			}
		}
	}
	
	.filterButton{
		margin-top: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#fff;
		width:710rpx;
		height:70rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;
	}
</style>