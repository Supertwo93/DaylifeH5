<template>
	<view>
		<view class="accountNumber">
			<view class="title">充值金额</view>
			<view class="number">
				<view class="renmibi">￥</view>
				<input type="digit" v-model="number" @input="checkChange"/>
				<image src="/static/cut/cancel.png" @tap="clearNumber()"></image>
			</view>
		</view>
		
		<view class="typeTitle">充值方式</view>
		
		<view class="chargeType">
			<view @click="changePayType(index)" v-for="(item,index) in payType" :key="index">
				<image class="pay" :src="item.src"></image>
				<view>{{  item.title }}</view>
				<image v-show="!item.onoff" class="icon" src="/static/cut/unchoose.png"></image>
				<image v-show="item.onoff" class="icon" src="/static/cut/choosed.png"></image>
			</view>
		</view>
		
		<view v-if="number=='' || isOver==1" class="submit-button noNumber"> 确认充值</view>
		<view v-if="number!='' && isOver==0" class="submit-button" @tap="next()">确认充值</view>
	</view>
</template>

<script>
	import {UserModel} from '../../common/models/user.js'
	import {PayModel} from '@/common/models/pay.js'
	let usermodel = new UserModel();
	let payModel = new PayModel();
	export default{
		data(){
			return{
				payType:[{
					title:'微信支付',
					onoff:true,
					src:'/static/cut/wechat.png'
				},{
					title:'支付宝支付',
					onoff:false,
					src:'/static/cut/alipay.png'
				}],
				wxPay:1,
				aliPay:0,
				number:"",
				isOver: 0	//是否超过 0：没超过   1：超过
			}
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		onLoad() {
			
		},
		methods:{
			changePayType(index){
				this.payType.forEach(item =>{
					item.onoff = false;
				})
				this.payType[index].onoff = true;
			},
			checkChange(e){
				this.number = this.number.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			},
			clearNumber(){
				this.number = '';
			},
			next(){
				let type = 1;
				if( this.payType[0].onoff ){  //微信支付
					type = 2;
				}
				
				payModel.webPay({
					type,
					rechargeMoney:0.01
				},(res) =>{
					console.log(res);
					// #ifdef H5
					if( type === 1 ){   //支付宝支付
						let id = document.getElementById('zy-pay');
						if( id ){
							id.remove();
						}
						const div = document.createElement('div');
						div.id = 'zy-pay';
						
						div.innerHTML = (res);
						document.body.appendChild(div);
						document.forms[0].acceptCharset = 'UTF-8';
						document.forms[0].submit();
						return;
					}else{
						let src = res.mwebUrl;
						window.location = src;
					}
					// #endif
				},(err) =>{
					console.log(err)
				})
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.accountNumber{
	margin-top:20rpx;
	height:242rpx;
	background-color: #fff;
	.title{
		height:54rpx;
		padding-top:29rpx;
		padding-left:19rpx;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(100,100,100,1);
		line-height:36rpx;
	}
	.number{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height:188rpx;
		.renmibi{
			width:37rpx;
			height:45rpx;
			margin-right:28rpx;
			margin-left:20rpx;
			font-size:60rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
			margin-bottom:40rpx;
		}
		input{
			width:600rpx;
			font-size:68rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
			min-height: 68rpx;
		}
		image{
			width:44rpx;
			height:44rpx;
			margin-right:20rpx;
		}
	}
}

.typeTitle{
	height:63rpx;
	margin-top:19rpx;
	margin-left:20rpx;
}

.chargeType{
	view{
		height:100rpx;
		background-color: #fff;
		display: flex;
		align-items:center;
		border-bottom:1px solid #f2f2f2;
		.pay{
			width:60rpx;
			height:60rpx;
			margin-left: 20rpx;
		}
		.icon{
			width:28rpx;
			height:28rpx;
		}
		view{
			margin-left:20rpx;
			width:580rpx;
		}
	}
}

.noNumber{
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	opacity:0.6;
}




</style>
