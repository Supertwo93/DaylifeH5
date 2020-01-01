<template>
	<view>
		<!-- <view class="status_bar">  
		    <view class="top_view"></view>  
		</view> -->
		<!-- <view class="place"></view> -->
		<view class="near_header">
			<image src="../../static/cut/ss.png" mode=""></image>
			附近
			<image :src="show_icon" @tap="changeShow()" mode=""></image>
		</view>
		<!-- <view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view> -->
		<scroll-view class="scroll_nav_box" scroll-x="true">
			<view class="scroll_nav_item" @tap="clickNav(idx)" :class="[navActive==idx?'active':'']" v-for="(nav,idx) in nav_list" :key="idx">
				<image :src="nav.coverImg" mode="widthFix"></image>
				<text>{{nav.title}}</text>
			</view>
		</scroll-view>
		<!-- 地图 -->
		<view class="map_box" v-if="isMap == true">
			<cover-view>
				 <!-- :controls="controls" -->
			<map id="mapId" style="width: 750rpx; height: 72vh" :latitude="latitude" :longitude="longitude" :markers="covers" @callouttap="markerClick" show-location></map>
			</cover-view>
		</view>
		<!-- 列表 -->
		<view class="map_list_box" v-else>
			<scroll-view scroll-y="true" style="height: 66vh" @scrolltolower="loadMoreList()">
				<view class="map_list_item" v-for="(list,index) in map_list" :key="index">
					<image :src="list.img" mode="widthFix" class="left_img"></image>
					<view class="mlist_center">
						<view class="mc_title">{{list.title}}</view>
						<view class="mc_info">￥<view>{{list.price}}</view><text>月售{{list.sales}}</text><text>配送费￥{{list.fee}}</text></view>
					</view>
					<view class="mlist_right">
						<text>{{list.away}}km</text>
						<image src="/static/cut/car.png" mode=""></image>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import {IndexModel} from '@/common/models/index.js'
let indexModel = new IndexModel()
export default{
	data(){
		return{
			loadingType:"loading",
			navbar:[{name:"他的提供"},{name:"他的需求"}],
			currentTab:0,
			nav_list: [
				// {icon: '/static/tab/icosh.png',title: '生活'},
				// {icon: '/static/tab/icodg.png',title: '代购'},
				// {icon: '/static/tab/icojz.png',title: '家政'},
				// {icon: '/static/tab/icojr.png',title: '金融'},
				// {icon: '/static/tab/icofw.png',title: '房屋'},
				// {icon: '/static/tab/icowx.png',title: '维修'},
				// {icon: '/static/tab/icohy.png',title: '会员'}
			],
			navActive: 0,
			
			isMap: true,
			show_icon: '/static/cut/near_list.png',
			
			latitude: 22.728393,
			longitude: 114.258532,
			// controls:[{
			// 	id: 1,
			// 	position: {
			// 		left: 15,
			// 		top: 15,
			// 		width: 32,
			// 		height: 32
			// 	},
			// 	iconPath: '/static/cut/aim_icon.png',
			// 	clickable: true
			// }],
			covers: [{
				id: 1,
				latitude: 39.909,
				longitude: 116.39742,
				iconPath: '/static/tab/icosh.png',
				width: 30,
				height: 30,
				callout: {
					content: "送水",
					// color: "#3C3C3C",
					// fontSize: 12,
					// bgColor: "#fff",
					// padding: 10,
					display: 'BYCLICK'
				}
			},{
				id: 2,
				latitude: 39.909,
				longitude: 116.39842,
				iconPath: '/static/cut/address_on.png',
				width: 30,
				height: 30,
				callout: {
					content: "买烟",
					display: 'BYCLICK'
				}
			}],
			map_list: [
				{img: '',title: '环日液化石油气5kg 即买即送货到家',price: '129.9',sales: '24',fee: 5,away: '1.3'},
				{img: '',title: '环日液化石油气5kg 即买即送货到家',price: '129.9',sales: '24',fee: 5,away: '1.3'},
				{img: '',title: '环日液化石油气5kg 即买即送货到家',price: '129.9',sales: '24',fee: 5,away: '1.3'},
				{img: '',title: '环日液化石油气5kg 即买即送货到家',price: '129.9',sales: '24',fee: 5,away: '1.3'},
			]
		}
	},
	components:{
		uniLoadMore
	},
	onReady() {
		let mapCtx = uni.createMapContext("mapId");
	},
	onLoad() {
		indexModel.getNearby((data)=>{
			console.log(data);
			this.nav_list = data
		})
	},
	methods:{
		navbarTap(e){
			console.log(e)
			this.currentTab = e;
		},
		clickNav(e){
			this.navActive = e;
			let firstId = this.nav_list[e].firsttypeinfoId;
			indexModel.getByNeedFirst({type:2,firstType:firstId},(data)=>{
				console.log(data);
			})
		},
		changeShow(){
			this.isMap = !this.isMap;
			if(this.isMap == true){
				this.show_icon = '/static/cut/near_list.png';
			}else{
				this.show_icon = '/static/cut/near_list.png';//地图icon
			}
		},
		loadMoreList(){
			this.loadingType="noMore"
		},
		markerClick(e){
			console.log(e.detail.markerId);
			// uni.navigateTo({
			// 	url: '/pages/nearby/nearbyDetail?id=' + e.detail.markerId
			// })
		},
		// controlTap(e){
		// 	uni.getLocation({
		// 	    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
		// 	    success: function (res) {
		// 	        const latitude = res.latitude;
		// 	        const longitude = res.longitude;
		// 	        uni.openLocation({
		// 	            latitude: latitude,
		// 	            longitude: longitude,
		// 	            success: function () {
		// 	                console.log('success');
		// 	            }
		// 	        });
		// 	    }
		// 	});
		// 	this.latitude = 39.909;
		// 	this.longitude = 116.39742;
		// 	console.log(this.latitude,this.longitude);
		// }
	}
}
</script>

