<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<business-order></business-order>
	</view>
</template>

<script>
import businessOrder from '@/components/business/business-order.vue'
export default{
	components:{
		businessOrder
	},
	data(){
		return{
			headerPosition:"fixed",
			headerTop:"0px",
			orderType: ['待接单','待处理','已接单','已完成','退款售后'],
			tabbarIndex:0
		}
	},
	onLoad: function (option) {
		this.tabbarIndex = option.index
		console.log(option.index)
		//兼容H5下排序栏位置
		// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		// #endif
		
	
	}
}
</script>

<style lang="scss">
page{
	padding-top:80rpx;
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
</style>
