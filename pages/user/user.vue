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
								<image src="../../static/cut/lable.png" mode=""></image>
								<image src="../../static/cut/portrait.png" mode=""></image>
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
					<view class="item">
						<text>0</text>
						<view>提供服务</view>
					</view>
					<view class="item">
						<text>0</text>
						<view>享受服务</view>
					</view>
					<view class="item">
						<text>45</text>
						<view>我的积分</view>
					</view>
					<view class="item" @tap="toMyRecord">
						<text>0</text>
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
							<text v-if="moneyShow">{{uerInfo.withdrawYuMoney}}</text>
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
						<view class="item" @tap="scanCode()">
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
						<view class="item" @tap="toMyCollection()">
							<view class='icon'>
								<image src="../../static/cut/ionc-f.png" mode="widthFix"></image>
							</view>
							<text>我的收藏</text>
						</view>
						<view class="item" @tap="toMyCoupon()">
							<view class='icon'>
								<image src="../../static/cut/ionc-g.png" mode="widthFix"></image>
							</view>
							<text>我的优惠券</text>
						</view>
						<view class="item" @tap="toMyPoints()">
							<view class='icon'>
								<image src="../../static/cut/ionc-h.png" mode="widthFix"></image>
							</view>
							<text>我的积分</text>
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
						<view class="item" @tap="toMyComment()">
							<view class='icon'>
								<image src="../../static/cut/ionc-k.png" mode="widthFix"></image>
							</view>
							<text>我的评价</text>
						</view>
						<view class="item" @tap="toShare()">
							<view class='icon'>
								<image src="../../static/cut/ionc-l.png" mode="widthFix"></image>
							</view>
							<text>邀请有礼</text>
						</view>
						<view class="item">
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
			moneyShow:true
		}
	},
	computed: {
		...mapState(['hasLogin','uerInfo'])
	},  
	onLoad:function(){
		
	},
	onShow:function(){
		// 查询是否签到
		checkModel.getSignSelect({},data=>{
			this.isAttendance = data.isTodaySign;
			console.log(this.isAttendance);
		})
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
					if(data.storeId==null||data.storeId==''){
						uni.navigateTo({
							url:'/pages/user/store/mystore?storeId=' + data.storeId
						})
					}else{
						console.log(data);
						storemodel.getSellerStore({sellerId: data.storeId},(res)=>{
							uni.navigateTo({
								url:`/pages/shop/myStore?sellerId=${data.storeId}&type=${res.firstTypeId}`
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
		}
	}
}
</script>

<style lang="scss">
	.use-top{
		max-width: 100%;
		height: 478rpx;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAHeCAYAAADEj476AAAgAElEQVR4Xu3dibIryZ0X4KzT7bavTQwzHgjzGGbc9mMAw77DEEAQwc6wDGuw7zA8JcFMONw9Xo7s7nslonRU6lSpSqqSasvM70a03fccVVbm96+WfidPVlZ1+O3vfh6q8EnwhwABAgQIECBAgACBbQocwhfV4f9894sQwte22UO9IkCAAAECBAgQIEAghPBlHdxfQwjvcBAgQIAAAQIECBAgsFmBneC+2droGAECBAgQIECAAIGzgODuYiBAgAABAgQIECCQgIDgnkCRdJEAAQIECBAgQICA4O4aIECAAAECBAgQIJCAgOCeQJF0kQABAgQIECBAgIDg7hogQIAAAQIECBAgkIDArjr8tu0gEyiULhIgQIAAAQIECJQtILiXXX+jJ0CAAAECBAgQSERAcE+kULpJgAABAgQIECBQtoDgXnb9jZ4AAQIECBAgQCARAcE9kULpJgECBAgQIECAQNkCgnvZ9Td6AgQIECBAgACBRAQE90QKpZsECBAgQIAAAQJlCwjuZdff6AkQIECAAAECBBIRENwTKZRuEiBAgAABAgQIlC0guJddf6MnQIAAAQIECBBIREBwT6RQukmAAAECBAgQIFC2gOBedv2NngABAgQIECBAIBGBXXX43999DSG8S6TDukmAAAECBAgQIECgRAHBvcSqGzMBAgQIECBAgEByAoJ7ciXTYQIECBAgQIAAgRIFBPcSq27MBAgQIECAAAECyQkI7smVTIcJECBAgAABAgRKFBDcS6y6MRMgQIAAAQIECCQnILgnVzIdJkCAAAECBAgQKFFAcC+x6sZMgAABAgQIECCQnIDgnlzJdJgAAQIECBAgQKBEAcG9xKobMwECBAgQIECAQHICgntyJdNhAgQIECBAgACBEgUE9xKrbswECBAgQIAAAQLJCeyqw//67msI4V1yXddhAgQIECBAgAABAuUICO7l1NpICRAgQIAAAQIEEhYQ3BMunq4TIECAAAECBAiUIyC4l1NrIyVAgAABAgQIEEhYQHBPuHi6ToAAAQIECBAgUI6A4F5OrY2UAAECBAgQIEAgYQHBPeHi6ToBAgQIECBAgEA5AoJ7ObU2UgIECBAgQIAAgYQFBPeEi6frBAgQIECAAAEC5QgI7uXU2kgJECBAgAAB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');
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
						color:#3C3C3C;
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
			background-image: url("data:image/png;base64,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");
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
						color:#3C3C3C;
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
