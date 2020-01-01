<template>
	<view>
		<view class="modify">
			<input v-model="email" focus placeholder="请设置"/>
			<image src="/static/cut/delete.png" @tap="clearContent"></image>
		</view>
		<view class="long-button" @tap="preserve">
			保存 
		</view>
	</view>
</template>

<script>
	import {UserModel} from "@/common/models/user.js"
	let Usermodel=new UserModel()
	import {mapState,mapMutations} from 'vuex'; 
	export default{
		data(){
			return{
				email:this.$store.state.uerInfo.email||""
			}
		},
		methods:{
			clearContent(e){
				this.email = ''
			},
			preserve(){
				let email=this.email
				let reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
				if(!reg.test(email)){
					this.$api.msg("邮箱格式不正确，请重新输入");
					return false;
				}	
				Usermodel.updateInfo(email,3,(res)=>{ //思路 vuex 变 setStorage跟着变
					let te=[this.email,3]
					this.$store.commit('setTest',te) //修改vuex  共享数据
					uni.setStorage({//修改setStorage中数据    防止刷新数没变
								  key: 'uerInfo',  
								  data: this.$store.state.uerInfo  
					})  
					console.log(res)
				//	this.$api.msg(res.message);
					uni.navigateBack()
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

image{
	width:32rpx;
	height:32rpx;
}

.modify{
	background-color: #fff;
	margin-top:20rpx;
	height:104rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right:20rpx;
}

input{
	padding-left:20rpx;
	width:90%;
}

.long-button{
	margin-top:100rpx;
}
	
</style>
