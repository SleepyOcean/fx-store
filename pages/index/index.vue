<template>
	<view class="index-style">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">导航栏</block>
		</cu-custom>
		<cu-bottom-bar :tabs="tabs"></cu-bottom-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [
					{
						name: '首页',
						pagePath: '/pages/index/index',
						iconPath: '/static/tabbar/basics_cur.png',
						selectedIconPath: '/static/tabbar/basics_cur.png'
					},
					{
						name: '订单',
						pagePath: '/pages/order/order',
						iconPath: '/static/tabbar/component.png',
						selectedIconPath: '/static/tabbar/component_cur.png'
					},
					{
						name: '我的',
						pagePath: '/pages/about/about',
						iconPath: '/static/tabbar/about.png',
						selectedIconPath: '/static/tabbar/about_cur.png'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
