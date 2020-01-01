import { HTTP } from '../http.js'

class ProvideModel extends HTTP{
	getSecondType(data,success){
		let params = {
			method:"POST",
			url:"/app/secondtypeinfo/getListByNeedFirst",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getSwiperImage(data,success){
	    let params = {
			method:"POST",
			url:"/app/banner/getList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getItemList(data,success){
		let params = {
			method:'POST',
			url:'/app/goodss/getIndexList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getItemDetail(data,success){
		let params = {
			method:'POST',
			url:'/app/goodss/findOne',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	addCart(data,success){
		let params = {
			method:'POST',
			url:'/app/shCarts/addGoodsToCartList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//单个商品结算
	addOneTotal(data,success){
		let params = {
			method:'POST',
			url:'/app/shCarts/oneTotal',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//添加访问记录
	addVisitRecord(data,success){
		let params = {
			method:'POST',
			url:'/app/historyRecord/add',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//商家查看分组
	checkSellerGroup(success){
		let params = {
			method:'POST',
			url:'/app/sellerGroup/getListBySellerId',
			success:success
		}
		this.request(params)
	}
	
	//商家添加分组
	addSellerGroup(data,success){
		let params = {
			method:'POST',
			url:'/app/sellerGroup/add',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//商品发布
	addSellerGoods(data,success){
		let params = {
			method:'POST',
			url:'/app/goodss/add',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	// 查询房屋押金方式
	queryRentType(success){
		let params = {
			method:'POST',
			url:'/app/housePayType/getlistAll',
			success:success
		}
		this.request(params)
	}
	
	//查询房屋家具
	queryHouseGoods(data,success){
		let params = {
			method:'POST',
			url:'/app/house/queryHouseGoods',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询房屋户型
	queryHouseApartmentType(data,success){
		let params = {
			method:'POST',
			url:'/app/houseApartment/getlistAll',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//发布房屋
	addHouse(data,success){
		let params = {
			method:'POST',
			url:'/app/house/addHouse',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//发布金融
	addFinance(data,success){
		let params = {
			method:'POST',
			url:'/app/finance/addFinance',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {ProvideModel}