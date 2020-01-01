<template>
	<view>
		<bavigationbar></bavigationbar>
		<Swiper :swiperImage="swiperImage"></Swiper>
		<view class="chooseType">
			<view class="title">房屋服务</view>
			<view class="icon" @tap="pop()">
				筛选<image src="/static/cut/filter_icon.png"></image>
			</view>
		</view>
		<block v-for="(row,number) in houseList" :key="number">
			<item-service :src="row.picture.split(',')[0]" :title="row.title" @toNextPage='toDetail(number)'
			:money="row.price" :desc="row.squareMetre+'㎡  ' + '|' + '  ' + row.floor + '/' + row.attribute + '层'"></item-service>
		</block>
		<uni-load-more :status='status'></uni-load-more>
		<uni-popup ref="poptop" type="top">
			<view class="secondType">
				<view class="title">服务子类</view>
				<view class="typeContent">
					<view v-for="(item,index) in typeData" :key="index" class="grayButton">
						{{item.title}}
					</view>
				</view>
				<view class="title">排序</view>
				<view class="order">
					<view class="grayButton">价格倒序</view>
					<view class="grayButton">价格正序</view>
					<view class="grayButton">距离最近</view>
				</view>
				<view class="button">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import Swiper from "@/components/Swiper.vue"
	import itemList from '@/components/item-list.vue'
	import itemService from '@/components/item-service.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {HouseModel} from "@/common/models/house.js"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	let housemodel = new HouseModel()
	
	export default {
		components:{
			itemList,
			itemService,
			uniLoadMore,
			Swiper,
			bavigationbar,
			uniPopup
		},
		data() {
			return {
				itemList:[
				],
				houseList:[],
				status:'more',
				swiperImage:[],
				obj:{
					pageNo:1,
					sellerId:'',
					houseType:''
				},
				typeparams:{
					firstType :'房屋',
					type:1
				},
				typeData:[]
			}
		},
		methods: {
			toDetail(number){
				uni.navigateTo({
					url:'housedetail?data='+ this.houseList[number].id
				})
			},
			pop(){
				this.$refs.poptop.open()
			}
		},
		onLoad:function(){
			housemodel.getHouseList(this.obj,(data)=>{
				this.houseList = data.houseList
			})
			
			housemodel.getSwiperImage((data)=>{
				for(let i = 0;i < data.length;i++){
					this.swiperImage.push(data[i].coverImg)
				}
				console.log(this.swiperImage)
			})
			
			housemodel.getHouseSecondType(this.typeparams,(data)=>{
				this.typeData = data
			})
			
			
		},
		onReachBottom(){
			this.status = 'loading'
			let len = this.houseList.length
			if(len % 10==0){
				this.obj.pageNo = parseInt(len/10) + 1
			}else if(len % 10 > 0){
				this.obj.pageNo = parseInt(len/10) + 2
			}
			

			housemodel.getHouseList(this.obj,(data)=>{
				if(data.houseList.length == 10){
					this.houseList = this.houseList.concat(data.houseList)
				}else if(data.houseList.length > 0 && data.houseList.length < 10){
					this.houseList = this.houseList.concat(data.houseList)
					this.status = 'noMore'
				}else if(data.houseList.length == 0){
					this.status = 'noMore'
				}
			})
		}
		
	}
</script>

<style lang="scss">

page{
	background-color: #f2f2f2;
}

.chooseType{
	height:84rpx;
	background-color: #fff;
	padding: 0 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.title{
		border-left: 8rpx solid #FF6600;
		font-size:28rpx;
		font-weight:400;
		color:rgba(60,60,60,1);
	}
	.icon{
		display: flex;
		align-items: center;
		font-size:28rpx;
		font-weight:400;
		color:rgba(120,120,120,1);
		image{
			width:24rpx;
			height:26rpx;
		}
	}
}

</style>
