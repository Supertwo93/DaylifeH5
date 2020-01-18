<template>
	<view>
		<!-- <view class="cashTo">提现到</view> -->
		
		<!-- <view class="type">
			<view>
				<image class="pay" src="/static/cut/wechat.png"></image>
				<view><text :class="[wxPay?'active':'native']">微信</text><text :class="[wxPay?'native':'active']">(点击绑定)</text></view>
				<image v-if="wxPay==0" class="icon" src="/static/cut/unchoose.png"></image>
				<image v-if="wxPay==1" class="icon" src="/static/cut/choosed.png"></image>
			</view>
			<view>
				<image class="pay" src="/static/cut/alipay.png"></image>
				<view><text :class="[wxPay?'active':'native']">支付宝</text><text :class="[wxPay?'native':'active']">(点击绑定)</text></view>
				<image v-if="aliPay==0" class="icon" src="/static/cut/unchoose.png"></image>
				<image v-if="aliPay==1" class="icon" src="/static/cut/choosed.png"></image>
			</view>
		</view> -->
		
		<view class="accountNumber">
			<view class="title">提现金额</view>
			<view class="number">
				<view class="renmibi">￥</view>
				<input type="number" v-model="number" @input="checkChange" />
				<image src="/static/cut/cancel.png" @tap="clearNumber()"></image>
			</view>
		</view>
		
		
		<view v-if="avalible==0" class="aval"><view>可用余额{{change}}元</view></view>
		<view v-if="avalible==1" class="alert"><view>金额已超过可提现金额</view></view>
		
		<view class="submit-button" @tap="withdraw()" :class="{'imColor':avalible}">确认提现</view>
	</view>
</template>

<script>
	import {UserModel} from '../../common/models/user.js'
	let usermodel = new UserModel();
	export default{
		data(){
			return{
				wxPay:0,
				aliPay:0,
				number: '',
				name: '',
				change:0,
				avalible:0,
			}
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		onLoad(option) {
			this.name = option.name;
			this.change = option.money;
			console.log(this.name);
		},
		methods:{
			clearNumber(){
				this.number = '';
			},
			checkChange(e){
				if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
				  this.number = e.detail.value;
				} else {
				  this.number = e.detail.value.substring(0, e.detail.value.length - 1);
				}
				console.log(parseInt(this.number),parseInt(this.change));
				if(this.number > this.change){
					this.avalible = 1;
				}else{
					this.avalible = 0;
				}
			},
			withdraw(){
				usermodel.userWithdraw({
					money: this.number,
					type:2,
					trueName: this.name
				},(res)=>{
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.cashTo{
	height:63rpx;
	padding:19rpx 0 20rpx 19rpx;
	font-size:24rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(160,160,160,1);
}
	
.type{
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

.active{
	color:#3C3C3C;
}
.native{
	color:#8C8C8C;
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

.alert{
	background-color: #fff;
	height:84rpx;
	view{
		display: flex;
		align-items: center;
		border-top:1px solid #f2f2f2;
		margin-left:20rpx;
		margin-right:20rpx;
		height:100%;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(248,89,89,1);
	}
}

.aval{
	background-color: #fff;
	height:84rpx;
	view{
		display: flex;
		align-items: center;
		border-top:1px solid #f2f2f2;
		margin-left:20rpx;
		margin-right:20rpx;
		height:100%;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(140,140,140,1);
	}
}

.imColor{
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	opacity:0.6;
}
</style>
