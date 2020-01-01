<template>
  <view>
	  <view class="logo">
		  <image src="../../static/cut/logo.png" mode=""></image>  
	  </view>
	  <view class="login">
		 	<view class="item">
				<image class="phoneImage" src="/static/cut/p.png"></image>
				<input placeholder="请输入手机号" v-model="phoneNumber"/>
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
			<view class="item">
				<image class="codeImage" src="/static/cut/shorttext.png"></image>
				<input placeholder="请输入邀请码(选填)" v-model="Invitation"/>
			</view>	
			<view class="agreement"> 新用户登录即注册，并代表已阅读并同意<text @click="screen('center')">《天天生活用户协议》</text></view>
			<view class="theme-button" @tap="doLogin">登录</view>
			<view class="problem"><view @tap="switchLogin">{{switchText}}</view><view @tap="Goproblems">遇到问题</view></view>
			<view class="logontype">
				<image src="/static/cut/qqcircle.png" mode=""></image>
				<image src="/static/cut/wxcircle.png" mode=""></image>
			</view>
	  </view>
	 <uni-popup ref="popup" :type="type">
		 <view class="popup">
			 <view class="title">用户协议</view>
			 <view> 本人同意该软件的安装和其运作及有关服务并接受下列条款及条件管限。</view>
			 <view> 特别提示：</view>
			 <view>
				    为了您更好使用《天天生活》平台的服务，您应当阅读并遵守《天天生活》和《天天生活隐私权条款》。本协议是用户在使用天天生活平台的法律协议，是用户注册天天生活平台账号和/或使用天天生活服务时使用的通用条款。请您务必审慎阅读、充分理解各条款内容，特别是关于用户信息的使用范围、免责条款、管辖与法律适用条款。用户信息的使用范围、免责条款可能以黑体加粗或/和加下划线的形式提示您重点注意。您不应当以天天生活未对本协议以合理方式提醒用户注意或未根据用户要求尽到说明义务为理由而声称或要求法院或其它任何第三方确认相关条款非法或无效。除非您已阅读并接受本协议所有条款，否则您无权使用天天生活提供的服务。您使用天天生活提供的服务即视为您已阅读并同意上述协议的约束。
			</view>
			 <view>	 
				 天天生活平台可能会根据需要不时修订或者更新本协议及其相关补充和附件、平台规则、单项服务规则等文件，修订或更新后的协议和文本一经公布，立即取代原协议和文件，并自动生效。如果您不接受相关修订和更新，请立即停止使用天天生活提供的服务；如您继续使用平台提供的服务，即表示您已经充分接受该修订或更新。
			</view>
				 <view>
				 前言
				 </view>
				 <view>
				 天天生活系深圳市时光轴科技有限公司（以下简称“本公司”）旗下的品牌，即天天生活电子商务平台。本协议（未成年人应在监护人陪同下阅读）描述天天生活提供的服务及用户的责任， 用户（以下简称“用户”或“您”）注册时点击“同意”按钮既表示仔细阅读过本协议并接受本协议全部条款，在用户点击“同意”之时本协议生效。
				 <br>
				 1、在进行注册过程中只要您点击注册页面的"注册"按钮并按照天天生活平台注册程序成功注册为用户，即表示您同意并签署了本服务协议，本服务协议即在您和天天生活之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，如有任何疑问，可向本网站客服咨询。
				 <br>
				 2、用户一经注册天天生活平台帐号，除非子频道要求单独开通权限，用户有权利用该帐号使用天天生活平台各个频道的单项服务，当用户使用天天生活平台各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及天天生活在该单项服务中发出的各类公告的同意。
				  <br>
				 3、用户注册成功后，天天生活平台将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管，该账号所有权属于天天生活，该账号的使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。除天天生活平台过错外，用户就其账户及密码项下的之一切活动负全部责任，而无论该活动是否对用户自身或第三方造成任何损害。
				  <br>
				 4、用户应提供详尽及准确的个人资料，并当用户信息发生变更时应不断更新个人资料，所有原始键入的资料将引用为注册资料。如果因注册信息不真实或更新不及时而引发的相关问题，天天生活平台不负任何责任，由用户承担。
				  <br>
				 5、用户提交的注册信息等资料中不得出现违法和不良信息，经天天生活平台审核，如存在上述情况，天天生活将不予注册；同时，在注册后，如发现用户注册信息存在违法和不良信息的，天天生活有权不经通知单方采取限期改正、暂停使用、注销登记、收回等措施。 天天生活对用户提交的注册资料等信息予以审核通过并不代表天天生活对其予以任何批准、许可、授权、同意或者支持，用户仍然应当自行承担其法律责任，且天天生活保留进行后续不时审核并予以处理的权利。
				  <br>
				 6，天天生活承诺非经法定原因、本协议的约定或您的事先许可，天天生活不会向任何第三方透露您的注册账号、手机号码等非公开信息。如您发现您的帐号遭他人非法使用，应立即通知天天生活，您理解天天生对用户的任何请求采取行动均需要合理时间，因此，除天天生活存在重大过错外，天天生活对在采取行动前已产生的后果不承担任何责任。互联网上不排除因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，此类情况与天天生活无关。
				</view>
				 <view>
				 有限责任/担保
				 </view>
				 <view>
				 本网站不是交易的任何一方，亦非任何一方的代理，只是作为寻求服务方和提供服务方的平台，不承担与交易有关的任何责任。用户及访问者同意按照本网站所提供的服务使用本网站，本网站不提供对于任何一方身份认定、履约能力、信息准确性、产品质量、数量、适用性、打印错误及其他任何形式的担保。用户及访问者同意尽可能准确真实地输入所有信息。
				 </view>
				 <view>
				 通讯
				 </view>
				 <view>
				 本网站所提供的一切与通讯有关的服务遵守国家的政策和法律。涉及第三方的服务除遵守国家的政策和法律外还同时遵守第三方的约定。如因本网站以外的原因导致有关的服务无法继续或收费改变，用户及提供服务方同意自行承担责任和义务。
				 </view>
				 <view>
				 不可抗力
				 </view>    
				 <view>
				 对于因本公司合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、政府行为、通讯或其他设施故障或严重伤亡事故等，致使本公司延迟或未能履约的，天天生活不对您承担任何责任。
				 <view>
				 无代理关系
				 </view>
				 <view>
				 您与天天生活仅为独立订约人关系。本协议无意结成或创设任何代理、合伙、合营、雇用与被雇用或特许权授予与被授予关系。
				 </view>
				 <view>
				 法律管辖
				 </view>
				 <view>
				 本协议受中华人民共和国法律管辖及保护，任何有关方同意将与本协议有关的争议提交法院裁决。
				 </view>
				 <view>
				 其他规定
				 </view>
				 <view>
				 本协议构成您和天天生活之间的会员协议，规定了您对“服务”的使用。本协议受中华人民共和国大陆地区法律的管辖。倘若本协议任何规定被裁定为无效或不可强制执行，该项规定应被撤销，而其余规定应予执行。条款标题仅为方便参阅而设，并不以任何方式界定、限制、解释或描述该条款的范围或限度。本公司如果未就您或其他人士的某项违约行为采取行动，并不表明本公司撤回就任何继后或类似的违约事件采取行动的权利。
				  </view>                      
			 </view>
		 </view>
	
	 </uni-popup>
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
				 uni.navigateBack()
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
				console.log(res)
				 this.login(res)
				 uni.navigateBack()
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
			margin:60rpx 0;
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
</style>

