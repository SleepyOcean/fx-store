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
