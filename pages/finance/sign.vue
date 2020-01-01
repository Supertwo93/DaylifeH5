<template>
	<view>
		<view class="goodsInfo">
			<image :src="data.specsList[index].specsPicture"></image>
			<view class="container">
				<view class="title">{{data.title}}</view>
				<view class="spec gray">{{data.specsList[index].specsName}}</view>
				<view class="price gray">{{data.specsList[index].specsPrice}}</view>
			</view>
		</view>
		
		<view class="graytitle">基本信息</view>
		
		<view class="box">
			<view class="star lf">姓名</view>
			<view class="rg">
				<input placeholder="请输入姓名" v-model="name"/>
			</view>
		</view>
		<view class="box">
			<view class="star lf">性别</view>
			<view class="rg">
				<view class="sex" :class="{'on':female}" @tap="chooseFemale">女</view>
				<view class="sex" :class="{'on':male}" @tap="chooseMale">男</view>
			</view>
		</view>
		<view class="box">
			<view class="star lf">联系电话</view>
			<view class="rg">
				<input placeholder="请输入手机号" v-model="phone"/>
			</view>
		</view>
		<view class="box">
			<view class="star lf">身份证号</view>
			<view class="rg">
				<input placeholder="请输入身份证" v-model="idenNo"/>
			</view>
		</view>
		<view class="box">
			<view class="star lf">公司名称</view>
			<view class="rg">
				<input placeholder="请输入公司名称" v-model="company"/>
			</view>
		</view>
		<view class="box">
			<view class="star lf">公司地址</view>
			<view class="rg">
				<input placeholder="请输入公司地址" v-model="address"/>
			</view>
		</view>
		
		<view class="timepicker">
			<view class="star title">租期时长</view>
			<view class="choose">
				<view class="startDate">
					<picker mode="date" :start="startday" @change="startdateChange">
						<view>{{startDate}}</view>
					</picker>
				</view>
				<view>至</view>
				<view class="endDate">
					<picker mode="date" :start="endday" @change="enddateChange">
						<view>{{endDate}}</view>
					</picker>
				</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		<view class="confirm">
			<view class="tips">
				<view class="star">房屋合同事项确认</view>
				<image :src="[isContract?src[1]:src[0]]" @tap="conformToast"></image>
			</view>
			<view class="gray">请仔细阅读并确认租聘合同事项哦~<text @tap="toContract">点击查看合同</text></view>
		</view>
		
		<view class="submit-button" @tap="toNext">下一步</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			name:'',
			male:true,
			female:false,
			phone:'',
			idenNo:'',
			company:'',
			address:'',
			data:'',
			index:'',
			src:['/static/cut/no_selected.png','/static/cut/selected.png'],
			isContract:false,
			startDate:'请选择开始日期',
			endDate:'请选择结束日期',
			startday:'',
			endday:''
		}
	},
	onLoad(options){
		this.data = JSON.parse(options.data)
		console.log(this.data)
		this.index = options.index
	},
	methods:{
		chooseFemale(){
			this.male = false
			this.female = true
		},
		chooseMale(){
			this.male = true
			this.female = false
		},
		conformToast(){
			if(this.isContract == 0){
				uni.showToast({
					title:'请先阅读租聘合同再做确认',
					icon:'none'
				})
			}else{
				
			}
		},
		toContract(){
			uni.navigateTo({
				url:'/pages/house/housecontract?type=' + '金融'
			})
		},
		getCurrentDate(){
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			this.starday = year + '-' + month + '-' + day
			const endYear = year + 1
			this.endday = endYear + '-' + month + '-' + day
			console.log(this.endday)
			
		},
		startdateChange(e){
			this.startDate = e.target.value
		},
		enddateChange(e){
			this.endDate = e.target.value
		},
		toNext(){
			if(this.name==''){
				uni.showToast({
					title:'请输入姓名',
					icon:'none'
				})
				return
			}
			if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				uni.showToast({
					title:'请输入正确的手机号码',
					icon:'none'
				})
				return
			}
			if(this.idenNo==''){
				uni.showToast({
					title: '请输入身份证号码',
					icon:'none'
				})
				return
			}
			if(this.company == ''){
				uni.showToast({
					title:'请输入公司名称',
					icon:'none'
				})
				return
			}
			if(this.address == ''){
				uni.showToast({
					title:'请输入公司地址',
					'icon':'none'
				})
				return
			}
			let req = {}
			req.name = this.name	
			if(this.male==1){
				req.gender = 1
			}else{
				req.gender = 0
			}
			req.signingStartTime = this.startDate
			req.signingEndTime = this.endDate
			req.sellerId = this.data.releaseFinance.sellerId
			req.confirmContract = 1
			req.companyAddress = this.address
			req.identityCard = this.idenNo
			req.companyName = this.company
			req.telephone = this.phone
			req.specsId = this.data.specsList[this.index].id
			req.financeCode = this.data.releaseFinance.financeCode
			req.orderType = 1
			uni.navigateTo({
				url:'uploadimage?data=' + JSON.stringify(req)
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	margin-top: 20rpx;
	padding-bottom: 100rpx;
}
.timepicker{
	height:84rpx;
	background-color: #fff;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.title{
		padding-left:20rpx;
		width:300rpx;
	}
	.choose{
		display: flex;
		width:450rpx;
		justify-content:space-around;
		align-items: center;
		image{
			width:10rpx;
			height:20rpx;
		}
	}
}
.goodsInfo{
	height:220rpx;
	background-color: #fff;
	padding:30rpx;
	display: flex;
	image{
		width:160rpx;
		height:160rpx;
		border-radius:10rpx;
	}
	.container{
		display: flex;
		width:550rpx;
		margin-left: 10rpx;
		flex-direction: column;
		justify-content: space-between;
	}
}

.box{
	height:84rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #f2f2f2;
	.lf{
		margin-left: 20rpx;
	}
	.rg{
		margin-right: 20rpx;
		display: flex;
		input{
			text-align: right;
		}
		.sex{
			width:60rpx;
			height:36rpx;
			border:1rpx solid rgba(255,102,0,1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.on{
			background-color: #ff6600;
			color:#fff;
		}
	}
}
.sign{
	margin:20rpx 0;
}

.contract{
	height:208rpx;
	background-color: #fff;
}

.confirm{
	width:100%;
	height:208rpx;
	background-color: #fff;
	margin: 20rpx 0;
	padding: 0 20rpx;
	.tips{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height:82rpx;
		border-bottom: 1rpx solid #f2f2f2;
		image{
			width:28rpx;
			height:28rpx;
		}
	}
	.gray{
		margin-top: 39rpx;
		text{
			color:#FF6600;
		}
	}
}

</style>
