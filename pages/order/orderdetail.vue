<template>
	<view>
		<view class="types">
			<block v-if="orderList.type=='unpaid'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='unreceived'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='received'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='servicing'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='uncomment'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='comment'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='serviced'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='waiting'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='finished'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
			<block v-if="orderList.type=='housefinished'"><image :src="iconPath[orderList.type]"></image><view class="default">{{typeText[orderList.type]}}</view></block>
		</view>
		
		<view class="location" v-if="orderList.firsttypeId!=1&&orderList.firsttypeId!=5">
			<image src='../../static/cut/address_on.png'></image>
			<view class="address">{{orderList.receiverAreaName}}</view>
			<view class="username">{{orderList.receiver}}</view>
			<view class="phone">{{orderList.receiverMobile}}</view>
		</view>
		
		<view class="goodsDetail">
			<view v-if="orderList.firsttypeId==8||orderList.firsttypeId==10||orderList.firsttypeId==3||orderList.firsttypeId==9" class="type">
				<store-title :title="orderList.sellerNickName"></store-title>
				<block v-for="(row,number) in orderList.goodsOrderItemList" :key="number">
					<store-main :pic="row.picPath" :title="row.title" :price="'￥'+row.price"
					:specsize="row.spec" :spec="'×' + row.num"></store-main>
				</block>
				<view class="deliverMoney">
					<view class="deliverTitle">配送费</view>
					<view class="money">￥{{orderList.postFee}}</view>
				</view>
				<view class="total">合计:￥{{orderList.payment}}</view>
			</view>
			<view v-if="orderList.firsttypeId==1" class="type">
				<store-title :title="orderList.nickName"></store-title>
				<store-main :pic="orderList.picture" :title="orderList.title" :specsize="orderList.paymentMethod">
					<view class="fee">
						<view class="feename">押金</view>
						<view class="feenum">￥{{orderList.deposit}}</view>
					</view>
					<view class="fee">
						<view class="feename">租金</view>
						<view class="feenum">￥{{orderList.rental}}</view>
					</view>
					<view class="fee">
						<view class="feename">服务费</view>
						<view class="feenum">￥{{orderList.serviceCharge}}</view>
					</view>
				</store-main>
				<view class="sum">合计:￥{{orderList.sum}}</view>
			</view>
			<view v-if="orderList.firsttypeId==5" class="type">
				<store-title :title="orderList.nickName"></store-title>
				<store-main :pic="orderList.picture" :title="orderList.title" :specsize="orderList.specsName">
				</store-main>
			</view>
			
		</view>
		
		<view class="titleInfo">订单信息</view>
		
		<view class="info">
			<view v-if="typeid!=1&&typeid!=5" class="for">
				<view class="infoTitle">订单编号 {{orderList.orderId}}</view>
			</view>
			<view v-if="typeid!=1&&typeid!=5" class="for">
				<view class="infoTitle">创建时间 {{orderList.createTime}}</view>
			</view>
			<view class="for" v-if='index>2'>
				<view class="infoTitle">付款时间 {{orderList.paymentTime}}</view>
			</view>
			<view class="for" v-if="index==4">
				<view class="infoTitle">接单时间 {{orderList.receiptTime}}</view>
			</view>
