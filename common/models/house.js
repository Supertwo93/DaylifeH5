import { HTTP } from '../http.js'

class HouseModel extends HTTP {
	getHouseList(obj,success){

		let params = {
			method:"POST",
			url:"/app/house/queryHouse",
			data:obj,
			success:success
			}
		this.request(params)
	}
	getSwiperImage(success){
		let data={position:'房屋'}
	    let params = {
			method:"POST",
			url:"/app/banner/getList",
			data:data,
			success:success
		}
		this.request(params)
	}
	getHouseType(success){
		let params = {
			method:"POST",
			url:"/app/houseApartment/getlistAll",
			success:success
		}
		this.request(params)
	}
	getHouseSecondType(data,success){
		let params = {
			method:'POST',
			url:'/app/secondtypeinfo/getListByNeedFirst',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	addSigning(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/addSigning',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	checkSingingContract(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/queryContract',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	changeSingningStatus(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/addSigningContract',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	
	updateHouseGoods(data,success){
		let params = {
			method:'POST',
			url:'/app/house/updateHouse',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {HouseModel}