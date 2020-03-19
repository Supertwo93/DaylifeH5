<template>
	<view>
		<block v-if="list.length===0">
			<image class="noImg" src="https://sgz.wdttsh.com/mini_static/cut/mess_bg.png"></image>
			<view class="noText">暂无系统消息</view>
		</block>
		<block v-else>
			<view class="info"  v-for="(item,index) in list" :key="index">
				<view @tap="deleteItem(item)" class="menu">
					<view class="icon iconfont icon-iconfontshanchu1"></view>
				</view>
				
				
				<view @tap="toDetail(item)" class="box" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<view class="title">{{item.title}}</view>
					<image src="https://sgz.wdttsh.com/mini_static/cut/black-arrow.png"></image>
				</view>
			</view>
			
		</block>
	</view>
</template>




<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				queryInfo:{
					pageNo:1,
					pageSize:10
				},
				list:[],
				theIndex:null,
				oldIndex:null,
				isStop:false
			}
		},
		onLoad(){
			this.getList()
		},
		methods:{
			getList(){
				usermodel.getSystemMessageList(this.queryInfo,data=>{
					this.list = data
					
				})
			},
			toDetail(item){
				let data = item.content.substring(item.content.indexOf('<div>'),item.content.indexOf('</body'))
				uni.navigateTo({
					url:`/pages/msg/systempage?data=${data}`
				})
			},
			touchStart(index,event){
				if(event.touches.length>1){
					this.isStop = true
					return
				}
				this.oldIndex = this.theIndex
				this.theIndex = null
				
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY]
			},
			touchMove(index,event){
				if(event.touches.length > 1){
					this.isStop = true
					return
				}
				let moveX = event.touches[0].pageX - this.initXY[0]
				let moveY = event.touches[0].pageY - this.initXY[1]
				
				if(this.isStop || Math.abs(moveX)<5){
					return
				}
				if(Math.abs(moveY) > Math.abs(moveX)){
					this.isStop = true
					return
				}
				
				if(moveX<0){
					this.theIndex = index
					this.isStop = true
				}else if(moveX > 0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex){
						this.oldIndex = index
						this.theIndex = null
						this.isStop = true
						setTimeout(()=>{
							this.oldIndex = null
						},150)
					}
				}
			},
			touchEnd(index,$event){
				this.isStop = false
			},
			deleteItem(item){
				usermodel.deleteSystemMessage({appusermessageId:item.appusermessageId},data=>{
					uni.showToast({
						title:'删除成功',
						icon:'none',
						duration:1500
					})
					this.getList()
				})
			}
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.noImg{
	width:402rpx;
	height:389rpx;
	margin-top: 271rpx;
	margin-left: 174rpx;
}

.noText{
	margin-top: 40rpx;
	margin-left: 292rpx;
}


.info{
	display: flex;
	align-items: center;
	position:relative;
	overflow: hidden;
	z-index:9999;
	width:750rpx;
	height: 105rpx;
	.menu{
		.icon{
			color:#fff;
			font-size:30rpx;
		}
		position: absolute;
		width:20%;
		height:100%;
		right:0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
		color:#fff;
		z-index:2;
	}
	.box{
		@keyframes showMenu {
			0% {
				transform:translateX(0);
			}
			100%{
				transform: translateX(-20%);
			}
		}
		@keyframes closeMenu{
			0% {
				transform: translateX(-20%);
			}
			100% {
				transform:translateX(0)
			}
		}
		&.open{
			animation: showMenu 0.25s linear both;
		}
		&.close{
			animation: closeMenu 0.15s linear both;
		}
		background-color: #fff;
		position: absolute;
		width:100%;
		padding:0 20rpx;
		// border-bottom: 1rpx solid #f2f2f2;
		height:105rpx;
		display: flex;
		z-index: 99;
		justify-content: space-between;
		align-items: center;
		view{
			color:#1E1E1E;
		}
		image{
			width:12rpx;
			height:19rpx;
		}
	}
}





</style>
