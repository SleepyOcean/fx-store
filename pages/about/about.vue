<template>
	<view class="full-width">
		<view class="avatar-box full-width bg-green">
			<view class="cu-bar margin-bottom-sm padding-top-lg">
				<view class="action">
					<view class="cu-avatar round xl"
						  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<text class="padding-left-sm text-lg margin-left-lg">点击登录</text>
				</view>
			</view>
			<view class="cu-card full-width padding-lg">
				<view class="cu-item shadow-blur info-panel">
					<view class="info-item" v-for="(item, index) in infos" :key="index" :style="'width: calc(100% / '+infos.length+')'">
						<text class="text-xxl text-bold text-red margin-bottom-xs">{{item.num}}</text>
						<text class="text-lg text-black">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">商品设置</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">配送人员</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">品牌故事</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infos: [
					{
						num: 1642,
						name: '订单数'
					},
					{
						num: 89342,
						name: '营业额'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
.avatar-box {
	height: 200px;
	.avatar-row {
		height: 60px;
	}
	.info-panel {
		height: 120px;
		.info-item {
			float: left;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
