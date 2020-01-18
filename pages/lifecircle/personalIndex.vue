<template>
	<view>
		<view class="navbar">
			<view class="top">
				<image class="back" @tap="toIndex" src="/static/cut/lifecircle/backto-white.png"></image>
				<view class="title">个人主页</view>
				<!-- <image @tap="toPublish" class="camera" src="/static/cut/lifecircle/camera-white.png"></image> -->
			</view>
			
			<view v-if="this.type==0" class="down">
				<image :src="item.logoImg"></image>
				<view>{{item.nickname}}</view>
			</view>
			<view v-if="this.type==1" class="down">
				<image :src="item.logoImg"></image>
				<view>{{item.nickname}}</view>
			</view>
		</view>
		
		<view v-if="sellerId!=null&&sellerId!=''" class="myStore">
			<image class="icon" :src="storeInfo.logoPic"></image>
			<view class="storeInfo">
				<view class="title">{{storeInfo.nickName}}</view>
				<view class="score">
					<image  src="/static/cut/star_on.png"></image>
					评分{{storeInfo.mainScore}}
				</view>
			</view>
			<view @tap="toStore" class="button">进店看看</view>
		</view>
		
		<block v-for="(item,index) in data" :key="index">
			<view class="list" @tap="toDetail(item.id)">
				<view class="user">
					<image :src='item.logoImg'></image>
					<view class="info">
						<view class='nickName'>{{item.nickname}}</view>
						<view class="gray">{{item.createTime}}</view>
					</view>
					<view v-if="type==0" @tap.stop="deleteDynamic(item)" class="delete">x</view>
				</view>
				<view class="content">{{item.dynamicContent}}</view>
				
				<view class="one" v-if="item.pictureList.length==1">
					<block v-for="(img,number) in item.pictureList" :key="number">
						<image mode="aspectFit" @tap.stop="preview(item.pictureList,number)" :src="img"></image>
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
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data:'',
				type:'',
				storeInfo:'',
				item:'',
				token:'',
				sellerId:'',
				status:''
			}
		},
		onLoad(options){
			this.status = options.status
			this.type = options.type
			this.token = options.token
			this.item = JSON.parse(options.item)
			this.getList()
		},
		methods:{
			getList(){
				if(this.type==0){
					let req = {}
					req.isMeOrAll = 1
					let that = this
					uni.request({
						url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicList',
						data:req,
						method:'POST',
						header: {
							'content-type':'application/x-www-form-urlencoded', 
							token:that.token
						},
						success(res){
							that.data = res.data.data.userDynamicList
							that.sellerId = that.data[0].sellerId
							console.log(that.sellerId)
							let sellerId = that.data[0].sellerId
							uni.request({
								url:'https://sgz.wdttsh.com/app/seller/findOne',
								data:{
									sellerId
								},
								method:'POST',
								header: {
									'content-type':'application/x-www-form-urlencoded', 
									token:that.token
								},
								success(res){
									that.storeInfo = res.data.data
								}
							})
							// if(res.data.data.userDynamicList.length>0){
							// 	that.data = that.data.concat(res.data.data.userDynamicList)
							// }else{
							// 	that.status = "nomore"
							// }
						}
					})
				}else{
					let req = {}
					req.isMeOrAll = 3
					req.userId = this.item.userId
					let that = this
					uni.request({
						url:'https://sgz.wdttsh.com/app/tbUserDynamic/findUserDynamicList',
						data:req,
						method:'POST',
						header: {
							'content-type':'application/x-www-form-urlencoded',
							'token':that.token
						},
						success(res){
							console.log(res)
							that.data = res.data.data.userDynamicList
							that.sellerId = that.data[0].sellerId
							console.log(that.sellerId)
							let sellerId = that.data[0].sellerId
							uni.request({
								url:'https://sgz.wdttsh.com/app/seller/findSellerOneDetailed',
								data:{
									sellerId
								},
								method:'POST',
								header: {
									'content-type':'application/x-www-form-urlencoded', 
								},
								success(res){
									console.log(res)
									that.storeInfo = res.data.data
								}
							})
						}
					})
				}
			},
			toIndex(){
				if(this.status==0){
					uni.navigateTo({
						url:'/pages/lifecircle/lifecircle?token=' + this.token
					})
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
				
			},
			preview(list,number){
				uni.previewImage({
					urls:list,
					current:number,
				})
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
			deleteDynamic(item){
				let that = this 
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamicReply/deleteUserDynamic',
					data:{
						id:item.id
					},
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded', 
						token:that.token
					},
					success(res){
						uni.showToast({
							title:'删除成功',
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							that.getList()
						},1500)
					}
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:`/pages/lifecircle/detail?id=${item}&token=${this.token}`
				})
			},
			toStore(){
				let ua = navigator.userAgent.toLowerCase()
				if(ua.match(/MicroMessenger/i)=="micromessenger"){
					if(this.type==0){
						uni.navigateTo({
							url:`/pages/shop/myStore?sellerId=${this.sellerId}&type=${this.storeInfo.firstTypeId}`
						})
					}else{
						uni.navigateTo({
							url:`/pages/shop/theStore?sellerId=${this.sellerId}&type=${this.storeInfo.firstTypeId}`
						})
					}
				}else{
					if (window.android) {
						let num = this.type==0?'1':'2'
						window.android.toShop(this.storeInfo.sellerId,num,this.storeInfo.firstTypeId);
					}else if(window.webkit){
						// window.webkit.messageHandlers.getMyStore.postMessage(this.sellerId)
						if(this.type==0){
							window.webkit.messageHandlers.getMyStore.postMessage(this.sellerId)
						}else{
							window.webkit.messageHandlers.getOtherStore.postMessage(this.sellerId)
						}
						
					}else{
						if(this.type==0){
							uni.navigateTo({
								url:`/pages/shop/myStore?sellerId=${this.sellerId}&type=${this.storeInfo.firstTypeId}`
							})
						}else{
							uni.navigateTo({
								url:`/pages/shop/theStore?sellerId=${this.sellerId}&type=${this.storeInfo.firstTypeId}`
							})
						}
					}
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #f2f2f2;
		padding-top: 400rpx;
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
			// justify-content: space-between;
			.back{
				width:21rpx;
				height:36rpx;
			}
			.title{
				margin-left: 260rpx;
				font-size:36rpx;
				font-weight:500;
				color:#fff;
			}
			.camera{
				width:44rpx;
				height:37rpx;
			}
		}
		.down{
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
	
	.myStore{
		height:140rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		.icon{
			width:100rpx;
			height:100rpx;
			border-radius:10rpx;
			margin-left: 20rpx;
		}
		.storeInfo{
			width:440rpx;
			height:100rpx;
			margin-left: 20rpx;
			.title{
				font-size:28rpx;
				color:#1E1E1E;
			}
			.score{
				margin-top: 20rpx;
				font-size:24rpx;
				color:#646464;
				image{
					margin-right: 10rpx;
					width:25rpx;
					height:23rpx;
				}
			}
		}
		.button{
			width:136rpx;
			height:50rpx;
			border:1rpx solid rgba(255,102,0,1);
			border-radius:25rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color:#FF6600;
		}
	}
	
	.list{
		margin: 0;
		margin-top: 20rpx;
		background-color: #fff;
		padding:30rpx;
		.user{
			height:74rpx;
			display: flex;
			.info{
				width:580rpx;
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
