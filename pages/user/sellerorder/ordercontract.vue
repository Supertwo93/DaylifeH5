<template>
	<view>
		<view>
			<view v-html="html">
				<view>html</view>
			</view>
		</view>
		
		<view :class="[isRead ? 'submit-button' : 'disable']" @tap="confirmSign">确认签约</view>
	</view>
</template>

<script>
import {OrderModel} from '@/common/models/order.js'
const ordermodel = new OrderModel()
import store from '@/store/index.js'
export default{
	data(){
		return{
			data:'',
			html:'',
			isRead:false,
			id:''
		}
	},
	methods:{
		confirmSign(){
			if(this.isRead==false){
				uni.showToast({
					title:'请先阅读完合同再确认签约',
					icon:'none',
					duration:1500
				})
				return
			}
			if(this.id==1){
				let req = {}
				req.orderCode = this.data.orderCode
				req.auditStatus = this.data.auditStatus
				req.id = this.data.id
				ordermodel.sellerConfirmHouseSign(req,(data)=>{
					uni.showToast({
						title:'签约成功',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/user/user'
						})
					},1500)
				})
			}else{
				let req = {}
				req.orderCode = this.data.orderCode
				req.financeCode = this.data.financeCode
				req.storeOrderStatus = 2
				ordermodel.modifyFinancialOrders(req,(data)=>{
					uni.showToast({
						title:'签约成功',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/user/user'
						})
					},1500)
				})
			}
			
		}
	},
	onLoad(option){
		this.id = option.id
		if(this.id==1){
			this.data = JSON.parse(option.data)
			let req = {}
			req.releaseId = this.data.releaseId
			req.contractCode = this.data.contractCode
			req.orderCode = this.data.orderCode
			req.type = 2
			let that = this
			uni.request({
				url:'https://sgz.wdttsh.com/app/signing/queryContract',
				data:req,
				method:'POST',
				header: {
					'content-type':'application/x-www-form-urlencoded',
					'token':store.state.uerInfo.token||null			 
				},
				success(res){
					that.html = res.data
				}
			})
		}else{
			this.data = JSON.parse(option.data)
			let req = {}
			req.financeCode = this.data.financeCode
			req.type = 2
			req.orderCode = this.data.orderCode
			let that = this
			uni.request({
				url:'https://sgz.wdttsh.com/app/financialContracts/queryFinancialContract',
				data:req,
				method:'POST',
				header: {
					'content-type':'application/x-www-form-urlencoded',
					'token':store.state.uerInfo.token||null			 
				},
				success(res){
					that.html = res.data
				}
			})
		}
		
	},
	onReachBottom(){
		this.isRead = true
	}
}
	
</script>

<style>
page{
	padding-bottom:96rpx;
}
.disable{
	background-color: #b4b4b4;
	width:100%;
	height:96rpx;
	position:fixed;
	bottom:0;
	text-align: center;
	font-size:34rpx;
	line-height:96rpx;
	font-weight:400;
	color:rgba(255,255,255,1);
}

</style>
