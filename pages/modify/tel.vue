<template>
	<view>
		<view class="tel">
			<image class='image' src='/static/cut/p.png'></image>
			<input v-model="phoneNumber" placeholder="请输入手机号" type="number" class="phoneNumber"/>
			<image class='icon' @tap="clearPhone" src='/static/cut/delete.png'></image>
		</view>
		
		<view class="code">
			<view class="input">
				<image class="image" src="../../static/cut/confirm.png"></image>
				<input v-model="verificationCode" placeholder="请输入验证码"/>
			</view>
			<view class="send" @tap="getAuthCode">
				<view v-if="sendAuthCode">发送验证码</view>
				<view v-if="!sendAuthCode">{{auth_time}}s</view>
			</view>
		</view>
		
		<view class="long-button" @tap="doLogin">确认</view>
	</view>
</template>

<script>
	import { mapMutations} from 'vuex';  
	import {LoginModel} from "@/common/models/login.js"
	let loginModel=new LoginModel()
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {	
  data () {
    return {

      phoneNumber:"",
	  verificationCode:"",
	  sendAuthCode_if:false,  //验证码点击判断
	  sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
	  auth_time: 0 /*倒计时 计数器*/
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
  methods: {

   ...mapMutations(['login']),
   clearPhone(){
	   this.phoneNumber = "";
   },
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
		 let verificationCode=this.verificationCode
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber))){			
			this.$api.msg('请填写正确手机号码');
			return false; 
		}
		if(!this.sendAuthCode_if){
			this.$api.msg('请获取验证码');
			return false
		}
		if(!(/^\d{6}$/.test(verificationCode))){
			this.$api.msg('请填写正确验证码');
			return false; 
		}
		loginModel.getUpdatePhone(phoneNumber,verificationCode,(res)=>{
			console.log(res)
			 this.login(res)
			 uni.navigateBack()
		})
		
		
	}

},
}
</script>


<style lang="scss">
page{
	background-color: #fff;
}

.image{
	height:34rpx;
	width:26rpx;
}

.icon{
	width:22rpx;
	height:22rpx;
}

.tel{
	height:115rpx;
	margin-left:20rpx;
	margin-right:20rpx;
	border-bottom:1rpx solid #E6E6E6;
	display: flex;
	align-items: center;
	input{
		margin-left:20rpx;
		width:610rpx;
	}
}

.code{
	height:115rpx;
	display: flex;
	align-items: center;
	.input{
		display: flex;
		align-items: center;
		height:90%;
		display: flex;
		margin-left:20rpx;
		margin-right:20rpx;
		width:520rpx;
		border-bottom:1rpx solid #E6E6E6;
		input{
			margin-left:20rpx;
		}
	}
	.send{
		display: flex;
		align-items: center;
		height:90%;
		width:180rpx;
		font-size:28rpx;
		font-family:Source Han Sans CN;
		color:rgba(255,102,0,1);
		border-bottom:1rpx solid #E6E6E6;
	}
}

.long-button{
	margin-top:100rpx;
}
</style>
