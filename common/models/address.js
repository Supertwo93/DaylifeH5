import { HTTP } from '../http.js'


class AddressModel extends HTTP{
  data="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzE0NzEyMzQsInVzZXJuYW1lIjoiZTNhZTgwYjI4OTFjNDVhNDlkMTI3NjAxYzgzY2YxNzAifQ.WugSgSirjyL1DdtG2e9vrNaDWqpeHvfpD6IfEMD4HjU"
	  


  add(data,type,success){ //添加地址
  console.log(type)
  let url = type==1 ? '/app/receiveraddress/alterAddr' : '/app/receiveraddress/add'
  
	  data.token=this.data
  	  let params = {
  		method:"POST",
  		url:url+"?"+this.jsonparams(data), 
  		success:success
  	  }
    this.request(params)
  }
  getByUserIdAddr(success){ 
  	  let params = {
  		method:"POST",
  		url:"/app/receiveraddress/getByUserIdAddr?token="+this.data, 
  		success:success
  	  }
    this.request(params)
  }

 deleteAddr(data,success){ 
	  data.token=this.data
  	  let params = {
  		method:"POST",
  		url:"/app/receiveraddress/deleteAddr?"+this.jsonparams(data), 
  		success:success
  	  }
    this.request(params)
  }




  jsonparams (obj) {
  	   var str = [];
  	      for (var p in obj) {
  	          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  	      }
  	      return str.join("&");
  }	

}

export {AddressModel}