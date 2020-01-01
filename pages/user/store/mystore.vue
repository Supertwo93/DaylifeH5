<template>
	<view>
		<view v-if="storeId=='null'||storeId==''" class="null">
			<image src="/static/cut/user/storeicon.png"></image>
			<view class="content">您还没有开通过店铺哦</view>
			<view class="gray">快快申请属于自己的店铺吧</view>
			<view @tap="applyStore" class="applyButton">申请店铺入驻</view>
		</view>
		<!-- <view v-if="storeStatus==3">我的店铺</view> -->
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	data(){
		return{
			storeId:'',
			storeStatus:''
		}
	},
	onLoad(option){
		this.storeId = option.storeId
		if(this.storeId=="null"){
			
		}else{
			usermodel.checkStoreInfo({sellerId:option.storeId},(data)=>{
				this.storeStatus = data.authenticationState
				console.log(this.storeStatus)
			})
		}
	},
	methods:{
		applyStore(){
			uni.navigateTo({
				url:'/pages/user/store/applystore'
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.null{
	width:750rpx;
	height:100%;
	image{
		width:402rpx;
		height:389rpx;
		margin-top: 173rpx;
		margin-left: 175rpx;
	}
	.content{
		margin-top: 26rpx;
		margin-left: 216rpx;
		font-size:30rpx;
		color:rgba(100,100,100,1);
	}
	.gray{
		margin-top: 18rpx;
		margin-left: 220rpx;
	}
	.applyButton{
		width:240rpx;
		height:60rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 255rpx;
		margin-top: 50rpx;
	}
}
</style>
