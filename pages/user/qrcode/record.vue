<template>
	<view>
		<view v-for="(item,index) in data" :key="index" class="item">
			<view class="lf">
				<view class="reason">{{reason[item.reason]}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<view class="rt">
				<text v-if="item.type==1">+</text>
				<text v-if="item.type==2">-</text>
				{{item.money}}
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
				reason:{
					1:'订单收入',
					2:'充值收入',
					3:'全款支出/订单支出',
					4:'配件费支出',
					5:'佣金收入',
					6:'服务方补偿收入',
					7:'积分兑换收入',
					8:'扫描会员码/钱包支出',
					9:'取消订单扣款支出',
					10:'预约金支出',
					11:'提现支出',
					12:'拒收订单支出',
					13:'拒收订单收入',
					14:'售后退款',
					15:'余款支出',
					16:'提现被拒退款',
					17:'预约金退款',
					18:'取消订单退款',
					19:'扫描收款码/钱包支出',
					20:'收款码收入',
					21:'会员码收入/钱包',
					22:'订单奖励',
					23:'订单奖励失效',
					24:'预约收入'
				},
				pageNo:1,
			}
			
		},
		onReachBottom(){
			this.pageNo += 1
			this.getList()
		},
		onLoad(){
			this.getList()
		},
		methods:{
			getList(){
				usermodel.getReceiptRecord({pageNo:this.pageNo},data=>{
					if(this.pageNo==1){
						this.data = data
					}else{
						this.data = this.data.concat(data)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		background-color: #fff;
		height:123rpx;
		border-bottom: 1rpx solid #f2f2f2;
		padding:0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.reason{
			color:#3c3c3c;
			font-size:28rpx;
		}
		.time{
			color:#a0a0a0;
			font-size:22rpx;
		}
		
	}
</style>
