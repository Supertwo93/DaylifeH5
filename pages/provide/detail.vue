<template>
	<view>
		<view class="common_navigation">
			<image src="/static/cut/leftIcon.png" class="back_icon" @tap="toBack()"></image>
			<view>提供详情</view>
			<view class="mul_icon_box" @tap="toCollect()">
				<image v-if="data.goods.isCollect==0" class="collect_icon" src="/static/cut/no_collect.png"></image>
				<image v-else src="/static/cut/collected.png" class="collect_icon" ></image>
			</view>
		</view>
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true">
				<swiper-item v-for="(item,index) in pic" :key="index">
					<image class="swiper-img" :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<provide-title :price="data.goods.price" :title="data.goods.goodsName" 
		:sale="'月售' + data.goods.monthSale" :spec="'配送费￥'+data.goods.postFee"
		disc="km"></provide-title>
		<view class="spec" @tap="chooseSpec">
			<view class="gray">规格</view>
			<view class="choose">{{speced}}</view>
			<image src="/static/cut/grayright.png"></image>
		</view>
		<view class="comment">
			<view class="top">
				<view class="title">商品评价({{comment.length}})</view>
				<view class="all" @tap="toComment">
					<view>查看全部</view>
					<image src="/static/cut/right_orange.png"></image>
				</view>
			</view>
			<block v-if="comment.length==0">
				<view class="noComment">该商品暂无评价</view>
			</block>
			<block v-if="comment.length!=0">
				<comment-box :row="comment[0]" :button="true"></comment-box>
			</block>
		</view>
		<view class="store">
			<image class="storeImg" :src="sellerdata.logoPic"></image>
			<view class="storeName">
				<view>{{sellerdata.nickName}}</view>
				<image src="/static/cut/company_cer.png"></image>
			</view>
			<view class="stars">
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="sellerdata.mainScore>index?starSrc:''"></image>
				</block>
				{{sellerdata.mainScore}}
			</view>
			<view class="into" @tap="toStore()">进店看看</view>
			<image class="intoIcon" src="/static/cut/right_orange.png"></image>
		</view>
		
		<view v-if="type==8||type==10" class="bottomFix">
			
			<view class="contact">
				<image src="/static/cut/message.png"></image>
				<view>联系TA</view>
			</view>
			<view class="add_car_button" @tap="addCar">
				加入购物车
			</view>
			<view class="theme-button" @tap="chooseSpec">立即下单</view>
		</view>
		
		<view v-if="type==3||type==9" class="longwidth bottomFix">
			<view class="add_car_button" @tap="addCar">
				加入购物车
			</view>
			<view class="theme-button" @tap="chooseSpec">立即下单</view>
		</view>
		
		<uni-popup ref="popbottom" type="bottom">
			<view class="popBox">
				<view class="descri">
					<image :src="data.itemList[labelIndex].image"></image>
					<view class="content">
						<view>{{data.itemList[labelIndex].price}}</view>
						<view>配送至：龙岗区</view>
					</view>
				</view>
				<view class="tips">请选择规格</view>
				<view class="labelBox">
					<view v-for="(item,index) in data.itemList" :key="index" class="label" @tap="chooseLabel(index)" :class="labelIndex==index?'on':'' ">
						{{item.spec}}
					</view>
				</view>
				<view v-if="type!=3" class="number">
					<view class="describ">购买数量</view>
					<view>
						<image class="sub" src="/static/cut/sub_click.png" @tap="sub"></image>
						<input v-model="number"/>
						<image class="add" src="/static/cut/add_click.png" @tap="add"></image>
					</view>
				</view>
				<view class="signButton" @tap="confirmSign">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import commentBox from '@/components/commentBox.vue'
