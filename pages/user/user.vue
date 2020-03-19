<template>
	<view>
		<view v-if="!hasLogin" class="hasLogin">
			<view>
				<image src="../../static/notlogged.png" mode=""></image>
			</view>
			<view class="title">
				<text>登录后可查看“我的”页面</text>
			</view>
			<view class="theme-button" @tap="navToLogin"><text>立即登录</text></view>
		</view>

		<view v-else>
			<view class="use-top">
				<view class="sweep-code">
					<image class="scan" src="../../static/cut/sweep-code.png" @tap="scanCode" mode=""></image>
					<image @tap="toMySetting()" class="setting" src="/static/cut/settings.png"></image>
				</view>
				<view class="my-message">
					<view class="lf" @tap="goUserInfo()">
						<image class="portrait-img" :src="uerInfo.logoImg" mode=""></image>
						<view class="information">
							<view class="names">
								<text>{{uerInfo.nickname}}</text>
								<image v-if="uerInfo.personalCerStatus==3&&uerInfo.companyCerStatus!=3" src="../../static/cut/lable.png" mode=""></image>
								<image v-if="uerInfo.companyCerStatus==3" src="../../static/cut/portrait.png" mode=""></image>
							</view>
							<text v-if="uerInfo.loginName!=null">
								ID：{{uerInfo.loginName}}
							</text>
						</view>
					</view>
					<view class="rt" @tap="toMyAttendance()">
						{{isAttendance==1?'已签到':'签到'}}
					</view>
				</view>
				<view class="service-block">
					<view @tap="toMyComment()" class="item">
						<text>{{commentCount}}</text>
						<view>我的评价</view>
					</view>
					<view  @tap="toMyCollection()" class="item">
						<text>{{collectCount}}</text>
						<view>我的收藏</view>
					</view>
					<view @tap="toMyAttendance()" class="item">
						<text>{{store}}</text>
						<view>我的积分</view>
					</view>
					<view class="item" @tap="toMyRecord">
						<text>{{historyRecordCount}}</text>
						<view>访问记录</view>
					</view>
				</view>
				<view class="provide">
					<view class="upper" @tap="toMyWallet()">
						<view class="lf">
							<text class="my-provide">我的提供</text>
						</view>
						<view class="rt">
							<text>查看全部订单</text>
							<image src="/static/cut/grayright.png"></image>
						</view>
					</view>
					<view class="lower">
						<view class="orderType" @tap="toSellerOrder(0)">
							<image src="/static/cut/user/waitingorder.png"></image>
							<view class="title">待接单</view>
						</view>
						<view class="orderType" @tap="toSellerOrder(1)">
							<image src="/static/cut/user/dealingorder.png"></image>
							<view class="title">待处理</view>
						</view>
						<view class="orderType" @tap="toSellerOrder(2)">
							<image src="/static/cut/user/dealedorder.png"></image>
							<view class="title">已处理</view>
						</view>
						<view class="orderType" @tap="toSellerOrder(3)">
							<image src="/static/cut/user/completeorder.png"></image>
							<view class="title">已完成</view>
						</view>
						<view class="orderType" @tap="toSellerOrder(4)">
							<image class="backImage" src="/static/cut/user/backdealorder.png"></image>
							<view class="title">退款中</view>
						</view>
					</view>
				</view>
			</view>
			<view class="use-main">
				<view class="advertisement"></view>
				<view class="wallet-box">
					<view class="upper">
						<view class="lf" @tap="toMyWallet()">
							<image class="walletImg" src="/static/cut/discenter_icon2.png"></image>
							<text class="my-wallet">我的钱包</text>
							<image v-if="moneyShow" @tap.stop="isMoneyShow" src="/static/cut/show.png"></image>
							<image v-else  @tap.stop="isMoneyShow" src="/static/cut/hide.png"></image>
						</view>
						<view class="rt" @tap="toWalletDetail()">
							<text class="gray">查看明细</text>
							<image src="/static/cut/grayright.png"></image>
						</view>
					</view>
					<view class="lower">
						<view class="lf" @tap="toMyWallet()">
							<text class="balance">余额：</text>
							<text v-if="moneyShow">{{withdrawYuMoney}}</text>
							<text v-else>****</text>
						</view>
						<view class="rt">
							<view class="button cashOut" @tap="toCashout()">提现</view>
							<view class="charge button" @tap="charge()">充值</view>
						</view>
					</view>
				</view>
				<view class="service-block">
					<view class="top">
						<image src="../../static/cut/func.png" mode=""></image>
						<text>常用功能</text>
					</view>
					<view class="main">
						<view class="item" @tap="toQrcode()">
							<view class='icon'>
								<image src="/static/cut/user/payCode.png" mode="widthFix"></image>
							</view>
							<text>收付款码</text>
						</view>
						<view class="item" @tap="toMyStore">
							<view class='icon'>
								<image src="/static/cut/user/mystore.png" mode="widthFix"></image>
							</view>
							<text>我的店铺</text>
						</view>
						<view class="item" @tap="toCardPackage()">
							<view class='icon'>
								<image src="../../static/cut/ionc-b.png" mode="widthFix"></image>
							</view>
							<text>我的卡包</text>
						</view>
						<view class="item" @tap="toBill()">
							<view class='icon'>
								<image src="../../static/cut/ionc-c.png" mode="widthFix"></image>
							</view>
							<text>我的账单</text>
						</view>
						<view class="item"  @tap="sendBill()">
							<view class='icon'>
								<image src="/static/cut/user/sendbill.png" mode="widthFix"></image>
							</view>
							<text>发送账单</text>
						</view>
						<view class="item" @tap="toAgreement()">
							<view class='icon'>
								<image src="../../static/cut/ionc-d.png" mode="widthFix"></image>
							</view>
							<text>我的合同</text>
						</view>
						<view class="item" @tap="toColleague()">
							<view class='icon'>
								<image src="/static/cut/user/mymate.png" mode="widthFix"></image>
							</view>
							<text>我的同事</text>
						</view>
						<!-- <view class="item">
							<view class='icon'>
								<image src="../../static/cut/ionc-f.png" mode="widthFix"></image>
							</view>
							<text>我的收藏</text>
						</view> -->
						<view class="item" @tap="toMyCoupon()">
							<view class='icon'>
								<image src="../../static/cut/ionc-g.png" mode="widthFix"></image>
							</view>
							<text>我的优惠券</text>
						</view>
						
					</view>
				</view>
				<view class="service-block">
					<view class="top">
						<image class="qt" src="../../static/cut/other.png" mode="widthFix"></image>
						<text>其他功能</text>
					</view>
					<view class="main">
						<view class="item" @tap="toRetailCenter()">
							<view class='icon'>
								<image src="/static/cut/user/retailcnnter.png" mode="widthFix"></image>
							</view>
							<text>分销中心</text>
						</view>
						<!-- <view class="item" >
							<view class='icon'>
								<image src="../../static/cut/ionc-k.png" mode="widthFix"></image>
							</view>
							<text>我的评价</text>
						</view> -->
						<view class="item" @tap="toMyPoints()">
							<view class='icon'>
								<image src="../../static/cut/ionc-h.png" mode="widthFix"></image>
							</view>
							<text>我的积分</text>
						</view>
						<view class="item" @tap="toShare()">
							<view class='icon'>
								<image src="../../static/cut/ionc-l.png" mode="widthFix"></image>
							</view>
							<text>邀请有礼</text>
						</view>
						<view class="item"  @tap="toChat()">
							<view class='icon'>
								<image src="../../static/cut/ionc-m.png" mode="widthFix"></image>
							</view>
							<text>客服中心</text>
						</view>
					</view>
				</view>
				<!-- <view @click="logOut()" class="theme-button">退出</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {UserModel} from "../../common/models/user.js"
	let userModel=new UserModel()
	import {LoginModel} from '../../common/models/login.js'
	let loginModel = new LoginModel();
	import {CheckModel} from '../../common/models/check.js';
	let checkModel = new CheckModel();
	import {StoreModel} from '../../common/models/store.js';
	let storemodel = new StoreModel();
	import {mapState,mapMutations} from 'vuex';
