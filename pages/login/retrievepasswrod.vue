<template>
	<view>
		<view class="retrieve">
				 	<view class="item">
						<image class="icon" src="../../static/cut/phone.png"></image>
						<input placeholder="请输入手机号" v-model="phoneNumber"/>
					</view>	
					<view class="item">
						<image class="icon1" src="../../static/cut/checkok.png"></image>
						<input placeholder="请输入验证码" v-model="verificationCode"/>
						<view v-if="sendAuthCode" class="verification-code"  @tap="getAuthCode">获取验证码</view>
						<view v-if="!sendAuthCode">{{auth_time}}s</view>
					</view>	
					<view class="item">
						<image class="icon2" src="../../static/cut/lock.png"></image>
						<input placeholder="设置密码" v-model="loginPassword"/>				
					</view>			
					<view class="theme-button" @tap="doLogin">确定</view>
					<view>手机号无法接收短信</view>
		</view>
	</view>
</template>

<script>
	import {LoginModel} from "../../common/models/login.js"
	let loginModel=new LoginModel()

export default {
  data () {
    return {
	  sendAuthCode_if:false,  //验证码点击判断
	  auth_time:0,
	  sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      phoneNumber:this.$store.state.uerInfo.phone||"",
      loginPassword:"",
      verificationCode:""
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
   methods: {
		getAuthCode () {
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){
				this.$api.msg('请填写正确手机号码');
				return false; 
			}
			loginModel.getYzm(this.phoneNumber,2,(res)=>{
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
			 let loginPassword=this.loginPassword 
			 let verificationCode=this.verificationCode
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber))){
				
				this.$api.msg('请填写正确手机号码');
				return false; 
			}
			if(!(/^\d{6}$/.test(verificationCode))){
				this.$api.msg('请填写正确验证码');
				return false; 
			}
			if(!(/^[\w]{6,12}$/.test(loginPassword))){
				this.$api.msg('密码的格式为6-12位，只能是字母、数字和下划线');
				return false; 
			}
			// uni.showLoading({
			// 	mask:true
			// });
			loginModel.getUpdatePassword(phoneNumber,verificationCode,loginPassword,(res)=>{
				console.log(res)
				uni.setStorage({
					key:"UserInfo",
					data:res,
					success:function(){			
						// uni.switchTab({
						//     url: '/pages/index/index'
						// });
					}
				})
			})	
		},
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	.icon{
		width:26rpx;
		height:34rpx;
		margin-right: 10rpx;
	}
	.icon1{
		width:26rpx;
		height:30rpx;
		margin-right: 10rpx;
	}
	.icon2{
		width:26rpx;
		height:30rpx;
		margin-right: 10rpx;
	}
	.retrieve{
		margin:80rpx;
		.item{
			display: flex;
			align-items: center;
			border-bottom:1px solid rgba(200,200,200,1);
			padding: 52rpx 0 27rpx;
			.iconfont{
				margin:0 10rpx 0 5rpx;
			}
			.verification-code{
				font-size:28rpx;
				color:$theme-text-color;
			}
		}
		.theme-button{
			height: 80rpx;
			line-height: 80rpx;
			margin: 60rpx 0;
		}
	}
</style>
