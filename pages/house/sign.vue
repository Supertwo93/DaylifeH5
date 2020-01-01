<template>
	<view>
		<view class="top">
			<image :src="data.picture"></image>
			<view class="detail">
				<view class="title">{{data.title}}</view>
				<view class="floor gray">{{data.squareMetre}}㎡ | {{data.floor}}/{{data.attribute}}层</view>
				<view class="price gray">￥{{data.price}}/月</view>
			</view>
		</view>
		
		<view class="graytitle">租客信息</view>
		
		<view class="middle">
			<view class="lf">
				<view class="star">姓名</view>
				<view class="star">性别</view>
				<view class="star">联系电话</view>
				<view class="star">身份证号</view>
			</view>
			<view class="rg">
				<view class="name"><input v-model="name" placeholder="请输入姓名"/></view>
				<view class="sex"><view @tap="femaleOn" :class="{'on':female}">女</view><view @tap="maleOn" :class="{'on':male}">男</view></view>
				<view class="phone"><input placeholder="请输入电话号码" v-model="phone"/></view>
				<view class="iden"><input placeholder="请输入身份证号" v-model="identityNum"/></view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="star">上传身份证</view>
			<view class="upload">
				<view class="positive">
					<image :src="positiveImg" @tap="choosePimg()"></image>
					<!-- <div class="card_img" @tap="choosePimg()" :style="'background: url('+positiveImg+');background-size: 100% 100%;'"></div> -->
					<view>身份证正面</view>
				</view>
				<view class="positive">
					<image :src="nagativeImg" @tap="chooseNimg()" mode="widthFix"></image>
					<view>身份证反面</view>
				</view>
			</view>
		</view>
		
		<view class="submit-button" @tap="confirmSign()">下一步</view>
	</view>
</template>

<script>
import {IndexModel} from '@/common/models/index.js'
let indexmodel = new IndexModel()
export default{
	data(){
		return{
			data:[],
			positiveImg:'/static/cut/upload_idcard.png',
			nagativeImg:'/static/cut/upload_idcard.png',
			name:'',
			sex:'',
			phone:'',
			identityNum:'',
			male:true,
			female:false
		}
	},
	onLoad:function(options){
		let jsondata = JSON.parse(options.data)
		this.data = jsondata
	},
	methods:{
		choosePimg(){
			uni.chooseImage({
				count:1,
				success:(res)=>{
					let req = {img:res.tempFilePaths}
					uni.uploadFile({
						url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
						filePath: res.tempFilePaths[0],
						name: 'img',
						success: (uploadFileRes) => {
							let img = uploadFileRes.data;
							img = JSON.parse(img)
							this.positiveImg = img.data
						}
					})
				}
			})
		},
		chooseNimg(){
			uni.chooseImage({
				count:1,
				success:(res)=>{
					let req = {img:res.tempFilePaths}
					uni.uploadFile({
						url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
						filePath: res.tempFilePaths[0],
						name: 'img',
						success: (uploadFileRes) => {
							let img = uploadFileRes.data;
							img = JSON.parse(img)
							this.nagativeImg = img.data
						}
					})
				}
			})
		},
		confirmSign(){
			if(this.name==''){
				uni.showToast({
					title:'请输入姓名',
					icon:'none',
					duration:1500
				})
				return
			}
			if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				uni.showToast({
					title:'请输入正确的手机号码',
					icon:'none',
					duration:1500
				})
				return
			}
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
			if(this.identityNum == ''){
				uni.showToast({
					title:'请输入身份证号码',
					icon:'none',
					duration:1500
				})
				return
			}
			
			
			this.data.name = this.name
			this.data.identityCard = this.identityNum
			this.data.idenPicture = this.positiveImg + ',' + this.nagativeImg
			this.data.telephone = this.phone
			if(this.male == true){
				this.data.sex = 1
				
			}else if(this.female = true){
				this.data.sex = 0
			}
			
			uni.navigateTo({
				url:'confirmsign?data=' + JSON.stringify(this.data)
			})
		},
		maleOn(){
			this.male = true
			this.female = false
		},
		femaleOn(){
			this.male = false
			this.female = true
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.top{
	width:750rpx;
	height:220rpx;
	background-color: #fff;
	margin-top: 20rpx;
	display: flex;
	padding: 30rpx 20rpx;
	image{
		width:160rpx;
		height:160rpx;
		border-radius:10px;
	}
	.detail{
		margin-left: 20rpx;
		width:550rpx;
		height:160rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

}

.middle{
	background-color: #fff;
	display: flex;
	padding: 0 20rpx;
	width:750rpx;
	height:336rpx;
	.lf{
		width:50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.rg{
		width:50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-end;
		input{
			text-align: right;
		}
		.sex{
			display: flex;
			align-items: center;
			view{
				width:60rpx;
				height:36rpx;
				border:1rpx solid rgba(255,102,0,1);
				display: flex;
				justify-content: center;
				align-items: center;
				color:#FF6600;
			}
			.on{
				background-color: #ff6600;
				color:#fff;
			}
		}
	}
}

.bottom{
	height:412rpx;
	margin-top: 20rpx;
	padding:0 20rpx;
	background-color: #fff;
	.star{
		height:82rpx;
		line-height:82rpx;
		border-bottom:1rpx solid #f2f2f2;
	}
	.upload{
		height:329rpx;
		display: flex;
		.positive{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			width:50%;
			image,.card_img{
				display: block;
				width:340rpx;
				height:220rpx !important;
			}
			view{
				font-size:22rpx;
			}
		}
	}
}
</style>
