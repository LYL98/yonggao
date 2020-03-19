import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../theme/index.css"
import i18n from './i18n/i18n';
import myaxios from "./assets/js/myaxios"
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
import importDirective from "@/directives" //
require('vue-video-player/src/custom-theme.css')
// import 'videojs-contrib-hls'
const hls = require('videojs-contrib-hls')
Vue.use(hls)
Vue.use(VideoPlayer)
// Vue.use(hls)
Vue.use(ElementUI);
Vue.use(myaxios);
importDirective(Vue);

//解决循环引用组件会报错的问题
import VideoMonitoringEquipment from './views/pages/DeviceManagement/VideoMonitoringEquipment.vue'
import VehiclePositioningEquipment from './views/pages/DeviceManagement/VehiclePositioningEquipment.vue'
import OilMonitoringEquipment from './views/pages/DeviceManagement/OilMonitoringEquipment.vue'
Vue.component('VideoMonitoringEquipment',VideoMonitoringEquipment)
Vue.component('VehiclePositioningEquipment',VehiclePositioningEquipment)
Vue.component('OilMonitoringEquipment',OilMonitoringEquipment)

import Car from "./views/pages/VehicleManagement/Car.vue"
import CarHeader from "./views/pages/VehicleManagement/CarHeader.vue"
import CarBody from "./views/pages/VehicleManagement/CarBody.vue"
Vue.component('Car',Car)
Vue.component('CarHeader',CarHeader)
Vue.component('CarBody',CarBody)

import StatisticalProfile from './views/pages/DataStatistics/StatisticalProfile.vue'
import OilMonitoringRecord from './views/pages/DataStatistics/OilMonitoringRecord.vue'
Vue.component('StatisticalProfile',StatisticalProfile)
Vue.component('OilMonitoringRecord',OilMonitoringRecord)



Vue.config.productionTip = false


new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
