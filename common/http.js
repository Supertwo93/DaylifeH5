import { config } from '@/common/config.js'

import store from '@/store/index.js'

class HTTP {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params) {
    var that = this
    var url = this.baseRestUrl + params.url //+"&temp=" + Math.random();

    if (!params.method) {
      params.method = 'GET';
    }
    uni.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type':'application/x-www-form-urlencoded',
	    'token':store.state.uerInfo.token||''
		// #ifdef MP
		// 'appkey':config.appkey
		// #endif
       
      },
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
       // var code = res.statusCode.toString();
	  // console.log(JSON.stringify(res)+"ppp")
	   var res=res.data;
        var startChar = res.resultCode;
		
        if (startChar == 1) {
          params.success && params.success(res.data);
        }else if(startChar == 1000){
			store.commit('logout')
		}else {
			uni.showToast({
				title:res.message,
				icon:'none'
			})
          params.error && params.error(res);
        }
      },
      fail: function (err) {
        params.fail && params.fail(err)
      }
    });
  }
};

export { HTTP };