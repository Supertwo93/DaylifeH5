<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in billType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view v-if="tabbarIndex==0" class="unpaid">
			<view v-for="(item,index) in unpaidList" class="item" :key="index" @tap="toDetail(item)">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='status'>待支付</view>
				</view>
				<view class="billdetail">
					<image class="icon_img" src="https://sgz.wdttsh.com/mini_static/cut/bill-none.png"></image>
					<view class="price_container">
						<block v-for="(row,number) in item.costList" :key="number">
							<view class="price_box" v-if="row.costPrice!=0">
								<view class="price_name">{{row.costName}}</view>
								<view class="line">----------------------</view>
								<view class="price">￥{{row.costPrice}}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="billtotal">
					<view class="total">应缴金额：<text>￥{{item.sum}}</text></view>
					<view class="payButton">去付款</view>
				</view>
			</view>
		</view>
		<view v-if="tabbarIndex==1" class="unpaid">
			<view v-for="(item,index) in paidList" class="item" :key="index" @tap="toDetail(item)">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='paidstatus'>已支付</view>
				</view>
				<view class="billdetail">
					<image class="icon_img" src="https://sgz.wdttsh.com/mini_static/cut/bill-none.png"></image>
					<view class="price_container">
						<block v-for="(row,number) in item.costList" :key="number">
							<view class="price_box" v-if="row.costPrice!=0">
								<view class="price_name">{{row.costName}}</view>
								<view class="line">----------------------</view>
								<view class="price">￥{{row.costPrice}}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="billedtotal">
					<view class="total">实缴金额：<text>￥{{item.sum}}</text></view>
				</view>
			</view>
		</view>
		
		<view v-if="tabbarIndex==2" class="unpaid">
			<view v-for="(item,index) in unrecieveList" class="item" :key="index" @tap="toDetail(item)">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='status'>代收款</view>
				</view>
				<view class="billdetail">
					<image class="icon_img" src="https://sgz.wdttsh.com/mini_static/cut/bill-none.png"></image>
					<view class="price_container">
						<block v-for="(row,number) in item.costList" :key="number">
							<view class="price_box" v-if="row.costPrice!=0">
								<view class="price_name">{{row.costName}}</view>
								<view class="line">----------------------</view>
								<view class="price">￥{{row.costPrice}}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="billtotal">
					<view class="total">应收金额：<text>￥{{item.sum}}</text></view>
					<view class="darkGrayButton">撤销账单</view>
				</view>
			</view>
		</view>
		<view v-if="tabbarIndex==3" class="unpaid">
			<view v-for="(item,index) in recieveList" class="item" :key="index" @tap="toDetail(item)">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='paidstatus'>已支付</view>
				</view>
				<view class="billdetail">
					<image class="icon_img" src="https://sgz.wdttsh.com/mini_static/cut/bill-none.png"></image>
					<view class="price_container">
						<block v-for="(row,number) in item.costList" :key="number">
							<view class="price_box" v-if="row.costPrice!=0">
								<view class="price_name">{{row.costName}}</view>
								<view class="line">----------------------</view>
								<view class="price">￥{{row.costPrice}}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="billtotal">
					<view class="total"></view>
					<view class="total">实缴金额：<text>￥{{item.sum}}</text></view>
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
			headerPosition:"fixed",
			headerTop:"0px",
			billType: ['未缴账单','已缴账单','待收账单','已收账单'],
			tabbarIndex:0,
			unpaidList:[],
			paidList:[],
			unrecieveList:[],
			recieveList:[],
			sellerId:''
		}
	},
	onLoad:function(){
		usermodel.queryBill({paymentState:2},data=>{
			this.unpaidList = data
		})
		usermodel.queryBill({paymentState:1},data=>{
			this.paidList = data
		})
		usermodel.queryBill({receivablesState:2,sellerId:this.uerInfo.storeId},data=>{
			this.unrecieveList = data
		})
		usermodel.queryBill({receivablesState:1,sellerId:this.uerInfo.storeId},data=>{
			this.recieveList = data
		})
		
		
		
		// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		// #endif
	},
	methods:{
		toDetail(item){
			uni.navigateTo({
				url:'billdetail?billcode=' + item.billCode + '&index=' + this.tabbarIndex
			})
		},
		showType(tbIndex){
			this.tabbarIndex = tbIndex;
			this.list = this.billType[tbIndex];
		},
	}
}
</script>

<style scoped lang='scss'>
page{
	background-color: #f2f2f2;
	padding-bottom: 20rpx;
}

.icon_img{
	width:150rpx;
	height:150rpx;
}

.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:78rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-radius: 0 0 30rpx 30rpx;
	.grid{
		width:20%;
		height:38rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#1E1E1E;
		font-size:24rpx;
		.text{
			height:48rpx;
			display: flex;
			align-items: center;
			&.on{
				color:#FF6600;
				border-bottom: solid 4rpx #FF6600;
			}
		}
	}
}

.unpaid{
	margin-top: 100rpx;
	.item{
		border-radius: 30rpx;
		margin-top: 20rpx;
		background-color: #fff;
		padding: 39rpx 19rpx 0 19rpx;
		.head{
			display: flex;
			justify-content:space-between;
			.title{
				font-size:28rpx;
				font-weight:600;
				color:#1E1E1E;
			}
			.status{
				font-size:24rpx;
				font-weight:400;
				color:rgba(255,0,0,1);
				line-height:40rpx;
			}
		}
		.billdetail{
			display: flex;
			margin-top:39rpx;
			.price_container{
				margin-left: 20rpx;
				.price_box{
					margin-top: 10rpx;
					display: flex;
					align-items: center;
					.price_name{
						width:120rpx;
						color:#505050;
					}
					.line{
						color:#B4B4B4;
						width:330rpx;
					}
					.price{
						color:#505050;
					}
				}
			}
		}
		.billtotal{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			.total{
				color:#a0a0a0;
				font-size:24rpx;
				text{
					font-size:36rpx;
					color:#1E1E1E;
				}
			}
		}
	}
}

.billedtotal{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100rpx;
	.total{
		color:#a0a0a0;
		font-size:24rpx;
		text{
			color:#1e1e1e;
			font-size:36rpx;
		}
	}
}
.paidstatus{
	font-size:24rpx;
	font-weight:400;
	color:rgba(160,160,160,1);
	line-height:40rpx;
}

.darkGrayButton{
	width:160rpx;
	height:60rpx;
	background:rgba(255,255,255,1);
	border:1rpx solid rgba(160,160,160,1);
	border-radius:30rpx;
	color:#505050;
	line-height:60rpx;
	text-align: center;
}

.payButton{
	width:160rpx;
	height:60rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	border-radius:30rpx;
	text-align: center;
	line-height:60rpx;
	color:#fff;
}
</style>
