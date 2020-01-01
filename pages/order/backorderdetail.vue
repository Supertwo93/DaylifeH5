<template>
	<view>
		<view class="types">
			<block v-if="backData.status==1"><image src="/static/cut/order_back.png"></image><view class="default">等待商家处理</view></block>
			<block v-if="backData.status==2||backData.status==4"><image src="/static/cut/order_ok.png"></image><view class="default">售后完成</view></block>
			<block v-if="backData.status==3"><image src="/static/cut/order_refuse.png"></image><view class="default">商家拒绝售后申请</view></block>
		</view>
		

		<view class="location">
			<view class="imageContain">
				<image src='../../static/cut/address_on.png'></image>
			</view>
			<view class="info">
				<view class="address">{{orderData.receiverAreaName}}</view>
				<view class="userInfo">
					<view class="username">{{orderData.receiver}}</view>
					<view class="phone gray">{{orderData.receiverMobile}}</view>
				</view>
			</view>
		</view>
		
		<view class="backInfo">
			<view class="grid">
				<view class="title">申请原因</view>
				<view class="content">{{backData.applyReason}}</view>
			</view>
			<view class="grid">
				<view class="title">售后方式</view>
				<view class="content">{{backData.applyMode}}</view>
			</view>
			<view class="grid">
				<view class="title">申请备注</view>
				<view class="content">{{backData.applyExplain}}</view>
			</view>
		</view>
		
		<view class="graytitle">相关凭证</view>
		<view class="photoContainer">
			<block v-for="(item,index) in applyPhoto" :key="index">
				<image :src="item" class="photo"></image>
			</block>
		</view>
		
		<view class="goodsDetail">
			<view class="type">
				<store-title :title="orderData.sellerNickName"></store-title>
				<block v-for="(row,number) in orderData.goodsOrderItemList" :key="number">
					<store-main :pic="row.picPath" :title="row.title" :price="'￥'+row.price"
					:specsize="row.spec" :spec="'×' + row.num"></store-main>
				</block>
				<view class="deliverMoney">
					<view class="deliverTitle">配送费</view>
					<view class="money">￥{{orderData.postFee}}</view>
				</view>
				<view class="total">合计:￥{{orderData.payment}}</view>
			</view>
		</view>
		
		<view class="titleInfo">订单信息</view>
		
		<view class="info">
			<view class="for">
				<view class="infoTitle">订单编号 {{orderData.orderId}}</view>
				<view @tap="copy" class="copy">复制</view>
			</view>
			<view class="for">
				<view class="infoTitle">创建时间 {{orderData.createTime}}</view>
			</view>
			<view class="for">
				<view class="infoTitle">付款时间 {{orderData.paymentTime}}</view>
			</view>
			<view class="for">
				<view class="infoTitle">接单时间 {{orderData.receiptTime}}</view>
			</view>
			<view class='contact'>
				<view class='showMessage'>
					<image src="../../static/cut/message.png"></image>
					<view>联系TA</view>
				</view>
				<view class="tel">
					<image src="../../static/cut/phone_icon.png"></image>
					<view>拨打电话</view>
				</view>
			</view>
		</view>
		
		<view v-if="backData.status==1||backData.status==3" class="button">
			<block v-if="backData.status==1"><view class="default" @tap="cancelApply(item)">取消申请</view></block>
			<block v-if="backData.status==3"><view class="default" @tap="applyService(item)">申请售后</view></block>
		</view>
	</view>
</template>

