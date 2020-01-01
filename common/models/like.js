import { HTTP } from '../http.js'


class LikeModel extends HTTP{
 
  like(goodsId,firsttypeId,type,success){ //商品收藏
	  console.log(type)
	  let url = type ? '/app/collectGoods/add' : '/app/collectGoods/deleteOne'
	  let data={goodsId:goodsId,firsttypeId:firsttypeId}
  	  let params = {
  		method:"POST",
  		url:url, 
		data:data,
  		success:success
  	  }
    this.request(params)
  }

  likeShop(sellerId,type,success){ //收藏店铺
    let url = type ? '/app/collectSeller/add' : '/app/collectSeller/deleteOne'
    let data={sellerId:sellerId}
	  let params = {
		method:"POST",
		url:url, 
		data:data,
		success:success
	  }
    this.request(params)
  }
  
  likeCard(cardId,success){ //收藏会员卡
    let data={cardId:cardId}
	  let params = {
		method:"POST",
		url:'/app/collectCard/add', 
		data:data,
		success:success
	  }
    this.request(params)
  }
  
  deleteCard(cardId,success){ //取消收藏会员卡
    let data={cardId:cardId}
  	  let params = {
  		method:"POST",
  		url:'/app/collectCard/deleteByKey', 
  		data:data,
  		success:success
  	  }
    this.request(params)
  }
  
  getCollectgood(pageNo,success){ //查看自己的收藏的商品
    let data={pageNo:pageNo,pageSize:10}
  	  let params = {
  		method:"POST",
  		url:"/app/collectGoods/getCollect", 
  		data:data,
  		success:success
  	  }
    this.request(params)
  }
  
  getCollectshop(pageNo,success){ //查看收藏店铺
    let data={pageNo:pageNo,pageSize:10}
  	  let params = {
  		method:"POST",
  		url:"/app/collectSeller/getCollect", 
  		data:data,
  		success:success
  	  }
    this.request(params)
  }
  
  getCollectcard(pageNo,success){ //查看收藏会员卡
    let data={pageNo:pageNo,pageSize:10}
  	  let params = {
  		method:"POST",
  		url:"/app/collectCard/getIndexList", 
  		data:data,
  		success:success
  	  }
    this.request(params)
  }

  getoneCollectcard(id,success){ //查看单个收藏会员卡
    let data={id:id}
  	  let params = {
  		method:"POST",
  		url:"/app/collectCard/select", 
  		data:data,
  		success:success
  	  }
    this.request(params)
  }

}

export {LikeModel}