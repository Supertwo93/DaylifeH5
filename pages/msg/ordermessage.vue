<template>
	<view>
		<blocK v-for="(item,index) in messageList" :key="index">
			<message :time="item.time" :store="item.store" :status="item.status"></message>
		</blocK>

	</view>
</template>

<script>
import message from '../../components/message.vue'
export default{
	components:{
		message
	},
	data(){
		return{
			messageList:[
				{time:'12:00',status:1,store:'明丽煤气店'},
				{time:'13:00',status:0,store:'三星旗舰店'},
				{time:'14:00',status:1,store:'三星旗舰店'},
				{time:'15:00',status:1,store:'苹果旗舰店'},
				{time:'16:00',status:0,store:'三星旗舰店'}
			]
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
</style>