<style scoped lang="scss">
	.place{
		height: 28px;
	}
	// ::-webkit-scrollbar{
	// 	height:0;
	// 	width:0;
	// 	color:transparent;
	// }
	.near_header{
		padding: 20rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #3C3C3C;
		font-size: 34rpx;
		font-family:Source Han Sans CN;
		image{
			display: block;
			width: 38rpx;
			height: 38rpx;
		}
	}
	.list_nav{
		width: 100%;
		z-index: 20;
		background: #fff;
		color: #646464;
		font-size: 30rpx;
		text-align: center;
		overflow: hidden;
		border-top: 1rpx solid #DCDCDC;
		view{
			width: 50%;
			float: left;
			padding: 25rpx 0;
			position: relative;
			&.active{
				color: #FF6600;
			}
			&.active:after{
				content: '';
				width:80rpx;
				height:6rpx;
				background:rgba(255,102,0,1);
				border-radius:3rpx;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
			}
		}
	}
	
	.scroll_nav_box{
		padding: 30rpx;
		box-sizing: border-box;
		border-top: 10rpx solid #F2F2F2;
		border-bottom: 10rpx solid #F2F2F2;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		white-space: nowrap;
		background: #fff;
		.scroll_nav_item{
			display: inline-block;
			width: 100rpx;
			text-align: center;
			margin-right: 60rpx;
			color: #3C3C3C;
			font-size: 26rpx;
			opacity: .6;
			&.active{
				opacity: 1;
			}
			image{
				display: block;
				width: 100rpx;
				height: 82rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	
	.map_list_box{
		background: #F2F2F2;
		.map_list_item{
			background: #fff;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			&:first-of-type{
				margin-top: 0;
			}
			.left_img{
				width: 160rpx;
				height: 160rpx;
				background: #ccc;
				border-radius: 10rpx;
			}
			.mlist_center{
				width: 55%;
				padding: 10rpx 20rpx 10rpx 0;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				.mc_title{
					color: #3C3C3C;
					font-size: 26rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
					margin-bottom: 30rpx;;
				}
				.mc_info{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					align-self: flex-end;
					color: #B4B4B4;
					font-size: 22rpx;
					view{
						color: #FF6600;
						font-size: 26rpx;
					}
					text{
						margin-left: 30rpx;
					}
				}
			}
			.mlist_right{
				width: 15%;
				padding: 10rpx 20rpx 10rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
				flex-wrap: wrap;
				color: #787878;
				font-size: 24rpx;
				image{
					display: flex;
					align-self: flex-end;
					width: 56rpx;
					height: 56rpx;
				}
			}
		}
	}
</style>
