<template>
  
    <view @click="selec" class="iconfont" :class="[isKeep?'icon-shoucang2':'icon-shoucang']"></view>  
  
</template>

<script>


export default {
  name: '',
  props: {
   isKeep:{
	   type: Boolean
   }

  },
  data () {
    return {
      tes:''
    }
  },
  onLoad() {
			
	},
  onReady() {
  
  },
   methods: {
	selec(e){
		console.log(this.isKeep)
		this.tes=!this.isKeep
		//let tre=this.isKeep ? 0 : 1
		this.$emit("like",this.tes)
	}
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	.iconfont{
		font-size: 40rpx;
	}
</style>
