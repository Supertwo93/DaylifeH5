<template>
	<view>
		<view class="defaultTitle">服务</view>
		
		<view class="topContainer">
			<view class="container" @tap="toHelp()">
				使用帮助
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container" @tap="toHelp()">
				客服中心
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container" @tap="toAboutus()">
				关于我们
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container none" @tap="toSuggestion()">
				意见反馈
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
	
		<view class="defaultTitle">通用</view>
		
		<view class="topContainer">
			<view class="container" @tap="toHelp()">
				当前版本
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container none" @tap="toHelp()">
				清除缓存
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
		
		<view class="submit-button" @click="logOut()">退出登录</view>
		
	</view>
</template>

<script>
	import {UserModel} from "../../common/models/user.js"
	let userModel=new UserModel()
	import {mapState,mapMutations} from 'vuex';  
export default{
	data(){
		return{
		}
	},
	methods:{
		...mapMutations(["logout"]),
		logOut(){
			this.$api.tip({
				title: '提示',
				content: '确认退出登录',
				cb_confirm:()=>{
					userModel.getLogout((data)=>{
						this.logout();
						uni.navigateBack({
							delta: 1
						})
					})
				},
				cb_cancel:()=>{
					
				}
			})
			
			
			// userModel.getLogout((data)=>{
			// 	uni.showModal({
			// 	    content: '确定要退出登录么',
			// 	    success: (e)=>{
			// 	    	if(e.confirm){
			// 	    		this.logout();
			// 	    		setTimeout(()=>{
			// 	    			uni.navigateBack();
			// 	    		}, 200)
			// 	    	}
			// 	    }
			// 	});
				
			// })
		},
		toHelp(){
			uni.navigateTo({
				url:'help'
			})
		},
		toAboutus(){
			uni.navigateTo({
				url:'aboutus'
			})
		},
		toSuggestion(){
			uni.navigateTo({
				url:'suggestion'
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}



.none{
	border:none !important;
}
</style>
