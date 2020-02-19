<template>
	<view class="cu-card">
		<view class="cu-item shadow padding-lr-sm margin-xs">
			<view class="padding-tb-sm flex-sub cf">
				<view class="text-sm fl">
					<text class="text-grey">{{order.orderTime}}</text>
				</view>
				<view class="text-df fr">
					{{order.deliveryStatus > 0 ? '已完成' : (order.deliveryStatus < 0 ? '未配送' : '配送中 - ' + order.deliveryMan)}}
				</view>
			</view>
			<view class="fsob-item second-row">
				<view class="fi-img-box">
					<image v-for="(goodsItem, index) in order.goods.split(',')" :key="index" class="f-ib-img" :src="goods[goodsItem.split(':')[0]].imgUrl"></image>
					<i class="full-height el-icon-more"></i>
				</view>
				<view class="fi-order-info">
					<view class="foi-price text-xxl">
						<text class="text-price text-red">31.20</text>
					</view>
					<view class="foi-goods-count text-xs">
						<text class="text-grey">共5件</text>
					</view>
				</view>
			</view>
			<view class="cf padding-tb-sm">
				<button class="cu-btn line-mauve round fr" v-if="order.deliveryStatus == -1">分配订单</button>
				<button class="cu-btn line-mauve round fr margin-left-xs" v-if="order.deliveryStatus == 0">确认完成</button>
				<button class="cu-btn line-mauve round fr margin-left-xs" v-if="order.deliveryStatus == 0">删除订单</button>
			</view>
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
			order: {
				type: Object,
				required: true
			},
			goods: {
				type: Object
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.fsob-item {
		display: flex;
		align-items: center;

		&.first-row {
			justify-content: space-between;
		}

		&.second-row {
			height: 80px;
			justify-content: space-between;
		}

		&.third-row {
			justify-content: flex-end;

			uni-button {
				margin-left: 10px;
			}
		}

		.fi-img-box {
			height: 100%;
			width: calc(100% - 80px);

			.f-ib-img {
				height: 100%;
				width: 80px;
				float: left;
				margin-right: 5px;
			}

			i {
				color: #909399;
				min-width: 60px;
				float: left;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.fi-order-info {
			width: 80px;
			height: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			flex-direction: column;

			.foi-price {
				font-weight: bold;
				font-size: 14px;
			}

			.foi-goods-count {
				font-size: 12px;
				color: #909399;
			}
		}
	}
</style>
