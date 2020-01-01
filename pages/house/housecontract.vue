<template>
	<view>
		<view>
			<rich-text :nodes="data"></rich-text>
		</view>
		
		<view :class="[isRead ? 'submit-button' : 'disable']" @tap="backToSign">我已阅读并确认</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			data:'',
			isRead:false
		}
	},
	methods:{
		backToSign(){
			if(this.isRead==0){
				uni.showToast({
					title:'请阅读合同后点击确定按钮',
					icon:'none',
					duration:2000
				})
			}else{
				let pages = getCurrentPages()
				let prePages = pages[pages.length-2]
				// #ifdef MP
				prePages.$vm.isContract = true
				// #endif
				uni.navigateBack({
					
				})
			}
			
		}
	},
	onLoad:function(options){
		let url = ''
		if(options.type=='金融'){
			uni.request({
				method:'POST',
				url:'http://192.168.3.194:9091/app/FinancialContracts/queryFinancialContract',
				success:(data)=>{
					this.data = `<center><div class="title">代理记账协议</div></center><div class="mainPage"><div>&nbsp;<div><div>甲方（委托方）：</div><div>地址：</div><div>联系人：        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 电话：</div><div>&nbsp;<div><div>乙方（代理方）：</div><div>地址：<div>联系人：       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 电话：</div><div>&nbsp;<div><div>甲方委托乙方代理记账等，根据《会计法》和财政部《代理记账管理办法》，签定以下协议：</div><div>兹由甲方委托乙方办理：</div><div>本着诚信原则，经双方友好协商，达成以下协议：</div><div>&nbsp;<div><div><div class="tableTextLeft">业务名称</div><div class="tableTextRight"  >收费标准</div><div class="gap"></div><div class="tableTextLeft">工商注册</div><div class="tableTextRight"  ></div><div class="gap"></div><div class="tableTextLeft">记账报税</div><div class="tableTextRight"  ></div><div class="gap"></div><div class="tableTextLeft">变更 / 年审</div><div class="tableTextRight"></div><div class="gap"></div><div class="tableTextLeft">开户 / 注销 </div><div class="tableTextRight"></div><div class="gap"></div><div class="tableTextLeft">开放公账户</div><div class="tableTextRight"  ></div><div class="gap"></div><div class="tableTextLeft">税务疑难解决</div><div class="tableTextRight"></div><div class="gap"></div><div class="tableTextLeft">地址挂靠</div><div class="tableTextRight"  ></div><div class="gap"></div><div class="tableLast"></div><div><div>&nbsp;<div><div><table ><tr><td>业务名称</td></tr></table></div><div>&nbsp;<div><div>甲方的责任是：建立健全企业管理制度；依法经营，保证财产的安全完整；保证原始</div><div>凭证的真实、合法、准确、完整；按照有关规定及时足额缴纳各项税费。</div><div>乙方的责任是：按照会计准则、会计制度和其他会计法规要求为甲方代理记账，保证</div><div>服务处理的真实性、合理性和合法性，并严格遵循保密制度。</div><div>合同有效期：</div><div>本合同自双方代表签字之日起生效，有效期为_________年，从_________年_________月</div><div>_________日起至_________年_________月_________日止。</div><div> 并在本合同约定的全部事项完成之前有效。</div><div>本委托合同一式二份，甲乙双方各执一份，具有同等法律效力。</div><div>&nbsp;<div><div>合同终止：</div><div>&nbsp;<div><div>委托人、受托人终止委托合同应当办理的会计交接事宜。</div><div>本合同经双方法定代表人或授权代理人签字或盖章后生效，本合同一式二份，甲、乙双方</div><div>合同终止：</div><div>合同到期后，双方如无异议，经双方同意后，合同可自动延期。</div><div><span class="em">补充条款 : </span><span>___________________________（由双方商讨确认补充）</span></div><div>&nbsp;<div><div>甲方 : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙方 : </div><div>&nbsp;<div><div>年  &nbsp;&nbsp; 月 &nbsp;&nbsp;  日 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 年  &nbsp;&nbsp; 月 &nbsp;&nbsp;  日  </div><div>&nbsp;<div><div>&nbsp;<div></div>`
					console.log(this.data)
				}
			})
		}else{
			uni.request({
				method:'POST',
				url:'http://www.wdttsh.com:8080/sgb/app/signing/queryContract',
				success: (data) => {
					console.log(data.data.data)
					this.data = data.data.data
				}
			})
		}
	},
	onReachBottom(){
		this.isRead = true
	}
}
	
</script>

<style>
page{
	padding-bottom:96rpx;
}
.disable{
	background-color: #b4b4b4;
	width:100%;
	height:96rpx;
	position:fixed;
	bottom:0;
	text-align: center;
	font-size:34rpx;
	line-height:96rpx;
	font-weight:400;
	color:rgba(255,255,255,1);
}

</style>
