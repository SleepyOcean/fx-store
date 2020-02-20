<template>
	<view class="cu-bar tabbar bg-white">
		<view class="action" v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)">
			<view class="cuIcon-cu-image">
				<image :src="current === index ? tab.selectedIconPath : tab.iconPath"></image>
			</view>
			<view :class="current === index ? 'text-green' : 'text-gray'">{{tab.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			tabs: {
				type: Array,
				required: true
			},
			current: {
				type: Number
			}
		},
		methods: {
			selectTab (index) {
				this.$emit('currentChange', index);
			}
		}
	}
</script>

<style>
	.cu-bar {
		bottom: 0;
		position: fixed;
		width: 100%;
	}
</style>
