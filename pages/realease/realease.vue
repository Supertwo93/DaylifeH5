<template>
	<view>
		<view class="page_bg"></view>
		<!-- 发布需求 -->
		<view class="release_box">
			<view class="rel_title">*<text>需求主类</text></view>
			<view class="rel_list">
				<view class="rel_item" @tap="selectDemandParent(index)" :class="[demand_parent_idx == index?'active':'']" v-for="(item,index) in demand_parent_list" :key="index">{{item.name}}</view>
			</view>
		</view>
		<view class="release_box">
			<view class="rel_title">*<text>需求子类</text></view>
			<view class="rel_list">
				<view class="rel_item" @tap="selectDemandChild(index)" :class="[demand_child_idx == index?'active':'']" v-for="(item,index) in demand_child_list" :key="index">{{item.name}}</view>
			</view>
		</view>
		<view class="com_title">基本信息</view>
		<view class="rel_form_box">
			<view class="rel_form_item">
				<view class="left_txt">*<text>我现需要</text></view>
				<view class="right_area"><input type="text" placeholder="请输入" v-model="now_need"></view>
			</view>
			<view class="rel_form_item">
				<view class="left_txt">*<text>服务地点</text></view>
				<view class="right_area"><input type="text" placeholder="请输入" v-model="service_address"></view>
			</view>
			<view class="rel_form_item">
				<view class="left_txt">*<text>联系人</text></view>
				<view class="right_area"><input type="text" placeholder="请输入" v-model="contact_person"></view>
			</view>
			<view class="rel_form_item">
				<view class="left_txt">*<text>联系电话</text></view>
				<view class="right_area"><input type="text" placeholder="请输入" v-model="contact_phone"></view>
			</view>
			<view class="rel_form_item">
				<view class="left_txt">*<text>服务时间</text></view>
				<view class="right_area">
					<picker mode="date" :value="today" @change="bindSeviceTime">
						<view class="time_txt">
							<text>{{time_txt}}</text>
							<image src="" class="next" mode="widthFix"></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="rel_form_item">
				<view class="left_txt"><text>服务时长</text></view>
				<view class="right_area">
					<picker mode="time" @change="bindDurationTime">
						<view class="time_txt">
							<text>{{duration_txt}}</text>
							<image src="" class="next" mode="widthFix"></image>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 收费设定 -->
		<view class="charge_setting_box">
			<view class="rel_title">*<text>收费设定</text></view>
			<view class="charge_content">
				<view class="charge_box">
					<view class="charge_item">
						<view class="charge_left"><text>一口价</text></view>
						<view class="charge_right">
							<input type="digit" placeholder="请输入价格" v-model="one_price">
						</view>
					</view>
					<view class="charge_item">
						<view class="charge_left"><text>小时价</text></view>
						<view class="charge_right">
							<input type="digit" placeholder="请输入价格" v-model="hour_price">
						</view>
					</view>
					<view class="charge_item">
						<view class="charge_left"><text>月薪</text></view>
						<view class="charge_right">
							<input type="digit" placeholder="请输入价格" v-model="month_price">
						</view>
					</view>
					<view class="charge_item">
						<view class="charge_left"><text>一口价</text></view>
						<view class="charge_right">
							<input type="digit" placeholder="服务方议价" v-model="price">
						</view>
					</view>
				</view>
				<radio-group @change="radioChange">
					<label class="radio_group" v-for="(item, index) in items" :key="item.value">
						<view class="radio_item">
							<radio :value="item.value" color="#FF6600" :checked="index === current" />
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<!-- 备注 -->
		<view class="remark_box">
			<view class="rel_title"><text>备注</text></view>
			<textarea v-model="remark" placeholder="可以简单介绍一下.." />
		</view>
		<view class="com_title">相关图片</view>
		<view class="upload_img_box">
			<image @tap="selectPhoto" class="add_img" src="/static/cut/upload_photo.png" mode="widthFix"></image>
			<view class="image_item" v-for="(item,index) in photos" :key="index">
				<image :src="item" mode="widthFix"></image>
			</view>
		</view>
		<view class="bottom_place"></view>
		<button class="upload_btn noNumber" v-if="isCanUpload == 0" type="primary">确认上传</button>
		<button class="upload_btn" v-else type="primary">确认上传</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				demand_parent_idx: null,
				demand_parent_list: [
					{name: '生活服务'},
					{name: '代购服务'},
					{name: '维修服务'},
					{name: '金融服务'},
					{name: '房屋服务'},
					{name: '家政服务'}
				],
				demand_child_idx: null,
				demand_child_list: [
					{name: '便利店'},
					{name: '煤气配送'},
					{name: '送水到家'},
					{name: '保姆月嫂'},
					{name: '深度清洁'},
					{name: '整理收纳'},
					{name: '钟点工'}
				],
				now_need: '',
				service_address: '',
				contact_person: '',
				contact_phone: '',
				
				today: '',
				time_txt: '请选择',
				duration_txt: '请选择',
				
				one_price: '',
				hour_price: '',
				month_price: '',
				price: '',
				
				items: [
					{
						value: 'one',
						checked: 'true'
					},
					{
						value: 'two'
					},
					{
						value: 'three'
					},
					{
						value: 'four'
					}
				],
				current: 0,
				
				remark: '',
				isCanUpload: 0,
				photos: []
			}
		},
		onLoad() {
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			if(month<10){
				month = '0'+month
			}
			let day = new Date().getDate();
			if(day<10){
				day = '0'+day
			}
			this.today = year+'-'+month+'-'+day;
		},
		methods:{
			selectDemandParent(idx){
				this.demand_parent_idx = idx;
			},
			selectDemandChild(idx){
				this.demand_child_idx = idx;
			},
			bindSeviceTime(e){
				this.time_txt = e.target.value;
			},
			bindDurationTime(e){
				this.duration_txt = e.target.value;
			},
			selectPhoto(e){
				var that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						for(let i in res.tempFilePaths){
							console.log(res.tempFilePaths[i]);
							that.photos.push(res.tempFilePaths[i]);
							// uni.uploadFile({
							// 	url: that.$api+'default/upload-image', //图片接口
							// 	filePath: res.tempFilePaths[i],
							// 	name: 'image',
							// 	success: (uploadFileRes) => {
							// 		var data = JSON.parse(uploadFileRes.data);
							// 		if(data.code == 0){
							// 			if(that.photos.length >= 9){
							// 				uni.showToast({
							// 					title: "最多发布9张图片",
							// 					icon: 'none'
							// 				})
							// 				return false;
							// 			}
							// 			var url = data.data.url;
							// 			that.photos.push(url);
							// 		}else{
							// 			uni.showToast({
							// 				title:data.msg,
							// 				icon:'none',
							// 			});
							// 		}
							// 	}
							// });
						}
					},
					fail: (res) => {
						uni.showToast({
							title:res.data.msg,
							icon:'none',
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.rel_title{
		color: #f00;
		font-size: 26rpx;
		margin-bottom: 20rpx;
		text{
			color: #646464;
			margin-left: 5rpx;
		}
	}
	.release_box{
		padding: 30rpx 20rpx 10rpx;
		box-sizing: border-box;
		margin-top: 15rpx;
		background: #fff;
		.rel_list{
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			.rel_item{
				// display: inline-block;
				padding: 10rpx 0;
				width:140rpx;
				text-align: center;
				color: #646464;
				font-size: 24rpx;
				border:1rpx solid rgba(200,200,200,1);
				border-radius:8rpx;
				margin: 0 20rpx 20rpx 0;
				&.active{
					color: #FF6600;
					border-color: #FF6600;
				}
			}
		}
	}
	.com_title{
		color: #787878;
		font-size: 22rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.rel_form_box{
		background: #fff;
		.rel_form_item{
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1rpx solid #F2F2F2;
			.left_txt{
				width: 140rpx;
				color: #f00;
				font-size: 26rpx;
				margin-right: 20rpx;
				text-align: right;
				text{
					color: #646464;
					margin-left: 5rpx;
				}
			}
			.right_area{
				width: 75%;
				input{
					color: #B4B4B4;
					font-size: 26rpx;
				}
				.time_txt{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #B4B4B4;
					font-size: 26rpx;
					image{
						display: block;
						width: 10rpx;
						height: 20rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
	.charge_setting_box{
		background: #fff;
		margin-top: 15rpx;
		.rel_title{
			margin-bottom: 0;
			padding: 25rpx 20rpx;
			box-sizing: border-box;
		}
		.charge_content{
			display: flex;
			justify-content: flex-start;
			align-items: stretch;
			padding: 30rpx 20rpx;
			border-top: 1rpx solid #F2F2F2;
			.charge_box{
				margin-right: 20rpx;
				.charge_item{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 20rpx;
					// &:last-of-type{
					// 	margin-bottom: 0;
					// }
					.charge_left{
						width: 140rpx;
						margin-right: 20rpx;
						color: #646464;
						font-size: 26rpx;
					}
					.charge_right{
						border:1rpx solid rgba(160,160,160,1);
						border-radius:8rpx;
						padding: 10rpx 20rpx;
						box-sizing: border-box;
						input{
							color: #B4B4B4;
							font-size: 26rpx;
						}
					}
				}
			}
			.radio_group{
				.radio_item{
					height: 25%;
					display: flex;
					align-items: center;
					radio{
						transform: scale(.7) translateY(-20rpx);
					}
				}
			}
		}
	}
	
	.remark_box{
		background: #fff;
		margin-top: 15rpx;
		padding: 0 20rpx 60rpx;
		.rel_title{
			margin-bottom: 0;
			padding: 25rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F2F2F2;
			margin-bottom: 30rpx;
		}
		textarea{
			width:710rpx;
			height:180rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			color: #B4B4B4;
			font-size: 26rpx;
			padding: 15rpx 20rpx;
		}
	}
	
	.upload_img_box{
		background: #fff;
		margin-bottom: 15rpx;
		padding: 30rpx 20rpx 10rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.add_img,.image_item{
			display: block;
			width: 200rpx;
			height: 200rpx;
			margin: 0 20rpx 20rpx 0;
		}
		.image_item{
			border: 1rpx solid #F2F2F2;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				display: block;
				width: 198rpx;
				height: 198rpx;
			}
		}
	}
	.bottom_place{
		height: 100rpx;
	}
	.upload_btn{
		position: fixed;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0;
		left: 0;
		bottom: 0;
		color: #fff;
		font-size: 34rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		.noNumber{
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			opacity:0.6;
		}
	}
</style>
