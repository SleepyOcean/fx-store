<template>
	<view class="index-style" @click="test">
		<item :order="item" v-for="(item, index) in orders" :key="index" :goods="goods"></item>
	</view>
</template>

<script>
	import item from '../../colorui/components/so-order-item.vue'
	export default {
		components: {
			item
		},
		data() {
			return {
				orders: [],
				goods: []
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
				success: function({data}) {
					console.log(data);
					if (data.status === 200) {
						self.orders = data.resultList;
						self.goods = data.extra.goods;
					}
				}
			});
		},
		methods: {
			test () {
				console.log(this.orders);
			}
		}
	}
</script>

<style>

</style>
