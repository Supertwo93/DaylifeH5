<template>
	<view>
		<!-- 店铺类型选择 -->
		
		<view class="type">
			<view class="star">选择店铺类型</view>
			<view class="btns">
				<view @tap="chooseItem(item)" v-for="item in storeType" :key="item.id" :class="storeIndex==item.id?'on':''" class="typeBtn">
					{{item.item}}
				</view>
			</view>
		</view>
		
		<!-- 所属公司信息 -->
		<view v-if="status==1" class="graytitle">所属公司信息</view>
		<view v-if="status==1" class="infoItem">
			<view class="item star">负责人</view>
			<input v-model="chargeName" placeholder="请输入姓名"/>
		</view>
		<view v-if="status==1" class="infoItem">
			<view class="item star">联系电话</view>
			<input v-model="chargePhone" placeholder="请输入联系电话"/>
		</view>
		<view v-if="status==1" class="infoItem">
			<view class="item star">公司名称</view>
			<input v-model="companyName" placeholder="请输入公司名称"/>
		</view>
		<view v-if="status==1" class="infoItem">
			<view class="item star">公司地址</view>
			<input v-model="companyAddress" placeholder="请输入公司地址"/>
		</view>
		
		<!-- 店铺信息 -->
		<view class="graytitle">店铺信息</view>
		<view class="infoItem">
			<view class="item star">联系人</view>
			<input v-model="contactName" placeholder="请输入姓名"/>
		</view>
		<view v-if="status==0" class="infoItem">
			<view class="item star">身份证号码</view>
			<input v-model="idNo" type="number" placeholder="请输入身份证号码"/>
		</view>
		<view class="infoItem">
			<view class="item star">联系电话</view>
			<input v-model="contactPhone" type="number" placeholder="请输入联系电话"/>
		</view>
		<view class="infoItem">
			<view class="item star">店铺名称</view>
			<input v-model="storeName" placeholder="请输入店铺名称"/>
		</view>
		<view class="infoItem">
			<view class="item star">店铺地址</view>
			<input v-model="storeAddress" disabled="true" @tap="chooseAddress" placeholder="请选择详细地址"/>
		</view>
		<view v-if="storeIndex==8||storeIndex==3||storeIndex==9" class="infoItem">
			<view class="item">服务范围</view>
			<input v-model="service" placeholder="0.0km"/>
		</view>
		
		<!-- 配送设置 -->
		<view v-if="storeIndex==8" class="deliver">
			<view class="star">配送设置</view>
			<view class="item">
				<view>配送费</view>
				<input v-model="deliver" type="number" placeholder="0元或不填则免配送费"/>
			</view>
			<view class="item">
				<view>多少起送</view>
				<input v-model="deliverMin" type="number" placeholder="请输入金额" />
			</view>
		</view>
		
		<!-- 上传身份证 -->
		<view v-if="status==0" class="graytitle star">上传身份证</view>
		<view v-if="status==0" class="upload">
			<view class="first">
				<image :src="positiveImg" @tap="chooseImg(1)" class="firstImage"></image>
				<image :src="nagativeImg"  @tap="chooseImg(2)" class="secondImage"></image>
			</view>
			<view class="second">
				<view class="text">身份证正面</view>
				<view class="text">身份证反面</view>
			</view>
			<view class="third">
				<image :src="handImg"  @tap="chooseImg(3)"></image>
			</view>
			<view class="four">
				<view class="text">手持身份证正面</view>
			</view>
		</view>
		
		<!-- 店铺头像 -->
		<view class="star graytitle">上传店铺头像</view>
		<view class="logoImg">
			<image :src="logoImg" @tap="chooseImg(4)"></image>
		</view>
		
		<!-- 个人营业执照 -->
		<view class="star graytitle">上传营业执照</view>
		<view v-if="status==0" class="personal-license">
			<image :src="personLicense" @tap="chooseImg(5)"></image>
		</view>
		
		<!-- 公司营业执照 -->
		<view v-if="status==1" class="company-license">
			<view class="com">
				<image :src="companyLicenseImg" @tap="chooseImg(6)"></image>
				<view>公司营业执照</view>
			</view>
			<view class="store">
				<image :src="storeLicenseImg" @tap="chooseImg(7)"></image>
				<view>公司营业执照</view>
			</view>
			
		</view>
		
		
		<view @tap="submit" class="submit-button">确认上传</view>
		
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				status:'',
				storeIndex:null,
				storeType:[
					{item:'生活服务',id:8},
					{item:'代购服务',id:10},
					{item:'维修服务',id:9},
					{item:'金融服务',id:5},
					{item:'房屋服务',id:1},
					{item:'家政服务',id:3},
				],
				positiveImg:'/static/cut/upload_idcard.png',
				nagativeImg:'/static/cut/upload_idcard.png',
				handImg:'/static/cut/upload_idcard.png',
				logoImg:'/static/cut/upload_photo.png',
				personLicense:'/static/cut/upload_idcard.png',
				companyLicenseImg:'/static/cut/upload_idcard.png',
				storeLicenseImg:'/static/cut/upload_idcard.png',
				chargeName:'',
				chargePhone:'',
				companyName:'',
				companyAddress:'',
				contactName:'',
				idNo:'',
				contactPhone:'',
				storeName:'',
				storeAddress:'',
				storeLatitude:'',
				storeLongitude:'',
				service:'',
				deliver:'',
				deliverMin:'',
			}
		},
		onLoad(options){
			this.status = options.status
			if(this.status==1){
				uni.setNavigationBarTitle({
					title:'公司开店'
				})
			}
		},
		methods:{
			chooseItem(item){
				this.storeIndex = item.id
			},
			chooseAddress(){
				var that = this;
				uni.chooseLocation({
				    success: function (res) {
						console.log(res)
						that.storeAddress = res.name;
						that.storeLatitude = res.latitude
						that.storeLongitude = res.longitude
				    }
				})
			},
			chooseImg(type){
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
								if(type==1){
									this.positiveImg = img.data
								}else if(type==2){
									this.nagativeImg = img.data
								}else if(type==3){
									this.handImg = img.data
								}else if(type==4){
									this.logoImg = img.data
								}else if(type==5){
									this.personLicense = img.data
								}else if(type==6){
									this.companyLicenseImg = img.data
								}else if(type==7){
									this.storeLicenseImg = img.data
								}
							}
						})
					}
				})
			},
			showToast(data){
				uni.showToast({
					title:data,
					icon:'none',
					duration:1500
				})
			},
			async submit(){
				if(this.storeIndex==null){
					this.showToast('请选择店铺类型')
					return
				}
				if(this.status==1){
					if(this.chargeName==''){
						this.showToast('请输入负责人姓名')
						return
					}
					if(this.chargePhone==''){
						this.showToast('请输入公司联系电话')
						return
					}
					if(this.companyName==''){
						this.showToast('请输入公司名称')
						return
					}
					if(this.companyAddress==''){
						this.showToast('请输入公司地址')
						return
					}
				}
				if(this.contactName==''){
					this.showToast('请输入店铺联系人')
					return
				}
				if(this.contactPhone==''){
					this.showToast('请输入店铺联系电话')
					return
				}
				if(this.storeName==''){
					this.showToast('请输入店铺名称')
					return
				}
				if(this.storeAddress==''){
					this.showToast('请选择详细地址')
					return
				}
				if(this.storeIndex==8){
					if(this.deliver==''){
						this.showToast('请输入配送费')
						return
					}
					if(this.deliverMin==''){
						this.showToast('请输入起送价')
						return
					}
				}
				if(this.status==1){
					let req = {}
					req.companyLeader = this.chargeName
					req.companyPhone = this.chargePhone
					req.companyName = this.companyName
					req.companyAddress = this.companyAddress
					req.companyBusinessLicenseImg = this.companyLicenseImg
					req.linkmanName = this.contactName
					req.linkmanMobile = this.contactPhone
					req.nickName = this.storeName
					req.address = this.storeAddress
					req.latitudeLongitude = `${this.storeLongitude},${this.storeLatitude}`
					req.logoPic = this.logoImg
					req.licenseNumber = this.storeLicenseImg
					req.firstTypeId = this.storeIndex
					if(this.storeIndex==8){
						req.deliveryFee = this.deliver
						req.startingAndDeliveringFee = this.deliverMin
					}
					usermodel.companyCerAndOpeningStore(req,data=>{
						uni.reLaunch({
							url:'submitSuccess'
						})
					})
				}else{
					let req = {}
					req.personalTrueName  = this.contactName
					req.personalCardNo = this.idNo
					req.personalFaceCardImg = this.positiveImg
					req.personalBackCardImg  = this.nagativeImg
					req.personalHandCardImg  = this.handImg
					req.linkmanMobile  = this.contactPhone
					req.nickName = this.storeName
					req.latitudeLongitude = `${this.storeLongitude},${this.storeLatitude}`
					req.logoPic = this.logoImg
					req.licenseNumber = this.personLicense
					req.firstTypeId = this.storeIndex
					let baidureq = {}
					baidureq.ak = 'HxzxzR81OgNB9Z1izacsQMeq4A9Ii0ck'
					baidureq.output = 'json'
					baidureq.location = `${this.storeLatitude},${this.storeLongitude}`
					await this.$jsonp('http://api.map.baidu.com/reverse_geocoding/v3/',baidureq).then(json =>{
						const {result:res} = json
						req.province = res.addressComponent.province
						req.city = res.addressComponent.city
					})
					if(this.storeIndex==8){
						req.deliveryFee = this.deliver
						req.startingAndDeliveringFee = this.deliverMin
					}
					usermodel.personalCerAndOpeningStore(req,data=>{
						uni.reLaunch({
							url:'submitSuccess'
						})
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
		padding-bottom: 110rpx;
	}
	.type{
		margin-top: 20rpx;
		background-color: #fff;
		padding:30rpx 20rpx;
		.star{
			colro:#646464;
		}
		.btns{
			display: flex;
			flex-wrap:wrap;
			.typeBtn{
				margin-top: 20rpx;
				margin-right:20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width:140rpx;
				height:50rpx;
				font-size:24rpx;
				background:rgba(255,255,255,1);
				border:1rpx solid rgba(200,200,200,1);
				border-radius:8rpx;
				&.on{
					border:1rpx solid rgba(255,102,0,1);
					color:#ff6600;
				}
			}
		}
	}
	
	.infoItem{
		display: flex;
		background-color: #fff;
		height:84rpx;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		.item{
			display: flex;
			justify-content: flex-end;
			width:150rpx;
		}
		input{
			margin-left: 20rpx;
			font-size:26rpx;
		}
	}
	
	.deliver{
		margin-top: 20rpx;
		background-color: #fff;
		padding:30rpx 20rpx;
		.star{
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.item{
			display: flex;
			height:64rpx;
			align-items: center;
			margin-top: 20rpx;
			view{
				display: flex;
				justify-content: flex-end;
				width:130rpx;
				margin-right: 20rpx;
			}
			input{
				width:589rpx;
				height:64rpx;
				font-size:24rpx;
				padding-left:20rpx;
				background:rgba(255,255,255,1);
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
			}
		}
	}
	
	.upload{
		background-color: #fff;
		padding-top:30rpx;
		image{
			width:340rpx;
			height:220rpx;
		}
		.first{
			.firstImage{
				margin-left:20rpx;
			}
			.secondImage{
				margin-left:30rpx;
				margin-right:20rpx;
			}
		}
		.second{
			height:79rpx;
			display: flex;
			view{
				width:50%;
				display: flex;
				justify-content: center;
			}
		}
		.third{
			display: flex;
			justify-content: center;
		}
		.four{
			display:flex;
			align-items: center;
			justify-content: center;
			height:69rpx;
		}
	}
	
	.logoImg{
		background-color: #fff;
		padding:30rpx 275rpx;
		image{
			width:200rpx;
			height:200rpx;
		}
	}
	
	.personal-license{
		background-color: #fff;
		padding:30rpx 205rpx;
		image{
			width:340rpx;
			height:220rpx;
		}
	}
	
	.company-license{
		background-color: #fff;
		padding:30rpx 20rpx;
		display: flex;
		.com{
			margin-right: 30rpx;
		}
		.com,.store{
			display: flex;
			flex-direction: column;
			align-items: center;
			
		}
		image{
			margin-bottom: 10rpx;
			width:340rpx;
			height:220rpx;
		}
	}
</style>
