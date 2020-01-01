<template>
	<view>
		<view class="detailList">
			<view v-for="(item,index) in detailList.data" :key="index" class="item">
				<view class="left">
					<view class="title">{{reason[item.REASON]}}</view>
					<view class="time">{{item.CREATE_TIME}}</view>
				</view>
				<view class="right">
					<view v-if="item.TYPE==2">+</view>
					<view v-if="item.TYPE==1">-</view>
					<view>{{item.MONEY}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:{
					1:'收入',
					2:'支出'
				},
				reason:{
					1:'预约金支出',
					2:'余款支出',
					3:'全款支出/订单支出',
					4:'配件费支出',
					5:'提现支出',
					6:'取消售后订单退款支出',
					10:'订单收入',
					11:'充值收入',
					12:'提现被拒收入',
					13:'取消订单退款',
					14:'售后退款',
					15:'佣金收入',
					16:'服务方补偿收入',
					17:'积分兑换收入',
					18:'预约金退款',
				},
				detailList:{
					"data": [
						{
							"CREATE_TIME": "2019-09-30 09:51:30",
							"FLOW_NO": "20190930095130958",
							"MONEY": 0.01,
							"PAY_WAY": 2,
							"REASON": 2,
							"STATUS": 1,
							"TYPE": 1,
							"USERCASHFLOW_ID": "9cf7eca5d0c34d2b941448b9c63fa5b0",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-26 15:40:47",
							"FLOW_NO": "20190926154047587",
							"MONEY": 0.01,
							"PAY_WAY": 2,
							"REASON": 2,
							"STATUS": 1,
							"TYPE": 1,
							"USERCASHFLOW_ID": "523058458b574fde8063962b6dfd3f94",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-26 09:20:10",
							"FLOW_NO": "20190926092010554",
							"MONEY": 0.02,
							"PAY_WAY": 2,
							"REASON": 2,
							"STATUS": 1,
							"TYPE": 1,
							"USERCASHFLOW_ID": "d42d09fa299a45c79885056bb5cd2543",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-26 09:18:04",
							"FLOW_NO": "20190926091804957",
							"MONEY": 2.0,
							"PAY_WAY": 3,
							"REASON": 11,
							"STATUS": 1,
							"TYPE": 2,
							"USERCASHFLOW_ID": "25eb4e3c561e41fea7fe7f0dd508ccd4",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-25 16:01:52",
							"FLOW_NO": "20190925160152858",
							"MONEY": 0.01,
							"PAY_WAY": 2,
							"REASON": 2,
							"STATUS": 1,
							"TYPE": 1,
							"USERCASHFLOW_ID": "498a771d4f5c4293b4726475173021b9",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-25 16:00:48",
							"FLOW_NO": "20190925160048897",
							"MONEY": 0.01,
							"PAY_WAY": 2,
							"REASON": 2,
							"STATUS": 1,
							"TYPE": 1,
							"USERCASHFLOW_ID": "67576cb0286549b9bd16a24dc6b9d0a1",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-25 15:33:43",
							"FLOW_NO": "20190925153343822",
							"MONEY": 1.1,
							"PAY_WAY": 3,
							"REASON": 11,
							"STATUS": 1,
							"TYPE": 2,
							"USERCASHFLOW_ID": "82aeae3367a641c0bff3988d346f22b7",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-25 15:28:32",
							"FLOW_NO": "20190925152832247",
							"MONEY": 1.1,
							"PAY_WAY": 3,
							"REASON": 11,
							"STATUS": 1,
							"TYPE": 2,
							"USERCASHFLOW_ID": "bdafe6ce3f2146d19cb3c49534313e8b",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-25 15:16:01",
							"FLOW_NO": "20190925151601598",
							"MONEY": 1.1,
							"PAY_WAY": 3,
							"REASON": 11,
							"STATUS": 1,
							"TYPE": 2,
							"USERCASHFLOW_ID": "eef3a816ab384df2a47e84c458b51f41",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						},
						{
							"CREATE_TIME": "2019-09-23 18:41:25",
							"FLOW_NO": "20190923184125114",
							"MONEY": 2.0,
							"PAY_WAY": 3,
							"REASON": 11,
							"STATUS": 1,
							"TYPE": 2,
							"USERCASHFLOW_ID": "340d4a693b3d4eed9938b11d0dad5d69",
							"USER_ID": "3547eb6de8644dd1a6557968df41bc83"
						}
					],
					"message": "查询成功",
					"resultCode": "01"
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.detailList{
	background-color: #fff;
	width:100%;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.item{
		height:123rpx;
		border-bottom: 1rpx solid #f2f2f2;
		display: flex;
		justify-content: space-between;
		.left{
			padding-top: 30rpx;
			padding-left: 20rpx;
			.title{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.time{
				margin-top:20rpx;
				font-size:22rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(160,160,160,1);
			}
		}
		.right{
			display: flex;
			align-items: center;
			view{
				font-size:28rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
		}
	}
}

</style>
