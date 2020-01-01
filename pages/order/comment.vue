<template>
	<view>
		
		<view class="top">
			<view class="imgInfo">
				<view class='img'>
					<image :src="data.image"></image>
				</view>
			</view>
			<view class='detail'>
				<view class='content'>{{data.title}}</view>
				<view class='size'>{{data.spec}}</view>
			</view>
		</view>
		
		<view class="middle">
			<view class="comment">
				<view class='title'>商品描述</view>
				<block v-for="(item,index) in starList" :key="index">
					<image :src="shopPoint>index?starOn:starOff" @tap="shopmark(index)"></image>
				</block>
				<view class="status">{{commentText[shopPoint-1]}}</view>
			</view>
			<view class="comment">
				<view class='title'>配送服务</view>
				<block v-for="(item,index) in starList" :key="index">
					<image :src="deliverPoint>index?starOn:starOff"  @tap="delivermark(index)"></image>
				</block>
				<view class="status">{{commentText[deliverPoint-1]}}</view>
			</view>
			<view class="comment">
				<view class='title'>商家态度</view>
				<block v-for="(item,index) in starList" :key="index">
					<image :src="attitudePoint>index?starOn:starOff"  @tap="attitudemark(index)"></image>
				</block>
				<view class="status">{{commentText[attitudePoint-1]}}</view>
			</view>
		</view>
		
		<view class="bottomComment">
			<textarea type="text" v-model="comment" placeholder="说说你的感受吧"/>
		</view>
		
		<view class="submit-button" @tap="confirm">确认发布</view>
		
	</view>
	
</template>

<script>
	import {OrderModel} from '@/common/models/order.js'
	let ordermodel = new OrderModel()
	export default {
			data() {
				return {
					data:'',
					starOff:'/static/cut/star_off.png',
					starOn:'/static/cut/star_on.png',
					starList:[0,1,2,3,4],
					commentText:['差','一般','好','很好','非常好'],
					shopPoint:3,
					deliverPoint:3,
					attitudePoint:3,
					comment:''
				}
			},
			methods: {
				shopmark(index){
					this.shopPoint = index + 1
				},
				delivermark(index){
					this.deliverPoint = index + 1
				},
				attitudemark(index){
					this.attitudePoint = index + 1
				},
				confirm(){
					let comList = {}
					comList.goodsId = this.data.goodsId
					comList.content = this.comment
					comList.goodScore = this.shopPoint
					comList.deliveryScore = this.deliverPoint
					comList.serviceScore = this.attitudePoint
					comList.spec = this.data.spec
					let array = []
					array.push(comList)
					array = JSON.stringify(array)
					let req = {}
					req.commentList = array
					req.goodsOrderId = this.data.goodsOrderId
					ordermodel.commentOrder(req,(data)=>{
						uni.navigateTo({
							url:'commented'
						})
					})
				}
			},
			onLoad(options){
				let jsondata = JSON.parse(options.data)
				this.data = jsondata
			}
		}
	
</script>

<style lang="scss">
	
page{
	background-color:#F2F2F2;
}

.top{
	background-color: #fff;
	width:100%;
	height:202rpx;
	border-top:2rpx solid #F2F2F2;
	display: flex;
	.imgInfo{
		width:161rpx;
		height:202rpx;
		.img{
			width:140rpx;
			height:140rpx;
			margin:31rpx 0 31rpx 21rpx;
			image{
				width:108rpx;
				height:108rpx;
				margin:17rpx 15rpx 16rpx 18rpx;
			}
		}
	}
	.detail{
		width:598rpx;
		height:202rpx;
		margin:31rpx 0 31rpx 21rpx;
		display:flex;
		flex-direction: column;
		.content{
			padding-top:8rpx;
			width:532rpx;
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
		}
		.size{
			// margin-top:20rpx;
			font-size:20rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(160,160,160,1);
		}
	}
}

.middle{
	padding:35rpx 0 35rpx 20rpx;
	width:750rpx;
	height:247rpx;
	margin-top:20rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.comment{
		display: flex;
		align-items: center;
		image{
			margin-left: 40rpx;
			width:38rpx;
			height:35rpx;
		}
		.status{
			margin-left: 40rpx;
		}
	}
}

.bottomComment{
	width:750rpx;
	height:247rpx;
	margin-top:20rpx;
	background-color: #fff;
	padding-top: 20rpx;
	textarea{
		margin-left: 20rpx;
		width:710rpx;
		height:200rpx;
	}
}
	
</style>
