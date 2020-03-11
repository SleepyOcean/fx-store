<template>
    <view class="index-style">
        <cu-custom bgColor="main-bg-color" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">{{currentModule.name}}</block>
        </cu-custom>
        <view class="full-width" :style="contentStyle">
            <goods-manage v-if="currentModule.type === 'goods'"></goods-manage>
            <category-manage v-if="currentModule.type === 'category'"></category-manage>
        </view>
    </view>
</template>

<script>
import GoodsManage from './goods-manage';
import CategoryManage from './category-manage'
    export default {
        components: {
            'goods-manage': GoodsManage,
            'category-manage': CategoryManage
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
        },
        computed: {
            contentStyle() {
                return `height: calc(100% - ${this.CustomBar}px)`;
            }
        },
        methods: {
        }
    }
</script>

<style>

</style>
