<template>
	<view>
		
		<view v-if="comment.length==0">
			<image src="/static/cut/no_user_comment.png"></image>
			<view class="content">暂无评价记录</view>
		</view>
		
		<block v-for="(row,index) in comment" :key="index">
			<comment-box :row="row" :margin="true" :button="true"></comment-box>
		</block>
	</view>
</template>

<script>
import commentBox from '@/components/commentBox.vue'
export default{
	components: {
		commentBox
	},
	data(){
		return{
			comment:''
		}
	},
	onLoad(options){
		this.comment = JSON.parse(options.data)
		console.log(this.comment)
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

image{
	width:402rpx;
	height:389rpx;
	margin-left: 174rpx;
	margin-top: 271rpx;
}

.content{
	text-align: center;
	margin-top: 40rpx;
	color:#505050;
}
</style>
