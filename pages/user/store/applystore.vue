<template>
	<view>
		<!-- 选择店铺类型 -->
		<view class="chooseStoreType">
			<view class="star">选择店铺类型</view>
			<view class="items">
				<view @tap="chooseType(index)" class="button" v-for="(item,index) in typeList" :class="[typeIndex==index?'on':'']" :key="index">{{item.name}}</view>
			</view>
		</view>
		
		<!-- 设置店铺基本信息 -->
		<view class="graytitle">基本信息</view>
		<view class="item"><view class="star">店铺名称</view><input v-model="storeName" placeholder="请输入店铺名"/></view>
		<view class="item"><view class="star">联系人</view><input v-model="name" placeholder="请输入姓名"/></view>
		<view class="item"><view class="star">联系电话</view><input v-model="phone" placeholder="请输入联系电话"/></view>
		<view class="item"><view class="normal">邮箱地址</view><input v-model="email" placeholder="邮箱地址"/></view>
		<view class="item"><view class="normal">服务范围</view><input v-model="serviceRange" placeholder="0.0km"/></view>
		<view class="item"><view class="star">店铺地址</view><input v-model="address" placeholder="店铺地址"/></view>
		
		<!-- 配送设置 -->
		<view class="deliverSetting">
			<view class="star">配送设置</view>
			<view class="fee">
				<view class="title">配送费</view>
				<view class="itemChoose">
					<view class="noFee">
						<view class="free">免配送费</view>
						<image @tap="chooseNofee" v-if="noFee==0" :src="src[0]"></image>
						<image @tap="chooseNofee" v-if="noFee==1" :src="src[1]"></image>
					</view>
					<view class="hasFee">
						<view class="nofree">有配送费:<input v-model="deliver" placeholder="请输入"/></view>
						<image @tap="chooseHasfee" v-if="hasFee==0" :src="src[0]"></image>
						<image @tap="chooseHasfee" v-if="hasFee==1" :src="src[1]"></image>
					</view>
				</view>
			</view>
			<view class="settingMin">
				<view class="title">多少起送</view>
				<view class="setting"><input v-model="min" placeholder="请输入金额"/></view>
			</view>
		</view>
		
		<!-- 上传logo -->
		<view class="graytitle">上传logo</view>
		<view class="upload">
			<image @tap="chooseImg(1)" :src="logoImg"></image>
		</view>
		
		<!-- 上传营业执照 -->
		<view class="graytitle">上传营业执照</view>
		<view class="uploadLisence">
			<image @tap="chooseImg(2)" :src="lisenceImg"></image>
		</view>
		
		<view @tap="confirm" class="submit-button">确认提交</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	import {IndexModel} from '@/common/models/index.js'
	const indexmodel = new IndexModel()
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				typeIndex:0,
				typeList:[
					{name:'生活服务',type:'生活',id:8},
					{name:'代购服务',type:'代购',id:10},
					{name:'维修服务',type:'维修',id:9},
					{name:'金融服务',type:'金融',id:5},
					{name:'房屋服务',type:'房屋',id:1},
					{name:'家政服务',type:'家政',id:3},
				],
				storeName:'',
				name:'',
				phone:'',
				email:'',
				serviceRange:'',
				address:'',
				noFee:true,
				hasFee:false,
				src:['/static/cut/no_selected.png','/static/cut/choosed.png'],
				logoImg:'/static/cut/user/uploadgoodsimg.png',
				lisenceImg:'/static/cut/upload_idcard.png',
				deliver:'',
				min:''
			}
			
		},
		onLoad(){
		},
		methods:{
			chooseType(index){
				this.typeIndex = index
			},
			chooseNofee(){
				this.noFee = true;
				this.hasFee = false;
			},
			chooseHasfee(){
				this.hasFee = true;
				this.noFee = false;
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
									console.log(type)
									this.logoImg = img.data
								}else if(type==2){
									this.lisenceImg = img.data
								}
							}
						})
					}
				})
			},
			confirm(){
				if(this.storeName==''){
					uni.showToast({
						title:'请输入店铺名',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.name==''){
					uni.showToast({
						title:'请输入姓名',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.phone==''){
					uni.showToast({
						title:'请输入联系电话',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.address==''){
					uni.showToast({
						title:'请输入店铺地址',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.min==''){
					uni.showToast({
						title:'请输入起送金额',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(!this.logoImg.startsWith('http')){
					uni.showToast({
						title:'请上传logo图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(!this.lisenceImg.startsWith('http')){
					uni.showToast({
						title:'请上传营业执照',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.hasFee==true){
					if(this.deliver==''){
						uni.showToast({
							title:'请输入配送费',
							duration:1500,
							icon:'none'
						})
						return
					}
				}
				let req = {}
				req.nickName = this.storeName
				req.logoPic = this.logoImg
				req.linkmanName = this.name
				req.latitudeLongitude = "22.7168700000,114.2410500000"
				req.address = this.address
				req.licenseNumber = this.lisenceImg
				req.linkmanMobile = this.phone
				req.firstTypeId = this.typeList[this.typeIndex].id
				req.firstType = this.typeList[this.typeIndex].type
				usermodel.openStore(req,(data)=>{
					uni.showToast({
						title:'提交资料成功，请耐心等待审核',
						icon:'none',
						duration:3000
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
						})
					},3000)
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom: 100rpx;
}
.chooseStoreType{
	margin-top: 20rpx;
	background-color: #fff;
	height:224rpx;
	padding:30rpx 19rpx;
	.items{
		display: flex;
		flex-wrap: wrap;
		.button{
			width:140rpx;
			height:50rpx;
			border:1rpx solid rgba(200,200,200,1);
			border-radius:8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
		.on{
			border:1px solid rgba(255,102,0,1);
			color:#ff6600;
		}
	}
}
.item{
	display: flex;
	background-color: #fff;
	border-bottom: 1rpx solid #f2f2f2;
	height:84rpx;
	display: flex;
	align-items: center;
	padding:0 20rpx;
	view{
		display: flex;
		width:120rpx;
		justify-content: flex-end;
	}
	input{
		margin-left: 20rpx;
	}
}

.deliverSetting{
	margin-top: 20rpx;
	height:420rpx;
	background-color: #fff;
	padding:0 20rpx;
	.star{
		display: flex;
		height:83rpx;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
	}
	.fee{
		margin-top: 30rpx;
		display: flex;
		height:212rpx;
		.title{
			width:121rpx;
		}
		.itemChoose{
			.noFee{
				display: flex;
				height:64rpx;
				margin-bottom: 30rpx;
				align-items: center;
				.free{
					width:540rpx;
					height:64rpx;
					background:rgba(255,255,255,1);
					border:1rpx solid rgba(100,100,100,1);
					border-radius:8rpx;
					display: flex;
					align-items: center;
					padding-left:20rpx;
				}
				image{
					width:28rpx;
					height:28rpx;
					margin-left: 20rpx;
				}
			}
			.hasFee{
				display: flex;
				height:64rpx;
				align-items: center;
				.nofree{
					display: flex;
					width:540rpx;
					height:64rpx;
					background:rgba(255,255,255,1);
					border:1rpx solid rgba(100,100,100,1);
					border-radius:8rpx;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
					input{
						padding-left: 20rpx;
					}
				}
				image{
					width:28rpx;
					height:28rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
	.settingMin{
		display: flex;
		align-items: center;
		.title{
			width:121rpx;
		}
		.setting{
			display: flex;
			align-items: center;
			width:540rpx;
			height:64rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			input{
				padding-left: 20rpx;
			}
		}
	}
}
.upload{
	height:260rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
	justify-content: center;
	image{
		width:200rpx;
		height:200rpx;
	}
}

.uploadLisence{
	height:280rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
	justify-content: center;
	image{
		width:340rpx;
		height:220rpx;
	}
}


</style>
