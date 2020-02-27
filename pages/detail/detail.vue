<template>
    <view class="index-style">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">订单详情</block>
        </cu-custom>
        <view class="full-width" :style="contentStyle">
            <order-detail v-if="Object.keys(order).length>0" :order="order"></order-detail>
        </view>
    </view>
</template>

<script>
    import orderDetail from './order-detail.vue'
    import request from "../../util/request";

    export default {
        components: {
            'order-detail': orderDetail
        },
        data() {
            return {
                page: '',
                orderId: '',
                order: {},
                goods: ''
            }
        },
        onLoad(option) {
            if (option.orderId) {
                this.orderId = option.orderId;
            }
        },
        mounted() {
            request.post('/order/list', {orderId: this.orderId}).then(data => {
                if (data.status === 200) {
                    let od = data.resultList[0];
                    let gds = od.goods.split(',').map(g => {
                        let g1 = g.split(':');
                        let gd = data.extra.goods[g1[0]];
                        gd.priceNow = g1[2];
                        gd.amount = g1[1];
                        return gd;
                    });
                    od.deliveryStatus = this.getOrderStatus(od);
                    od.goods = gds;
                    this.order = od;
                }
            });
        },
        computed: {
            contentStyle() {
                return `height: calc(100% - ${this.CustomBar}px)`;
            }
        },
        methods: {
            getOrderStatus(order) {
                switch (order.deliveryStatus) {
                    case -1:
                        return '未确认';
                    case 0:
                        return '待配送';
                    case 1:
                        return '配送中 ' + (order.deliveryManInfo ? ' - ' + order.deliveryManInfo.split(':')[1] : '');
                    case 2:
                        return '配送完成';
                }
            }
        }
    }
</script>

<style>

</style>