import provideTitle from '@/components/provide-title.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {ProvideModel} from '@/common/models/provide.js'
const providemodel = new ProvideModel()
import {GoodsModel} from '@/common/models/goods.js'
const goodsmodel = new GoodsModel()
import {StoreModel} from '@/common/models/store.js'
const storemodel = new StoreModel()
import {LikeModel} from '@/common/models/like.js'
const likemodel = new LikeModel()
import {OrderModel} from '@/common/models/order.js'
const ordermodel = new OrderModel()
export default{
	components: {
		provideTitle,
		uniPopup,
		commentBox
	},
	data(){
		return{
			type:'',
			data:'',
			id:'',
			skuId: '',
			pic:[],
			sellerId:'',
			sellerdata:'',
			starSrc:'/static/cut/star_on.png',
			starOn:'/static/cut/star_on.png',
			starOff:'/static/cut/star_off.png',
			starIndex:[0,1,2,3,4],
			labelIndex:0,
			spec:[],
			number:1,
			speced:'请选择',
			comment:[],
			commentNum:0
		}
	},
	onLoad(options){
		this.type = options.type
		this.id = options.id
		storemodel.getSellerInfo({sellerId:options.sellerId},(data)=>{
			this.sellerdata = data
		})
		ordermodel.queryGoodsComment({goodsId:options.id},(data)=>{
			this.comment = data.goodCommentList
		})
	},
	onShow() {
		providemodel.getItemDetail({goodsId:this.id},(data)=>{
			this.data = data
			this.skuId = data.goods.defaultItemId;
			let image = data.goodsDesc.itemImages
			image = image.split(',')
			this.pic = image
		})
		
	},
	methods:{
	    toBack(){
			uni.navigateBack({
				delta: 1
			})
	   },
		toCollect(){
			if(this.data.goods.isCollect == 0){
				this.data.goods.isCollect = 1;
			}else{
				this.data.goods.isCollect = 0;
			}
			likemodel.like(this.data.goods.id,this.type,this.data.goods.isCollect,(data)=>{
				// likemodel.getCollectgood(1,(res)=>{
					
				// })
			})
		},
		chooseSpec(){
			this.$refs.popbottom.open()
		},
		chooseLabel(index){
			this.labelIndex = index
		},
		confirmSign(){
			let req = {goodsItemId:this.data.itemList[this.labelIndex].goodsItemId,num:this.number}
			providemodel.addOneTotal(req,(data)=>{
				console.log(data)
				uni.navigateTo({
					url:'/pages/order/confirmation?data=' + JSON.stringify(data) + '&type=' + 0
				})
			})
			// uni.navigateTo({
			// 	url:'sign?data=' + JSON.stringify(this.data) + '&index=' + this.labelIndex 
			// })
		},
		toStore(){
			uni.navigateTo({
				url:`/pages/shop/theStore?sellerId=${this.sellerdata.sellerId}&type=${this.type}`
			})
		},	
		sub(){
			if(this.number == 1){
				this.number = this.number
			}else{
				this.number -= 1
			}
		},
		add(){
			this.number += 1 
		},
		toComment(){
			uni.navigateTo({
				url:'goodsComment?data=' + JSON.stringify(this.comment)
			})
		},
		addCar(){
			console.log(this.skuId,this.number);
			providemodel.addCart({goodsItemId:this.skuId,num:this.number},(data)=>{
				uni.showToast({
					title:"添加购物车成功",
					duration:1500,
					icon:'none'
				})
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom: 110rpx;
}

.longwidth{
	.theme-button{
		width: 470rpx;
	}
}
.carousel-section{
	swiper{
		width:750rpx;
		height:500rpx;
		image{
			width:750rpx;
			height:500rpx;
		}
	}
}

.spec{
	background-color: #fff;
	margin:20rpx 0;
	height:84rpx;
	display: flex;
	align-items: center;
	image{
		width:10rpx;
		height:20rpx;
	}
	.gray{
		margin-left: 20rpx;
	}
	.choose{
		margin-left: 30rpx;
	}
	image{
		margin-left: 540rpx;
	}
}
.comment{
	background-color: #fff;
	.top{
		padding:0 20rpx;
		height:84rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		.all{
			display: flex;
			align-items: center;
			view{
				color:#FF6600;
			}
			image{
				margin-left: 10rpx;
				width:10rpx;
				height:20rpx;
			}
		}
	}
	.noComment{
		height:256rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#A0A0A0;
	}
}

.store{
	width:100%;
	height:160rpx;
	position: relative;
	background-color: #fff;
	margin:20rpx 0;
	.storeImg{
		position: absolute;
		top:30rpx;
		left:20rpx;
		width:100rpx;
		height:100rpx;
	}
	.storeName{
		position: absolute;
		top:36rpx;
		left:142rpx;
		display: flex;
		align-items: center;
		view{
			font-size:34rpx;
			font-weight:500;
			color:rgba(60,60,60,1);
		}
		image{
			width:24rpx;
			height:24rpx;
		}
	}
	.stars{
		position: absolute;
		top:100rpx;
		left:142rpx;
		image{
			width:25rpx;
			height:23rpx;
		}
	}
	.into{
		position: absolute;
		top:108rpx;
		right:40rpx;
		color:#FF6600;
		font-size:24rpx;
	}
	.intoIcon{
		position: absolute;
		top:115rpx;
		right:20rpx;
		width:10rpx;
		height:19rpx;
	}
}

.popBox{
	padding:20rpx;
	padding-bottom:110rpx;
	.descri{
		display: flex;
		height:200rpx;
		.content{
			margin-top: 84rpx;
		}
		image{
			margin-right: 15rpx;
			width:200rpx;
			height:200rpx;
			border-radius:10rpx;
		}
		.icon{
			margin-left: 200rpx;
			width:32rpx;
			height:32rpx;
		}
	}
	.tips{
		margin-top: 50rpx;
	}
	.labelBox{
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.label{
			height:54rpx;
			padding:0 15rpx;
			border:1px solid rgba(180,180,180,1);
			border-radius:8rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
		}
		.on{
			border:1px solid rgba(255,102,0,1);
			color:#ff6600;
		}
	}
	.number{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		view{
			display: flex;
			align-items: center;
			image{
				width:50rpx;
				height:50rpx;
			}
			input{
				width:120rpx;
				height:50rpx;
				text-align: center;
				border:1rpx solid #f2f2f2;
			}
			.sub{
				margin-right: 10rpx;
			}
			.add{
				margin-right: 10rpx;
			}
		}
	}
	.signButton{
		margin-top: 30rpx;
		height:70rpx;
		width:650rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;;
	}
}
</style>