export default{
	data () {
		return{
			name:'',
			userid:'',
			money: '',
			isAttendance:'',
			moneyShow:true,
			store:'',
			commentCount:'',
			collectCount:'',
			withdrawYuMoney:'',
			historyRecordCount:''
		}
	},
	computed: {
		...mapState(['hasLogin','uerInfo'])
	},  
	onLoad:function(){
		
	},
	onShow:function(){
		if(this.hasLogin){
			checkModel.getUserInfo(data=>{
				this.store = data.store
				this.commentCount = data.goodCommentCount
				this.collectCount = data.collectCount
				this.withdrawYuMoney = data.withdrawYuMoney
				this.historyRecordCount = data.historyRecordCount
			})
		}
		
		// 查询是否签到
		if(this.hasLogin){
			checkModel.getSignSelect({},data=>{
				this.isAttendance = data.isTodaySign;
				console.log(this.isAttendance);
			})
		}
		
		// 查询是否授权登录
		// #ifndef H5
		uni.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']){
					
				}else{
					uni.navigateTo({
						url: '/pages/login/getUserinfo' //跳转到授权页面
					})
				}
			}
		})
		// #endif
		// 检测授权是否过期
		// #ifndef H5
		// uni.checkSession({ //检测当前用户的session_key是否过期
		// 	success: function () { //session_key 未过期，并且在本生命周期一直有效
		// 		console.log("授权未过期")
		// 		return ;
		// 	},
		// 	fail: function () { //session_key 已经失效，需要重新执行登录流程
		// 		console.log("授权过期")
		// 		uni.navigateTo({
		// 			url: '/pages/login/getUserinfo' //重新授权
		// 		})
		// 	} 
		// })
		// #endif
		
		uni.getStorage({
		    key: 'uerInfo',
		    success: (res)=>{
				console.log(res)
				let data=res.data;
				this.name=data.nickname;
				this.userid=data.appuserId;
				this.money=data.withdrawYuMoney;
		      
		    }
		});
	},
	methods:{
		...mapMutations(["login"]),
		toChat(){
			let that = this
			uni.request({
				url:'https://sgz.wdttsh.com/app/systemparam/getServiceInfo',
				method:'POST',
				success(res){
					that.$store.commit('resetCurrentConversation')
					that.$store.commit('resetGroup')
					that.tim.getConversationProfile(`C2C${res.data.data.serviceId}`)
						.then((result) => {
							that.$store.commit('updateCurrentConversation',result.data.conversation)
							that.$store.dispatch('getMessageList')
						}) 
					uni.navigateTo({
						url:"/pages/msg/chat?toAccount="+ res.data.data.serviceNickname
					})
				}
			})
		},
		navToLogin(){
			// uni.navigateTo({
			// 	url:"../login/login"
			// })
			// #ifdef H5
			uni.navigateTo({
				url: "/pages/login/login"
			})
			// #endif
			
			// #ifndef H5
			var that = this;
				console.log(uni.getStorageSync('sessionkey'));
			if(uni.getStorageSync('sessionkey')==''){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					console.log(loginRes);
					loginModel.getOpenid(loginRes.code,(data)=>{
						// 获取用户信息
						uni.getUserInfo({
						  provider: 'weixin',
						  success: function (infoRes) {150
							console.log(infoRes.userInfo);
							
							data.nickname = infoRes.userInfo.nickName;
							data.sex = infoRes.userInfo.gender;
							data.logoImg = infoRes.userInfo.avatarUrl;
							
							uni.setStorageSync('sessionkey',data.sessionkey);
							console.log(uni.getStorageSync('sessionkey'));
							that.login(data)
						  }
						});
					})
				  }
				});
			}
			// #endif
		},
		toQrcode(){
			uni.navigateTo({
				url:'/pages/user/qrcode/qrcode?type=0'
			})
		},
		scanCode(){
			// #ifndef H5
			uni.scanCode({
			    onlyFromCamera: true,
			    success: function (res) {
					console.log(res);
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
			    }
			});
			// #endif
		},
		goUserInfo(){
			uni.navigateTo({
				url:'../modify/userinfo'
			})
		},
		toMyWallet(){
			uni.navigateTo({
				url:'../wallet/mywallet'
			})
		},
		toWalletDetail(){
			uni.navigateTo({
				url:'/pages/wallet/detail'
			})
		},
		toMyCoupon(){
			uni.navigateTo({
				url:'../wallet/coupon'
			})
		},
		toMyPoints(){
			uni.navigateTo({
				url:'../wallet/points'
			})
		},
		toRetailCenter(){
			uni.navigateTo({
				url:'/pages/user/distribution/dis_center'
			})
		},
		toMyCollection(){
			uni.navigateTo({
				url:'collection/collection'
			})
		},
		toMySetting(){
			uni.navigateTo({
				url:'/pages/settings/setting'
			})
		},
		toCashout(){
			uni.navigateTo({
				url:'../wallet/cashout?name='+this.name+'&money='+this.money
			})
		},
		charge(){
			uni.navigateTo({
				url:'../wallet/charge'
			})
		},
		toCardPackage(){
			uni.navigateTo({
				url:'card/cardpackage'
			})
		},
		toAgreement(){
			uni.navigateTo({
				url:'agreement/agreement'
			})
		},
		toColleague(){
			uni.navigateTo({
				url:'colleague/colleague'
			})
		},
		sendBill() {
			uni.navigateTo({
				url:'sendBill/sendBill'
			})
		},
		toBill(){
			uni.navigateTo({
				url:'bill/bill'
			})
		},
		toMyComment(){
			uni.navigateTo({
				url:'comment/mycomment'
			})
		},
		toMyAttendance(){
			uni.navigateTo({
				url:'attendance/attendance'
			})
		},
		toShare(){
			uni.navigateTo({
				url:'share/share'
			})
		},
		toMyRecord(){
			uni.navigateTo({
				url:'/pages/user/record/visitrecord'
			})
		},
		isMoneyShow(){
			this.moneyShow = !this.moneyShow
		},
		toSellerOrder(index){
			userModel.getInfo((data)=>{
				if(data.personalCerStatus==3||data.companyCerStatus==3){
					if(data.storeId==null){
						uni.navigateTo({
							url:'/pages/user/store/mystore?storeId=' + data.storeId
						})
					}else{
						storemodel.getSellerStore({sellerId: data.storeId},(res)=>{
							uni.navigateTo({
								url:'/pages/user/sellerorder/sellerorder?type=' + index + '&id=' + res.firstTypeId
							})
						})
					}
				}else{
					uni.showModal({
						title:'您还没有认证，请先做认证',
						confirmText:'去认证',
						success(res){
							if(res.confirm){
								uni.navigateTo({
									url:'/pages/modify/certification'
								})
							}
						}
					})
				}
			})
		},
		toMyStore(){
			userModel.getInfo((data)=>{
				if(data.personalCerStatus==3||data.companyCerStatus==3){
					storemodel.getSellerStore({sellerId: data.storeId},(res)=>{
						uni.navigateTo({
							url:`/pages/shop/myStore?sellerId=${data.storeId}&type=${res.firstTypeId}`
						})
					})
				}else if(data.personalCerStatus==1&&data.companyCerStatus==1){
					uni.navigateTo({
						url:'/pages/user/store/openStore'
					})
				}else if(data.personalCerStatus==2||data.companyCerStatus==2){
					uni.navigateTo({
						url:'/pages/user/store/verify'
					})
				}else if(data.personalCerStatus==4||data.companyCerStatus==4){
					uni.navigateTo({
						url:'/pages/user/store/verifyFailed?reason=' + data.personalCerReason
					})
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.use-top{
		max-width: 100%;
		height: 478rpx;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAHeCAYAAADEj476AAAgAElEQVR4Xu3dibIryZ0X4KzT7bavTQwzHgjzGGbc9mMAw77DEEAQwc6wDGuw7zA8JcFMONw9Xo7s7nslonRU6lSpSqqSasvM70a03fccVVbm96+WfidPVlZ1+O3vfh6q8EnwhwABAgQIECBAgACBbQocwhfV4f9894sQwte22UO9IkCAAAECBAgQIEAghPBlHdxfQwjvcBAgQIAAAQIECBAgsFmBneC+2droGAECBAgQIECAAIGzgODuYiBAgAABAgQIECCQgIDgnkCRdJEAAQIECBAgQICA4O4aIECAAAECBAgQIJCAgOCeQJF0kQABAgQIECBAgIDg7hogQIAAAQIECBAgkIDArjr8tu0gEyiULhIgQIAAAQIECJQtILiXXX+jJ0CAAAECBAgQSERAcE+kULpJgAABAgQIECBQtoDgXnb9jZ4AAQIECBAgQCARAcE9kULpJgECBAgQIECAQNkCgnvZ9Td6AgQIECBAgACBRAQE90QKpZsECBAgQIAAAQJlCwjuZdff6AkQIECAAAECBBIRENwTKZRuEiBAgAABAgQIlC0guJddf6MnQIAAAQIECBBIREBwT6RQukmAAAECBAgQIFC2gOBedv2NngABAgQIECBAIBGBXXX43999DSG8S6TDukmAAAECBAgQIECgRAHBvcSqGzMBAgQIECBAgEByAoJ7ciXTYQIECBAgQIAAgRIFBPcSq27MBAgQIECAAAECyQkI7smVTIcJECBAgAABAgRKFBDcS6y6MRMgQIAAAQIECCQnILgnVzIdJkCAAAECBAgQKFFAcC+x6sZMgAABAgQIECCQnIDgnlzJdJgAAQIECBAgQKBEAcG9xKobMwECBAgQIECAQHICgntyJdNhAgQIECBAgACBEgUE9xKrbswECBAgQIAAAQLJCeyqw//67msI4V1yXddhAgQIECBAgAABAuUICO7l1NpICRAgQIAAAQIEEhYQ3BMunq4TIECAAAECBAiUIyC4l1NrIyVAgAABAgQIEEhYQHBPuHi6ToAAAQIECBAgUI6A4F5OrY2UAAECBAgQIEAgYQHBPeHi6ToBAgQIECBAgEA5AoJ7ObU2UgIECBAgQIAAgYQFBPeEi6frBAgQIECAAAEC5QgI7uXU2kgJECBAgAABAgQSFthV+//pyakJF1DXCRAgQIAAAQIEyhAQ3Muos1ESIECAAAECBAgkLiC4J15A3SdAgAABAgQIEChDQHAvo85GSYAAAQIECBAgkLiA4J54AXWfAAECBAgQIECgDAHBvYw6GyUBAgQIECBAgEDiAoJ74gXUfQIECBAgQIAAgTIEBPcy6myUBAgQIECAAAECiQvUwf0Pv4YQ3iU+EN0nQIAAAQIECBAgkLOA4J5zdY2NAAECBAgQIEAgGwHBPZtSGggBAgQIECBAgEDOArtq/z8slcm5wsZGgAABAgQIECCQhYDgnkUZDYIAAQIECBAgQCB3AcE99wobHwECBAgQIECAQBYCgnsWZTQIAgQIECBAgACB3AUE99wrbHwECBAgQIAAAQJZCAjuWZTRIAgQIECAAAECBHIXENxzr7DxESBAgAABAgQIZCEguGdRRoMgQIAAAQIECBDIXUBwz73CxkeAAAECBAgQIJCFwK7a/3cPYMqilAZBgAABAgQIECCQs4DgnnN1jY0AAQIECBAgQCAbAcE9m1IaCAECBAgQIECAQM4CgnvO1TU2AgQIECBAgACBbAQE92xKaSAECBAgQIAAAQI5CwjuOVfX2AgQIECAAAECBLIRENyzKaWBECBAgAABAgQI5CwguOdcXWMjQIAAAQIECBDIRkBwz6aUBkKAAAECBAgQIJCzwK7a/zcPYMq5wsZGgAABAgQIECCQhYDgnkUZDYIAAQIECBAgQCB3AcE99wobHwECBAgQIECAQBYCgnsWZTQIAgQIECBAgACB3AUE99wrbHwECBAgQIAAAQJZCAjuWZTRIAgQIECAAAECBHIXENxzr7DxESBAgAABAgQIZCEguGdRRoMgQIAAAQIECBDIXUBwz73CxkeAAAECBAgQIJCFwK7a/1cPYMqilAZBgAABAgQIECCQs4DgnnN1jY0AAQIECBAgQCAbAcE9m1IaCAECBAgQIECAQM4CgnvO1TU2AgQIECBAgACBbAQE92xKaSAECBAgQIAAAQI5CwjuOVfX2AgQIECAAAECBLIRENyzKaWBECBAgAABAgQI5CwguOdcXWMjQIAAAQIECBDIRkBwz6aUBkKAAAECBAgQIJCzwK7a/xcPYMq5wsZGgAABAgQIECCQhYDgnkUZDYIAAQIECBAgQCB3AcE99wobHwECBAgQIECAQBYCgnsWZTQIAgQIECBAgACB3AUE99wrbHwECBAgQIAAAQJZCAjuWZTRIAgQIECAAAECBHIXENxzr7DxESBAgAABAgQIZCEguGdRRoMgQIAAAQIECBDIXWBX7f+zfdxzr7LxESBAgAABAgQIJC8guCdfQgMgQIAAAQIECBAoQUBwL6HKxkiAAAECBAgQIJC8gOCefAkNgAABAgQIECBAoAQBwb2EKhsjAQIECBAgQIBA8gKCe/IlNAACBAgQIECAAIESBAT3EqpsjAQIECBAgAABAskLCO7Jl9AACBAgQIAAAQIEShDYVfv/ZB/3EiptjAQIECBAgAABAkkLCO5Jl0/nCRAgQIAAAQIEShEQ3EuptHESIECAAAECBAgkLSC4J10+nSdAgAABAgQIEChFQHAvpdLGSYAAAQIECBAgkLSA4J50+XSeAAECBAgQIECgFAHBvZRKGycBAgQIECBAgEDSAoJ70uXTeQIECBAgQIAAgVIEdtX+P9rHvZRqGycBAgQIbESg6ujH4fS15nvN3zfSZd0gQGB1AcF99RLoAAECBAgQIECAAIH7AoL7fSOvIECAAAECEwq0Z9vjv9ez7PXf49l2M+8T4muKQNICgnvS5dN5AgQIEEhLoA7l9T8vhxA+CqF6Of29GcUhhEMd1Penfz6cUr3wnlad9ZbAPAKC+zyuWiVAgAABApHAMbAfQvVxOAb2Y3hv/umCqoP66Z/D+xBCHeCbr4ElQKBUAcG91MobNwECBAgsJFAH9Dqsf3x4m2Gv/3TdnNoX4Ouv70O4CPALdd1pCBDYlIDgvqly6AwBAgQI5CVQB/Q6sDez7M+Mrg7vH6LZ92faciwBAikKCO4pVk2fCRAgQCABgeNM+yGEZh370Fn2vqE1S2Xq9e/N0pkEGHSRAIHJBHbVh/9gH/fJODVEgAABAgRqgSq8zbK3bz59Vqe5SbWZfXfT6rOijieQkoDgnlK19JUAAQIEEhF46dgx5hToR4+gK5zXu880O8+MbtABBAgkKiC4J1o43SZAgACBLQvUwf3Wfu2P9L0V4M/bRj7SlmMIEEhRQHBPsWr6TIAAAQIbF+jY6rGd45tnLbVH0uTz5jlMzXFXE++2h9z4RaB7BCYXENwnJ9UgAQIECJQtsPS682dvei27WkZPICUBwT2laukrAQIECGxcoF53fvxzemBS9NfjA5Se+dNMwcdt1o02wV2Af0bXsQRSEBDcU6iSPhIgQIBAAgJ1MN8v/ITTOqy/nMK74J7ARaKLBJ4SENyf4nMwAQIECJQt0J5Fr/dXr7dqbH19qkx9tf79GNyj8H4xGx+Vpm9BfdnVM3oCqQnsqg//3j7uqVVNfwkQIEBggwL1Fo1fViHUTzdd8s9HIVRfi5bMLHlu5yJAYEkBwX1JbeciQIAAgYwF6pn2X9Qz7tH8entG/pmp97ituJ2XQ6i+fnpCa8a8hkaAQBDcXQQECBAgQGASgTq4715WmHE/hOqd4D5JDTVCYNsCgvu266N3BAgQIJCMwD6E/c8WDu71LPzHh/DyLcE9metERwk8LiC4P27nSAIECBAgEAnUwf2nVQj1Ovcl/jRLZ74uuC/B7RwENiAguG+gCLpAgAABAjkI1MH9tQqh/meJP01w/9YhvHzTjPsS5M5BYGUBwX3lAjg9AQIECOQicAhhX9+c+nsvxy0hzw9Gmmt8xy0eD6H6lX2oPlngfHONQ7sECAwV2FUf/p3tIIdqeR0BAgQIELglcKhn3X/48tVymTkn3+vg/rVDePkD+1DVe7n7Q4BA7gKCe+4VNj4CBAgQWFZg/+OXcPi9U2Kv/6+9JeQz3Wl+EDi1Wf3+fXj5pSlP8EznHEuAwMwCdXD/tdcQwruZT6R5AgQIECCQv0AVwuF9CPv/V4XwRfX2VNOp/9Q5vV6K841DePnOIVQfTX0C7REgsFEBwX2jhdEtAgQIEEhY4PBahf3vvLzNtk+9XOa0fr76zv5tG0h/CBAoRUBwL6XSxkmAAAECCwmclsfsf1iF/een8P7szHvdZv2Ap1No/+jbh1B9ex+qqX8oWIjIaQgQeEhAcH+IzUEECBAgQOCWwCm8f/i/L+Hwk1O6fja8f3ibvT+ua6+XyNTtmXB3HRIoSUBwL6naxkqAAAECCwrU693rXWZ+9yXsf1QdZ8yPYbsJ8Pdmy5tQfpppr9eyv/zyPlRC+4JFdCoCmxLYVR/+rZtTN1USnSFAgACBfATqkF6H9x9XYf+7p6eqNuvem+DeDvBNYK///3BaJv/JIbz86iG8fPvwtma+XjLjDwECpQkI7qVV3HgJECBAYB2Bw5chfPjsJRw+fwvwh2ZLx6Y7TWCvZ+rrVTF1QK/3af/lfXj5lcPbQ5YsjVmneM5KYBsCgvs26qAXBAgQIJC9QDOzXm8X+dMqHHee2Z22jTytXw8f1QH9EKpvhFD9vsPbrjHNdo9Ce/aXiAESuCMguLtECBAgQIDAYgLxsphoKUx9/osVM+1lNEL7YiVyIgIbFhDcN1wcXSNAgACBnAXqcN53g+op1Oc8fGMjQGC0gOA+mswBBAgQIECAAAECBJYXENyXN3dGAgQIECBAgAABAqMFTsH9EN6NPtQBBAgQIECAAAECBAgsI1AFwX0ZaWchQIAAAQIbErh186sbYTdUKF0hEAkI7i4HAgQIECBQkEB1COHjEKqPQwgfH96e4loH9fqBTh+qcHgfQqj/Odx7rGtBZoZKYCsCgvtWKqEfBAgQIEBgZoGPD6H62im4d+1oUz+ltQ7x70M4fFkdg7wHPs1cE80TGCMguI/R8loCBAgQIJCowEeHEOoHOzUPc7o1jNMM/OGLU3hPdMi6TSA7AcE9u5IaEAECBAgQuBSol8PUs+1DQnt05KF+muv76m0ZjT8ECKwvILivXwM9IECAAAECswnUS2JeTmvZbzzwqf7WxT2pzQOgTmvfZ+ufhgkQGC4guA+38koCBAgQILB5gTpwt+8rrYN7/Wfs/aZNkt+PPXDzSjpIIE2BY3D/N7/2GoJ93NOsoF4TIECAAAECBAgUIiC4F1JowyRAgACB0gTqXWLqpS7P7sv+EkJ1Y5lNaazGS2BFAcF9RXynJkCAAAECswkct3b88rQn+zPh/aXeRvKBpTazjUzDBIoVENyLLb2BEyBAgEDWAvVs++HnrV1hhgb4Zll7/fqPQqi+cQhVvTuNPwQIrCkguK+p79wECBAgQGAugWNw/1n19iTUR//Uwf2TEF6+edqZ5tF2HEeAwBQCgvsUitogQIAAAQKbE9iHsK+Dez3r3rXbzL0ON5vRfPMQKsH9npbvE1hCQHBfQtk5CBAgQIDAIgLxUpg6r/+8CvvPT8tlxu7qWN/Y+hLCy7f3ofqk1fuxbS0yeCchkL3Arvrwr20HmX2ZDZAAAQIEyhQ4hPDhh1U4vNYJ/LQ7zACJ442t+xBevrUPL796GL8H/IBzeAkBAqMFBPfRZA4gQIAAAQKpCNSz7r8I4cPvvITDF9XbDaa3tnY8BfbDhxCqd4fw0Xf2bzvK+EOAwBYEBPctVEEfCBAgQIDAnAL7XRX2x/B+mnVvdoiJd4+pO1Df0Fovkfl6CB/9oQ/h5Rtz9krbBAiMFBDcR4J5OQECBAgQSFLg8Isq7H/4Eg4/fdvb/bgcpg7uzbr4qg71h1B9K4SXP/jhGN4tZU+y1Dqdr4Dgnm9tjYwAAQIECEQC9bKZekb9tQqHH1fHAH94Xy98D6H6uA7sh/DyS4cQ6l1k6hn5oXu+QyZAYCkBwX0paechQIAAAQKrC0RLY44z7tGkexWvfRfaVy+VDhDoEBDcXRYECBAgQKBIga51MAJ7kZeCQScjsKs+/CvbQSZTLh0lQIAAAQIECBAoVUBwL7Xyxk2AAAECBAgQIJCUgOCeVLl0lgABAgQIECBAoFQBwb3Uyhs3AQIECBAgQIBAUgKCe1Ll0lkCBAgQIECAAIFSBQT3Uitv3AQIECBAgAABAkkJCO5JlUtnCRAgQIAAAQIEShXYVR/+pe0gS62+cRMgQIAAAQIECCQjILgnUyodJUCAAAECBAgQKFlAcC+5+sZOgAABAgQIECCQjIDgnkypdJQAAQIECBAgQKBkAcG95OobOwECBAgQIECAQDICgnsypdJRAgQIECBAgACBkgV21ft/YVeZkq8AYydAgAABAgQIEEhCQHBPokw6SYAAAQIECBAgULqA4F76FWD8BAgQIECAAAECSQgI7kmUSScJECBAgAABAgRKFxDcS78CjJ8AAQIECBAgQCAJAcE9iTLpJAECBAgQIECAQOkCgnvpV4DxEyBAgAABAgQIJCGwq97/c9tBJlEqnSRAgAABAgQIEChZQHAvufrGToAAAQIECBAgkIyA4J5MqXSUAAECBAgQIECgZAHBveTqGzsBAgQIECBAgEAyAoJ7MqXSUQIECBAgQIAAgZIFBPeSq2/sBAgQIECAAAECyQgI7smUSkcJECBAgAABAgRKFthV73/LdpAlXwHGToAAAQIECBAgkISA4J5EmXSSAAECBAgQIECgdAHBvfQrwPgJECBAgAABAgSSEBDckyiTThIgQIAAAQIECJQuILiXfgUYPwECBAgQIECAQBICgnsSZdJJAgQIECBAgACB0gUE99KvAOMnQIAAAQIECBBIQmBXvf9ntoNMolQ6SYAAAQIECBAgULKA4F5y9Y2dAAECBAgQIEAgGQHBPZlS6SgBAgQIECBAgEDJAoJ7ydU3dgIECBAgQIAAgWQEBPdkSqWjBAgQIECAAAECJQvUwf17ryGEdyUrGDsBAgQIECBAgACBjQvsqvf/VHDfeJF0jwABAgQIECBAgIDg7hogQIAAAQIECBAgkICA4J5AkXSRAAECBAgQIECAgODuGiBAgAABAgQIECCQgIDgnkCRdJEAAQIECBAgQICA4O4aIECAAAECBAgQIJCAgOCeQJF0kQABAgQIECBAgMCuev9PbAfpOiBAgAABAgQIECCwcQHBfeMF0j0CBAgQIECAAAECtYDg7jogQIAAAQIECBAgkICA4J5AkXSRAAECBAgQIECAgODuGiBAgAABAgQIECCQgIDgnkCRdJEAAQIECBAgQICA4O4aIECAAAECBAgQIJCAwK56/49tB5lAoXSRAAECBAgQIECgbAHBvez6Gz0BAgQIECBAgEAiAoJ7IoXSTQIECBAgQIAAgbIFBPey62/0BAgQIECAAIEVBA4rnHPsKauxB8z+esF9dmInIECAAAECBAjkJjAieI946bXSUwffQH8wlN897O4LnroQBPen+BxMgAABAgQIENiqwAyht7PJIec5hHDxsugv538d0k6Xdfu4R8Lz6ZirQ6sQzl+71270/XsvHXTJXDeyq97/pl1lBuF5EQECBAgQIEAgJ4FT4L3Kyx0Buh2ue0P4o+E7UdcqDtdx+L8V4tvfG57yBfdErxPdJkCAAAECBAh0C/QF8var49c1M+JN8O6aEb/nXVhoP3MMCN7tWftj4I9n8+vGWu1c/PXtL4L7vWvQ9wkQIECAAAECmxS4Fa7b33s2mJcayqcofE8gb0iP325m628E+kpwn6Ia2iBAgAABAgQIzCQwcDnLoXldx4x53bMhy2FmGoFmhwr0La+pZ+bfZufNuA+19DoCBAgQIECAwGQCt9aRt5L28aUdM+Z968wn66OGNiVQVYL7pgqiMwQIECBAgEBGAj3LS7pmv5twfszo0az50zuuZMRpKIK7a4AAAQIECBAgME5gxHrvrlnxvpB+7ER728RxPfPqvAV21ft/ZDvIvGtsdAQIECBAgMASAueZ8uhkh/3bX+JZ9Obbnfn/4o7F0ytH/KCwxDidYzUBwX01eicmQIAAAQIE0hRorTePl7Nc3STaNUJBPM26r99rwX39GugBAQIECBAgsDmBrt1c2vue13+Pl7YI5JsrY2YdEtwzK6jhECBAgAABAo8KtNeXx3/fn7ZU7FqDLrA/Ku64cQKC+zgvryZAgAABAgSyEOgJ4BdLXTqCfBZjN4hUBQT3VCun3wQIECBAgMCbwKiHC7WXu5wa6Lp5dArf+nStB2dO0aw2yhTYVV/aVabM0hs1AQIECBBISeCB5SjxtovHfN6sST/9f2foT8lEX4sSOD459ct/aDvIoqpusAQIECBAIEeB1s2kXSG9GXbvzwAP/HCQI6UxbVNAcN9mXfSKAAECBAgQuCfQWvLSzKg3gf1iNl0gv6fp+wkICO4JFEkXCRAgQIBA8QKtLRebJTCde6YL6cVfLrkCCO65Vta4CBAgQIBAqgLt/dObv9fhPd43XUBPtcL6/aCA4P4gnMMIECBAgACBCQSi8H2Rw6Mnk16E9fqUAvsE8JpIUUBwT7Fq+kyAAAECBFIQGBCwzy+JZ9M71q6nMFx9JDC3wFtw/wd2lZkbWvsECBAgQKB4gdbDjOqZ9EFLXwb8AFC8LYAiBAT3IspskAQIECBAYAWBGzeUnh92VHdLMF+hOE6ZooDgnmLV9JkAAQIECGxV4NbuL60Zd4F9q0XUr60KCO5brYx+ESBAgACBFATim0vdUJpCxfQxYQHBPeHi6ToBAgQIEFhcoHXj6MV+6lFwX7xfTkigAAHBvYAiGyIBAgQIEBgl0LHm/GL3l7qx/dvS9MN+VMteTIDAEwKC+xN4DiVAgAABAkkL3Lkp9OZWjW4oTbr0Op+mwFtw//u2g0yzfHpNgAABAgQmFohuIK1n068eftR3OkF+4kJojsC1gODuqiBAgAABAgULnLdlPAX2c1CPg7hQXvAVYuhbEhDct1QNfSFAgAABAnMKxDeW1udpZtdPM+vNjaZzdkHbBAg8LiC4P27nSAIECBAgkI5Ae6vG042l8Tr2dAajpwTKFBDcy6y7URMgQIBA7gLtbRuPW8C8rVk3s5578Y0vVwHBPdfKGhcBAgQI5CUwcJ15s2Y93l+9WbeeF4jREChP4C24/z27ypRXeiMmQIAAgRwEzjeX1oM5hLA/7ave/noOYzUGAqULCO6lXwHGT4AAAQLpCcRbNkZLYM43m8YjGjhTnx6CHhMoT0BwL6/mRkyAAAECKQr0hHUz6ykWU58JPCYguD/m5igCBAgQIDC/QLwTTH22+u/11o2nf5+/A85AgMCWBAT3LVVDXwgQIECgbIHWTjDHfN7ssW7JS9nXhtETCCEI7i4DAgQIECCwlkAUxuNZ9OOWjfHa9bX657wECGxKQHDfVDl0hgABAgSyFLgxWx5v23jeZ93sepaXgUEReFbgLbj/XdtBPgvpeAIECBAgMETgap/101KYq2OF9yGcXkOgKIH8gvsW3uiqoq4hgyVAgACBewLxTabN00vjz6stfHbdG4PvEyCwusD2gnt8Y87cPEPfKFcI4sdTrnDeucm1T4AAgWIEbN9YTKkNlMBSAvMG9yEhfEB4vrXt1cX+tWPUBpz33NyTAbq6c/y974/tx/l0T/Z7DKfXEiBAgMDbdo31n3jd+nn7xvM3SBEgQOAxgWHBvSfkXn259YXzXzu2tzp3d2jbzQFjAvdjJssc1ROqb2btrm+evnbxra6vNaN65Lz1sX4IWOa6cBYCBNITiJbB1J3f70/7rQvq6dVSjwlsXOCr4H4I79p9vRvMmxdEvw48vk9FX9/4+PPuXhzgo+B9sQznVsjvCex3M/zdF+TNbnQECGQs0N6+8RTOm+0bmy0cMxYwNAIEVhR4C+5/53uvhxAF9/iNqevfb82grzgYp35AoHqbTK9LerWu/vS9c6vtvz8a7Pu62QT+c2ceGI9DCBAgMJXArd8IN/usRw9Imuq02iFAgMCNqLSrvvjb33s91DPu0RtRs04vPvDmKpVclrDkfq08MBveeUg8gx+/oAn3t87T9QNA7u7GR4BA8gLnbRzbTzL1+Zd8bQ2AQCoCxxn3n/+tT9+Ce/uPN6NU6rhsP0eE/4sbbzuW7ty6kXbwTbvLjt7ZCBAoROAc1OvPwngLR5+NhVwBhklgewJvwf1vfnq5VGZ7/dSjVAUGhPw4oJ//PZ6Vv3dD7YBzpMqn3wQILCwQ77ceL4N5JKzfOOaR5qaU6H3b9H46JbO2CEwuILhPTqrBwQKtD4h4iXvdRnvN/THU99xwG5/z1iz+4L55IQECRQlcza7Xy2FqgTsJ++EtiWPdvh3ZuirQvHZAwL54yYDXDym499chSl5DYD4BwX0+Wy1PIdDeDaczoYcwZKZ+jg+xKYaoDQIEVhLoe5ppz45pF72MN2m4EcLvBf8BPxtMgjMot0cvOv980PcePKBB77mTlE4jBC4EBHcXRLoCdz44rpbgxLP1zahv/WAwVmbAB9nYJr2eQPECE64piZ8t0symn7dxjGfY59g5bcJxTH5NTPne1bFBwVXzHedr/4Z18jFqkEAmAoJ7JoU0jA6BGx9GzYdE/Gvf3pth7YLj8iKQhMCtZSvxjjD1A5KawH5zRnzLYXtrFRkZ/i+CesfWw+3hmb3fWsH1Zy0BwX0teeddR2DgDHuznv7WLJBdb9YpobMWLtB64F+sET/872J2Pd4RpplZbw4Uzpe5oEYE+85Q33O8NffLlM9ZtiMguG+nFnqyFYEbS2ouZupbHyR+1Vk9BtUAABwPSURBVLuVAupHNgJdIT3+WmuN+vlpcieA5imm9Qz78Y+QnsalcSukN9+7s/OY9+M0Sq2X4wUE9/FmjiBw3N0m/my52vGmNmrP7o+YcUJMoCSBiyUu7Zs+4yeU3gnfFzvDDNwVpiTnrMbaF+7vBHuBPquroMjBCO5Flt2g5xboWmrTXlpjzebcVdD+pgRu7MJyvlH0FMzHbrHYzKwPWre+KRSdmV2gfqONbpjtWloz5ObZ2fvpBAQGCgjuA6G8jMBoga6bWuMPkL6dFeITmaUfze6AlQXqFF5ft0OCerR0Zcie6fHILtazN7PylsKsXPyNnv7W7PyQXXCaYXk/3miBy+qW4F5WvY12IwLtX9dezNDXfRx4E+15OD5QNlLZzLsxIBjHAbx9g+hR58bNpYP04htNozXug471IgJdAq318u2bY1tvybcNvRe7xmYWeAvuf+PT10MI72Y+l+YJEBg4m94sq+l8sFTHU2XBElhaoL2c5RzYm2B9q0MDfgCID796qmn7+JHtLW3lfBsWuBe028ts2psS3Dt+w0PXtTQFBPc066bXJQj07FpzXLJ5Wrd59XOAD5ESrozlx9iaJY+XqRwn0duz6FME6ajNw2nf9fPAp2h/eUVnTFWga1lja+18MzQ3v6Za5HT6LbinUys9LV2g50FQ52U2fR8upbsZ/2MCPWG9uRH0Ykb8mN4fO83VUafzxjecCuwT2WpmGgFBfhpHrTwkILg/xOYgAhsS6NjP+LzUpu6mbSk3VKxtd+XWA4yano+9iXTQiOMbWevg7iFJg9i8aCMCfctn+m589ZvRjRQuzW4I7mnWTa8JDBK4uVb+9OHhV7uDKLN8UVdQX3RLxb7Z9alm77OsmkFtXmDsLjaC/OZLuqUOCu5bqoa+EFhC4DQL1LXXfGuC/qve+GBZojLznaNra8bWU0fH7p3+UGdb2z+el8M0TzZ9qFEHEUhEIH4fvXHT68XbrffeRIq7XDcF9+WsnYnA5gTi2fa+IN8b5uPR+HBZt7Z3Zqj7HnA0W1jv6U/zZTebrnu5OPsGBNrvmXWQb34LGv829F5XvffeE8ru+2/B/a/bDjK7yhoQgT6B5o2+eVDO6XUXk0HNX1ofJOcnENLdvEDfFopXmXqJZSntJTGN3hLn3nyldJBA971IVxMroAi8XSqCuyuBAIGWwI0daq7WzTfbU0JcTSCeOY/XqF/k4oVDcvyDw8XM/sL9WK0oTkzgWYGOjQWE+WdR0z9ecE+/hkZAYHmB1jr5ugPnh0UJ8vPXo2OrxvN68frsK4bjuB9dW0fOj+MMBDIX6FhW034Pzlyg6OEJ7kWX3+AJPCnQ2pmmmQ1q71QTh/onz1j04Ve7wMRPKV0xrNc/KMTr6AX2oi9Tg19KoP3+a6ewpeRXPY/gviq/kxPIUCDaV/7uDa9urOq9ANo3jp6XnjR7nK8Z1E+z+uebTet/Of0QkeEVbUgE0hE4zcZfTZ40I/Cem04te3oquCdfQgMgkIBAvPVZ+4bX4+94b48hx8+aztwdfzG6oXPNGey+fm5laU4CV78uElhNoHPy5MYbao7vtavhz3TiY3Df2VVmJl7NEiDQFjhvWFP/S7RWc/SONSl9wgyYHY+fSNp7g+kSl9O9rSWb5TkDxrREd52DAIH7AudljF0TJ7cOT+l99j5DFq94C+5/7dPXQxXeZTEigyBAYJsCrQ+Ai792zcgPmInf5kBH9Cq6ybT9xNI1d4Rpj2DLfRuh7aUEyhToeu+98QCoMpHSGXV1ENzTqZaeEihA4GK7yejDpRl6e+1mUiRdu8FsZc16DHnjB4qkvHWWAIGbAueNA+LfftoZbNNXjeC+6fLoHIHCBTp2TejbuWbLUhe7wWxlJ5gusK4HJVkSs+VLS98ITCrQnjipG7cr2KTETzcmuD9NqAECBJYUqD9E+nar2cxsfDyzHgX1NW8yvVWjvqesLllX5yJAYFsCXe+zQvz6NRLc16+BHhAg8KDAeXbo5a2Bi9n48xcebHzsYaeZ6a79zNtbO45tepbXt5bD2M5xFmWNEkheoGs5zXnZvJtXF6+v4L44uRMSIHAlEC/HeOKD4Go2PgrvTzR7s2AXu8HUrzyEsN8/UONnDQYuaencvWZMd+sG5sIc0w+vJUDgMYEn32s6Z+LH9MT7xxitq9e+BfffsKvMU4oOJkBgXYGeD4L4Ayb+Fe+zv+6NZ9CbHVc6Z9UHhukl8K6Ww7RPuqG+LuHhHAQIjBTo2Z3mOD8ydpvJkaf28q8EBHdXAwEC+Qucdqc5B/noA2jouvjesL7xwBsH9q2usc//AjRCAnkLNO+tQvz8dRbc5zd2BgIEtiIQ7VLTe4NrE+rbN5jWY9jyjjAt46vAfur/VkqhHwQIZCjQsT/80MmRDDVmGZLgPgurRgkQSEagmY0/3eDa7nf74UObHZebTTdbGh0jUKpA5285rXF/6nIQ3J/iczABAjkIxMtg6s+Uw/F/vhrZs2viZzVqAntCvw2Y1UPjBAhsUkCIn6Ysgvs0jlohQCAlgZ591uOwXg+nvZxmM1ugmV1P6WrTVwIEIoH29pIXE/Bm4+9eK4L7XSIvIEAgGYE7N4rGe6w3IX3oHusXHzbHVH9nV8RnP4B6xtIew9D+J1NDHSVAoBiB8xa+t95Tn30vzUzzq+AewrvMxmY4BAgULNAOtM2OKuc8/OhuMPG2Z63wPteSmvONpnU9T0tizqV9dBwFXxuGToDAhgRWeE/d0OhHd6UKzT7ugvtoPAcQILAtgXNYj9d9x12cKuT27Gc85V7GNx+UNNU4tlU+vSFAoGSBaNev5iFvFzPyJdtEYxfcXQgECCQrcDGr3rpJc61BPX0D1mkc51n2R57CutbgnZcAAQITClSn3b6mnBSZsHurNCW4r8LupAQIPCzQsb96O8A/3PZUB7aeInj+0Knb71iv2fVwp2NXzKxPVRHtECCQqkC8N7wntNYfIbtq9xufvh4slUn1ktZvAnkKnEJrvCb96t9TCbb1B0/Hr4GbcH6+4TSV8eR5xRkVAQJbF4jfSx94AvbWhzekf4L7ECWvIUBgOYEbTyxdrhMzn+k0gxSvY5/5jJonQIBAXgKFzsQL7nldxkZDYBsCI2eOu2bSkw61defbS2I69l4/FuvObPxFQW2Lto3rWy8IENiUQPveot63ygzeQ9+C+1+1VGZTV6DOEMhc4O5Wje3xj/xBYEt87WUwXUNpP9jpuJPClgahLwQIENiaQMeb5MVD85qH6G2t30/2R3B/EtDhBAjcEIiXvZxedt4tJU6wCQfzzp8xmvX5rf8feq1c7aAgyA+l8zoCBEoX6NkXfq7nbCzNLbgvLe58BHIWaAf19vKQeOwZhfV6WO0fSKZ6oqkQn/N/MMZGgMCsAtE6+OZp16kHeMF91itG4wQyFrgxm358umfGIb0ZWvshSVfjnrL88Y1YdbvxLjVTnkdbBAgQyFGguZ/o9F6aaoAX3HO8OI2JwBwC7e0Zo1nmJqWXENbnnF0fWrb2LHyqH0BDx+t1BAgQmESgYxnN8UsJ3VQkuE9yJWiEQGYCHbPp8WzyeRlIZstd+qrYfkBSHN7XrnzXEwUF+bWr4vwECKQg8PSTrhceZP1ZJLgvjO50BDYp0Lc2veMhSJvs/0ydmmvd+izdjW5gjYO7ED+LtkYJEMhJoHn/fPlq8n1T752nz2jBPaeLzlgIDBHoWO5yMXvcevjRkCZzfM1FYO/67cPGBx3/6rdrRn7j3dc9AgQIrCYQz8Kvuoym49kfp0eE2Md9tavDiQnMLdAV1DvC+dWKl0KWwMT87eUwU+0KM3eJ77XffPCcA3x9QELrOe+Nz/cJECAwuUB8A2u8M83kJ2o12H5yeMdvwy2VmbsI2iewgEBnyGz9B1/auvR77Ftet36v749+33r4R+UcR4BAqQIX75vxza1TgHR9Tt95/ofgPgW8NggsLHAV1Ns/pTf9KXDm/FYpSgzrfR5XO9OYiV/4v2KnI0AgNYH2zawPr4NvPrOj/68thvymV3BP7arR33IEetajX/zH3fqPvhycESPteAjUkDfHEWdI+qWd6+GF+KRrqvMECMwrcLUOfsh7Zsea9Uee/SG4z1tbrRMYJtB3A2Qc3gt5qNEwsDuvav3QUwd1Yf2+bHs9/PGzyHr4+3BeQYBAkQL1+2MT4s/ZPX7P7Fizfpx8O//PeDbBfbyZIwgME+hZpnL1kKL6P3Lr0YeZ9r2qY9vK5o3RaqHHaLtm4js/mB5r3lEECBDISuAc4qNRXXwOTfRhJLhnddkYzGQCE/wH1tnEA+vZJhtTyg3dqEc8c3HexjHlsW6w7+cJpNbuCjcn483Ub7CSukSAwCiBvs+enln1JX5D+Rbc/8qnr4cQ3o0ajBcTIHAU6FuCcfH1e3uBT/CDQknlcJPpetU+fzD1PPBpvZ45MwECBJYTuPqtbutz/jgDP8NyQ8F9uRo7U+oC9X+Up2UtF0PpuPnx5lCF9IevhPaTTG/94PTwSRw4TKDZFi3+YIq+NqwRryJAgEA6Al1LX259pDcT81M+CE9wT+d60dMZBe7duHhz9lwQn6UyXbPqj9yBP0vnNNop0DUbX79wiV8fKwkBAgSmFOj8DBq4ZWNXP9pr4B99XxTcp6yytrYrMGCpyjl/d9zouN2B5dUzYT2fevbd3CrI51NjIyGQk0B7p5f4oYVTzs+1H+g09nYgwT2nq67ksdzY8/zIcgru55UurW0WS6Zbfez2WV+9BEt0IJ5das80PTrztES/nYMAgTwF2r9pPwf3exN9E3LEs/BD3wcF9wkLoKmZBDp+1O3bsaXpQedWgFP+yDzTUItptuNJr/eWKxVjU8BA49n4+u6t8zrQ43R8AQCGSIDAKgJXYb3JBQuG9fbA4xn4i/fGHiHBfZVLZwMn3WCIbS9VaStddbkV/lZTbTpWWuAYeQ3F9T2/V45sY7UaO/GsAhfLalrh/eH/rB4+cNahapwAgTECT3xGXBza96yUMX1Z4LUXM/A3g/tfth3kAvUo9hRDZ1KvXjf2J+An/gMvtjgzD7xz28b6nGo1s3zCzUcz8PFsfDMTL48nXFtdJzCTQNfEX7xmvb1+faZuTNPs6WmsfVtJvs24C+7TYBfWytBA3rkTyJBQXv+X1rX9YmHOqQ3Xlo2pVWzj/e0L8qeZeUF+4/XTPQIzCHRuJhFNCA3OJzP0bbImmwDf2mZXcJ9MOLOGhgTrZsjt14451uxrFhdOO6wnNbuRRQUKGESU0K+e5NoMPw75BZAYIoFSBG7t+tZeEpOVSfS06mZJ4YsZ96xKfDGY0T9x3tmZpbc9yx7yvYg6RtZ3c8/o660oNYOdU+BiN4Z2ePdQqDnptU1gUoGuSZ+Lr42dGJy0dys3dpqBF9xXrsPg0z9ysXYd0wrZvZm7fcOlcD64VDm+0P7qOVY17zHFD4OqR3qxpEaYz7v4RpeEwN2Q/sTDjpIAeLST1XGN+/dfDyG8e7QNx90ReCR0t5u81cadmfKr3gnhLtl7l2z7B7zmGnPtuHYSFejbgvI8HMtsEq2sbm9doOvG0brP7eDut7aDK5lZcF8gWDx0io6DOtsZEPLv3q/5UAcHXzBemLFA142lxzdY11TGVS93aOcw3xPah+ypXK6ekRPoFuj6vOgN7z5bHrmMdtXuL217xn2N0HB3CUkH9ajrb9SLH6mrYwjcFrBW3RVC4FogvvG1+W7fEw2HPumQM4GcBG5lsovvDZiIzMllwbHsqte/WE5wnyQvT9LIgiV2KgK3fi3pzdX1QeCugEB/l8gLMhPoC+hPP3MlM6cVhrOrfvYXpg/ucbaNbwpqF7w9Y3GViYXkFa4Jp8xFoPOmUktfcimvcWxAoB3o7y2vMUu/gaLpwlng3oqG8/fH3kvHeE6BXfXTPz99cJ+zx9omQKBHoOexzvfenHkSIDCtwJhA3zWbP21vtFaswJDfqMaviSZLzZtu9qoR3DdbGh0jcEug4w05nh3xpuvyIbA9ga5tKZteDpmNvzejv70R69HkAiNmv7uWtdT98fkweVWWbFBwX1LbuQg8JdAzo16/C3sjfkrWwQQ2IfBssK8HIdxvopSPd2Lg+3nnb1JHhPrHO+jIlQUE95UL4PQlCwxI2/FLzKiXfLEYO4E3gYtw3/rC2NB+1dZUyE3DfTe8TXWeR9sZ8N77aNPt4x46Vc/ylabth9qcakDaWVtgV/30z1njvnYVnJ9ALND3YIq+vf/pESBQiMCIpN330t4lOQPavthsouuHiALKMDg09z2/paeB9pdvPrNlcCcKKEh5QxTcy6u5EW9FoG8v9bp/bijdSpX0g0DmAk8+NXbI2vxUBR99H25PvqQ6fv3epIDgvsmy6FSWAn0z6YJ6luU2KAL5C/RMwQ+YvN+czcX7czzdffdx5Zsbig7lLSC4511fo1tTwIz6mvrOTYAAAQIEshMQ3LMrqQGtItD1K9Xma4/+unWVgTgpAQIECBAgsFUBwX2rldGv7QrcCul1rwX17dZOzwgQIECAQMICgnvCxdP1hQRuLXkR1BcqgtMQIECAAAECgrtroByBR2fCLXkp5xoxUgIECBAgsGGBXfWTP2sf9w0XSNcWFIiD/a2Q/+gPAAsOxakIECBAgACB/AQE9/xqakRdAvfWpTfHCOWuHwIECBAgQGCjAoL7RgujW08KWJf+JKDDCRAgQIAAga0JCO5bq4j+jBe4N5tuFn28qSMIECBAgACBzQkI7psriQ71CxxCOD7drvVn6Np0tAQIECBAgACBhAUE94SLl1/Xe4J5PdB7S1/ywzAiAgQIECBAgMCFgODuglhJ4DR13p5Bv7fsZaXeOi0BAgQIECBAYG0BwX3tCiR5/q71Kj0D6X1pe3b9xmx7kkY6TYAAAQIECBCYVmBX/eTP2Md9WtOyW7sK6vHMevTvVb38pY+q/sbNF5RtbPQECBAgQIBAkQKCe5Flf3DQYx9KdAzmI2bnH+yWwwgQIECAAAECJQgI7iVUecwYb4XtzvXnwvkYXq8lQIAAAQIECDwqILg/KpfqcRcT4D2z4e3wbuY81WrrNwECBAgQIJCRgOCeUTEvhnIvbN8L55aY53plGBcBAgQIECCQqIDgnkrhhj79s+9194J8Kg76SYAAAQIECBAoVEBw30Lhnw3l9RgE8y1UUh8IECBAgAABArMJCO5z0Q4N4835x+7YMle/tUuAAAECBAgQILBJAcF9TFmemdVuB/O+tqoqhLGhf8wYvJYAAQIECBAgQCBJgXyC+zOhuq90Y9o8b9Bi3/Ik/0vQaQIECBAgQIDAxgV21Y//dD5PTh0TtNuFeebYjRdZ9wgQIECAAAECBNIX2FWf/6nvv4ZDeHeo9/87PWl+y+OqA/apq+clJbYu3HLF9I0AAQIECBAgQGACgV312Z/8/msI4d0EjWmCAAECBAgQIECAAIF5BAT3eVy1SoAAAQIECBAgQGBSAcF9Uk6NESBAgAABAgQIEJhHQHCfx1WrBAgQIECAAAECBCYVENwn5dQYAQIECBAgQIAAgXkEBPd5XLVKgAABAgQIECBAYFIBwX1STo0RIECAAAECBAgQmEdAcJ/HVasECBAgQIAAAQIEJhUQ3Cfl1BgBAgQIECBAgACBeQQE93lctUqAAAECBAgQIEBgUgHBfVJOjREgQIAAAQIECBCYR0Bwn8dVqwQIECBAgAABAgQmFdhVn/2J77+GEN5N2qzGCBAgQIAAAQIECBCYUkBwn1JTWwQIECBAgAABAgRmEhDcZ4LVLAECBAgQIECAAIEpBQT3KTW1RYAAAQIECBAgQGAmAcF9JljNEiBAgAABAgQIEJhSQHCfUlNbBAgQIECAAAECBGYSENxngtUsAQIECBAgQIAAgSkFBPcpNbVFgAABAgQIECBAYCYBwX0mWM0SIECAAAECBAgQmFJgV332xz2AaUpRbREgQIAAAQIECBCYQUBwnwFVkwQIECBAgAABAgSmFhDcpxbVHgECBAgQIECAAIEZBAT3GVA1SYAAAQIECBAgQGBqAcF9alHtESBAgAABAgQIEJhBQHCfAVWTBAgQIECAAAECBKYWENynFtUeAQIECBAgQIAAgRkEBPcZUDVJgAABAgQIECBAYGoBwX1qUe0RIECAAAECBAgQmEFAcJ8BVZMECBAgQIAAAQIEphYQ3KcW1R4BAgQIECBAgACBGQQE9xlQNUmAAAECBAgQIEBgagHBfWpR7REgQIAAAQIECBCYQUBwnwFVkwQIECBAgAABAgSmFhDcpxbVHgECBAgQIECAAIEZBAT3GVA1SYAAAQIECBAgQGBqAcF9alHtESBAgAABAgQIEJhBQHCfAVWTBAgQIECAAAECBKYW2FWf/fr3X0MI76ZuWXsECBAgQIAAAQIECEwmILhPRqkhAgQIECBAgAABAvMJCO7z2WqZAAECBAgQIECAwGQCgvtklBoiQIAAAQIECBAgMJ+A4D6frZYJECBAgAABAgQITCYguE9GqSECBAgQIECAAAEC8wkI7vPZapkAAQIECBAgQIDAZAKC+2SUGiJAgAABAgQIECAwn4DgPp+tlgkQIECAAAECBAhMJrCrPvtjHsA0GaeGCBAgQIAAAQIECMwjILjP46pVAgQIECBAgAABApMKCO6TcmqMAAECBAgQIECAwDwCdXD/wWsI4d087WuVAAECBAgQIECAAIEJBAT3CRA1QYAAAQIECBAgQGBuAcF9bmHtEyBAgAABAgQIEJhAQHCfAFETBAgQIECAAAECBOYWENznFtY+AQIECBAgQIAAgQkEBPcJEDVBgAABAgQIECBAYG4BwX1uYe0TIECAAAECBAgQmEBgV/3IdpATOGqCAAECBAgQIECAwKwCgvusvBonQIAAAQIECBAgMI2A4D6No1YIECBAgAABAgQIzCoguM/Kq3ECBAgQIECAAAEC0wgI7tM4aoUAAQIECBAgQIDArAKC+6y8GidAgAABAgQIECAwjYDgPo2jVggQIECAAAECBAjMKiC4z8qrcQIECBAgQIAAAQLTCAju0zhqhQABAgQIECBAgMCsAoL7rLwaJ0CAAAECBAgQIDCNgOA+jaNWCBAgQIAAAQIECMwqsKt+9Ed/8BpCeDfraTROgAABAgQIECBAgMAzAoL7M3qOJUCAAAECBAgQILCQgOC+ELTTECBAgAABAgQIEHhGQHB/Rs+xBAgQIECAAAECBBYSENwXgnYaAgQIECBAgAABAs8ICO7P6DmWAAECBAgQIECAwEICgvtC0E5DgAABAgQIECBA4BkBwf0ZPccSIECAAAECBAgQWEhAcF8I2mkIECBAgAABAgQIPCMguD+j51gCBAgQIECAAAECCwkI7gtBOw0BAgQIECBAgACBZwQE92f0HEuAAAECBAgQIEBgIYFd9aM/8oPXEMK7hU7oNAQIECBAgAABAgQIjBcQ3MebOYIAAQIECBAgQIDA4gKC++LkTkiAAAECBAgQIEBgvIDgPt7MEQQIECBAgAABAgQWFzgG9y9CCF9b/NROSIAAAQIECBAgQIDAUIEv6+D+eQjhk6FHeB0BAgQIECBAgAABAosLfPH/ASZVq4iNADlgAAAAAElFTkSuQmCC');
		background-size: cover;
		position: relative;
		padding-top:25rpx;
		.sweep-code{
			display: flex;
			justify-content: space-between;
			.scan{
				margin: 0 0 0 20rpx;
				width: 38rpx;
				height: 38rpx;
			}
			.setting{
				margin-right:20rpx;
				width:39rpx;
				height:38rpx;
			}
		}
		.my-message{
			height:88rpx;
			margin:47rpx 50rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.lf{
				display: flex;
				align-items: center;
				.portrait-img{
					width:88rpx;
					height:88rpx;
					border-radius:44rpx;
					margin-right: 19rpx;
				}
				.information{
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding:14rpx 0;
					.names{
						text{
							font-size:30rpx;						
							font-weight:500;
							color:rgba(255,255,255,1);
						}
						image{
							width: 26rpx;
							height: 25rpx;
							margin-left: 10rpx;
						}
					}
					text{
						font-size:22rpx;
						font-weight:300;
						color:rgba(255,255,255,1);
					}
				}
			}
			.rt{
				color: #646464;
				width:120rpx;
				height:50rpx;
				line-height: 50rpx;
				text-align: center;
				background:rgba(255,255,255,1);
				border-radius:25rpx;
			}
		}
		.service-block{
			display: flex;
			margin:0 50rpx;
			justify-content: space-around;
			.item{
				text-align: center;
				color: #FFFFFF;
				text{
					font-size: 32rpx;
					
				}
				view{
					margin:10rpx 0;
				}
			}
		}
		.provide{
			position: absolute;
			// top: 407rpx;
			top: 357rpx;
			width: 710rpx;
			height:244rpx;
			background:rgba(255,255,255,1);
			border-radius:20rpx;
			margin:0 20rpx;
			padding:24rpx 29rpx;
			.upper{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #A0A0A0;
				border-bottom: 1px solid rgba(230,230,230,1);
				padding-bottom: 24rpx;
				.lf{
					.my-provide{
						color:#1e1e1e;
						margin-right: 10rpx;
						font-weight:500;
					}
				}
				.rt{
					image{
						margin-left: 10rpx;
						width:10rpx;
						height:20rpx;
					}
				}
			}
			.lower{
				display: flex;
				margin-top: 41rpx;
				justify-content: space-around;
				.orderType{
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						width:42rpx;
						height:48rpx;
					}
					.backImage{
						width:52rpx;
						height:47rpx;
					}
					.title{
						margin-top: 8rpx;
						color:#3B3C3C;
					}
				}
			}
		}
	}
	.use-main{
		padding:143rpx 20rpx 30rpx 20rpx;
		background:rgba(240,240,240,1);
		.advertisement{
			width:710rpx;
			height:140rpx;
			margin:20rpx 0;
			border-radius:20rpx;
			background-image:url('https://sgz.wdttsh.com/mini_static/cut/date.png');
			background-size:cover;
		}
		.wallet-box{
			border-radius:20rpx;
			height:203rpx;
			background-color: #fff;
			padding:0 30rpx;
			.upper{
				height:72rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #f2f2f2;
				.lf{
					.walletImg{
						margin-right: 10rpx;
						width:28rpx;
						height: 28rpx;
					}
					text{
						color:#1e1e1e;
						margin-right: 10rpx;
						font-weight:500;
					}
					image{
						width:32rpx;
						height:22rpx;
					}
				}
				.rt{
					image{
						margin-left: 10rpx;
						width:10rpx;
						height:20rpx;
					}
				}
				
			}
			.lower{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height:130rpx;
				.lf{
					.balance{
						color:#A0A0A0;
						font-size:26rpx;
					}
					text{
						font-size:38rpx;
						color:rgba(60,60,60,1);
					}
				}
				.rt{
					display: flex;

					.button{
						display: flex;
						align-items: center;
						justify-content: center;
						width:120rpx;
						height:50rpx;
						border-radius:25rpx;
					}
					.cashOut{
						background:rgba(240,240,240,1);
						color:#000;
					}
					.charge{
						margin-left: 20rpx;
						background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
						color:#fff;
					}
				}
			}
		}
		.service-block{
			padding:0 30rpx;
			background:rgba(255,255,255,1);
			border-radius:20px;
			margin:20rpx 0;
			.top{
				display: flex;
				align-items: center;
				padding: 27rpx 0;
				margin-bottom: 40rpx;
				border-bottom: 1px solid rgba(230,230,230,1);
				font-weight:500;
				color:rgba(60,60,60,1);
				line-height:22rpx;
				text{
					color:#1e1e1e;
				}
				image{
					width: 25rpx;
					height: 31rpx;
					margin-right: 14rpx;
				}
				.qt{
					width: 26rpx;
					height: 26rpx;
				}
			}
			.main{
				width: 100%;
				margin-top: 43rpx;
				display: flex;
				flex-wrap: wrap;
				margin-bottom:20rpx;
				.item{
					width: 25%;	
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 40rpx;
					font-weight:300;
					color:rgba(59,60,60,1);
					.icon{
						height: 60rpx;
						display: flex;
						align-items: center;
					}
					image{
						width: 44rpx;
						max-height: 44rpx;
						margin-bottom: 18rpx;
					}
				}
			}
		}
		.theme-button{
			margin-top:30rpx;
		}
	}


</style>
