<template>
	<view>
		<view v-if="type==1">
			<image src="/static/cut/vipcardok.png"></image>
			<view class="title">会员卡办理成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的卡包</view>
		</view>
		<view v-if="type==2">
			<image src="/static/cut/pay_ok.png"></image>
			<view class="title">您已单方签约成功</view>
			<view class="content">等待商家签约完成后，再支付租房费用</view>
			<view class="whiteButton one" @tap="toIndex">返回首页</view>
			<view class="whiteButton two" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==3">
			<image src="/static/cut/pay_ok.png"></image>
			<view class="payTitle">支付成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==4">
			<image src="/static/cut/pay_ok.png"></image>
			<view class="payTitle">预约成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==5">
			<image src="/static/cut/pay_ok.png"></image>
			<view class="payTitle">签约成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==6">
			<image src="/static/cut/pay_ok.png"></image>
			<view class="payTitle">资料提交成功</view>
			<view class="content">等待审核中，耐心等候哦</view>
			<view class="indexButton" @tap="toIndex">去首页看看</view>
		</view>
		<view v-if="type==7">
			<image src="/static/cut/user/uploadgoodssuccess.png"></image>
			<view class="uploadTitle">商品上传成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toProvide">继续上传</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			type:null
		}
	},
	onLoad(e) {
		this.type=e.type
		console.log(e)
	},
	methods:{
		toIndex(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		toMyPackage(){
			switch(Number(this.type)){
				case 1:
				uni.navigateTo({
					url:'../user/card/cardpackage'
				})
				break;
				case 2:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
				case 3:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
				case 4:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
				case 5:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
			}
		},
		toProvide(){
			uni.switchTab({
				url:'/pages/realease/provide'
			})
		}
	}
}
</script>

<style lang="scss">
image{
	width:271rpx;
	height:243rpx;
	position: absolute;
	top:179rpx;
	left:240rpx;
}
.whiteButton{
	position: absolute;
	top:536rpx;
	left: 115rpx;
	width:240rpx !important;
}
.yellowButton{
	position:absolute;
	top:536rpx;
	left:395rpx;
	width:240rpx !important;
}
.one{
	position: absolute;
	top:583rpx;
	left: 115rpx;
	width:240rpx !important;
}
.two{
	position:absolute;
	top:583rpx;
	left:395rpx;
	width:240rpx !important;
}
.title{
	position:absolute;
	top:448rpx;
	left:264rpx;
	font-size:30rpx;
	color:rgba(100,100,100,1);
}
.content{
	position:absolute;
	top:508rpx;
	left:160rpx;
	color:#8C8C8C;
}
.payTitle{
	position:absolute;
	top:456rpx;
	left:305rpx;
	font-size:36rpx;
	color:rgba(60,60,60,1);
}
.uploadTitle{
	position:absolute;
	top:456rpx;
	left:280rpx;
	font-size:36rpx;
	color:rgba(60,60,60,1);
}
.indexButton{
	position: absolute;
	top:578rpx;
	left:255rpx;
	width:240rpx;
	height:60rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	border-radius:10rpx;
	color:#fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
