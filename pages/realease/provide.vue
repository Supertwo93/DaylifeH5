<template>
	<view>
		<view class="page_bg"></view>
		<!-- 服务商子类 -->
		<view class="provide_box">
			<view class="pro_title gray star">服务商子类</view>
			<view class="pro_list">
				<view class="pro_item" @tap="selectDemandParent(index)" :class="[demand_parent_idx == index?'active':'']" v-for="(item,index) in provideItem" :key="index">{{item}}</view>
			</view>
		</view>
		
		<!-- 基本信息 -->
		<view class="graytitle">基本信息</view>
		
		<!-- 房屋发布 start -->
		<view v-if="firstTypeId==1" class="listItem">
			<view class="star">房屋名称</view>
			<input v-model="houseName" placeholder="请输入标题(26字内)"/>
		</view>
		<view v-if="firstTypeId==1" class="listItem">
			<view class="star">房屋租金</view>
			<input v-model="houseRent" placeholder="请输入"/>
		</view>
		<!-- 房屋发布 end -->
		
		<!-- 维修发布 start -->
		<view v-if="firstTypeId==9||firstTypeId==5||firstTypeId==3" class="listItem">
			<view class="star">服务名称</view>
			<input v-model="serviceName" placeholder="请输入标题(26字内)"/>
		</view>
		<view v-if="firstTypeId==5" class="listItem">
			<view class="star">服务价格</view>
			<input v-model="servicePrice" placeholder="请输入"/>
		</view>
		<view v-if="firstTypeId==9" class="listItem">
			<view class="star">上门费</view>
			<input v-model="fixFee" placeholder="请输入"/>
		</view>
		<!-- 维修发布 end -->
		
		<view v-if="firstTypeId==8||firstTypeId==10" class="listItem">
			<view class="star">商品名称</view>
			<input v-model="goodsName" placeholder="请输入标题(26字内)"/>
		</view>
		<view v-if="firstTypeId==8||firstTypeId==10" class="listItem">
			<view class="star">商品价格</view>
			<input v-model="goodsPrice" placeholder="请输入"/>
		</view>
		<view v-if="firstTypeId==8" class="listItem">
			<view class="star">配送费</view>
			<input v-model="goodsPost" placeholder="请输入"/>
		</view>
		
		<!-- 代购发布显示 start -->
		<view v-if="firstTypeId==10" class="listItem">
			<view class="star no">进口税费</view>
			<input v-model="importPrice" placeholder="0元则为免税费"/>
		</view>
		<!-- 代购发布 end -->
		
		<!-- 店铺内商品所属分类 -->
		<view class="category">
			<view class="top"><view class="title">店铺内商品所属分类</view></view>
			<view class="category start">
				<view class="gray">已有分类</view>
				<view class="buttons">
					<view v-for="(item,index) in cateList" :class="cate_idx == index?'active':''" :key="index" @tap="selectCate(index)">{{item}}</view>
				</view>
			</view>
			<view class="category">
				<view class="gray">新增分类</view>
				<view class="input">
					<input v-model='newCateName' placeholder="请输入分类名称(限4字内)"/>
					<view class="add" @tap="addCate">添加</view>
				</view>
			</view>
		</view>
		
		<!-- 家政发布 -->
		<view class="payTypeSetting" v-if="firstTypeId==3">
			<view class="star">收费设置</view>
			<view class="priceSetting">
				<view class="priceTop">
					<view class="settingTitle">价格类型</view>
					<block v-for="(item,index) in houseHoldPriceList" :key="index">
						<view @tap="choosePriceType(index)" :class="houseHoldPriceIndex===index?'on':''" class="label">{{item}}</view>
					</block>
				</view>
				<input v-model="houseHoldPrice" placeholder="请输入价格"/>
			</view>
		</view>
		
		<!-- 设置规格 -->
		<view v-if="firstTypeId==8||firstTypeId==10||firstTypeId==3||firstTypeId==9||(firstTypeId==5&&item=='财务代理')" class="size">
			<view class="top"><view class="title">设置规格</view></view>
			<setting-spec ref="specData"></setting-spec>
		</view>
		
		<!-- 房屋发布 start -->
		<!-- 付款方式 -->
		<view v-if="firstTypeId==1" class="pay_type_box">
			<view class="pro_title title gray star">付款方式</view>
			<view class="pay_item">
				<view class="pay_txt">押金</view>
				<picker @change="bindPickerChange" :range="depositArr">
					<view class="pay_right" @tap="pushDepositList">
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
		<view v-if="firstTypeId==1" class="delivery_box">
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
		<view class="housing_info" v-if="firstTypeId==1">
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
		<view class="house_label_box" v-if="firstTypeId==1">
			<view class="pro_title title gray">房屋标签（多选）</view>
			<view class="house_label_ul">
				<view class="label_item" :class="[item.is_select != 0?'active':'']" v-for="(item,index) in labelList" @tap="labelMultiple(index)" :key="index">{{item.name}}</view>
			</view>
			<view class="input_box">
				<input type="text" v-model="label_txt" disabled>
			</view>
		</view>
		<!-- 房屋发布 end -->
		
		
		
		<!-- 金融发布 start -->
		
		<!-- 委托方业务范围 -->
		<view v-if="firstTypeId==5&&item=='财务代理'" class="financeBox">
			<view class="star">委托业务范围</view>
			<view class="rangeSelect" v-for="(item,index) in rangeList" :key="index">
				<picker @change="rangeChange($event,index)" :range="rangeArry">
					<view class="box">
						<view>{{item.title}}</view>
						<image src="/static/cut/rightIcon.png"></image>
					</view>
				</picker>
				<view class="input">收费:<input v-model="item.fee" placeholder="请输入"/></view>
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
		
		<!-- 店铺内商品所属分类 -->
		<view class="loan" v-if="firstTypeId==5&&item=='小额贷款'">
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
		
		<!-- 金融发布 end -->
		
		<!-- 维修发布 start -->
		<view v-if="firstTypeId!=8&&firstTypeId!=10" class="remark_box">
			<view class="rel_title"><text v-if="firstTypeId!=5">服务详情</text><text v-if="firstTypeId==5">业务详情</text></view>
			<textarea v-model="detail" placeholder="可以简单介绍一下.." />
		</view>
		<!-- 维修发布 end -->
		
		<!-- 商品图片 -->
		<view class="grayButton">商品图片(注：第一张为主图，限6张)</view>
		<!-- <view class="uploadGoodsImg">
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
		</view> -->
		<upload-imgs :photos="goods_photos" @changes="goodsPhoto"></upload-imgs>
		
		<!-- 商品详情图 -->
		<view v-if="firstTypeId==100" class="grayButton">商品详情图(注：限6张)</view>
		<!-- <view class="uploadGoodsImg">
			<image src="/static/cut/user/uploadgoodsimg.png"></image>
		</view> -->
		<upload-imgs v-if="firstTypeId==100" :photos="goods_detail_photos" @changes="goodsPhoto1"></upload-imgs>
		
		<view class="bottom_place"></view>
		<button class="upload_btn noNumber" v-if="isCanUpload == 0" type="primary" @tap="submitUpload">确认上传</button>
		<button class="upload_btn" v-else type="primary">确认上传</button>
		
		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
