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
					<view v-if="item.type==1">+</view>
					<view v-if="item.type==2">-</view>
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
					24:'预约收入',
					25:'余款收入',
					26:'配件费收入'
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