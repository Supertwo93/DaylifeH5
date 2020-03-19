<template>
	<view :class="isShowDC?'paddingView':''" @tap="isShowDC=false">
		<view class="back">
			<image @tap="toBack" src="/static/cut/leftIcon.png"></image>
			<view>详情</view>
		</view>
		<view class="box">
			<view class="user" @tap="toUser">
				<image :src='item.logoImg'></image>
				<view class="info">
					<view class='nickName'>{{item.nickname}}</view>
					<view class="gray">{{item.createTime}}</view>
				</view>
			</view>
			<view class="content">{{item.dynamicContent}}</view>
			
			<view class="one" v-if="item.pictureList.length==1">
				<image mode="widthFix" :src="item.dynamicPicture"></image>
			</view>
			<view class="two" v-if="item.pictureList.length==2">
				<block v-for="(img,number) in item.pictureList" :key="number">
					<image :src="img"></image>
				</block>
			</view>
			<view class="three" v-if="item.pictureList.length==3">
				<block v-for="(img,number) in item.pictureList" :key="number">
					<image :src="img"></image>
				</block>
			</view>
			<view class="two" v-if="item.pictureList.length==4">
				<block v-for="(img,number) in item.pictureList" :key="number">
					<image :src="img"></image>
				</block>
			</view>
			<view class="three" v-if="item.pictureList.length>=5">
				<block v-for="(img,number) in item.pictureList" :key="number">
					<image :src="img"></image>
				</block>
			</view>
			
			<view class="bottom">
				<view class="lf">已浏览{{item.browseNumber}}次</view>
				<view class="rt">
					<image @tap.stop="like(0,item)" v-if="item.isGiveTheThumbsUp==0" src="/static/cut/lifecircle/good.png"></image>
					<image @tap.stop="like(1,item)" v-if="item.isGiveTheThumbsUp==1" src="/static/cut/lifecircle/goodon.png"></image>
					<view :class="item.isGiveTheThumbsUp==0?'':'on'">{{item.numberOfPoints}}</view>
					<image @tap="focusButn" src="/static/cut/lifecircle/comment.png"></image>
					<view>{{item.commentNumber}}</view>
				</view>
			</view>
		</view>
		
		<view class="commentList" v-if="item.userDynamicCommentViewList.length>0">
			<block v-for="(data,index) in item.userDynamicCommentViewList" :key="index">
				<view class="top">
					<view @tap="toUserPage(data)" class="lf">
						<image :src="data.logoImg"></image>
						<view class="info">
							<view class="name">{{data.nickname}}</view>
							<view class="time">{{data.createTime}}</view>
						</view>
					</view>
					<view @tap="reply(data)" class="rt">回复</view>
				</view>
				<view @tap.stop="replyOrDelete(data)" class="middle">{{data.replyContent}}</view>
				<view class="bottom"  v-if="data.userCommentReplyList.length>0">
					<block v-for="(item,digit) in data.userCommentReplyList" :key="digit">
						<view v-if="digit==0" @tap="replyUser(item,data.id)" class="item">
							<text class="blue">{{item.replyNickname}}：</text>{{item.replyContent}}
						</view>
						<view v-else @tap="replyUser(item,data.id)" class="item">
							<text class="blue">{{item.replyNickname}}</text>回复<text class="blue">{{item.passiveNickname}}</text>:{{item.replyContent}}
						</view>
					</block>
				</view>
			</block>
		</view>
		
		<view :class="isIOS?'ios':''" class="toComment" v-if="showInput">
			<input v-model="comment" :placeholder="placeholder" :focus="focus" />
			<view @tap="send">发送</view>
		</view>
		
		<view class="deleteOrCancel" v-if="isShowDC">
			<view class="delete" @tap="deleteComment">删除</view>
			<view class="cancel">取消</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				id:'',
				token:'',
				item:'',
				focusInput: false,
				comment:'',
				showInput:false,
				focus:false,
				placeholder:'',
				type:'',
				replyData:'',
				replyItemData:'',
				itemId:'',
				isShowDC:false,
				status:'',
				isIOS:false
			}
		},
		computed:{
			...mapState(['hasLogin','lat','lon','uerInfo'])
		},
		methods: {
			toBack(){
				if(this.status==0){
					uni.navigateTo({
						url:'/pages/lifecircle/lifecircle?token=' + this.token
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				uni.navigateBack({
					delta:1
				})
			},
			queryDetail() {
				
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicDetails',
					data:{
						id:that.id
					},
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',	
						 'token':that.token||''
					},
					success(res){
						that.item = res.data.data
						console.log(that.item)
					}
				})
			},
			blur(){
				this.showInput = false
				this.focus = false
			},
			reply(data){
				this.replyData = data
				this.showInput = true
				this.focus = true
				this.placeholder = `回复:${data.nickname}`
				this.type = '回复'
				console.log(data)
			},
			replyUser(item,id){
				console.log(item,id)
				this.replyItemData = item
				this.showInput = true
				this.focus = true
				this.itemId = id
				this.placeholder = `回复:${item.replyNickname}`
				this.type = '用户回复'
			},
			replyOrDelete(data){
				console.log(this.item.userId,data.userId)
				if(this.item.userId==data.userId){
					this.isShowDC = true
				}
			},
			send(){
				this.showInput = false
				let that = this
				let req = {}
				req.userDynamicId = this.item.id
				req.replyContent = this.comment
				if(this.type=='回复'){
					req.fid = this.replyData.id
					req.passiveUserId = this.replyData.userId
				}else if(this.type=='评论'){
					req.fid = 0
				}else if(this.type='用户回复'){
					req.fid = this.itemId
					req.passiveUserId = this.replyItemData.replyUserId
				}
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamicReply/addCommentDynamic',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						token:that.token
					},
					success(res){
						that.queryDetail()
						that.showInput = false
						that.focus = false
						that.comment = ''
					}
				})
			},
			toUser(){
				console.log(this.item)
				let that = this
				if(this.item.userId==this.uerInfo.appuserId){
					let data = {}
					data.logoImg = that.item.logoImg
					data.nickname=that.item.nickname
					uni.navigateTo({
						url:'personalIndex?type=0&token=' + that.token + '&item=' + JSON.stringify(data)
					})
				}else{
					let data = {}
					data.logoImg = that.item.logoImg
					data.nickname=that.item.nickname
					data.userId = that.item.userId
					uni.navigateTo({
						url:'personalIndex?type=1&item=' + JSON.stringify(data) + '&token=' + that.token
					})
				}
			},
			toUserPage(data){
				let that = this
				if(data.userId==this.uerInfo.appuserId){
					let info = {}
					info.logoImg = data.logoImg
					info.nickname= data.nickname
					uni.navigateTo({
						url:'personalIndex?type=0&token=' + that.token + '&item=' + JSON.stringify(info)
					})
				}else{
					let info = {}
					info.logoImg = data.logoImg
					info.nickname = data.nickname
					info.userId = data.userId
					console.log(info)
					uni.navigateTo({
						url:'personalIndex?type=1&item=' + JSON.stringify(info) + '&token=' + that.token
					})
				}
			},
			focusButn(){
				this.placeholder = '点击输入评论'
				this.showInput = true
				this.focus = true
				this.type = '评论'
			},
			like(index,item){
				if(this.token == ''){
					uni.showToast({
						title:'请先登录',
						duration:1500,
						icon:'none'
					})
					return
				}
				
				console.log(this.token)
				let that = this
				if(index==0){
					item.isGiveTheThumbsUp = 1
					item.numberOfPoints += 1
					uni.request({
						url:'https://sgz.wdttsh.com/app/tbUserDynamicPraise/addUserDynamicPraise',
						data:{
							userDynamicId:item.id
						},
						method:'POST',
						header: {
							'content-type':'application/x-www-form-urlencoded', 
							'token':that.token
						},
						success(res){
						}
					})
				}else if(index==1){
					item.isGiveTheThumbsUp = 0
					item.numberOfPoints -= 1
					uni.request({
						url:'https://sgz.wdttsh.com/app/tbUserDynamicPraise/cancelUserDynamicPraise',
						data:{
							userDynamicId:item.id
						},
						method:'POST',
						header: {
							'content-type':'application/x-www-form-urlencoded',
							'token':that.token
						},
						success(res){
						}
					})
				}
			},
		},
		
		onLoad(options){
			this.status = options.status
			this.id = options.id
			this.token = options.token
			this.queryDetail()
			if(window.webkit){
				this.isIOS = true
			}
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
		height:100vh;
	}
	.box{
		margin-top: 20rpx;
		background-color: #fff;
		padding:30rpx;
		.user{
			height:74rpx;
			display: flex;
			.info{
				.nickName{
					font-size: 30rpx;
					color:#1E1E1E;
				}
				.gray{
					color:#A0A0A0;
				}
			}
			image{
				margin-right: 10rpx;
				height:74rpx;
				width:74rpx;
				border-radius:50%;
			}
		}
		.content{
			margin: 20rpx 0;
			font-size: 28rpx;
			color:#1E1E1E;
		}
		.one{
			image{
				width:360rpx;
				height:360rpx;
			}
		}
		.two{
			display: flex;
			flex-wrap:wrap;
			image{
				margin-right: 10rpx;
				width:300rpx;
				height:300rpx;
				margin-bottom: 10rpx;
			}
		}
		.three{
			display: flex;
			flex-wrap: wrap;
			image{
				margin-right: 7rpx;
				width:225rpx;
				height:225rpx;
				margin-bottom: 7rpx;
			}
		}
		.bottom{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			.lf{
				color:#A0A0A0;
			}
			.rt{
				display: flex;
				view{
					margin-left: 10rpx;
					&.on{
						color:#ff6600;
					}
				}
				image{
					margin-left: 50rpx;
					width:36rpx;
					height:36rpx;
				}
			}
			
		}
	}
	
	.toComment{
		margin-top: 20rpx;
		height:110rpx;
		background-color: #f0f0f0;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		&.ios{
			bottom:40rpx;
		}
		input{
			width:580rpx;
			background-color:#fff;
			height:70rpx;
			padding-left:20rpx;
			border-radius:8rpx;
			
		}
		view{
			width:110rpx;
			height:70rpx;
			margin-left: 20rpx;
			color: #ff6600;
			font-size:30rpx;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			border-radius:8rpx 8rpx 8rpx 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color:#fff;
		}
	}
	
	.commentList{
		margin:20rpx 0;
		background-color: #fff;
		padding:30rpx;
		.top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.lf{
				display: flex;
				image{
					width:74rpx;
					height:74rpx;
					border-radius:50%;
				}
				.info{
					margin-left: 10rpx;
					.name{
						font-size:30rpx;
						color:rgba(80,80,80,1);
					}
					.time{
						font-size:24rpx;
						color:rgba(160,160,160,1);
					}
				}
			}
			.rt{
				color:#ff6600;
			}
		}
		.middle{
			width:580rpx;
			margin: 30rpx 0 30rpx 90rpx;
		}
		.bottom{
			width:580rpx;
			margin: 30rpx 0 30rpx 90rpx;
			background-color: #F6F6F6;
			padding:20rpx 30rpx 30rpx 20rpx;
			.item{
				margin-bottom: 20rpx;
				&.item:last-child{
					margin: 0;
				}
				.blue{
					color:#006CFF;
				}
			}
		}
	}
	
	.deleteOrCancel{
		position: fixed;
		width:750rpx;
		bottom: 0;
		height:180rpx;
		background-color: #f2f2f2;
		view{
			background-color: #fff;
			height:80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.delete{
			color:#ff6600;
			border-bottom: 1rpx solid #f2f2f2;
			border-top: 1rpx solid #f2f2f2;
			border-radius: 8rpx 8rpx 0 0;
			margin-bottom: 20rpx;
		}
	}
	// .paddingView{
	// 	padding-bottom: 180rpx;
	// }
	
	.back{
		height:88rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding:0 20rpx;
		image{
			width:20rpx;
			height:34rpx;
		}
		view{
			font-size:36rpx;
			margin-left: 299rpx;
		}
	}
	
	@media (prefers-color-scheme: dark) { 
		page{
			background-color: #141414;
		}
		
		.back{
			background-color: #141414;
		}
		
		.box{
			background-color: #2D2D2D;
			.user{
				.info{
					.nickName{
						color: #fff;
					}
				}
			}
			.content{
				color: #fff;
			}
		}
		
		.commentList{
			background-color: #2d2d2d;
			.top{
				.lf{
					.info{
						.name{
							color: #fff;
						}
					}
				}
			}
			.middle{
				color:#fff;
			}
			.bottom{
				background-color: #3C3C3C;
			}
		}
		
	}
	
	
	
</style>
