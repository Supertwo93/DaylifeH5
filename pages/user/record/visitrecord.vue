<template>
	<view>
		<block v-for="(item,index) in data" :key="index">
			<view class="box">
				<image :src="item.pic.split(',')[0]"></image>
				<view class="rt">
					<view class="top">{{item.title}}</view>
					<view class="bottom">
						<view class="price">￥{{item.price}}</view>
						<view class="label">{{item.firstTypeInfoId|numToStr}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	filters:{
		numToStr(value){
			if(value==1){
				return '房屋'
			}else if(value==3){
				return '家政'
			}else if(value==5){
				return '金融'
			}else if(value==8){
				return '生活'
			}else if(value==9){
				return '维修'
			}else if(value==10){
				return '代购'
			}
		}
	},
	data(){
		return{
			pageNo:1,
			data:''
		}
	},
	onLoad(){
		let req = {}
		req.pageNo = this.pageNo
		req.pageSize = 10
		usermodel.checkVisitRecord(req,data=>{
			this.data = data
		})
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.box{
	margin-top: 20rpx;
	height:220rpx;
	background-color: #fff;
	display: flex;
	padding:30rpx 0 30rpx 20rpx;
	image{
		width:160rpx;
		height:160rpx;
		border-radius:10px;
	}
	.rt{
		width:550rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.top{
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			word-wrap: break-word;
			word-break: break-all;
		}
		.bottom{
			display: flex;
			justify-content: space-between;
			.price{
				color:#FF6600;
				font-size:34rpx;
			}
			.label{
				width:100rpx;
				height:40rpx;
				background:rgba(41,181,246,1);
				border-radius:20rpx 0rpx 0rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color:#fff;
			}
		}
	}
}
</style>
