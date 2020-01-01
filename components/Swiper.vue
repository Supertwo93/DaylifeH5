<template>
	  <view class="carousel-section">
		  <swiper class="swiper" circular="true" autoplay="true" @change="changeSwiper">
			<swiper-item v-for="(item,index) in swiperImage" :key="index">
				<image class="swiper-img" :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 轮播指示点样式修改 -->
		<view class="dots">
		  <block v-for="(item,index) in swiperImage.length" :key="item">
			  <view class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
		  </block>
		</view>
	  </view>
</template>

<script>


export default {
  name: '',
  props: {
		swiperImage:{
			type:Array,
			value:''
		}
  },
  data () {
    return {
      swiperCurrent: 0,
      bannerdata:[
      	{imgurl:"../../../../static/usebg.png"},
      	{imgurl:"../../../../static/usebg.png"}
      ]
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
   methods: {
	changeSwiper(e) {
	    this.swiperCurrent = e.detail.current;
	}
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	.carousel-section{
		width: 100%;
		height: 33.3vw;
		background-color: #007AFF;
		overflow: hidden;
		position: relative;
		swiper{
			width: 100%;
			height: 33.3vw;
			position: relative;
			swiper-item{
				.swiper-img{
					width: 100%;
					height: 33.3vw;
				}
			}
		}
		.dots {
		          position: absolute;
		          bottom: 20rpx;
		          left: 50%;
		          // 这里一定要注意兼容不然很可能踩坑          
		          transform: translate(-50%, 0);
		          -webkit-transform: translate(-50%, 0);        
		          z-index: 99;
		          display: flex;
		          flex-direction: row;
		          justify-content: center;			
		          .dot {
		              width: 8rpx;
		              height: 8rpx;
		              transition: all .6s;
		              background: rgba(0, 0, 0, .3);
		              margin-right: 10rpx;
		          }			
		          .active {
		              width: 8rpx;
		              height: 8rpx;
		              background: rgba(255, 255, 255, .8);
		          }
		     }
	}
</style>
