<template>
	<view>
		<view class="top">
			<view class="title">合计</view>
			<view class="money">￥{{data.sum}}</view>
			<view class="image">
				<image v-if="status==0" src="/static/cut/unpaidbill.png"></image>
				<image v-if="status==1" src="/static/cut/pay_finish.png"></image>
				<text v-if="status==0">未支付</text>
				<text v-if="status==1">已支付</text>
			</view>
		</view>
		
		<view class="bottom">
			<block v-for="(item,index) in costList" :key="index">
				<view>
					<view class="title">{{item.costName}}</view>
					<view class="content">￥{{item.costPrice}}</view>
				</view>
			</block>
			<view>
				<view class="title">账单周期</view>
				<view class="content">2019-11-01至2020-10-01</view>
			</view>
			<view>
				<view class="title">关联合同</view>
				<view class="content">{{data.contractCode}}</view>
			</view>
			<view v-if="data.billType=='房屋账单'">
				<view class="title">关联房屋</view>
				<view class="content">{{data.title}}</view>
			</view>
			<view v-if="data.billType=='金融账单'">
				<view class="title">关联公司</view>
				<view class="content">{{data.companyName}}</view>
			</view>
			<view>
				<view class="title">创建时间</view>
				<view class="content">{{data.createDate}}</view>
			</view>
			<view v-if="picture.length>0">
				<view class="pictureTitle">相关图片</view>
				<view class="picture">
					<block v-for="(item,index) in picture" :key="index">
						<image :src="item"></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	data(){
		return{
			data:'',
			costList:[],
			picture:[],
			status:''
		}
	},
	onLoad(options){
		this.status = options.index
		usermodel.queryBillDetails({billCode:options.billcode},(data)=>{
			this.data = data[0]
			this.costList = []
			let that = this
			for(let i of this.data.costList){
				if(i.costPrice != 0){
					that.costList.push(i)
				}
			}
			if(this.data.picture!=null){
				this.picture = this.data.picture.split(',')
			}
		})
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding:20rpx 20rpx 0 20rpx;
}
.top{
	width:710rpx;
	height:313rpx;
	background-color: #fff;
	border-bottom:1rpx solid #f2f2f2;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title{
		color:rgba(60,60,60,1);
		line-height:144rpx;
	}
	.money{
		font-size:60rpx;
		font-weight:400;
		color:rgba(255,102,0,1);
		line-height:36rpx;
	}
	.image{
			display: flex;
			align-items: center;
			font-size:24rpx;
			font-weight:400;
			color:rgba(4,186,154,1);
			line-height:123rpx;
			image{
				width:24rpx;
				height:24rpx;
			}
	}

}

.bottom{
	background-color: #fff;
	width:710rpx;
	background-size:contain;
	padding:70rpx 30rpx 0 29rpx;
	view{
		display: flex;
		justify-content: space-between;
		margin-bottom:30rpx;
		.title{
			color:rgba(60,60,60,1);
		}
		.content{
			color:rgba(140,140,140,1);
		}
		.picture{
			display: flex;
			flex-wrap: wrap;
			width:500rpx;
			image{
				margin-bottom: 20rpx;
				margin-left: 20rpx;
				width:200rpx;
				height:200rpx;
				border-radius:10rpx;
			}
		}
	}
}
</style>
