<template>
	<view>
		<block v-if="commentList.goodCommentList.length!=0">
			<block v-for="(item,index) in commentList.goodCommentList" :key="index">
				<comment-box :row="item" :margin="true" :button="false" v-on:delete="deleteUserComment(item)">
					<view class="commentInfo">
						<image class="goodImage" :src="item.smallPic"></image>
						<view class="information">
							<view class="title">{{item.title}}</view>
							<view class="price">{{item.price}}</view>
						</view>
					</view>
				</comment-box>
			</block>
		</block>
		<block v-else>
			<image class="image" src="/static/cut/no_user_comment.png"></image>
			<view class="nocomment">暂无评价记录</view>
		</block>
	</view>
</template>

<script>
import commentBox from '@/components/commentBox.vue'
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	components: {
		commentBox
	},
	data(){
		return{
			starOff:'/static/cut/star_off.png',
			starOn:'/static/cut/star_on.png',
			starList:[0,1,2,3,4],
			commentList:{}
		}
	},
	onLoad(){
		usermodel.getUserComment((data)=>{
			this.commentList = data
			console.log(this.commentList)
		})
	},
	methods:{
		deleteUserComment(item){
			uni.showModal({
				title: "提示",
				content: "确定删除评论？",
				success: (res) => {
					if(res.confirm){
						usermodel.deleteUserComment({commentIds:item.commentId},(data)=>{
							usermodel.getUserComment((data)=>{
								this.commentList = data
							})
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.image{
	margin-top: 271rpx;
	margin-left: 174rpx;
	width:402rpx;
	height:389rpx;
}
.nocomment{
	color:#505050;
	margin-top: 40rpx;
	margin-left: 292rpx;
}

.commentInfo{
	padding:0 20rpx;
	height:130rpx;
	display: flex;
	background-color: #FAFAFA;
	.goodImage{
		width:130rpx;
		height:130rpx;
	}
	.information{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.title{
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp:1;
			-webkit-box-orient:vertical;
			overflow: hidden;
			word-wrap: break-word;
			word-break: break-all;
		}
		.price{
			
		}
	}
}
</style>
