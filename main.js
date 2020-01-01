import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false

App.mpType = 'app'

const msg = (title, duration=1500, mask=false, icon='none')=>{ 
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

 const tip = (params) => {
    console.log(params)
    var that = this;
    var title = params.hasOwnProperty('title') ? params['title'] : '提示';
    var content = params.hasOwnProperty('content') ? params['content'] : '';
    wx.showModal({
      title: title,
      content: content,
	  confirmColor:"#FF6600",
	 // showCancel: false,  去掉取消
      success: function(res) {
        if (res.confirm) { //点击确定
          if (params.hasOwnProperty('cb_confirm') && typeof(params.cb_confirm) == "function") {
            params.cb_confirm();
          }
        } else { //点击否
          if (params.hasOwnProperty('cb_cancel') && typeof(params.cb_cancel) == "function") {
            params.cb_cancel();
          }
        }
      }
    })
  }




Vue.prototype.$api = {msg,tip};
Vue.prototype.$store = store;
const app = new Vue({
    ...App
})
app.$mount()
