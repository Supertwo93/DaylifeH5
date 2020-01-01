<template>
	<view>
		<view>
			<rich-text :nodes="data"></rich-text>
		</view>
	</view>
</template>

<script>
	import {HouseModel} from '@/common/models/house.js'
	const housemodel = new HouseModel()
	export default{
		data(){
			return{
				data:''
			}
		},
		onLoad(options){
			this.data = JSON.parse(options.data)
			if(this.data.firsttypeId==1){
				let that = this
				let req = {}
				req.releaseId = this.data.releaseId
				req.orderCode = this.data.orderCode
				req.contractCode = this.data.contractCode
				req.type = 1
				uni.request({
					url:'https://sgz.wdttsh.com/app/signing/queryContract',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded'		 
					},
					success(res){
						that.data = res.data.substring(res.data.indexOf('<div'),res.data.indexOf('</div>'))
					}
				})
			}else{
				console.log(this.data);
				let that = this
				let req = {}
				req.financeCode = this.data.financeCode
				req.type = 1
				req.orderCode = this.data.orderCode
				uni.request({
					url:'https://sgz.wdttsh.com/app/financialContracts/queryFinancialContract',
					data:req,
					method:'POST',
					header: {
						'content-type':'application/x-www-form-urlencoded'		 
					},
					success(res){
						that.data = res.data.substring(res.data.indexOf('<body>')+6,res.data.indexOf('</body>'))
					}
				})
			}
		}
	}
</script>

<style>
</style>
