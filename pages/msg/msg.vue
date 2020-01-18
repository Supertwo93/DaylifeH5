<template>
	<view>
		<view v-if="!hasLogin" class="hasLogin">
			
				<view>
					<image src="../../static/notlogged.png" mode=""></image>
				</view>
				<view class="title">
					<text>登录后可查看“我的”页面</text>
				</view>
				<view class="loginButton" @tap="navToLogin"><text>立即登录</text></view>
			
			
		</view>
        <view v-else class="chat-list">
			<!-- <view class="order-message" @tap="toOrderPage">
				<image src="../../static/tab/order-message.png" mode=""></image>
				<view class="rt">
					<view>订单消息</view>
					<text>这是订单消息内容</text>
				</view>
			</view> -->
			
			<view class="order-message" @tap="toSystemPage">
				<image src="../../static/tab/system-message.png" mode=""></image>
				<view class="rt">
					<view>系统消息</view>
					<text>这是系统消息内容</text>
				</view>
			</view>
				
			<block v-if="allConversation.length != 0">
				<view class="chat" v-for="(chat,index) in allConversation" :key="index">
					<view class="row" @tap="toChat(chat, chat.userProfile.nick || chat.userProfile.userID)">
						<view class="left">
							<image :src="chat.userProfile.avatar"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="username">{{chat.userProfile.nick}}</view>
								<view class="time">{{chat.lastMessage.lastTime|timeDeal}}</view>
							</view>
							<view class="bottom">
								<view class="msg">{{chat.lastMessage.messageForShow}}</view>
								<view class="tis" v-if="chat.unreadCount>0">{{chat.unreadCount}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			
			<block v-else>
				<view class="no_content">
					<image src="https://sgz.wdttsh.com/mini_static/cut/mess_bg.png" mode="widthFix"></image>
					<text>暂无消息内容</text>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
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
			...mapState({
				uerInfo:state => state.uerInfo,
				hasLogin:state => state.hasLogin,
				allConversation: state => {
					return state.conversation.allConversation
				}
			})
		},

		filters: {
			timeDeal(value) {
				let date = new Date(value *1000)
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let hours = date.getHours()
				if(0<=hours&&hours<=9){
					hours = '0' + hours
				}
				let minute = date.getMinutes()
				if(0<=minute&&minute<=9){
					minute = '0' + minute
				}
				let time = new Date(year + '/' + month + '/' + day)
				let today = new Date()
				let y = today.getFullYear()
				let m = today.getMonth() + 1
				let d = today.getDate()
				let time2 = new Date(y + '/' + m + '/' + d)
				let days = parseInt(time2-time)/1000/3600/24
				if(days==0){
					return `今天 ${hours}:${minute}`
				}else if(days==1){
					return `昨天 ${hours}:${minute}`
				}else{
					return days + '天前'
				}
			},		
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			console.log(this.allConversation)
			// this.sendMessage()
			
			// msgModel.getMsgs((data)=>{
			// 	console.log(data);
			// })
		},
		onShow() {
			// this.loginIm()
			// this.getMsg()
			// this.getMessage()
			// 查询是否授权登录
			// // #ifndef H5
			// uni.getSetting({
			// 	success(res) {
			// 		if (res.authSetting['scope.userInfo']){
			// 			
			// 		}else{
			// 			uni.navigateTo({
			// 				url: '/pages/login/getUserinfo' //跳转到授权页面
			// 			})
			// 		}
			// 	}
			// })
			// // #endif
		},
		methods: {
			...mapMutations(["login"]),
			// sendMessage(){
			// 	let onSdkReady = (event)=>{
			// 		let message = this.tim.createTextMessage({to:'6a257753499144ecb584a244a5458d15',conversationType:'C2C',payload:{text:'Hello world'}});
			// 		this.tim.sendMessage(message)
			// 	}
			// 	this.tim.on(this.TIM.EVENT.SDK_READY, onSdkReady)
			// },
			// getMsg(){
			// 	let onMessageReceived = function(event) {
			// 		console.log(event.data)
			// 	};
			// 	this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
			// },
			// getMessage(){
			// 	let onConversationListUpdated = (event)=>{
			// 		console.log(event.data)
			// 		this.chatList = event.data
			// 	}
			// 	this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED,onConversationListUpdated)
			// },
			navToLogin(){
				uni.navigateTo({
					url: "/pages/login/getUserinfo"
				})
			},
			 te(e){
				 this.chatList.splice(e, 1);
			      //console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
			    },
			    change(open){
			      console.log('当前开启状态：'+ open)
			    },
			toChat(item,name){
				console.log(item)
				console.log(this.tim)
				this.$store.commit('resetCurrentConversation')
				this.$store.commit('resetGroup')
				this.setMessageRead(item)
				this.tim.getConversationProfile(item.conversationID)
					.then((res) => {
						this.$store.commit('updateCurrentConversation',res.data.conversation)
						this.$store.dispatch('getMessageList')
						if(item.type === this.TIM.TYPES.CONV_GROUP){
							let groupID = item.conversationID.substring(5)
							this.tim.getGroupProfile({groupID:groupID})
								.then(res =>{
									this.$store.commit('updateCurrentGroupProfile', res.data.group)
								})
						}
					}) 
				uni.navigateTo({
					url:"/pages/msg/chat?toAccount="+ name
				})
			},
			setMessageRead(item){
				if(item.unreadCount === 0){
					return
				}
				this.tim.setMessageRead({
					conversationID:item.conversationID
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
