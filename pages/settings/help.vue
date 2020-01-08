<template>
	<view>
		<rich-text :nodes="data"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data:''
			}
		},
		onLoad(){
			let that = this
			uni.request({
				url:'https://sgz.wdttsh.com/app/help/getList',
				method:'POST',
				success(res){
					that.data = res.data.data.substring(res.data.data.indexOf('<div'),res.data.data.indexOf('</div>'))
					console.log(res.data.data.indexOf('<div'))
				}
			})
		}
	}
</script>

<style>
page{
	background-color: #fff;
	padding: 10px 20px;
	box-sizing: border-box;
}
</style>
