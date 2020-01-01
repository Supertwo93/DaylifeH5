<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收件人
				</view>
				<view class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
				</view>
				<picker @change="bindPickerChange" :value="index" :range="array">
				                       <view class="uni-input">{{arrayvalue}}</view>
				                   </picker>
				<view class="iconfont icon-dibudaohanglan-">
					
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					所在地区
				</view>
				<view class="input" @tap="chooseCity">
				{{receiverProvince}}
				{{receiverCity}}
				{{receiverDistrict}}
				</view>
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="row">
				<view class="nominal">
					详细地址
				</view>
				<view class="input">
					<textarea v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch">
					<switch color="#FF6600" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
			<view class="row" v-if="editType==1" @tap="del">
				<view class="del">
					删除收货地址
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {AddressModel} from '@/common/models/address.js'
	let addressModel=new AddressModel()
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				array: ['中国大陆+86', '香港+852', '澳门+853', '台湾+886'],
				index: 0,
				arrayvalue:86,
				editType:null,
				id:'',
				name:'',
				tel:'',
				detailed:'',
				isDefault:null,
				isselec:0,
				receiverProvince:'',
				receiverCity:'',
				receiverDistrict:'',
				cityPickerValue: [0, 0, 1],
				themeColor: '#000',
				region:{label:"请点击选择地址",value:[],cityCode:""}
			};
		},
		onLoad(e) {
			//获取传递过来的参数
			
			this.editType = e.type;
			if(e.type==1){
				uni.getStorage({
					key:'address',
					success: (e) => {
						this.id = e.data.receiverAddressId;
						this.name = e.data.receiverName;
						this.tel = e.data.receiverPhone;
						this.detailed = e.data.receiverAddress;
						this.isDefault = Number(e.data.setDefaultAddress) ? true :false;
						this.receiverProvince =e.data.receiverProvince
						this.receiverDistrict=e.data.receiverDistrict
						this.receiverCity=e.data.receiverCity
						//this.cityPickerValue = e.data.address.region.value;
						//this.region.label = e.data.receiverProvince+e.data.receiverDistrict+e.data.receiverCity;
					}
				})
			}
			
		},
		methods: {
			 bindPickerChange: function(e) {
			    //this.index = e.target.value
				this.arrayvalue=this.array[e.target.value].split("+")[1]
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
				console.log(e)
				let add=e.label.split("-")
				for(let i=0;i<add.length;i++){
					if(i==0){
						this.receiverProvince=add[i]  
					}else if(i==1){
						this.receiverCity=add[i]
					}else{
						this.receiverDistrict =add[i]
					}
				}
			},
			isDefaultChange(e){
				if(e.detail.value){
					this.isselec=1
				}else{
					this.isselec=0
				}
				//this.isDefault = e.detail.value;
			},
			del(){
				this.$api.tip({
					title: '删除提示',
					content: '你将删除这个收货地址',
					cb_confirm:()=>{
						addressModel.deleteAddr({receiverAddressId:this.id},(data)=>{
							uni.navigateBack();
						})
					},
					cb_cancel:()=>{
						
					}
				})				
			},
			save(){
				let data={"receiverProvince":this.receiverProvince,"receiverCity":this.receiverCity,"receiverDistrict":this.receiverDistrict,"receiverName":this.name,"receiverPhone":this.tel,"receiverAddress":this.detailed,"setDefaultAddress":this.isselec}
				// if(this.region.label=="请点击选择地址"){
				// 	let add=this.region.label.split("-")
				// 	for(let i=0;i<add.length;i++){
				// 		if(i==0){
				// 			data.receiverProvince=add[i]  
				// 		}else if(i==1){
				// 			data.receiverCity=add[i]
				// 		}else{
				// 			data.receiverDistrict =add[i]
				// 		}
				// 		//"address":{"region":this.region,"detailed":this.detailed}
				// 	}
				// }
				
				if(this.editType==1){
					data.receiverAddressId=this.id
				}
				if(!data.receiverName){
					this.$api.msg('请输入收件人姓名');
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.receiverPhone))){
					this.$api.msg('请填写正确手机号码');
					return ; 
				}
				if(!this.receiverProvince){
					this.$api.msg('请选择收件地址');
					return ;
				}
				if(!data.receiverAddress){
					this.$api.msg('请输入收件人详细地址');
					return ;
				}
				uni.showLoading({
					title:'正在提交'
				})
				
				addressModel.add(data,this.editType,(data)=>{
					uni.hideLoading();
					uni.navigateBack();
				})
				setTimeout(()=>{
					uni.setStorage({
						key:'saveAddress',
						data:data,
						success() {
							uni.hideLoading();
							//uni.navigateBack();
						}
					})
				},300)
				
				
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>
<style lang="scss">


.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		view{
			display: flex;
			align-items: center;
		}
		.row{
			width: 94%;
			
			margin: 0 3%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.input{
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.del{
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #FFF;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-bottom: solid 1upx #eee;
			}
		}
	}
	
</style>
