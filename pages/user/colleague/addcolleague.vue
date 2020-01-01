<template>
	<view>
		<view class="search">
			<view class="lf">
				<image src="/static/cut/ss.png"></image>
				<input v-model="phone" @confirm="searchColleague" type="number" placeholder="请输入电话号码" />
			</view>
			<view v-if="user==''" @tap="searchColleague" class="rt">搜索</view>
			<view v-if="user!=''" @tap="cancel" class="rt">取消</view>
		</view>
		
		<view v-if="user!=''" class="user">
			<image :src="user.logoImg"></image>
			<view class="info">
				<view class="userName">{{user.nickname}}</view>
				<view class="gray">账号：{{user.phone}}</view>
			</view>
			<view @tap="add(user)" class="button">添加</view>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				phone:'',
				user:''
			}
		},
		methods:{
			searchColleague(){
				usermodel.searchColleague({account:this.phone},data=>{
					this.user = data
				})
			},
			cancel(){
				this.user = ''
				this.phone = ''
			},
			add(user){
				usermodel.addColleague({content:'你好',userId:user.userId},data=>{
					uni.showToast({
						title:'添加成功',
						duration:1500,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	.search{
		background-color: #fff;
		height:110rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		.lf{
			background-color: #F6F6F6;
			height:64rpx;
			width:640rpx;
			display: flex;
			padding:0 20rpx;
			align-items: center;
			image{
				margin-right: 10rpx;
				width:27rpx;
				height:28rpx;
			}
		}
		.rt{
			color:#FF6600;
			margin-left: 10rpx;
		}
	}
	.user{
		margin-top: 20rpx;
		height:140rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		image{
			width:100rpx;
			height:100rpx;
			border-radius:10rpx;
		}
		.info{
			height:100rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			margin-left: 20rpx;
			width:520rpx;
			.userName{
				font-size:32rpx;
				color:rgba(60,60,60,1);
			}
		}
	}
</style>
