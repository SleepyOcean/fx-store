<template>
    <view class="full-size goods-manage">
        <view class="VerticalBox full-height">
            <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation>
                <view class="cu-item" :class="index==currentCategory?'text-green cur':''" v-for="(item,index) in category" :key="index" @tap="categorySelect"
                      :data-id="index">
                    {{item.categoryName}}
                </view>
            </scroll-view>
            <scroll-view class="VerticalMain full-height" scroll-y scroll-with-animation @bindscrolltolower="VerticalMain">
                <view class="cu-card margin-sm" v-for="(c, key) in categoryKeys" :key="key" v-if="key==currentCategory">
                    <view class="cu-item padding-lr-sm margin-top-xs">
                        <goods-item v-for="(goodsItem, index) in goods" :key="index" v-if="goodsItem.category == (key+1)" :goods="goodsItem" :category="categoryKeys" @updateAfter="updateAfter"></goods-item>
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
                categoryKeys: [],
                currentCategory: 0,
                load: true,
                page: {
                    start: 1,
                    size: 0
                }
            }
        },
        onReachBottom(){
            uni.showLoading({
                title: '拼命加载中'
            });
            this.page.start++;
            this.requestGoods();
        },
        mounted() {
            this.requestGoods();
        },
        methods: {
            requestGoods(){
                let params = {
                    category: this.currentCategory+1,
                    page: this.page.start,
                    pageSize: this.page.size
                };
                request.get('/goods/getByCategory', params).then(data => {
                    if (data.status === 200) {
                        if(!data.resultList){
                            this.currentCategory++;
                            this.requestGoods();
                            return;
                        }
                        this.goods = data.resultList;
                        this.category = data.extra.category;
                        this.categoryKeys = Object.values(this.category);
                    }
                });
            },
            updateAfter () {
                this.requestGoods();
            },
            categorySelect (index) {
                this.currentCategory = index.currentTarget.dataset.id;
                this.requestGoods();
            },
            VerticalMain(e) {
                uni.showLoading({
                    title: '加载中'
                });
                this.page.start++;
                this.requestGoods();
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
</style>
