<template>
    <view>
		<bavigationbar :firsttype="type"></bavigationbar>
		<Swiper :swiperImage="swiperImg"></Swiper>
		<view class="chooseType">
			<view class="title">
				<view class="title-border"></view>
				<view class="title-content">{{position}}服务</view>
			</view>
			<view class="icon" @tap="pop()">
				筛选<image src="https://sgz.wdttsh.com/mini_static/cut/triangle-down.png"></image>
			</view>
		</view>
		<block v-if="type==8||type==10">
			<block v-for="(item,index) in data" :key="index">
				<item-list :src="item.smallPic" :money="item.price" 
				:title="item.goodsName|titleFormat" :deliver="item.postFee" :sales="item.monthSale"
				v-on:toDetailPage="toDetail(item)" v-on:addcart="addToCart(item)"
				:distance="item.distance|fixOne"></item-list>
			</block>
		</block>
		
		<block v-if="type==3||type==9">
			<block v-for="(item,index) in data" :key="index">
				<item-service :src="item.smallPic" :money="item.price" 
				:title="item.goodsName|titleFormat" :deliver="item.postFee" :sales="item.monthSale"
				:distance="item.distance|fixOne" @toNextPage="toDetail(item)"></item-service>
			</block>
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
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import bavigationbar from "@/components/bavigation-bar.vue"
import Swiper from "@/components/Swiper.vue"
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import itemList from '@/components/item-list.vue'
import itemService from '@/components/item-service.vue'
import {ProvideModel} from '@/common/models/provide.js'
const providemodel = new ProvideModel()
import {mapState} from 'vuex'
export default {
	filters: {
		titleFormat: function(title) {
			if(title.length>25){
				return title.substring(0,25) + '...'
			}else{
				return title
			}	
		},
		fixOne(value){
			return parseInt(value/1000).toFixed(1)
		}
	},
	computed:{
		...mapState(['lat','lon']),
	},
	components: {
		bavigationbar,
		Swiper,
		uniPopup,
		itemList,
		uniLoadMore,
		itemService
	},
	data () {
		return {
			dataReq:{
				pageNo:1,
				pageSize:10,
				goodsFirsttype:'',
				latitude:'',
				longitude:'',
				goodsSecondtype:'',
				sort:5
			},
			data:'',
			type:'',
			position:'',
			swiperImg:[],
			status:'more',
			typeData:'',
			secondIndex:null,
			orderIndex:null,
			secondId:'',
			orderItem:['价格升序','价格降序','评分升序','评分降序','距离升序','距离降序'],
			orderNum:1,
		}
	},
	onLoad(options) {
		
		this.type = options.type
		this.getTypeName()
		providemodel.getSwiperImage({position:this.position},(data)=>{
			for(let item of data){
				this.swiperImg.push(item.coverImg)
			}
		})
		this.dataReq.goodsFirsttype = this.type
		this.dataReq.latitude = this.lat
		this.dataReq.longitude = this.lon
		providemodel.getItemList(this.dataReq,(data)=>{
			this.data = data
		})
	},
	onShow(){
		let firstType = ''
		if(this.type==8){
			firstType = '生活'
		}else if(this.type==3){
			firstType = '家政'
		}else if(this.type==10){
			firstType = '代购'
		}else if(this.type==9){
			firstType = '维修'
		}
		providemodel.getSecondType({firstType,type:2},(data)=>{
			this.typeData = data
		})
		uni.setNavigationBarTitle({
			title:firstType + '服务'
		})
	},
	onReady() {
		
	},
	onReachBottom() { 
		this.status="loading"
		let len = this.data.length
		if(len%10==0){
			this.dataReq.pageNo = parseInt(len/10) + 1
		}else if(len % 10 > 0){
			this.dataReq.pageNo = parseInt(len/10) + 2
		}
		
		providemodel.getItemList(this.dataReq,(data)=>{
			if(data.length == 10){
				this.data = this.data.concat(data)
			}else if(data.length > 0 && data.length < 10){
				this.data = this.data.concat(data)
				this.status = 'noMore'
			}else if(data.length == 0){
				this.status = 'noMore'
			}
		})
	},
	methods: {
		getTypeName(){
			if(this.type==8){
				this.position = '生活'
			}else if(this.type==10){
				this.position = '代购'
			}else if(this.type==3){
				this.position = '家政'
			}else if(this.type==9){
				this.position = '维修'
			}
		},
		screen (type) {
			this.type = type
			this.$refs["popup"].open()
		},
		selec (index) {
			console.log(index)
			this.selectSpec=index;
		},
		change(e) {
			console.log(e.show)
		},
		toIndex(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		toDetail(item){
			uni.navigateTo({
				url:`detail?sellerId=${item.sellerId}&id=${item.id}&type=${this.type}&distance=${item.distance}`
			})
		},
		addToCart(item){
			providemodel.addCart({goodsItemId:item.defaultItemId,num:1},(data)=>{
				uni.showToast({
					title:"添加购物车成功",
					duration:1500,
					icon:'none'
				})
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
		confirmSecond(item){
			if(this.secondIndex==null){
				this.dataReq.goodsSecondtype = ''
				this.dataReq.pageNo = 1
				providemodel.getItemList(this.dataReq,(data)=>{
					this.data = data
				})
			}else{
				this.dataReq.goodsSecondtype = this.secondId
				this.dataReq.pageNo = 1
				providemodel.getItemList(this.dataReq,(data)=>{
					this.data = data
				})
			}
			this.$refs.poptop.close()
		}
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
	border-radius: 0 0 30rpx 30rpx;
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
			margin-left: 10rpx;
			width:18rpx;
			height:12rpx;
		}
	}
}


</style>
