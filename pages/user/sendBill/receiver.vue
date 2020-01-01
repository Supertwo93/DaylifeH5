<template>
	<view>
		<view class="top">
			<view class="search">
				<image src="/static/cut/ss.png"></image>
				<input placeholder="搜索"/>
			</view>
			
			<view class="title">租客列表</view>
		</view>
		
		<block v-for="(item,index) in list" :key="index">
			<view @tap="chooseOne(item)" class="item">
				<image :src="item.logoImg"></image>
				<view class="info">
					<view class="up">{{item.name}}(房号:{{item.houseCode}})</view>
					<view class="gray">{{item.address}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				firstTypeId:'',
				list:[]
			}
		},
		onLoad(options){
			this.firstTypeId = options.id
			usermodel.getBillReceive({firsttypeId:this.firstTypeId},data=>{
				this.list = data
			})
		},
		methods:{
			chooseOne(item){
				let pages = getCurrentPages()
				let prePages = pages[pages.length-2]
				console.log(prePages)
				prePages.$vm.receiverInfo = item

				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	.top{
		background-color: #fff;
		padding: 0 20rpx;
		.search{
			padding:0 10rpx;
			background-color: #f6f6f6;
			display: flex;
			align-items: center;
			width:710rpx;
			height:64rpx;
			image{
				width:27rpx;
				height:28rpx;
			}
			input{
				margin-left: 10rpx;
				font-size:26rpx;
			}
		}
		.title{
			height:84rpx;
			display: flex;
			align-items: center;
		}
	}
	
	.item{
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		height:120rpx;
		background-color: #fff;
		image{
			width:80rpx;
			height:80rpx;
			border-radius:10rpx;
			margin-right: 20rpx;
		}
		
	}
</style>
