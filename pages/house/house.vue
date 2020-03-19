<template>
	<view>
		<bavigationbar></bavigationbar>
		<Swiper :swiperImage="swiperImage"></Swiper>
		<view class="chooseType">
			<view class="title">
				<view class="title-border"></view>
				<view class="title-content">房屋服务</view>
			</view>
			<view class="icon" @tap="pop()">
				筛选<image src="https://sgz.wdttsh.com/mini_static/cut/triangle-down.png"></image>
			</view>
		</view>
		<block v-for="(row,number) in houseList" :key="number">
			<item-service :src="row.picture.split(',')[0]" :title="row.title" @toNextPage='toDetail(number)'
			:distance='row.distance|fixOne' :money="row.price" :desc="row|meterFilter"
			:isHouse="true"></item-service>
		</block>
		<uni-load-more :status='status'></uni-load-more>
		<uni-popup ref="poptop" type="top">
			<view class="secondType">
				<view class="title">服务子类</view>
				<view class="typeContent">
					<view v-for="(item,index) in typeData" :class="[secondIndex==index?'secondOn':'grayButton']" 
					:key="index" @tap="chooseSecondType(item,index)">
						{{item.title}}
					</view>
				</view>
				<view class="title">排序</view>
				<view class="order">
					<block v-for="(item,index) in orderItem" :key="index">
						<view  :class="[orderIndex==index?'secondOn':'grayButton']" @tap="chooseOrder(item,index)">{{item}}</view>
					</block>
				</view>
				<view @tap="confirmSecond" class="button">确定</view>
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
	import {mapState} from 'vuex'
	export default {
		computed:{
			...mapState(['lat','lon'])
		},
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
					type:2
				},
				typeData:[],
				secondIndex:null,
				orderItem:['价格升序','价格降序','距离最近'],
				orderIndex:null,
				orderNum:1
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
			},
			chooseSecondType(item,index){
				if(this.secondIndex==null){
					this.secondIndex = index
					this.secondId = item.secondtypeinfoId
					
				}else{
					if(this.secondIndex == index){
						this.secondIndex = null
						this.secondId = item.secondtypeinfoId
					}else{
						this.secondIndex = index
						this.secondId = item.secondtypeinfoId
					}
				}
			},
			chooseOrder(item,index){
				if(this.orderIndex==null){
					this.orderIndex = index
					this.orderNum = parseInt(index) + 1
				}else{
					if(this.orderIndex == index){
						this.orderIndex = null
						this.orderNum = 1
					}else{
						this.orderIndex = index
						this.orderNum = parseInt(index) + 1
					}
				}
			},
			confirmSecond(){
				this.$refs.poptop.close()
			}
		},
		filters: {
			fixOne(value){
				return parseFloat(value/1000).toFixed(1)
			},
			meterFilter(value){
				if(value.hasOwnProperty('squareMetre')){
					return value.squareMetre + '㎡'
				}else{
					return '暂无'
				}
			}
		},
		onLoad:function(){
			this.obj.longitude = this.lon
			this.obj.latitude = this.lat
			housemodel.getHouseList(this.obj,(data)=>{
				this.houseList = data.houseList
			})
			
			housemodel.getSwiperImage((data)=>{
				for(let i = 0;i < data.length;i++){
					this.swiperImage.push(data[i].coverImg)
				}
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
			
			this.obj.longitude = this.lon
			this.obj.latitude = this.lat
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
		padding-left:10rpx;
		display: flex;
		align-items: center;
		.title-border{
			margin-right: 13rpx;
			width:8rpx;
			height:30rpx;
			background:rgba(255,102,0,1);
		}
		.title-content{
			font-size:34rpx;
			font-weight:bold;
			color:rgba(30,30,30,1);
		}
	}
	.icon{
		display: flex;
		align-items: center;
		font-size:28rpx;
		font-weight:400;
		color:#ff6600;
		image{
			margin-right: 10rpx;
			width:18rpx;
			height:12rpx;
		}
	}
}

</style>
