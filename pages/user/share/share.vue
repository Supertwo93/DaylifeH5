<template>
	<view class="all">
		<view class="navigationBar" :class="[displayLink==1?'':'opa']">
			<image src="/static/cut/back_white.png" @tap="toUser()"></image>
			<view>二维码邀请</view>
		</view>
		
		<view class="body" :class="[displayLink==1?'':'opa']" @tap.stop="hideLink()">
			
			<view class="body-code">
				<image @tap="previewImage(src)" :src="src" mode=""></image>
			</view>
			<view class="number">邀请码：{{uerInfo.refereeCode}}</view>
			<view class="body-font">
				<image @click="clickShow" src="/static/shareLink.png"></image>
				<image @click="clickShow" src="/static/cut/share_pic.png"></image>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="share-wrap" @click="changeWrap" id="wrap" v-show="showWrap">
			<view class="share-wrap-cont">
				<view class="share-wrap-content">
					<view @click="share(index)" class="share-wrap-list" v-for="(item,index) in shareList" :key="index">
						<image :src="item.src"></image>
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
import {mapState} from 'vuex'
import NativeShare from '../../../common/SDK/NativeShare.js'
export default{
	data(){
		return{
			src:'https://sgz.wdttsh.com/mini_static/minicode.png',
			displayLink:true,
			shareList:[{
				title:'微信好友',
				src:'/static/shareWx.png',
				type:'wechatFriend'
			},{
				title:"微信朋友圈",
				src:'/static/shareP.png',
				type:'wechatTimeline'
			},{
				title:"QQ好友",
				src:'/static/shareQQ.png',
				type:'qqFriend'
			},{
				title:'QQ空间',
				src:'/static/shareK.png',
				type:'qZone',
			}],
			showWrap:false,
			appVersion:null,
		}
	},
	computed: {
		...mapState(['uerInfo'])
	},  
	onShareAppMessage(res){
		return{
			title:'江南皮革厂倒闭了',
			path:'/pages/index/index'
		}
	},
	created(){
		let u = navigator.appVersion;
		let uc = u.split('UCBrowser/').length > 1  ? 1 : 0;
		let qq = u.split('MQQBrowser/').length > 1 ? 2 : 0;
		let wx = ((u.match(/MicroMessenger/i)) && (u.match(/MicroMessenger/i).toString().toLowerCase() == 'micromessenger'));
		if( uc ){
			this.appVersion = 'uc';
		}
		if( qq && !wx ){
			this.appVersion = 'qq';
		}
	},
	methods:{
		showLink(){
			this.displayLink = false;
		},
		hideLink(){
			this.displayLink = true;
		},
		toUser(){
			uni.switchTab({
				url:'../user'
			})
		},
		clickShow(){
			this.showWrap = true;
		},
		changeWrap(e){
			let id = e.target.id;
			if( id === 'wrap' ){
				this.showWrap = false;
			}
		},
		previewImage(src){
			uni.previewImage({
				current:src,
				urls:[src]
			})
		},
		share(index){
			// #ifdef H5
			let nativeShare = new NativeShare()
			if( this.appVersion ){
				// 设置分享文案
				nativeShare.setShareData({
				    icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
				    link: 'https://github.com/fa-ge/NativeShare',
				    title: 'NativeShare',
				    desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
				    from: '@fa-ge',
				})
				// 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
				try {
					nativeShare.call(this.shareList[index].type);
				    // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
				    // 类似的命令下面有介绍
				} catch(err) {
				  // 如果不支持，你可以在这里做降级处理
				}
				return;
			}
			uni.showToast({
				icon:'none',
				title:`可以用浏览器分享按钮分享到${this.shareList[index].title}哦`
			})
			// #endif
			
		}
	}
}
</script>

<style lang="scss">
		
.all{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	// background-color: red;
	background: url('~@/static/shareLogo.png') no-repeat;
	background-size: 100% 100%;
	background-color: #fef0f0;
	// background-position: 0 -100rpx;
}
.navigationBar{
	height:128rpx;
	// background:#ff674b;
	position:relative;
	image{
		position: absolute;
		width:20rpx;
		height:34rpx;
		top:47rpx;
		left:20rpx;
	}
	view{
		font-size:36rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:36rpx;
		position: absolute;
		top:47rpx;
		left:300rpx;
	}
}	

.body{
	flex: 1;
	
	.title{
		position:absolute;
		top:554rpx;
		left:200rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(30,30,30,1);
		line-height:36rpx;
	}
	.code{
		position: absolute;
		top:604rpx;
		left:200rpx;
		height:350rpx;
		width:350rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		image{
			width:294rpx;
			height:294rpx;
		}
	}
	.number{
		position: absolute;
		top:82%;
		left:236rpx;
		font-size:34rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:36rpx;
	}
	button{
		padding:0;
		width:280rpx;
		height:80rpx;
		position: absolute;
		top:1075rpx;
		left:80rpx;
		image{
			width:280rpx;
			height:80rpx;	
		}
	}
	.shareLink{

	}
	.sharePic{
		width:280rpx;
		height:80rpx;
		position: absolute;
		top:1075rpx;
		left:390rpx;
	}
	
}

.link{
	position:fixed;
	z-index:99;
	bottom:0;
	width:750rpx;
	height:302rpx;
	background:rgba(236,236,236,1);
	border-radius:20rpx 20rpx 0rpx 0rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	button{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ECECEC;
		image{
			width:140rpx;
			height:140rpx;
		}
		view{
			margin-top: 19rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
			line-height:36rpx;
		}
	}

}



.none{
	display: none;
}

.opa{
	opacity: 0.3;
}
.body-code{
	// width: 250rpx;
	// height: 250rpx;
	padding: 20rpx;
	position: absolute;
	top:58%;
	left: 50%;
	transform: translateX(-50%);
	display: inline-block;
	background-color: white;
	image{
		width: 254rpx;
		height: 254rpx;
	}
}
.body-font{
	position: absolute;
	top:90%;
	left: 0;
	width: 100%;
	height: 80rpx;
	// background-color: #007AFF;
	display: flex;
	justify-content: center;
	image{
		width: 280rpx;
		height: 80rpx;
	}
	image:first-of-type{
		margin-right: 30rpx;
	}
}
.share-wrap{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.3);
	z-index: 999;
	&-cont{
		position: fixed;
		width: 100%;
		height: 300rpx;
		bottom: 0;
		left: 0;
		background-color: rgba(236,236,236,1);
		display: flex;
		align-items: center;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
	}
	&-content{
		padding: 0 20rpx;
		display: flex;
	}
	&-list{
		margin-right: 50rpx;
		text-align: center;
		image{
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
		}
		text{
			font-size: 24rpx;
			color: #3C3C3C;
			vertical-align: top;
		}
	}
}
</style>
