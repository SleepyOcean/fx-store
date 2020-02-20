<template>
	<view class="order" @click="test">
		<so-order-item :order="item" v-for="(item, index) in orders" :key="index" :goods="goods"></so-order-item>
		<view class="full-width text-center padding-sm">
			<text class="text-xs text-grey">———— 到底啦~ ————</text>
		</view>
	</view>
</template>

<script>
	import soOrderItem from '../../colorui/components/so-order-item.vue'
	export default {
		components: {
			'so-order-item': soOrderItem
		},
		data() {
			return {
				orders: [{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '-1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '-1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '0',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '-1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '-1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '-1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '0',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				},{
					orderTime: '2020-02-19 12:33:44',
					deliveryStatus: '-1',
					deliveryMan: '李白',
					goods: '1213123:7,3424242:12'
				}],
				goods: {
					'1213123': {
						imgUrl: '//img.alicdn.com/bao/uploaded/i1/TB1QiLXL9rqK1RjSZK9SutyypXa.jpg_240x5000Q60s0.jpg_.webp'
					},
					'3424242': {
						imgUrl: '//img.alicdn.com/bao/uploaded/i1/TB1KzQUL4TpK1RjSZFMSuvG_VXa.jpg_240x5000Q60s0.jpg_.webp'
					}
				}
			}
		},
		mounted() {
			let self = this;
			uni.request({
				url: 'http://localhost:8001/order/list',
				method: 'POST',
				data: {
					deliveryStatus: '-1'
				},
				success: function({
					data
				}) {
					console.log(data);
					if (data.status === 200) {
						self.orders = data.resultList;
						self.goods = data.extra.goods;
					}
				}
			});
		},
		methods: {
			test() {
				console.log(this.orders);
			}
		}
	}
</script>

<style>
.order {
	width: 100%;
}
</style>
