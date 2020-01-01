<template>
	<view>
		<view class="timepicker">
			<view class="star title">租期时长</view>
			<view class="choose">
				<view class="startDate">
					<picker mode="date" @change="startdateChange">
						<view>{{startDate}}</view>
					</picker>
				</view>
				<view>至</view>
				<view class="endDate">
					<picker mode="date"  @change="enddateChange">
						<view>{{endDate}}</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="detail">
			<view class="star">费用明细</view>
			<view class="list">
				<input v-model="title" class="feename" placeholder="请输入账单名称" />
				<block v-for="(item,index) in listArry" :key="index">
					<view class="feeList">
						<picker mode='selector' :range='range' @change="feeselect($event,item)">
							<view class="lf">
								<view class="choosefee">{{item.name}}</view>
								<image src="/static/cut/grayright.png"></image>
							</view>
						</picker>
						<input type="number" @blur="totalSum" v-model="item.num" placeholder="请输入价格" />
						<image @tap="addOrDelete(item,index)" :src="item.isAdd?addSrc:delSrc"></image>
					</view>
				</block>
			</view>
			<view class="total">
				合计：<text class="yellow">￥{{total}}</text>
			</view>
		</view>
		
		<view class="graytitle">费用备注</view>
		<textarea v-model="remark" placeholder="请输入费用备注"></textarea>
		
		<view class="graytitle">相关图片</view>
		<upload-imgs :photos="goods_photos" @changes="goodsPhoto"></upload-imgs>
		
		<view class="receive">
			<view class="title">选择账单接收人</view>
			<view class="info" @tap="toChooseReceiver">
				<image :src="receiverInfo.logoImg"></image>
				<view>
					<view>{{receiverInfo.name}}</view>
					<view class="gray">{{receiverInfo.address}}</view>
				</view>
			</view>
		</view>
		
		<view @tap="sendBill" class="submit-button">确认发送</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	import {StoreModel} from '@/common/models/store.js'
	import {mapState} from 'vuex'
	import uploadImgs from '@/components/uploadImgs.vue'
	const usermodel = new UserModel()
	const storemodel = new StoreModel()
	export default{
		components:{
			uploadImgs
		},
		data(){
			return{
				title:'',
				startDate:'请选择开始日期',
				endDate:'请选择结束日期',
				range:[],
				listArry:[
					{
						name:'请选择',
						isAdd:true,
						num:0
					}
				],
				goods_photos:[],
				addSrc:'/static/cut/ionc-a.png',
				delSrc:'/static/cut/icon-n.png',
				total:0,
				imageList:['/static/cut/upload_photo.png'],
				firstTypeId:'',
				receiverInfo:{
					logoImg:'/static/cut/site.png'
				},
				sellerData:'',
				remark:''
			}
		},
		onLoad(){
			storemodel.getSellerInfo({sellerId:this.uerInfo.storeId},data=>{
				this.firstTypeId = data.firstTypeId
				this.sellerData = data
				usermodel.getCostName({firsttypeId:this.firstTypeId},data=>{
					this.range = data
				})
			})
			
		},
		onShow(){
			console.log(this.receiverInfo)
		},
		computed:{
			...mapState(['uerInfo'])
		},
		methods:{
			goodsPhoto(e){
				this.goods_photos = e;
				console.log(this.goods_photos);
			},
			startdateChange(e){
				this.startDate = e.target.value
			},
			enddateChange(e){
				this.endDate = e.target.value
			},
			addOrDelete(item,index){
				if(item.isAdd){
					let obj = {}
					obj.name = '请选择'
					obj.num = 0
					obj.isAdd = false
					this.listArry.push(obj)
				}else{
					this.total -= item.num
					this.listArry.splice(index,1)
				}
			},
			feeselect(e,item){
				item.name =  this.range[e.target.value]
			},
			totalSum(){
				let s = 0
				for(let i of this.listArry){
					s += parseFloat(i.num)
				}
				this.total = s
			},
			toChooseReceiver(){
				uni.navigateTo({
					url:`/pages/user/sendBill/receiver?id=${this.firstTypeId}`
				})
			},
			sendBill(){
				if(!this.receiverInfo.logoImg.startsWith('http')){
					uni.showToast({
						title:'请选择账单接收人',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.startDate=='请选择开始日期'){
					uni.showToast({
						title:'请选择账单开始日期',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.endDate=='请选择结束日期'){
					uni.showToast({
						title:'请选择账单结束日期',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				if(this.firstTypeId ==1){
					req.billType = '房屋账单'
				}else{
					req.billType = '金融账单'
				}
				req.releaseId = this.receiverInfo.releaseId
				req.sellerId = this.sellerData.sellerId
				req.signingId = this.receiverInfo.signingId
				req.userId = this.receiverInfo.userId
				req.orderCode = this.receiverInfo.orderCode
				req.contractCode = this.receiverInfo.contractCode
				req.billStartTime = this.startDate
				req.billEndTime = this.endDate
				req.paymentMethod = this.receiverInfo.paymentMethod
				req.title = this.title
				req.remarks = this.remark
				req.address = this.receiverInfo.address
				if(this.goods_photos.length!=0){
					req.picture = this.goods_photos.join(',')
				}
				req.secondTypeId = this.receiverInfo.secondTypeId
				let arr = []
				for(let i of this.listArry){
					let obj = {}
					obj.costName = i.name
					obj.costPrice = i.num
					arr.push(obj)
				}
				req.costList = JSON.stringify(arr)
				usermodel.sendBill(req,data=>{
					uni.showToast({
						title:'发送成功',
						duration:1500,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/user/bill/bill'
						})
					},1500)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #f2f2f2;
		padding-bottom: 110rpx;
	}
	.timepicker{
		margin-top: 20rpx;
		background-color: #fff;
		padding:0 20rpx;
		height:84rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.choose{
			display: flex;
			.startDate{
				margin-right: 10rpx;
			}
			.endDate{
				margin-left: 10rpx;
			}
		}	
	}
	
	.detail{
		margin-top: 20rpx;
		background-color: #fff;
		padding:0 20rpx;
		.star{
			height:84rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #E6E6E6;
		}
		.list{
			border-bottom: 1rpx solid #f2f2f2;
			padding: 30rpx 0;
			.feename{
				border:1rpx solid #A0A0A0;
				width:640rpx;
				height:64rpx;
				padding-left: 20rpx;
				font-size:26rpx;
				border-radius:8rpx;
			}
			.feeList{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				.lf{
					display: flex;
					width:310rpx;
					height:64rpx;
					border:1rpx solid rgba(160,160,160,1);
					border-radius:8rpx;
					align-items: center;
					justify-content: space-between;
					padding:0 20rpx;
					image{
						width:10rpx;
						height:20rpx;
					}
				}
				input{
					margin-left: 20rpx;
					width:310rpx;
					height:64rpx;
					border:1rpx solid rgba(160,160,160,1);
					border-radius:8rpx;
					padding-left: 20rpx;
					font-size:26rpx;
				}
				image{
					width:40rpx;
					height:40rpx;
					margin-left: 20rpx;
				}
			}
		}
		.total{
			height:84rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			text{
				color:#ff6600;
				font-weight: bolder;
				font-size:28rpx;
			}
		}
	}
	
	textarea{
		background-color: #fff;
		width:750rpx;
		padding:20rpx;
		font-size: 26rpx;
		height:180rpx;
	}
	
	.pictureBox{
		background-color: #fff;
		padding:30rpx 20rpx;
		display: flex;
		
		image{
			width:200rpx;
			height:200rpx;
			margin-right: 20rpx;
			
		}
	}
	
	.receive{
		padding: 0 20rpx 20rpx 20rpx;
		background-color: #fff;
		.title{
			height:84rpx;
			display: flex;
			align-items: center;
		}
		.info{
			display: flex;
		}
		image{
			margin-right: 20rpx;
			width:80rpx;
			height:80rpx;
		}
	}

</style>