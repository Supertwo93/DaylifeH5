<template>
	<view>
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true" @change="changeSwiper">
				<swiper-item v-for="(item,index) in picture" :key="index">
					<image class="swiper-img" :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<provide-title :price="data.price" :spec="'办理人数' + data.totalSale" :title="data.title"></provide-title>
		
		<view class="detail">
			<view class="title">详情</view>
			<view class="introduction">{{data.introduction}}</view>
		</view>
		
		<view class="store">
			<image class="storeImg" :src="storeData.logoPic"></image>
			<view class="storeName">
				<view>{{storeData.nickName}}</view>
				<image src="/static/cut/company_cer.png"></image>
			</view>
			<view class="stars">
				{{storeData.mainScore.toFixed(1)}}
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="storeData.mainScore>index?starSrc:''"></image>
				</block>
			</view>
			<view class="into" @tap="toStore()">进店看看</view>
			<image class="intoIcon" src="/static/cut/right_orange.png"></image>
		</view>
		
		<view class="bottomFix">
			<view class="collect" @tap="toCollect()">
				<image v-if="data.isCollect==0" src="/static/cut/no_collect.png"></image>
				<image v-else src="/static/cut/collected.png"></image>
				<view>收藏</view>
				<!-- {{data.isCollect==0?'':'取消'}} -->
			</view>
			<view class="contact">
				<image src="/static/cut/message.png"></image>
				<view>联系</view>
			</view>
			<view class="theme-button" @tap="toSign()">立即签约</view>
		</view>
		
		<uni-popup ref="popbottom" type="bottom">
			<view class="popBox">
				<view class="descri">
					<image :src="data.carPic"></image>
					<view class="content">
						<view class="vip_price">￥{{data.price}}</view>
						<view>配送至：龙岗区</view>
						<view>请选择属性</view>
					</view>
				</view>
				<view class="tips">请选择规格</view>
				<view class="labelBox">
					<view v-for="(item,index) in data.tbMemberCardHandleCtivities" :key="index" class="label" @tap="chooseLabel(index)" :class="labelIndex==index?'on':'' ">
						{{item.title}}
					</view>
				</view>
				<view class="signButton" @tap="confirmSign">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import provideTitle from '@/components/provide-title.vue'
import {VipModel} from '@/common/models/vip.js'
import {LikeModel} from '@/common/models/like.js'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
let vipmodel = new VipModel()
let likemodel = new LikeModel()

export default{
	data(){
		return{
			id: '',
			data:'',
			picture:[],
			storeData:'',
			starSrc:'/static/cut/star_on.png',
			starIndex:[0,1,2,3,4],
			labelIndex:0,
		}
	},
	components: {
		provideTitle,
		uniPopup
	},
	filters: {
		specFormat: function(value) {
			return JSON.parse(value).spec;
		},
		toFixed: function(x) {
			return parseFloat(x).toFixed(2);
		}
	},
	onLoad(options) {
		console.log(options)
		this.id = options.id;
		
		vipmodel.getSellerInfo({sellerId:options.sellerId},(data)=>{
			this.storeData = data
		})
	},
	onShow() {
		vipmodel.getCardDetail({id:this.id},(data)=>{
			console.log(data)
			this.data = data
			this.picture = data.picturesList.split(',')
			
			// likemodel.getoneCollectcard(this.data.id,(res)=>{
			// 	console.log(res);
			// 	if(res.isCollect == null){
			// 		res.isCollect = 0;
			// 	}
			// 	this.data.isCollect = res.isCollect
			// })
			console.log(this.data.isCollect);
		})
	},
	methods:{
		toCollect(){
			console.log(this.data.isCollect);
			
			if(this.data.isCollect == 0){
				likemodel.likeCard(this.data.id,(res)=>{
					console.log(res);
					// this.data.isCollect = 1;
					this.data.isCollect = 1;
				})
			}else{
				likemodel.deleteCard(this.data.id,(res)=>{
					// console.log(res);
					// this.data.isCollect = 0;
					this.data.isCollect = 0;
				})
			}
		},
		chooseLabel(index){
			this.labelIndex = index
		},
		changeSwiper(e) {
		    this.swiperCurrent = e.detail.current;
		},
		toSign(){
			if(this.data.cardType == 3){
				this.$refs.popbottom.open()
			}else{
				uni.navigateTo({
					url:'sign?type=' + this.data.cardType + '&price=' + this.data.price + '&id=' + this.data.id
				})
			}
		},
		confirmSign(){
			let handle_id = this.data.tbMemberCardHandleCtivities[this.labelIndex].id;
			let recharge_id = this.data.tbMemberCardRechargeCtivitieList[this.labelIndex].id;
			uni.navigateTo({
				url:'sign?type=' + this.data.cardType + '&price=' + this.data.price + '&id=' + this.data.id + '&index='+ recharge_id
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
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

.detail{
	background-color: #fff;
	margin: 20rpx 0;
	padding:0 20rpx;
	.title{
		height:64rpx;
		border-bottom: 1rpx solid #f2f2f2;
		display: flex;
		align-items: center;
	}
	.introduction{
		padding:30rpx 0;
	}
}

.store{
	width:100%;
	height:160rpx;
	position: relative;
	background-color: #fff;
	margin-bottom: 20rpx;
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
		color:#FF6600;
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


.bottomFix{
	position: fixed;
	bottom:0;
	width:100%;
	background-color: #fff;
	bottom:0;
	height:110rpx;
	display: flex;
	align-items: center;
	.collect{
		width:45rpx;
		margin-left: 34rpx;
		image{
			width:42rpx;
			height:35rpx;
		}
		view{
			font-size:22rpx;
			color:rgba(120,120,120,1);
		}
	}
	.contact{
		margin-left: 57rpx;
		width:45rpx;
		image{
			width:38rpx;
			height:38rpx;
		}
		view{
			font-size:22rpx;
			color:rgba(255,102,0,1);
		}
	}
	.theme-button{
		margin-left: 59rpx;
		height:70rpx;
		width:500rpx;
		
	}
}

.popBox{
	padding:20rpx;
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
.vip_price{
	color: #FF6600;
	font-size: 26rpx;
}
</style>
