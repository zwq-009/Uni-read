<template>
	<div class="menu">
		<swiper class="swiper" :indicator-dots="indicatorDots" :duration="duration"
		:circular="circular" :indicator-active-color="indicator_active_color">
			<swiper-item>
				<view class="menu-page">
					<div class="menu-item" v-for="(item, index) in menu" :key="index">
						<div v-if="index < 10">
							<div class="menu-img">
								<image :src="item.icon" class="image" mode="aspectFit"></image>
							</div>
							<div class="menu-title">{{item.title}}</div>
						</div>
					</div>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="menu-page">
					<div v-if="menu.length > 10" class="menu-item" v-for="(item, index) in menu" :key="index">
						<div v-if="index > 9">
							<div class="menu-img">
								<image :src="item.icon" class="image" mode="aspectFit"></image>
							</div>
							<div class="menu-title">{{item.title}}</div>
						</div>
					</div>
				</view>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {getClass} from '@/util/user_http/menu.js'
	export default {
		name: "yifangMenu",
		components: {},
		data() {
			return {
				page: 1,
				size: 19,
				indicatorDots: true, // 是否显示面板指示点
				duration: 200, // 滑动动画时长
				circular: false, // 是否采用衔接滑动，即播放到末尾后重新回到开头
				indicator_active_color: '#FF5501', // 当前选中的指示点颜色
				
				menu:[
						// {title: "历史", url: '/pages/field/index', icon: "/static/logo.png"},
						// {title: "科学", url: 'https://baidu.com', icon: '/static/logo.png'},
						// {title: "工业", type: 'custom', icon: '/static/logo.png'},
						// {title: "农业", openType: 'share', icon: '/static/logo.png'},
						// {title: "社区", icon: '/static/logo.png'},
						// {title: "IT", openType: 'redirectTo', url: '/pages/field/index', icon: '/static/logo.png'},
						// {title: "全部", icon: '/static/logo.png'},
				]
			};
		},
		created() {
			this.getClass()
		},
		methods:{
			getClass(){
				getClass({
					page: this.page,
					size: this.size
				}).then(res => {
					let menuTmp = []
					for (let menuIndex in res.data) {
						let menuChild = {
							title: res.data[menuIndex]['class_id_name'],
							icon:	res.data[menuIndex]['class_cover_img']
						}
						menuTmp.push(menuChild)
					}
					// 在菜单中插入全部按钮  点击按钮可跳转全部菜单页
					menuTmp.push({
						title: "全部",
					})
					this.menu = menuTmp
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.menu{
	// border: 1px solid red;
	.menu-page{
		display: -webkit-flex; /* Safari */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.menu-item{
			// border: 1px solid red;
			width: 20%;
			box-sizing: border-box;
			.menu-img{
				width: 92rpx;
				height: 92rpx;
				margin: 0 auto;
				// border: 1px solid red;
				.image{
					width: 100%;
					height: 100%;
				}
			}
			.menu-title{
				text-align: center;
				font-size: 24rpx;
			}
		}
	}
}
</style>
