<template>
	<view>
		<view class="nav">
			<view @tap="backToLast" class="backto">
				<image src="/static/cut/lifecircle/backto.png"></image>
			</view>
			<view class="title">我的店铺</view>
			<image @tap="toManage" class="one" src="/static/cut/storevip.png"></image>
			<image @tap="editStoreInfo" class="two" src="/static/cut/storesetting.png"></image>
		</view>
		<view class="open_close_box">
			<bavigationbar></bavigationbar>
			<view class="open_close_shop">
				<view v-if="isOpenDate == 0">
					<text>暂停营业中，快打开店铺营业吧~</text>
					<button type="primary" @tap="openShop">开店</button>
				</view>
				<view class="gray" v-else>
					<text>正在营业中，关店时需手动关闭。</text>
					<button type="primary" @tap="showPopup">关店</button>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="popup_title">
					<text @tap="cancelPopup">取消</text>
					<block v-if="is_select_start == 0">
						选择关店起始日期
						<text @tap="okStartPopup">确定</text>
					</block>
					<block v-else>
						选择关店结束日期
						<text @tap="okEndPopup">确定</text>
					</block>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column>
				</picker-view>
			</uni-popup>
		</view>
		<view class="list_box">
			<view class="left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view class="item" 
						v-for="(item,index) in leftArray"
						:key="index" 
						:class="{ 'active':index==leftIndex }" 
						:data-index="index"
						@tap="leftTap"
					>{{item}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<!-- <view class="tips" v-if="mainArray.length>0" :style="{ 'top':tipsTop }">{{mainArray[leftIndex].title}}</view> -->
				<scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
					<view class="item" v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
						<view class="title">
							<view>{{item.title}}</view>
						</view>
						<view class="goods" v-for="(item2,index2) in item.list" :key="index2">
							<image v-if="typeId!=1&&typeId!=5" :src="item2.smallPic" mode=""></image>
							<image v-if="typeId==1||typeId==5" :src="item2.picture.split(',')[0]" mode=""></image>
							<view class="content">
								<view v-if="typeId==1||typeId==5" class="goodsTitle">{{item2.title}}</view>
								<view v-if="typeId!=1&&typeId!=5" class="goodsTitle">{{item2.goodsName}}</view>
								<!-- <view class="describe">第{{index2+1}}个商品的描述内容</view> -->
								<view class="money">
									<view class="price">￥{{item2.price}}</view>
									<image @tap="toEdit(item2)" src="/static/cut/address_edit.png"></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>

</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import bavigationbar from "@/components/bavigation-bar.vue"
	import {LikeModel} from '@/common/models/like.js'
	import {StoreModel} from '@/common/models/store.js'
	import {ProvideModel} from '@/common/models/provide.js'
	import {UserModel} from '@/common/models/user.js'
	import { GoodsModel } from '@/common/models/goods.js';
	const goodsModel = new GoodsModel();
	const usermodel=new UserModel()
	const providemodel = new ProvideModel()
	const Likemodel = new LikeModel()
	const storemodel = new StoreModel()
	export default{
		components:{
			bavigationbar,
			uniPopup
		},
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
					  years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
					  if(i<10){
						  months.push('0'+i)
						}else{
							months.push(i)
						}
			}
			for (let i = 1; i <= 31; i++) {
					  if(i<10){
						  days.push('0'+i)
						}else{
							days.push(i)
						}
			}
			return {
				scrollHeight:'500px',
				leftArray:[],
				mainArray:[],
				topArr:[],
				leftIndex:0,
				isMainScroll:false,
				scrollInto:'',
				tipsTop:'0px',
				top:'',
				goodsList:[],
				typeId:'',
				sellerId:'',
				barHeight:'',
				storeInfoHeight:'',
				sellerData:'',
				
				isOpenDate: 1,
				is_select_start: 0,
				startDay: '',
				dateStart: '',
				dateEnd: '',
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		onLoad(options){
			this.typeId = options.type
			this.sellerId = options.sellerId
			storemodel.getSellerInfo({sellerId:options.sellerId},data=>{
				this.sellerData = data
			})
		},
		onReady(){
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollHeight=`${res.windowHeight}px`;
				}
			});
			uni.createSelectorQuery().select('.open_close_box').boundingClientRect(data=>{
				this.storeInfoHeight = data.height
			}).exec()
			uni.createSelectorQuery().select('.nav').boundingClientRect(data=>{
				this.barHeight = data.height
			}).exec()
			this.scrollHeight = `${parseInt(this.scrollHeight) - this.barHeight- this.storeInfoHeight}px`
		},
		computed:{
			
		},
		mounted(){
			this.getListData();
		},
		methods: {
			bindChange: function (e) {
					   const val = e.detail.value
					   this.year = this.years[val[0]]
					   this.month = this.months[val[1]]
					   this.day = this.days[val[2]]
					   console.log(val);
			},
			cancelPopup(){
						this.$refs.popup.close()
			},
			toEdit(item){
				if(this.typeId==5){
					uni.navigateTo({
						url:`changeShop/changeFinanceShop?id=${item.financeId}&code=${item.financeCode}&type=${this.typeId}`
					})
				}else if(this.typeId==1){
					uni.navigateTo({
						url:`changeShop/changeHouseShop?id=${item.id}&type=${this.typeId}`
					})
				}else{
					uni.navigateTo({
						url:`changeShop/changeShop?id=${item.id}&type=${this.typeId}` 
					})
				}
				
			},
			okStartPopup(e){
				let now = new Date();
				var selectDate = new Date();
				selectDate.setFullYear(this.year);
				selectDate.setMonth(this.month - 1);
				selectDate.setDate(this.day);
				if(selectDate.toDateString() != now.toDateString()){
				   this.$api.msg("起始时间必须是今天");
				   return;
				}
				this.dateStart = this.year+'-'+this.month+'-'+this.day
				this.startDay = this.day
				this.is_select_start = 1
			},
			okEndPopup(e){
				let now = new Date();
				var selectDate = new Date();
				selectDate.setFullYear(this.year);
				selectDate.setMonth(this.month - 1);
				selectDate.setDate(this.day);

				if(selectDate < now){
				   this.$api.msg("结束时间不能小于今天");
				   return;
				}
				this.dateEnd = this.year+'-'+this.month+'-'+this.day
				this.is_select_start = 0
				this.$refs.popup.close()
				usermodel.closeShop({
					sellerId: this.sellerId,
					closeStatsDate: this.dateStart,
					closeEndDate: this.dateEnd
				},(data)=>{
					console.log(data);
					usermodel.checkStoreInfo({sellerId: this.sellerId},(res)=>{
						console.log(res.isOpenDate);
						this.isOpenDate = res.isOpenDate;
					})
				})
			},
			openShop(){
				usermodel.openShop({sellerId: this.sellerId},(data)=>{
				   console.log(data);
				   usermodel.checkStoreInfo({sellerId: this.sellerId},(res)=>{
					console.log(res.isOpenDate);
					this.isOpenDate = res.isOpenDate;
				   })
				})
			},
			showPopup(){
					   uni.showModal({
					   	content: "关店后买家将无法下单，是否确认关店？",
						confirmColor: "#FF6600",
						success: (res) => {
							if(res.confirm == true){
								this.$refs.popup.open()
								this.value = [9999, this.month - 1, this.day - 1]
							}
						}
					   })
					 
			},
			/* 获取列表数据 */
			getListData(){
				/* 因无真实数据，当前方法模拟数据 */
				let [left,main]=[[],[]];
				storemodel.sellerGetShopGoods({firsttypeId:this.typeId},(data)=>{
					if(this.typeId!=1&&this.typeId!=5){
						this.goodslist = []
						for(let i of data){
							if(i.goodsList.length!=0){
								this.goodsList.push(i)
							}
						}
						console.log(this.goodsList)
						for(let i of this.goodsList){
							left.push(i.name);
							
							let list=[];
							for(let j of i.goodsList){
								list.push(j);
							}
							main.push({
								title:`${i.name}`,
								list
							})
						}
						this.leftArray=left;
						
						this.mainArray=main;
						console.log(this.mainArray)
					}else if(this.typeId==1){
						let sellerGroup = []
						for(let i of data.houseTypeList){
							for(let j of data.houseList){
								if(i.id==j.sellerGroupId){
									sellerGroup.push(i)
									break
								}
							}
						}
						for(let i of sellerGroup){
							console.log(i)
							i.goodsList = []
							for(let j of data.houseList){
								if(i.id == j.sellerGroupId){
									i.goodsList.push(j)
								}
							}
						}
						this.goodslist = []
						for(let i of sellerGroup){
							this.goodsList.push(i)
						}
						for(let i of this.goodsList){
							left.push(i.name);
							let list=[];
							for(let j of i.goodsList){
								list.push(j);
							}
							main.push({
								title:`${i.name}`,
								list
							})
						}
						this.leftArray=left;
						
						this.mainArray=main;
						console.log(this.mainArray)
					}else if(this.typeId==5){
						console.log(data)
						let sellerGroup = []
						for(let i of data.financeTypeList){
							for(let j of data.financeList){
								if(i.id==j.sellerGroupId){
									sellerGroup.push(i)
									break
								}
							}
						}
						for(let i of sellerGroup){
							console.log(i)
							i.goodsList = []
							for(let j of data.financeList){
								if(i.id == j.sellerGroupId){
									i.goodsList.push(j)
								}
							}
						}
						this.goodslist = []
						for(let i of sellerGroup){
							this.goodsList.push(i)
						}
						for(let i of this.goodsList){
							left.push(i.name);
							let list=[];
							for(let j of i.goodsList){
								list.push(j);
							}
							main.push({
								title:`${i.name}`,
								list
							})
						}
						this.leftArray=left;
						
						this.mainArray=main;
						console.log(this.mainArray)
					}
					this.$nextTick(()=>{
						this.getElementTop();	
					});
				})
				
			},
			/* 获取元素顶部信息 */
			getElementTop(){
				/* Promise 对象数组 */
				let p_arr=[];
				
				/* 新建 Promise 方法 */
				let new_p=(selector)=>{
					return new Promise((resolve,reject)=>{
						let view = uni.createSelectorQuery().select(selector);
						view.boundingClientRect(data => {
							resolve(data.top)
						}).exec();
					})
				}
				
				/* 遍历数据，创建相应的 Promise 数组数据 */
				this.mainArray.forEach((item,index)=>{
					p_arr.push(new_p(`#item-${index}`));
				});
				console.log(p_arr)
				
				/* 主区域滚动容器的顶部距离 */
				new_p("#scroll-el").then((res)=>{
					let top = res;
					// #ifdef H5
					top+=43;	//因固定提示块的需求，H5的默认标题栏是44px
					// #endif
					this.top = top
					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data)=>{
						this.tipsTop=`${top}px`;
						this.topArr=data;
					});
				})
			},
			/* 主区域滚动监听 */
			mainScroll(e){
				if(!this.isMainScroll){
					return;
				}
				let top =e.detail.scrollTop + this.top;
				let index=-1;
				
				if(top>=this.topArr[this.topArr.length-1]){
					index=this.topArr.length-1;
				}else{
					index=this.topArr.findIndex((item,index)=>{
						return this.topArr[index+1] >= top;
					});
				}
				this.leftIndex=(index < 0 ? 0: index);
			},
			/* 主区域触摸 */
			mainTouch(){
				this.isMainScroll=true;
			},
			/* 左侧导航点击 */
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.isMainScroll=false;
				this.leftIndex=Number(index);
				this.scrollInto=`item-${index}`;
				
			},
			backToLast(){
				uni.navigateBack({
					delta:1
				})
			},
			editStoreInfo(){
				uni.navigateTo({
					url:'/pages/user/store/editStore?id=' + this.sellerId
				})
			},
			toManage(){
				uni.navigateTo({
					url:'/pages/VIPCard/vipmanage'
				})
			}
		}
	}
