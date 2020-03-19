<template>
	<view>
		<view class="top">
			<view class="top-header">
				<image @tap="toBack" class="searchImg" src="/static/cut/lifecircle/backto.png"></image>
				<view>附近</view>
				<image @tap="toBack" class="mapImg"  src="/static/cut/goods-list.png"></image>
			</view>
			<view class="scroll">
				<scroll-view class="scroll_nav_box" scroll-x="true">
					<view class="scroll_nav_item" @tap="clickNav(nav)" :class="[queryInfo.firsttypeId==nav.id?'active':'']" v-for="(nav,idx) in iconList" :key="nav.id">
						<image :src="nav.url" mode="widthFix"></image>
						<text>{{nav.name}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<baidu-map :style="{height:mapHeight}" class="map" :center="{lng: 114.24779, lat: 22.71991}" :zoom="15">
			<block v-for="(item,index) in data" :key="index">
				<bm-marker :position="{lng:  item.latitudeLongitude.split(',')[0], lat: item.latitudeLongitude.split(',')[1]}" :dragging="false" @click="infoWindowOpen(item)" :icon="{url: require('../../static/cut/mapIcon.png'),opts:{imageSize:{width: 43, height: 52}}, size: {width: 43, height: 52}}">
					<bm-info-window :position="{lng:item.latitudeLongitude.split(',')[0], lat: item.latitudeLongitude.split(',')[1]}" :show="item.showFlag" @close="infoWindowClose(item)" @open="infoWindowOpen(item)">
						<view @tap="toStore(item)" class="box">
							<image :src="item.logoPic"></image>
							<view class="lf">
								<view class="top">
									<view>{{item.nickName}}</view>
									<view>1.3km</view>
								</view>
								<view class="middle">
									<image src="/static/cut/star_on.png"></image>
									评分{{item.mainScore}}
								</view>
								<view class="bottom">
									<view>月售{{item.monthlySale}}</view>
									<view>商品数量{{item.goodsCount}}</view>
								</view>
							</view>
						</view>
					</bm-info-window>
				</bm-marker>
			</block>
		</baidu-map>
		
	</view>
</template>

<script>
	import {IndexModel} from '@/common/models/index.js'
	const indexmodel = new IndexModel()
	export default{
		data(){
			return{
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
				topHeight:'',
				mapHeight:'',
				data:''
			}
		},
		onLoad(options){
			this.queryInfo.firsttypeId = options.id
			this.data = JSON.parse(options.data)
		},
		mounted(){
			const res = uni.getSystemInfoSync()
			uni.createSelectorQuery().select('.top').boundingClientRect(data=>{
				this.topHeight = data.height
			}).exec()
			this.mapHeight = (res.screenHeight - this.topHeight) + 'px'
		},
		methods:{
			toBack(){
				uni.switchTab({
					url:'/pages/nearby/nearby'
				})
			},
			clickNav(nav){
				this.queryInfo.firsttypeId = nav.id
				indexmodel.findAllSeller({firsttypeId:nav.id,pageSize:1000},data=>{
					
					for(let i of data){
						i.showFlag = false
					}
					this.data = data
					uni.redirectTo({
						url:'/pages/nearby/nearbyMap?data=' + JSON.stringify(data) + '&id=' + nav.id
					})
				})
			},
			infoWindowClose (item) {
				item.showFlag = false
			},
			infoWindowOpen (item) {
				item.showFlag = true
			},
			toStore(item){
				uni.navigateTo({
					url:`/pages/shop/theStore?sellerId=${item.sellerId}&type=${item.firstTypeId}`
				})
			},
		}
	}
	
</script>

<style lang="scss" scoped>
	.top-header{
		background-color: #fff;
		height:88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		.searchImg{
			width:20rpx;
			height:34rpx;
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
			width:750rpx;
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
	}
	
	.box{
		padding:30rpx 0;
		width:560rpx;
		height:210rpx;
		display: flex;
		image{
			width:150rpx;
			height:150rpx;
			border-radius: 10rpx;
		}
		.lf{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			.top{
				display: flex;
				justify-content: space-between;
			}
			.middle{
				image{
					width:25rpx;
					height:23rpx;
				}
			}
			.bottom{
				display: flex;
				view{
					margin-right: 80rpx;
					color:#8c8c8c;
				}
				
			}
		}
	}
</style>
