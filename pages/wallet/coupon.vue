<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view class="couponList">
			<view v-for="(item,index) in coupons" :key="index" class="item">
				<view class="left">
					<view class="title">{{item.title}}</view>
					<view class="remark">{{item.remark}}</view>
					<view class="time">有效期:{{item.useStartDate}}至{{item.useEndDate}}</view>
				</view>
				<view class="right">{{status[tabbarIndex]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {UserModel} from '../../common/models/user.js'
	let usermodel = new UserModel();
	export default{
		data(){
			return{
				coupons: [],
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['未使用','已使用','已过期'],
				tabbarIndex:0,
				type:1,
				status:['立即使用','已使用','已过期']
			}
		},
		onLoad() {
			usermodel.getMyCouponList({type:this.type},(data)=>{
				this.coupons = data.list;
			})
		},
		methods:{
			showType(index){
				this.tabbarIndex = index
				this.type = this.tabbarIndex + 1
				usermodel.getCouponList({type:this.type},(data)=>{
					this.coupons = data
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	margin-top: 84rpx;
}

.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color: #FF6600;
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
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
		
	}
}
</style>
