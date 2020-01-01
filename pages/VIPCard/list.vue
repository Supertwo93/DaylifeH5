<template>
	<view>
		<view class="graytitle">已办理会员名单</view>
		<block v-for="(item,index) in data.mapList" :key="index">
			<view class="item">
				<image :src="item.logoImg"></image>
				<view class="info">
					<view class="top">{{item.nickName}}({{item.birthDate}})</view>
					<view class="bottom">{{item.mobileNumber}}</view>
				</view>
				<view class="gray">{{item.createTime}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {VipModel} from '@/common/models/vip.js'
	const vipmodel = new VipModel()
	export default{
		data(){
			return{
				data:''
			}
		},
		onLoad(options){
			vipmodel.queryMemberList({},data=>{
				this.data = data
				console.log(data)
			})
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f2f2f2;
	}
	.item{
		padding:0 20rpx;
		margin-bottom: 10rpx;
		height:140rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		
		image{
			width:80rpx;
			height:80rpx;
			border-radius:10rpx;
		}
		.info{
			width:370rpx;
			margin-left: 20rpx;
		}
	}
</style>
