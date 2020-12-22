<template>
	<view>
		<yifang-book-detail :book_id="book_id"></yifang-book-detail>
	</view>
</template>

<script>
	import yifangBookDetail from '@/components/yifang/yifang-book-detail/yifang-book-detail.vue'

	export default {
		name: "bookDetail",
		components: {
			yifangBookDetail
		},
		data() {
			return {
				book_id: null, // 传过来的book_id
			}
		},
		methods: {

		},
		onLoad(option) {
			// console.log(option)
			this.book_id = option.book_id
		}

	}
</script>

<style lang="scss" scoped>
</style>
