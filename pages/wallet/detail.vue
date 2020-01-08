<template>
	
	
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in cashType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<view class="detailList">
			<view v-for="(item,index) in detailList" :key="index" class="item">
				<view class="left">
					<view class="title">{{reason[item.reason]}}</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="right">
					<view v-if="item.type==2">+</view>
					<view v-if="item.type==1">-</view>
					<view>{{item.money}}</view>
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
				headerPosition:"fixed",
				headerTop:"43px",
				cashType: ['全部','收入','支出'],
				tabbarIndex:0,
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
				detailList:[],
				queryInfo:{
					pageNo:1,
					pageSize:10,
					type:''
				}
			}
		},
		onLoad(){
			this.getList()
		},
		onReachBottom(){
			this.pageNo += 1
			this.getList()
		},
		methods:{
			getList(){
				usermodel.getUserCashFlow(this.queryInfo,data=>{
					if(this.pageNo = 1){
						this.detailList = data
					}else{
						this.detailList = this.detailList.concat(data)
					}	
				})
			},
			showType(tbIndex){
				this.tabbarIndex = tbIndex
				if(tbIndex === 0){
					this.queryInfo.type = ''
				}else{
					this.queryInfo.type = tbIndex
				}
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	border-top:1rpx solid #f2f2f2;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color:#FF6600;
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
}



.detailList{
	margin-top: 64rpx;
	background-color: #fff;
	width:100%;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.item{
		height:123rpx;
		border-bottom: 1rpx solid #f2f2f2;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0 0 20rpx;
		.left{
			.title{
				font-size:28rpx;
				font-weight: bolder;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(60,60,60,1);
			}
			.time{
				margin-top:10rpx;
				font-size:26rpx;
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