import {mapState} from 'vuex'
import settingSpec from '@/components/settingSpec.vue'
import uploadImgs from '@/components/uploadImgs.vue'
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
import {ProvideModel} from '@/common/models/provide.js'
import {UserModel} from '@/common/models/user.js'
import {StoreModel} from '@/common/models/store.js'
const storemodel = new StoreModel()
const usermodel = new UserModel()
const providemodel = new ProvideModel()
export default{
	components:{
		settingSpec,
		uploadImgs,
		mpvueCityPicker
	},
	data(){
		return{
			fixFee:'',
			houseHoldPriceList:['一口价','小时费','月薪'],
			houseHoldPriceIndex:'',
			houseHoldPrice:'',
			userId:'',
			second:false,
			cityPickerValueDefault: [0, 0, 1],
			themeColor:"#FF6600",
			provideItem:[],
			item:'',
			demand_parent_idx: null,
			cateList: [],
			cateIdList:[],
			newCateName:'',
			cate_idx: null,
			firstTypeId:'',
			firstType:'',
			serviceName:'',
			servicePrice:'',
			quota:'',
			rate:'',
			limit:'',
			applyCondition:'',
			applyMain:'',
			applyMaterial:'',
			secondtypeinfoId:'',
			secondtypeinfoIdList:[],
			isCanUpload: 0,
			detail:'',
			goods_photos: [],
			goodsName:'',
			goodsPrice:'',
			goodsPost:'',
			goods_detail_photos: [],
			sellerId:'',
			monthRent:'',
			monthServiceCharge:'',
			halfRent:'',
			halfServiceCharge:'',
			seasonRent:'',
			seasonServiceCharge:'',
			yearRent:'',
			yearServiceCharge:'',
			waterBegin:'',
			waterPrice:'',
			elecBegin:'',
			elecPrice:'',
			houseArea:'',
			houseYear:'',
			houseNumber:'',
			houseTotalFloor:'',
			houseFloor:'',
			houseLatitude:'',
			houseLongitude:'',
			deposit: "请选择",
			depositArr: [],
			delivery: "请选择",
			deliveryArr: [],
			deliverySelect: [
				{
					name: "请选择",
					amount: 1,
					isAdd: false
				}
			],
			houseType: "请选择",
			houseTypeArr: [],
			houseDistrict: '请选择',
			houseAddress: '请选择',
			houseDate: '请选择',
			houseName:'',
			houseRent:'',
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
			label_select_arr: [],
			label_txt_arr: [],
			label_txt: '',
			rangeList:[
				{
					title: "请选择",
					fee: '',
					add: true
				}
			],
			rangeArry:[],
			selectIndex: 0,
			importPrice:''
		}
	},
	computed:{
		...mapState(['lat','lon'])
	},
	onLoad(){
		
	},
	onShow(){
		this.getCateList()
		new Promise((resolve)=>{
			usermodel.getInfo((data)=>{
				resolve(data)
			})
		}).then((data)=>{
			this.userId = data.appuserId
			this.sellerId = data.storeId
			return new Promise((resolve)=>{
				storemodel.getSellerStore({sellerId:this.sellerId},(data)=>{
					resolve(data)
				})
			}).then((data)=>{
				this.firstType = data.firstType
				this.firstTypeId = data.firstTypeId
				uni.setNavigationBarTitle({
					title:data.nickName
				})
				return new Promise((resolve)=>{
					providemodel.getSecondType({firstType:this.firstType,type:2},(data)=>{
						resolve(data)
					})
				}).then((data)=>{
					this.provideItem = []
					this.secondtypeinfoIdList = []
					for(let i of data){
						this.provideItem.push(i.title)
						this.secondtypeinfoIdList.push(i.secondtypeinfoId)
					}
					if(this.firstTypeId==1){
						return new Promise((resolve)=>{
							providemodel.queryRentType((data)=>{
								resolve(data)
							})
						}).then((data)=>{
							this.depositArr = []
							for(let i of data){
								this.depositArr.push(i.housePayType)
							}
							return new Promise((resolve)=>{
								providemodel.queryHouseGoods({firsttypeId:this.firstTypeId},(data)=>{
									resolve(data)
								})
							}).then((data)=>{
								this.deliveryArr = data
								return new Promise((resolve)=>{
									providemodel.queryHouseApartmentType({},(data)=>{
										resolve(data)
									})
								}).then(data=>{
									this.houseTypeArr = []
									for(let i of data){
										this.houseTypeArr.push(i.houseApartmentName)
									}
								})
							})
						})
					}else if(this.firstTypeId==5){
						return new Promise(resolve=>{
							providemodel.queryHouseGoods({firsttypeId:5},data=>{
								resolve(data)
							})
						}).then(data=>{
							this.rangeArry = data
						})
					}
				})
			})
		})
	},
	onReady(){
		
	},
	onHide(){
		
	},
	methods:{
		choosePriceType(index){
			this.houseHoldPriceIndex = index
		},
		goodsPhoto(e){
			this.goods_photos = e;
			console.log(this.goods_photos);
		},
		goodsPhoto1(e){
			this.goods_detail_photos = e;
			console.log(this.goods_detail_photos);
		},
		selectDemandParent(idx){
			this.demand_parent_idx = idx;
			this.item = this.provideItem[idx]
			this.secondtypeinfoId = this.secondtypeinfoIdList[idx]
			console.log(this.item)
			console.log(this.secondtypeinfoId)
		},
		selectCate(idx){
			this.cate_idx = idx;
		},
		bindPickerChange(e){
			this.deposit = this.depositArr[e.target.value];
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
		houseTypeChange(e){
			this.houseType = this.houseTypeArr[e.target.value];
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show()
		},
		onConfirm(data){
			console.log(data);
			this.houseDistrict = data.label;
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
		houseDateChange(e){
			this.houseDate = e.detail.value;
		},
		labelMultiple(idx){
			if(this.labelList[idx].is_select == 0){
				this.labelList[idx].is_select = 1;
				this.label_select_arr.push(idx);
				this.label_txt_arr.push(this.labelList[idx].name);
			}else{
				this.labelList[idx].is_select = 0;
				if (this.label_select_arr.indexOf(idx) > -1) { 
					this.label_select_arr.splice(this.label_select_arr.indexOf(idx),1);
					this.label_txt_arr.splice(this.label_txt_arr.indexOf(this.labelList[idx].name),1);
				}
			}
			let txt = '';
			for(let i in this.label_txt_arr){
				txt += this.label_txt_arr[i]+',';
			}
			this.label_txt = txt;
			console.log(this.label_txt_arr,this.label_select_arr);
		},
		rangeChange(e,index){
			this.rangeList[index].title = this.rangeArry[e.detail.value];
		},
		addRange(){
			this.rangeList.push({
				title: "请选择",
				fee: '',
				add: false
			})
		},
		deleteRange(index){
			this.rangeList.splice(index,1)
		},
		addCate(){
			if(this.newCateName===''){
				uni.showToast({
					title:'请输入新增分类名',
					icon:'none',
					duration:1500
				})
			}else{
				providemodel.addSellerGroup({name:this.newCateName},(data)=>{
					this.getCateList()
					this.newCateName = ''
				})
			}
			
		},
		getCateList(){
			providemodel.checkSellerGroup((data)=>{
				this.cateList = []
				this.cateIdList = []
				
				for(let i of data){
					this.cateList.push(i.name)
					this.cateIdList.push(i.id)
				}
			})
		},
		submitUpload(){
			if(this.firstTypeId==8){
				if(this.demand_parent_idx==null){
					uni.showToast({
						title:'请选择服务商子类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goodsName==''){
					uni.showToast({
						title:'请输入商品名称',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goodsPrice==''){
					uni.showToast({
						title:'请输入商品价格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goodsPost==''){
					uni.showToast({
						title:'请设置商品配送费',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.$refs.specData.specLists[0].image==''){
					uni.showToast({
						title:'请设置商品规格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.goods = {}
				req.goods.city = '深圳市'
				req.goods.goodsFirsttype = this.firstTypeId
				req.goods.goodsName = this.goodsName
				req.goods.goodsSecondtype = this.secondtypeinfoId
				req.goods.latitudeLongitude = '114.258072,22.727932'
				req.goods.price = this.goodsPrice
				req.goods.sellerGroupId = this.cateIdList[this.cate_idx]
				req.goods.sellerId = this.sellerId
				req.goods.postFee = this.goodsPost
				// req.goods.serviceScope = 60
				req.goodsDesc = {}
				req.goodsDesc.itemImages = this.goods_photos.join(',')
				req.itemList = this.$refs.specData.specLists
				for(let i of req.itemList){
					delete i.isAdd
				}
				let goodsJSON = JSON.stringify(req)
				providemodel.addSellerGoods({goodsJSON},(data)=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==10){
				if(this.demand_parent_idx==null){
					uni.showToast({
						title:'请选择服务商子类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goodsName==''){
					uni.showToast({
						title:'请输入商品名称',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goodsPrice==''){
					uni.showToast({
						title:'请输入商品价格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.$refs.specData.specLists[0].image==''){
					uni.showToast({
						title:'请设置商品规格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.goods = {}
				req.goods.goodsFirsttype = 10
				req.goods.goodsName = this.goodsName
				req.goods.goodsSecondtype = this.secondtypeinfoId
				req.goods.latitudeLongitude = this.lon + ',' + this.lat
				req.goods.importPrice = this.importPrice
				req.goods.price = this.goodsPrice
				req.goods.sellerGroupId = this.cateIdList[this.cate_idx]
				req.goods.sellerId = this.sellerId
				req.goods.normalPrice = ''
				req.goodsDesc = {}
				req.goodsDesc.itemImages = this.goods_photos.join(',')
				req.itemList = this.$refs.specData.specLists
				for(let i of req.itemList){
					delete i.isAdd
				}
				let goodsJSON = JSON.stringify(req)
				providemodel.addSellerGoods({goodsJSON},(data)=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==1){
				if(this.demand_parent_idx==null){
					uni.showToast({
						title:'请选择服务商子类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseName==''){
					uni.showToast({
						title:'请输入房屋名称',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseRent==''){
					uni.showToast({
						title:'请输入房屋租金',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.deposit=='请选择'){
					uni.showToast({
						title:'请选择押金方式',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.waterBegin==''){
					uni.showToast({
						title:'请设置水起始度',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.waterPrice==''){
					uni.showToast({
						title:'请设置水费单价',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.elecBegin==''){
					uni.showToast({
						title:'请设置电起始度',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.elecPrice==''){
					uni.showToast({
						title:'请设置电费单价',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.deliverySelect[0].name=='请选择'){
					uni.showToast({
						title:'请补充房屋家具信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseArea==''){
					uni.showToast({
						title:'请补充房屋面积信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseType=='请选择'){
					uni.showToast({
						title:'请补充房屋户型信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseYear==''){
					uni.showToast({
						title:'请补充房屋年份信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseNumber==''){
					uni.showToast({
						title:'请补充房屋门号信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseTotalFloor==''){
					uni.showToast({
						title:'请补充房屋总楼层信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseFloor==''){
					uni.showToast({
						title:'请补充房屋所在楼层信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseDistrict=='请选择'){
					uni.showToast({
						title:'请补充房屋所在地区信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseAddress=='请选择'){
					uni.showToast({
						title:'请补充房屋详细地址信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseDate=='请选择'){
					uni.showToast({
						title:'请设置房屋可入住日期',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.houseSignRange==''){
					uni.showToast({
						title:'请补充房屋签约时长信息',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.label_txt==''){
					uni.showToast({
						title:'请设置房屋标签',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.sellerId = this.sellerId
				req.servMain = this.firstTypeId
				req.servSon = this.secondtypeinfoId
				req.title = this.houseName
				req.price = this.houseRent
				req.houseType = this.houseType
				req.latitude = this.houseLatitude
				req.longitude = this.houseLongitude
				req.sellerGroupId = this.cateIdList[this.cate_idx]
				req.depositMode = this.deposit
				if(this.deposit.startsWith('押一')){
					req.deposit = this.houseRent
				}else if(this.deposit.startsWith('押二')){
					req.deposit = this.houseRent * 2
				}else if(this.deposit.startsWith('无')){
					req.deposit = 0
				}
				if(this.monthRent!=''){
					req.paMonthly = this.monthRent
				}
				if(this.monthServiceCharge!=''){
					req.monthServiceCharge = this.monthServiceCharge
				}
				if(this.seasonRent!=''){
					req.quarterlyPayment = this.seasonRent
				}
				if(this.seasonServiceCharge!=''){
					req.seasonServiceCharge = this.seasonServiceCharge
				}
				if(this.halfRent!=''){
					req.halfPay = this.halfRent
				}
				if(this.halfServiceCharge!=''){
					req.halfServiceCharge = this.halfServiceCharge
				}
				if(this.yearRent!=''){
					req.yearPay = this.yearRent
				}
				if(this.yearServiceCharge!=''){
					req.yearServiceCharge = this.yearServiceCharge
				}
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
				req.picture = this.goods_photos
				req.survey = this.detail
				req.informationList = []
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
				providemodel.addHouse(req,(data)=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==5&&this.item=='财务代理'){
				if(this.serviceName==''){
					uni.showToast({
						title:'请输入服务名称',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.servicePrice==''){
					uni.showToast({
						title:'请设置服务价格',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.$refs.specData.specLists[0].image==''){
					uni.showToast({
						title:'请设置商品规格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.rangeList[0].title=='请选择'){
					uni.showToast({
						title:'请选择委托业务范围',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.rangeList = []
				for(let i of this.rangeList){
					let rangeObj = {}
					rangeObj.rangePrice = i.fee
					rangeObj.rangeName = i.title
					req.rangeList.push(rangeObj)
				}
				req.releaseFinance = {}
				req.releaseFinance.details = this.detail
				req.releaseFinance.financeType = this.cateIdList[this.cate_idx]
				req.releaseFinance.firstTypeId = this.firstTypeId
				req.releaseFinance.latitude = '22.731142'
				req.releaseFinance.longitude = '114.269176'
				req.releaseFinance.picture = this.goods_photos.join(',')
				req.releaseFinance.price = this.servicePrice
				req.releaseFinance.secondTypeId = this.secondtypeinfoId
				req.releaseFinance.sellerId = this.sellerId
				req.releaseFinance.title = this.serviceName
				req.releaseFinance.userId = this.userId
				req.releaseFinance.sellerGroupId = this.cateIdList[this.cate_idx]
				req.specsList = []
				for(let i of this.$refs.specData.specLists){
					let obj = {}
					obj.specsPicture = i.image
					obj.specsName = i.spec
					obj.specsPrice = i.price
					req.specsList.push(obj)
				}
				let financeJSON = JSON.stringify(req)
				providemodel.addFinance({financeJSON },data=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==5&&this.item=='保险'){
				if(this.serviceName==''){
					uni.showToast({
						title:'请输入服务名称',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.servicePrice==''){
					uni.showToast({
						title:'请设置服务价格',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.releaseFinance = {}
				req.releaseFinance.latitude = "22.728393"
				req.releaseFinance.longitude = "114.258532"
				req.releaseFinance.firstTypeId = 5
				req.releaseFinance.picture = this.goods_photos.join(',')
				req.releaseFinance.price = this.servicePrice
				req.releaseFinance.title = this.serviceName
				req.releaseFinance.insuranceAmount = this.servicePrice
				req.releaseFinance.details = this.detail
				req.releaseFinance.secondTypeId = this.secondtypeinfoId
				req.releaseFinance.sellerId = this.sellerId
				req.releaseFinance.userId = this.userId
				req.releaseFinance.sellerGroupId = this.cateIdList[this.cate_idx]
				let financeJSON = JSON.stringify(req)
				providemodel.addFinance({financeJSON },data=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==5&&this.item=='小额贷款'){
				if(this.serviceName==''){
					uni.showToast({
						title:'请输入服务名称',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.servicePrice==''){
					uni.showToast({
						title:'请设置服务价格',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.releaseFinance = {}
				req.releaseFinance.latitude = "22.728393"
				req.releaseFinance.longitude = "114.258532"
				req.releaseFinance.applyCondition = this.applyCondition
				req.releaseFinance.applyMainpoints = this.applyMain
				req.releaseFinance.applyMaterial = this.applyMaterial
				req.releaseFinance.loanQuota = this.quota
				req.releaseFinance.loanRates = this.rate
				req.releaseFinance.loanTimelimit =this.limit
				req.releaseFinance.firstTypeId = 5
				req.releaseFinance.picture = this.goods_photos.join(',')
				req.releaseFinance.price = this.servicePrice
				req.releaseFinance.title = this.serviceName
				req.releaseFinance.details = this.detail
				req.releaseFinance.secondTypeId = this.secondtypeinfoId
				req.releaseFinance.sellerId = this.sellerId
				req.releaseFinance.userId = this.userId
				req.releaseFinance.sellerGroupId = this.cateIdList[this.cate_idx]
				let financeJSON = JSON.stringify(req)
				providemodel.addFinance({financeJSON },data=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==3){
				if(this.serviceName==''){
					uni.showToast({
						title:'请输入服务名称',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.houseHoldPrice==''){
					uni.showToast({
						title:'请设置收费价格',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.houseHoldPriceIndex ===''){
					uni.showToast({
						title:'请选择价格类型',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.$refs.specData.specLists[0].image==''){
					uni.showToast({
						title:'请设置商品规格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.goods = {}
				req.goods.latitudeLongitude = this.lat + ',' + this.lon
				req.goods.price = this.houseHoldPrice
				req.goods.goodsFirsttype = 3
				req.goods.caption = this.detail
				if(this.houseHoldPriceIndex==1){
					req.goods.chargeType = 31
				}else if(this.houseHoldPriceIndex==2){
					req.goods.chargeType = 32
				}else if(this.houseHoldPriceIndex==3){
					req.goods.chargeType = 33
				}
				req.goods.goodsName = this.serviceName
				req.goods.sellerGroupId = this.cateIdList[this.cate_idx]
				req.goods.sellerId = this.sellerId
				req.goods.goodsSecondtype = this.secondtypeinfoId
				req.goodsDesc = {}
				req.goodsDesc.itemImages = this.goods_photos.join(',')
				req.itemList = []
				for(let i of this.$refs.specData.specLists){
					let obj = {}
					obj.image = i.image
					obj.spec = i.spec
					obj.price = i.price
					req.itemList.push(obj)
				}
				console.log(req)
				let goodsJSON = JSON.stringify(req)
				providemodel.addSellerGoods({goodsJSON},(data)=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}else if(this.firstTypeId==9){
				if(this.demand_parent_idx==null){
					uni.showToast({
						title:'请选择服务商子类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.serviceName==''){
					uni.showToast({
						title:'请输入服务名称',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.fixFee==''){
					uni.showToast({
						title:'请设置上门费',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.cate_idx==null){
					uni.showToast({
						title:'请选择店铺商品分类',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.$refs.specData.specLists[0].image==''){
					uni.showToast({
						title:'请设置商品规格',
						duration:1500,
						icon:'none'
					})
					return
				}
				if(this.goods_photos.length==0){
					uni.showToast({
						title:'请上传商品图片',
						duration:1500,
						icon:'none'
					})
					return
				}
				let req = {}
				req.goods = {}
				req.goods.latitudeLongitude = this.lat + ',' + this.lon
				req.goods.price = this.fixFee
				req.goods.goodsFirsttype = 9
				req.goods.caption = this.detail
				req.goods.goodsName = this.serviceName
				req.goods.sellerGroupId = this.cateIdList[this.cate_idx]
				req.goods.sellerId = this.sellerId
				req.goods.goodsSecondtype = this.secondtypeinfoId
				req.goodsDesc = {}
				req.goodsDesc.itemImages = this.goods_photos.join(',')
				req.itemList = []
				for(let i of this.$refs.specData.specLists){
					let obj = {}
					obj.image = i.image
					obj.spec = i.spec
					obj.price = i.price
					req.itemList.push(obj)
				}
				let goodsJSON = JSON.stringify(req)
				providemodel.addSellerGoods({goodsJSON},(data)=>{
					uni.navigateTo({
						url:'/pages/realease/success'
					})
				})
			}
		}
	}
}
</script>

<style lang="scss">
	page{
		padding-bottom:100rpx;
	}
// .bottom_place{
// 	height: 100rpx;
// 	margin-top: 20rpx;
// }
.upload_btn{
	position: fixed;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	border-radius: 0;
	left: 0;
	bottom: 0;
	color: #fff;
	font-size: 34rpx;
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	.noNumber{
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		opacity:0.6;
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
		color: #1e1e1e;
		font-size: 26rpx;
		padding: 15rpx 20rpx;
	}
}
.pro_title{
	padding-left: 10rpx;
	position: relative;
	&.title{
		color: #3C3C3C;
		font-size: 26rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #E6E6E6;
		margin-bottom: 20rpx;
	}
}
.provide_box{
	background-color: #fff;
	margin-top: 20rpx;
	padding:30rpx 20rpx 0 20rpx;
	.pro_list{
		margin-top: 20rpx;
		display: flex;
		flex-wrap:wrap;
		.pro_item{
			margin-bottom: 20rpx;
			display: flex;
			align-items:center;
			justify-content: center;
			width:140rpx;
			// height:50rpx;
			padding: 12rpx 0;
			margin-right: 20rpx;
			border:1rpx solid rgba(200,200,200,1);
			border-radius:8rpx;
			font-size:24rpx;
			&.active{
				color: #FF6600;
				border-color: #FF6600;
			}
		}
	}
}

.listItem{
	background-color: #fff;
	padding-left:20rpx;
	display: flex;
	align-items: center;
	height:84rpx;
	border-bottom: 1rpx solid #f2f2f2;
	.star{
		width: 140rpx;
		// margin-right: 20rpx;
		padding-left: 10rpx;
	}
	input{
		color:#1e1e1e;
		font-size: 26rpx;
	}
}

.category{
	background-color: #fff;
	margin-top: 20rpx;
	padding:0 20rpx 20rpx 20rpx;
	.category{
		display: flex;
		margin-bottom: 20rpx;
		align-items: center;
		&.start{
			align-items: flex-start;
			.gray{
				margin-top: 10rpx;
			}
		}
		.gray{
			width:150rpx;
		}
		.buttons{
			display: flex;
			flex-wrap: wrap;
			width:540rpx;
			font-size: 24rpx;
			view{
				margin-right: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width:140rpx;
				// height:50rpx;
				padding: 12rpx 0;
				margin-bottom: 20rpx;
				border:1px solid rgba(200,200,200,1);
				border-radius:8rpx;
				&.active{
					color: #FF6600;
					border-color: #FF6600;
				}
			}
		}
		.input{
			display: flex;
			input{
				width:440rpx;
				height:64rpx;
				font-size: 26rpx;
				border:1px solid rgba(160,160,160,1);
				border-radius: 8rpx 0 0 8rpx;
				border-right: 0;
				padding-left: 10rpx;
			}
			.add{
				display: flex;
				align-items: center;
				justify-content: center;
				color:#fff;
				width:100rpx;
				height:64rpx;
				background:linear-gradient(180deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius: 0 8rpx 8rpx 0;
			}
		}
	}
}

.top{
	height:83rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1rpx solid #f2f2f2;
	.addOk{
		color: #FF6600;
		font-size:24rpx;
	}
}

.size{
	margin-top: 20rpx;
	background-color: #fff;
	padding:0 20rpx 60rpx;
}

.uploadGoodsImg{
	background-color: #fff;
	display: flex;
	padding:0 20rpx 30rpx 20rpx;
	flex-wrap: wrap;
	image{
		width:200rpx;
		height:200rpx;
		margin-top: 30rpx;
		margin-right: 30rpx;
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
					color: #1e1e1e;
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
				color: #1e1e1e;
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
				color:#1e1e1e;
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
				color:#1e1e1e;
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
			color: #1e1e1e;
			font-size: 26rpx;
		}
	}
}

.payTypeSetting{
	padding:0 20rpx;
	margin-top: 20rpx;
	height:328rpx;
	background-color: #fff;
	.star{
		height:84rpx;
		border-bottom: 1rpx solid #F2F2F2;
		display: flex;
		align-items: center;
	}
	.priceSetting{
		margin-top: 30rpx;
		height:50rpx;
		input{
			margin-left: 132rpx;
			margin-top: 40rpx;
			font-size: 26rpx;
			width:568rpx;
			height:64rpx;
			border:1rpx solid rgba(160,160,160,1);
			border-radius:8rpx;
			padding-left: 20rpx;
		}
		.priceTop{
			display: flex;
			align-items: center;
			.settingTitle{
				margin-right: 38rpx;
				font-size:24rpx;
				color:rgba(160,160,160,1);
			}
			.label{
				margin-right: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width:140rpx;
				height:50rpx;
				border:1rpx solid rgba(200,200,200,1);
				border-radius:8rpx;
				&.on{
					border:1px solid rgba(255,102,0,1);
					color:#FE6600;
				}
			}
		}
		
	}
	
}

input{
	color:#1e1e1e;
}
</style>
