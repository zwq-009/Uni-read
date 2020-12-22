<template>
	<view class="read-body" @click.stop>
		<!-- 设置项 -->
		<div class="s-item">
			<!-- 控制字体、大小 -->
			<div class="font-reduce font" @click="font_reduce">A-</div>
			<div class="font-size">{{user_font_size}}</div>
			<div class="font-enlarge font" @click="font_enlarge">A+</div>
		</div>
		<!-- 背景颜色 -->
		<div class="bg-color">
			<div class="color-scolle">
				<div class="item" v-for="(item, index) in bg_list" :key="index"
				:style="{'background-color': item.color}"
				@click="bg_color_change(item.color)"></div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		name: "yifnagReadSetting",
		data() {
			return {
				user_font_size: 18, // 用户设置的字体大小  单位px
				background_color: '#FFFAE8', // 背景颜色
				bg_list: [
					{'color': '#FFFAE8'}, {'color': '#F1E1C6'}, {'color': '#E6E6E6'},
					{'color': '#FEFFFF'}, {'color': '#EADACA'}, {'color': '#E0EDCA'},
					{'color': '#FBE5DA'},
				], // 颜色列表
			}
		},
		mounted() {
			// 字体反馈
			this.$emit('fontSize', this.user_font_size)
			// 颜色反馈
			this.$emit('backgroundColor', this.background_color)
		},
		methods:{
			// 颜色改变
			bg_color_change(bg_color){
				this.background_color = bg_color
				this.$emit('backgroundColor', this.background_color)
			},
			// 点击字体变小
			font_reduce(){
				--this.user_font_size
				this.$emit('fontSize', this.user_font_size)
			},
			// 点击字体变大
			font_enlarge(){
				++this.user_font_size
				this.$emit('fontSize', this.user_font_size)
			}
		}
	}
</script>

<style lang="scss" scoped>
.read-body{
	// border: 1px solid red;
	box-sizing: border-box;
	position: absolute;
	bottom: 0rpx;
	// #ifdef H5
	bottom: 88rpx;
	// #endif
	left: 0rpx;
	width: 100%;
	padding: 40rpx;
	background-color: #FEFAC4;
	.s-item{
		// border: 1px solid red;
		overflow: auto;
		margin-top: 20rpx;
		div{
			float: left;
			height: 60rpx;
			line-height: 60rpx;
		}
		.font{
			border: 1px solid #A3855F;
			border-radius: 37rpx;
			padding: 0rpx 60rpx;
		}
		.font-size{
			margin: 0rpx 20rpx 0rpx 20rpx;
		}
		&::before{
			content: '';
			display: inline-block;
			clear: both;
		}
	}
	.bg-color{
		height: 70rpx;
		// #ifdef H5
		 height: 68rpx;
		// #endif
		overflow: hidden;
		clear: both;
		// height: 60rpx;
		margin-top: 40rpx;
		// overflow-x: auto;
		.color-scolle{
			overflow-x: auto;
			white-space: nowrap;
			padding: 0rpx 0rpx 15rpx 0rpx;
		}
		.item{
			width: 180rpx;
			height: 60rpx;
			border: none;
			border-radius: 37rpx;
			display: inline-block;
		}
		.item:not(:first-child){
			margin-left: 3%;
		}
	}
}
</style>
