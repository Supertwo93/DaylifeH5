<template>
	<view>
		<view class="grayButton">基本信息</view>
		
		<view class="box">
			<view class="left">姓名</view>
			<view class="right">
				<input v-model="name" placeholder="请输入姓名"/>
			</view>
		</view>
		<view class="box">
			<view class="left">性别</view>
			<view class="right">
				<view class="sex" @tap="isMale" :class="{'on':male}">男</view>
				<view class="sex" @tap="isFemale" :class="{'on':female}">女</view>
			</view>
		</view>
		<view class="box">
			<view class="left">出生日期</view>
			<view class="right">
				<picker mode="multiSelector" @change="bindMultiPickerChange" :range="multiArray" value="[0,0]">
					<view class="date">{{date}}</view>
				</picker>
				<image src="/static/cut/grayright.png"></image>
				
			</view>
		</view>
		<view class="box">
			<view class="left">
				<input v-model="phone" placeholder="请输入电话号码"/>
			</view>
			<view class="right">
				<view v-show="show" class="sendButton" @tap="sendCode">发送验证码</view>
				<view v-show="!show" class="second">{{count}}</view>
			</view>
		</view>
		<view class="box">
			<view class="left">
				<input v-model="code" placeholder="请输入验证码"/>
			</view>
		</view>
		
		
		<view class="submit-button" @tap="submit">确认办理<text v-if="type != 1"> ￥{{price}}</text></view>
	</view>
</template>

<script>
import {LoginModel} from '@/common/models/login.js'
import {VipModel} from '@/common/models/vip.js'
import {PayModel} from '@/common/models/pay.js'
import {ConfirmationModel} from '@/common/models/confirmation.js'
let confirmationModel = new ConfirmationModel()
let loginmodel = new LoginModel()
let vipmodel = new VipModel()
let paymodel = new PayModel()
export default{
	data(){
		return{
			date:'请选择',
			phone:'',
			name:'',
			multiArray:[
				['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月'],
				['01日','02日','03日','04日','05日','06日','07日','08日','09日','10日','11日','12日',
				'13日','14日','15日','16日','17日','18日','19日','20日','21日','22日',
				'23日','24日','25日','26日','27日','28日','29日','30日','31日']
			],
			type:'',
			price:'',
			male:true,
			female:false,
			code:'',
			id:'',
			show:true,
			count:'',
			timer:null,
			index: ''
		}
	},
	onLoad(option){
		this.type = option.type
		this.price = option.price
		this.id = option.id
		this.index = option.index
	},
	methods:{
		bindMultiPickerChange(e){
			let i = e.detail.value
			console.log(i)
			this.date = this.multiArray[0][i[0]] + this.multiArray[1][i[1]]
		},
		isMale(){
			this.male = true
			this.female = false
		},
		isFemale(){
			this.male = false
			this.female = true
		},
		sendCode(){
			if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				uni.showToast({
					title:'请输入正确的手机号码',
					icon:'none',
					duration:1500
				})
				return
			}
			loginmodel.getYzm(this.phone,3,(data)=>{
				 const TIME_COUNT = 60
				 if(!this.timer){
					 this.count = TIME_COUNT
					 this.show = false;
					 this.timer = setInterval(()=>{
						 if(this.count>0&&this.count<=TIME_COUNT){
							 this.count--;
						 }else{
							 this.show = true;
							 clearInterval(this.timer);
							 this.timer = null
						 }
					 },1000)
				 }
			})
			
		},
		submit(){
			if(this.name==''){
				uni.showToast({
					title:'请输入姓名',
					icon:'none',
					duration:1500
				})
				return
			}
			if(this.date.startsWith('请')){
				uni.showToast({
					title:'请选择出生日期',
					icon:'none',
					duration:1500
				})
				return
			}
			if(this.code.length!=6){
				uni.showToast({
					title:'请输入正确的验证码',
					icon:'none',
					duration:1500
				})
				return
			}
			let req = {}
			req.fullName = this.name
			if(this.male==true&&this.female==false){
				req.sex = 1
			}else if(this.female==true&&this.male==false){
				req.sex = 0
			}
			req.birthDate = this.date
			req.yzm = this.code
			req.phone = this.phone
			req.memberCardId = this.id
			if(this.type==1){
				vipmodel.applyFree(req,(data)=>{
					uni.navigateTo({
						url:'success'
					})
				})
			}
			if(this.type!=1){
				req.type = 3;
				if(this.type == 3){
					req.memberCardRechargeCtivityId = this.index;
				}
				// req.price = this.price;
				vipmodel.applyUserMember(req,(res)=>{
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: res.timeStamp,
					    nonceStr: res.nonceStr,
					    package: res.package,
					    signType: 'MD5',
					    paySign: res.paySign,
					    success: function (res) {
					    	// uni.showToast({
					    	// 	title: "支付成功！"
					    	// })
							uni.navigateTo({
								url:'success'
							})
					    },
					    fail: function (err) {
					    	uni.showToast({
					    		title:'您已取消支付，请尽快完成支付',
					    		duration:2000,
					    		icon:'none'
					    	})
					    }
					});
				})				
			}
		}
	},
}

</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.box{
	background-color: #fff;
	height:84rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.left{
		margin-left: 20rpx;
	}
	.right{
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		input{
			text-align: right;
		}
		.sex{
			color:#ff6600;
			font-size:20rpx;
			width:60rpx;
			height:36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border:1rpx solid rgba(255,102,0,1);
			border-radius:6rpx 0rpx 0rpx 6rpx;
		}
		.on{
			background-color: #ff6600;
			color:#fff;
		}
		image{
			margin-left: 10rpx;
			width:10rpx;
			height:20rpx;
		}
		.sendButton{
			color:#ff6600;
		}
		
	}
}
</style>
