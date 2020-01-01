<template>
	<view>
		<view class="couponList">
			<view v-for="(item,index) in coupons" :key="index" class="item">
				<view class="left">
					<view class="title">{{item.title}}</view>
					<view class="remark">{{item.remark}}</view>
					<view class="time">有效期:{{item.useStartDate}}至{{item.useEndDate}}</view>
				</view>
				<view v-if="item.receiveStatus==1" class="right" @tap="collectCoupon(item)">立即领取</view>
				<view v-if="item.receiveStatus==2" class="received">已领取</view>
				<view v-if="item.receiveStatus==3" class="received">已领完</view>
			</view>
		</view>
		
		<view class="toMy" @tap="toMyCoupon()"><image src='/static/cut/coupon.png'></image>我的优惠券</view>
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	let usermodel = new UserModel()
	export default {
		data() {
			return {
				coupons: []
			}
		},
		onLoad(){
			usermodel.getCouponList({},(data)=>{
				this.coupons = data
			})
		},
		methods: {
			collectCoupon(item){
				usermodel.receiveCoupon({couponId:item.couponId},(data)=>{
					uni.showToast({
						title:'领取优惠券成功',
						icon:'none',
						duration:1500
					}),
					setTimeout(()=>{
						usermodel.getCouponList({},(data)=>{
							this.coupons = data
						})
					},1500)
				})
			},
			toMyCoupon(){
				uni.navigateTo({
					url:'/pages/wallet/coupon'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.couponList{
	width:100%;
	padding-left:20rpx;
	padding-right:20rpx;
	.item{
		margin-top:20rpx;
		width:100%;
		height:200rpx;
		display: flex;
		.left{
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAABkCAYAAACma410AAADuUlEQVR4nO3dO2hfZRjH8e97GtshdvGy1Kl2EJxCp1al6OggiuC1FFuVgItgFm9r8TI4FhEREVNH0boogoqNtjo4OWo3BxGdFLRVH4ek4fCSNc+D//f7mcI7fZcf5Jycc9LYEhF7gMeBU8BhYB+S/u/ebK2t9odLABFxI3AOOJJdJWlXXdnpcIqIJeBDHL20iA7tdDix+av90dwWSUnujIgb+sMJeKwgRlKOfcDL/eEEnACeB37PLpKU4smIeGF+0K7+EBErwAawnF0lKcWnwCvA+TY/jYgXgdMlSZKyXJm6gw9KMiRluqYf/q8lGZJS9cM/XFIhKdX28Lce2X22sEVSkgkgIvYDbwPHanMkZWgRsQ7cDVxXHSMpR4uIqI6QlKu/uSdpAA5fGpDDlwbk8KUBOXxpQA5fGtAErAEXqkMk5Zm/j78GvFbYIilJ/z7+OnC8qEVSkv4a//WSCkmp+uFfKqmQlKof/k0lFZJS9cN/oqRCUqr5Xf1HgLN0N/wkLZ4WEQ8BDwL3V8dIyuH7+NKAfGRXGpDDlwbk8KUBOXxpQA5fGpDDlwY0AV8Al4s7JCWaWmt3AQeBT6pjJOWYP7K7F/gGWKnLkZRh+xq/tXYZOF3YIilJf3PvYkmFpFT98JdLKiSl6od/T0mFpFTzm3uHgG/x32VLC2+KiOWIOAl8haOXhuD7+NKAfGRXGpDDlwbk8KUBOXxpQA5fGpDDlwbk8KUBTcC1wCng5+IWSUl8ZFca0Px9/B+BlwpbJCXpr/E/KqmQlKof/h8lFZJS9cM/UlIhKZUf25QGNAFExAHgHI5eGkKLiM+B24C91TGScvghDmlAPrIrDcjhSwNy+NKAHL40IIcvDcjhSwOagIeB96tDJOWZP7L7KLA+P5O0mObv478HvFHYIilJf43/VkmFpFT98H8qqZCUqh/+zSUVklL1w3+qpEJSqu3hR8QacLywRVKSFhHPAA8AR6tjJOXwfXxpQD6yKw3I4UsDcvjSgBy+NCCHLw3I4UsDmoCzwG/VIZLyNICI2A+cAU7U5kjKMP8Qxx7gM+BYXY6kDPMPcfwDvFrYIilJf3Pvu5IKSan64V9fUiEpVT/8+0oqJKWa39xbATaA5bocSRmmiDgYEc8B53H00iK7BDwN3NoiYgO4vThI0u56F1htrf0Jm9f479T2SNplHwMnr44eNr/AswR8iZ/ekhbRv8AtrbUf5odTa+1v4F7gYkmWpN30dT962PpzXmvtF+AOYBW4APyV2yZpl3y/0+F/7KnBWq+nflMAAAAASUVORK5CYII=);
			background-size:508rpx 200rpx;
			width:508rpx;
			height:200rpx;
			padding-top:42rpx;
			padding-left:50rpx;
			.title{
				font-size:34rpx;
				font-family:Source Han Sans CN;
				color:rgba(60,60,60,1);
			}
			.remark{
				margin-top:18rpx;
				font-size:24rpx;
				font-family:Source Han Sans CN;
				color:rgba(60,60,60,1);
			}
			.time{
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(120,120,120,1);
				line-height:38rpx;
			}
		}
		.right{
			width:200rpx;
			height:200rpx;
			background: url(data:image/png;base64,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);
			background-size:200rpx 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:34rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		.received{
			width:200rpx;
			height:200rpx;
			background: url(data:image/png;base64,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);
			background-size:200rpx 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:34rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		
	}
}

.toMy{
	z-index:999;
	position: fixed;
	bottom:0;
	background-color: #fff;
	width:750rpx;
	height:100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width:32rpx;
		height:28rpx;
		margin-right: 10rpx;
	}
}
</style>
