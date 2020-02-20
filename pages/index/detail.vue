<template>
    <view class="index-style">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">封鑫小店</block>
        </cu-custom>
        <order-detail></order-detail>
    </view>
</template>

<script>
    import orderDetail from '../order/order-detail.vue'
    export default {
        components: {
            'order-detail': orderDetail
        },
        data() {
            return {
            	page: ''
			}
        },
		onLoad(option) {

		},
        methods: {}
    }
</script>

<style>

</style>
