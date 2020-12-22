<template>
	<view class="taowa">
		<view class="search">
			<view class="left">待定</view>
			<view class="box">
				<view class="text">搜索</view>
			</view>
			<view class="right">待定</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'yifangTopSearch',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
$height: 70rpx;
.taowa{
	height: $height;
	width: 100%;
}
.search{
	// border: 1px solid red;
	z-index: 1000;
	overflow: hidden;
	height: $height;
	clear: both;
	position: fixed;
	width: 100%;
	background-color: #F9FAF9;
	.left, .box, .text, .right{
		height: $height;
		line-height: $height;
		// border: 1px solid red;
		float: left;
	}
	.left{
		width: 20%;
		text-align: center;
	}
	.box{
		height: calc(100% - 12rpx);
		border: 2px solid #CF5D1B;
		border-radius: 20px;
		width: 58%;
		margin-top: 4rpx;
		overflow: hidden;
		.text{
			$text-line-height: 58rpx; // 和 $height 变量的值有关联,如$height加1 则当前值页需要加1
			height: $text-line-height;
			line-height: $text-line-height;
			// border: 1px solid red;
			float: right;
			margin-right: -4rpx;
			width: 150rpx;
			text-align: center;
			border-radius: 20px;
			background: linear-gradient(to left, #FF830B , #FF5501); 
			color: white;
		}
	}
	.right{
		float: right;
		width: 20%;
		text-align: center;
	}
}
</style>
