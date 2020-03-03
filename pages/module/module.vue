<template>
    <view class="index-style">
        <cu-custom bgColor="main-bg-color" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">{{currentModule.name}}</block>
        </cu-custom>
        <view class="full-width" :style="contentStyle">
            <goods-manage v-if="currentModule.type === 'goods'"></goods-manage>
        </view>
    </view>
</template>

<script>
import GoodsManage from './goods-manage';
    export default {
        components: {
            'goods-manage': GoodsManage
        },
        data() {
            return {
                currentModule: {
                    type: '',
                    name: ''
                }
            }
        },
        onLoad(option) {
            if (option.module) {
                this.currentModule.type = option.module;
                this.currentModule.name = option.name;
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
