<template>
	<view>
		<view class="nav">
			<image @tap="toBack" src="/static/cut/lifecircle/backto.png"></image>
			<view class="title">发布动态</view>
			<view> </view>
		</view>
		<textarea placeholder="快快分享你的心情吧~" v-model="content" placeholder-style="color:#A0A0A0"></textarea>
		<publish-image :photos="goods_photos" @changes="goodsPhoto"></publish-image>
		<view class="submit-button" @tap="submit">确认发布</view>
	</view>
</template>

<script>
	import publishImage from '@/components/publishImage.vue'
	export default{
		data(){
			return{
				content:'',
				goods_photos: [],
				token:''
			}
		},
		components: {
			publishImage
		},
		onLoad(options){
			this.token = options.token
		},
		methods: {
			goodsPhoto(e){
				this.goods_photos = e;
			},
			submit(){
				if(this.content==''){
					uni.showToast({
						title:'请输入分享内容',
						icon:'none',
						duration:1500
					})
					return
				}
				let req = {}
				req.dynamicContent = this.content
				if(this.goods_photos.length>0){
					let image = this.goods_photos.join(',')
					req.dynamicPicture = image
				}
				let that = this
				uni.request({
					url:'https://sgz.wdttsh.com/app/tbUserDynamic/addUserDynamic',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded',
						'token':that.token	 
					},
					success(res){
						console.log(res)
						if(res.data.resultCode==1){
							uni.showToast({
								title:'发布成功',
								duration:1500,
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1500)
						}else{
							uni.showToast({
								title:'请先登录',
								duration:1500,
								icon:'none'
							})
						}
					}
				})
			},
			toBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #fff;
	height:100vh;
}

.nav{
	display: flex;
	padding:0 20rpx;
	align-items: center;
	justify-content: space-between;
	height:88rpx;
	image{
		width:20rpx;
		height:34rpx;
	}
	.title{
		font-size:36rpx;
	}
}


textarea{
		width:750rpx;
		padding:20rpx;
	}


@media (prefers-color-scheme: dark) {
	page{
		background-color: #2d2d2d;
	}
	.nav{
		.title{
			color:#fff;
		}
	}
}



</style>
