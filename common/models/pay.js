import { HTTP } from '../http.js'


class PayModel extends HTTP{



 tenpayPayOrder(obj,num){
 	  let params={
 		  method:"POST",
 		  url:"/app/wechat/wechatSPPay",
 		  data:obj,
 		  success:(res)=>{
			  uni.requestPayment({
			  		provider: 'wxpay',
			  		timeStamp: res.timeStamp, //时间戳从1970年1月1日至今的秒数，即当前的时间
			  		nonceStr: res.nonceStr, //随机字符串，长度为32个字符以下。
			  		package: res.package, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
			  		signType: "MD5",      //签名算法，暂支持 MD5。
			  		paySign: res.paySign, //签名，具体签名方案参见 微信小程序支付文档
			  		success: function(res) {
						console.log(res)
			  			uni.navigateTo({
			  				url:'/pages/success/success?type=' + 3
			  			})
			  		},
			  		fail:(err)=> {
						uni.showToast({
							title:'您已取消支付，请尽快完成支付',
							duration:2000,
							icon:'none'
						})
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/order/order?index=' + 1
							})
						},2000)
						
			  		}
			  });
		  }
 	  }
 	  this.request(params)
}
	
	housePay(data,success){
		let params = {
			method:'POST',
			url:'/app/payment/tenpayOrAliOrSPPayOrder',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	aliPayOrder(data){
		let params = {
			method:'POST',
			url:'/app/pay/wxPayOrAliPayOrder',
			data:data,
			success:(orderInfo)=>{
				uni.requestPayment({
					provider: 'alipay',
					orderInfo:orderInfo,
					success: function(res) {
						console.log(res)
						uni.navigateTo({
							url:'/pages/success/success?type=' + 3
						})
					},
					fail:(err)=> {
						uni.showToast({
							title:'您已取消支付，请尽快完成支付',
							duration:2000,
							icon:'none'
						})
						setTimeout(function(){
							uni.reLaunch({
								url:'/pages/order/order?index=' + 1
							})
						},2000)
									
					}
				});
			}
		}
		this.request(params)
	}
 
	webPay(data,success,fail){
		let params = {
			method:'POST',
			url:'/app/web/webRechargeNoSendByWechat',
			data:data,
			success,
			fail
		}
		this.request(params)
	}

	

}

export {PayModel}