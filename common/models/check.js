import { HTTP } from '../http.js'

class CheckModel extends HTTP {
	
	getSignIn(success){
	  let params = {
		method:"POST",
		url:"/app/usersign/signIn",
		success:success
	  }
	  this.request(params)
	}
	
	getSignSelect(data,success){
	  let params = {
		method:"POST",
		url:"/app/usersign/signPageFind",
		data:data,
		success:success
	  }
	  this.request(params)
	}
	
	getUserInfo(success){
		let params = {
			method:"POST",
			url:"/app/appuser/getAppUser",
			success:success
		}
		this.request(params)
	}
}

export {CheckModel}