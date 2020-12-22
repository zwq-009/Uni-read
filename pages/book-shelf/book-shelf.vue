<template>
	<view class="container">
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="sticky-box">
				<u-dropdown ref="uDropdown" @open="open" @close="close" :border-bottom="true">
					<u-dropdown-item v-model="option0.value" :title="option0.title" 
						:options="option0.options" @change="rankChange"
						
					></u-dropdown-item>
					
				</u-dropdown>
			</view>
		</u-sticky>
		<!-- 书籍列表 -->
		<div class="book-list">
			<bookShelf></bookShelf>
		</div>
		
	</view>
</template>

<script>
	import bookShelf from '@/components/yifang/book-shelf/book-shelf.vue'
	export default {
		components: {bookShelf},
		data() {
			return {
				currentClickItem: null,  // 当前点击的下拉菜单item index  由open事件修改
				option0: {
					title: '排列方式',
					value: 0, // 需要从0开始
					options: [{
							label: '一行一列', // 也是选中后的标题
							value: 0, // 需要从0开始
						},
						{
							label: '一行两列',
							value: 1,
						}
					],
				},
				// 追加的示例
				// option1: {
				// 	title: '温度',
				// 	value: 0,
				// 	options: [{
				// 			label: '常温',
				// 			value: 0,
				// 		},
				// 		{
				// 			label: '加冰',
				// 			value: 1,
				// 		}
				// 	],
				// },
			}
		},
		methods: {
			// 点击某个下拉菜单 被打开事件
			open(index){
				// console.log(index + ' open')
				this.currentClickItem = index
				this.$refs.uDropdown.highlight()
			},
			// 点击某个下拉菜单 被关闭事件
			close(index){
				// console.log(index + ' close')
				this.$refs.uDropdown.highlight(index)
			},
			// 点击某个下拉菜单的item
			rankChange(index){
				// console.log(index)
				let clickItem = 'option' + this.currentClickItem
				// console.log(clickItem)
				// 设置标题
				this[clickItem].title = this[clickItem].options[index].label
				// 设置颜色
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sticky-box {
		width: 100vw;
		// border: 1px solid red;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		background-color: beige;
	}
	.other{
		height: 200vh;
	}
	.book-list{
		
	}
</style>
