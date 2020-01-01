<template>
	<view>
		<view v-if="data.firsttypeId==1&&rerent==true" class="agreementButton light"  @tap="toRerent">
			<image src="/static/cut/agreementable.png"></image>
			<view class="title">我要续租</view>
			<view class="content">您的合同到期前15-30天可发起续约申请</view>
		</view>
		<view v-if="data.firsttypeId==1&&rerent==false" class="agreementButton darkgray">
			<image src="/static/cut/no_agreement.png"></image>
			<view class="title">我要续租</view>
			<view class="content">您的合同到期前15-30天可发起续约申请</view>
		</view>
		<view v-if="data.firsttypeId==1" class="agreementButton light"  @tap="release()">
			<image src="/static/cut/agreement.png"></image>
			<view class="title">我要退租</view>
			<view class="content">需提前解约的话，推荐先找已方商量一下哦~</view>
		</view>
		<view v-if="data.firsttypeId==5" class="agreementButton light" @tap="toResign">
			<image src="/static/cut/agreementable.png"></image>
			<view class="title">我要续约</view>
			<view class="content">您的合同到期前都可以可发起续约申请</view>
		</view>
		<view v-if="data.firsttypeId==5" class="agreementButton light"  @tap="release()">
			<image src="/static/cut/agreementable.png"></image>
			<view class="title">我要解约</view>
			<view class="content">需提前解约的话，推荐先找已方商量一下哦~</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			data:'',
			rerent:''
		}
	},
	methods:{
		release(){
			uni.navigateTo({
				url:`agreementrelease?data=${JSON.stringify(this.data)}`
			})
		},
		toRerent(){
			uni.navigateTo({
				url:`/pages/user/agreement/agreementrerent?data=${JSON.stringify(this.data)}`
			})
		},
		toResign(){
			uni.navigateTo({
				url:`/pages/user/agreement/agreementresign?data=${JSON.stringify(this.data)}`
			})
		}
	},
	onLoad(options){
		this.data = JSON.parse(options.data)
		let date = Date.parse(new Date())
		let endDate = Date.parse(new Date(this.data.contractEndtime))
		let subDay = parseInt((endDate-date)/ (1000 * 60 * 60 * 24))
		if(subDay>=15&&subDay<=30){
			this.rerent = true
		}else{
			this.rerent = false
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.default{
	background-color: #E6E6E6;
	view{
		color:#A0A0A0;
	}	
}
.light{
	background-color: #FC8230;
	view{
		color:#fff;
	}
}

.darkgray{
	background-color: #E6E6E6;
	view{
		color:#A0A0A0;
	}
}
</style>
