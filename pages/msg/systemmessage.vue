<template>
	<view>
		<block v-for="(item,index) in systemList" :key="index">
			<view class="title">{{item.time}}</view>
			<view class="container" v-for="(arr,idx) in item.arr" :key="idx" @tap="toSystemDetail(arr.id)">
				<view>{{arr.title}}</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</block>
		<!-- <view class="title">三个月前</view> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				systemList: [
					{
						time: '三个月内',
						arr: [
							{
								id: 1,
								title: "您又有新的同事加你为好友啦"
							},
							{
								id: 2,
								title: "您又有新的同事加你为好友啦"
							},
							{
								id: 3,
								title: "您又有新的同事加你为好友啦"
							}
						]
					},
					{
						time: '三个月前',
						arr: [
							{
								id: 4,
								title: "您又有新的同事加你为好友啦"
							},
							{
								id: 5,
								title: "您又有新的同事加你为好友啦"
							},
							{
								id: 6,
								title: "您又有新的同事加你为好友啦"
							}
						]
					}
				]
			}
		},
		methods:{
			toSystemDetail(e){
				uni.navigateTo({
					url: "/pages/msg/systemdetail?id=" + e
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.title{
	height:63rpx;
	padding-top: 20rpx;
	padding-left: 20rpx;
	font-size:24rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(160,160,160,1);
}
.container{
	width:750rpx;
	height:104rpx;
	display: flex;
	padding:0 20rpx;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	border-bottom:1rpx solid #f2f2f2;
	image{
		width:10rpx;
		height:20rpx;
	}
}
</style>
