<template>
    <view class="order full-width">
        <scroll-view scroll-x class="order-tab main-bg-color nav text-center">
            <view class="cu-item" :class="0==tab.current?'text-white cur':''" @tap="orderTabSelect" data-id="0">
                <text class="cuIcon-list padding-right-xs"></text> 全部
            </view>
            <view class="cu-item" :class="1==tab.current?'text-white cur':''" @tap="orderTabSelect" data-id="1">
                <text class="cuIcon-remind padding-right-xs"></text> 未配送
                <view class="cu-avatar" style="width: 0">
                    <view class="cu-tag badge bg-mauve" style="position: relative;top: -15px;">{{unDeliveryCount}}</view>
                </view>
            </view>
            <view class="cu-item" :class="2==tab.current?'text-white cur':''" @tap="orderTabSelect" data-id="2">
                <text class="cuIcon-deliver padding-right-xs"></text> 配送中
            </view>
            <view class="cu-item" :class="3==tab.current?'text-white cur':''" @tap="orderTabSelect" data-id="3">
                <text class="cuIcon-roundcheck padding-right-xs"></text> 配送完成
            </view>
        </scroll-view>
        <view class="full-size" v-if="orders && orders.length > 0">
            <so-order-item  @statusChange="statusChange" :order="item" v-for="(item, index) in orders" :key="index" :goods="goods"></so-order-item>
            <view class="full-width text-center padding-sm">
                <text class="text-xs text-grey">———— 到底啦~ ————</text>
            </view>
        </view>
        <view class="full-size flex align-center justify-center" style="height: 600px" v-else>
            <view class="full-width">
                <view class="full-width text-center">
                    <image src="../../static/fx-store-logo.png" style="height: 60px; width: 60px;"></image>
                </view>
                <view class="full-width text-sm text-grey text-center">还没有订单欸~</view>
            </view>
        </view>
    </view>
</template>

<script>
    import soOrderItem from '../../colorui/components/so-order-item.vue'
    import request from "../../util/request";

    export default {
        components: {
            'so-order-item': soOrderItem
        },
        data() {
            return {
                tab: {
                    current: 1
                },
                unDeliveryCount: 0,
                orders: [],
                goods: {},
                timeTask: ''
            }
        },
        onPullDownRefresh() {
            this.search();
        },
        mounted() {
            this.search();
            this.timeTask = setInterval(this.search, 30 * 1000);
        },
        methods: {
            search () {
                let params = {};
                this.tab.current === '0' || (params.deliveryStatus = this.tab.current - 1);
                this.requestOrder(params);
            },
            requestOrder (params) {
                request.post('/order/list', params).then((data => {
                    if (data.status === 200) {
                        this.orders = data.resultList;
                        this.goods = data.extra.goods;
                        if(params.deliveryStatus == 0){
                            this.unDeliveryCount = data.resultList.length;
                        }
                    }
                }));
                let params1 = {
                    deliveryStatus: 0
                };
                request.post('/order/list', params1).then((data => {
                    if (data.status === 200) {
                        this.unDeliveryCount = data.resultList.length;
                    }
                }));
            },
            orderTabSelect ({currentTarget}) {
                this.tab.current = currentTarget.dataset.id;
                let params = {};
                this.tab.current === '0' || (params.deliveryStatus = this.tab.current - 1);
                this.requestOrder(params);
            },
            statusChange(){
                this.orderTabSelect({
                    currentTarget: {
                        dataset: {
                            id: this.tab.current
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .order {
        .order-tab {
            position: sticky;
            top: 0;
            z-index: 2;
        }
    }
</style>
