<template>
	<view class="replace">
		<view class="title">
			请输入无法接收短信的手机号码
		</view>
		<view class="item">
			<view class="iconfont icon-shouji"></view>
			<input placeholder="请输入手机号" v-model="phoneNumber"/>
		</view>
		<view class="title">
			请输入已认证的6位身份证生日
		</view>
		<view class="item">
			<view class="iconfont icon-shouji"></view>
			<input placeholder="如19990101" v-model="IdNumber"/>
		</view>
		<view class="sunui">
		        <sunui-mverify @change="mverify"></sunui-mverify>
		</view>
	</view>
</template>

<script>
import sunuiMverify from '@/components/sunui-mverify/sunui-mverify.vue';

export default {
  // name: '',
  components: {
   sunuiMverify

  },
  data () {
    return {
      phoneNumber:'',
	  IdNumber:''
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
   methods: {
	mverify(e){
		//let code=e.msg;
		alert(2)
		if(e.msg){
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){
				this.$api.msg('请填写正确手机号码');
				return false; 
			}
			if(!(/^\d{6}$/.test(this.verificationCode))){
				this.$api.msg('请填写正确身份证生日号码');
				return false; 
			}
			alert(1)
		}
	                console.log('验证结果:',e);
	}
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	.replace{
		margin:100rpx 80rpx;
		.title{
			// font-size:40rpx;
			// margin:100rpx 0 50rpx;
			
		}
		.item{
			display: flex;
			align-items: center;
			border-bottom:1px solid rgba(200,200,200,1);
			padding: 52rpx 0 27rpx;
			margin-bottom: 50rpx;
			.iconfont{
				margin:0 10rpx 0 5rpx;
			}
		}
	}
	
</style>
