<template>
	<view>
		<view class="top">
			<image class="search" src="/static/cut/ss.png"></image>
			<input confirm-type="search" placeholder="请输入关键字" focus="true" v-model="key" @confirm="doSearch()" />
			<image class="voice" src="/static/cut/yy.png"></image>
		</view>
		<view class="histotyTitle">
			<view class="lf">历史搜索</view>
			<view @tap="oldDelete" class="rt">清除历史</view>
		</view>
		<view class="history">
			<view class="label" v-for="(item,index) in oldKeywordList" :key="index" @tap="toSearchHiskey(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				key:'',
				oldKeywordList: [],
			}
		},
		onLoad(){
			this.loadOldKeyword()
		},
		methods:{
			loadOldKeyword(){
				uni.getStorage({
					key:'OldKeys',
					success:(res) =>{
						var OldKeys = JSON.parse(res.data)
						this.oldKeywordList = OldKeys
					}
				})
			},
			doSearch(){
				this.saveKeyword(this.key),
				uni.navigateTo({
					url:'/pages/HM-search/searchSellerFinal?key=' + this.key
				})
			},
			oldDelete(){
				uni.showModal({
					content:'确定清除历史搜索记录？',
					success:(res) =>{
						if(res.confirm){
							this.oldKeywordList = [];
							uni.removeStorage({
								key:'OldKeys'
							})
						}else if(res.cancel){
							
						}
					}
				})
			},
			saveKeyword(keyword){
				uni.getStorage({
					key:'OldKeys',
					success:(res) =>{
						var OldKeys = JSON.parse(res.data)
						var findIndex = OldKeys.indexOf(keyword)
						if(findIndex == -1){
							OldKeys.unshift(keyword)
						}else{
							OldKeys.splice(findIndex,1)
							OldKeys.unshift(keyword)
						}
						
						OldKeys.length > 10 && OldKeys.pop()
						uni.setStorage({
							key:'OldKeys',
							data:JSON.stringify(OldKeys)
						})
						this.oldKeywordList = OldKeys
					},
					fail:(e) =>{
						var OldKeys = [keyword]
						uni.setStorage({
							key:'OldKeys',
							data:JSON.stringify(OldKeys)
						});
						this.oldKeywordList = Oldkeys
					}
				})
			},
			toSearchHiskey(item){
				this.key = item
				uni.navigateTo({
					url:'/pages/HM-search/searchSellerFinal?key=' + this.key
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		width:710rpx;
		margin-left: 20rpx;
		height:64rpx;
		background-color: #F6F6F6;
		display: flex;
		align-items: center;
		padding:0 20rpx;
		input{
			margin-left: 20rpx;
			width:600rpx;
			font-size: 26rpx;
		}
		.search{
			width:27rpx;
			height:28rpx;
		}
		.voice{
			width:20rpx;
			height:30rpx;
		}
	}
	
	.histotyTitle{
		width:710rpx;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		justify-content: space-between;
		.rt{
			color:#ff6600;
		}
	}
	
	.history{
		width:710rpx;
		margin: 0 20rpx;
		display: flex;
		flex-wrap: wrap;
		.label{
			display: flex;
			align-items: center;
			margin-top: 10rpx;
			padding:0 20rpx;
			height:60rpx;
			margin-right: 20rpx;
			border-radius: 10rpx;
			border: 1rpx solid #000;
		}
	}
</style>
