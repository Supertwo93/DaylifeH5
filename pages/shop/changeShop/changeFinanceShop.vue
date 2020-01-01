<template>
	<view class="all">
		<!-- 服务商子类 -->
		
		<view class="nav">
			<view @tap="backToLast" class="backto">
				<image src="/static/cut/lifecircle/backto.png"></image>
			</view>
			<view class="title">编辑商品</view>
			<image class="one" src="/static/cut/deletegoods.png"></image>
			<image v-if="data.isMarketable==0" @tap="editStoreInfo" class="two" src="/static/cut/takeon.png"></image>
			<image v-if="data.isMarketable==1" @tap="editStoreInfo" class="two" src="/static/cut/takeoff.png"></image>
		</view>
		
		<view class="all-head">
			
			<!-- 服务商子类 -->
			<view class="all-header">
				<view class="all-header-h1">服务商子类</view>
				<view class="all-header-cont">
					<view @click="changeChild(index)" :class="item.onoff?'select-view':''" v-for="(item,index) in childClassList" :key="index">
						{{ item.title }}
					</view>
				</view>
			</view>
			
			<!-- 基本信息 -->
			<view class="all-news">
				<view class="all-news-h1">基本信息</view>
				<view class="all-news-cont">
					<view class="all-news-content" v-for="(item,index) in newsList" :key="index">
						<text :class="item.must?'must-input':''">{{ item.title }}</text>
						<view class="all-news-content-right">
							<em v-if="index === 1 || index === 3">￥</em> <input @blur="changeContent($event,index)" :value="item.val" :type="item.type" :placeholder="item.place">
						</view>
					</view>
				</view>
			</view>
			
			<!-- 店铺内商品所属分类 -->
			<view class="all-class">
				<view class="all-class-h1">
					店铺内商品所属分类
				</view>
				<view class="all-class-cont">
					<view class="all-class-cont-left">
						已有分类
					</view>
					<view class="all-class-cont-right">
						<view @click="changeClass(index)" :class="cate_idx==index?'select-view':''" v-for="(item,index) in cateList" :key="index">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 设置规格 -->
			<view v-if="secondType=='6364df4f0ede49da9063b6cc5d4dfc72'" class="all-set">
				<view class="all-set-h1">设置规格</view>
				
				<view class="all-set-cont">
					<view class="all-set-content" v-for="(item,index) in addNormList" :key="index">
						<view class="all-set-content-left">
							<image @tap="addSpecImage(index)" :src="item.specsPicture"></image>
						</view>
						<view class="all-set-content-center">
							<view class="center1">规格名：<input type="text" v-model="item.specsName" placeholder="请输入规格名"></input></view>
							<view class="center2">
								<view>单价：<input type="number" v-model="item.specsPrice" placeholder="请输入单价"></input></view>
							</view>
						</view>
						<view @click="addSet" class="all-set-content-right" v-if="index === 0">
							<view class="add">+</view>
							<em>添</em>
							<em>加</em>
						</view>
						<view @click="delSet(index)" class="del-right" v-if="index !== 0">
							<image src="../../../static/cut/user/del.png"></image>
							<em>删</em>
							<em>除</em>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 设置委托业务范围 -->
			<view v-if="secondType=='6364df4f0ede49da9063b6cc5d4dfc72'" class="financeBox">
				<view class="star">委托业务范围</view>
				<view class="rangeSelect" v-for="(item,index) in rangeList" :key="index">
					<picker @change="rangeChange($event,index)" :range="rangeArry">
						<view class="box">
							<view>{{item.rangeName}}</view>
							<image src="/static/cut/rightIcon.png"></image>
						</view>
					</picker>
					<view class="input">收费:<input v-model="item.rangePrice" placeholder="请输入"/></view>
					<view class="button" v-if="item.add==1" @tap="addRange()">
						<image src="/static/cut/user/add.png"></image>
						<view>添加</view>
					</view>
					<view class="button del" v-else @tap="deleteRange(index)">
						<image src="/static/cut/user/del.png"></image>
						<view>删除</view>
					</view>
				</view>
			</view>
			
			<view class="loan" v-if="secondType=='e7fb24d27ba141e4a038213bfc190076'">
				<view class="title">贷款信息</view>
				<view class="itemList">
					<view class="item">
						<view class="itemtitle">额度:</view>
						<input placeholder="请输入" v-model="quota" placeholder-style="font-size:26rpx;"/>
					</view>
					<view class="item">
						<view class="itemtitle">期限:</view>
						<input placeholder="请输入" v-model="limit" placeholder-style="font-size:26rpx;"/>
					</view>
					<view class="item">
						<view class="itemtitle">费率:</view>
						<input placeholder="请输入"  v-model="rate" placeholder-style="font-size:26rpx;"/>
					</view>
				</view>
				<view class="applyCondition">
					<view class="applyTitle">申请条件:</view>
					<input placeholder="请输入" v-model="applyCondition" placeholder-style="font-size:26rpx;"/>
				</view>
				<view class="applyCondition">
					<view class="applyTitle">申请要点:</view>
					<input placeholder="请输入" v-model="applyMain" placeholder-style="font-size:26rpx;"/>
				</view>
				<view class="applyCondition">
					<view class="applyTitle">申请材料:</view>
					<input placeholder="请输入" v-model="applyMaterial" placeholder-style="font-size:26rpx;"/>
				</view>
			</view>
			
			<!-- 设置商品详情描述 -->
			<view class="remark_box">
				<view class="rel_title"><text>服务详情</text></view>
				<textarea v-model="detail" placeholder="可以简单介绍一下.." />
			</view>
			
			
			<!-- 相关图片 -->
			<view class="all-about">
				<view class="all-about-h1">
					相关图片（注:第一张为主图,限6张）
				</view>
				
				<scroll-view class="scroll-view" scroll-x="true">
					
					<view class="scroll-view-all" v-for="(item,index) in imgList" :key="index">
						<image :src="item"></image>
						<view class="scroll-view-bottom">
							<image @tap="delteImage(index)" src="../../../static/cut/cancel.png"></image>
						</view>
					</view>
					
					<view class="scroll-view-all">
						<image @click="addImg" src="../../../static/cut/upload_photo.png"></image>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<view @tap="submitChange" class="all-btn">
			保存
		</view>
	</view>
