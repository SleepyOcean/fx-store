import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import cuBottomBar from './colorui/components/cu-bottom-bar.vue'

Vue.component('cu-custom',cuCustom)
Vue.component('cu-bottom-bar',cuBottomBar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
