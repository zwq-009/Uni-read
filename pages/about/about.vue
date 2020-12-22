<template>
	<view class="about">
		<div class="item icon">
			<img src="http://cdn.fologde.com/6.png" alt="">
		</div>
		<div class="item appName"><b>{{Config.appName}}</b></div>
		<div class="item version">Version {{Config.version}}</div>
		
		<div class="footer">
			<p>开源地址：<text class="copy" @click="copyGitUrl">点击复制</text></p>
			<p></p>
			<p>{{Config.appName}} 版权所有</p>
			<p>All Right Reserved.</p>
		</div>
	</view>
</template>

<script>
	import {copy} from '@/util/util.js'
	
	export default {
		data() {
			return {
				Config: {}, // 全局配置
			}
		},
		created() {
			this.Config = this.$yifangConfig
		},
		methods: {
			// 拷贝git仓库地址
			copyGitUrl(){
				console.log(this.Config.gitUrl)
				copy(this.Config.gitUrl)
			}
		},
	}
</script>

<style lang="scss" scoped>
.about{
	display: flex;
	flex-flow: row wrap;
	.item{
		width: 100%;
		align-self: center;
		margin-top: 40rpx;
		text-align: center;
	}
	.icon{
		width: 160rpx;
		height: 160rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		border-radius: 10px;
		overflow: hidden;
	}
	.appName{
		font-size: 44rpx;
	}
	.footer{
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		box-sizing: border-box;
		p{
			text-align: center;
		}
		.copy{
			color: blue;
		}
	}
}
</style>
