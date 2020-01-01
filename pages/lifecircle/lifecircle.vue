<template>
	<view>
		<view class="navbar">
			<view class="top">
				<image class="back" @tap="toIndex" src="/static/cut/lifecircle/backto-white.png"></image>
				<view class="title">生活圈</view>
				<image @tap="toPublish" class="camera" src="/static/cut/lifecircle/camera-white.png"></image>
			</view>
			
			<view class="bottom" @tap="toMyPage">
				<image :src="userIcon"></image>
				<view>{{userName}}</view>
			</view>
		</view>
		
		<view :class="scrollTop>200?'fix':''" class="tabbar">
			<view @tap="clickTab(0)" class="tab" :class="tabIndex==0?'light':''">热门动态</view>
			<view @tap="clickTab(1)" class="tab" :class="tabIndex==1?'light':''">最新动态</view>
		</view>
		
		<block v-for="(item,index) in data" :key="index">
			<view class="list" @tap="toDetail(item.id)">
				<view class="user">
					<image @tap.stop="toOtherPage(item)" :src='item.logoImg'></image>
					<view class="info">
						<view class='nickName'>{{item.nickname}}</view>
						<view class="gray">{{item.createTime|timeDeal}}</view>
					</view>
				</view>
				<view class="content">{{item.dynamicContent}}</view>
				
				<view class="one" v-if="item.pictureList.length==1">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image mode="widthFix" @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="two" v-if="item.pictureList.length==2">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="three" v-if="item.pictureList.length==3">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="two" v-if="item.pictureList.length==4">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				<view class="three" v-if="item.pictureList.length>=5">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image @tap.stop="preview(item.pictureList,number)" :src="img"></image>
					</block>
				</view>
				
				<view class="bottom">
					<view class="lf">已浏览{{item.browseNumber}}次</view>
					<view class="rt">
						<image @tap.stop="like(0,item)" v-if="item.isGiveTheThumbsUp==0" src="/static/cut/lifecircle/good.png"></image>
						<image @tap.stop="like(1,item)" v-if="item.isGiveTheThumbsUp==1" src="/static/cut/lifecircle/goodon.png"></image>
						<view :class="item.isGiveTheThumbsUp==0?'':'on'">{{item.numberOfPoints}}</view>
						<image src="/static/cut/lifecircle/comment.png"></image>
						<view>{{item.commentNumber}}</view>
					</view>
				</view>
				
			</view>
		</block>
		
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			uniLoadMore
		},
		filters:{
			timeDeal(value){
				console.log(value)
				let date = value.toString()
				let year = value.substring(0,4)
				let month = value.substring(5,7)
				let day = date.substring(8,10)
				let time = new Date(year + '/' + month + '/' + day)
				let today = new Date()
				let y = today.getFullYear()
				let m = today.getMonth() + 1
				let d = today.getDate()
				let time2 = new Date(y + '/' + m + '/' + d)
				console.log(time2,time)
				let days = parseInt(time2-time)/1000/3600/24
				if(days==0){
					return '今天 ' +  value.substring(11,16)
				}else if(days==1){
					return '昨天 ' +  value.substring(11,16)
				}else{
					return days + '天前'
				}
			}
		},
		data() {
			return {
				data:[],
				tabIndex:0,
				pageNo:1,
				token:'',
				status:'loading',
				scrollTop:'',
				userIcon:'',
				userName:'',
				userId:''
			}
		},
		onLoad(options){
			this.token = options.token
		},
		onShow() {
			console.log(111)
			this.getUserInfo()
			this.requestData()
		},
		onReachBottom(){
			this.pageNo += 1
			this.requestData()
		},
		onPageScroll(event){
			console.log(event)
			this.scrollTop = event.scrollTop
		},
		methods: {
			like(index,item){
				
				if(this.token == ''){
					uni.showToast({
						title:'请先登录',
						duration:1500,
						icon:'none'
					})
					return
				}
			
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
			add(){
				console.log(111)
			},
			toPublish(){
				if(this.token==''){
					const android = window.android
					if (window.android) {
						window.android.toLogin();
					}else{
						uni.showToast({
							duration:1500,
							title:'请先登录',
							icon:'none'
						})
					}
				}else{
					uni.navigateTo({
						url:`/pages/lifecircle/publish?token=${this.token}`
					})
				}
				
			},
			clickTab(index){
				this.tabIndex = index
				this.data = []
				this.pageNo = 1
				this.requestData()
			},
			toIndex(){
				
				if (window.android) {
					window.android.finish()
				}else if(window.webkit){
					window.webkit.messageHandlers.getBack.postMessage(0)
				} else {
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
				
			},
			toDetail(item){
				uni.navigateTo({
					url:`/pages/lifecircle/detail?id=${item}&token=${this.token}`
				})
			},
			preview(list,number){
				uni.previewImage({
					urls:list,
					current:number,
				})
			},
			getUserInfo(){
				let that = this
				if(this.token!=''){
					uni.request({
						url:'https://sgz.wdttsh.com/app/appuser/getAppUser',
						method:'POST',
						header: {
							'content-type':'application/x-www-form-urlencoded', 
							token:that.token||''
						},
						success(res){
							that.userId = res.data.data.appuserId
							that.userIcon = res.data.data.logoImg
							that.userName = res.data.data.nickname
						}
					})
				}else{
					that.userIcon = '/static/cut/lifecircle/nologin.png'
					that.userName = '未登录'
				}
			},
			requestData(){
				let req = {}
				if(this.tabIndex==0){
					req.type = 2
				}
				req.pageNo = this.pageNo
				req.pageSize = 10
				req.isMeOrAll = 2
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicList',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded', 
						token:that.token||''
					},
					success(res){
						if(res.data.data.userDynamicList.length>0){
							if(req.pageNo == 1){
								that.data = res.data.data.userDynamicList
							}else{
								that.data = that.data.concat(res.data.data.userDynamicList)
							}
						}else{
							that.status = "nomore"
						}
					}
				})
			},
			toMyPage(){
				if(this.token!=''){
					let data = {}
					data.logoImg = this.userIcon
					data.nickname=this.userName
					console.log(JSON.stringify(data))
					uni.navigateTo({
						url:'personalIndex?type=0&token=' + this.token + '&item=' + JSON.stringify(data)
					})
				}else{
					uni.showToast({
						title:'请先登录',
						icon:'none',
						duration:1500
					})
				}
			},
			toOtherPage(item){
				if(item.userId==this.userId){
					let data = {}
					data.logoImg = this.userIcon
					data.nickname=this.userName
					uni.navigateTo({
						url:'personalIndex?type=0&token=' + this.token + '&item=' + JSON.stringify(data)
					})
				}else{
					uni.navigateTo({
						url:'personalIndex?type=1&item=' + JSON.stringify(item) + '&token=' + this.token
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
		padding-top:490rpx;
	}
	.navbar{
		position: absolute;
		top:0;
		height:400rpx;
		width: 750rpx;
		background:url('~@/static/userbg.png');
		background-size: 750rpx 400rpx;
		padding: 0 20rpx;
		z-index: 99;
		.top{
			height:88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.back{
				width:21rpx;
				height:36rpx;
			}
			.title{
				font-size:32rpx;
				font-weight:500;
				color:#fff;
			}
			.camera{
				width:44rpx;
				height:37rpx;
			}
		}
		.bottom{
			height:312rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			image{
				margin-top: 80rpx;
				width:120rpx;
				height:120rpx;
				border-radius:60rpx;
			}
			view{
				font-size:32rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
		}
		
	}
	
	.tabbar{
		position: absolute;
		top:400rpx;
		width:750rpx;
		background-color: #fff;
		height:90rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		z-index:99;
		&.fix{
			position: fixed;
			top:0;
		}
		.tab{
			height:90rpx;
			line-height: 90rpx;
			font-size:32rpx;
			font-weight:500;
			color:rgba(60,60,60,1);
			&.light{
				color:rgba(255,102,0,1);
				border-bottom: 6rpx solid #FF6600;
			}
		}
	}
	
	.list{
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
				width:400rpx;
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
						color:#FF6600;
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
</style>