</script>

<style lang="scss">
	.storeInfo{
		margin-top: 20rpx;
		display: flex;
		background-color: #fff;
		padding:30rpx 20rpx;
		image{
			width:120rpx;
			height:120rpx;
		}
		.rt{
			width:570rpx;
			margin-left: 20rpx;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.titlecontent{
					display: flex;
					align-items: center;
					image{
						width:24rpx;
						height:24rpx;
					}
					view{
						font-size:34rpx;
						color:rgba(60,60,60,1);
					}
				}
				image{
					width:41rpx;
					height:34rpx;
				}
			}
			.score{
				display: flex;
				align-items: center;
				text{
					color:#ff6600;
					margin-right: 10rpx;
				}
				image{
					width:25rpx;
					height:23rpx;
					margin-right: 10rpx;
				}
			}
			.address{
				display: flex;
				align-items: center;
				image{
					width:21rpx;
					height:25rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 180rpx;
		background-color: #FAFAFA;
		box-sizing: border-box;
		font-size: 26rpx;
		
		.item{
			display: flex;
			align-items: center;
			justify-content: center;
			height:104rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active,&:active{
				color: #FF6600;
				background-color: #fff;
				border-left: 6rpx solid #ff6600;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		// .tips{
		// 	line-height: 64rpx;
		// 	font-size: 24rpx;
		// 	font-weight: bold;
		// 	color: #666;
		// 	height: 64rpx;
		// 	position: fixed;
		// 	top: 44px;
		// 	right: 0;
		// 	width: 530rpx;
		// 	z-index: 10;
		// 	background-color: #fff;
		// 	padding-left: 10rpx;
		// }
		
		.title{
			line-height: 64rpx;
			position: relative;
			font-size: 24rpx;
			font-weight: bold;
			color: #666;
			height: 64rpx;
		}
		
		.item{
			margin-bottom: 20rpx;
		}
		
		.goods{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 20rpx;
			.content{
				height: 160rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			&>image{
				width: 160rpx;
				height: 160rpx;
				margin-right: 16rpx;
			}
			
			.goodsTitle{
				width:350rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.describe{
				font-size: 24rpx;
				color: #999;
			}
			
			.money{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.price{
					font-size: 34rpx;
					color: #FF6600;
				}
				image{
					width:36rpx;
					height:36rpx;
				}
			}
		}
	}
}
.nav{
	background-color: #fff;
	height:88rpx;
	position: relative;
	.backto{
		position: absolute;
		top:0;
		left:0;
		width:60rpx;
		height:100%;
		display: flex;
		align-items: center;
		image{
			margin-left: 20rpx;
			width:20rpx;
			height:34rpx;
		}
	}
	.title{
		position: absolute;
		top:27rpx;
		left:300rpx;
		font-size: 34rpx;
	}
	
		.one{
			position: absolute;
			left:610rpx;
			top:28rpx;
			width:42rpx;
			height:32rpx;
		}
		.two{
			position: absolute;
			left:692rpx;
			top:26rpx;
			width:38rpx;
			height:37rpx;
		}
	
	
}

</style>
