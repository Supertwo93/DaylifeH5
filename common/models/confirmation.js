import { HTTP } from '../http.js'


class ConfirmationModel extends HTTP{


  addOneGoodsToOrder(obj,success){ //单个商品下单
	  let params={
		  method:"POST",
		  url:"/app/goodsOrder/addOneGoodsToOrder",
		  data:obj,
		  success:success
	  }
	  this.request(params)
  }	
  addCartToOrder(obj,success){ 
  	  console.log(obj)
  	  let params={
  		  method:"POST",
  		  url:"/app/goodsOrder/addCartToOrder",
  		  data:obj,
  		  success:success
  	  }
  	  this.request(params)
  }	
 tenpayPayOrder(obj,success){
 	  let params={
 		  method:"POST",
 		  url:"/app/wechat/wechatSPPay",
 		  data:obj,
 		  success:success
 	  }
 	  this.request(params)
 }	
 
	addPayOrder(data,success){
		let params={
			method:"POST",
			url:"/app/goodsOrder/addPayOrder",
			data:data,
			success:success
		}
		this.request(params)
	}


	

}

export {ConfirmationModel}