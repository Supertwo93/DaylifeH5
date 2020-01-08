<template>
	<view>
		<view class="line"></view>
		<view class="cardDetail" :class="[display ?'opa':'']">
			<view class="card" :style="{background:'url(' + data.carPic + ')','background-size': '100% 100%'}">
				<image class="icon" :src="data.logoPic"></image>
				<view class="type">会员卡</view>
				<view class="storeName">{{data.nickName}}</view>
				<view class="cardNum">{{data.cardNo}}</view>
				<image src="/static/cut/code.png" class="code" @tap="toCode()"></image>
			</view>
			<view class="detail">
				<view class="balance" @tap="toFlowDetail">
					<view class="text">余额</view>
					<view class="number">{{data.balance}}</view>
				</view>
				<view @tap="toPointRecord()" class="balance">
					<view class="text">积分</view>
					<view class="number">{{data.points}}</view>
				</view>
			</view>
		</view>
		
		<view class="list" :class="[display ?'opa':'']">
			<view class="item" @tap="toCharge">
				<view>充值</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
<!-- 			<view class="item" @tap="toChange()">
				<view>积分兑换成余额</view>
				<image src="/static/cut/grayright.png"></image>
			</view> -->
			<view class="item" @tap="cancelCard()">
				<view>删除该店会员卡</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		<view class="delete" :class="[deleted ?'':'none']">
			<view class="title">
				<view>删除后无法享受相应权益，</view>
				<view>确认要删除吗？</view>
			</view>
			<view class="buttons">
				<view @tap="cancelCard()" class="cancel" style="border-right:1rpx solid #DCDCDC">取消</view>
				<view class="default" @tap="deleteCard">删除</view>
			</view>
		</view>
		
		<view class="popup" :class="[change?'':'none']">
			<view class="title">兑换成余额</view>
			<view class="input">
				<view>积分：</view>
				<input placeholder="请输入"/>
			</view>
			<view class="money">
				<view class="name">可兑换成余额</view>
				<view class="number">￥0.00</view>
			</view>
			<view class="buttons">
				<view class="cancel button" @tap="toChange()">取消</view>
				<view class="confirm button">确认</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
import {VipModel} from '@/common/models/vip.js'
let vipmodel = new VipModel()
export default{
	data(){
		return{
			deleted:false,
			change:false,
			display:false,
			data:'',
			id:''
		}
	},
	onLoad(options) {
		this.id = options.id
		let req = {id:options.id}
		vipmodel.getUserCardDetail(req,(data)=>{
			this.data = data
		})
	},
	methods:{
		cancelCard(){
			this.deleted = !this.deleted
			this.display = !this.display
		},
		toChange(){
			this.change = !this.change
			this.display = !this.display
		},
		toCode(){
			uni.navigateTo({
				url:'cardcode?id=' + this.id + '&data=' + JSON.stringify(this.data)
			})
		},
		deleteCard(){
			let req = {id:this.data.id}
			vipmodel.deleteCard(req,(data)=>{
				uni.showToast({
					title:'删除成功',
					icon:'none',
					duration:2000
				})
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					})
				},2000)
			})
		},
		toFlowDetail(){
			uni.navigateTo({
				url:'/pages/user/card/flowList?id=' + this.id
			})
		},
		toPointRecord(){
			uni.navigateTo({
				url:'/pages/user/card/pointRecord?id=' + this.id
			})
		},
		toCharge(){
			uni.navigateTo({
				url:'/pages/user/card/cardCharge?id=' + this.data.memberCardId + '&userId=' + this.id
			})
		}
		
	}
}
</script>

<style lang="scss">
.cardDetail{
	height:612rpx;
	padding:40rpx 40rpx 0 40rpx;
	.card{
		width:670rpx;
		height:400rpx;
		border-radius:24rpx;
		position:relative;
		.icon{
			width:60rpx;
			height:60rpx;
			border-radius:8rpx;
			position:absolute;
			top:31rpx;
			left:31rpx;
		}
		.type{
			font-size:30rpx;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-shadow:0rpx 4rpx 4rpx rgba(0, 0, 0, 0.2);
			position:absolute;
			top:30rpx;
			left:112rpx;
		}
		.storeName{
			font-size:22rpx;
			font-weight:400;
			color:rgba(255,255,255,1);
			position:absolute;
			top:69rpx;
			left:112rpx;
		}
		.cardNum{
			position:absolute;
			top:348rpx;
			left:30rpx;
			font-size:26rpx;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-shadow:0rpx 4rpx 4rpx rgba(0, 0, 0, 0.2);
		}
		.code{
			position:absolute;
			top:30rpx;
			left:590rpx;
			width:50rpx;
			height:50rpx;
		}		
	}
	.detail{
		height:172rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.balance{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.text{
				font-size:26rpx;
				font-weight:400;
				color:rgba(120,120,120,1);
			}
			.number{
				font-size:36rpx;
				font-weight:500;
				color:rgba(60,60,60,1);
			}
		}
	}
}
.line{
	position: absolute;
	width:1rpx;
	height:60rpx;
	background:rgba(220,220,220,1);
	top:476rpx;
	left:375rpx;
}

.list{
	padding:0 20rpx;
	.item{
		border-top:1rpx solid #EBEBEB;
		height:104rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width:10rpx;
			height:20rpx;
		}
		view{
			font-size:26rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
		}
	}
}

.delete{
	background-color: #fff;
	position:absolute;
	top:407rpx;
	left:125rpx;
	width:500rpx;
	height:264rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	.title{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height:176rpx;
		border-bottom:1rpx solid #DCDCDC;
	}
	.buttons{
		width:100%;
		height:87rpx;
		display: flex;
		view{
			font-size:30rpx;
			width:50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.delete{
			color:rgba(160,160,160,1);
		}
		.default{
			color:rgba(255,102,0,1);
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
			min-height:26rpx;
			height:26rpx;
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

.opa{
	opacity: 0.3;
}
</style>
