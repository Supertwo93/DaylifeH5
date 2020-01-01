<template>
	<view>
		<view class="topContainer">
			<view class="title">当前积分总数量</view>
			<view class="point">{{uerInfo.store}}</view>
			<view class="button" @tap="showPop()">兑换成余额</view>
		</view>
		
		<view class="popup" :class="[display?'none':'']">
			<view class="title">兑换成余额</view>
			<view class="input">
				<view>积分：</view>
				<input v-model="score" placeholder="请输入"/>
			</view>
			<view class="money">
				<view class="name">可兑换成余额</view>
				<view class="number">￥0.00</view>
			</view>
			<view class="buttons">
				<view class="cancel button" @tap="showPop()">取消</view>
				<view class="confirm button" @tap="scoreExchange()">确认</view>
			</view>
		</view>
		
		<view class="middleTitle">积分明细</view>
		
		<view class="points" :class="[display?'':'opac']">

			<view v-for="(item,index) in pointList" class="item" :key="index">
				<view class="left">
					<view class="title">{{reason[item.reason]}}</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="right">
					<view v-if="item.type==1">+</view>
					<view v-if="item.type==2">-</view>
					<view>{{item.store}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	let usermodel=new UserModel()
	import {mapState} from 'vuex';  
	export default{
		data(){
			return{
				score: '',
				display:true,
				reason:{
					1:'新用户注册积分',
					2:'邀请返佣积分',
					3:'消费获得积分',
					4:'消费返佣积分',
					5:'每日签到',
					6:'订单支付',
					7:'兑换余额',
					8:'兑换优惠券'
				},
				pointList:[]
			}
		},
		computed: {
			...mapState(['myScore','uerInfo'])
		},  
		onLoad() {
			usermodel.getStoreflow(1,(data)=>{
				console.log(data);
				this.pointList = data
			})
		},
		methods:{
			showPop(){
				this.display = !this.display
			},
			scoreExchange(){
				usermodel.storeExchange(this.store,(data)=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.topContainer{
	width:100%;
	height:260rpx;
	position:relative;
	background:linear-gradient(-90deg,rgba(84,190,250,1),rgba(78,149,255,1));
	.title{
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
		position: absolute;
		top:64rpx;
		right:539rpx;
		bottom:170rpx;
		left:21rpx;
	}
	.point{
		font-size:110rpx;
		font-family:Bahnschrift;
		font-weight:400;
		color:rgba(255,255,255,1);
		position: absolute;
		top:114rpx;
		right:466rpx;
		bottom:65rpx;
		left:19rpx;
	}
	.button{
		position: absolute;
		width:200rpx;
		height:60rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		font-size:28rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,102,0,1);
		display: flex;
		align-items: center;
		justify-content: center;
		top:135rpx;
		right:20rpx;
		bottom:65rpx;
		left:530rpx;
	}
}

.middleTitle{
	height:62rpx;
	font-size:24rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(160,160,160,1);
	line-height:36rpx;
	padding-top: 19rpx;
	padding-left: 19rpx;
}
.points{
	width:750rpx;
	background-color: #fff;
	.item{
		margin-left:20rpx;
		margin-right:20rpx;
		height:123rpx;
		border-bottom:1rpx solid #f2f2f2;
		display: flex;
		justify-content: space-between;
		.left{
			padding-top: 30rpx;
			.title{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.time{
				margin-top:20rpx;
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(160,160,160,1);
			}
		}
		.right{
			display: flex;
			align-items: center;
			view{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
		}
	}
}

.popup{
	width:600rpx;
	height:368rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	position: fixed;
	z-index:99;
	top:357rpx;
	left:75rpx;
	right:75rpx;
	.title{
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(60,60,60,1);
		margin-top: 29rpx;
		margin-left: 237rpx;
	}
	.input{
		margin-left: 31rpx;
		width:540rpx;
		height:123rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #EBEBEB;
		input{
			// min-height:26rpx;
			// height:26rpx;
			font-size:26rpx;
		}
		view{
			font-size:26rpx;
			font-family:Source Han Sans CN;
			color:rgba(60,60,60,1);
		}
	}
	.money{
		height:102rpx;
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		padding-left: 29rpx;
		padding-top: 31rpx;
		.name{
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:#787878
		}
		.number{
			font-size:24rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:#FF6600;
		}
	}
	.buttons{
		display: flex;
		height:80rpx;
		width:100%;
		.button{
			width:50%;
			font-size:30rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.cancel{
			border-right: 1rpx solid #DCDCDC;
			color:rgba(160,160,160,1);
		}
		.confirm{
			color:rgba(255,102,0,1);
		}
	}
}
.none{
	display: none;
}
.opac{
	opacity: 0.2;
}
</style>
