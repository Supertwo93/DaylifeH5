import { HTTP } from '../http.js'


class LoginModel extends HTTP{
 

 getOpenid(code,success){
	  let data={
			code :code
	  }
  	  let params = {
  		method:"POST",
		url:"/app/wechat/smallProgramAccessToken",
		data:data,
  		success:success
  	  }
    this.request(params)
  }
  
  getUserPhone(encryptedData,iv,sessionkey,success){
  	  let data={
  			encryptedData:encryptedData,
  			iv:iv,
  			sessionkey:sessionkey
  	  }
   	  let params = {
   		method:"POST",
  		url:"/app/wechat/getPhoneNumber",
  		data:data,
   		success:success
   	  }
     this.request(params)
   }
  
  getLogin(account,loginPassword,success){
	  let data={
			phone:account,
			loginPassword:loginPassword
	  }
  	  let params = {
  		method:"POST",
		url:"/app/appuser/login",
		data:data,
  		success:success
  	  }
    this.request(params)
  }
  getCodeLogin(account,yzm,refereeCode,success){
  	  let data={
  			phone:account,
  			yzm:yzm,
			refereeCode:refereeCode,
			registerOrigin:1
  	  }
  	  let params = {
  		method:"POST",
  		url:"/app/appuser/smsCodeLogin",
		data:data,
  		success:success
  	  }
    this.request(params)
  }
  getUpdatePassword(phone,yzm,loginPassword,success){
  	  let data={
  			phone:phone ,
  			yzm:yzm,
  			loginPassword:loginPassword
  	  }
  	  let params = {
  		method:"POST",
  		url:"/app/appuser/updateLoginPassword",
		data:data,
  		success:success
  	  }
    this.request(params)
  }
  getUpdatePhone(phone,yzm,success){
  	  let data={
  			phone:phone ,
  			yzm:yzm
  	  }
  	  let params = {
  		method:"POST",
  		url:"/app/appuser/updatePhone",
		data:data,
  		success:success
  	  }
    this.request(params)
  }
  
	
  getYzm(phone,messageType ,success){ 
	  let data={
		  phone:phone,
		  messageType:messageType 
	  }
	  let params = {
		method:"POST",
		url:"/app/mobileMessage/getYzm", 
		data:data,
		success:success
	  }
    this.request(params)
  }


}

export {LoginModel}