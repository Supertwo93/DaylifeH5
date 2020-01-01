<template>
	<view>
		<view class="top">
			<view class="topOne">
				<view class="status" v-if="item.contractState==1">履行中</view>
				<view class="status" v-if="item.contractState!=1">已解约</view>
				<view v-if="uerInfo.storeId!=item.sellerId" class="icon">乙方</view>
				<view v-if="uerInfo.storeId==item.sellerId"  class="icon partya">甲方</view>
			</view>
			<view class="topTwo">
				<view class="title">{{item.partyaName}}</view>
				<view class="number">合同编号：{{item.contractCode}}</view>
			</view>
		</view>
		
		<view class="middle">
			<view class="item">
				<view class="left">合同时长</view>
				<view class="right">{{item.contractStarttime}}至{{item.contractEndtime}}</view>
			</view>
			<view class="item" v-if="item.firsttypeId==1">
				<view class="left">付款方式</view>
				<view class="right">{{item.paymentMethod}}</view>
			</view>
			<view class="item" @tap="toContract">
				<view class="left">电子合同</view>
				<view class="right">查看<image src="/static/cut/grayright.png"></image></view>
			</view>
			<view class="item" @tap="toBillDetail">
				<view class="left">账单详情</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
			<view class="item" v-if="item.firsttypeId==1">
				<view class="left">物业交割信息</view>
				<view class="right">已确认<image src="/static/cut/grayright.png"></image></view>
			</view>
		</view>
		
		<view class="content">签约主体信息</view>
		
		<view class="bottom">
			<view class="item" v-if="item.firsttypeId==1">
				<view class="left">身份证</view>
				<view class="right">{{plusXing(item.partybId,3,4)}}</view>
			</view>
			<view class="item" v-if="item.firsttypeId==1">
				<view class="left">联系电话</view>
				<view class="right">{{plusXing(item.partybPhone,3,4)}}</view>
			</view>
			<view class="item" v-if="item.firsttypeId==5">
				<view class="left">身份证</view>
				<view class="right">{{plusXing(item.identityCard,3,4)}}</view>
			</view>
			<view class="item" v-if="item.firsttypeId==5">
				<view class="left">联系电话</view>
				<view class="right">{{plusXing(item.telephone,3,4)}}</view>
			</view>
			<view class="item" v-if="item.firsttypeId==5">
				<view class="left">公司名称</view>
				<view class="right">{{item.companyName}}</view>
			</view>
			<view class="address" v-if="item.firsttypeId==5">
				<view class="title">公司地址</view>
				<view class="detail">{{item.companyAddress}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex'
export default{
	computed:{
		...mapState(['uerInfo'])
	},
	data(){
		return{
			item:'',
			typeId:''
		}
	},
	onLoad(options){
		this.item = JSON.parse(options.data)
		console.log(this.item)
		this.typeId = this.item.firsttypeID
	},
	methods:{
		plusXing (str,frontLen,endLen) { 
			console.log(typeof(str))
			var len = str.length-frontLen-endLen;
			var xing = '';
			for (var i=0;i<len;i++) {
				xing+='*';
			}
			return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
		},
		toBillDetail(){
			uni.navigateTo({
				url:'/pages/user/bill/billdetail?billcode=' + this.item.billCode
			})
		},
		toContract(){
			uni.navigateTo({
				url:`/pages/user/agreement/agreementcontract?data=${JSON.stringify(this.item)}`
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.top{
	margin-top: 20rpx;
	background-color: #fff;
	height:239rpx;
	.topOne{
		height:100rpx;
		border-bottom:1rpx solid #DCDCDC;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.status{
			margin-left: 20rpx;
			font-size:28rpx;
			font-weight:400;
			color:rgba(255,102,0,1);
			line-height:40rpx;
		}
		.icon{
			width:99rpx;
			height:40rpx;
			background:rgba(41,181,246,1);
			border-radius:20rpx 0rpx 0rpx 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size:28rpx;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:36rpx;
			&.partya{
				background-color: #65B77E;
			}
		}
	}
	.topTwo{
		.title{
			color:#3C3C3C;
			margin-left: 19rpx;
			margin-top: 30rpx;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			word-wrap: break-word;
			word-break: break-all;
		}
		.number{
			margin-left: 20rpx;
			margin-top: 20rpx;
			color:rgba(140,140,140,1);
		}
	}
}
.middle{
	background-color: #fff;
	margin-top: 20rpx;
}
.item{
	height:84rpx;
	padding-left:20rpx;
	padding-right: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1rpx solid #DCDCDC;
	.left{
		color:#3C3C3C;
	}
	.right{
		color:#8C8C8C;
	}
}

image{
	margin-left: 20rpx;
	width:10rpx;
	height:20rpx;
}
.content{
	font-size:20rpx;
	color:rgba(120,120,120,1);
	margin-left: 20rpx;
	margin-top: 20rpx;
	height:60rpx;
}
.bottom{
	background-color: #fff;
}

.address{
	padding-left:20rpx;
	padding-right: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height:120rpx;
	.detail{
		font-size:24rpx;
		font-weight:400;
		color:rgba(140,140,140,1);
		line-height:38rpx;
		width:60%;
		display: flex;
		justify-content: flex-end;
		text-align: right;
	}
}
</style>
