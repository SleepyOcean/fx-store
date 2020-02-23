<template>
    <view class="index-style">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">订单详情</block>
        </cu-custom>
        <view class="full-width" :style="contentStyle">
            <order-detail :orderId="orderId"></order-detail>
        </view>
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
            	page: '',
                orderId: ''
			}
        },
        onLoad(option) {
            if(option.orderId){
                this.orderId = option.orderId;
            }
        },
        computed: {
            contentStyle() {
                return `height: calc(100% - ${this.CustomBar}px)`;
            }
        },
        methods: {}
    }
</script>

<style>

</style>
