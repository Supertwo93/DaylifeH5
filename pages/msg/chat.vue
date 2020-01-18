<template>
	<view class="chat" id="chat" :style="{paddingBottom:isIpx ? (safeBottom + 40) + 'px':'40px'}"
		@longpress="handleLongPress"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd">
		<view :class="isRecording?'':'modal-display'" class="record-modal">
			<view class="wrapper">
				<view class="modal-loading"></view>
			</view>
			<view class="modal-title">
				{{title}}
			</view>
		</view>
		<view id="list" @click="loseFocus" style="padding-bottom:50px">
			<view v-for="(message,index) in currentMessageList" :key="message.ID" :id="message.ID">
				<view class="notice" v-if="message.type==='TIMGroupTipElem' || message.type === 'TIMGroupSystemNoticeElem' ">
					
				</view>
				
				<view v-else :class="(message.flow === 'out')?'item-right' :'item-left'">
					<view class="load" @click="handleResend(message)">
						<view :class="message.status"></view>
					</view>
					<view class="content">
						<!-- <view class="name">{{message.nick || message.from}}</view> -->
					</view>
					<view class="message" v-if="message.type==='TIMTextElem'">
						<view class="text-message">
							<block v-for="(div,index2) in message.virtualDom" :key="index2">
								<text v-if="div.name==='span'">{{div.text}}</text>
								<image v-if="div.name==='img'" :src="div.src" style="width:20px;height:20px"></image>
							</block>
						</view>
					</view>
					<view class="message" v-else-if="message.type==='TIMFaceElem'">
						<view class="custom-elem">
							<image :src="faceUrl + message.payload.data + '@2x.png'" style="height:90px; width:90px"/>
						</view>
					</view>
					<view class="message" v-else-if="message.type === 'TIMSoundElem'" :url="message.payload.url">
						<view class="box" @tap="openAudio(message.payload)">
							<image src="/static/cut/audio.png" style="height:20px;width:14px;"></image>
							<view style="padding-left:10px">{{message.payload.second}}s</view>
						</view>
					</view>
					<view class="message" v-else-if="message.type === 'TIMImageElem'" @tap="previewImage(message.payload.imageInfoArray[1].url)">
						<image class="img" :src="message.payload.imageInfoArray[1].url" mode="aspectFit" style="max-width:200px;height:150px"></image>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="bottom">
			<view class="bottom-div">
				<view class="btn" @click="chooseRecord">
					<image src="/static/cut/record.png" class="btn-small"></image>
				</view>
				<view v-if="!isRecord" style="width:80%">
					<input type="text"
						   class="input"
						   v-model.lazy:value="messageContent"
						   confirm-type="send"
						   :focus="isFocus"
						   @confirm='sendMessage' />
				</view>
				<view class="record" id="record" v-if="isRecord">
					<template v-if="!isRecording">
						长按进行录音
					</template>
					<template v-if="isRecording">
						抬起停止录音
					</template>
				</view>
				
				<view class="btn" @tap="handleEmoji()">
					<image src="/static/cut/emoji.png" class="btn-small"></image>
				</view>
				<view class="btn" @tap="handleMore()">
					<image src="/static/cut/plus.png" class="btn-small"></image>
				</view>
			</view>
			<view class="bottom-emoji" v-if="isEmojiOpen">
				<view class="emojis">
					<view v-for="(emojiItem,emojiIndex) in emojiName" class="emoji" :key="emojiIndex" @tap="chooseEmoji(emojiItem)">
						<image :src="emojiUrl + emojiMap[emojiItem]" style="width:25px;height:25px"></image>
					</view>
				</view>
				<view class="emoji-tab">
					<view style="line-height:26px">
						😄
					</view>
					<view class="sending" @click="sendMessage()">发送</view>
				</view>
			</view>
			<view class="bottom-image" v-if="isMoreOpen">
				<view class="images">
					<view class="block" @tap="sendPhoto('album')">
						<view class="image">
							<image src="/static/cut/image.png" class="icon"></image>
						</view>
						<view class="name">
							图片
						</view>
					</view>
					<view class="block" @tap="sendPhoto('camera')">
						<view class="image">
							<image src="/static/cut/photo.png" class="icon"></image>
						</view>
						<view class="name">
							拍照
						</view>
					</view>
					<view class="block" @tap="video">
						<view class="image">
							<image src="/static/cut/video.png" class="icon"></image>
						</view>
						<view class="name">
							视频
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
	
	
</template>

