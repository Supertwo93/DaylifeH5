<template>
	<view>
		
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<!-- 个人认证 -->
		<view v-if="tabbarIndex==0">
			<view class="topTitle">基本信息</view>
			
			<view class="basicInfo">
				<view class="general">
					<view class="star">真实姓名</view>
					<input type="text" v-model="name" placeholder="请输入姓名">
				</view>
				<view class="general">
					<view class="star">性别</view>
					<view class="detail">
						<picker @change="eventChange" :value="index" :range="array">
							<view class="picker">
								<view class="choose">{{sex}}</view>
							</view>
						</picker>
					</view>
				</view>
				<view class="general">
					<view class="star">身份证号</view>
					<input type="number" v-model="idNum" placeholder="请输入身份证号">
				</view>
				<view class="row">
					<view class="star">所在地区</view>
					<view class="input" @tap="chooseCity">
					{{receiverProvince}}
					{{receiverCity}}
					{{receiverDistrict}}
					</view>
				</view>
			</view>
			
			<view class="topTitle">上传身份证</view>
			
			<view class="upload">
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
			
			<view class="submit-button" @tap="personalCer">确认提交</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		
		<!-- 公司认证 -->
		<view v-if="tabbarIndex==1">
			<view class="graytitle">基本信息</view>
			<view class="general">
				<view class="star">公司名称</view>
				<input type="text" placeholder="请输入公司名称">
			</view>
			<view class="general">
				<view class="star">联系人</view>
				<input type="text" placeholder="请输入姓名">
			</view>
			<view class="general">
				<view class="star">联系电话</view>
				<input type="text" placeholder="请输入电话">
			</view>
			<view class="general">
				<view class="star">公司地址</view>
				<input type="text" placeholder="请输入公司地址">
			</view>
			<view class="graytitle">上传logo</view>
			<view class="uploadlogo">
				<image src="/static/cut/user/uploadgoodsimg.png"></image>
			</view>
			<view class="graytitle">上传身份证</view>
			<view class="upload">
				<view class="first">
					<image src="/static/cut/upload_idcard.png" class="firstImage"></image>
					<image src="/static/cut/upload_idcard.png" class="secondImage"></image>
				</view>
				<view class="second">
					<view class="text">身份证正面</view>
					<view class="text">身份证反面</view>
				</view>
				<view class="third">
					<image src="/static/cut/upload_idcard.png"></image>
				</view>
				<view class="four">
					<view class="text">手持身份证正面</view>
				</view>
			</view>
			<view class="graytitle">上传营业执照</view>
			<view class="uploadLisence">
				<image src="/static/cut/upload_idcard.png"></image>
			</view>
			<view class="submit-button">确认提交</view>
		</view>
		
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		components:{
			mpvueCityPicker
		},
		data(){
			return{
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['个人认证','公司认证'],
				tabbarIndex:0,
				index:'',
				sex:'请选择',
				array:['男','女'],
				receiverProvince:'',
				receiverCity:'',
				receiverDistrict:'',
				themeColor: '#000',
				cityPickerValue: [0, 0, 1],
				region:{label:"请点击选择地址",value:[],cityCode:""},
				idNum:'',
				name:'',
				positiveImg:'/static/cut/upload_idcard.png',
				nagativeImg:'/static/cut/upload_idcard.png',
				handImg:'/static/cut/upload_idcard.png'
			}
		},
		onLoad: function (option) {
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		},
		methods:{
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
			},
			eventChange(e){
				this.sex = this.array[e.target.value]
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
				console.log(e)
				let add=e.label.split("-")
				for(let i=0;i<add.length;i++){
					if(i==0){
						this.receiverProvince=add[i]  
					}else if(i==1){
						this.receiverCity=add[i]
					}else{
						this.receiverDistrict =add[i]
					}
				}
			},
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
									this.handImg = img.data
								}
							}
						})
					}
				})
			},
			personalCer(){
				if(this.name==''){
					uni.showToast({
						title:'请输入姓名',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.sex=='请选择'){
					uni.showToast({
						title:'请选择性别',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.idNum==''){
					uni.showToast({
						title:'请输入身份证号码',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.receiverCity==''){
					uni.showToast({
						title:'请选择所在地区',
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
				if(!this.handImg.startsWith('http')){
					uni.showToast({
						title:'请上传手持身份证正面照',
						icon:'none',
						duration:1500
					})
					return
				}
				let req = {}
				req.personalTrueName = this.name
				req.personalCardNo = this.idNum
				req.sex = this.sex
				req.province = this.receiverProvince
				req.city = this.receiverCity
				req.personalFaceCardImg = this.positiveImg
				req.personalBackCardImg = this.nagativeImg
				req.personalHandCardImg = this.handImg
				usermodel.personalCer(req,(data)=>{
					uni.navigateTo({
						url:'/pages/success/success?type=' + 6
					})
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-top:64rpx;
	padding-bottom: 100rpx;
}	
image{
	width:340rpx;
	height:220rpx;
}
.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color: #FF6600;
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
}
.topTitle{
	height:61rpx;
	font-size:22rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(120,120,120,1);
	margin-left:19rpx;
	margin-top:20rpx;
}

.general{
	display: flex;
	background-color: #fff;
	border-bottom: 1rpx solid #f2f2f2;
	height:84rpx;
	align-items: center;
	view{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width:131rpx;
	}
	input{
		margin-left:20rpx;
		width:550rpx;
	}
	text{
		margin-left: 20rpx;
		width:460rpx;
		font-size:26rpx;
		color:rgba(180,180,180,1);
	}
	.detail{
		margin-left: 20rpx;
		.choose{
			justify-content: flex-start;
		}
	}
}

.upload{
	background-color: #fff;
	padding-top:30rpx;
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

.text{
	font-size:22rpx;
	font-family:Source Han Sans CN;
	color:rgba(60,60,60,1);
}
.uploadlogo{
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	width:750rpx;
	height:260rpx;
	image{
		width:200rpx;
		height:200rpx;
	}
}
.uploadLisence{
	background-color: #fff;
	width:750rpx;
	height:280rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width:340rpx;
		height:220rpx;
	}
}

.row{
	display: flex;
	background-color: #fff;
	border-bottom: 1rpx solid #f2f2f2;
	height:84rpx;
	align-items: center;
	.star{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width:131rpx;
	}
	.input{
		margin-left: 20rpx;
		width: 550rpx;
		padding: 20upx 0;
		align-items: center;
		justify-content: space-between;
		font-size: 30upx;
		display: flex;
	}
}
</style>
