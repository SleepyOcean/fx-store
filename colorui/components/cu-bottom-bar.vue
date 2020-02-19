<template>
	<view class="cu-bar tabbar bg-white">
		<view class="action" v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)">
			<view class="cuIcon-cu-image">
				<image :src="selectIndex === index ? tab.selectedIconPath : tab.iconPath"></image>
			</view>
			<view :class="selectIndex === index ? 'text-green' : 'text-gray'">{{tab.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 0
			}
		},
		props: {
			tabs: {
				type: Array,
				required: true
			}
		},
		methods: {
			selectTab (index) {
				uni.switchTab({
					url: this.tabs[index].pagePath
				});
				this.$forceUpdate();
			}
		}
	}
</script>

<style>
	.cu-bar {
		bottom: 0;
		position: absolute;
		width: 100%;
	}
</style>
