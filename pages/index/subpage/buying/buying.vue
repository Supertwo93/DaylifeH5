<template>
	<view>
		<bavigationbar></bavigationbar>
		<Swiper></Swiper>
		<view class="list-box">
			<view class="title">
				<view class="lf">
					<view class="mark"></view><text>其他服务</text>
				</view>
				<view class="rt" @click="screen('top')">
					筛选<text class="iconfont icon-wenzhang2"></text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" :type="type"></uni-popup>
	</view>	
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import Swiper from "@/components/Swiper.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components:{
			bavigationbar,
			Swiper,
			uniPopup
		},
		data () {
			return {
				list:["便利店","送煤气","送水","餐厅预约"],
				type:''
			}
		},
		methods:{
			screen (type) {
				this.type = type
				this.$refs["popup"].open()
			}
		}
	}
</script>

<style lang="scss">
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 84rpx;		
		.lf{
			display: flex;
			align-items: center;
			.mark{
				width: 8rpx;
				height: 30rpx;
				background-color: #FF6600;
				margin-right: 10rpx;
			}
			text{
				font-size:28rpx;
				font-weight:500;
				color:rgba(60,60,60,1);
			}
		}
		.rt{
			.iconfont{
				margin-left:10rpx;
			}
		}
		
	}
	
	.list-box{
		padding:0 20rpx;//background-color: #F2F2F2;
	}
</style>
