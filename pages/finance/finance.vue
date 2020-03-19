<template>
	<view>
		<bavigationbar></bavigationbar>
		<Swiper :swiperImage="swiperImage"></Swiper>
		<view class="indexChooseType">
			<view class="title">
				<view class="title-border"></view>
				<view class="title-content">金融服务</view>
			</view>
			<view class="icon" @tap="pop()">
				筛选<image src="https://sgz.wdttsh.com/mini_static/cut/triangle-down.png"></image>
			</view>
		</view>
		
		<block v-for="(row,number) in data" :key="number">
			<item-service :src="row.picture.split(',')[0]" :title="row.title"
			:money="row.price" :desc="row.loan_rates" @toNextPage="toDetail(number)"
			:distance="row.distance|fixOne"></item-service>
		</block>
		
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
				<view class="button"  @tap="confirmSecond">确定</view>
			</view>
		</uni-popup>
		<uni-load-more :status='status'></uni-load-more>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import Swiper from "@/components/Swiper.vue"
	import itemService from '@/components/item-service.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {FinanceModel} from '@/common/models/finance.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {ProvideModel} from '@/common/models/provide.js'
	const providemodel = new ProvideModel()
	let financemodel = new FinanceModel()
	import {mapState} from 'vuex'
	export default {
		computed:{
			...mapState(['lat','lon'])
		},
		filters: {
			fixOne(value){
				return parseInt(value/1000).toFixed(1)
			}
		},
		components:{
			bavigationbar,
			Swiper,
			itemService,
			uniLoadMore,
			uniPopup
		},
		data() {
			return {
				status:'more',
				swiperImage:[],
				data:[],
				typeData:'',
				secondIndex:null,
				pageNo:1,
				orderItem:['价格升序','价格降序','距离最近'],
				orderIndex:null,
				orderNum:1
			}
		},
		onLoad(){
			providemodel.getSwiperImage({position:'金融'},(data)=>{
				for(let item of data){
					this.swiperImage.push(item.coverImg)
				}
			})
			let req = {pageNo:this.pageNo,pageSize:10,longitude:this.lon,latitude:this.lat}
			financemodel.getFinanceList(req,(data)=>{
				this.data = data
			})
		},
		onShow() {
			providemodel.getSecondType({firstType:'金融',type:2},(data)=>{
				this.typeData = data
			})
		},
		onReachBottom(){
			this.status = 'loading'
			this.pageNo++
			let req = {pageNo:this.pageNo,pageSize:10,longitude:this.lon,latitude:this.lat}
			financemodel.getFinanceList(req,(data)=>{
				if(data.length>0&&data.length<10){
					this.data = this.data.concat(data)
					this.status = 'noMore'
				}else if(data.length==10){
					this.data = this.data.concat(data)
				}else{
					this.status = 'noMore'
				}
			})
			
		},
		methods: {
			toDetail(number){
				let item = this.data[number]
				uni.navigateTo({
					url:'financedetail?financeId=' + item.id + '&code=' + item.financeCode + '&sellerId=' + item.sellerId
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
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
</style>
