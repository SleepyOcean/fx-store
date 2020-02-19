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

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
