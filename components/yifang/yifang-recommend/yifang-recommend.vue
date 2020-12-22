<template>
	<view>
		 <uni-list>
			 
			<uni-list-item title="推荐阅读" :showArrow="false"></uni-list-item>
			 
			<div v-for="(item, index) in recommend" :key="index">
				<uni-list-chat :show-extra-icon="true"
					:avatar="item.book_cover_imgs ? item.book_cover_imgs[0] : ''"
					link=""
					:note="item.book_desc"
					:title="item.book_name" 
					clickable  @click="bookDesc(item.book_id)">
				</uni-list-chat>
			</div>
			 
		</uni-list>
	</view>
</template>

<script>
	// 更多关于列表的说明:https://ext.dcloud.net.cn/plugin?id=24
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniListChat from '@/components/uni-list-chat/uni-list-chat.vue'
	
	import {getBookList} from '@/util/user_http/book.js'
	export default {
		name: "yifangRecommend",
		components: {uniList, uniListItem, uniListChat},
		data() {
			return {
				page: 1,
				size: 50,
				recommend: []
			}
		},
		created() {
			this.getBookList()
		},
		methods: {
			getBookList(){
				getBookList({
					page: this.page,
					size: this.size
				}, {
					custom: {
						loading: true
					}
				}).then(res => {
					for (let itemIndex in res.data) {
						res.data[itemIndex]['book_cover_imgs'] = JSON.parse(res.data[itemIndex]['book_cover_imgs'])
					}
					this.recommend = res.data
				}).catch()
			},
			bookDesc(book_id){
				// console.log(book_id)
				uni.navigateTo({url: '/pages/book/book-detail/book-detail?book_id=' + book_id})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
