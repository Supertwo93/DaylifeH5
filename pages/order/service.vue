<template>
	<view>
		
		<view class="top">
			<view class="imgInfo">
				<view class='img'>
					<image :src="data.image"></image>
				</view>
			</view>
			<view class='detail'>
				<view class='content'>{{data.title}}</view>
				<view class='size'>{{data.spec}}</view>
			</view>
		</view>
		
		<view class="uni-list">				
			<view class="uni-list-cell-top">
				<view class="uni-list-cell-left">申请原因</view>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{array[index].name}} <image src="/static/cut/grayright.png" class="icon"></image> </view>
				</picker>
			</view>
			<view class="uni-list-cell-mi">
				<view class="uni-list-cell-left">售后方式</view>
				<picker @change="bindPickerChange2" :value="index2" :range="reason" range-key="name">
					<view class="uni-input">{{reason[index2].name}} <image src="/static/cut/grayright.png" class="icon"></image> </view>
				</picker>
			</view>
			<view class="uni-list-cell-bt">
				<view>申请备注：</view>
				<input placeholder="请输入申请原因" v-model="applyExplain"/>
			</view>
		</view>
		
		<view class='upTitle'>上传凭证（限3张）</view>
		<view class="upload">
			<block v-for="(item,index) in image" :key="index">
				<image :src="item" @click="uploadPic(index)"></image>
			</block>
		</view>
		
		<view class="submit" @tap="submit">提交申请</view>
		
	</view>
</template>

<script>
	import {OrderModel} from '@/common/models/order.js'
	let ordermodel = new OrderModel()
	export default {
		data() {
			return {
				data:'',
				goodsInfo:[
					{content:'清风原木纯品纸巾三层360抽 买三送一 限时抢购 买三送一 限时抢购',size:'选择大小：默认；'}
				],
				title: 'picker',
				array: [{name:'我要换货'},{name: '我要退货'}, {name:'我要退款'}, {name:'申请售后保修'},{name:'申请上门服务'}],
				reason: [{name:'卖家发错货'},{name: '买错/不喜欢/不好用'}, {name:'质量问题'}, {name:'其他问题'},{name:'假冒品牌'}],
				index: 0,
				index2:0,
				applyReason:'',
				backType:'',
				image:['https://sgz.wdttsh.com/mini_static/cut/upload_photo.png'],
				applyExplain:'',
			}
		},
		onLoad(options){
			let jsondata = JSON.parse(options.data)
			this.data = jsondata
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindPickerChange2: function(e) {
				this.index2 = e.target.value
			},
			uploadPic(index){
				if(index == 0){
					uni.chooseImage({
						count:3,
						success:(res)=>{
							for(let item of res.tempFilePaths){
								uni.uploadFile({
									url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
									filePath: item,
									name: 'img',
									success: (uploadFileRes) => {
										let img = uploadFileRes.data;
										img = JSON.parse(img).data
										if(this.image.length==4){
											return
										}else{
											this.image =  this.image.concat(img)
										}
										
									}
								})
							}
						}
					})
				}	
			},
			submit(){
				let req = {}
				req.goodsOrderItemId = this.data.goodsOrderItemId
				req.applyExplain = this.applyExplain
				req.applyMode = this.array[this.index].name
				req.applyReason = this.reason[this.index2].name
				req.applyPhotoList = this.image.join(',')
				ordermodel.applyBack(req,(data)=>{
					uni.showToast({
						duration:1500,
						title:'以为您申请售后服务',
						icon:'none'
					})
					setTimeout(function(){
						uni.switchTab({
							url:'../index/index'
						})
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#F2F2F2;
}
.icon{
	margin-left: 10rpx;
	width:10rpx;
	height:20rpx;
}
.top{
	background-color: #fff;
	width:100%;
	height:202rpx;
	border-top:2rpx solid #F2F2F2;
	display: flex;
	.imgInfo{
		width:161rpx;
		height:202rpx;
		.img{
			width:140rpx;
			height:140rpx;
			margin:31rpx 0 31rpx 21rpx;
			image{
				width:108rpx;
				height:108rpx;
				margin:17rpx 15rpx 16rpx 18rpx;
			}
		}
	}
	.detail{
		width:598rpx;
		height:202rpx;
		margin:31rpx 0 31rpx 21rpx;
		display:flex;
		flex-direction: column;
		.content{
			padding-top:8rpx;
			width:532rpx;
			height:54rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
		}
		.size{
			margin-top:28rpx;
			height:21rpx;
			font-size:20rpx;
			font-weight:400;
			color:rgba(160,160,160,1);
			line-height:40rpx;
		}
	}
}

.uni-list{
	
	margin-top:40rpx;
	background-color: #fff;
	height:254rpx;
	font-size:26rpx;
	
	
	.uni-list-cell-top{
		padding-left:21rpx;
		padding-right: 20rpx;
		height:84rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list-cell-mi{
		border-top:1rpx solid #F2F2F2;
		padding-left:21rpx;
		padding-right: 20rpx;
		height:84rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list-cell-bt{
		border-top:1rpx solid #F2F2F2;
		padding-left:21rpx;
		padding-right: 20rpx;
		height:84rpx;
		display: flex;
		align-items: center;
	}
}

.upTitle{
	display: flex;
	align-items: center;
	padding-left:20rpx;
	height:62rpx;
	font-size:22rpx;
	font-weight:400;
	color:rgba(120,120,120,1);
	
}

.upload{
	width:100%;
	background-color: #fff;
	image{
		width:200rpx;
		height:200rpx;
		margin:30rpx 0 30rpx 20rpx;
	}
}

.submit{
	width:100%;
	height:96rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	position:fixed;
	bottom:0;
	text-align: center;
	font-size:34rpx;
	line-height:96rpx;
	font-weight:400;
	color:rgba(255,255,255,1);
	
}


</style>