<script>
	import {mapState} from 'vuex'
	const recorderManager = uni.getRecorderManager()
	const audioContext = uni.createInnerAudioContext()
	const recordOptions = {
		duration:60000,
		sampleRate:44100,
		numberOfChannels:1,
		encodeBitRate:192000,
		format:'acc'
	}
	export default{
		data(){
			return{
				messageContent:'',
				isMoreOpen:false,
				isEmojiOpen:false,
				isFocus:false,
				emojiUrl:'https://webim-1252463788.file.myqcloud.com/assets/emoji/',
				emojiName:[
					'[龇牙]',
					'[调皮]',
					'[流汗]',
					'[偷笑]',
					'[再见]',
					'[敲打]',
					'[擦汗]',
					'[猪头]',
					'[玫瑰]',
					'[流泪]',
					'[大哭]',
					'[嘘]',
					'[酷]',
					'[抓狂]',
					'[委屈]',
					'[便便]',
					'[炸弹]',
					'[菜刀]',
					'[可爱]',
					'[色]',
					'[害羞]',
					'[得意]',
					'[吐]',
					'[微笑]',
					'[怒]',
					'[尴尬]',
					'[惊恐]',
					'[冷汗]',
					'[爱心]',
					'[示爱]',
					'[白眼]',
					'[傲慢]',
					'[难过]',
					'[惊讶]',
					'[疑问]',
					'[困]',
					'[么么哒]',
					'[憨笑]',
					'[爱情]',
					'[衰]',
					'[撇嘴]',
					'[阴险]',
					'[奋斗]',
					'[发呆]',
					'[右哼哼]',
					'[抱抱]',
					'[坏笑]',
					'[飞吻]',
					'[鄙视]',
					'[晕]',
					'[大兵]',
					'[可怜]',
					'[强]',
					'[弱]',
					'[握手]',
					'[胜利]',
					'[抱拳]',
					'[凋谢]',
					'[米饭]',
					'[蛋糕]',
					'[西瓜]',
					'[啤酒]',
					'[瓢虫]',
					'[勾引]',
					'[OK]',
					'[爱你]',
					'[咖啡]',
					'[月亮]',
					'[刀]',
					'[发抖]',
					'[差劲]',
					'[拳头]',
					'[心碎了]',
					'[太阳]',
					'[礼物]',
					'[皮球]',
					'[骷髅]',
					'[挥手]',
					'[闪电]',
					'[饥饿]',
					'[困]',
					'[咒骂]',
					'[折磨]',
					'[抠鼻]',
					'[鼓掌]',
					'[糗大了]',
					'[左哼哼]',
					'[打哈欠]',
					'[快哭了]',
					'[吓]',
					'[篮球]',
					'[乒乓]',
					'[NO]',
					'[跳跳]',
					'[怄火]',
					'[转圈]',
					'[磕头]',
					'[回头]',
					'[跳绳]',
					'[激动]',
					'[街舞]',
					'[献吻]',
					'[左太极]',
					'[右太极]',
					'[闭嘴]',
					'[猫咪]',
					'[红双喜]',
					'[鞭炮]',
					'[红灯笼]',
					'[麻将]',
					'[麦克风]',
					'[礼品袋]',
					'[信封]',
					'[象棋]',
					'[彩带]',
					'[蜡烛]',
					'[爆筋]',
					'[棒棒糖]',
					'[奶瓶]',
					'[面条]',
					'[香蕉]',
					'[飞机]',
					'[左车头]',
					'[车厢]',
					'[右车头]',
					'[多云]',
					'[下雨]',
					'[钞票]',
					'[熊猫]',
					'[灯泡]',
					'[风车]',
					'[闹钟]',
					'[雨伞]',
					'[彩球]',
					'[钻戒]',
					'[沙发]',
					'[纸巾]',
					'[手枪]',
					'[青蛙]'
				],
				emojiMap:{
					 '[NO]': 'emoji_0@2x.png',
					'[OK]': 'emoji_1@2x.png',
					'[下雨]': 'emoji_2@2x.png',
					'[么么哒]': 'emoji_3@2x.png',
					'[乒乓]': 'emoji_4@2x.png',
					'[便便]': 'emoji_5@2x.png',
					'[信封]': 'emoji_6@2x.png',
					'[偷笑]': 'emoji_7@2x.png',
					'[傲慢]': 'emoji_8@2x.png',
					'[再见]': 'emoji_9@2x.png',
					'[冷汗]': 'emoji_10@2x.png',
					'[凋谢]': 'emoji_11@2x.png',
					'[刀]': 'emoji_12@2x.png',
					'[删除]': 'emoji_13@2x.png',
					'[勾引]': 'emoji_14@2x.png',
					'[发呆]': 'emoji_15@2x.png',
					'[发抖]': 'emoji_16@2x.png',
					'[可怜]': 'emoji_17@2x.png',
					'[可爱]': 'emoji_18@2x.png',
					'[右哼哼]': 'emoji_19@2x.png',
					'[右太极]': 'emoji_20@2x.png',
					'[右车头]': 'emoji_21@2x.png',
					'[吐]': 'emoji_22@2x.png',
					'[吓]': 'emoji_23@2x.png',
					'[咒骂]': 'emoji_24@2x.png',
					'[咖啡]': 'emoji_25@2x.png',
					'[啤酒]': 'emoji_26@2x.png',
					'[嘘]': 'emoji_27@2x.png',
					'[回头]': 'emoji_28@2x.png',
					'[困]': 'emoji_29@2x.png',
					'[坏笑]': 'emoji_30@2x.png',
					'[多云]': 'emoji_31@2x.png',
					'[大兵]': 'emoji_32@2x.png',
					'[大哭]': 'emoji_33@2x.png',
					'[太阳]': 'emoji_34@2x.png',
					'[奋斗]': 'emoji_35@2x.png',
					'[奶瓶]': 'emoji_36@2x.png',
					'[委屈]': 'emoji_37@2x.png',
					'[害羞]': 'emoji_38@2x.png',
					'[尴尬]': 'emoji_39@2x.png',
					'[左哼哼]': 'emoji_40@2x.png',
					'[左太极]': 'emoji_41@2x.png',
					'[左车头]': 'emoji_42@2x.png',
					'[差劲]': 'emoji_43@2x.png',
					'[弱]': 'emoji_44@2x.png',
					'[强]': 'emoji_45@2x.png',
					'[彩带]': 'emoji_46@2x.png',
					'[彩球]': 'emoji_47@2x.png',
					'[得意]': 'emoji_48@2x.png',
					'[微笑]': 'emoji_49@2x.png',
					'[心碎了]': 'emoji_50@2x.png',
					'[快哭了]': 'emoji_51@2x.png',
					'[怄火]': 'emoji_52@2x.png',
					'[怒]': 'emoji_53@2x.png',
					'[惊恐]': 'emoji_54@2x.png',
					'[惊讶]': 'emoji_55@2x.png',
					'[憨笑]': 'emoji_56@2x.png',
					'[手枪]': 'emoji_57@2x.png',
					'[打哈欠]': 'emoji_58@2x.png',
					'[抓狂]': 'emoji_59@2x.png',
					'[折磨]': 'emoji_60@2x.png',
					'[抠鼻]': 'emoji_61@2x.png',
					'[抱抱]': 'emoji_62@2x.png',
					'[抱拳]': 'emoji_63@2x.png',
					'[拳头]': 'emoji_64@2x.png',
					'[挥手]': 'emoji_65@2x.png',
					'[握手]': 'emoji_66@2x.png',
					'[撇嘴]': 'emoji_67@2x.png',
					'[擦汗]': 'emoji_68@2x.png',
					'[敲打]': 'emoji_69@2x.png',
					'[晕]': 'emoji_70@2x.png',
					'[月亮]': 'emoji_71@2x.png',
					'[棒棒糖]': 'emoji_72@2x.png',
					'[汽车]': 'emoji_73@2x.png',
					'[沙发]': 'emoji_74@2x.png',
					'[流汗]': 'emoji_75@2x.png',
					'[流泪]': 'emoji_76@2x.png',
					'[激动]': 'emoji_77@2x.png',
					'[灯泡]': 'emoji_78@2x.png',
					'[炸弹]': 'emoji_79@2x.png',
					'[熊猫]': 'emoji_80@2x.png',
					'[爆筋]': 'emoji_81@2x.png',
					'[爱你]': 'emoji_82@2x.png',
					'[爱心]': 'emoji_83@2x.png',
					'[爱情]': 'emoji_84@2x.png',
					'[猪头]': 'emoji_85@2x.png',
					'[猫咪]': 'emoji_86@2x.png',
					'[献吻]': 'emoji_87@2x.png',
					'[玫瑰]': 'emoji_88@2x.png',
					'[瓢虫]': 'emoji_89@2x.png',
					'[疑问]': 'emoji_90@2x.png',
					'[白眼]': 'emoji_91@2x.png',
					'[皮球]': 'emoji_92@2x.png',
					'[睡觉]': 'emoji_93@2x.png',
					'[磕头]': 'emoji_94@2x.png',
					'[示爱]': 'emoji_95@2x.png',
					'[礼品袋]': 'emoji_96@2x.png',
					'[礼物]': 'emoji_97@2x.png',
					'[篮球]': 'emoji_98@2x.png',
					'[米饭]': 'emoji_99@2x.png',
					'[糗大了]': 'emoji_100@2x.png',
					'[红双喜]': 'emoji_101@2x.png',
					'[红灯笼]': 'emoji_102@2x.png',
					'[纸巾]': 'emoji_103@2x.png',
					'[胜利]': 'emoji_104@2x.png',
					'[色]': 'emoji_105@2x.png',
					'[药]': 'emoji_106@2x.png',
					'[菜刀]': 'emoji_107@2x.png',
					'[蛋糕]': 'emoji_108@2x.png',
					'[蜡烛]': 'emoji_109@2x.png',
					'[街舞]': 'emoji_110@2x.png',
					'[衰]': 'emoji_111@2x.png',
					'[西瓜]': 'emoji_112@2x.png',
					'[调皮]': 'emoji_113@2x.png',
					'[象棋]': 'emoji_114@2x.png',
					'[跳绳]': 'emoji_115@2x.png',
					'[跳跳]': 'emoji_116@2x.png',
					'[车厢]': 'emoji_117@2x.png',
					'[转圈]': 'emoji_118@2x.png',
					'[鄙视]': 'emoji_119@2x.png',
					'[酷]': 'emoji_120@2x.png',
					'[钞票]': 'emoji_121@2x.png',
					'[钻戒]': 'emoji_122@2x.png',
					'[闪电]': 'emoji_123@2x.png',
					'[闭嘴]': 'emoji_124@2x.png',
					'[闹钟]': 'emoji_125@2x.png',
					'[阴险]': 'emoji_126@2x.png',
					'[难过]': 'emoji_127@2x.png',
					'[雨伞]': 'emoji_128@2x.png',
					'[青蛙]': 'emoji_129@2x.png',
					'[面条]': 'emoji_130@2x.png',
					'[鞭炮]': 'emoji_131@2x.png',
					'[风车]': 'emoji_132@2x.png',
					'[飞吻]': 'emoji_133@2x.png',
					'[飞机]': 'emoji_134@2x.png',
					'[饥饿]': 'emoji_135@2x.png',
					'[香蕉]': 'emoji_136@2x.png',
					'[骷髅]': 'emoji_137@2x.png',
					'[麦克风]': 'emoji_138@2x.png',
					'[麻将]': 'emoji_139@2x.png',
					'[鼓掌]': 'emoji_140@2x.png',
					'[龇牙]': 'emoji_141@2x.png'
				},
				sysInfo:{},
				isShow:false,
				faceUrl: 'https://webim-1252463788.file.myqcloud.com/assets/face-elem/',
				isIpx:false,
				height:0,
				title: '正在录音',
				isRecording:false,
				isRecord:false,
				canSend:true,
				startPoint:0
			}
		},
		onLoad(option){
			uni.setNavigationBarTitle({
				title:option.toAccount
			})
			let sysInfo = uni.getSystemInfoSync()
			this.sysInfo = sysInfo
			this.height = sysInfo.windowHeight
			this.isIpx = (sysInfo.model.indexOf('iPhone X') > -1)
			let query = uni.createSelectorQuery()
			let that = this
			wx.$app.on(this.TIM.EVENT.MESSAGE_RECEIVED,()=>{
				query.select('#chat').boundingClientRect(function(res){
					if(res.bottom - that.height < 150) {
						that.scrollToBottom()
					}
				}).exec()
			})
			let interval = setInterval(()=>{
				if(this.currentMessageList.length !==0){
					this.scrollToBottom()
					clearInterval(interval)
				}
			},600)
			this.$bus.$off('atUser')
			this.$bus.$on('atUser', (user) => {
				this.messageContent += user.userID
				this.messageContent += ' '
			})
			recorderManager.onStart(()=>{
				console.log('recorder start')
			})
			recorderManager.onPause(()=>{
				console.log('recorder pause')
			})
			recorderManager.onStop((res)=>{
				console.log('recorder stop')
				uni.hideLoading()
				if(this.canSend){
					if(res.duration < 1000){
						this.$store.commit('showToast',{
							title:'录音时间太短'
						})
					}else{
						const message = wx.$app.createAudioMessage({
							to:this.$store.getters.toAccount,
							conversationType:this.$store.getters.currentConversationType,
							payload:{
								file:res
							}
						})
						this.$store.commit('sendMessage',message)
						wx.$app.sendMessage(message)
					}
				}
			})
		},
		onShow(){
			this.isShow = true
		},
		onUnload(){
			wx.$app.setMessageRead({conversationID:this.$store.state.conversation.currentConversationID})
			this.isEmojiOpen = false
			this.isMoreOpen = false
			this.messageContent = ''
			this.isShow = false
		},
		computed: {
			...mapState({
				currentMessageList:state =>{
					console.log(state.conversation.currentMessageList)
					return state.conversation.currentMessageList
				}
			})
		},
		methods:{
			handleLongPress(e){
				this.startPoint = e.touches[0]
				if(e.target.id ==='record'){
					this.title = '正在录音'
					this.isRecording = true
					this.startRecording()
					this.canSend = true
				}
			},
			handleTouchMove(e){
				if(this.isRecording){
					if(this.startPoint.clientY - e.touches[e.touches.length-1].clientY>100){
						this.title='松开手指，取消发送'
						this.canSend = false
					}else if(this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 20){
						this.title = '上划可取消'
						this.canSend = true
					}else {
						this.title = '正在录音'
						this.canSend = true
					}
				}
			},
			handleTouchEnd(){
				this.isRecording = false
				uni.hideLoading() 
				recorderManager.stop()
			},
			loseFocus () {
				this.handleClose()
			},
			handleEmoji (){
				if(this.isFocus){
					this.isFocus = false
					this.isEmojiOpen = true
				}else{
					this.isEmojiOpen = !this.isEmojiOpen
					this.isMoreOpen = false
				}
			},
			handleMore(){
				if(this.isFocus){
					this.isFocus = false
					this.isMoreOpen = true
				}else{
					this.isMoreOpen = !this.isMoreOpen
					this.isEmojiOpen = false
				}
			},
			handleClose () {
				this.rateModal = false
				this.isFocus = false
				this.isMoreOpen = false
				this.isEmojiOpen = false
			},
			chooseEmoji(item){
				this.messageContent += item
			},
			sendMessage(){
				if(!this.isnull(this.messageContent)){
					const message = wx.$app.createTextMessage({
						to:this.$store.getters.toAccount,
						conversationType:this.$store.getters.currentConversationType,
						payload:{text:this.messageContent}
					})
					let index = this.$store.state.conversation.currentMessageList.length
					this.$store.commit('sendMessage',message)
					wx.$app.sendMessage(message).catch(()=>{
						this.$store.commit('changeMessageStatus',index)
					})
					this.messageContent = ''
				}else{
					this.$store.commit('showToast',{title:'消息不能为空'})
				}
				this.isFocus = false
				this.isEmojiOpen = false
				this.isMoreOpen = false
			},
			isnull(content){
				if(content === ''){
					return true
				}
				const reg = '^[ ]+$'
				const re = new RegExp(reg)
				return re.test(content)
				
			},
			chooseRecord(){
				this.isRecord = !this.isRecord
			},
			scrollToBottom(){
				if(this.isShow){
					uni.pageScrollTo({
						scrollTop:99999
					})
				}
			},
			openAudio(audio){
				let that = this
				audioContext.src = audio.url
				audioContext.play()
				audioContext.onPlay(() => {
					console.log('1111')
				})
				audioContext.onEnded(() => {
					console.log(222)
					uni.hideToast()
				})
				audioContext.onError(() => {
					that.$store.commit('showToast', {
						title: '小程序暂不支持播放该音频格式',
						icon: 'none',
						duration: 2000
					})
				})
			},
			startRecording(){
				uni.getSetting({
					success:(res) =>{
						let auth = res.authSetting['scope.record']
						if(auth === false){
							uni.openSetting({
								success:function(res){
									let auth = res.authSetting['scope.record']
									if(auth === true){
										uni.showToast({
											title:'授权成功',
											icon:'success',
											duration:1500
										})
									}else {
										uni.showToast({
											title:'授权失败',
											icon:'none',
											duration:1500
										})
									}
								}
							})
						}else if (auth === true) {
							this.isRecording = true
							recorderManager.start(recordOptions)
						}else {
							uni.authorize({
								scope:'scope.record',
								success:()=>{
									uni.showToast({
										title:'授权成功',
										icon:"success",
										duration:1500
									})
								}
							})
						}
					},
					fail:function(){
						wx.showToast({
							title:'授权失败',
							icon:'none',
							duration:1500
						})
					}
				})
			},
			previewImage(src){
				uni.previewImage({
					current:src,
					urls:[src]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.bottom{
	background-color: #fff;
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
	.bottom-div{
		display: flex;
		width:100%;
		background-color: #fff;
		border-top:1rpx solid #dddee1;
		padding-top:4rpx;
		padding-left: 10rpx;
		direction: row;
		box-sizing: border-box;
	}
}
.btn{
	padding:0;
	margin: 0;
	margin-right: 10px;
}
.btn-small{
	width:30px;
	height:30px;
}

.box{
	display: flex;
	height:20px;
	line-height: 20px;
}

.record{
	margin-right: 10px;
	width:100%;
	border:1px solid #dddee1;
	color:#80848f;
	border-radius: 8px;
	box-sizing: border-box;
	height: 30px;
	line-height: 30px;
	display: flex;
	justify-content: center;
}
.input{
	border:1px solid #e9eaec;
	background-color: #fff;
	border-radius: 8rpx;
	height:30px;
	margin-right: 10px;
	box-sizing:border-box;
}

.bottom-emoji{
	.emojis{
		height:150px;
		border-bottom:1px solid #dddee1;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		overflow-x:scroll;
		.emoji{
			height:30px;
			width:30px;
			padding:2px 3px 3px 2px;
			box-sizing: border-box;
		}
	}
	.emoji-tab{
		padding: 0 20rpx;
		height:30px;
		box-sizing: border-box;
		background-color: #e6e6e6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.sending{
			width:50px;
			background-color: #2d8cf0;
			color:white;
			display: flex;
			justify-content: center;
			line-height: 26px;
			font-size:14px;
			font-weight: 600;
			border-radius: 8px;
		}
	}
}

.bottom-image{
	height:90px;
	border-bottom: 1rpx solid #dddee1;
	box-sizing: border-box;
	background-color: #e6e6e6;
	.images{
		height:90px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		.block{
			width:25vw;
			padding:10px 5vw;
			box-sizing: border-box;
			height:90px;
			display: flex;
			flex-direction: column;
			.name{
				font-size:12px;
				color:#80848f;
				text-align: center;
			}
			.image{
				width:15vw;
				height:15vw;
				box-sizing: border-box;
				border-radius: 8px;
				background-color: #fff;
				padding:3vw;
				.icon{
					width:9vw;
					height:9vw;
				}
			}
		}
	}
}

.item-left{
	display: flex;
	flex-direction: row-reverse;
	justify-content: flex-end;
	.load{
		display: none;
	}
	.content{
		margin-left:10px;
		.name{
			width:100%;
			font-size:12px;
			height:18px;
			line-height:18px;
			color:#495060;
		}
	}
	.message{
		background-color: #f8f8f9;
		border-radius: 20px / 0px 20px 20px;
	}
}

.item-right{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	.load{
		height:100%;
		display: flex;
		padding-top: 8px;
		padding-right: 10px;
	}
	.content{
		margin-right: 10px;
		.name{
			display: none;
		}
	}
	.message{
		background-color: #5cadff;
		border-radius: 20px / 20px 0px 20px 20px;
	}
}

.message{
	text-align: left;
	width:fit-content;
	word-break: break-all;
	font-size:14px;
	background-color: #e6e6e6;
	margin-top: 2px;
	margin-bottom: 10px;
	padding:10px 15px;
}
.text-message{
	display: flex;
	flex-direction: row;
	flex-wrap:wrap;
	white-space: pre-wrap;
}

.custom-elem{
	background-color:#fff;
	color: #2b85e4;
}




.record-modal{
	height:150px;
	width:60vw;
	background-color: #000;
	opacity: 0.8;
	position: fixed;
	top:200px;
	z-index:9999;
	left:20vw;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	.wrapper{
		display: flex;
		height:100px;
		box-sizing: border-box;
		padding: 10vw;
		.modal-loading{
			opacity: 1;
			width:20px;
			height:8px;
			border-radius: 2px;
			background-color: #2d8cf0;
			animation: loading 2s cubic-bezier(.17,.37,.43,.67) infinite; 
		}
	}
	.modal-title{
		text-align: center;
		color:#fff;
	}
}

@-webkit-keyframes loading{
	0%{
		transform: translate(0,0)
	}
	50%{
		transform: translate(30vw,0);
		background-color: #f5634a;
		width:40px;
	}
	100%{
		transform: translate(0,0)
	}
}


.modal-display{
	display: none;
}
</style>
