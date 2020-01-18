<template>
	<view class="box">
		<image v-if="chooseCompany" @tap="choose(1)" src="/static/cut/company-open-on.png"></image>
		<image @tap="choose(2)" v-else src="/static/cut/company-open.png"></image>
		
		<image @tap="choose(1)" v-if="choosePersonal" src="/static/cut/personal-open-on.png"></image>
		<image @tap="choose(3)" v-else src="/static/cut/personal-open.png"></image>
		
		<view @tap="toNext" class="btn" :class="choosed?'on':''">下一步</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				chooseCompany:false,
				choosePersonal:false,
				choosed:false
			}
		},
		methods:{
			choose(index){
				if(index==1){
					this.chooseCompany = false
					this.choosePersonal = false
					this.choosed = false
				}else if(index==2){
					this.chooseCompany = true
					this.choosePersonal = false
					this.choosed = true
				}else{
					this.chooseCompany = false
					this.choosePersonal = true
					this.choosed = true
				}
			},
			toNext(){
				if(this.choosed == false){
					uni.showToast({
						title:'请选择开店类型',
						duration:1500,
						icon:'none'
					})
				}else{
					let status = ''
					if(this.chooseCompany==true){
						status = 1
					}else{
						status = 0
					}
					uni.navigateTo({
						url:'/pages/user/store/storeOpen?status=' + status
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		height:90vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	image{
		height:270rpx;
		width:270rpx;
	}
	
	.btn{
		width:280rpx;
		height:80rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		opacity:0.6;
		border-radius:20rpx;
		text-align: center;
		line-height: 80rpx;
		color:#fff;
		font-size:34rpx;
		font-weight: 400;
		&.on{
			opacity: 1;
		}
	}
</style>
