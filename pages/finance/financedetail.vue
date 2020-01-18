<template>
	<view>
		<view class="common_navigation">
			<image src="/static/cut/leftIcon.png" class="back_icon" @tap="toBack()"></image>
			<view>提供详情</view>
			<view class="mul_icon_box" @tap="toCollect()">
				
				<image v-if="data.isCollect==0" class="collect_icon" src="/static/cut/no_collect.png"></image>
				<image v-else src="/static/cut/collected.png" class="collect_icon" ></image>
			</view>
		</view>
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true">
				<swiper-item v-for="(item,index) in picture" :key="index">
					<image class="swiper-img" :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<provide-title :price="data.price" :title="data.title" disc="km"></provide-title>
		
		<view v-if="data.secondTypeId =='6364df4f0ede49da9063b6cc5d4dfc72' " class="choose" @tap="toSign">
			<view class="title">类型</view>
			<view class="tips">请选择</view>
			<image src="/static/cut/grayright.png"></image>
		</view>
		
		<view v-if="data.secondTypeId =='6364df4f0ede49da9063b6cc5d4dfc72'" class="range">
			<view class="title">委托业务范围</view>
			<view class="label gray">
				<view>业务名称</view>
				<view>收费标准</view>
			</view>
			<view v-for="(item,index) in data.rangeList" :key="index" class="label">
				<view>{{item.rangeName}}</view>
				<view>{{item.rangePrice}}</view>
			</view>
		</view>
		
		<view class="detail">
			<view class="title">业务详情</view>
			<view class="content">{{data.details}}</view>
		</view>
		
		<view class="store">
			<image class="storeImg" :src="storeInfo.logoPic"></image>
			<view class="storeName">
				<view>{{storeInfo.nickName}}</view>
				<image src="/static/cut/company_cer.png"></image>
			</view>
			<view class="stars">
				{{storeInfo.mainScore}}
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="storeInfo.mainScore>index?starSrc:''"></image>
				</block>
			</view>
			<view class="into" @tap="toStore()">进店看看</view>
			<image class="intoIcon" src="/static/cut/right_orange.png"></image>
		</view>
		
		<view class="bottomFix">
			<view class="contact">
				<image src="/static/cut/message.png"></image>
				<view>联系</view>
			</view>
			<view class="theme-button" @tap="toSign">立即签约</view>
		</view>
		
		<uni-popup ref="popbottom" type="bottom">
			<view v-if="data.secondTypeId=='6364df4f0ede49da9063b6cc5d4dfc72'" class="popBox">
				<view class="descri">
					<image :src="data.specsList[labelIndex].specsPicture"></image>
					<view class="content">
						<view>{{data.specsList[labelIndex].specsPrice}}</view>
						<view>配送至：龙岗区</view>
					</view>
				</view>
				<view class="tips">请选择类型</view>
				<view class="labelBox">
					<view v-for="(item,index) in data.specsList" :key="index" class="label" @tap="chooseLabel(index)" :class="labelIndex==index?'on':'' ">
						{{item.specsName}}
					</view>
				</view>
				<view class="signButton" @tap="confirmSign">确定</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
import provideTitle from '@/components/provide-title.vue'
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import {FinanceModel} from '@/common/models/finance.js'
import {StoreModel} from '@/common/models/store.js'
import {LikeModel} from '@/common/models/like.js'
const likemodel = new LikeModel()
let storemodel = new StoreModel()
let financemodel = new FinanceModel()
export default{
	components:{
		provideTitle,
		uniPopup
	},
	data(){
		return{
			starSrc:'/static/cut/star_on.png',
			picture:'',
			data:'',
			sellerId:'',
			storeInfo:'',
			starIndex:[0,1,2,3,4],
			labelIndex:0
		}
	},
	onLoad(options){
		console.log(options)
		let req = {id:options.financeId,financeCode:options.code,sellerId:options.sellerId}
		financemodel.getFinanceDetail(req,(data)=>{
			this.picture = data.picture.split(',')
			this.data = data
			console.log(data)
		})
		this.sellerId = options.sellerId
		let storeReq = {sellerId:options.sellerId}
		storemodel.getSellerInfo(storeReq,(data)=>{
			this.storeInfo = data
		})
	},
	methods:{
		toCollect(){
			if(this.data.isCollect == 0){
				this.data.isCollect = 1
				uni.showToast({
					title:'收藏成功',
					icon:'none',
					duration:1500
				})
			}else{
				this.data.isCollect = 0
				uni.showToast({
					title:'取消收藏成功',
					icon:'none',
					duration:1500
				})
			}
			likemodel.like(this.data.id,this.data.firstTypeId,this.data.isCollect,(data)=>{
				
			})
		},
		toBack(){
			uni.navigateBack({
				delta: 1
			})
		},
		toStore(){
			uni.navigateTo({
				url:`/pages/shop/theStore?sellerId=${this.sellerId}&type=5`
			})
		},
		toSign(){
			if(this.data.secondTypeId=='6364df4f0ede49da9063b6cc5d4dfc72'){
				this.$refs.popbottom.open()
			}else{
				uni.navigateTo({
					url:`/pages/finance/appointment?data=${JSON.stringify(this.data)}`
				})
			}
		},
		confirmSign(){
			console.log(this.data.specsList[this.labelIndex].specsName)
			uni.navigateTo({
				url:'sign?data=' + JSON.stringify(this.data) + '&index=' + this.labelIndex 
			})
		},
		popClose(){
			this.$refs.popbottom.close()
		},
		chooseLabel(index){
			this.labelIndex = index	
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom:110rpx;
}

.bottomFix{
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

.choose{
	margin:20rpx 0;
	height:84rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	.title{
		color:rgba(160,160,160,1);
		margin-left: 20rpx;
	}
	.tips{
		margin-left: 30rpx;
	}
	image{
		margin-left: 550rpx;
		width:10rpx;
		height:20rpx;
	}
}
.range{
	padding:20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	.title{
		height:50rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		color:rgba(120,120,120,1);
	}
	.label{
		width:710rpx;
		height:50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

.detail{
	padding:20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	.title{
		height:50rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		color:rgba(120,120,120,1);
	}
	.content{
		margin-top:20rpx;
	}
}

.popBox{
	height:740rpx;
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
		height:70rpx;
		width:650rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 200rpx;
		background: linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;;
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
</style>
