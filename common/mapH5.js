export default{
	init:function (){
		const AK = "q2nw1v8HmXL5FS3V8LvedWjrPtEhzUey"
		const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak=" + AK +"&s=1&callback=onBMapCallback"
		return new Promise((resolve,reject)=>{
			//如果已加载直接返回
			if(typeof BMap !== "undefined"){
				resolve(BMap)
				return true
			}
			//百度异步加载回调处理
			window.onBMapCallback = function (){
				resolve(BMap)
			}
			let getCurrentCityName = function (){
				return new Promise(function(resolve,reject){
					let myCity = new BMap.LocalCity()
					myCity.get(function(result){
						resolve(result.name)
					})
				})
			}
			
			let scriptNode = document.createElement("script")
			scriptNode.setAttribute("type","text/javascript")
			scriptNode.setAttribute("src",BMap_URL)
			document.body.appendChild(scriptNode)
		})
	}
}