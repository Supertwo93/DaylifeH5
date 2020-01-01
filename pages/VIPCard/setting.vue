<template>
	<view>
		<!-- 会员卡图片 -->
		<view class="graytitle">上传会员卡封面( 尽量勿上传纯色图片 )</view>
		<view class="imgBox">
			<image src="/static/cut/vipbc.png"></image>
			<view>点击更换图片</view>
		</view>
		
		<!-- 积分设定 -->
		<view class="point">
			<view class="star">积分设定</view>
			<view class="pointSetting">
				<view>每消费10元获得积分</view>
				<input placeholder="0" />
			</view>
			<view class="pointSetting">
				<view>每10积分可兑换金额</view>
				<input placeholder="0" />
			</view>
		</view>
		
		<!-- 会员卡优惠 -->
		<view class="discount">
			<view class="title">积分设定</view>
			<view class="pointSetting">
				<view>会员卡打几折</view>
				<input placeholder="不填为不打折" />
			</view>
		</view>
		
		<!-- 会员卡办理类型 -->
		<view class="type">
			<view class="star">会员卡办理类型</view>
			<view class="itemList">
				<view class="item">免费办理</view>
				<view class="item">缴费办理</view>
				<view class="item">活动办理</view>
			</view>
			<view class="inputBox">
				<view>可办理人数:</view>
				<input placeholder="请输入" />
			</view>
		</view>
		
		<!-- 会员卡充值活动 -->
		<view class="activity">
			<view class="title">会员卡充值活动</view>
			<block v-for="(item,index) in actiList" :key="index">
				<view class="itemList">
					<view class="charge">
						<view>充：</view>
						<input type="number" v-model="item.charge" placeholder="请输入" />
					</view>
					<view class="charge">
						<view>送：</view>
						<input type="number" v-model="item.send" placeholder="请输入" />
					</view>
					<image @tap="addOrDelete(item,index)" :src="item.isAdd?src[0]:src[1]"></image>
				</view>
			</block>
		</view>
		
		<!-- 会员卡详情 -->
		<view class="detail">
			<view class="title">会员卡详情</view>
			<textarea placeholder="可以简单介绍一下"></textarea>
		</view>
		
		
		<!-- 商品详情图 -->
		<view class="grayButton">商品图片(注：第一张为主图，限6张)</view>
		<upload-imgs :photos="goods_photos" @changes="goodsPhoto"></upload-imgs>
		
		<view class="submit-button">确认上传</view>
	</view>
</template>

<script>
	import uploadImgs from '@/components/uploadImgs.vue'
	export default{
		components:{
			uploadImgs
		},
		data(){
			return{
				goods_photos: [],
				actiList:[
					{
						isAdd:true,
						charge:'',
						send:''
					}
				],
				src:['/static/cut/ionc-a.png','/static/cut/user/del.png']
			}
		},
		methods:{
			goodsPhoto(e){
				this.goods_photos = e;
			},
			addOrDelete(item,index){
				if(item.isAdd==true){
					let obj = {}
					obj.isAdd = false
					obj.charge = ''
					obj.send = ''
					this.actiList.push(obj)
				}else{
					this.actiList.splice(index,1)
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
		padding-bottom: 110rpx;
	}
	.imgBox{
		height:460rpx;
		background-color: #fff;
		position: relative;
		margin-bottom: 20rpx;
		image{
			position: absolute;
			top:30rpx;
			left: 40rpx;
			width:670rpx;
			height:400rpx;
			border-radius:24rpx;
		}
		view{
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			width:240rpx;
			height:64rpx;
			background:rgba(255,255,255,1);
			border-radius:10rpx;
			color:#FF6600;
			top:326rpx;
			left:255rpx;
		}
	}
	.point{
		height:332rpx;
		background-color: #fff;
		padding:0 20rpx;
		.star{
			height:84rpx;
			line-height: 84rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.pointSetting{
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			height:64rpx;
			input{
				padding:0 20rpx;
				margin-left: 20rpx;
				width:300rpx;
				height:64rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
			}
		}
	}
	
	.discount{
		margin-top: 20rpx;
		padding:0 20rpx;
		height:246rpx;
		background-color: #fff;
		.title{
			line-height: 84rpx;
			height:84rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.pointSetting{
			display: flex;
			height:64rpx;
			align-items: center;
			margin-top: 30rpx;
			view{
				color:#646464;
				margin-right: 20rpx;
			}
			input{
				padding:0 20rpx;
				width:300rpx;
				height:64rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
				font-size:26rpx;
			}
		}
	}
	
	.type{
		background-color: #fff;
		margin-top: 20rpx;
		height:316rpx;
		padding:0 20rpx;
		.star{
			height:84rpx;
			line-height: 84rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.itemList{
			height:108rpx;
			display: flex;
			align-items: center;
			.item{
				width:140rpx;
				height:50rpx;
				border:1px solid rgba(200,200,200,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:24rpx;
				margin-right: 20rpx;
			}
		}
		.inputBox{
			width:640rpx;
			height:64rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			input{
				font-size: 26rpx;
				padding:0 20rpx;
			}
		}
	}
	
	.activity{
		padding:0 20rpx 30rpx 20rpx;
		margin-top: 20rpx;
		background-color: #fff;
		.title{
			align-items: center;
			height:84rpx;
			display: flex;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.itemList{
			margin-top: 30rpx;
			height:64rpx;
			display: flex;
			align-items: center;
			.charge{
				width:300rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
				height:64rpx;
				display: flex;
				align-items: center;
				padding:0 20rpx;
				margin-right: 20rpx;
				view{
					color:#646464;
				}
			}
			image{
				height:44rpx;
				width:44rpx;
			}
		}
	}
	
	.detail{
		padding:0 20rpx;
		margin-top: 20rpx;
		height:358rpx;
		background-color: #fff;
		.title{
			line-height: 84rpx;
			height:84rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		textarea{
			width:710rpx;
			height:180rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			margin-top: 34rpx;
			padding:10rpx;
			font-size:26rpx;
		}
	}
</style>
