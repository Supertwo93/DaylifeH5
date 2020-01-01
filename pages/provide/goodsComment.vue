<template>
	<view>
		<block v-for="(row,index) in comment" :key="index">
			<comment-box :row="row" :margin="true" :button="true"></comment-box>
		</block>
	</view>
</template>

<script>
import commentBox from '@/components/commentBox.vue'
export default{
	components: {
		commentBox
	},
	data(){
		return{
			comment:''
		}
	},
	onLoad(options){
		this.comment = JSON.parse(options.data)
		console.log(this.comment)
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
</style>
