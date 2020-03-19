<template name="storeTime">
	<view class="time">
		<view class="payTime gray"></view>
		<view class="buttons">
			<block v-if="type=='unpaid'"><view class="default" @tap.stop="cancelOrder">取消订单</view><view class="pay" @tap.stop="toPayment">去付款</view></block>
			<block v-if="type=='unreceived'"><view class="default" @tap.stop="drawback">退款</view></block>
			<block v-if="type=='received'"><view class="default" @tap.stop="drawback">退款</view></block>
			<block v-if="type=='deliver'"><view class="pay" @tap.stop="confirmOk">确认完成</view></block>
			<block v-if="type=='completed'"><view class="default" @tap.stop="applyService">申请售后</view><view class="pay" @tap.stop="goRating">去评价</view></block>
			<block v-if="type=='refunds'"><view class="pay">取消退款</view></block>
			<block v-if="type=='cancelled'"><view class="default">删除订单</view></block>
			<block v-if="type=='serviced'"><view class="default">联系TA</view><view class="pay" @tap.stop="cancelApply">取消申请</view></block>
			<block v-if="type=='servicrefuse'"><view class="default" @tap.stop="applyService">申请售后</view></block>
			<block v-if="type=='servicefinish'"><view class="default">联系TA</view></block>
			<block v-if="type=='waiting'"><view class="default">联系TA</view></block>
			<block v-if="type=='drawdone'"><view class="default">联系TA</view></block>
			<block v-if="type=='housefinished'"><view class="default">联系TA</view></block>
			<block v-if="type=='finished'"><view class="default" @tap.stop="applyService">申请售后</view></block>
			<block v-if="type=='houseback'"><view class="default">联系TA</view></block>
		</view>
	</view>
</template>

<script>
export default {
	filters:{
		timeDeal(value){
			return value.substring(5,16)
		}
	},
	name:'storeTime',
	props:{
		time:{
			type:String,
			value:''
		},
		type:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	},
	methods:{
		confirmOk(){
			this.$emit('confirmOrder')
		},
		goRating(){
			this.$emit('rating')
		},
		applyService(){
			this.$emit('backOrder')
		},
		cancelOrder(){
			this.$emit('cancelOrder')
		},
		toPayment(){
			this.$emit('toPay')
		},
		cancelApply(){
			this.$emit('cancelBack')
		},
		drawback(){
			this.$emit('backMoney')
		}
	}
}
</script>

<style lang="scss">
.time{
	margin-top: 20rpx;
	background-color: #fff;
	// border-top: 1rpx solid #f2f2f2;
	height:100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.payTime{
		font-size:26rpx;
	}
	.buttons{
		display: flex;
		view{
			margin-left: 20rpx;
			width:160rpx;
			height:60rpx;
			background:rgba(255,255,255,1);
			border-radius:30rpx;
			display: flex;
			align-items: center;
			justify-content: center;	
		}
		.default{
			border:1rpx solid rgba(200,200,200,1);
			color:#646464;
		}
		.pay{
			border:1rpx solid rgba(255,102,0,1);
			color:#FF6600;
		}
	}

}
</style>
