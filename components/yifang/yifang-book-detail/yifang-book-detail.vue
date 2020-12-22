<template>
	<view class="body">
		<div class="bg">
			<div class="book-detail">
				<div class="book-img">
					<!-- 有图片 -->
					<image v-if="isLoadingSuccess && bookDetail.book_cover_imgs.length" :src="bookDetail.book_cover_imgs[0]" mode=""></image>
					<!-- 没有图片 -->
					<text v-if="isLoadingSuccess && !bookDetail.book_cover_imgs.length"></text>
				</div>
				<div class="book-desc" v-if="isLoadingSuccess">
					<div class="book_name">{{bookDetail.book_name}}</div>
					<div class="book_author">作者：{{bookDetail.author_detail.book_author}}</div>
					<div class="book_class">分类：{{bookDetail.class_detail.class_id_name}}</div>
					<div class="book_word_count">字数：{{bookDetail.book_word_count}}</div>
				</div>
	
			</div>
			<!-- 书籍详情说明 -->
			<div class="book-detail_introduce" v-if="isLoadingSuccess">
				详情介绍：{{bookDetail.book_desc}}
			</div>
		</div>
		
		<!-- 底部固定栏  用来放立即阅读、加入书架等按钮 -->
		<div class="join" v-if="isLoadingSuccess">
			<div class="item no-join" @click="nowRead">立即阅读</div>
			<div class="item no-join" @click="joinBookShelf" v-show="loadIsJoin && !isJoin">加入书架</div>
			<div class="item joined" @click="joinBookShelf" v-show="loadIsJoin && isJoin">已加入书架</div>
		</div>
		
	</view>
</template>

<script>
	import {getBookDetailUtil} from '@/util/function/book/book.js'
	import {loginTip, getLocalUserInfo, isLogin} from '@/util/function/login.js'
	import {isJoinBookshelf, joinBookshelf} from '@/util/user_http/book-shelf.js'
	
	export default{
		name: "yifangBookDetail",
		props: {
			book_id: {
				type: String
			}
		},
		data(){
			return {
				bookDetail: [], // 书籍详情
				isLoadingSuccess: false, // 是否书籍详情加载完毕
				loadIsJoin: false, // 加载加入书架请求是否完毕
				isJoin: null, // 是否加入书架
			}
		},
		methods: {
			// 是否加入书架
			isJoinBookshelf(book_id){
				// 未登录
				if(!isLogin()){
					this.isJoin = false
					this.loadIsJoin = true
				}
				isJoinBookshelf({
					user_id: getLocalUserInfo()['user_id'],
					book_id: book_id
				}).then(res => {
					console.log('isJoinBookshelf', res)
					if(0 == res.code){
						this.loadIsJoin = true
						this.isJoin = res.data.is_join
					}
				})
			},
			// 加入书籍
			joinBookShelf(){
				// 判断是否登录
				if(loginTip()){
					// 已登录
					joinBookshelf({
						user_id: getLocalUserInfo()['user_id'],
						book_id: this.book_id
					}).then(res => {
						console.log('joinBookshelf', res)
						this.isJoinBookshelf(this.book_id)
					})
				}
			},
			// 书籍详情
			getBookDetail(book_id){
				uni.showLoading({
					mask: true,
					title: "详情加载中..."
				})
				// console.log(this.book_id)
				getBookDetailUtil(book_id).then(res => {
					this.bookDetail = res
					// 设置页面标题
					uni.setNavigationBarTitle({
					    title: res.book_name
					})
					this.isLoadingSuccess = true
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
				})
			},
			// 开始阅读
			nowRead(){
				uni.navigateTo({
				    url: '/pages/start-read/start-read?book_id='+ this.book_id
				})
			}
		},
		created() {
		},
		mounted(){
			// prop 数据加载完毕
			// console.log(this.book_id)
			this.getBookDetail(this.book_id) // 获取书籍详情
			this.isJoinBookshelf(this.book_id) // 是否加入书架
		},
	}
</script>

<style lang="scss" scoped>
	.bg{
		width: 100%;
		// border: 1px solid red;
		border-bottom: 1px solid #FF5501;
		box-sizing: border-box;
		padding-top: 50rpx;
		overflow: hidden;
		.book-detail{
			// border: 1px solid red;
			margin-left: 50rpx;
			clear: both;
			overflow: hidden;
			.book-img{
				width: 170rpx;
				height: 220rpx;
				float: left;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.book-desc{
				float: left;
				// border: 1px solid red;
				margin-left: 50rpx;
				width: 60%;
				.book_name{
					font-size: 40rpx;
					font-weight: 900;
				}
				.book_author{
					margin-top: 20rpx;
				}
				.book_class, .book_word_count{
					margin-top: 10rpx;
				}
			}
		}
		.book-detail_introduce{
			margin: 20rpx 40rpx;
		}
	}
	.join{
		width: 100%;
		// height: 100rpx;
		padding: 30rpx 0rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		border-top: 1px solid #FF5501;
		box-sizing: border-box;
		.div{
			float: left;
		}
		.item{
			// border: 1px solid red;
			display: inline-block;
			padding: 10rpx 35rpx;
			border-radius: 30rpx;
			text-align: center;
			margin-left: 20rpx;
		}
		.no-join{
			background-color: #FF5501;
			color: white;
		}
		.joined{
			background-color: #F5F5F5;
		}
	}
</style>
