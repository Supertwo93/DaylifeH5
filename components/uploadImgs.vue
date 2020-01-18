<template name="uploadImgs">
	<view class="upload_img_box">
		<image v-if="photos.length<6" @tap="selectPhoto" class="add_img" src="/static/cut/upload_photo.png" mode="widthFix"></image>
		<view class="image_item" @tap="previewImage(index)" v-for="(item,index) in photos" :key="index">
			<image class="img" :src="item" mode="aspectFill"></image>
			<view class="del_icon" @tap.stop="deletePhoto(index)"><image src="/static/cut/delete.png" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'uploadImgs',
		data(){
			return{
				
			}
		},
		props:{
			photos: {
				type: Array,
				value: []
			}
		},
		methods:{
			selectPhoto(e){
				var that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// console.log(res.tempFilePaths);
						for(let i in res.tempFilePaths){
							// console.log(res.tempFilePaths[i]);
							uni.uploadFile({
								url: 'https://sgz.wdttsh.com/app/imgUpload/upload', //图片接口
								filePath: res.tempFilePaths[i],
								name: 'img',
								success: (uploadFileRes) => {
									var data = JSON.parse(uploadFileRes.data);
									if(data.resultCode == 1){
										if(that.photos.length >= 6){
											uni.showToast({
												title: "最多发布6张图片",
												icon: 'none'
											})
											return false;
										}
										var url = data.data;
										that.photos.push(url);
										
										console.log(that.photos);
									}else{
										uni.showToast({
											title:data.message,
											icon:'none',
										});
									}
								}
							});
						}
						that.$emit("changes",that.photos)
					},
					fail: (res) => {
						uni.showToast({
							title:'上传失败',
							icon:'none',
						});
					}
				});
			},
			// 删除图片
			deletePhoto(e){
				uni.showModal({
					title: "提示",
					content: "确定删除图片？",
					success: (res) => {
						if(res.confirm){
							this.photos.splice(e, 1);
						}
					}
				})
			},
			// 预览图片
			previewImage(e){
				var that = this;
				uni.previewImage({
					current: that.photos[e],
					urls: that.photos
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.upload_img_box{
		background: #fff;
		margin-bottom: 15rpx;
		padding: 30rpx 20rpx 10rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.add_img,.image_item{
			display: block;
			width: 200rpx;
			height: 200rpx;
			margin: 0 20rpx 20rpx 0;
		}
		.image_item{
			border: 1rpx solid #F2F2F2;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			.img{
				display: block;
				width: 198rpx;
				height: 198rpx !important;
			}
			.del_icon{
				position: absolute;
				background: #fff;
				padding: 10rpx;
				right: 0;
				top: 0;
				image{
					display: block;
					width: 25rpx;
					height: 25rpx;
				}
			}
		}
	}
	.bottom_place{
		height: 100rpx;
	}
	.upload_btn{
		position: fixed;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0;
		left: 0;
		bottom: 0;
		color: #fff;
		font-size: 34rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		.noNumber{
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			opacity:0.6;
		}
	}
</style>
