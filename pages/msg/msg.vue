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
        <view v-else class="chat-list">
			<view class="order-message" @tap="toOrderPage">
				<image src="../../static/tab/order-message.png" mode=""></image>
				<view class="rt">
					<view>订单消息</view>
					<text>这是订单消息内容</text>
				</view>
			</view>
			
			<view class="order-message" @tap="toSystemPage">
				<image src="../../static/tab/system-message.png" mode=""></image>
				<view class="rt">
					<view>系统消息</view>
					<text>这是系统消息内容</text>
				</view>
			</view>
				
			<block v-if="chatList.length != 0">
				<view class="chat" v-for="(chat,index) in chatList" :key="index">
					<uni-swipe-action :options="options" @click="te(index)" @change="change">
					<view class="row" @tap="toChat(chat)">
						<view class="left">
							<image :src="chat.face"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="username">{{chat.username}}</view>
								<view class="time">{{chat.time}}</view>
							</view>
							<view class="bottom">
								<view class="msg">{{chat.msg}}</view>
								<view class="tis" v-if="chat.tisNum>0">{{chat.tisNum}}</view>
							</view>
						</view>
					</view>
					</uni-swipe-action>
				</view>
			</block>
			
			<block v-else>
				<view class="no_content">
					<image src="../../static/cut/mess_bg.png" mode="widthFix"></image>
					<text>暂无消息内容</text>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {MsgModel} from '@/common/models/msg.js'
	let msgModel = new MsgModel()
	import {LoginModel} from '../../common/models/login.js'
	let loginModel = new LoginModel();
	import uniSwipeAction from "../../components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		 //name: 'Home',
		components: {uniSwipeAction},
		data() {
			return {
				options:[
						{
				            text: '删除',
				            style: {
				                backgroundColor: '#FF4343'
				            }
				        }
				      ],
				chatList:[
					// {
					// 	uid:1,
					// 	username:"鲜果蔬专营店",
					// 	face:"/static/cut/logo.png",
					// 	time:"13:08",
					// 	msg:"亲，20点前下单都是当天送达的",
					// 	tisNum:1
					// },{
					// 	uid:2,
					// 	username:"鲜果蔬专营店1",
					// 	face:"/static/cut/logo.png",
					// 	time:"13:08",
					// 	msg:"亲，20点前下单都是当天送达的",
					// 	tisNum:1
					// }
				]
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			// msgModel.getMsgs((data)=>{
			// 	console.log(data);
			// })
		},
		onShow() {
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
		},
		methods: {
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
							console.log(data)
							// 获取用户信息
							uni.getUserInfo({
							  provider: 'weixin',
							  success: function (infoRes) {
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
			 te(e){
				console.log(e)
				this.chatList.splice(e, 1);
			     //console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
			},
			change(open){
				console.log('当前开启状态：'+ open)
			},
			toChat(chat){
				uni.navigateTo({
					url:"chat/chat?name="+chat.username
				})
			},
			toOrderPage(){
				uni.navigateTo({
					url: "/pages/msg/ordermessage"
				})
			},
			toSystemPage(){
				uni.navigateTo({
					url: "/pages/msg/systemmessage"
				})
			}
		}
	}
</script>

<style  lang="scss">
	page{
		background-color: #fff;
	}
	.chat-list{
		border-top: 20rpx solid #F2F2F2;
		.order-message{
			// height: 140upx;
			padding:30rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			// margin:20upx 0;
			background: #FFF;
			border-bottom: 20rpx solid #F2F2F2;
			image{
				width: 80upx;
				height: 80upx;
				border-radius:10upx;
				margin-right: 20upx;
			}
			.rt{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				view{
					font-size:30upx;
					font-weight:400;
					color:rgba(60,60,60,1);
				}
				text{
					font-size:22upx;
					font-weight:400;
					color:rgba(160,160,160,1);
				}
			}
		}
		.chat{
	
			border-bottom: solid 1px #eaeaea;
			background: #FFF;
			.row{
				display: flex;
				justify-content: flex-start;
				.left{
					flex-shrink:0;
					width: 80upx;
					margin: 10px 0 10px 10px;
					image{
						width: 80upx;
						height: 80upx;
						border-radius: 20upx;
					}
				}
				.right{
					flex-shrink:1;
					width: 98%;
					margin: 10px 10px 10px 0;
					padding-left: 2%;
					.top{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.usernam{
							font-size: 26upx;
						}
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
					}
					.bottom{
						width: 100%;
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg{
							font-size: 25upx;
							color: #777;
						}
						.tis{
							width: 35upx;
							height: 35upx;
							font-size: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #eb4d3d;
							color: #fff;
							border-radius: 100%;
						}
					}
				}
			}
		}
		.no_content{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			font-size:26upx;
			color:rgba(100,100,100,1);
			padding: 25% 0;
			image{
				display: block;
				width: 50%;
				margin-bottom: 30upx;
			}
			text{
				display: block;
				width: 100%;
				text-align: center;
			}
		}
	}
</style>
