<template>
  <div>
    <view class="item" @tap="Goretrievepasswrod">
		<view>找回密码</view>
		<view class="iconfont icon-dibudaohanglan-"></view>
	</view>
    <view class="item" @tap="Goreplacephone">
    	<view>原手机号无法接收短信，更换手机号</view>
    	<view class="iconfont icon-dibudaohanglan-"></view>
    </view>
	<view class="title">
		问题还没有解决？
	</view>
	<view class="item">
		<view>询问客服中心</view>
		<view class="iconfont icon-dibudaohanglan-"></view>
	</view>
  </div>
</template>

<script>


export default {

  data () {
    return {
      
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
   methods: {
	Goretrievepasswrod () {
		uni.navigateTo({
			url:"retrievepasswrod"
		})
	},
	Goreplacephone () {
		uni.navigateTo({
			url:"replacephone"
		})
	}
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	page{
		background-color: #F2F2F2;
		.item{
			display: flex;
			justify-content: space-between;
			padding: 40rpx 20rpx;
			background-color:#FFFFFF;
			border-bottom: 1px solid #EBEBEB;
		}
		.title{
			padding:20rpx;
			color:rgba(120,120,120,1);
		}
	}
</style>
