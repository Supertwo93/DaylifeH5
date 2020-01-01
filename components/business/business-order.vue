<template name="businessOrder">
	<view class="box">
		<view class="top">
			<view class="lf">
				<image src="/static/cut/user/billicon.png"></image>
				<view class="ordercode">{{orderNum}}</view>
			</view>
			<view class="rt">{{createTime}}</view>
		</view>
		
		<view v-if="id!=1&&id!=5" class="lifeMiddle">
			<block v-for="(item,index) in goodsItemList" :key="index">
				<view class="item">
					<image :src="item.picPath"></image>
					<view class="list">
						<view class="title">
							<view class="name">{{item.title}}</view>
							<view class="content">￥{{item.price}}</view>
						</view>
						<view class="title">
							<view class="spec">{{item.spec}}</view>
							<view class="content">×{{item.num}}</view>
						</view>
					</view>
				</view>
			</block>
			<view class="delivery">
				<view class="title">配送费(运费)</view>
				<view>{{deliver}}</view>
			</view>
		</view>
		
		<view v-if="id==1||id==5" class="houseMiddle">
			<image :src="pic"></image>
			<view class="list">
				<view class="title">
					<view class="name">{{title}}</view>
					<view class="content">{{price}}</view>
				</view>
				<view v-if="id==1" class="title">
					<view class="spec">{{spec}}</view>
				</view>
				<view v-if="id==5&&status=='agentWaitingDeal'" class="title">
					<view class="spec">{{spec}}</view>
				</view>
				<view v-if="id==5&&status=='agentWaitingDealed'" class="title">
					<view class="spec">{{spec}}</view>
				</view>
				<view v-if="id==5&&status=='agentWaitingFinish'" class="title">
					<view class="spec">{{spec}}</view>
				</view>
				<view v-if="id==1&&status=='houseFinished'" class="title">
					<view class="fee">押金</view>
					<view class="content">{{deposit}}</view>
				</view>
				<view v-if="id==1&&status=='houseFinished'" class="title">
					<view class="fee">租金</view>
					<view class="content">{{price}}</view>
				</view>
				<view v-if="id==1&&status=='houseFinished'" class="title">
					<view class="fee">服务费</view>
					<view class="content">{{houseService}}</view>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="content">
				<text v-if="id==8||id==9||id==10">共计{{length}}件商品，实收￥{{sum}}</text>
				<text v-if="id==1&&status=='houseWaitingDeal'" class="gray">签约后，租户才可以付款哦~</text>
				<text v-if="id==5&&status=='agentWaitingDeal'" class="gray">签约后，租户才可以付款哦~</text>
				<text v-if="id==5&&status=='agentWaitingDealed'" class="gray">已签约，等待客户付款吧~</text>
				<text v-if="id==5&&(status=='agentWaitingFinish'||status=='agentBack')" class="gray">实收：{{sum}}</text>
				<text v-if="id==5&&status=='financeWaitingFinish'" class="gray">实收：{{sum}}</text>
				<text v-if="id==5&&status=='financeWaitingDeal'" class="gray">快去处理吧~</text>
				<text v-if="id==5&&status=='financeWaitingDealed'" class="gray">已完成预约</text>
				<text v-if="id==1&&status=='houseDealed'" class="gray">已签约，等待租户付款吧~</text>
				<text v-if="id==1&&(status=='houseFinished'||status=='houseBack')" class="gray">实收:{{houseSum}}</text>
			</view>
			<view class="status">{{statusObj[status]}}</view>
		</view>
		
		<view class="other">
			<!-- 地址 -->
			<view class="item" v-if="(id==8||id==9)&&type==1">
				<image src="/static/cut/user/address_on.png"></image>
				<view class="content">
					<view class="address">广东深圳市龙岗区龙翔大道9002号志联佳大厦508</view>
					<view class="name">唐笑笑 1374545554</view>
				</view>
			</view>
			<!-- 留言 -->
			<view class="item" v-if="(id==8||id==10)&&type==1">
				<image src="/static/cut/user/message.png"></image>
				<view class="content">急需要穿！！帮忙快点发货好吗，拜托了</view>
			</view>
			<view class="item" v-if="id==5&&(status=='agentWaitingDeal'||status=='agentWaitingDealed'||status=='agentWaitingFinish'||status=='agentBack')">
				<image src="/static/cut/user/userInfo.png"></image>
				<view class="content">
					<view class="address">{{identityCard}}</view>
					<view class="name">{{username}} {{phone}}</view>
				</view>
			</view>
			<view class="item" v-if="id==5&&(status=='agentWaitingDeal'||status=='agentWaitingDealed'||status=='agentWaitingFinish'||status=='agentBack')">
				<image src="/static/cut/user/signtime.png"></image>
				<view class="content">租期时长：{{duration}}</view>
			</view>
			<view class="item" v-if="id==5&&(status=='financeWaitingDeal'||status=='financeWaitingDealed'||status=='financeWaitingFinish')">
				<image src="/static/cut/user/userInfo.png"></image>
				<view class="content">{{username}} {{phone}}</view>
			</view>
			<view class="item" v-if="id==5&&(status=='financeWaitingDeal'||status=='financeWaitingDealed'||status=='financeWaitingFinish')">
				<image src="/static/cut/user/signtime.png"></image>
				<view class="content">预约时间：{{appointment}}</view>
			</view>
			<view class="item" v-if="id==1">
				<image src="/static/cut/user/userInfo.png"></image>
				<view class="content">
					<view class="address">{{identityCard}}</view>
					<view class="name">{{username}} {{phone}}</view>
				</view>
			</view>
			<view class="item" v-if="id==1">
				<image src="/static/cut/user/signtime.png"></image>
				<view v-if="status!='houseBack'" class="content">租期时长：{{duration}}</view>
				<view v-if="status=='houseBack'" class="content">搬离时间：{{duration}}</view>
			</view>
			<view class="item" v-if="id==1&&status=='houseBack'">
				<image src="/static/cut/user/reason.png"></image>
				<view class="content">{{moveReason}}</view>
			</view>
			<view class="item" v-if="(id==8||id==10)&&type==7">
				<image src="/static/cut/user/reason.png"></image>
				<view class="content">申请原因:{{applyReason}}</view>
			</view>
			<view class="item" v-if="(id==8||id==10)&&type==7">
				<image src="/static/cut/user/backtype.png"></image>
				<view class="content">售后方式:{{applyMode}}</view>
			</view>
			<view class="item" v-if="(id==8||id==10)&&type!=1">
				<image src="/static/cut/user/message.png"></image>
				<view class="content">申请备注:{{applyExplain}}</view>
			</view>
		</view>
		<view class="buttons">
			<block v-if="status=='agentWaitingDeal'"><view class="gray default">拒绝签约</view><view class="yellow" @tap.stop="toContract">查看合同并签约</view></block>
			<block v-if="status=='financeWaitingDeal'"><view class="gray default">拒绝预约</view><view class="yellow" @tap.stop="acceptAppointment">同意预约</view></block>
			<block v-if="status=='agentBack'"><view class="gray default">拒绝解约</view><view class="yellow">同意解约</view></block>
			<block v-if="status=='financeWaitingDealed'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='agentWaitingDealed'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='financeWaitingFinish'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='agentWaitingFinish'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='houseWaitingDeal'"><view class="gray default">取消订单</view><view class="white">联系TA</view><view @tap.stop="toContract" class="yellow">查看合同并签约</view></block>
			<block v-if="status=='houseDealed'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='houseFinished'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='waitingRecieve'"><view class="gray default">拒收订单</view><view class="white">联系TA</view><view @tap.stop="accept" class="yellow">接收订单</view></block>
			<block v-if="status=='waitingDeal'"><view class="white">联系TA</view><view @tap.stop="confirmService" class="yellow">确认服务</view></block>
			<block v-if="status=='dealed'"><view class="gray default">联系TA</view></block>
			<block v-if="status=='applyBack'"><view class="gray default">联系TA</view><view class="gray default">拒绝申请</view><view @tap.stop="toContract" class="yellow">同意售后</view></block>
			<block v-if="status=='applyMoney'"><view class="gray default">联系TA</view><view class="gray default">拒绝退款</view><view @tap.stop="toContract" class="yellow">同意退款</view></block>
			<block v-if="status=='serviced'"><view class="default">联系TA</view><view class="pay" @tap.stop="cancelApply">取消申请</view></block>
			<block v-if="status=='waiting'"><view class="default">联系TA</view></block>
			<block v-if="status=='finished'"><view @tap.stop="checkComment" class="yellow">查看评价</view></block>
			<block v-if="status=='houseBack'"><view @tap.stop="agreeMove" class="yellow">同意退租</view></block>
		</view>
	</view>
