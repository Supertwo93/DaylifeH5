import { HTTP } from '../http.js'


class GoodsModel extends HTTP{



  getDetails(goodsId,success){
	  let data={goodsId:goodsId}
  	  let params = {
  		method:"POST",
  		url:"/app/goodss/findOne", 
  		success:success,
		data:data,
  	  }
    this.request(params)
  }

  getComment(goodsId,success){ 
	  let params = {
		method:"POST",
		url:"/app/goodComment/getByGoodsId", 
		data:{
			goodsId :goodsId,
			pageNo:1,
			pageSize:10
		},
		success:success
	  }
    this.request(params)
  }
  getCart(obj,success){ //加入购物车
	  console.log(obj)
	  let params={
		  method:"POST",
		  url:"/app/shCarts/addGoodsToCartList",
		  data:obj,
		  success:success
	  }
	  this.request(params)
  }	
 
	oneTotal(obj,success){ 
		  console.log(obj)
		  let params={
			  method:"POST",
			  url:"/app/shCarts/oneTotal",
			  data:obj,
			  success:success
		  }
		  this.request(params)
	}	
	 findOneDetailed(obj,success){
	 	  let params={
	 		  method:"POST",
	 		  url:"/app/seller/findOneDetailed",
	 		  data:obj,
	 		  success:success
	 	  }
	 	  this.request(params)
	 }	
	 
	findGoodsDetails(data,success,fail){
		let params={
			method:"POST",
			url:"/app/goodsDesc/findOne",
			data,
			success,
			fail
		}
		this.request(params)
	}
	

}

export {GoodsModel}