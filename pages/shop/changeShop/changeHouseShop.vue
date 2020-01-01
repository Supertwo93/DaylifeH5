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
			
			<!-- 付款方式 -->
			<view class="pay_type_box">
				<view class="pro_title title gray star">付款方式</view>
				<view class="pay_item">
					<view class="pay_txt">押金</view>
					<picker @change="bindPickerChange" :range="depositArr">
						<view class="pay_right">
							<view>{{deposit}}</view>
							<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
						</view>
					</picker>
				</view>
				<view class="pay_item">
					<view class="pay_txt">月付</view>
					<view class="pay_right noborder">
						<view class="ipt_box"><input type="number" v-model="monthRent" placeholder="请输入租金"></view>
						<view class="ipt_box"><input type="number" v-model="monthServiceCharge" placeholder="请输入服务费"></view>
					</view>
				</view>
				<view class="pay_item">
					<view class="pay_txt">季付</view>
					<view class="pay_right noborder">
						<view class="ipt_box"><input type="number" v-model="seasonRent" placeholder="请输入租金"></view>
						<view class="ipt_box"><input type="number" v-model="seasonServiceCharge" placeholder="请输入服务费"></view>
					</view>
				</view>
				<view class="pay_item">
					<view class="pay_txt">半年付</view>
					<view class="pay_right noborder">
						<view class="ipt_box"><input type="number" v-model="halfRent" placeholder="请输入租金"></view>
						<view class="ipt_box"><input type="number" v-model="halfServiceCharge" placeholder="请输入服务费"></view>
					</view>
				</view>
				<view class="pay_item">
					<view class="pay_txt">年付</view>
					<view class="pay_right noborder">
						<view class="ipt_box"><input type="number" v-model="yearRent" placeholder="请输入租金"></view>
						<view class="ipt_box"><input type="number" v-model="yearServiceCharge" placeholder="请输入服务费"></view>
					</view>
				</view>
			</view>
			
			<!-- 物业交割信息 -->
			<view class="delivery_box">
				<view class="pro_title title gray star">物业交割信息</view>
				<view class="delivery_item">
					<view class="de_item">
						<text>水：</text>
						<input v-model="waterBegin" type="text" placeholder="请输入起始度">
					</view>
					<view class="de_item">
						<text>1m³/元：</text>
						<input type="text" v-model="waterPrice" placeholder="请输入价格">
					</view>
				</view>
				<view class="delivery_item">
					<view class="de_item">
						<text>电：</text>
						<input type="text" v-model="elecBegin" placeholder="请输入起始度">
					</view>
					<view class="de_item">
						<text>1kw·h/元：</text>
						<input type="text" v-model="elecPrice" placeholder="请输入价格">
					</view>
				</view>
				<view class="delivery_select" v-for="(item,index) in deliverySelect" :key="index">
					<view class="delivery_left">
						<picker @change="deliveryChange($event,index)" :range="deliveryArr">
							<view class="box">
								<view>{{item.name}}</view>
								<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
							</view>
						</picker>
						<view class="add_minus_box">
							<view class="minus_btn" @tap="minus(index)">-</view>
							<view class="num_txt">{{item.amount}}</view>
							<view class="add_btn" @tap="add(index)">+</view>
						</view>
					</view>
					<view class="delivery_right" v-if="item.isAdd != true" @tap="deliveryAdd(index)">
						<image src="/static/cut/user/add.png"></image>
						<view>添加</view>
					</view>
					<view class="delivery_right del" v-else @tap="deliveryDel(index)">
						<image src="/static/cut/user/del.png"></image>
						<view>删除</view>
					</view>
				</view>
			</view>
			
					<!-- 房屋信息 -->
			<view class="housing_info">
				<view class="pro_title title gray">房屋信息</view>
				<view class="housing_box">
					<view class="housing_item">
						<view class="housing_left">
							<text>面积：</text>
							<input v-model="houseArea" type="text" placeholder="请输入" />㎡
						</view>
						<view class="housing_right">
							<text>户型：</text>
							<picker @change="houseTypeChange" :range="houseTypeArr">
								<view class="house_select">
									<view>{{houseType}}</view>
									<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="housing_item">
						<view class="housing_left">
							<text>年代：</text>
							<input v-model="houseYear" type="text" placeholder="请输入" />
						</view>
						<view class="housing_right">
							<text>房号：</text>
							<input type="text" v-model="houseNumber" placeholder="请输入" />
						</view>
					</view>
					<view class="housing_item">
						<view class="housing_left">
							<text>总楼层数：</text>
							<input v-model="houseTotalFloor" type="text" placeholder="请输入" />
						</view>
						<view class="housing_right">
							<text>所在楼层：</text>
							<input v-model="houseFloor" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="housing_item single nopicker">
						<text>所在地区：</text>
						<view class="house_select" @tap="showMulLinkageThreePicker">
							<view>{{houseDistrict}}</view>
							<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="housing_item single nopicker" @tap="chooseAddress">
						<text>详细地址：</text>
						<view class="house_select">
							<view>{{houseAddress}}</view>
							<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="housing_item single">
						<text>可入住日期：</text>
						<picker @change="houseDateChange" mode="date" >
							<view class="house_select">
								<view>{{houseDate}}</view>
								<image src="/static/cut/rightIcon.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
					<view class="housing_item single">
						<text>签约时长：</text>
						<input v-model="houseSignRange" type="text" placeholder="请输入" />
					</view>
				</view>
			</view>
			
			<!-- 房屋标签 -->
			<view class="house_label_box">
				<view class="pro_title title gray">房屋标签（多选）</view>
				<view class="house_label_ul">
					<view class="label_item" :class="[item.is_select != 0?'active':'']" v-for="(item,index) in labelList" @tap="labelMultiple(index)" :key="index">{{item.name}}</view>
				</view>
				<view class="input_box">
					<input type="text" v-model="label_txt" disabled>
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
		
		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import {ProvideModel} from '@/common/models/provide.js'
	import {StoreModel} from '@/common/models/store.js'
	import {FinanceModel} from '@/common/models/finance.js'
	import {HouseModel} from '@/common/models/house.js'
	let financemodel = new FinanceModel()
	let provideModel=new ProvideModel()
	let storeModel = new StoreModel()
	const housemodel = new HouseModel()
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components:{
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				second:false,
				themeColor:"#FF6600",
				childClassList:[],
				newsList:[{
					title:'商品名称',
					must:true,
					place:"请输入商品标题",
					type:'text',
					val:''
				},{
					title:'商品价格',
					must:true,
					place:"请输入商品价格",
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
				rangeArry:[],
				detail:'',
				monthRent:'',
				monthServiceCharge:'',
				halfRent:'',
				halfServiceCharge:'',
				seasonRent:'',
				seasonServiceCharge:'',
				yearRent:'',
				yearServiceCharge:'',
				deposit: "请选择",
				depositArr: [],
				waterBegin:'',
				waterPrice:'',
				elecBegin:'',
				elecPrice:'',
				deliveryArr: [],
				deliverySelect: [
				],
				houseArea:'',
				houseType: "请选择",
				houseTypeArr: [],
				houseYear:'',
				houseNumber:'',
				houseTotalFloor:'',
				houseFloor:'',
				houseDistrict: '请选择',
				houseAddress: '请选择',
				houseDate: '请选择',
				houseSignRange:'',
				labelList: [
					{
						name: "短租房",
						is_select: 0
					},{
						name: "长租房",
						is_select: 0
					},{
						name: "近地铁",
						is_select: 0
					},{
						name: "免物业费",
						is_select: 0
					},{
						name: "家具齐全",
						is_select: 0
					},{
						name: "首次出租",
						is_select: 0
					},{
						name: "拎包入住",
						is_select: 0
					},{
						name: "智能锁",
						is_select: 0
					}
				],
				label_txt_arr: [],
				label_txt: '',
				label_select_arr: [],
				houseLatitude:'',
				houseLongitude:''
			};
		},
		onLoad(options) {
			this.id = options.id
			this.firstTypeId = options.type
			this.firstType = '房屋'
			this.getCateList()
			provideModel.queryRentType(data=>{
				this.depositArr = []
				for(let i of data){
					this.depositArr.push(i.housePayType)
				}
			})
			provideModel.queryHouseGoods({firsttypeId:1},data=>{
				this.deliveryArr = data
			})
			provideModel.queryHouseApartmentType({},(data)=>{
				this.houseTypeArr = []
				for(let i of data){
					this.houseTypeArr.push(i.houseApartmentName)
				}
			})
		},
		methods:{
			getCateList(){
				housemodel.getHouseList({houseId:this.id},data=>{
					this.data = data.houseList[0]
					this.secondType = this.data.secondTypeId
					provideModel.getSecondType({type:2,firstType:this.firstType},data=>{
						console.log(data)
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
					this.newsList[0].val = this.data.title;
					this.newsList[1].val = this.data.price;
					this.goodsId = this.data.id
					this.detail = this.data.survey
					this.imgList = this.data.picture.split(',')
					this.deposit = this.data.depositMode
					this.monthRent = this.data.paMonthly
					this.monthServiceCharge = this.data.monthServicecharge
					this.seasonRent = this.data.quarterlyPayment
					this.seasonServiceCharge = this.data.seasonServicecharge
					this.halfRent = this.data.halfPay
					this.halfServiceCharge = this.data.halfServicecharge
					this.yearRent = this.data.yearPay
					this.yearServiceCharge = this.data.yearServicecharge
					this.waterBegin = this.data.waterRise
					this.waterPrice = this.data.waterCost
					this.elecBegin = this.data.electricRise
					this.elecPrice = this.data.electricCost
					this.houseArea = this.data.squareMetre
					this.houseType = this.data.houseType
					this.houseYear = this.data.years
					this.houseNumber = this.data.houseCode
					this.houseTotalFloor = this.data.attribute
					this.houseFloor = this.data.floor
					this.houseDistrict = this.data.region
					this.houseAddress = this.data.address
					this.houseDate = this.data.checkTime
					this.houseSignRange = this.data.signing
					this.label_txt = this.data.label
					
					this.label_txt_arr = this.data.label.split(',')
					let labelarray = this.data.label.split(',')
					for(let i of labelarray){
						let n=0
						for(let j of this.labelList){
							n+=1
							if(i == j.name){
								j.is_select = 1
								this.label_select_arr.push(n)
								break
							}
						}
					}
					console.log(this.label_select_arr)
					for(let i in this.data.informationList){
						if(i==0){
							this.data.informationList[i].isAdd = false
						}else{
							this.data.informationList[i].isAdd = true
						}
					}
					this.deliverySelect = this.data.informationList
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
			bindPickerChange(e){
				this.deposit = this.depositArr[e.target.value];
			},
			backToLast(){
				uni.navigateBack({
					delta:1
				})
			},
			submitChange(){
				let req = {}
				req.id = this.data.id
				req.sellerId = this.data.sellerId
				req.servMain = 1
				req.servSon = this.secondType
				req.title = this.newsList[0].val
				req.price = this.newsList[1].val
				req.houseType = this.houseType
				req.sellerGroupId = this.cateIdList[this.cate_idx]
				if(this.deposit.startsWith('押一')){
					req.deposit = this.newsList[1].val
				}else if(this.deposit.startsWith('押二')){
					req.deposit = this.newsList[1].val * 2
				}else if(this.deposit.startsWith('无')){
					req.deposit = 0
				}
				req.depositMode = this.deposit
				req.paMonthly = this.monthRent
				req.monthServiceCharge = this.monthServiceCharge
				req.quarterlyPayment = this.seasonRent
				req.seasonServiceCharge = this.seasonServiceCharge
				req.halfPay = this.halfRent
				req.halfServiceCharge = this.halfServiceCharge
				req.yearPay = this.yearRent
				req.yearServiceCharge = this.yearServiceCharge
				req.waterRise = this.waterBegin
				req.waterCost = this.waterPrice
				req.electricRise = this.elecBegin
				req.electricCost = this.elecPrice
				req.squareMetre = this.houseArea
				req.years = this.houseYear
				req.houseCode = this.houseNumber
				req.attribute = this.houseTotalFloor
				req.floor = this.houseFloor
				req.region = this.houseDistrict
				req.address = this.houseAddress
				req.checkTime = this.houseDate
				req.signing = this.houseSignRange
				req.label = this.label_txt
				req.picture = this.imgList.join(',')
				req.survey = this.detail
				req.informationList = []
				req.latitude = this.data.latitude
				req.longitude = this.data.longitude
				for(let i of this.deliverySelect){
					if(i.name=='请选择'){
						continue
					}else{
						let obj = {}
						obj.name = i.name
						obj.amount = i.amount
						req.informationList.push(obj)
					}
				}
				req.informationList = JSON.stringify(req.informationList)
				housemodel.updateHouseGoods(req,data=>{
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
			onConfirm(data){
				console.log(data);
				this.houseDistrict = data.label;
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
			},
			deliveryChange(e,index){
				this.deliverySelect[index].name = this.deliveryArr[e.detail.value];
			},
			add(idx){
				this.deliverySelect[idx].amount++;
				if(this.deliverySelect[idx].amount > 99){
					this.deliverySelect[idx].amount = 99;
				}
			},
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			minus(idx){
				this.deliverySelect[idx].amount--;
				if(this.deliverySelect[idx].amount < 0){
					this.deliverySelect[idx].amount = 0;
				}
			},
			deliveryAdd(index){
				this.deliverySelect.push({
					name: "请选择",
					amount: 0,
					isAdd: true
				})
			},
			deliveryDel(index){
				this.deliverySelect.splice(index, 1);
			},
			houseDateChange(e){
				this.houseDate = e.detail.value;
			},
			houseTypeChange(e){
				this.houseType = this.houseTypeArr[e.target.value];
			},
			chooseAddress(){
				var that = this;
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
						that.houseAddress = res.name;
						that.houseLatitude = res.latitude
						that.houseLongitude = res.longitude
				    }
				});
			},
			labelMultiple(idx){
				console.log(this.label_select_arr)
				if(this.labelList[idx].is_select == 0){
					this.labelList[idx].is_select = 1;
					this.label_select_arr.push(idx);
					this.label_txt_arr.push(this.labelList[idx].name);
				}else{
					this.labelList[idx].is_select = 0;
					console.log(this.label_select_arr.indexOf(idx))
					if (this.label_select_arr.indexOf(idx) > -1) { 
						this.label_select_arr.splice(this.label_select_arr.indexOf(idx),1);
						this.label_txt_arr.splice(this.label_txt_arr.indexOf(this.labelList[idx].name),1);
					}
				}
				this.label_txt = this.label_txt_arr.join(',')
			},
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
	
	.pay_type_box{
		padding: 20rpx 20rpx 30rpx;
		background: #fff;
		margin-top: 15rpx;
		
		.pay_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.pay_txt{
				width: 140rpx;
			}
			picker{
				width: 100%;
			}
			.pay_right{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border:1px solid rgba(160,160,160,1);
				border-radius: 8rpx;
				padding: 20rpx;
				box-sizing: border-box;
				&.noborder{
					border: 0;
					padding: 0;
				}
				view{
					color: #B4B4B4;
					font-size: 26rpx;
				}
				image{
					display: block;
					width: 15rpx;
					height: 25rpx;
				}
				.ipt_box{
					width: 49%;
					border:1px solid rgba(160,160,160,1);
					border-radius: 8rpx;
					padding: 13rpx 20rpx;
					box-sizing: border-box;
					input{
						color: #B4B4B4;
						font-size: 26rpx;
					}
				}
			}
		}
	}
	.delivery_box{
		padding: 20rpx 20rpx 30rpx;
		background: #fff;
		margin-top: 15rpx;
		.delivery_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.de_item{
				width: 49%;
				border:1px solid rgba(160,160,160,1);
				border-radius:8rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #646464;
				font-size: 26rpx;
				padding: 13rpx 20rpx;
				input{
					color: #B4B4B4;
					font-size: 26rpx;
					max-width: 52%;
				}
			}
		}
		.delivery_select{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.delivery_left{
				width: 75%;
				height: 64rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border:1px solid rgba(160,160,160,1);
				border-radius:8rpx;
				picker{
					width: 60%;
				}
				.box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;
					image{
						display: block;
						width: 15rpx;
						height: 25rpx;
					}
				}
				.add_minus_box{
					width: 40%;
					height: 64rpx;
					border-left: 1px solid #A0A0A0;
					display: flex;
					justify-content: center;
					align-items: center;
					.minus_btn,.add_btn{
						width: 22rpx;
						height: 22rpx;
						line-height: 22rpx;
						text-align: center;
						font-size:30rpx;
						font-family:Source Han Sans CN;
						font-weight:bold;
						color:rgba(255,102,0,1);
					}
					.num_txt{
						height: 22rpx;
						line-height: 22rpx;
						font-size:26rpx;
						color:rgba(60,60,60,1);
						margin: 0 50rpx;
					}
				}
			}
			.delivery_right{
				width: 23%;
				height: 64rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:8rpx;
				font-size:30rpx;
				color:rgba(254,254,254,1);
				&.del{
					border:1px solid rgba(255,102,0,1);
					background: #fff;
					color: #FF6600;
				}
				image{
					display: block;
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.housing_info{
		padding: 20rpx 20rpx 30rpx;
		background: #fff;
		margin-top: 15rpx;
		.housing_box{
			.housing_item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 64rpx;
				margin-bottom: 20rpx;
				&.single{
					justify-content: flex-start;
					border:1px solid rgba(160,160,160,1);
					border-radius:8rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
					text{
						width: 26%;
					}
					picker{
						width: 71%;
					}
				}
				&.nopicker{
					.house_select{
						width: 71%;
					}
				}
				input{
					width: 46%;
					font-size: 26rpx;
					margin-right: 10rpx;
				}
				.housing_left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 0 20rpx;
					box-sizing: border-box;
					height: 64rpx;
					width: 46%;
					border:1px solid rgba(160,160,160,1);
					border-radius:8rpx;
				}
				.housing_right{
					width: 46%;
					height: 64rpx;
					display: flex;
					align-items: center;
					padding: 0 0 0 20rpx;
					box-sizing: border-box;
					border:1px solid rgba(160,160,160,1);
					border-radius:8rpx;
				}
				picker{
					width: 66%;
				}
				.house_select{
					display: flex;
					justify-content: space-between;
					align-items: center;
					view{
						width: 80%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size: 26rpx;
						color: #B4B4B4;
					}
					image{
						display: block;
						width: 15rpx;
						height: 25rpx;
					}
				}
			}
		}
	}
	
	.house_label_box{
		padding: 20rpx 20rpx 30rpx;
		background: #fff;
		margin-top: 15rpx;
		.house_label_ul{
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			.label_item{
				display: block;
				width: 140rpx;
				text-align: center;
				padding: 12rpx 0;
				border:1px solid rgba(200,200,200,1);
				border-radius:8rpx;
				color: #646464;
				margin: 0 20rpx 20rpx 0;
				&.active{
					color: #FF6600;
					border-color: #FE6600;
				}
			}
		}
		.input_box{
			padding: 15rpx 20rpx;
			box-sizing: border-box;
			border:1px solid rgba(160,160,160,1);
			border-radius:8rpx;
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			input{
				width: 100%;
				color: #3C3C3C;
				font-size: 26rpx;
			}
		}
	}
</style>
