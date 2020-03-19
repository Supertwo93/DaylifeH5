<template>
	<view>

		<web-view :webview-styles="webviewStyles" :src="src"></web-view>
		
	</view>
	
</template>

<script>
	export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				src:''
            }
        },
		onLoad(options){
			console.log(options)
			this.src = options.src
		}
    }
</script>

<style>
</style>
