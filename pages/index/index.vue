<template>
	<view class="index-style">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">封鑫小店</block>
		</cu-custom>
		<view class="page-content">
			<order v-if="currentIndex === 1"></order>
		</view>
		<cu-bottom-bar :tabs="tabs" :current="currentIndex" @currentChange="currentTabChange"></cu-bottom-bar>
	</view>
</template>

<script>
	import order from '../order/order';
	export default {
		components: {
			order
		},
		data() {
			return {
				tabs: [
					{
						name: '首页',
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
		height: calc(100% - 50px - env(safe-area-inset-bottom) / 2 - 50px);
		overflow: auto;
	}
</style>
