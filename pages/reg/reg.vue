<template>
	<view class="bg">
		<div class="login">
			<div class="logo">
				<img src="http://cdn.fologde.com/6.png" alt="">
			</div>
			
			<div class="form">
				<form>
					<div class="yifang-account input-form">
						<div class="tip">昵称</div>
						<input class="uni-input" name="input" 
							placeholder="6~20位昵称 不填则自动生成"
							type="text"
							@input="inputChange"
							maxlength="20"
							placeholder-class="placeholder-class"
							data-type="nickname"
							/>
					</div>
					
					<div class="yifang-account input-form item">
						<div class="tip require">邮箱</div>
						<input class="uni-input" name="input" 
							placeholder="有效邮箱, 可用于登录、找回密码和通知"
							type="text"
							@input="inputChange"
							maxlength="100"
							placeholder-class="placeholder-class"
							data-type="email"/>
					</div>
					
					<div class="yifang-password input-form item">
						<div class="tip require">密码</div>
						<input class="uni-input" name="input" 
							placeholder="密码"
							@input="inputChange"
							maxlength="30"
							:password="true"
							placeholder-class="placeholder-class"
							data-type="password"/>
					</div>
					
					<div class="yifang-password input-form item">
						<div class="tip require">确认密码</div>
						<input class="uni-input" name="input" 
							placeholder="再次输入密码"
							@input="inputChange"
							maxlength="30"
							:password="true"
							placeholder-class="placeholder-class"
							data-type="againPassword"/>
					</div>
					
					<div class="yifang-sex input-form item">
						<div class="tip">性别</div>
						<view class="sex-select">
							<radio-group @change="sexRadioChange">
								<view v-for="(item, index) in sexSelect" :key="index"
								class="sex-select-item">
									<radio 
								 :value="item.value" 
								:checked="item.checked" />
										<text class="text">{{item.text}}</text>
								</view>
							</radio-group>
						</view>
					</div>
					
					<div class="yifang-birthday input-form item">
						<div class="tip">生日</div>
						<div class="birthday-select">
							<picker mode="date" @change="bindDateChange">
								<view class="uni-input tip">{{birthday}}</view>
							</picker>
						</div>
					</div>
					
					<div class="login-button item" @click="register">注册</div>
					
					<div class="tip item">
						<p @click="toLoginPage">
							<text>已有账号？去登录</text>
						</p>
					</div>
				</form>
			</div>
		</div>
	</view>
</template>

<script>
	import {register} from '@/util/user_http/user.js'
	import {setLoginStatu} from '@/util/function/login.js'
	
	export default {
		
		name: 'login',
		data() {
			return {
				text_decode: true,
				sexSelect: [
					{text: '先不选', value: '0', checked: true},
					{text: '男', value: '1', checked: false},
					{text: '女', value: '2', checked: false},
				], // 性别选择项
				sexDefault: 0, // 性别默认1：男
				regInfo: {
					nickname: '', // 昵称
					email: '', // 邮箱,
					password: '', // 密码
					againPassword: '', // 再次确认密码
					sex: 0, // 性别
					birthday: '', // 生日
				}, // 注册的信息
				birthday: '点我选择生日', // 生日
			}
		},
		created() {
			// 设置默认性别字段
			this.regInfo.sex = this.sexDefault
		},
		methods: {
			// 注册前置效验
			beforeRegister(){
				function vaildate(regInfo){
					if(!regInfo.email){
						return '邮箱不能为空！'
					}
					if(!regInfo.password){
						return '密码不能为空！'
					}
					if(!regInfo.againPassword){
						return '确认密码不能为空！'
					}
					if(regInfo.password != regInfo.againPassword){
						return '两次输入的密码不一致！'
					}
					return null
				}
				
				let errMsg = vaildate(this.regInfo)
				if(errMsg){
					uni.showToast({
						mask: true,
						title: errMsg,
						duration: 1000,
						icon: 'none'
					})
					return false
				}
				return true
			},
			// 注册
			register(){
				// 前置效验
				if(!this.beforeRegister()){
					return
				}
				uni.showLoading({
				    title: '加载中'
				})
				register({}, {data: this.regInfo}).then(res => {
					if(0 == res.code){
						setLoginStatu(res.data, '注册成功！')
					}else{
						uni.showToast({
							mask: true,
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(err => {
					console.log(res)
				})
			},
			// 输入框内容改变  使用type标识是什么输入 如 type：password 表示密码输入框改变
			inputChange(e){
				this.$set(this.regInfo, e.currentTarget.dataset.type, 
				e.detail.value)
			},
			// 选择生日
			bindDateChange(e){
				this.birthday = e.detail.value
				this.regInfo.birthday = e.detail.value
			},
			// 去注册页面
			toLoginPage(){
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// sex 选择更改
			sexRadioChange(e){
				this.regInfo.sex = parseInt(e.detail.value)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/util/util.scss';
page {
	background-color: $my-bg-cl;
}
.bg{
	// @extend .uni-bg-cr;
	box-sizing: border-box;
	// margin-top: 20%;
	padding-top: 15%;
	.login{
		@extend .uni-bg-cr;
		width: 92%;
		margin-left: 4%;
		padding: 30rpx 20rpx;
		background-color: white;
		box-sizing: border-box;
		position: relative;
		$input-height: 80rpx;
		.logo{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 auto;
			position: absolute;
			top: -70rpx;
			left: 40%;
		}
		.form{
			margin-top: 100rpx;
			.input-form{
				display: flex;
				position: relative;
				.tip{
					line-height: $input-height;
					width: 130rpx;
				}
				// 在字段前面加一个星号  表示必填
				.require::after{
					content: '*';
					position: absolute;
					display: inline-block;
					font-size: 30rpx;
					color: red;
					top: 6rpx;
					margin-left: 4rpx;
				}
			}
			.yifang-sex{
				.sex-select{
					padding-top: 16rpx;
					margin-left: 30rpx;
					.sex-select-item{
						display: inline-block;
						&:not(:first-child){
							margin-left: 30rpx;
						}
					}
					.uni-radio-input{
						width: 40rpx;
						height: 40rpx;
					}
					.text{
						font-size: 25rpx;
					}
				}
			}
		}
		.yifang-birthday{
			.birthday-select{
				margin-left: -8rpx;
				width: 80%;
				.text{
					font-size: 25rpx;
				}
				.uni-input{
					width: 92%;
					text-align: left;
					box-sizing: border-box;
				}
			}
		}
		.item{
			margin-top: 40rpx;
		}
		.uni-input{
			background-color: #F6F7FB;
			height: $input-height;
			margin-left: 40rpx;
			width: 80%;
		}
		.login-button{
			margin-top: 90rpx;
			background-color: $main-color;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			border-radius: 20rpx;
			color: white;
		}
		.tip{
			text-align: center;
			font-size: 25rpx;
		}
	}
}
.placeholder-class{
	font-size: 24rpx;
}
</style>