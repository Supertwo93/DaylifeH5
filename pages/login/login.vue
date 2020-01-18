<template>
  <view>
	  <view class="logo">
		  <image src="../../static/cut/logo.png" mode=""></image>  
	  </view>
	  <view class="login">
		 	<view class="item">
				<image class="phoneImage" src="/static/cut/p.png"></image>
				<input type="number" placeholder="请输入手机号" v-model="phoneNumber"/>
			</view>	
			<view class="item" v-if="switchShow">
				<image class="verImage" src="/static/cut/confirm.png"></image>
				<input class="verInput" placeholder="请输入验证码" v-model="verificationCode"/>
				<view v-if="sendAuthCode" class="verification-code"  @tap="getAuthCode">获取验证码</view>
				<view v-if="!sendAuthCode">{{auth_time}}s</view>
			</view>	
			<view class="item" v-if="!switchShow">
				<image src="/static/cut/lock.png" class="lockImage"></image>
				<input placeholder="请输入密码" v-model="password"/>				
			</view>
			<!-- <view class="agreement"> 新用户登录即注册，并代表已阅读并同意<text @click="screen('center')">《天天生活用户协议》</text></view> -->
			<view class="theme-button" @tap="doLogin">登录</view>
			<view class="problem"><view @tap="switchLogin">{{switchText}}</view><view @tap="Goproblems">遇到问题</view></view>
			<view class="logontype">
				<image src="/static/cut/qqcircle.png" mode=""></image>
				<image src="/static/cut/wxcircle.png" mode=""></image>
			</view>
			<view class="content-bottom">登录代表已阅读并同意<text @tap="toAgree">《天天生活用户协议》</text></view>
	  </view>
  </view>
</template>

<script>
	import { mapMutations} from 'vuex';  
	import {LoginModel} from "../../common/models/login.js"
	let loginModel=new LoginModel()
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {
  components:{
  	uniPopup
  },	
  data () {
    return {
	  type:"",
      phoneNumber:"",
	  password:"",
	  verificationCode:"",
	  Invitation:"",
	  switchText:"密码登录",
	  sendAuthCode_if:false,  //验证码点击判断
	  switchShow:true,    //验证码密码登录切换
	  sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
	  auth_time: 0 /*倒计时 计数器*/
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
  methods: {
	Goproblems () {
		uni.navigateTo({
			url:"problems"
		})
	},
	toAgree(){
		uni.navigateTo({
			url:'/pages/login/agreement'
		})
	},
    switchLogin () {		
	  this.switchShow=!this.switchShow
	  if(this.switchShow){
		  this.switchText="密码登录"
	  }else{
		  this.switchText="验证码登录"
	  }
   },
   ...mapMutations(['login']),
	getAuthCode () {
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){
			this.$api.msg('请填写正确手机号码');
			return false; 
		}
		loginModel.getYzm(this.phoneNumber,1,(res)=>{
			this.$api.msg(res.data);
		})
		this.sendAuthCode_if=true;
	    this.sendAuthCode = false;
			this.auth_time = 60;
			var auth_timetimer =  setInterval(()=>{
				this.auth_time--;
				if(this.auth_time<=0){
					this.sendAuthCode = true;
					clearInterval(auth_timetimer);
				}
		}, 1000);
	},
	doLogin () {
		let phoneNumber=this.phoneNumber
		 let loginPassword=this.password 
		 let verificationCode=this.verificationCode
		 let Invitation=this.Invitation
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber))){
			
			this.$api.msg('请填写正确手机号码');
			return false; 
		}
		
		if(this.switchShow){ //确定那种方式登录
			if(!this.sendAuthCode_if){
				this.$api.msg('请获取验证码');
				return false
			}
			if(!(/^\d{6}$/.test(verificationCode))){
				this.$api.msg('请填写正确验证码');
				return false; 
			}
			loginModel.getCodeLogin(phoneNumber,verificationCode,Invitation,(res)=>{
				console.log(res)
				 this.login(res)
				uni.switchTab({
					url:'/pages/index/index'
				})
			})
		}else{
			if(!(/^[\w]{6,12}$/.test(loginPassword))){
				this.$api.msg('密码的格式为6-12位，只能是字母、数字和下划线');
				return false; 
			}
			// uni.showLoading({
			// 	mask:true
			// });
			loginModel.getLogin(phoneNumber,loginPassword,(res)=>{
				 this.login(res)
				 this.tim.login({userID:res.appuserId,userSig:res.userSig})
				 uni.switchTab({
				 	url:'/pages/index/index'
				 })
			})
		}
		
	},
	screen (type) {
		this.type = type
		this.$refs["popup"].open()
	}
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	.logo{
		display: flex;
		justify-content: center;
		image{
			width: 160rpx;
			height: 160rpx;
			border-radius:30rpx;
			margin-top:108rpx;
			margin-bottom: 100rpx;
		}
	}
	.login{		
		margin: 0 80rpx;
		.item{
			display: flex;
			align-items: center;
			border-bottom:1px solid rgba(200,200,200,1);
			padding: 52rpx 0 27rpx;
			.iconfont{
				margin:0 10rpx 0 5rpx;
			}
			.phoneImage{
				margin-right: 20rpx;
				width:26rpx;
				height:34rpx;
			}
			.verImage{
				margin-right: 20rpx;
				width:26rpx;
				height:30rpx;
			}
			.lockImage{
				margin-right: 20rpx;
				width:26rpx;
				height:31rpx;
			}
			.codeImage{
				margin-right: 20rpx;
				width:26rpx;
				height:27rpx;
			}
			.verInput{
				width:400rpx;
			}
			.verification-code{
				font-size:28rpx;
				color:$theme-text-color;
			}
		}
		.agreement{
			color:#8C8C8C;
			margin:20rpx 0 ;
			text{
				color: $theme-text-color;
			}
		}
		.theme-button{
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 60rpx;
		}
		
		.problem{
			display: flex;
			justify-content: space-between;
			margin:50rpx 0 120rpx 0;
			font-size:28rpx;
			font-weight:400;
		}
		.logontype{
			display: flex;
			justify-content: space-around;
			image{
				width: 96rpx;
				height: 96rpx;
			}
		}
	}
	.popup{
		.title{
			text-align: center;
			font-size: 30rpx;
		}
		view{
			line-height: 40rpx;
			text-indent: 40rpx;
			letter-spacing:6rpx;
			margin:30rpx 0;
		}
	}
	
	.content-bottom{
		text-align: center;
		text{
			color:#ff6600;
		}
	}
</style>

