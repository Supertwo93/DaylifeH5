import { HTTP } from '../http.js'

class VipModel extends HTTP{
	
	getVipList(success){
	    let params = {
			method:"POST",
			url:"/app/memberCard/getList",
			success:success
		}
		this.request(params)
	}
	
	getSwiperImage(success){
		let data={position:'会员'}
	    let params = {
			method:"POST",
			url:"/app/banner/getList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getSellerInfo(data,success){
		let params = {
			method:"POST",
			url:'/app/seller/findSellerOneDetailed',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	applyFree(data,success){
		let params = {
			method:"POST",
			url:'/app/userMemberCard/userOpening',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	applyUserMember(data,success){
		let params = {
			method:"POST",
			url:'/app/userMemberCard/userOpeningByTenpay',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getMycardList(success){
		let params = {
			method:"POST",
			url:'/app/userMemberCard/getMemberCardListByUserId',
			success:success
		}
		this.request(params)
	}
	
	getCardDetail(data,success){
		let params = {
			method:"POST",
			url:'/app/memberCard/getOne',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//用户获取自己卡详情
	getUserCardDetail(data,success){
		let params = {
			method:"POST",
			url:'/app/userMemberCard/getMemberCard',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	deleteCard(data,success){
		let params = {
			method:"POST",
			url:'/app/userMemberCard/deleteByKey',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//商家查看已办理名单
	queryMemberList(data,success){
		let params = {
			method:"POST",
			url:'/app/userMemberCard/listHandleMemberCardUserMessage',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {VipModel} 