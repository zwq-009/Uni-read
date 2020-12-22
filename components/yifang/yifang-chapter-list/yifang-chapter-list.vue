<template>
	<view class="chapter-list-body">
		<div class="list">
			<div class="title">目录</div>
			<div class="items">
				<div class="item" v-for="(item, index) in chapter_list" :key="index"
				@click="clickChapterItem(item, index)">
					{{item.chapter_name}}
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {getChapterList} from '@/util/user_http/chapter.js'
	
	export default {
		name: "yifangChapterList",
		
		props: {
			book_id: {
				type: String|Number
			}
		},
		data() {
			return {
				page: 1,
				size: 50,
				chapter_list: [], // 章节列表
			}
		},
		methods: {
			// 获取章节
			getChapterList(){
				getChapterList({
					page: this.page,
					size: this.size,
					book_id: this.book_id
				}).then(res => {
					this.chapter_list = res.data
					if(this.chapter_list.length){
						this.$emit('getClickChapterId', {item: this.chapter_list[0], index: 0, 
				chapterLegth: this.chapter_list.length})
					}
				})
			},
			clickChapterItem(item, index){
				this.$emit('getClickChapterId', {item: item, index: index, 
				chapterLegth: this.chapter_list.length})
			},
			getThisChapterList(){
				return this.chapter_list
			},
			// 点击上一章或下一章时  返回当前章节在章节列表中的索引以及总的章节数 和下一章的章节id
			// 返回的数据说明：分别是当前章节在章节列表中的索引、总章节数、下一章节的id
			// type 可为 prev、next 分别为上一章、下一章
			getCurrentChapterIndex(chapter_id, type){
				for (let chapterIndex in this.chapter_list) {
					if(chapter_id == this.chapter_list[chapterIndex].chapter_id){
						let nextChapterIndex = 0
						let c_i = parseInt(chapterIndex)
						let a_c_l = this.chapter_list.length
						switch(type){
							case 'prev':
								// 上一页
								if(c_i > 0){
									nextChapterIndex = --c_i
								}
								break
							case 'next':
								// 下一页
								if(c_i < a_c_l){
									nextChapterIndex = ++c_i
								}
								break
						}
						return [parseInt(chapterIndex), a_c_l, this.chapter_list[nextChapterIndex]]
					}
				}
			}
		},
		created() {
		},
		mounted() {
			// 加载该书籍的章节信息
			this.getChapterList()
		}
	}
</script>

<style lang="scss" scoped>
.chapter-list-body{
	background-color: white;
	$width: 610rpx;
	width: $width;
	// #ifdef H5
	 padding-bottom: 88rpx;
	// #endif
	// border: 1px solid red;
	height: 100%;
	box-sizing: border-box;
	overflow-y: scroll;
	
	.list{
		overflow: hidden;
		padding-top: 70rpx;
		.title{
			height: 70rpx;
			background-color: #F5F5F5;
			line-height: 70rpx;
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			width: $width;
			text-indent: 1em;
		}
		.items{
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			.item{
				// border: 1px solid red;
				border-bottom: 1px solid #f5f5f5;
				padding: 20rpx 10rpx;
				text-indent: 1em;
			}
		}
	}
}
</style>
