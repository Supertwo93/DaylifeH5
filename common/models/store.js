import { HTTP } from '../http.js'

class StoreModel extends HTTP {
	
	getSellerInfo(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/findSellerOneDetailed',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getShopGoods(data,success){
		let params = {
			method:"POST",
			url:'/app/sellerGroup/getUserSellerIdGoodsBySellerId',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	sellerGetShopGoods(data,success){
		let params = {
			method:"POST",
			url:'/app/sellerGroup/getListBySellerIdGoods',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	// 商家查看店铺信息
	
	getSellerStore(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/findOneDetailed',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	// 商家修改店铺信息
	editStore(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/alterStore',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//修改商品信息
	editGoods(data,success){
		let params = {
			method:"POST",
			url:'/app/goodss/updateGoods',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//修改金融商品信息
	editFinanceGoods(data,success){
		let params = {
			method:"POST",
			url:'/app/finance/updateFinance',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {StoreModel}