<template>
	<view class="index-style">
		<cu-custom bgColor="main-bg-color">
			<block slot="content">封鑫小店</block>
		</cu-custom>
		<view class="page-content" :style="contentStyle">
			<home v-if="currentIndex === 0"></home>
			<order v-if="currentIndex === 1"></order>
			<about v-if="currentIndex === 2"></about>
		</view>
		<cu-bottom-bar :tabs="tabs" :current="currentIndex" @currentChange="currentTabChange"></cu-bottom-bar>
	</view>
</template>

<script>
	import order from '../order/order';
	import home from '../home/home';
	import about from '../about/about';
	export default {
		components: {
			order,
			home,
			about
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				tabs: [
					{
						name: '管理',
						iconPath: '/static/tabbar/basics.png',
						selectedIconPath: '/static/tabbar/basics_cur.png'
					},
					{
						name: '订单',
						iconPath: '/static/tabbar/component.png',
						selectedIconPath: '/static/tabbar/component_cur.png'
					},
					{
						name: '我的',
						iconPath: '/static/tabbar/about.png',
						selectedIconPath: '/static/tabbar/about_cur.png'
					}
				],
				currentIndex: 1
			}
		},
		onLoad() {

		},
		computed: {
			contentStyle() {
				return `height: calc(100% - ${this.CustomBar}px - 50px)`;
			}
		},
		methods: {
			currentTabChange (index) {
				this.currentIndex = index;
			}
		}
	}
</script>

<style>
	.page-content {
		width: 100%;
		overflow: auto;
	}
</style>
