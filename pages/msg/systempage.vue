<template>
	<view>
		<view>
			<rich-text :nodes="data"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data:''
			}
		},
		onLoad(options){
			console.log(options)
			this.data = options.data
		}
	}
</script>

<style>
</style>
