<template>
    <view class="index-style">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">订单详情</block>
        </cu-custom>
        <view class="full-width" :style="contentStyle">
            <order-detail v-if="order" :order="order" :goods="goods"></order-detail>
        </view>
    </view>
</template>

<script>
    import orderDetail from '../order/order-detail.vue'
    import request from "../../util/request";
    export default {
        components: {
            'order-detail': orderDetail
        },
        data() {
            return {
            	page: '',
                orderId: '',
                order: '',
                goods: ''
			}
        },
        onLoad(option) {
            if(option.orderId){
                this.orderId = option.orderId;
                let self = this;
                request.post('/order/list', {orderId: self.orderId}).then(data => {
                    if (data.status === 200) {
                        self.order = data.resultList[0];
                        self.goods = data.extra.goods;
                    }
                });
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
