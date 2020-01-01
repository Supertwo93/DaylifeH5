import {HTTP} from '@/common/http.js'

class FinanceModel extends HTTP{
	getSwiperImage(success){
		let data={position:'金融'}
	    let params = {
			method:"POST",
			url:"/app/banner/getList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getFinanceList(data,success){
	    let params = {
			method:"POST",
			url:"/app/finance/queryFinanceHomePage",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getFinanceDetail(data,success){
		let params = {
			method:"POST",
			url:"/app/finance/queryFinanceParticulars",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	signFinance(data,success){
		let params = {
			method:"POST",
			url:"/app/FinancialContracts/addFinancialContracts",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	modifyFinancialOrders(data,success){
		let params = {
			method:"POST",
			url:"/app/FinancialContracts/modifyFinancialOrders",
			data:data,
			success:success
		}
		this.request(params)
	}
}



export {FinanceModel} 