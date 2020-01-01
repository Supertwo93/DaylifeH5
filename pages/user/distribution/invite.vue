<template>
	<view>
		<view class="invite_top">
			<text>邀请用户总人数</text>
			<view class="invite_num">{{total}}</view>
		</view>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @tap="navbarTap(index)">{{item.name}}({{item.num}})</view>
		</view>
		<scroll-view scroll-y="true" class="level_scroll_box">
			<view class="level_list_item" @tap="toInviteDetail(item.id)" v-for="(item,index) in level_list" :key="index">
				<view class="level_left">
					<image :src="item.avatar" mode="widthFix"></image>
					<view class="level_info">
						<view class="li_title">{{item.title}}</view>
						<text>{{item.info}}</text>
					</view>
				</view>
				<image src="/static/cut/rightIcon.png" class="next_icon" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				total: 101,
				navbar:[{name:"一级用户",num:0},{name:"二级用户",num:0}],
				currentTab:0,
				level_list: [
					{
						id: 1,
						avatar: "/static/cut/logo.png",
						title: "刘方方",
						info: "已使用软件120天，为您带来收益10元"
					},{
						id: 2,
						avatar: "/static/cut/logo.png",
						title: "刘方方",
						info: "已使用软件120天，为您带来收益10元"
					},{
						id: 3,
						avatar: "/static/cut/logo.png",
						title: "刘方方",
						info: "已使用软件120天，为您带来收益10元"
					},{
						id: 4,
						avatar: "/static/cut/logo.png",
						title: "刘方方",
						info: "已使用软件120天，为您带来收益10元"
					},{
						id: 5,
						avatar: "/static/cut/logo.png",
						title: "刘方方",
						info: "已使用软件120天，为您带来收益10元"
					},{
						id: 6,
						avatar: "/static/cut/logo.png",
						title: "刘方方",
						info: "已使用软件120天，为您带来收益10元"
					}
				]
			}
		},
		methods:{
			// 切换导航
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
				
				if(e == 0){
					//一级用户
					
				}else{
					//二级用户
					
				}
			},
			toInviteDetail(id){
				uni.navigateTo({
					url: '/pages/user/distribution/invite_detail?id=' + id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.invite_top{
		padding: 80rpx 0;
		text-align: center;
		border-top: 10rpx solid #F2F2F2;
		text{
			font-size:26rpx;
			color:rgba(160,160,160,1);
		}
		.invite_num{
			font-size:66rpx;
			font-family:Bahnschrift;
			font-weight:400;
			color:rgba(255,102,0,1);
			margin-top: 10rpx;
		}
	}
	.list_nav{
		background: #fff;
		color: #00001f;
		text-align: center;
		overflow: hidden;
		border-top: 10rpx solid #F2F2F2;
		border-bottom: 10rpx solid #F2F2F2;
		view{
			width: 50%;
			float: left;
			padding: 25rpx 0;
			position: relative;
			color: #646464;
			font-size: 30rpx;
			&.active{
				color: #FF6600;
			}
			&.active:after{
				content: "";
				display: block;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width:120rpx;
				height:4rpx;
				background:rgba(255,102,0,1);
			}
		}
	}
	.level_scroll_box{
		max-height: 60vh;
		.level_list_item{
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #F2F2F2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.level_left{
				width: 90%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					display: block;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 15rpx;
				}
				.level_info{
					width: 75%;
					.li_title{
						font-size:34rpx;
						font-family:Source Han Sans CN;
						font-weight:500;
						color:rgba(30,30,30,1);
						margin-bottom: 10rpx;
					}
					text{
						font-size:26rpx;
						color:rgba(140,140,140,1);
					}
				}
			}
			.next_icon{
				display: block;
				width: 15rpx;
				height: 25rpx;
			}
		}
	}
</style>
