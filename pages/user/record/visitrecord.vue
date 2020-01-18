<template>
	<view>
		<view v-for="(item,index) in data" :key="index" class="goodsInfo">
			
			<view @tap="deleteItem(item)" class="menu">
				<view class="icon iconfont icon-iconfontshanchu1"></view>
			</view>
			
			<view @tap="toDetail(item)" class="box" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
				<image :src="item.pic"></image>
				<view class="rt">
					<view class="top">{{item.title}}</view>
					<view class="bottom">
						<view class="price">￥{{item.price}}</view>
						<view class="label">{{item.firstTypeInfoId|numToStr}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	filters:{
		numToStr(value){
			if(value==1){
				return '房屋'
			}else if(value==3){
				return '家政'
			}else if(value==5){
				return '金融'
			}else if(value==8){
				return '生活'
			}else if(value==9){
				return '维修'
			}else if(value==10){
				return '代购'
			}
		}
	},
	data(){
		return{
			pageNo:1,
			data:'',
			theIndex:null,
			oldIndex:null,
			isStop:false
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
			let req = {}
			req.pageNo = this.pageNo
			req.pageSize = 10
			usermodel.checkVisitRecord(req,data=>{
				if(this.pageNo == 1){
					this.data = data
				}else{
					this.data = this.data.concat(data)
				}
				
			})
		},
		toDetail(item){
			uni.navigateTo({
				url:`/pages/provide/detail?sellerId=${item.sellerId}&id=${item.mainId}&type=${item.firstTypeInfoId}`
			})
		},
		deleteItem(item){
			usermodel.deleteVisitRecord({id:item.id},data=>{
				uni.showToast({
					title:'删除成功',
					icon:'none',
					duration:1500
				})
				this.pageNo = 1
				this.getList()
				this.oldIndex = null
				this.theIndex = null
			})
		},
		touchStart(index,event){
			if(event.touches.length>1){
				this.isStop = true
				return
			}
			this.oldIndex = this.theIndex
			this.theIndex = null
			
			this.initXY = [event.touches[0].pageX,event.touches[0].pageY]
		},
		touchMove(index,event){
			if(event.touches.length > 1){
				this.isStop = true
				return
			}
			let moveX = event.touches[0].pageX - this.initXY[0]
			let moveY = event.touches[0].pageY - this.initXY[1]
			
			if(this.isStop || Math.abs(moveX)<5){
				return
			}
			if(Math.abs(moveY) > Math.abs(moveX)){
				this.isStop = true
				return
			}
			
			if(moveX<0){
				this.theIndex = index
				this.isStop = true
			}else if(moveX > 0){
				if(this.theIndex!=null&&this.oldIndex==this.theIndex){
					this.oldIndex = index
					this.theIndex = null
					this.isStop = true
					setTimeout(()=>{
						this.oldIndex = null
					},150)
				}
			}
		},
		touchEnd(index,$event){
			this.isStop = false
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.goodsInfo{
	margin-top: 20rpx;
	width:750rpx;
	height:220rpx;
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;
	z-index:4;
	border:0;
	.menu{
		.icon{
			color:#fff;
			font-size:48rpx;
		}
		position: absolute;
		width:30%;
		height:100%;
		right:0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
		color:#fff;
		z-index:2;
	}
	.box{
		@keyframes showMenu {
			0% {transform: translateX(0);}100%{transform:translateX(-30%);}
		}
		@keyframes closeMenu{
			0% {transform: translateX(-30%);}100% {transform: translateX(0);}
		}
		&.open{
			animation: showMenu 0.25s linear both;
		}
		&.close{
			animation: closeMenu 0.15s linear both;
		}
		position: absolute;
		width:100%;
		padding:0;
		z-index:3;
		height:220rpx;
		background-color: #fff;
		display: flex;
		padding:30rpx 0 30rpx 20rpx;
		image{
			width:160rpx;
			height:160rpx;
			border-radius:10px;
		}
		.rt{
			width:550rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.top{
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.bottom{
				display: flex;
				justify-content: space-between;
				.price{
					color:#FF6600;
					font-size:34rpx;
				}
				.label{
					width:100rpx;
					height:40rpx;
					background:rgba(41,181,246,1);
					border-radius:20rpx 0rpx 0rpx 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color:#fff;
				}
			}
		}
	}
}

</style>