</template>

<script>
	import {ProvideModel} from '@/common/models/provide.js'
	import {StoreModel} from '@/common/models/store.js'
	import {FinanceModel} from '@/common/models/finance.js'
	let financemodel = new FinanceModel()
	let provideModel=new ProvideModel()
	let storeModel = new StoreModel()
	export default {
		data() {
			return {
				childClassList:[],
				newsList:[{
					title:'服务名称',
					must:true,
					place:"请输入服务标题",
					type:'text',
					val:''
				},{
					title:'服务价格',
					must:true,
					place:"请输入服务价格",
					type:'number',
					val:''
				}],
				classList:[{
					title:"汽水饮料",
					onoff:false,
				},{
					title:"生活用品",
					onoff:false,
				},{
					title:'生活用品',
					onoff:false,
				},{
					title:"汽水饮料123",
					onoff:false,
				}],
				addNormList:[],
				cateList:[],
				cateIdList:[],
				cate_idx:null,
				addData:{
					specsPicture:'../../../static/cut/upload_photo.png',
					specsName:'',
					specsPrice:'',
				},
				imgList:[],
				id:null,
				code:null,
				news:{},
				data:'',
				firstTypeId:'',
				firstType:'',
				goodsId:'',
				secondType:'',
				rangeList:[
				],
				rangeArry:[],
				detail:'',
				quota:'',
				rate:'',
				limit:'',
				applyCondition:'',
				applyMain:'',
				applyMaterial:'',
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.code = options.code
			this.firstTypeId = options.type
			this.firstType = '金融'
			this.getCateList()
			provideModel.queryHouseGoods({firsttypeId:5},data=>{
				this.rangeArry = data
			})
		},
		methods:{
			getCateList(){
				financemodel.getFinanceDetail({id:this.id,financeCode:this.code},data=>{
					this.data = data
					this.secondType = this.data.secondTypeId
					console.log(this.secondType)
					provideModel.getSecondType({type:2,firstType:this.firstType},data=>{
						data.forEach(item =>{
							let onoff = false;
							if( item.secondtypeinfoId === this.data.secondTypeId){
								onoff = true;
								this.secondType = item.secondtypeinfoId
							}
							let obj = {
								title:item.title,
								id:item.secondtypeinfoId,
								onoff,
							};
							this.childClassList.push(obj);
						})
					})
					this.newsList[0].val = data.title;
					this.newsList[1].val = data.price;
					this.goodsId = data.financeId
					this.detail = data.details
					this.quota = data.loanQuota
					this.rate = data.loanRates
					this.limit = data.loanTimelimit
					this.applyCondition = data.applyCondition
					this.applyMain = data.applyMainpoints
					this.applyMaterial = data.applyMaterial
					for(let i in data.rangeList){
						let obj = {}
						obj.rangeName = data.rangeList[i].rangeName
						obj.add = false 
						if(i==0){
							obj.add = true
						}
						obj.rangePrice= data.rangeList[i].rangePrice
						this.rangeList.push(obj)
					}
					
					
					for(let i of data.specsList){
						let obj = {}
						// obj.goodsItemId = i.goodsItemId
						obj.specsPicture = i.specsPicture
						obj.specsName = i.specsName
						// obj.stockCount = i.stockCount
						obj.specsPrice = i.specsPrice
						this.addNormList.push(obj)
					}
					this.imgList = data.picture.split(',')
					provideModel.checkSellerGroup((data)=>{
						this.cateList = []
						this.cateIdList = []
						for(let i in data){
							this.cateList.push(data[i].name)
							this.cateIdList.push(data[i].id)
							if(this.data.sellerGroupId==data[i].id){
								this.cate_idx = i
							}
						}
					})
				})	
			},
			changeChild(index){
				this.childClassList.forEach(item =>{
					item.onoff = false;
				});
				this.childClassList[index].onoff = true;
				this.secondType = this.childClassList[index].id
			},
			changeClass(index){
				this.cate_idx = index;
			},
			addSet(){
				this.addNormList.push(this.addData);
			},
			delSet(index){
				this.addNormList.splice(index,1);
			},
			backToLast(){
				uni.navigateBack({
					delta:1
				})
			},
			submitChange(){
				let req = {}
				if(this.secondType=="6364df4f0ede49da9063b6cc5d4dfc72"){
					for(let i of this.rangeList){
						delete i.add
					}
					req.specsList = this.addNormList
					req.rangeList = this.rangeList
					req.releaseFinance = {}
					req.releaseFinance.id = this.data.id
					req.releaseFinance.financeCode = this.data.financeCode
					req.releaseFinance.sellerId = this.data.sellerId
					req.releaseFinance.picture = this.imgList.join(',')
					req.releaseFinance.title = this.newsList[0].val
					req.releaseFinance.price = this.newsList[1].val
					req.releaseFinance.firstTypeId = 5
					req.releaseFinance.secondTypeId = this.secondType
					req.releaseFinance.sellerGroupId = this.cateIdList[this.cate_idx]
					req.releaseFinance.details = this.detail
					console.log(req)
				}else if(this.secondType=="e7fb24d27ba141e4a038213bfc190076"){
					req.releaseFinance = {}
					req.releaseFinance.applyCondition = this.applyCondition
					req.releaseFinance.applyMainpoints = this.applyMain
					req.releaseFinance.applyMainpoints = this.applyMaterial
					req.releaseFinance.details = this.detail
					req.releaseFinance.firstTypeId = 5
					req.releaseFinance.id = this.data.id
					req.releaseFinance.loanQuota = this.quota
					req.releaseFinance.loanRates = this.rate
					req.releaseFinance.loanTimelimit = this.limit
					req.releaseFinance.picture = this.imgList.join(',')
					req.releaseFinance.price = this.newsList[1].val
					req.releaseFinance.secondTypeId = this.secondType
					req.releaseFinance.sellerGroupId = this.cateIdList[this.cate_idx]
					req.releaseFinance.sellerId = this.data.sellerId
					req.releaseFinance.title = this.newsList[0].val
				}
				let financeJSON = JSON.stringify(req)
				storeModel.editFinanceGoods({financeJSON},data=>{
					uni.showToast({
						title:'修改商品信息成功',
						duration:1500,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				})
			},
			changeContent(event,index){
				this.newsList[index].val = event.detail.value
			},
			addRange(){
				this.rangeList.push({
					rangeName: "请选择",
					rangePrice: '',
					add: false
				})
			},
			deleteRange(index){
				this.rangeList.splice(index,1)
			},
			delteImage(index){
				this.imgList.splice(index,1)
			},
			rangeChange(e,index){
				this.rangeList[index].rangeName = this.rangeArry[e.detail.value];
			},
			addImg(){
				uni.chooseImage({
					count:1,
					success:(res)=>{
						uni.uploadFile({
							url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: (uploadFileRes) => {
								let img = uploadFileRes.data;
								img = JSON.parse(img)
								this.imgList.push(img.data)
								
							}
						})
					}
				})
			},
			addSpecImage(index){
				uni.chooseImage({
					count:1,
					success:(res)=>{
						uni.uploadFile({
							url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: (uploadFileRes) => {
								let img = uploadFileRes.data;
								img = JSON.parse(img)
								this.addNormList[index].specsPicture = img.data
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.all{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		&-head{
			flex: 1;
			background-color: #f2f2f2;
			overflow: scroll;
		}
		&-btn{
			height: 100rpx;
			background:linear-gradient(to right,#FF9130,#FF6600);
			line-height: 100rpx;
			text-align: center;
			font-size: 32rpx;
			color: white;
		}
		&-header{
			margin-top: 20rpx;
			background-color: white;
			&-h1{
				font-size: 25rpx;
				line-height: 74rpx;
				padding-left: 19rpx;
			}
			&-h1::before{
				content: '*';
				color: red;
			}
			&-cont{
				padding: 0 19rpx;
				view{
					display: inline-block;
					vertical-align: top;
					padding: 14rpx 36rpx;
					border-radius: 8rpx;
					background-color: #DCDCDC;
					margin-left: 20rpx;
					margin-bottom: 20rpx;
					font-size: 24rpx;
					color: #A0A0A0;
					border: 1rpx solid #DCDCDC;
				}
				.select-view{
					background-color: white;
					border-color: #FF6600;
					color: #FF6600;
				}
			}
		}
		&-news{
			&-h1{
				font-size: 22rpx;
				color: #787878;
				line-height: 70rpx;
				padding-left: 19rpx;
			}
			&-cont{
				background-color: white;
			}
			&-content{
				height: 84rpx;
				line-height: 84rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				display: flex;
				text{
					color: #646464;
				}
				text::before{
					content: '*';
					color: transparent;
				}
				.must-input::before{
					content: '*';
					color: red;
				}
				&-right{
					flex: 1;
					margin-left: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #1E1E1E;
					em{
						font-style: normal;
						font-size: 20rpx;
					}
					input{
						flex: 1;
						font-size: 20rpx;
						color: #1E1E1E;
					}
				}
			}
			&-content{
				border-bottom: 1rpx solid #DCDCDC;
			}
		}
		&-class{
			background-color: white;
			margin-top: 20rpx;
			&-h1{
				font-size: 25rpx;
				margin: 0 20rpx;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #DCDCDC;
			}
			&-cont{
				display: flex;
				margin: 30rpx 20rpx 0;
				padding-bottom: 20rpx;
				&-left{
					font-size: 23rpx;
					color: #A0A0A0;
					width: 134rpx;
				}
				&-right{
					flex: 1;
					view{
						display: inline-block;
						vertical-align: top;
						padding: 14rpx 24rpx;
						border: 1rpx solid #C8C8C8;
						border-radius: 8rpx;
						margin-right: 30rpx;
						margin-bottom: 20rpx;
						font-size: 24rpx;
						color: #646464;
					}
					.select-view{
						background-color: white;
						border-color: #FF6600;
						color: #FF6600;
					}
				}
			}
		}
		&-set{
			background-color: white;
			margin-top: 20rpx;
			&-h1{
				font-size: 25rpx;
				margin: 0 20rpx;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #DCDCDC;
			}
			&-content{
				display: flex;
				padding: 0 20rpx 60rpx;
				margin-top: 20rpx;
				&-left{
					margin-right: 20rpx;
					border: 1rpx dashed #C0C0C0;
					border-radius: 8rpx;
					width: 158rpx;
					height: 158rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				&-center{
					margin-right: 30rpx;
					flex: 1;
					.center1{
						padding: 0 20rpx;
						height: 64rpx;
						border: 1rpx solid #A0A0A0;
						border-radius: 8rpx;
						display: flex;
						align-items: center;
						input{
							flex: 1;
							font-size: 25rpx;
						}
					}
					.center2{
						height: 64rpx;
						margin-top: 32rpx;
						display: flex;
						view{
							flex: 1;
							border-radius: 8rpx;
							border: 1rpx solid #A0A0A0;
							display: flex;
							padding: 0 20rpx;
							align-items: center;
							input{
								flex: 1;
								font-size: 25rpx;
							}
						}
						view:first-of-type{
							margin-right: 10rpx;
						}
					}
				}
				&-right{
					width: 70rpx;
					height: 160rpx;
					background: linear-gradient(#FF9130,#FF6600);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border: 1rpx solid transparent;
					.add{
						width: 34rpx;
						height: 34rpx;
						border-radius: 50%;
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;
						font-weight: bold;
						background-color: white;
						color: #FF6600;
					}
					em{
						font-style: normal;
						color: white;
						font-size: 30rpx;
					}
				}
				.del-right{
					width: 70rpx;
					height: 160rpx;
					background: white;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border: 1rpx solid #FF6600;
					image{
						width: 34rpx;
						height: 34rpx;
						border-radius: 50%;
						// border: 1rpx solid #C0C0C0;
						box-sizing: border-box;
					}
					em{
						font-style: normal;
						color: #FF6600;
						font-size: 30rpx;
					}
				}
			}
		}
		&-about{
			width: 100%;
			margin-bottom: 20rpx;
			&-h1{
				padding-left: 20rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				color: #787878;
			}
			.scroll-view{
				width: 100%;
				overflow: scroll;
				white-space: nowrap;
				background-color: white;
				&-all{
					display: inline-block;
					padding-top: 30rpx;
					vertical-align: top;
					margin-right: 56rpx;
					image{
						width: 200rpx;
						height: 200rpx;
					}
				}
				view:first-of-type{
					margin-left: 20rpx;
				}
				&-bottom{
					height: 82rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 32rpx;
						height: 32rpx;
						margin-top: -10rpx;
					}
				}
			}
		}
	}
	
	.nav{
		background-color: #fff;
		height:88rpx;
		position: relative;
		.backto{
			position: absolute;
			top:0;
			left:0;
			width:60rpx;
			height:100%;
			display: flex;
			align-items: center;
			image{
				margin-left: 20rpx;
				width:20rpx;
				height:34rpx;
			}
		}
		.title{
			position: absolute;
			top:27rpx;
			left:300rpx;
			font-size: 34rpx;
		}
		
			.one{
				position: absolute;
				left:610rpx;
				top:28rpx;
				width:34rpx;
				height:38rpx;
			}
			.two{
				position: absolute;
				left:692rpx;
				top:26rpx;
				width:41rpx;
				height:40rpx;
			}
	}
	
	.financeBox{
		margin-top: 20rpx;
		background-color: #fff;
		padding:0 20rpx 30rpx 20rpx;
		.star{
			display: flex;
			height:83rpx;
			align-items: center;
			border-bottom: 1rpx solid #F2F2F2;
		}
		.rangeSelect{
			display: flex;
			margin-bottom: 20rpx;
			.box{
				padding:0 20rpx;
				width:255rpx;
				height:64rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image{
					width:10rpx;
					height:20rpx;
				}
			}
			.input{
				width:255rpx;
				height:64rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
				margin-left: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 20rpx;
				input{
					width:160rpx;
				}
			}
			.button{
				width:160rpx;
				height:64rpx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:8rpx;
				margin-left: 20rpx;
				image{
					width:34rpx;
					height:34rpx;
					margin-right:10rpx ;
				}
				display: flex;
				align-items: center;
				justify-content: center;
				align-items: center;
				font-size:30rpx;
				color:#fff;
				&.del{
					border:1px solid rgba(255,102,0,1);
					background: #fff;
					color: #FF6600;
				}
			}
		}
	}
	
	.remark_box{
		background: #fff;
		margin-top: 15rpx;
		padding: 0 20rpx 60rpx;
		.rel_title{
			margin-bottom: 0;
			padding: 25rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F2F2F2;
			margin-bottom: 30rpx;
		}
		textarea{
			width:710rpx;
			height:180rpx;
			border:1rpx solid #A0A0A0;
			border-radius:8rpx;
			color: #B4B4B4;
			font-size: 26rpx;
			padding: 15rpx 20rpx;
		}
	}
	
	.loan{
		background-color: #fff;
		margin-top: 20rpx;
		width:750rpx;
		height:635rpx;
		padding:0 20rpx;
		.title{
			display: flex;
			align-items: center;
			height:83rpx;
			border-bottom: 1rpx solid #f2f2f2;
		}
		.itemList{
			display: flex;
			flex-wrap: wrap;
			height:218rpx;
			border-bottom: 1rpx solid #F2F2F2;
			.item{
				margin-top: 30rpx;
				margin-right: 20rpx;
				display: flex;
				align-items: center;
				width:330rpx;
				height:64rpx;
				border:1rpx solid rgba(160,160,160,1);
				border-radius:8rpx;
				.itemtitle{
					margin-left: 20rpx;
					width:80rpx;
					display: flex;
				}
				input{
					width:220rpx;
				}
			}
		}
		.applyCondition{
			display: flex;
			align-items: center;
			margin-top: 35rpx;
			width:710rpx;
			height:64rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			padding-left:20rpx;
		}
	}
	
</style>
