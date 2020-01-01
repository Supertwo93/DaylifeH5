<template name="settingSpec">
	<view>
		<view class="box" v-for="(item,index) in specLists" :key="index">
			<view class="uploadImg gray" v-if="item.image == ''" @tap="chooseImg(index)">上传图片</view>
			<image class="img_pic" v-else :src="item.image" @tap="chooseImg(index)" mode="widthFix"></image>
			<view class="setting">
				<view class="specName">
					<view>规格名：</view>
					<input placeholder="请输入" v-model="item.spec"/>
				</view>
				<view class="detail">
					<view class="item">
						<view>单价：</view>
						<input placeholder="请输入" v-model="item.price"/>
					</view>
					<view class="item sec">
						<view>库存：</view>
						<input placeholder="请输入" v-model="item.stockCount"/>
					</view>
				</view>
			</view>
			<view class="add" v-if="item.isAdd != true" @tap="addSpec(index)">
				<image src="/static/cut/user/add.png"></image>
				<view>添加</view>
			</view>
			<view class="add white" v-else @tap="delSpec(index)">
				<image src="/static/cut/user/del.png"></image>
				<view>删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'settingSpec',
		data() {
			return {
				specLists: [
					{
						image: '',
						spec: '',
						price: '',
						stockCount: '',
						isAdd: false
					}
				]
			}
		},
		methods:{
			chooseImg(idx){
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						for(let i in res.tempFilePaths){
							uni.uploadFile({
								url: 'https://sgz.wdttsh.com/app/imgUpload/upload', //图片接口
								filePath: res.tempFilePaths[i],
								name:'img',
								success:(uploadFileRes)=>{
									var data = JSON.parse(uploadFileRes.data);
									var url = data.data;
									that.specLists[idx].image = url;
									console.log(that.specLists[idx].image);
								}
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '上传失败',
							icon:'none',
						});
					}
				});
			},
			addSpec(idx){
				this.specLists.push({
					image: '',
					spec: '',
					price: '',
					stockCount: '',
					isAdd: true
				})
			},
			delSpec(index){
				this.specLists.splice(index, 1);
			}	
		}
	}
</script>

<style lang="scss">
.box{
	margin-top: 40rpx;
	display: flex;
	height:160rpx;
	.uploadImg{
		width:160rpx;
		height:160rpx;
		background: url(data:image/png;base64,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);
		background-size: cover;
		padding-left:37rpx;
		padding-top: 92rpx;
	}
	.img_pic{
		width:160rpx;
		height:160rpx;
		border: 1rpx solid #A0A0A0;
		box-sizing: border-box;
	}
	.setting{
		margin-left: 20rpx;
		width:430rpx;
		.specName{
			width:430rpx;
			height:64rpx;
			margin-bottom: 32rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			display: flex;
			align-items: center;
			padding-left:20rpx;
			input{
				width:300rpx;
				font-size: 26rpx;
			}
		}
		.detail{
			height:64rpx;
			display: flex;
			.item{
				width:205rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
				display: flex;
				align-items: center;
				padding-left:20rpx;
				input{
					width:100rpx;
					font-size: 26rpx;
				}
			}
			.sec{
				margin-left: 20rpx;
			}
		}
	}
	.add{
		margin-left: 31rpx;
		width:70rpx;
		height:160rpx;
		background:linear-gradient(180deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:8rpx;
		image{
			width:34rpx;
			height:34rpx;
			margin-top: 28rpx;
			margin-left: 20rpx;
		}
		view{
			margin-left: 20rpx;
			font-size:30rpx;
			color:rgba(254,254,254,1);
		}
		&.white{
			border:1px solid rgba(255,102,0,1);
			background: #fff;
			view{
				color: #FF6600;
			}
		}
	}
}

</style>
