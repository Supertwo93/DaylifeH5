<template>
	<view>
		
		<view class="image general" @tap="getImg">
			<view class="descri">头像</view>
			<view class="detail">
				<image :src="uerInfo.logoImg"></image>
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
		
		
		<view class="nickname general" @tap="modifyNickname()">
			<view class="descri">昵称</view>
			<view class="detail">
				<view>{{uerInfo.nickname}}</view>
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
		<view class="gender general">
			<view class="descri">性别</view>
			<view class="detail">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="picker">
						<view v-if="index==''">{{uerInfo.sex||"请选择"}}</view>
						<view v-if="index!=''">{{array[index]}}</view>
						<view class="iconfont icon-dibudaohanglan-"></view>
					</view>
				</picker>
				
			</view>
		</view>
		<view class="phone general"  @tap="modifyPhone()">
			<view class="descri">手机绑定</view>
			<view class="detail">
				<view>{{uerInfo.phone==null?"":JSON.parse(uerInfo.phone).phoneNumber}}</view>
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
		<view class="email general" @tap="modifyEmail()">
			<view class="descri">邮箱地址</view>
			<view class="detail">
				<view>{{uerInfo.email==null?"":uerInfo.email}}</view>
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>		
		</view>
		<view class="password general" @tap="modifyPassword()">
			<view class="descri">设置 | 修改密码</view>
			<view class="iconfont icon-dibudaohanglan-"></view>
		</view>
		<view class="adress general" @tap="modifyAddress()">
			<view class="descri">我的地址</view>
			<view class="iconfont icon-dibudaohanglan-"></view>
		</view>
		<!-- <view v-if="uerInfo.personalCerStatus==1" class="cert general" @tap="certification()">
			<view class="descri">个人认证</view>
			<view class="detail" >
				<view class="certification">去认证</view>
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view> -->
		<!-- <view v-else class="cert general">
			<view class="descri">个人认证</view>
			<view class="detail">已认证</view>
		</view> -->
	</view>
</template>

<script>
	import {UserModel} from "@/common/models/user.js"
	let Usermodel=new UserModel()
	import {mapState,mapMutations} from 'vuex';  
	export default{
		data(){
			return{
				index:'',
				sex:'',
				array:['男','女'],
				imageurl:''
			}
		},
		onLoad:function(){
			console.log(this.$store.state.uerInfo.sex)
			if(this.$store.state.uerInfo.sex==1){			
				this.$store.state.uerInfo.sex = "男";
				this.index=0;
			}else if(this.$store.state.uerInfo.sex==0){
				this.$store.state.uerInfo.sex = "女";
				this.index=1
			}	
		},
		computed: mapState(['hasLogin','uerInfo']), 
		methods:{
			getImg(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res)=> {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
						            url: 'http://192.168.3.175:9090/app/imgUpload/upload', 
						            filePath: tempFilePaths[0],
						            name: 'img',
						            formData: {
						                'user': 'test'
						            },
						            success: (uploadFileRes) => {
										 console.log(uploadFileRes.data);
										 let res=uploadFileRes.data;
										 res=JSON.parse(res)
										 console.log(res.data.data.IMG_URL)
										this.imageurl=res.data.data.IMG_URL
										Usermodel.updateInfo(this.imageurl,4,(res)=>{
											let te=[this.imageurl,4]
											this.$store.commit('setTest',te) //修改vuex  共享数据
											uni.setStorage({//修改setStorage中数据    防止刷新数没变
														  key: 'uerInfo',  
														  data: this.$store.state.uerInfo  
											})  
										})
										
						               
						            }
						        });
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			},
			bindPickerChange:function(e){
				this.index = e.target.value
				this.sex=this.array[this.index]
				
				Usermodel.updateInfo(this.sex,2,(res)=>{ //思路 vuex 变 setStorage跟着变
				    let te=[this.sex,2]
					this.$store.commit('setTest',te) //修改vuex  共享数据
					uni.setStorage({//修改setStorage中数据    防止刷新数没变
								  key: 'uerInfo',  
								  data: this.$store.state.uerInfo  
					})  
					console.log(res)
				//	this.$api.msg(res.message);
					//uni.navigateBack()
				})
				console.log(e)
			},
			modifyNickname(){
				uni.navigateTo({
					url:'nickname'
				})
			},
			modifyPhone(){
				uni.navigateTo({
					url:'tel'
				})
			},
			modifyPassword(){
				uni.navigateTo({
					url:'../login/retrievepasswrod'
				})
			},
			
			modifyEmail(){
				uni.navigateTo({
					url:'email'
				})
			},
			modifyAddress(){
				uni.navigateTo({
					//url:'address'
					url:"../user/address/address"
				})
			},
			certification(){
				uni.navigateTo({
					url:'certification'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-top:20rpx;
}
.general{
	width:100%;
	height:104rpx;
	border-bottom:1rpx solid #f2f2f2;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.descri{
		margin-left:20rpx;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(60,60,60,1);
	}
	.detail{
		display: flex;
		align-items: center;
		
	}
}
image{
	width:80rpx;
	height:80rpx;
	
}

.adress{
	margin-top:20rpx;
}

.iconfont{
	margin-left:20rpx;
	margin-right:20rpx;
}

.certification{
	font-size:26rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(255,102,0,1);
}

.picker{
	display: flex;
}

</style>
