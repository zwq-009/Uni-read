<template>
	
	<view class="body">
		<!-- 顶部搜索框 -->
		<yifang-top-search></yifang-top-search>
		
		<!-- 轮播图 -->
		<yifang-swiper></yifang-swiper>
		
		<!-- 菜单 -->
		<yifang-menu></yifang-menu>
		
		<!-- 推荐 -->
		<yifang-recommend></yifang-recommend>
	</view>
	
</template>

<script>
	import yifangTopSearch from '@/components/yifang/yifang-top-search/yifang-top-search.vue'
	import yifangSwiper from '@/components/yifang/yifang-swiper.vue'
	import yifangMenu from '@/components/yifang/yifang-menu/yifang-menu.vue'
	import yifangRecommend from '@/components/yifang/yifang-recommend/yifang-recommend.vue'
	
	export default {
		components: {yifangTopSearch, yifangSwiper, yifangMenu,
		yifangRecommend},
		data() {
			return {
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
</style>
