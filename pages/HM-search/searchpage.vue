<template>
	<view>
		<bavigationbar></bavigationbar>
		<view v-if="data.length==0" class="noGoods">
			<image src="/static/cut/noSearchRecord.png"></image>
			<view>无相关搜索商品，换个词试试吧</view>
		</view>
		
		<view v-else class="goods">
			<block v-if="type==8||type==10">
				<block v-for="(item,index) in data" :key="index">
					<item-list :src="item.smallPic" :money="item.price" 
					:title="item.goodsName|titleFormat" :deliver="item.postFee" :sales="item.monthSale"
					v-on:toDetailPage="toDetail(item)" v-on:addcart="addToCart(item)" :distance="item.distance|fixOne"></item-list>
				</block>
			</block>
			
			<block v-if="type==3||type==9">
				<block v-for="(item,index) in data" :key="index">
					<item-service :src="item.smallPic" :money="item.price" 
					:title="item.goodsName|titleFormat" :deliver="item.postFee" :sales="item.monthSale"
					:distance="item.distance|fixOne" @toNextPage="toDetail(item)"></item-service>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import itemList from '@/components/item-list.vue'
	import itemService from '@/components/item-service.vue'
	import {IndexModel} from '@/common/models/index.js'
	const indexmodel = new IndexModel()
	import {mapState} from 'vuex'
	export default{
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
		components:{
			bavigationbar,
			itemList,
			itemService
		},
		computed:{
			...mapState(['lat','lon'])
		},
		data(){
			return{
				type:'',
				key:'',
				pageNo:1,
				data:''
			}
		},
		methods:{
			toDetail(item){
				uni.navigateTo({
					url:`/page/provide/detail?sellerId=${item.sellerId}&id=${item.id}&type=${this.type}&distance=${item.distance}`
				})
			},
		},
		onLoad(options){
			this.type = options.type
			this.key = options.key
			console.log(options)
			let req = {}
			req.title = this.key
			req.latitude = this.lat
			req.longitude = this.lon
			req.pageNo = this.pageNo
			req.pageSize = 10
			req.goodsFirsttype = this.type
			indexmodel.getIndexData(req,data=>{
				this.data = data
				console.log(data)
			})
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.noGoods{
		image{
			width:402rpx;
			height:389rpx;
			margin-top: 274rpx;
			margin-left: 174rpx;
		}
		view{
			margin-left: 204rpx;
			margin-top: 40rpx;
		}
	}
</style>
