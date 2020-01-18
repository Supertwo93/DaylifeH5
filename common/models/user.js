import { HTTP } from '../http.js'


class UserModel extends HTTP{

	// 修改用户信息
	updateInfo(name,t,sCallback){
		let data={}
		if(t==1){
			data.nickname=name
		}else if(t==2){
			data.sex=name
		}else if(t==3){
			data.email=name
		}else if(t==4){
			data.logoImg=name
		}
		this.request({
			method:"POST",	
			url:'/app/appuser/updateInfo',
			data:data,
			success:(data)=>{
				// // 如果不用箭头函数，this将指代不正确
				console.log(data)
				sCallback(data)
				}
			})	 
		}
	// 查询用户信息
	getInfo(success){
		let params = {
			method:"POST",	
			url:'/app/appuser/getAppUser',
			success: success
		}
		this.request(params)
	}

	// 用户提现
	userWithdraw(data,success){
		let params = {
			method:'POST',
			url:'/app/withdraw/add',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	// 用户微信充值
	userRecharge(data,success){
		let params = {
			method:'POST',
			url:'/app/wechat/wechatSPPayNoSend',
			data:data,
			success:success
		}
		this.request(params)
	}
  
	getLogout(success){
		let params = {
			method:"POST",
			url:"/app/appuser/quit",
			success:success
		}
		this.request(params)
	}
	
	
	deleteVisitRecord(data,success){
		let params = {
			method:'POST',
			url:'/app/historyRecord/cleanMultiple',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询用户评论
	
	getUserComment(success){
		let params = {
			method:"POST",
			url:'/app/goodComment/getByUserId',
			success:success
		}
		this.request(params)
	}
	
	//用户删除评论
	
	deleteUserComment(data,success){
		let params = {
			method:"POST",
			url:'/app/goodComment/delete',
			data:data,
			success:success
		}
		this.request(params)
	}
   
   // 用户积分流水
   getStoreflow(pageNo,success){
     let data={pageNo:pageNo,pageSize:10}
   	  let params = {
   		method:"POST",
   		url:"/app/userstoreflow/getList", 
   		data:data,
   		success:success
   	  }
     this.request(params)
   }
   
   // 积分兑换余额
   storeExchange(data,success){
   	let params = {
   		method:'POST',
   		url:'/app/userstoreflow/storeExchanged',
   		data:data,
   		success:success
   	}
   	this.request(params)
   }


	//领取优惠券列表
    getCouponList(data,success){
		let params = {
			method:'POST',
			url:'/app/coupon/getList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询用户优惠券
	getMyCouponList(data,success){
		let params = {
			method:'POST',
			url:'/app/couponreceive/getList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//领取优惠券
	receiveCoupon(data,success){
		let params = {
			method:'POST',
			url:'/app/couponreceive/receive',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查看我的合同
	queryContractDetails(success){
		let params = {
			method:'POST',
			url:'/app/signing/queryContractDetails',
			success:success
		}
		this.request(params)
	}
	
	//查看账单详情
	queryBillDetails(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/queryPayment',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//提交个人认证
	personalCer(data,success){
		let params = {
			method:'POST',
			url:'/app/appuser/personalCer',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//店铺入驻
	openStore(data,success){
		let params = {
			method:'POST',
			url:'/app/seller/userOpeningStore',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查看自己店铺信息
	checkStoreInfo(data,success){
		let params = {
			method:'POST',
			url:'/app/seller/findOne',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//开店
	openShop(data,success){
		let params = {
			method:'POST',
			url:'/app/seller/cancelCloseDate',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//关店
	closeShop(data,success){
		let params = {
			method:'POST',
			url:'/app/seller/setCloseDate',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	// 查看访问记录
	checkVisitRecord(data,success){
		let params = {
			method:'POST',
			url:'/app/historyRecord/getList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//取消退租
	cancelBackHouse(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/cancel',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询账单
	queryBill(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/queryPayment',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询续约信息
	queryRerentInfo(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/queryRenewContract',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询金融续约信息
	queryResignInfo(data,success){
		let params = {
			method:'POST',
			url:'/app/FinancialContracts/queryChangeContract',
			data:data,
			success:success
		}
		this.request(params)
	}
	//查询费用名称
	getCostName(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/queryCostName',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询账单接收人
	getBillReceive(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/queryTenant',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//发送账单
	sendBill(data,success){
		let params = {
			method:'POST',
			url:'/app/signing/addPayment',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//搜索同事
	searchColleague(data,success){
		let params = {
			method:'POST',
			url:'/app/colleague/searchList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//添加好友
	addColleague(data,success){
		let params = {
			method:'POST',
			url:'/app/addcolleaguemessage/add',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//查询同事列表
	queryColleagueList(data,success){
		let params = {
			method:'POST',
			url:'/app/addcolleaguemessage/getList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getUserCashFlow(data,success){
		let params = {
			method:'POST',
			url:'/app/usercashflow/getList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getQRCode(data,success){
		let params = {
			method:'POST',
			url:'/app/userMemberCard/getQRCode',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	checkFlowList(data,success){
		let params = {
			method:'POST',
			url:'/app/memberCardConsumeFlow/list',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	checkFlowDetail(data,success){
		let params = {
			method:'POST',
			url:'/app/memberCardConsumeFlow/getById',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	checkPointFlow(data,success){
		let params = {
			method:'POST',
			url:'/app/memberCardPointsFlow/list',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getChargeActivity(data,success){
		let params = {
			method:'POST',
			url:'/app/memberCardRechargeActivity/list',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	cardRecharge(data,success){
		let params = {
			method:'POST',
			url:'/app/userMemberCard/rechargeByTenpayAlipay',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	
	personalCerAndOpeningStore(data,success){
		let params = {
			method:'POST',
			url:'/app/appuser/personalCerAndOpeningStore',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	companyCerAndOpeningStore(data,success){
		let params = {
			method:'POST',
			url:'/app/appuser/companyCerAndOpeningStore',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	
	createQrcode(data,success){
		let params = {
			method:'POST',
			url:'/app/business/createCollectionQRCode',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getReceiptRecord(data,success){
		let params = {
			method:'POST',
			url:'/app/business/queryReceiptRecord',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {UserModel}