<!-- 			<view class="for" v-if="index==4">
				<view class="infoTitle">服务开始 12145464654142</view>
				<view v-if="row.type=='orderNumber'" class="copy">复制</view>
			</view>
			<view class="for" v-if="index==4">
				<view class="infoTitle">确认完成 12145464654142</view>
				<view v-if="row.type=='orderNumber'" class="copy">复制</view>
			</view> -->
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
		
		<view class="button">
			<block v-if="orderList.type=='unpaid'"><view class="default" @tap="cancelUnpaidOrder(item)">取消订单</view><view class="pay" @tap="toPayment(item)">去付款</view></block>
			<block v-if="orderList.type=='unreceived'"><view class="default" @tap="drawBack(item)">退款</view></block>
			<block v-if="orderList.type=='received'"><view class="default" @tap="drawBack(item)">退款</view></block>
			<block v-if="orderList.type=='servicing'"><view class="pay">确认完成</view></block>
			<block v-if="orderList.type=='uncomment'"><view class="default" @tap="applyService(item)">申请售后</view><view @tap="goRating(item)" class="pay">去评价</view></block>
			<block v-if="orderList.type=='comment'"><view @tap="applyService(item)" class="pay">申请售后</view></block>
			<block v-if="orderList.type=='serviced'"><view @tap="cancelApply(item)" class="pay">取消申请</view></block>
			<block v-if="orderList.type=='waiting'"><view class="default">联系TA</view></block>
			<block v-if="orderList.type=='housefinished'"><view class="default">联系TA</view></block>
			<block v-if="orderList.type=='finished'"><view @tap="applyService(item)" class="default">申请售后</view></block>
			
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
				index:'',
				typeid:'',
				typeText:{
					unpaid:'等待买家付款...',
					unreceived:'等待商家接单',
					received:'商家已接单',
					servicing:'服务中',
					uncomment:'交易完成',
					comment:'交易完成',
					serviced:'退款售后',
					waiting:'等待商家签约',
					finished:'交易完成',
					housefinished:'交易完成'
				},
				iconPath:{
					unpaid:'/static/cut/order_waiting.png',
					unreceived:'/static/cut/order_unreceived.png',
					waiting:'/static/cut/order_unreceived.png',
					received:'/static/cut/order_received.png',
					servicing:'/static/cut/order_service.png',
					uncomment:'/static/cut/order_finish.png',
					comment:'/static/cut/order_finish.png',
					serviced:'/static/cut/order_finish.png',
					finished:'/static/cut/order_ok.png',
					housefinished:'/static/cut/order_ok.png'
				},
				orderList:{ type:"unpaid",img: '/static/goods/p1.jpg', adress:"广东省深圳市龙岗区龙翔大道9002号志联佳大厦508",username:'唐笑笑',phone:'13751157436',name: '清风原木纯品纸巾三层360抽 买三送一 限时抢购', price: '168.00',payment:168.00,freight:12,spec:'规格:S码',number:2 ,store:'清风纸巾售卖店',deil:"5",message:'要红色的这个'},
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
			this.typeid = options.typeid
			if(options.typeid==8||options.typeid==10||options.typeid==3||options.typeid==9){
				this.index = options.index
				this.item = JSON.parse(options.item)
				ordermodel.getOrderDetail({id:options.id,type:1,firstTypeId:8},(data)=>{
					this.orderList = data
					if(this.orderList.status==1){
						this.orderList.type = "unpaid"
					}else if(this.orderList.status==5&&this.orderList.viceStatus==502){
						this.orderList.type = "servicing"
					}else if(this.orderList.status==7){
						this.orderList.type = "finished"
					}else if(this.orderList.status==5&&this.orderList.viceStatus==33){
						this.orderList.type = 'received'
					}else if(this.orderList.status==5&&this.orderList.viceStatus==210){
						this.orderList.type = "unreceived"
					}else if(this.orderList.status==6){
						this.orderList.type = "uncomment"
					}
				})
			}else if(options.typeid==1||options.typeid==5){
				let jsondata = JSON.parse(options.data)
				this.orderList = jsondata
				this.orderList.picture = this.orderList.picture.split(',')[0]
				if(this.orderList.userOrderStatus==3){
					this.orderList.type = "waiting"
				}
			}	
			
		},
		onShow(){
			
		},
		methods:{
			cancelUnpaidOrder(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.cancelUnpaidOrder(item)
			},
			toPayment(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.toPayment(item)
			},
			drawBack(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.drawBack(item)
			},
			applyService(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.applyService(item)
			},
			goRating(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.goRating(item)
			},
			cancelApply(item){
				const pages = getCurrentPages()
				const beforePage = pages[pages.length-2]
				beforePage.$vm.cancelApply(item)
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

.location{
	width:100%;
	height:180rpx;
	background-color: #fff;
	margin-top:19rpx;
	position:relative;
	image{
		width:50rpx;
		height:60rpx;
		position:absolute;
		top:60rpx;
		bottom:60rpx;
		left:20rpx;
	}
	.address{
		width:604rpx;
		height:65rpx;
		position:absolute;
		top:37rpx;
		bottom:78rpx;
		right:44rpx;
		left:102rpx;
		font-size:30rpx;
		font-weight:400;
		color:rgba(100,100,100,1);
		line-height:36rpx;
	}
	.username{
		width:74rpx;
		height:24rpx;
		position:absolute;
		top:120rpx;
		left:102rpx;
		font-size:24rpx;
		font-weight:400;
		color:rgba(60,60,60,1);
		line-height:36rpx;
	}
	.phone{
		width:154rpx;
		height:18rpx;
		position:absolute;
		top:123rpx;
		left:202rpx;
		font-size:24rpx;
		font-weight:400;
		color:rgba(160,160,160,1);
		line-height:36rpx;
	}
}

.type{
	padding:0 20rpx 20rpx 20rpx;
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