<script>
	import {OrderModel} from '@/common/models/order.js'
	const ordermodel = new OrderModel()
	import storeTitle from '@/components/orderbox/store-title.vue'
	import storeMain from '@/components/orderbox/store-main.vue'
	import storeTime from '@/components/orderbox/store-time.vue'
	export default{
		components: {
			storeTitle,
			storeMain,
			storeTime
		},
		data(){
			return{
				item:'',
				typeText:{
					unpaid:'等待买家付款...',
					unreceived:'等待商家接单',
					received:'商家已接单',
					servicing:'服务中',
					uncomment:'交易完成',
					comment:'交易完成',
					serviced:'退款售后',
					waiting:'等待商家签约'
				},
				iconPath:{
					unpaid:'/static/cut/order_waiting.png',
					unreceived:'/static/cut/order_unreceived.png',
					waiting:'/static/cut/order_unreceived.png',
					received:'/static/cut/order_received.png',
					servicing:'/static/cut/order_service.png',
					uncomment:'/static/cut/order_finish.png',
					comment:'/static/cut/order_finish.png',
					serviced:'/static/cut/order_finish.png'
				},
				orderData:'',
				backData:'',
				applyPhoto:'',
				payInfo:[
					{type:'orderNumber',number:'282113103903184024'},
					{type:'createTime',number:'2019-03-14 16:08:00'},
					{type:'payTime',number:'2019-03-14 16:10:00'},
					{type:'receivedTime',number:'2019-03-14 16:16:00'}
				],
				payInfoTitle:{
					orderNumber:'订单编号:',
					createTime:'创建时间:',
					payTime:'付款时间:',
					receivedTime:'接单时间:'
				}
						
			}
		},
		onLoad(options){
			
			this.item = JSON.parse(options.item)
			if(this.firsttypeId!=1&&this.firsttypeId!=5){
				ordermodel.getBackOrderDetail({id:options.id},(data)=>{
					this.backData = data
					this.applyPhoto = data.applyPhotoList.split(',')
				})
				ordermodel.getOrderDetail({type:1,firstTypeId:8,id:options.orderId},(data)=>{
					this.orderData = data
				})
			}
		},
		onShow(){
			
		},
		methods:{
			copy(){
				uni.setClipboardData({
					data:this.orderData.orderId,
					success(){
						uni.showToast({
							title:'复制成功',
							icon:'none',
							duration:1500
						})
					}
				})
			},
			cancelApply(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.cancelApply(item.id)
			},
			applyService(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.applyService(item)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.types{
	width:750rpx;
	height:140rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	position:relative;
	image{
		width:48rpx;
		height:48rpx;
		position:absolute;
		top:46rpx;
		bottom:46rpx;
		left:20rpx;
	}
	.default{
		position: absolute;
		height:29rpx;
		top:50rpx;
		bottom:55rpx;
		left:88rpx;
		font-size:30rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
}

.backInfo{
	margin-top: 20rpx;
	background-color: #fff;
	.grid{
		padding:0 20rpx;
		height:84rpx;
		display: flex;
		align-items: center;
		justify-content: space-between
	}
}

.location{
	background-color: #fff;
	height:180rpx;
	margin: 20rpx 0;
	padding:30rpx 0;
	display: flex;
	.imageContain{
		width:102rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width:51rpx;
			height:60rpx;
		}
	}
	.info{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
		.userInfo{
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			.phone{
				margin-left: 10rpx;
			}
		}
	}
}

.photoContainer{
	margin-bottom: 20rpx;
	background-color: #fff;
	height:260rpx;
	padding:30rpx 20rpx;
	display: flex;
	justify-content: space-between;
	.photo{
		width:200rpx;
		height:200rpx;
		border-radius:10rpx;
	}
}

.type{
	padding:0 20rpx;
	background-color: #fff;
}
.deliverMoney{
	display: flex;
	justify-content: space-between;
	margin-top: 20rpx;
}
.total{
	display: flex;
	justify-content: flex-end;
	margin-top: 20rpx;
}

.titleInfo{
	height:62rpx;
	font-size:24rpx;
	font-weight:400;
	color:rgba(160,160,160,1);
	padding-top:19rpx;
	padding-left:20rpx;
}
.info{
	background-color: #fff;
	.for{
		display: flex;
		height:84rpx;
		align-items: center;
		justify-content: space-between;
		border-bottom:1rpx solid #f2f2f2;
		font-weight:400;
		color:rgba(60,60,60,1);
		.infoTitle{
			margin-left:20rpx;
			margin-right:20rpx;
		}
		.infoNumber{
			
		}
		.copy{
			margin-right:20rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(255,102,0,1);
		}
	}
	.contact{
		height:84rpx;
		display: flex;
		.showMessage{
			display: flex;
			align-items: center;
			justify-content: center;
			width:50%;
			image{
				width:28rpx;
				height:28rpx;
			}
		}
		.tel{
			border-left:1rpx solid #f2f2f2;
			display: flex;
			align-items: center;
			justify-content: center;
			width:50%;
			image{
				width:28rpx;
				height:28rpx;
			}
		}
	}
}

.button{
	background-color: #fff;
	height:100rpx;
	margin-top:20rpx;
	display:flex;
	justify-content: flex-end;
	align-items:center;
	padding-right:20rpx;
	view{
		min-width: 160rpx;
		height: 60rpx;
		border-radius:10px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
	.default{
		border: solid 1upx #ccc;
		color: #666;
	}
	.pay{
		border: solid 1upx #ec652f;
		color: #ec652f;
	}
	
}
.fee{
	display: flex;
	justify-content: space-between;
	margin-bottom:10rpx;
	align-items: center;
}
.sum{
	background-color: #fff;
	height:60rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size:28rpx;
	color:rgba(60,60,60,1);
}
</style>
