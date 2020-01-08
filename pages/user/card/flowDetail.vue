<template>
	<view>
		<view class="item">
			<view class='left'>流水号</view>
			<view class="right">{{data.flowNo}}</view>
		</view>
		<view class="item">
			<view class='left'>类型</view>
			<view class="right" v-if="data.reason==1">充值</view>
			<view class="right" v-if="data.reason==2">线上支付</view>
			<view class="right" v-if="data.reason==3">会员卡积分兑换</view>
		</view>
		<view class="item">
			<view class='left' v-if="data.type==1">收入</view>
			<view class='left' v-if="data.type==2">支出</view>
			<view class="right">{{data.money}}</view>
		</view>
		<view class="item">
			<view class='left'>支付方式</view>
			<view class="right" v-if="data.paymentMethod==1">支付宝</view>
			<view class="right" v-if="data.paymentMethod==2">微信</view>
			<view class="right" v-if="data.paymentMethod==3">余额</view>
			<view class="right" v-if="data.paymentMethod==4">积分</view>
			<view class="right" v-if="data.paymentMethod==5">会员卡积分</view>
		</view>
		<view class="item">
			<view class='left'>时间</view>
			<view class="right">{{data.createTime}}</view>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				id:'',
				data:''
			}
		},
		onLoad(options){
			this.id = options.id
			this.getDetail()
		},
		methods:{
			getDetail(){
				usermodel.checkFlowDetail({id:this.id},data=>{
					this.data = data[0]
					console.log(this.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		height:100rpx;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			color:#8c8c8c;
		}
		.right{
			color:#3c3c3c;
		}
	}
</style>
