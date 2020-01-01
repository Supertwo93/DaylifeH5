<template>
	<view>
		<view class="uploadId">
			<view class="star">上传身份证</view>
			<view class="upload">
				<view class="id">
					<image :src="positiveImg" @tap="chooseImg(1)"></image>
					<view class="gray">身份证正面</view>
				</view>
				<view class="id nagative">
					<image :src="nagativeImg" @tap="chooseImg(2)"></image>
					<view class="gray">身份证反面</view>
				</view>
			</view>
		</view>
		<view class="uploadBusiness">
			<view class="star">上传营业执照</view>
			<view class="image"><image :src="business" @tap="chooseImg(3)"></image></view>
			
		</view>
		
		<view class="gray alert">注：确认签约后待商家同意签约，再支付款项</view>
		<view class="submit-button" @tap="confirm">确认办理</view>
	</view>
</template>

<script>
import {FinanceModel} from '@/common/models/finance.js'
const financemodel = new FinanceModel()
export default{
	data(){
		return{
			positiveImg:'/static/cut/upload_idcard.png',
			nagativeImg:'/static/cut/upload_idcard.png',
			business:'/static/cut/upload_idcard.png',
			type:'',
			data:''
		}
	},
	onLoad(options) {
		this.data = JSON.parse(options.data) 
	},
	methods:{
		chooseImg(type){
			uni.chooseImage({
				count:1,
				success:(res)=>{
					console.log(this.type)
					let req = {img:res.tempFilePaths}
					uni.uploadFile({
						url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
						filePath: res.tempFilePaths[0],
						name: 'img',
						success: (uploadFileRes) => {
							let img = uploadFileRes.data;
							img = JSON.parse(img)
							if(type==1){
								console.log(type)
								this.positiveImg = img.data
							}else if(type==2){
								this.nagativeImg = img.data
							}else if(type==3){
								this.business = img.data
							}
						}
					})
				}
			})
		},
		confirm(){
			if(!this.positiveImg.startsWith('http')){
				uni.showToast({
					title:'请上传身份证正面照',
					icon:'none',
					duration:1500
				})
				return
			}
			if(!this.nagativeImg.startsWith('http')){
				uni.showToast({
					title:'请上传身份证反面照',
					icon:'none',
					duration:1500
				})
				return
			}
			if(!this.business.startsWith('http')){
				uni.showToast({
					title:'请上传营业执照',
					icon:'none',
					duration:1500
				})
				return
			}
			
			this.data.idPicture = this.positiveImg + ',' + this.nagativeImg
			this.data.businessLicense = this.business
			let req = JSON.stringify(this.data)
			console.log(req)
			financemodel.signFinance({contract:req},(data)=>{
				console.log(data)
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.uploadId{
	margin-top: 20rpx;
	width:750rpx;
	height:412rpx;
	background-color: #fff;
	padding:0 20rpx;
	.upload{
		display: flex;
		.id{
			width:340rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.nagative{
			margin-left: 30rpx;
		}
	}
}
image{
	width:340rpx;
	height:220rpx;
}
.star{
		height:82rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #F2F2F2;
	}

.uploadBusiness{
	margin-top: 20rpx;
	height:373rpx;
	width:750rpx;
	background-color: #fff;
	padding:0 20rpx;
	.image{
		width:710rpx;
		height:290rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.alert{
	display: flex;
	justify-content: center;
	margin-top: 238rpx;
}
</style>
