import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		uerInfo: {},  
		hasLogin: false,
		myScore: 0,
		signCount: 0,
		lat:0,
		lon:0
	}, 
	mutations:{
		// 签到积分+10
		myScoreAdd(state){
			state.myScore += 10
		},
		// 计算每累计签到7天 额外多获得10积分
		signCountAdd(state){
			state.signCount++;
			state.myScore = state.myScore + (10+state.signCount*10);
		},
		// 连续签到次数中断
		signCountZero(state){
			state.signCount = 0
		},
		//改变登录状态  
		login(state, provider) {
			console.log(provider)
			state.hasLogin = true  
			state.uerInfo=provider	
			uni.setStorage({//将用户信息保存在本地  
				key: 'uerInfo',  
				data: provider,
				success: function (res) {
				console.log(res);
				}
			})  
			console.log(state.uerInfo.token);
		},  
		setTest(state,t){
			console.log(t)
			if(t[1]==1){
				state.uerInfo.nickname=t[0]
			}else if(t[1]==2){
				state.uerInfo.sex=t[0]
			}else if(t[1]==3){
				state.uerInfo.email=t[0]
			}else if(t[1]==4){
				state.uerInfo.logoImg=t[0]
			}
		},
		logout(state) {//退出登录  
			state.hasLogin = false  
			state.uerInfo = {}  
			uni.removeStorage({  
				key: 'uerInfo'  
			})  
			uni.removeStorageSync('sessionkey');
		},
		getLat(state,latitude){
			state.lat= latitude
		},
		getLon(state,longitude){
			state.lon = longitude
		}
	}
})
