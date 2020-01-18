<template>
	<view class="">
		<view class="fix_top_box">
			<view class="top-Location" @tap="showMulLinkageThreePicker">
				<text>{{location}}</text><image class="drop-down" src="/static/cut/drop-down.png" mode=""></image>
			</view>
			<view class="top-search">
				<view>
					<image class="lf" src="/static/cut/ss.png" mode=""></image>
					<input type="text" value="" placeholder="请输入您的定位地址" />
				</view>
				<image class="rt" src="/static/cut/yy.png" mode=""></image>
			</view>
		</view>
		<view class="now_fixed">
			<view class="nf_left">当前定位：<text>{{location}}</text></view>
			<view class="nf_right"><image src="/static/cut/aim_icon.png" mode=""></image>重新定位</view>
		</view>
		<scroll-view scroll-y="true" class="address_scroll_box" >
			<view class="scroll_list">
				<view class="scroll_title">我的收获地址</view>
				<view class="scroll_item_box">
					<view @tap="chooseRecieveAddress(mine)" class="scroll_item" v-for="(mine,idx) in my_address" :key="idx">
						<view class="si_title">{{mine.receiverAddress}}</view>
						<view class="si_info">{{mine.receiverName}}<text>{{mine.receiverPhone}}</text></view>
					</view>
				</view>
				<view class="scroll_title">附近地址</view>
				<view class="scroll_item_box">
					<view class="scroll_item" @tap="chooseNearbyAddress(item)" v-for="(item,index) in near_address" :key="index">
						<view class="si_title">{{item.name}}</view>
						<view class="si_info">{{item.addr}}<text>{{item.phone}}</text></view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<mpvue-city-picker :second="second" :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
import {IndexModel} from '@/common/models/index.js'
const indexmodel = new IndexModel()
export default{
	data(){
		return{
			//地址参数
			second:false,
			cityPickerValueDefault: [0, 0, 1],
			themeColor:"#FF6600",
			pickerText: '',
			fixed_txt: '志联佳大厦',
			my_address: [
			],
			near_address: [
				
			],
			nearbyQuery:{
				ak:'HxzxzR81OgNB9Z1izacsQMeq4A9Ii0ck',
				output:'json',
				coordtype:'wgs84ll',
				location:'',
				extensions_poi:1
			}
		}
	},
	onLoad(options){
		this.pickerText = options.data
		this.getNearbyList()
		this.getReceiveAddress()
	},
	computed:{
		...mapState(['lat','lon','location'])
	},
	components: {
		mpvueCityPicker
	},
	methods:{
		...mapMutations(['getLat','getLon','setLocation']),
		getNearbyList(){
			this.nearbyQuery.location = this.lat + ',' + this.lon
			this.$jsonp('https://api.map.baidu.com/reverse_geocoding/v3/',this.nearbyQuery).then(json =>{
				this.near_address = json.result.pois
			})
		},
		getReceiveAddress(){
			indexmodel.getReceiveAddress(data=>{
				this.my_address = data
			})
		},
		// 三级联动选择
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show()
		},
		clicksearch () {
			uni.navigateTo({
				url: '/pages/HM-search/HM-search'
			});
		},	
		onConfirm(data){
			console.log(data);
			this.pickerText = data.label.split('-')[0];
			console.log(this.pickerText)
		},
		chooseRecieveAddress(value){
			let req = {}
			req.address = value.receiverCity + value.receiverDistrict + value.receiverAddress
			req.city = value.receiverCity
			req.ak = 'HxzxzR81OgNB9Z1izacsQMeq4A9Ii0ck'
			req.output = 'json'
			this.setLocation(value.receiverAddress)
			let that = this 
			this.$jsonp('http://api.map.baidu.com/geocoding/v3/',req).then(json =>{
				const {result:res} = json
				that.getLat(res.location.lat)
				that.getLon(res.location.lng)
				that.getNearbyList()
			})
		},
		chooseNearbyAddress(item){
			let req = {}
			req.address = item.addr
			req.ak = 'HxzxzR81OgNB9Z1izacsQMeq4A9Ii0ck'
			req.output = 'json'
			this.setLocation(item.name)
			let that = this
			this.$jsonp('http://api.map.baidu.com/geocoding/v3/',req).then(json =>{
				const {result:res} = json
				console.log(json)
				that.getLat(res.location.lat)
				that.getLon(res.location.lng)
				that.getNearbyList()
			})
		}
	}
}
</script>

<style scoped lang="scss">
	.fix_top_box{
		display: flex;
		align-items: center;
		padding:30rpx 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		.top-Location{
			max-width: 160rpx;
			color: #646464;
			display: flex;
			align-items: center;
			font-size:26rpx;
			text{
				max-width: 120rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.drop-down{
				width: 14rpx;
				height: 8rpx;
				margin:0 36rpx 0 18rpx;
			}
		}
		.top-search{
			flex: 1;
			// height: 64rpx;
			padding: 15rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color:#F6F6F6 ;
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				input{
					color: #B4B4B4;
					font-size: 26rpx;
				}
			}
			.lf{
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
			.rt{
				width: 20rpx;
				height: 30rpx;
			}
			text{
				font-size: 24rpx;
				color:#B4B4B4;
				padding-left: 10rpx;
			}	
		}
	}
	.now_fixed{
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		background: #fff;
		justify-content: space-between;
		align-items: center;
		border-top: 1rpx solid #DCDCDC;
		.nf_left{
			color: #A0A0A0;
			font-size: 26rpx;
			text{
				color: #3C3C3C;
				font-size: 28rpx;
			}
		}
		.nf_right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			image{
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
	.address_scroll_box{
		height: 75vh;
	}
	.scroll_list{
		.scroll_item_box{
			padding: 0 20rpx;
			background: #fff;
			box-sizing: border-box;			
		}
		.scroll_title{
			color: #A0A0A0;
			font-size: 24rpx;
			padding: 20rpx;
			background: #F2F2F2;
			box-sizing: border-box;
		}
		.scroll_item{
			padding: 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #EBEBEB;
			&:last-of-type{
				border-bottom: 0;
			}
			.si_title{
				color: #3C3C3C;
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			.si_info{
				color: #A0A0A0;
				font-size: 22rpx;
				text{
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
