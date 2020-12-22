<template>
	<view class="swiper1">
		<swiper class="swiper" :indicator-dots="indicatorDots" 
		:autoplay="autoplay" :interval="interval" :duration="duration"
		:circular="true" :previous-margin="previous_margin" :next-margin="previous_margin"
		:indicator-color="indicator_color" :indicator-active-color="indicator_active_color"
		>
			<swiper-item>
				<image mode="scaleToFill" class="swiper-images"
					src="http://cdn.fologde.com/6.png"></image>
			</swiper-item>
			<swiper-item>
				<image mode="scaleToFill" class="swiper-images"
				src="http://cdn.fologde.com/7.png"></image>
			</swiper-item>
			<swiper-item>
				<image mode="scaleToFill" class="swiper-images"
				src="http://cdn.fologde.com/4.png"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'yifangSwiper',
		data() {
			return {
				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 3000, // 自动切换时间间隔 毫秒
				duration: 500, // 滑动动画时长
				previous_margin: "50rpx", // 前边距，可用于露出前一项的一小部分
				indicator_color: 'RGB(255,255,255)', // 指示点颜色
				indicator_active_color: '#FF5501', // 当前选中的指示点颜色
			};
		}
	}
</script>

<style lang="scss" scoped>
.swiper1{
	z-index: 10;
	// border: 1px solid red;
	width: 96%;
	margin: 2% 2%;
	.swiper-images{
		width: 100%;
		height: 100%;
	}
}
</style>
