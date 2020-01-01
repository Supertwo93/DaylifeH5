<template>
	<view>
		<view class="modify">
			<input v-model="nick" focus/>
			<image src="/static/cut/cancel.png" @tap="clearContent"></image>
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
				nick:this.$store.state.uerInfo.nickname
			}
		},
		computed:{
			...mapState(['hasLogin','uerInfo'])
		},
		methods:{
			clearContent(e){
				this.nick = ''
			},
			preserve(){
				let name=this.nick
				Usermodel.updateInfo(name,1,(res)=>{ //思路 vuex 变 setStorage跟着变
					let te=[this.nick,1]
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
