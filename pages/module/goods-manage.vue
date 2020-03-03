<template>
    <view class="full-size goods-manage">
        <view class="VerticalBox full-height">
            <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
                <view class="cu-item" :class="index==currentCategory?'text-green cur':''" v-for="(item,index) in category" :key="index" @tap="categorySelect"
                      :data-id="index">
                    {{item.categoryName}}
                </view>
            </scroll-view>
            <scroll-view class="VerticalMain full-height" scroll-y scroll-with-animation
                         :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
                <view class="cu-card margin-sm">
                    <view class="cu-item padding-lr-sm">
                        <view class="cu-bar bg-white solid-bottom goods-item padding-tb-sm"
                              v-for="(goodsItem, index) in goods" :key="index">
                            <view class="gi-img-box">
                                <image class="full-size" :src="goodsItem.imgUrl"></image>
                            </view>
                            <view class="gi-info-box padding-left-sm">
                                <view class="full-width">
                                    <text>{{goodsItem.goodsName}}</text>
                                </view>
                                <view class="full-width">
                                    <text class="text-grey text-xs">{{goodsItem.goodsDesc}}
                                    </text>
                                </view>
                                <view class="foi-price text-xxl padding-tb-xs">
                                    <text class="text-price">31.20</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import request from "../../util/request";
import GoodsItem from "../../colorui/components/goods-item";
    export default {
        components: {
            'goods-item': GoodsItem
        },
        data() {
            return {
                currentModule: {
                    type: '',
                    name: ''
                },
                goods: [],
                category: {},
                currentCategory: 0,
                verticalNavTop: 0,
                load: true
            }
        },
        mounted() {
            let params = {
                category: 1,
                page: 1,
                pageSize: 20
            };
            request.get('/goods/getByCategory', params).then(data => {
                if (data.status === 200) {
                    this.goods = data.resultList;
                    this.category = data.extra.category;
                }
            });
        },
        methods: {
            categorySelect (index) {
                this.currentCategory = index.currentTarget.dataset.id;
            },
            VerticalMain(e) {
                // #ifdef MP-ALIPAY
                return false  //支付宝小程序暂时不支持双向联动
                // #endifa
                let that = this;
                let tabHeight = 0;
                if (this.load) {
                    for (let i = 0; i < this.list.length; i++) {
                        let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
                        view.fields({
                            size: true
                        }, data => {
                            this.list[i].top = tabHeight;
                            tabHeight = tabHeight + data.height;
                            this.list[i].bottom = tabHeight;
                        }).exec();
                    }
                    this.load = false
                }
                let scrollTop = e.detail.scrollTop + 10;
                for (let i = 0; i < this.list.length; i++) {
                    if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
                        this.verticalNavTop = (this.list[i].id - 1) * 50
                        this.currentCategory = this.list[i].id
                        console.log(scrollTop)
                        return false
                    }
                }
            },
            saveGoods () {
            }
        }
    }
</script>

<style lang="scss">
    .VerticalNav.nav {
        height: 100%;
        background-color: white;
        width: 200upx;
        white-space: initial;
    }

    .VerticalNav.nav .cu-item {
        width: 100%;
        text-align: center;
        background-color: #fff;
        margin: 0;
        border: none;
        height: 50px;
        position: relative;
    }

    .VerticalNav.nav .cu-item.cur {
        background-color: #f1f1f1;
    }

    .VerticalNav.nav .cu-item.cur::after {
        content: "";
        width: 8upx;
        height: 30upx;
        border-radius: 10upx 0 0 10upx;
        position: absolute;
        background-color: currentColor;
        top: 0;
        right: 0upx;
        bottom: 0;
        margin: auto;
    }

    .VerticalBox {
        display: flex;
    }

    .VerticalMain {
        background-color: #f1f1f1;
        flex: 1;
    }

    .goods-item {
        .gi-img-box {
            width: 80px;
            height: 80px;;
        }
        .gi-info-box {
            height: 100%;
            width: calc(100% - 80px);
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