</template>

<script>
export default{
	name:'businessOrder',
	props:{
		id:{
			type:Number,
			value:8
		},
		type:[String,Number],
		status:{
			type:String
		},
		spec:{
			type:String
		},
		title:{
			type:String
		},
		num:{
			type:Number,
			value:1
		},
		price:{
			type:Number
		},
		createTime:{
			type:String
		},
		orderNum:{
			type:String
		},
		pic:{
			type:String
		},
		duration:{
			type:String
		},
		username:{
			type:String
		},
		identityCard:{
			type:String
		},
		phone:{
			type:String
		},
		houseSum:[String,Number],
		houseService:[String,Number],
		deposit:[String,Number],
		goodsItemList:{
			type:Array
		},
		sum:[String,Number],
		deliver:{
			type:String
		},
		length:{
			type:Number
		},
		applyExplain:{
			type:String
		},
		applyMode:{
			type:String
		},
		applyReason:'',
		moveReason:'',
		appointment:''
	},
	data(){
		return{
			statusObj:{
				waitingRecieve:'待接单',
				waitingDeal:'待处理',
				houseWaitingDeal:'待处理',
				houseDealed:'已处理',
				dealed:'已处理',
				finished:'交易完成',
				applyBack:'申请售后',
				applyMoney:'申请退款',
				houseFinished:'已完成',
				houseBack:'申请退租',
				financeWaitingDeal:'待处理',
				financeWaitingFinish:'已完成',
				financeWaitingDealed:'已处理',
				agentWaitingDeal:'待处理',
				agentWaitingDealed:'已处理',
				agentWaitingFinish:'已完成',
				agentBack:'客户申请解约'
			}
		}
	},
	methods:{
		toContract(){
			this.$emit('checkCont')
		},
		accept(){
			this.$emit('acceptOrder')
		},
		confirmService(){
			this.$emit('confirm')
		},
		agreeMove(){
			this.$emit('agree')
		},
		acceptAppointment(){
			this.$emit('accept')
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.box{
	background-color: #fff;
	margin-bottom: 20rpx;
}
.top{
	border-bottom: 1rpx solid #f2f2f2;
	padding:0 20rpx;
	height:87rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.lf{
		display: flex;
		align-items: center;
		image{
			width:24rpx;
			height:27rpx;
			margin-right: 10rpx;
		}
		.ordercode{
			font-size:20rpx;
			color:rgba(100,100,100,1);
			width:400rpx;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			word-wrap: break-word;
			word-break: break-all;
		}
	}
	.rt{
		font-size:20rpx;
		color:rgba(140,140,140,1);
	}
}

.lifeMiddle{
	margin-top: 20rpx;
	border-bottom: 1rpx solid #f2f2f2;
	.item{
		margin-bottom: 20rpx;
		height:120rpx;
		display: flex;
		padding:0 20rpx;
		image{
			width:120rpx;
			height:120rpx;
		}
		.list{
			margin-left: 20rpx;
			width:570rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title{
				display: flex;
				justify-content: space-between;
				.name{
					width:400rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.spec{
					font-size:22rpx;
					color:rgba(0,138,255,1);
				}
			}
		}
	}
	.delivery{
		padding:0 20rpx;
		height:80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

.houseMiddle{
	display: flex;
	margin-top: 20rpx;
	border-bottom: 1rpx solid #f2f2f2;
	padding-bottom: 10rpx;
	image{
		width:120rpx;
		height:120rpx;
		border-radius: 8rpx;
		margin-left: 18rpx;
	}
	.list{
		width:573rpx;
		margin-left: 19rpx;
		.title{
			margin-bottom: 10rpx;
			display: flex;
			justify-content: space-between;
			.name{
				width:400rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.spec{
				font-size:22rpx;
				color:rgba(0,138,255,1);
			}
		}
	}
}
.bottom{
	border-bottom: 1rpx solid #f2f2f2;
	display: flex;
	height:83rpx;
	align-items: center;
	padding:0 20rpx;
	justify-content: space-between;
	.status{
		color:#008AFF;
	}
}

.other{
	padding:20rpx 20rpx 20rpx 20rpx;
	.item{
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		image{
			width:36rpx;
			height:36rpx;
		}
		.content{
			margin-left: 20rpx;
		}
	}
}

.buttons{
	height:100rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-top: 1rpx solid #f2f2f2;
	padding-right: 20rpx;
	.default{
		margin-left: 20rpx;
		font-size: 26rpx;
		line-height:60rpx; 
		height:60rpx;
		padding:0 20rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(200,200,200,1);
		border-radius:10rpx;
	}
	.white{
		margin-left: 20rpx;
		font-size: 26rpx;
		line-height:60rpx; 
		height:60rpx;
		padding:0 20rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,102,0,1);
		border-radius:10rpx;
		color:#FF6600;
	}
	.yellow{
		margin-left: 20rpx;
		font-size: 26rpx;
		line-height:60rpx; 
		height:60rpx;
		padding:0 20rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border:1rpx solid rgba(255,102,0,1);
		border-radius:10rpx;
		color:#FFF;
	}
}
</style>
