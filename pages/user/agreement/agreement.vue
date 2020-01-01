<template>
	<view>
		<view v-for="(item,index) in agreementList" :key="index">
			<view class="top">
				<view class="status" v-if="item.contractState==1">履行中</view>
				<view class="status" v-if="item.contractState==2">已解约</view>
				<view class="status" v-if="item.contractState==3">解约中</view>
				<view class="status" v-if="item.contractState==4&&item.firsttypeId==1">续租中</view>
				<view class="status" v-if="item.contractState==4&&item.firsttypeId==5">续约中</view>
				<view v-if="uerInfo.storeId!=item.sellerId" class="icon">乙方</view>
				<view v-if="uerInfo.storeId==item.sellerId" class="icon partya">甲方</view>
			</view>
			<view class="middle" @tap="toDetail(item)">
				<view class="title">{{item.partyaName}}</view>
				<view class="default">合同编号：{{item.contractCode}}</view>
				<view class="default">合同时长：{{item.contractStarttime}}至{{item.contractEndtime}}</view>
				<view v-if="item.firsttypeId==1" class="default">月租金：￥{{item.rental}}</view>
				<view v-if="item.firsttypeId==5" class="default">代理费：￥{{item.specsPrice}}</view>
			</view>
			<view class="bottom">
				<view class="time">{{item.createDate}}</view>
				<view class="buttons" v-if="item.contractState==1">
					<view v-if="uerInfo.storeId==item.sellerId" class="button">联系TA</view>
					<view v-if="uerInfo.storeId!=item.sellerId" class="button">联系TA</view>
					<view v-if="uerInfo.storeId!=item.sellerId" class="button" @tap="toChange(item)">合同变更</view>
				</view>
				<view v-if="item.contractState==2" class="buttons">
					<view class="button">删除合同</view>
					<view class="button">账单详情</view>
				</view>
				<view v-if="item.contractState==3&&item.firsttypeId==1" class="buttons">
					<view v-if="uerInfo.storeId!=item.sellerId" class="button">联系TA</view>
					<view v-if="uerInfo.storeId!=item.sellerId" @tap="cancelBack(item)" class="button">取消退租</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">拒绝退租</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">同意退租</view>
				</view>
				<view v-if="item.contractState==4&&item.firsttypeId==1" class="buttons">
					<view v-if="uerInfo.storeId!=item.sellerId" class="button">联系TA</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">拒绝续租</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">同意续租</view>
					
				</view>
				<view v-if="item.contractState==4&&item.firsttypeId==5" class="buttons">
					<view v-if="uerInfo.storeId!=item.sellerId" class="button">联系TA</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">拒绝续约</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">同意续约</view>
					
				</view>
				<view v-if="item.contractState==3&&item.firsttypeId==5" class="buttons">
					<view v-if="uerInfo.storeId!=item.sellerId" class="button">联系TA</view>
					<view v-if="uerInfo.storeId!=item.sellerId" @tap="financeBreak(item)" class="button">取消解约</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">拒绝解约</view>
					<view v-if="uerInfo.storeId==item.sellerId" class="button">同意解约</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
import {mapState} from 'vuex'
export default{
	computed:{
		...mapState(['uerInfo'])
	},
	data(){
		return{
			agreementList:[]
		}
	},
	onLoad() {
		console.log(this.uerInfo)
		usermodel.queryContractDetails((data)=>{
			this.agreementList = data
			
		})
	},
	methods:{
		toDetail(item){
			uni.navigateTo({
				url:'agreementdetail?data=' + JSON.stringify(item)
			})
		},
		toChange(item){
			uni.navigateTo({
				url:`agreementchange?data=${JSON.stringify(item)}`
			})
		},
		cancelBack(item){
			uni.showModal({
				content: '确认取消退租吗？',
				success: (res) => {
					if(res.confirm){
						usermodel.cancelBackHouse({orderCode:item.orderCode,type:1},data=>{
							uni.showToast({
								title:'取消退租成功',
								duration:1500,
								icon:'none'
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:'/pages/user/agreement/agreement'
								})
							},1500)
						})
					}
				}
			})
		},
		financeBreak(item){
			uni.showModal({
				content: '确认取消解约吗？',
				success: (res) => {
					if(res.confirm){
						usermodel.cancelBackHouse({orderCode:item.orderCode,type:2},data=>{
							uni.showToast({
								title:'取消解约成功',
								duration:1500,
								icon:'none'
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/user/agreement/agreement'
								})
							},1500)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.top{
	margin-top: 20rpx;
	background-color: #fff;
	height:100rpx;
	border-bottom:1rpx solid #DCDCDC;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.status{
		margin-left: 20rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(255,102,0,1);
		line-height:40rpx;
	}
	.icon{
		width:99rpx;
		height:40rpx;
		background:rgba(41,181,246,1);
		border-radius:20rpx 0rpx 0rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:28rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:36rpx;
		&.partya{
			background-color: #65B77E;
		}
	}
}
.middle{
	background-color: #fff;
	height:254rpx;
	border-bottom:1rpx solid #DCDCDC;
	padding-left: 19rpx;
	padding-top: 29rpx;
	.title{
		width:700rpx;
		font-weight:400;
		color:rgba(60,60,60,1);
		line-height:36rpx;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
	}
	.default{
		margin-top: 25rpx;
		font-weight:400;
		color:rgba(140,140,140,1);
		line-height:36rpx;
	}
}
.bottom{
	background-color: #fff;
	height:100rpx;
	display: flex;
	.time{
		width:370rpx;
		padding-top: 41rpx;
		padding-left: 19rpx;
		font-size:22rpx;
		font-weight:400;
		color:rgba(160,160,160,1);
	}
	.buttons{
		width:380rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.button{
			margin: 0 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width:160rpx;
			height:60rpx;
			background:rgba(255,255,255,1);
			border:1rpx solid rgba(200,200,200,1);
			border-radius:10rpx;
		}
	}
}
</style>
